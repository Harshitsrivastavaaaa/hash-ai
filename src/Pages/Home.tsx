import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
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
  Sparkles,
  CheckCircle2,
  Copy,
  Check
} from "lucide-react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// --- THEME CONFIGURATION ---
const theme = {
  accent: "text-fuchsia-400",
  gradientText: "from-fuchsia-400 via-violet-400 to-cyan-400",
  buttonPrimary: "bg-fuchsia-600 hover:bg-fuchsia-500",
};

// --- DATA ---
const features = [
  {
    icon: <Bot />,
    title: "Autonomous Swarms",
    desc: "Deploy self-improving agent swarms that adapt to your codebase logic in real-time.",
    bg: "bg-fuchsia-400/10",
    color: "text-fuchsia-400",
  },
  {
    icon: <Cpu />,
    title: "Neural Edge",
    desc: "Run LLMs locally on consumer hardware with our optimized quantization engine.",
    bg: "bg-violet-400/10",
    color: "text-violet-400",
  },
  {
    icon: <Zap />,
    title: "Flash Latency",
    desc: "Sub-20ms response times for real-time conversational and voice applications.",
    bg: "bg-amber-400/10",
    color: "text-amber-400",
  },
  {
    icon: <Shield />,
    title: "Zero-Knowledge",
    desc: "Enterprise-grade encryption ensuring your model weights never leave your vault.",
    bg: "bg-emerald-400/10",
    color: "text-emerald-400",
  },
  {
    icon: <Terminal />,
    title: "Rust CLI",
    desc: "Control your entire AI swarm directly from your terminal with our native CLI.",
    bg: "bg-rose-400/10",
    color: "text-rose-400",
  },
  {
    icon: <Code2 />,
    title: "Polyglot Synth",
    desc: "Fine-tuned models specifically optimized for modern stacks (Rust, Go, TypeScript).",
    bg: "bg-cyan-400/10",
    color: "text-cyan-400",
  },
];

// --- ANIMATIONS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

// --- HELPER COMPONENTS ---

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
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(216, 180, 254, 0.1), transparent 40%)`
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
    className={`relative overflow-hidden px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
      secondary 
        ? "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20" 
        : `${theme.buttonPrimary} text-white shadow-lg shadow-fuchsia-900/20`
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
    <div className="rounded-xl overflow-hidden bg-[#0d0d0d] border border-white/10 shadow-2xl shadow-fuchsia-900/10 group">
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="text-xs text-gray-500 font-mono">main.rs — AgentSwarm</div>
        <button onClick={handleCopy} className="text-gray-500 hover:text-white transition-colors">
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-6 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed">
          <code className="text-gray-300">
            <span className="text-fuchsia-400">use</span> hash_ai::prelude::*;<br/><br/>
            <span className="text-fuchsia-400">#[tokio::main]</span><br/>
            <span className="text-violet-400">async fn</span> <span className="text-blue-400">main</span>() -&gt; Result&lt;()&gt; {'{'}<br/>
            <span className="text-gray-500">    // 1. Initialize the autonomous swarm</span><br/>
            <span className="text-violet-400">    let</span> swarm = AgentSwarm::<span className="text-cyan-400">new</span>()<br/>
            {'        '}.<span className="text-cyan-400">with_model</span>(<span className="text-green-400">"hash-v4-quantized"</span>)<br/>
            {'        '}.<span className="text-cyan-400">with_privacy</span>(PrivacyLevel::ZeroKnowledge);<br/><br/>
            <span className="text-fuchsia-400">    println!</span>(<span className="text-green-400">"🚀 Swarm initialized..."</span>);<br/><br/>
            <span className="text-gray-500">    // 2. Deploy task to edge nodes</span><br/>
            <span className="text-violet-400">    let</span> result = swarm.<span className="text-cyan-400">execute</span>(Task::<span className="text-cyan-400">new</span>(<br/>
            {'        '}<span className="text-green-400">"Optimize React rendering logic"</span><br/>
            {'    '})).<span className="text-blue-400">await</span>?;<br/>
            {'    '}<span className="text-blue-400">Ok</span>(())<br/>
            {'}'}
          </code>
        </pre>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
const Home = () => {
  const featuresRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax + Opacity Transforms
  const yBlob1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const yBlob2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const yBlob3 = useTransform(scrollY, [0, 1000], [0, 150]); 

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const headlineText = "Generative Intelligence. Decentralized Power.";
  const headlineWords = headlineText.split(" ");

  return (
    <div className="relative w-full min-h-screen font-sans bg-[#030014] text-white selection:bg-fuchsia-500/30 overflow-x-hidden">
      
      <Navbar />

      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Blob 1: Top Left - Expanded Palette (Fuchsia, Rose, Amber) */}
        <motion.div 
          style={{ y: yBlob1 }} 
          animate={{ 
            backgroundColor: [
              "rgba(192, 38, 211, 0.15)", // Fuchsia
              "rgba(244, 63, 94, 0.15)",  // Rose
              "rgba(245, 158, 11, 0.15)", // Amber
              "rgba(124, 58, 237, 0.15)", // Violet
              "rgba(192, 38, 211, 0.15)"  // Loop back
            ],
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[900px] h-[900px] rounded-full blur-[120px]" 
        />
        
        {/* Blob 2: Top Right - Expanded Palette (Violet, Cyan, Emerald) */}
        <motion.div 
          style={{ y: yBlob2 }} 
          animate={{ 
            backgroundColor: [
              "rgba(124, 58, 237, 0.15)", // Violet
              "rgba(6, 182, 212, 0.15)",  // Cyan
              "rgba(16, 185, 129, 0.15)", // Emerald
              "rgba(59, 130, 246, 0.15)", // Blue
              "rgba(124, 58, 237, 0.15)"  // Loop back
            ],
            scale: [1, 1.2, 1],
            x: [0, 50, 0] 
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[20%] w-[700px] h-[700px] rounded-full blur-[120px]" 
        />
        
        {/* Blob 3: Bottom Left - Expanded Palette (Blue, Indigo, Pink, Teal) */}
        <motion.div 
          style={{ y: yBlob3 }} 
          animate={{ 
            backgroundColor: [
              "rgba(37, 99, 235, 0.1)",  // Blue
              "rgba(99, 102, 241, 0.1)", // Indigo
              "rgba(219, 39, 119, 0.1)", // Pink
              "rgba(14, 165, 233, 0.1)", // Sky
              "rgba(37, 99, 235, 0.1)"   // Loop back
            ],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] rounded-full blur-[100px]" 
        />
      </div>

      {/* --- HERO --- */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center w-full max-w-5xl">
            <motion.div variants={fadeInUp} className={`mb-8 inline-flex gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 shadow-lg shadow-fuchsia-500/10`}>
              <Sparkles className={`w-4 h-4 ${theme.accent}`} />
              <span className="text-sm font-medium text-gray-300">Hash# v4.0 is Live</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] drop-shadow-2xl flex flex-wrap justify-center gap-x-4">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } } }}
                  className={`inline-block ${word.includes("Decentralized") || word.includes("Power") ? `text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}` : "text-white"}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
              Hash#AI empowers developers to build <span className="text-white">autonomous agents</span> with secure, edge-computed generative models.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 mb-24">
              <ShimmerButton>Start Building <ArrowRight className="w-5 h-5" /></ShimmerButton>
              <ShimmerButton secondary onClick={scrollToFeatures}>Read Whitepaper</ShimmerButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="w-full px-6 flex justify-center">
          <div className="w-full max-w-5xl backdrop-blur-xl rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl shadow-violet-900/20">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
              {[
                { label: "Latency", value: "< 20ms", icon: <Zap className="w-5 h-5 text-amber-400" /> },
                { label: "Active Nodes", value: "14k+", icon: <Globe className="w-5 h-5 text-blue-400" /> },
                { label: "Tokens/Day", value: "8.5B", icon: <Cpu className="w-5 h-5 text-fuchsia-400" /> },
                { label: "Security", value: "zk-Rollup", icon: <Shield className="w-5 h-5 text-emerald-400" /> },
              ].map((stat, i) => (
                <div key={i} className="py-6 px-4 flex flex-col items-center justify-center group hover:bg-white/5 transition-colors">
                  <div className="mb-2 p-2 rounded-lg bg-white/5">{stat.icon}</div>
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                  <span className="text-xs uppercase tracking-widest text-gray-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- NEW SECTION: DEVELOPER EXPERIENCE --- */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
                <Terminal className="w-4 h-4" />
                <span>Developer First</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">speed and scale</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Integrate Hash#AI into your existing Rust, Go, or Node.js infrastructure with just a few lines of code. Our SDK handles the heavy lifting of quantization and swarm orchestration.
              </p>
              <ul className="space-y-4 mb-10">
                {["Type-safe Rust & TS SDKs", "Local-first LLM inference", "Zero-config p2p networking"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-fuchsia-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <button className="text-white border-b border-fuchsia-500 pb-1 hover:text-fuchsia-400 transition-colors">Read Documentation</button>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <CodeWindow />
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: ARCHITECTURE --- */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">How Hash# works</h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent"></div>
            
            {[
              { step: "01", title: "Model Ingestion", desc: "Upload your PyTorch/TensorFlow weights to our secure vault." },
              { step: "02", title: "Quantization", desc: "Our engine compresses the model by 80% with <1% accuracy loss." },
              { step: "03", title: "Edge Deployment", desc: "The model is distributed to thousands of active edge nodes." },
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#0d0d0d] border border-white/10 flex items-center justify-center mb-6 shadow-xl shadow-fuchsia-900/10">
                  <span className="text-2xl font-bold text-fuchsia-500">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section ref={featuresRef} className="py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">The <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>Neural Grid</span></h2>
              <p className="text-lg text-gray-400">Everything you need to deploy autonomous agents.</p>
            </div>
            <button className={`flex items-center gap-2 font-semibold ${theme.accent} hover:text-white transition-colors`}>
              View all modules <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <SpotlightCard className="h-full border border-white/10 rounded-3xl bg-[#0a0a0a]/50 p-8 backdrop-blur-sm hover:border-fuchsia-500/30 transition-colors group">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${f.bg} ${f.color} group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(f.icon as React.ReactElement, { className: "w-7 h-7" })}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-fuchsia-300 transition-colors">{f.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-8">{f.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-16 md:py-24 overflow-hidden relative">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[100px] bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-5xl relative">
          <div className="rounded-[30px] bg-[#050505] p-12 md:p-24 text-center border border-white/5 backdrop-blur-xl relative overflow-hidden">
             <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready to initialize?</h2>
             <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Join 50,000+ engineers building the future.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-5 relative z-10">
                <ShimmerButton>Get API Key</ShimmerButton>
                <ShimmerButton secondary>Contact Sales</ShimmerButton>
             </div>
          </div>
        </div>
      </section>

      <div className="relative z-50 border-t border-white/5 bg-[#030014]">
        <Footer />
      </div>
    </div>
  );
};

export default Home;