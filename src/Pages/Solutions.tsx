import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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

// --- TOOL DATA ---
const tools = [
  {
    id: "data",
    title: "Intelligence",
    icon: <BarChart3 className="w-4 h-4" />,
    color: "cyan",
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
    color: "blue",
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
    color: "fuchsia",
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
    color: "amber",
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
    color: "emerald",
    features: [
      { title: "Chain-of-Thought", icon: <BrainCircuit />, desc: "Transparency in decision making processes." },
      { title: "Legal Analysis", icon: <Share2 />, desc: "Contract review and risk assessment automation." },
      { title: "Strategy Gen", icon: <Target />, desc: "Market entry and competitive analysis reports." },
    ]
  },
];

// --- PREVIEW COMPONENTS ---

const CodePreview = () => (
  <div className="font-mono text-sm leading-relaxed p-8 h-full bg-[#0d0d0d]">
    <div className="flex gap-2 mb-6 opacity-50">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
    </div>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <span className="text-fuchsia-400">interface</span> <span className="text-yellow-200">NeuralConfig</span> {"{"} <br />
      &nbsp;&nbsp;model: <span className="text-green-400">"hash-v4-turbo"</span>;<br />
      &nbsp;&nbsp;quantization: <span className="text-blue-400">"int8"</span>;<br />
      &nbsp;&nbsp;context_window: <span className="text-orange-400">128000</span>;<br />
      {"}"} <br /> <br />
      <span className="text-gray-500">// Auto-generating implementation...</span><br />
      <span className="text-fuchsia-400">const</span> initSwarm = <span className="text-blue-400">async</span> (config: NeuralConfig) =&gt; {"{"}<br />
      &nbsp;&nbsp;<span className="text-fuchsia-400">await</span> Core.connect(<span className="text-green-400">"wss://edge.hash.ai"</span>);<br />
      &nbsp;&nbsp;<span className="text-blue-400">return</span> <span className="text-fuchsia-400">new</span> AgentSwarm(config);<br />
      {"}"}
    </motion.div>
  </div>
);

const DataPreview = () => (
  <div className="flex flex-col h-full p-8 space-y-6 bg-[#0d0d0d]">
    <div className="grid grid-cols-2 gap-4">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/5 border border-white/10 p-4 rounded-xl">
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Revenue</div>
        <div className="text-3xl font-bold text-white flex items-center gap-2">
          $1.2M <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
      </motion.div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 p-4 rounded-xl">
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Growth</div>
        <div className="text-3xl font-bold text-white flex items-center gap-2">
          +24% <PieChart className="w-5 h-5 text-cyan-400" />
        </div>
      </motion.div>
    </div>
    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 flex items-end justify-between gap-4">
      {[40, 70, 50, 90, 65, 85, 100].map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ delay: i * 0.1, duration: 0.8, type: "spring" }}
          className="w-full bg-cyan-500/20 hover:bg-cyan-400/40 rounded-t transition-colors relative group"
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded">
            {height}%
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ImagePreview = () => (
  <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-[#0d0d0d]">
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/40 via-purple-900/40 to-blue-900/40 z-0"
    />
    <div className="relative z-10 text-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 border-2 border-dashed border-white/20 rounded-full mx-auto mb-6 flex items-center justify-center"
      >
        <Wand2 className="w-10 h-10 text-fuchsia-400" />
      </motion.div>
      <p className="text-fuchsia-200 font-mono animate-pulse tracking-widest uppercase text-sm">Rendering Assets...</p>
    </div>
    <motion.div 
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 w-full h-[2px] bg-fuchsia-500/50 shadow-[0_0_20px_rgba(232,121,249,0.5)] z-20"
    />
  </div>
);

const MathPreview = () => (
  <div className="flex flex-col justify-center h-full space-y-8 px-12 bg-[#0d0d0d]">
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
      <p className="text-gray-500 text-xs mb-2 uppercase tracking-widest">Input Equation</p>
      <div className="text-3xl font-serif italic text-white">∫ (3x² + 2x + 5) dx</div>
    </motion.div>
    
    <motion.div 
      initial={{ height: 0, opacity: 0 }} 
      animate={{ height: "auto", opacity: 1 }} 
      transition={{ delay: 0.5 }}
      className="border-l-4 border-amber-500/30 pl-6 py-2"
    >
      <p className="text-amber-400 text-xs mb-2 uppercase tracking-wide">Step 1: Power Rule</p>
      <div className="text-xl font-serif text-gray-300">= 3(x³/3) + 2(x²/2) + 5x + C</div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ delay: 1 }}
      className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-xl"
    >
      <p className="text-gray-500 text-xs mb-2 uppercase tracking-widest">Final Solution</p>
      <div className="text-3xl font-serif text-amber-400 font-bold">x³ + x² + 5x + C</div>
    </motion.div>
  </div>
);

const ReasonPreview = () => (
  <div className="space-y-6 pt-8 px-8 h-full bg-[#0d0d0d]">
    <div className="flex items-center gap-3 text-emerald-400 mb-8 pb-4 border-b border-white/5">
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
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
        <span className="text-base text-gray-300 font-mono">{step}</span>
        {i === 3 && <span className="ml-auto text-xs text-emerald-500 font-bold animate-pulse">COMPLETE</span>}
      </motion.div>
    ))}
  </div>
);

// --- MAIN COMPONENT ---

const Solutions = () => {
  const [activeToolId, setActiveToolId] = useState("data");
  const { scrollY } = useScroll();
  const yBlob1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const yBlob2 = useTransform(scrollY, [0, 1000], [0, -200]);

  // Find active tool data
  const activeTool = tools.find(t => t.id === activeToolId) || tools[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen font-sans bg-[#030014] text-white selection:bg-fuchsia-500/30 overflow-x-hidden">
      <Navbar />

      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div style={{ y: yBlob1 }} className="absolute -top-[10%] -left-[10%] w-[900px] h-[900px] bg-cyan-600/20 rounded-full blur-[120px]" />
        <motion.div style={{ y: yBlob2 }} className="absolute top-[20%] -right-[20%] w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[120px]" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 pt-40 pb-20">
        
        {/* Header */}
        <div className="container mx-auto px-6 max-w-7xl mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm font-medium mb-8"
          >
            <Cpu className="w-4 h-4" />
            <span>The Neural Suite</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Tools for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400">
              Cognitive Age.
            </span>
          </h1>
        </div>

        {/* --- CONTROL DECK (Navigation) --- */}
        <div className="container mx-auto px-6 max-w-5xl mb-12">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit mx-auto">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveToolId(tool.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeToolId === tool.id 
                    ? `bg-white/10 text-white shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] border border-white/20` 
                    : `text-gray-400 hover:text-white hover:bg-white/5 border border-transparent`
                }`}
              >
                {tool.icon}
                {tool.title}
              </button>
            ))}
          </div>
        </div>

        {/* --- MAIN STAGE (Preview Window) --- */}
        <div className="container mx-auto px-6 max-w-6xl mb-16">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
            <div className="relative rounded-[22px] bg-[#050505] border border-white/10 overflow-hidden aspect-[16/10] md:aspect-[21/9]">
              
              {/* Window Controls */}
              <div className="absolute top-0 left-0 w-full h-12 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-6 z-20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-wider">
                  <span>Hash_Runtime_v4.0</span>
                  <span className="text-white/20">|</span>
                  <span className={`text-${activeTool.color}-400`}>Active: {activeTool.title}</span>
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
              <div className="absolute bottom-0 w-full h-8 bg-[#0a0a0a] border-t border-white/5 flex items-center justify-between px-6 text-[10px] text-gray-500 font-mono z-20">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> SYSTEM ONLINE</span>
                  <span>LATENCY: 12ms</span>
                </div>
                <span className={`text-${activeTool.color}-500`}>ENCRYPTED // TLS 1.3</span>
              </div>
            </div>
            
            {/* Ambient Glow Behind Stage */}
            <div className={`absolute -inset-10 z-[-1] blur-[100px] opacity-20 transition-colors duration-700 bg-${activeTool.color}-600`} />
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
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-${activeTool.color}-500/10 flex items-center justify-center text-${activeTool.color}-400 mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center container mx-auto px-6">
          <div className="max-w-3xl mx-auto p-12 rounded-[30px] bg-gradient-to-b from-white/5 to-transparent border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to generate insights?</h2>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto shadow-xl shadow-white/10">
              Get Full Access <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      <div className="relative z-50 border-t border-white/5 bg-[#030014]">
        <Footer />
      </div>
    </div>
  );
};

export default Solutions;