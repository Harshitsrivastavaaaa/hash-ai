import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

// --- DATA: RESEARCH PROJECTS ---
const projects = [
  {
    title: "Nebula IDE",
    category: "Dev Tools",
    status: "Public Beta",
    desc: "An AI-native code editor that predicts entire functions in real-time using our sparse mixture-of-experts model.",
    tags: ["Rust", "WASM", "Editor"],
    color: "cyan",
    icon: <Terminal className="w-6 h-6" />,
    link: "#"
  },
  {
    title: "Aegis Audit",
    category: "Security",
    status: "Live v2.1",
    desc: "Autonomous smart contract auditor. Detects reentrancy attacks and logic flaws before deployment.",
    tags: ["Solidity", "Formal Verification"],
    color: "emerald",
    icon: <ShieldCheck className="w-6 h-6" />,
    link: "#"
  },
  {
    title: "Flux Canvas",
    category: "Generative",
    status: "Alpha",
    desc: "Node-based visual interface for chaining diffusion models. Create complex image workflows without code.",
    tags: ["React Flow", "WebGL", "Diffusion"],
    color: "fuchsia",
    icon: <Layout className="w-6 h-6" />,
    link: "#"
  },
  {
    title: "Swarm CLI",
    category: "Infrastructure",
    status: "Stable",
    desc: "Command-line interface for deploying and orchestrating decentralized agent swarms on the edge.",
    tags: ["Go", "Distributed Systems"],
    color: "amber",
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

// --- COMPONENTS ---

const MetricCard = ({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="flex flex-col items-center justify-center p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
    <div className={`p-3 rounded-full bg-${color}-500/10 text-${color}-400 mb-3`}>
      {icon}
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-xs text-gray-400 uppercase tracking-widest">{label}</div>
  </div>
);

const ProjectCard = ({ project, index }: { project: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
  >
    {/* Hover Gradient */}
    <div className={`absolute inset-0 bg-gradient-to-br from-${project.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none`} />
    
    <div className="relative z-10 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-xl bg-${project.color}-500/10 text-${project.color}-400 border border-${project.color}-500/20`}>
          {project.icon}
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-[10px] font-bold uppercase tracking-wider text-${project.color}-400 mb-1`}>
            {project.status}
          </span>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
        {project.title}
      </h3>
      
      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
        {project.desc}
      </p>
      
      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag: string, i: number) => (
          <span key={i} className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5 font-mono">
            {tag}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <a 
        href={project.link} 
        className={`mt-auto w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300
          bg-white text-black hover:bg-${project.color}-400 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]`}
      >
        Launch App <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </motion.div>
);

// --- MAIN PAGE ---

const Research = () => {
  const { scrollY } = useScroll();
  // Parallax effects for background
  const yBlob1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const yBlob2 = useTransform(scrollY, [0, 1000], [0, -200]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen font-sans bg-[#030014] text-white selection:bg-fuchsia-500/30 overflow-x-hidden">
      <Navbar />

      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Cyan Blob for "Tech/Science" feel */}
        <motion.div style={{ y: yBlob1 }} className="absolute -top-[10%] -left-[10%] w-[900px] h-[900px] bg-cyan-600/10 rounded-full blur-[120px]" />
        {/* Indigo Blob for depth */}
        <motion.div style={{ y: yBlob2 }} className="absolute top-[30%] -right-[20%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px]" />
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-8">
                <Microscope className="w-4 h-4" />
                <span>Hash Research Labs</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                Redefining <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400">
                  Software Engineering.
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-10">
                We study how large language models understand code, reason about systems, and collaborate with humans. Our goal is to solve the <span className="text-white font-medium">Auto-Regressive Coding Problem</span>.
              </p>
              
              <div className="flex gap-4">
                <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <Zap className="w-4 h-4 fill-black" /> Live Demos
                </button>
                <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors font-medium flex items-center gap-2">
                  Read Manifesto
                </button>
              </div>
            </motion.div>

            {/* Right: Metrics Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 grid grid-cols-2 gap-4 w-full"
            >
              <MetricCard icon={<FileText className="w-6 h-6" />} label="Publications" value="42" color="cyan" />
              <MetricCard icon={<Network className="w-6 h-6" />} label="Citations" value="1.2k" color="fuchsia" />
              <MetricCard icon={<Cpu className="w-6 h-6" />} label="GPU Hours" value="850k" color="indigo" />
              <MetricCard icon={<Beaker className="w-6 h-6" />} label="Patents" value="14" color="emerald" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- ACTIVE PROJECTS GRID (Replaces Publications) --- */}
      <section className="relative z-10 py-32 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Active Projects</h2>
              <p className="text-gray-400 max-w-xl">
                We don't just write papers; we ship code. Explore our suite of experimental tools currently in open beta.
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-cyan-400 font-bold hover:text-white transition-colors group">
              View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- RESEARCH ROADMAP --- */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Path to Self-Recursive Code</h2>
            <p className="text-gray-400">Our roadmap for achieving Level 5 Software Autonomy.</p>
          </div>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 md:-translate-x-1/2"></div>

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
                  <div className="absolute left-[11px] md:left-1/2 top-1 w-5 h-5 rounded-full bg-[#030014] border-2 border-cyan-500 z-10 md:-translate-x-1/2 shadow-[0_0_15px_rgba(6,182,212,0.6)]"></div>

                  <div className="md:w-1/2 pl-12 md:pl-0">
                    <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors ${i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-4xl font-bold text-white/10">{m.year}</div>
                        {i === 3 && <div className="text-[10px] px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded uppercase font-bold tracking-wider">Future</div>}
                      </div>
                      <h3 className="text-xl font-bold text-cyan-400 mb-2 flex items-center gap-2">
                        {i === 3 ? <GitCommit className="w-4 h-4 animate-pulse" /> : <GitCommit className="w-4 h-4" />}
                        {m.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  
                  {/* Empty Spacer for Layout */}
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 mb-8 blur-lg animate-pulse"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Join the Lab
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Our research is open source. Join our Discord, fork the repo, and help us build the intelligence layer for software engineering.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Join Discord
            </button>
            <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors font-medium flex items-center gap-2">
              <GitCommit className="w-4 h-4" /> Fork Repo
            </button>
          </div>
        </div>
      </section>

      <div className="relative z-50 border-t border-white/5 bg-[#030014]">
        <Footer />
      </div>
    </div>
  );
};

export default Research;