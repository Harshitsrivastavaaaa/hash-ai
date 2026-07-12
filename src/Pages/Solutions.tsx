import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue
} from "framer-motion";
import {
  Code2,
  Image as ImageIcon,
  Sigma,
  BrainCircuit,
  BarChart3,
  Terminal,
  Cpu,
  Wand2,
  ArrowRight,
  TrendingUp,
  PieChart,
  GitBranch,
  Database,
  Layers,
  Sparkles,
  Share2,
  Lock,
  Target
} from "lucide-react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const theme = {
  accent: "text-violet-600",
  gradientText: "from-violet-600 via-fuchsia-500 to-sky-500",
  buttonPrimary: "bg-violet-600 hover:bg-violet-500",
};

// --- TOOL DATA ---
// explicitly defining full Tailwind classes prevents purge issues
const tools = [
  {
    id: "data",
    title: "Intelligence",
    icon: <BarChart3 className="w-4 h-4" />,
    color: { text: "text-sky-600", bg: "bg-sky-100", border: "border-sky-200", fill: "bg-sky-500", glow: "shadow-sky-500/20" },
    features: [
      { title: "Predictive Modeling", icon: <TrendingUp />, desc: "Forecast revenue with 98% accuracy using historical tensors." },
      { title: "Anomaly Detection", icon: <Share2 />, desc: "Real-time outlier flagging in terabyte-scale datasets." },
      { title: "SQL Synthesis", icon: <Database />, desc: "Natural language to complex SQL query generation." },
    ]
  },
  {
    id: "code",
    title: "Code Synth",
    icon: <Code2 className="w-4 h-4" />,
    color: { text: "text-violet-600", bg: "bg-violet-100", border: "border-violet-200", fill: "bg-violet-500", glow: "shadow-violet-500/20" },
    features: [
      { title: "Polyglot Engine", icon: <Terminal />, desc: "Native support for Rust, Go, Python, and TypeScript." },
      { title: "Auto-Refactor", icon: <GitBranch />, desc: "Intelligent legacy code modernization agent." },
      { title: "Security Audit", icon: <Lock />, desc: "Pre-commit vulnerability scanning and patching." },
    ]
  },
  {
    id: "image",
    title: "Diffusion",
    icon: <ImageIcon className="w-4 h-4" />,
    color: { text: "text-fuchsia-600", bg: "bg-fuchsia-100", border: "border-fuchsia-200", fill: "bg-fuchsia-500", glow: "shadow-fuchsia-500/20" },
    features: [
      { title: "Vector Assets", icon: <Layers />, desc: "Generate infinite-resolution SVG icons and illustrations." },
      { title: "Texture Synthesis", icon: <Wand2 />, desc: "PBR-ready material maps for 3D environments." },
      { title: "Style Transfer", icon: <Sparkles />, desc: "Apply brand guidelines to raw generated assets." },
    ]
  },
  {
    id: "math",
    title: "Solver",
    icon: <Sigma className="w-4 h-4" />,
    color: { text: "text-amber-600", bg: "bg-amber-100", border: "border-amber-200", fill: "bg-amber-500", glow: "shadow-amber-500/20" },
    features: [
      { title: "Symbolic Logic", icon: <Cpu />, desc: "Step-by-step proofs for complex calculus and algebra." },
      { title: "Physics Engine", icon: <Layers />, desc: "Simulation of rigid body dynamics and fluid systems." },
      { title: "Financial Math", icon: <TrendingUp />, desc: "Black-Scholes and Monte Carlo simulations." },
    ]
  },
  {
    id: "reason",
    title: "Reasoning",
    icon: <BrainCircuit className="w-4 h-4" />,
    color: { text: "text-emerald-600", bg: "bg-emerald-100", border: "border-emerald-200", fill: "bg-emerald-500", glow: "shadow-emerald-500/20" },
    features: [
      { title: "Chain-of-Thought", icon: <BrainCircuit />, desc: "Transparency in decision making processes." },
      { title: "Legal Analysis", icon: <Share2 />, desc: "Contract review and risk assessment automation." },
      { title: "Strategy Gen", icon: <Target />, desc: "Market entry and competitive analysis reports." },
    ]
  },
];

// --- SHARED UI COMPONENTS ---

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
    <motion.div ref={divRef} onMouseMove={handleMouseMove} className={`relative overflow-hidden ${className}`}>
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
    className={`relative overflow-hidden px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 ${
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

// --- LIGHT THEME PREVIEW COMPONENTS ---

const CodePreview = () => (
  <div className="font-mono text-sm leading-relaxed p-8 h-full bg-white/40">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <span className="text-violet-600 font-bold">interface</span> <span className="text-amber-600">NeuralConfig</span> {"{"} <br />
      &nbsp;&nbsp;model: <span className="text-emerald-600">"hash-v4-turbo"</span>;<br />
      &nbsp;&nbsp;quantization: <span className="text-sky-600">"int8"</span>;<br />
      &nbsp;&nbsp;context_window: <span className="text-rose-500">128000</span>;<br />
      {"}"} <br /> <br />
      <span className="text-slate-400 italic">// Auto-generating implementation...</span><br />
      <span className="text-violet-600 font-bold">const</span> initSwarm = <span className="text-violet-600">async</span> (config: NeuralConfig) =&gt; {"{"}<br />
      &nbsp;&nbsp;<span className="text-violet-600 font-bold">await</span> Core.connect(<span className="text-emerald-600">"wss://edge.hash.ai"</span>);<br />
      &nbsp;&nbsp;<span className="text-violet-600 font-bold">return</span> <span className="text-violet-600">new</span> AgentSwarm(config);<br />
      {"}"}
    </motion.div>
  </div>
);

const DataPreview = () => (
  <div className="flex flex-col h-full p-8 space-y-6 bg-white/40">
    <div className="grid grid-cols-2 gap-4">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/60 border border-white/80 p-4 rounded-xl shadow-sm">
        <div className="text-slate-500 text-xs uppercase tracking-wider mb-1 font-bold">Revenue</div>
        <div className="text-3xl font-black text-slate-800 flex items-center gap-2">
          $1.2M <TrendingUp className="w-5 h-5 text-emerald-500" />
        </div>
      </motion.div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white/60 border border-white/80 p-4 rounded-xl shadow-sm">
        <div className="text-slate-500 text-xs uppercase tracking-wider mb-1 font-bold">Growth</div>
        <div className="text-3xl font-black text-slate-800 flex items-center gap-2">
          +24% <PieChart className="w-5 h-5 text-sky-500" />
        </div>
      </motion.div>
    </div>
    <div className="flex-1 bg-white/60 border border-white/80 rounded-xl p-6 flex items-end justify-between gap-4 shadow-sm">
      {[40, 70, 50, 90, 65, 85, 100].map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ delay: i * 0.1, duration: 0.8, type: "spring" }}
          className="w-full bg-sky-200 hover:bg-sky-300 rounded-t-md transition-colors relative group border border-sky-300/50"
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-sky-800 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
            {height}%
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ImagePreview = () => (
  <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-white/40">
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 bg-gradient-to-br from-fuchsia-100/50 via-violet-100/50 to-sky-100/50 z-0"
    />
    <div className="relative z-10 text-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 border-2 border-dashed border-fuchsia-300 rounded-full mx-auto mb-6 flex items-center justify-center bg-white/50 backdrop-blur-sm"
      >
        <Wand2 className="w-10 h-10 text-fuchsia-600" />
      </motion.div>
      <p className="text-fuchsia-700 font-mono font-bold animate-pulse tracking-widest uppercase text-sm">Rendering Assets...</p>
    </div>
    <motion.div 
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 w-full h-[2px] bg-fuchsia-400 shadow-[0_0_20px_rgba(192,38,211,0.5)] z-20"
    />
  </div>
);

const MathPreview = () => (
  <div className="flex flex-col justify-center h-full space-y-8 px-12 bg-white/40">
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
      <p className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">Input Equation</p>
      <div className="text-3xl font-serif italic text-slate-800">∫ (3x² + 2x + 5) dx</div>
    </motion.div>
    
    <motion.div 
      initial={{ height: 0, opacity: 0 }} 
      animate={{ height: "auto", opacity: 1 }} 
      transition={{ delay: 0.5 }}
      className="border-l-4 border-amber-300 pl-6 py-2"
    >
      <p className="text-amber-600 text-xs mb-2 uppercase tracking-wide font-bold">Step 1: Power Rule</p>
      <div className="text-xl font-serif text-slate-600">= 3(x³/3) + 2(x²/2) + 5x + C</div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ delay: 1 }}
      className="bg-amber-50 border border-amber-200 p-6 rounded-xl shadow-sm"
    >
      <p className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">Final Solution</p>
      <div className="text-3xl font-serif text-amber-600 font-black">x³ + x² + 5x + C</div>
    </motion.div>
  </div>
);

const ReasonPreview = () => (
  <div className="space-y-6 pt-8 px-8 h-full bg-white/40">
    <div className="flex items-center gap-3 text-emerald-600 mb-8 pb-4 border-b border-emerald-200/50">
      <BrainCircuit className="w-6 h-6 animate-pulse" />
      <span className="text-sm font-bold uppercase tracking-wider">Reasoning Engine v4.2</span>
    </div>
    
    {["Deconstructing input parameters...", "Searching knowledge graph...", "Identifying logical fallacies...", "Synthesizing optimal strategy..."].map((step, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.4 }}
        className="flex items-center gap-4"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        <span className="text-base text-slate-700 font-mono font-medium">{step}</span>
        {i === 3 && <span className="ml-auto text-xs text-emerald-600 font-black animate-pulse">COMPLETE</span>}
      </motion.div>
    ))}
  </div>
);

// --- MAIN COMPONENT ---

const Solutions = () => {
  const [activeToolId, setActiveToolId] = useState("data");
  const { scrollY } = useScroll();
  
  // Parallax + Opacity Transforms matching Home
  const yBlob1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const yBlob2 = useTransform(scrollY, [0, 1000], [0, -200]);

  // Find active tool data
  const activeTool = tools.find(t => t.id === activeToolId) || tools[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-violet-200 overflow-x-hidden">
      <Navbar />

      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
        <motion.div 
          style={{ y: yBlob1 }} 
          animate={{ 
            backgroundColor: ["rgba(186, 230, 253, 0.4)", "rgba(216, 180, 254, 0.4)", "rgba(186, 230, 253, 0.4)"],
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[900px] h-[900px] rounded-full blur-[140px] will-change-transform" 
        />
        <motion.div 
          style={{ y: yBlob2 }} 
          animate={{ 
            backgroundColor: ["rgba(249, 168, 212, 0.3)", "rgba(167, 243, 208, 0.4)", "rgba(249, 168, 212, 0.3)"],
            scale: [1, 1.2, 1],
            x: [0, 50, 0] 
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[20%] w-[700px] h-[700px] rounded-full blur-[140px] will-change-transform" 
        />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 pt-40 pb-20">
        
        {/* Header */}
        <div className="container mx-auto px-6 max-w-7xl mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-sm font-bold mb-8 shadow-sm"
          >
            <Cpu className="w-4 h-4" />
            <span>The Neural Suite</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-[1.1]">
            Tools for the <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>
              Cognitive Age.
            </span>
          </h1>
        </div>

        {/* --- CONTROL DECK (Navigation) --- */}
        <div className="container mx-auto px-6 max-w-5xl mb-16">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 p-2 rounded-full bg-white/40 border border-white/60 backdrop-blur-xl shadow-lg shadow-slate-200/50 w-fit mx-auto">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveToolId(tool.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeToolId === tool.id 
                    ? `bg-white ${tool.color.text} shadow-md border border-slate-200` 
                    : `text-slate-500 hover:text-slate-800 hover:bg-white/50 border border-transparent`
                }`}
              >
                {tool.icon}
                {tool.title}
              </button>
            ))}
          </div>
        </div>

        {/* --- MAIN STAGE (Preview Window) --- */}
        <div className="container mx-auto px-6 max-w-6xl mb-24">
          <div className="relative rounded-3xl p-2 bg-white/20 backdrop-blur-sm border border-white/40 shadow-2xl shadow-slate-200/50">
            <div className="relative rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 overflow-hidden aspect-[16/10] md:aspect-[21/9] shadow-inner">
              
              {/* Window Controls */}
              <div className="absolute top-0 left-0 w-full h-12 bg-white/40 border-b border-white/50 flex items-center justify-between px-6 z-20 backdrop-blur-md">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  <span>Hash_Runtime_v4.0</span>
                  <span className="text-slate-300">|</span>
                  <span className={activeTool.color.text}>Active: {activeTool.title}</span>
                </div>
              </div>

              {/* Dynamic Content */}
              <div className="h-full pt-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeToolId}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                  >
                    {activeToolId === "code" && <CodePreview />}
                    {activeToolId === "data" && <DataPreview />}
                    {activeToolId === "image" && <ImagePreview />}
                    {activeToolId === "math" && <MathPreview />}
                    {activeToolId === "reason" && <ReasonPreview />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Status Footer */}
              <div className="absolute bottom-0 w-full h-8 bg-white/40 border-t border-white/50 flex items-center justify-between px-6 text-[10px] text-slate-500 font-mono font-bold z-20 backdrop-blur-md">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-sm"></span> SYSTEM ONLINE</span>
                  <span>LATENCY: 12ms</span>
                </div>
                <span className={activeTool.color.text}>ENCRYPTED // TLS 1.3</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- FEATURE HIGHLIGHTS (Dynamic) --- */}
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {activeTool.features.map((feature, i) => (
                <motion.div
                  key={activeToolId + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1 }}
                  className="h-full"
                >
                  <SpotlightCard className="h-full p-8 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-xl hover:bg-white/60 shadow-xl shadow-slate-200/30 transition-all group">
                    <div className={`w-12 h-12 rounded-2xl ${activeTool.color.bg} flex items-center justify-center ${activeTool.color.text} mb-5 group-hover:scale-110 transition-transform shadow-sm`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed">{feature.desc}</p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* --- CTA --- */}
        <div className="mt-32 text-center container mx-auto px-6 max-w-4xl relative">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300 pointer-events-none" />
          
          <div className="relative z-10 p-12 md:p-24 rounded-[40px] bg-white/40 backdrop-blur-2xl border border-white/80 shadow-2xl shadow-violet-500/10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-slate-900 tracking-tight">Ready to generate insights?</h2>
            <div className="flex justify-center">
              <ShimmerButton>
                Get Full Access <ArrowRight className="w-5 h-5" />
              </ShimmerButton>
            </div>
          </div>
        </div>

      </div>

      <div className="relative z-50 border-t border-slate-200/50 bg-slate-50/80 backdrop-blur-lg">
        <Footer />
      </div>
    </div>
  );
};

export default Solutions;