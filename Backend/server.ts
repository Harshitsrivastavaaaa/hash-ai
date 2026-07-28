import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

const app = express();
const PORT = process.env.PORT || 5000;

// Increase limit to allow larger image/video Base64 payloads
app.use(cors()); 
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const chatSessions = new Map();

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function generateWithRetry(chat: any, contentParts: any, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await chat.sendMessage(contentParts);
    } catch (error: any) {
      if (error.status === 503 && attempt < maxRetries - 1) {
        const waitTime = Math.pow(2, attempt) * 2000;
        console.warn(`[503 Error] Google servers busy. Retrying in ${waitTime / 1000}s...`);
        await delay(waitTime);
      } else {
        throw error;
      }
    }
  }
}

app.post('/api/generate', async (req: Request, res: Response): Promise<any> => {
  try {
    const { query, sessionId, attachments } = req.body;

    if (!query && (!attachments || attachments.length === 0)) {
      return res.status(400).json({ error: "A query or attachment is required." });
    }
    if (!sessionId) return res.status(400).json({ error: "Session ID is required." });

    let chat = chatSessions.get(sessionId);

    if (!chat) {
      chat = model.startChat({ history: [] });
      chatSessions.set(sessionId, chat);
    }

    // Construct parts array for Multimodal support
    const contentParts: any[] = [];

    // Add query text first (Standard practice for Gemini API)
    if (query) {
      contentParts.push({ text: query });
    }

    // Add attachments if present
    if (attachments && Array.isArray(attachments)) {
      for (const item of attachments) {
        // STRIP THE PREFIX: Ensure the data is purely base64
        // Splits "data:image/png;base64,iVBOR..." and takes just the base64 part
        const cleanBase64 = item.data.includes('base64,') 
          ? item.data.split('base64,')[1] 
          : item.data;

        contentParts.push({
          inlineData: {
            mimeType: item.mimeType,
            data: cleanBase64
          }
        });
      }
    }

    console.log(`Received prompt for session: ${sessionId} (Attachments: ${attachments?.length || 0})`);

    const result = await generateWithRetry(chat, contentParts);
    const aiResponse = result.response.text();

    return res.status(200).json({
      status: 'success',
      data: {
        prompt: query,
        response: aiResponse,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    // Log the actual SDK error message, not just the object
    console.error("Error generating response:", error?.message || error);
    
    return res.status(500).json({ 
      error: "Failed to process multimodal prompt.",
      details: error?.message || "Unknown server error" 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Hash#AI Backend running on http://localhost:${PORT}`);
});