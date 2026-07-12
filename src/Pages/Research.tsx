import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";
import {
  FileText,
  Microscope,
  Network,
  Cpu,
  ArrowRight,
  Beaker,
  GitCommit,
  Terminal,
  ExternalLink,
  Zap,
  Layout,
  ShieldCheck,
  Bot
} from "lucide-react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const theme = {
  accent: "text-violet-600",
  gradientText: "from-violet-600 via-fuchsia-500 to-sky-500",
  buttonPrimary: "bg-violet-600 hover:bg-violet-500",
};

// --- DATA: RESEARCH PROJECTS ---
// Updated to use full Tailwind class strings to prevent purge issues
const projects = [
  {
    title: "Nebula IDE",
    category: "Dev Tools",
    status: "Public Beta",
    desc: "An AI-native code editor that predicts entire functions in real-time using our sparse mixture-of-experts model.",
    tags: ["Rust", "WASM", "Editor"],
    bg: "bg-violet-100",
    text: "text-violet-600",
    border: "border-violet-200",
    gradient: "from-violet-500/10",
    icon: <Terminal className="w-6 h-6" />,
    link: "#"
  },
  {
    title: "Aegis Audit",
    category: "Security",
    status: "Live v2.1",
    desc: "Autonomous smart contract auditor. Detects reentrancy attacks and logic flaws before deployment.",
    tags: ["Solidity", "Formal Verification"],
    bg: "bg-emerald-100",
    text: "text-emerald-600",
    border: "border-emerald-200",
    gradient: "from-emerald-500/10",
    icon: <ShieldCheck className="w-6 h-6" />,
    link: "#"
  },
  {
    title: "Flux Canvas",
    category: "Generative",
    status: "Alpha",
    desc: "Node-based visual interface for chaining diffusion models. Create complex image workflows without code.",
    tags: ["React Flow", "WebGL", "Diffusion"],
    bg: "bg-fuchsia-100",
    text: "text-fuchsia-600",
    border: "border-fuchsia-200",
    gradient: "from-fuchsia-500/10",
    icon: <Layout className="w-6 h-6" />,
    link: "#"
  },
  {
    title: "Swarm CLI",
    category: "Infrastructure",
    status: "Stable",
    desc: "Command-line interface for deploying and orchestrating decentralized agent swarms on the edge.",
    tags: ["Go", "Distributed Systems"],
    bg: "bg-amber-100",
    text: "text-amber-600",
    border: "border-amber-200",
    gradient: "from-amber-500/10",
    icon: <Bot className="w-6 h-6" />,
    link: "#"
  }
];

const milestones = [
  { year: "2023", title: "Code Completion", desc: "Hash-v1. Basic context-aware autocompletion using 7B parameter models." },
  { year: "2024", title: "The Agent Mesh", desc: "Launched decentralized grid. Agents can now plan multi-step refactoring tasks." },
  { year: "2025", title: "Semantic Understanding", desc: "Hash-v4 achieves state-of-the-art on complex architectural reasoning tasks." },
  { year: "2026", title: "Self-Recursion", desc: "Predicted: The first AI capable of rewriting its own source code to improve efficiency." },
];

// --- SHARED UI COMPONENTS (From Home Theme) ---

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

// --- SPECIFIC COMPONENTS ---

const MetricCard = ({ icon, label, value, bg, text }: { icon: any, label: string, value: string, bg: string, text: string }) => (
  <div className="flex flex-col items-center justify-center p-6 border border-white/60 rounded-3xl bg-white/40 backdrop-blur-xl shadow-xl shadow-slate-200/30 hover:bg-white/60 transition-colors">
    <div className={`p-3 rounded-2xl ${bg} ${text} mb-4 shadow-sm`}>
      {icon}
    </div>
    <div className="text-4xl font-black text-slate-800 mb-1">{value}</div>
    <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">{label}</div>
  </div>
);

const ProjectCard = ({ project, index }: { project: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="h-full"
  >
    <SpotlightCard className="h-full group relative p-8 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-xl hover:bg-white/60 transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-slate-200/50">
      
      {/* Hover Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none`} />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-2xl ${project.bg} ${project.text} border ${project.border} shadow-sm`}>
            {project.icon}
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${project.text} mb-1`}>
              {project.status}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
          </div>
        </div>
        
        <h3 className={`text-2xl font-bold text-slate-900 mb-3 group-hover:${project.text} transition-colors`}>
          {project.title}
        </h3>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium flex-grow">
          {project.desc}
        </p>
        
        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag: string, i: number) => (
            <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-white/50 text-slate-600 border border-slate-200 font-mono font-medium shadow-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <a 
          href={project.link} 
          className={`mt-auto w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300
            bg-white text-slate-800 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900`}
        >
          Launch App <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </SpotlightCard>
  </motion.div>
);

// --- MAIN PAGE ---

const Research = () => {
  const { scrollY } = useScroll();
  
  // Parallax + Opacity Transforms (Matched to Home theme)
  const yBlob1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const yBlob2 = useTransform(scrollY, [0, 1000], [0, -200]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-violet-200 overflow-x-hidden">
      <Navbar />

      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
        
        {/* Blob 1: Top Left - Pastel Soft Palette */}
        <motion.div 
          style={{ y: yBlob1 }} 
          animate={{ 
            backgroundColor: ["rgba(216, 180, 254, 0.4)", "rgba(186, 230, 253, 0.5)", "rgba(216, 180, 254, 0.4)"],
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[900px] h-[900px] rounded-full blur-[140px] will-change-transform" 
        />
        
        {/* Blob 2: Middle Right - Cool Tones */}
        <motion.div 
          style={{ y: yBlob2 }} 
          animate={{ 
            backgroundColor: ["rgba(167, 243, 208, 0.4)", "rgba(196, 181, 253, 0.4)", "rgba(167, 243, 208, 0.4)"],
            scale: [1, 1.2, 1],
            x: [0, 50, 0] 
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -right-[20%] w-[800px] h-[800px] rounded-full blur-[140px] will-change-transform" 
        />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-sm font-bold mb-8 shadow-sm">
                <Microscope className="w-4 h-4" />
                <span>Hash Research Labs</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900">
                Redefining <br/>
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>
                  Software Engineering.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 font-medium">
                We study how large language models understand code, reason about systems, and collaborate with humans. Our goal is to solve the <span className="text-slate-900 font-bold">Auto-Regressive Coding Problem</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <ShimmerButton>
                   Live Demos <Zap className="w-5 h-5 fill-white" />
                </ShimmerButton>
                <ShimmerButton secondary>
                  Read Manifesto
                </ShimmerButton>
              </div>
            </motion.div>

            {/* Right: Metrics Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 grid grid-cols-2 gap-6 w-full"
            >
              <MetricCard icon={<FileText className="w-6 h-6" />} label="Publications" value="42" bg="bg-sky-100" text="text-sky-600" />
              <MetricCard icon={<Network className="w-6 h-6" />} label="Citations" value="1.2k" bg="bg-fuchsia-100" text="text-fuchsia-600" />
              <MetricCard icon={<Cpu className="w-6 h-6" />} label="GPU Hours" value="850k" bg="bg-violet-100" text="text-violet-600" />
              <MetricCard icon={<Beaker className="w-6 h-6" />} label="Patents" value="14" bg="bg-emerald-100" text="text-emerald-600" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- ACTIVE PROJECTS GRID --- */}
      <section className="relative z-10 py-32 bg-white/20 backdrop-blur-lg border-y border-slate-200/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">Active Projects</h2>
              <p className="text-lg text-slate-600 max-w-xl font-medium">
                We don't just write papers; we ship code. Explore our suite of experimental tools currently in open beta.
              </p>
            </div>
            <button className={`hidden md:flex items-center gap-2 font-bold ${theme.accent} hover:text-violet-800 transition-colors group`}>
              View All Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- RESEARCH ROADMAP --- */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">Path to Self-Recursive Code</h2>
            <p className="text-lg text-slate-600 font-medium">Our roadmap for achieving Level 5 Software Autonomy.</p>
          </div>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-violet-200 to-transparent md:-translate-x-1/2 rounded-full"></div>

            <div className="space-y-16">
              {milestones.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.2 }}
                  className={`flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 relative`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[13px] md:left-1/2 top-4 w-5 h-5 rounded-full bg-white border-[4px] border-violet-500 z-10 md:-translate-x-1/2 shadow-lg shadow-violet-500/30"></div>

                  <div className="md:w-1/2 pl-14 md:pl-0">
                    <div className={`p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/30 hover:bg-white/60 transition-all ${i % 2 === 0 ? 'md:mr-14' : 'md:ml-14'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-5xl font-black text-slate-200">{m.year}</div>
                        {i === 3 && <div className="text-[10px] px-3 py-1 bg-violet-100 text-violet-700 rounded-full uppercase font-bold tracking-wider shadow-sm">Future</div>}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                        {i === 3 ? <GitCommit className="w-5 h-5 text-violet-500 animate-pulse" /> : <GitCommit className="w-5 h-5 text-slate-400" />}
                        {m.title}
                      </h3>
                      <p className="text-slate-600 font-medium leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  
                  {/* Empty Spacer for Alternating Layout */}
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 relative overflow-hidden">
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-30 blur-[120px] bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <div className="rounded-[40px] bg-white/40 p-12 md:p-24 border border-white/80 backdrop-blur-2xl shadow-2xl shadow-violet-500/10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">
              Join the Lab
            </h2>
            <p className="text-xl text-slate-600 mb-10 font-medium max-w-2xl mx-auto">
              Our research is open source. Join our Discord, fork the repo, and help us build the intelligence layer for software engineering.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5 relative z-10">
              <ShimmerButton>
                <Terminal className="w-5 h-5" /> Join Discord
              </ShimmerButton>
              <ShimmerButton secondary>
                <GitCommit className="w-5 h-5" /> Fork Repo
              </ShimmerButton>
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

export default Research;