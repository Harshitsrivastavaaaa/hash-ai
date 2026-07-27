import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  easeInOut,
} from "framer-motion";
import {
  Bot,
  Zap,
  Cpu,
  Shield,
  ArrowRight,
  Terminal,
  Globe,
  Code2,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Send,
  Paperclip,
  Image as ImageIcon,
  Video,
  FileText,
  X
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const theme = {
  accent: "text-violet-600",
  gradientText: "from-violet-600 via-fuchsia-500 to-sky-500",
  buttonPrimary: "bg-violet-600 hover:bg-violet-500",
};

const features = [
  {
    icon: <Bot />,
    title: "Autonomous Swarms",
    desc: "Deploy self-improving agent swarms that adapt to your codebase logic in real-time.",
    bg: "bg-violet-100",
    color: "text-violet-600",
  },
  {
    icon: <Cpu />,
    title: "Neural Edge",
    desc: "Run LLMs locally on consumer hardware with our optimized quantization engine.",
    bg: "bg-fuchsia-100",
    color: "text-fuchsia-600",
  },
  {
    icon: <Zap />,
    title: "Flash Latency",
    desc: "Sub-20ms response times for real-time conversational and voice applications.",
    bg: "bg-amber-100",
    color: "text-amber-600",
  },
  {
    icon: <Shield />,
    title: "Zero-Knowledge",
    desc: "Enterprise-grade encryption ensuring your model weights never leave your vault.",
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },
  {
    icon: <Terminal />,
    title: "Rust CLI",
    desc: "Control your entire AI swarm directly from your terminal with our native CLI.",
    bg: "bg-rose-100",
    color: "text-rose-600",
  },
  {
    icon: <Code2 />,
    title: "Polyglot Synth",
    desc: "Fine-tuned models specifically optimized for modern stacks (Rust, Go, TypeScript).",
    bg: "bg-sky-100",
    color: "text-sky-600",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeInOut } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    position.x.set(e.clientX - rect.left);
    position.y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [position.x, position.y],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.1), transparent 40%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
};

const ShimmerButton = ({ children, onClick, secondary = false }: { children: React.ReactNode, onClick?: () => void, secondary?: boolean }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`relative overflow-hidden px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 backdrop-blur-md ${
      secondary 
        ? "bg-white/40 border border-slate-200 text-slate-800 hover:bg-white/60 hover:border-slate-300 shadow-sm" 
        : `${theme.buttonPrimary} text-white shadow-lg shadow-violet-500/25`
    }`}
  >
    {!secondary && (
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 3, ease: "linear" }}
      />
    )}
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </motion.button>
);

const CodeWindow = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/80 shadow-2xl shadow-slate-200/50 group">
      <div className="flex items-center justify-between px-4 py-3 bg-white/40 border-b border-white/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="text-xs text-slate-500 font-mono font-medium">main.rs — AgentSwarm</div>
        <button onClick={handleCopy} className="text-slate-400 hover:text-violet-600 transition-colors">
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-6 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed">
          <code className="text-slate-800">
            <span className="text-violet-600 font-medium">use</span> hash_ai::prelude::*;<br/><br/>
            <span className="text-violet-600 font-medium">#[tokio::main]</span><br/>
            <span className="text-fuchsia-600 font-medium">async fn</span> <span className="text-sky-600 font-medium">main</span>() -&gt; Result&lt;()&gt; {'{'}<br/>
            <span className="text-slate-400 italic">    // 1. Initialize the autonomous swarm</span><br/>
            <span className="text-fuchsia-600 font-medium">    let</span> swarm = AgentSwarm::<span className="text-sky-600">new</span>()<br/>
            {'        '}.<span className="text-sky-600">with_model</span>(<span className="text-emerald-600">"hash-v4-quantized"</span>)<br/>
            {'        '}.<span className="text-sky-600">with_privacy</span>(PrivacyLevel::ZeroKnowledge);<br/><br/>
            <span className="text-violet-600 font-medium">    println!</span>(<span className="text-emerald-600">"🚀 Swarm initialized..."</span>);<br/><br/>
            <span className="text-slate-400 italic">    // 2. Deploy task to edge nodes</span><br/>
            <span className="text-fuchsia-600 font-medium">    let</span> result = swarm.<span className="text-sky-600">execute</span>(Task::<span className="text-sky-600">new</span>(<br/>
            {'        '}<span className="text-emerald-600">"Optimize React rendering logic"</span><br/>
            {'    '})).<span className="text-sky-600">await</span>?;<br/>
            {'    '}<span className="text-sky-600">Ok</span>(())<br/>
            {'}'}
          </code>
        </pre>
      </div>
    </div>
  );
};

interface AttachedFile {
  id: string;
  file: File;
  previewUrl: string;
  type: "image" | "video" | "document";
}

// --- SEARCH BOX WITH MULTIMEDIA UPLOADS ---
const GeminiSearchBox = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    const newAttachments: AttachedFile[] = filesArray.map((file) => {
      let fileType: "image" | "video" | "document" = "document";
      if (file.type.startsWith("image/")) fileType = "image";
      else if (file.type.startsWith("video/")) fileType = "video";

      return {
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
        type: fileType,
      };
    });

    setAttachedFiles((prev) => [...prev, ...newAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) URL.revokeObjectURL(fileToRemove.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  };

  // Convert File object to Base64 string for Gemini API
  const fileToBase64 = (file: File): Promise<{ mimeType: string; data: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(",")[1];
        resolve({ mimeType: file.type, data: base64Data });
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim() && attachedFiles.length === 0) return;

    setIsLoading(true);

    try {
      // Process attachments into Base64 format
      const attachments = await Promise.all(
        attachedFiles.map((f) => fileToBase64(f.file))
      );

      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query || "Analyze the attached file(s).",
          sessionId,
          attachments,
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setResponse(data.data.response);
      } else {
        setResponse(data.error || "Error: Could not reach the neural grid.");
      }
    } catch (error) {
      console.error(error);
      setResponse("Connection failed. Ensure the backend is running on port 5000.");
    } finally {
      setIsLoading(false);
      setQuery("");
      setAttachedFiles([]);
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      className={`relative w-full max-w-3xl mx-auto mt-12 mb-8 transition-all duration-500 ease-out ${
        isFocused ? "scale-[1.02] shadow-violet-500/20" : "scale-100"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`relative flex flex-col w-full bg-white/70 backdrop-blur-2xl border transition-colors duration-300 rounded-3xl p-3 shadow-2xl ${
          isFocused ? "border-violet-400" : "border-white/80"
        }`}
      >
        {/* Attachment Previews */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 p-2 mb-2 border-b border-slate-200/50">
            {attachedFiles.map((f) => (
              <div
                key={f.id}
                className="relative group flex items-center gap-2 bg-slate-100/80 border border-slate-200 rounded-xl p-1.5 pr-3 text-xs text-slate-700 font-medium"
              >
                {f.type === "image" ? (
                  <img
                    src={f.previewUrl}
                    alt="attachment"
                    className="w-10 h-10 object-cover rounded-lg border border-slate-300"
                  />
                ) : f.type === "video" ? (
                  <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center text-violet-600">
                    <Video className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                    <FileText className="w-5 h-5" />
                  </div>
                )}

                <div className="max-w-[120px] truncate">
                  <p className="truncate font-semibold">{f.file.name}</p>
                  <p className="text-[10px] text-slate-400">
                    {(f.file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(f.id)}
                  className="p-1 rounded-full bg-slate-200 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="flex items-center w-full">
          <div className="pl-3 pr-2 text-violet-600 flex-shrink-0">
            <Sparkles
              className={`w-6 h-6 transition-transform duration-500 ${
                isFocused ? "rotate-12 scale-110" : ""
              }`}
            />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isLoading}
            placeholder={
              isLoading
                ? "Processing on Neural Grid..."
                : "Ask Hash#AI or attach images, videos, documents..."
            }
            className="w-full bg-transparent border-none outline-none text-lg text-slate-800 placeholder:text-slate-400/80 py-2 px-2 font-medium disabled:opacity-50"
          />

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.txt,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            title="Attach images, videos, or files"
            className="p-3 rounded-full text-slate-500 hover:text-violet-600 hover:bg-violet-100/50 transition-all flex-shrink-0 mr-1"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={(query.length === 0 && attachedFiles.length === 0) || isLoading}
            className={`p-3.5 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
              (query.length > 0 || attachedFiles.length > 0) && !isLoading
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/40 hover:bg-violet-500 cursor-pointer scale-100"
                : "bg-slate-100 text-slate-400 cursor-default scale-95"
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-violet-400 border-t-violet-600 rounded-full animate-spin" />
            ) : (
              <Send
                className={`w-5 h-5 transition-transform duration-300 ${
                  query.length > 0 || attachedFiles.length > 0
                    ? "translate-x-0.5 -translate-y-0.5"
                    : ""
                }`}
              />
            )}
          </button>
        </div>
      </form>

      {!response && (
        <div
          className={`flex flex-wrap justify-center gap-2 mt-4 transition-all duration-500 ${
            isFocused ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {["Deploy a Rust API", "Analyze an image", "Optimize edge network"].map(
            (suggestion, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="text-xs font-semibold px-4 py-2 rounded-full bg-white/50 border border-slate-200 text-slate-600 hover:bg-white/80 hover:text-violet-600 transition-colors"
              >
                {suggestion}
              </button>
            )
          )}
        </div>
      )}

      {/* AI Response Display */}
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg text-left overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-4 text-violet-600 font-bold border-b border-white/50 pb-3">
            <Bot className="w-5 h-5" />
            <span>Hash#AI Response</span>
          </div>

          <div className="text-slate-700 font-medium leading-relaxed max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-slate-900 mb-4 mt-6" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-slate-900 mb-3 mt-5" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-slate-900 mb-2 mt-4" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                li: ({ node, ...props }) => <li className="marker:text-violet-500" {...props} />,
                code({ node, inline, className, children, ...props }: any) {
                  return inline ? (
                    <code className="bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                      {children}
                    </code>
                  ) : (
                    <div className="relative group my-4 rounded-xl overflow-hidden bg-slate-800 text-slate-50 shadow-inner">
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-white/10">
                        <div className="flex gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                      </div>
                      <div className="p-4 overflow-x-auto">
                        <pre className="text-sm font-mono leading-relaxed">
                          <code {...props}>{children}</code>
                        </pre>
                      </div>
                    </div>
                  );
                },
              }}
            >
              {response}
            </ReactMarkdown>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// --- MAIN PAGE ---
const Home = () => {
  const featuresRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const yBlob1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const yBlob2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const yBlob3 = useTransform(scrollY, [0, 1000], [0, 150]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const headlineText = "Hello, Builder. What will we create today?";
  const headlineWords = headlineText.split(" ");

  return (
    <div className="relative w-full min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-violet-200 overflow-x-hidden">
      <Navbar />

      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
        <motion.div
          style={{ y: yBlob1 }}
          animate={{
            backgroundColor: [
              "rgba(216, 180, 254, 0.4)",
              "rgba(249, 168, 212, 0.4)",
              "rgba(253, 230, 138, 0.4)",
              "rgba(216, 180, 254, 0.4)",
            ],
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[900px] h-[900px] rounded-full blur-[140px]"
        />

        <motion.div
          style={{ y: yBlob2 }}
          animate={{
            backgroundColor: [
              "rgba(186, 230, 253, 0.5)",
              "rgba(167, 243, 208, 0.4)",
              "rgba(196, 181, 253, 0.4)",
              "rgba(186, 230, 253, 0.5)",
            ],
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[20%] w-[700px] h-[700px] rounded-full blur-[140px]"
        />

        <motion.div
          style={{ y: yBlob3 }}
          animate={{
            backgroundColor: [
              "rgba(252, 165, 165, 0.3)",
              "rgba(191, 219, 254, 0.4)",
              "rgba(24bc, 254, 203, 0.3)",
              "rgba(252, 165, 165, 0.3)",
            ],
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] rounded-full blur-[120px]"
        />
      </div>

      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center pt-48 md:pt-56 pb-20">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center w-full max-w-5xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] flex flex-wrap justify-center gap-x-3">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } },
                  }}
                  className={`inline-block ${
                    word.includes("create") || word.includes("today?")
                      ? `text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`
                      : "text-slate-900"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-600 mb-6 max-w-2xl leading-relaxed font-medium"
            >
              Hash#AI empowers developers to build{" "}
              <span className="text-slate-900 font-bold">autonomous agents</span> with secure,
              edge-computed generative models.
            </motion.p>

            <GeminiSearchBox />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full px-6 flex justify-center mt-20"
        >
          <div className="w-full max-w-5xl backdrop-blur-2xl rounded-3xl border border-white/80 bg-white/40 shadow-2xl shadow-slate-200/50 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/40">
              {[
                { label: "Latency", value: "< 20ms", icon: <Zap className="w-5 h-5 text-amber-500" /> },
                { label: "Active Nodes", value: "14k+", icon: <Globe className="w-5 h-5 text-sky-500" /> },
                { label: "Tokens/Day", value: "8.5B", icon: <Cpu className="w-5 h-5 text-violet-500" /> },
                { label: "Security", value: "zk-Rollup", icon: <Shield className="w-5 h-5 text-emerald-500" /> },
              ].map((stat, i) => (
                <div key={i} className="py-8 px-4 flex flex-col items-center justify-center group hover:bg-white/20 transition-colors">
                  <div className="mb-3 p-3 rounded-xl bg-white/60 shadow-sm border border-white/50">{stat.icon}</div>
                  <span className="text-2xl font-black text-slate-800">{stat.value}</span>
                  <span className="text-xs uppercase font-bold tracking-widest text-slate-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-sm font-bold mb-6 shadow-sm">
                <Terminal className="w-4 h-4" />
                <span>Developer First</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">
                Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">speed and scale</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                Integrate Hash#AI into your existing Rust, Go, or Node.js infrastructure with just a few lines of code. Our SDK handles the heavy lifting of quantization and orchestration.
              </p>
              <ul className="space-y-4 mb-10">
                {["Type-safe Rust & TS SDKs", "Local-first LLM inference", "Zero-config p2p networking"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-violet-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <button className="text-violet-600 font-bold border-b-2 border-violet-200 pb-1 hover:border-violet-600 transition-colors">Read Documentation</button>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <CodeWindow />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative z-10 border-y border-slate-200/50 bg-white/20 backdrop-blur-lg">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-16 text-slate-900">How Hash#AI works</h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-1 bg-gradient-to-r from-transparent via-violet-200 to-transparent"></div>
            {[
              { step: "01", title: "Model Ingestion", desc: "Upload your PyTorch/TensorFlow weights to our secure vault." },
              { step: "02", title: "Quantization", desc: "Our engine compresses the model by 80% with <1% accuracy loss." },
              { step: "03", title: "Edge Deployment", desc: "The model is distributed to thousands of active edge nodes." },
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-white flex items-center justify-center mb-6 shadow-xl shadow-slate-200/50">
                  <span className="text-2xl font-black text-violet-600">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-sm max-w-xs font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="py-32 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                The <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>Neural Grid</span>
              </h2>
              <p className="text-lg text-slate-600 font-medium">Everything you need to deploy autonomous agents.</p>
            </div>
            <button className={`flex items-center gap-2 font-bold ${theme.accent} hover:text-violet-800 transition-colors`}>
              View all modules <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <SpotlightCard className="h-full border border-white/60 rounded-3xl bg-white/40 p-8 backdrop-blur-xl hover:bg-white/60 shadow-xl shadow-slate-200/30 transition-all group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${f.bg} ${f.color} group-hover:scale-110 shadow-sm transition-transform duration-300`}>
                    <div className="w-7 h-7">
                      {React.cloneElement(f.icon as React.ReactElement)}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-violet-700 transition-colors">{f.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{f.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 overflow-hidden relative z-10">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-30 blur-[120px] bg-gradient-to-r from-violet-300 via-fuchsia-300 to-sky-300 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-5xl relative">
          <div className="rounded-[40px] bg-white/40 p-12 md:p-24 text-center border border-white/80 backdrop-blur-2xl shadow-2xl shadow-violet-500/10 relative overflow-hidden">
             <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-900">Ready to initialize?</h2>
             <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">Join 50,000+ engineers building the future.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-5 relative z-10">
                <ShimmerButton>Get API Key</ShimmerButton>
                <ShimmerButton secondary>Contact Sales</ShimmerButton>
             </div>
          </div>
        </div>
      </section>

      <div className="relative z-50 border-t border-slate-200/50 bg-slate-50/80 backdrop-blur-lg">
        <Footer />
      </div>
    </div>
  );
};

export default Home;