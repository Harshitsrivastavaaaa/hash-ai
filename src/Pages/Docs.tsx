import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence
} from "framer-motion";
import {
  Book,
  Terminal,
  Cpu,
  Shield,
  Zap,
  ChevronRight,
  Search,
  Menu,
  X,
  Copy,
  Check,
  Info,
  ArrowRight
} from "lucide-react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const theme = {
  accent: "text-violet-600",
  gradientText: "from-violet-600 via-fuchsia-500 to-sky-500",
  buttonPrimary: "bg-violet-600 hover:bg-violet-500",
};

// --- DOCS NAVIGATION DATA ---
const navSections = [
  {
    title: "Getting Started",
    items: [
      { id: "intro", label: "Introduction", icon: <Book className="w-4 h-4" /> },
      { id: "install", label: "Installation", icon: <Terminal className="w-4 h-4" /> },
      { id: "quickstart", label: "Quickstart Guide", icon: <Zap className="w-4 h-4" /> },
    ]
  },
  {
    title: "Core Concepts",
    items: [
      { id: "swarms", label: "Agent Swarms", icon: <Cpu className="w-4 h-4" /> },
      { id: "quantization", label: "Model Quantization", icon: <Book className="w-4 h-4" /> },
      { id: "security", label: "Zero-Knowledge", icon: <Shield className="w-4 h-4" /> },
    ]
  }
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
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.1), transparent 40%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
};

const DocCodeBlock = ({ code, language = "bash" }: { code: string, language?: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    setCopied(true);
    // In a real app, you'd use navigator.clipboard.writeText(code)
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm group w-full">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100/50 border-b border-white/50">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{language}</span>
        <button onClick={handleCopy} className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-white transition-colors">
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-slate-700">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const Docs = () => {
  const [activeId, setActiveId] = useState("install");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const yBlob1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const yBlob2 = useTransform(scrollY, [0, 1000], [0, -100]);

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
            backgroundColor: ["rgba(216, 180, 254, 0.3)", "rgba(186, 230, 253, 0.4)", "rgba(216, 180, 254, 0.3)"],
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0] 
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[1200px] h-[1200px] rounded-full blur-[160px] will-change-transform" 
        />
        <motion.div 
          style={{ y: yBlob2 }} 
          animate={{ 
            backgroundColor: ["rgba(167, 243, 208, 0.3)", "rgba(249, 168, 212, 0.3)", "rgba(167, 243, 208, 0.3)"],
            scale: [1, 1.2, 1],
            x: [0, 50, 0] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[10%] w-[1000px] h-[1000px] rounded-full blur-[140px] will-change-transform" 
        />
      </div>

      {/* --- CONTENT --- */}
      {/* Expanded to full width using w-full and generous responsive padding */}
      <div className="relative z-10 pt-32 pb-24 w-full px-4 sm:px-6 md:px-12 lg:px-16 2xl:px-24">
        
        {/* Header / Search */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Documentation
            </h1>
            <p className="text-lg text-slate-600 font-medium">Everything you need to build with Hash#AI.</p>
          </div>
          <div className="relative w-full xl:w-1/3 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search docs..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 border border-white/80 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-sm placeholder:text-slate-400 font-medium text-slate-900 transition-all hover:bg-white/80"
            />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center gap-2 mb-6 px-4 py-2 rounded-xl bg-white/60 border border-white/80 font-bold text-violet-600 shadow-sm"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          {mobileMenuOpen ? "Close Menu" : "Menu"}
        </button>

        {/* Main Glassmorphic Container - Spanning Full Width */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] p-6 md:p-10 lg:p-12 shadow-2xl shadow-slate-200/50 w-full min-h-[75vh]">
          
          {/* Sidebar Navigation */}
          <aside className={`${mobileMenuOpen ? "block" : "hidden"} md:block w-full md:w-72 lg:w-80 shrink-0 md:border-r border-slate-200/50 pr-4 lg:pr-8`}>
            <div className="sticky top-32 space-y-10">
              {navSections.map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5 ml-3">
                    {section.title}
                  </h4>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setActiveId(item.id); setMobileMenuOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                          activeId === item.id
                            ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                            : "text-slate-600 hover:bg-white/80 hover:text-slate-900 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`${activeId === item.id ? "text-violet-200" : "text-slate-400"}`}>
                            {item.icon}
                          </span>
                          {item.label}
                        </div>
                        {activeId === item.id && <ChevronRight className="w-4 h-4 opacity-50" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 pb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-6xl 2xl:max-w-7xl"
              >
                
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-bold mb-8 shadow-sm">
                  Getting Started
                </div>
                
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">Installation</h2>
                
                {/* Text is constrained to max-w-4xl for readability, while allowing the container to stretch */}
                <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10 max-w-4xl">
                  Get up and running with Hash#AI in minutes. Our unified CLI tool handles the installation of the core daemon, language SDKs, and local quantization engines.
                </p>

                <SpotlightCard className="p-8 rounded-3xl bg-sky-50 border border-sky-200 mb-14 group w-full shadow-sm">
                  <div className="flex gap-5">
                    <div className="mt-1 shrink-0">
                      <Info className="w-8 h-8 text-sky-500" />
                    </div>
                    <div>
                      <h4 className="text-xl text-sky-900 font-bold mb-2">System Requirements</h4>
                      <p className="text-sky-700 text-base font-medium max-w-3xl leading-relaxed">
                        Ensure you have <strong>Node.js 18+</strong> or <strong>Rust 1.70+</strong> installed. For local edge execution, a minimum of 8GB unified memory is recommended for optimal inference speed.
                      </p>
                    </div>
                  </div>
                </SpotlightCard>

                <div className="space-y-16">
                  
                  {/* Step 1 */}
                  <section className="w-full">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 flex items-center gap-4">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-base">1</span>
                      Install the CLI
                    </h3>
                    <p className="text-lg text-slate-600 font-medium mb-6 max-w-4xl">
                      The easiest way to install the Hash toolchain is via our universal install script. This will detect your operating system architecture and install the correct binaries automatically.
                    </p>
                    <DocCodeBlock 
                      language="bash" 
                      code={`curl -fsSL https://get.hash.ai/install | sh`} 
                    />
                  </section>

                  {/* Step 2 */}
                  <section className="w-full">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 flex items-center gap-4">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-base">2</span>
                      Initialize your project
                    </h3>
                    <p className="text-lg text-slate-600 font-medium mb-6 max-w-4xl">
                      Navigate to your project directory and run the initialization command. This creates a <code className="px-2 py-1 rounded-md bg-white border border-slate-200 shadow-sm text-violet-700 text-sm font-bold">hash.config.ts</code> file in your root folder.
                    </p>
                    <DocCodeBlock 
                      language="bash" 
                      code={`cd my-awesome-project\nhash init`} 
                    />
                  </section>

                  {/* Step 3 */}
                  <section className="w-full">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 flex items-center gap-4">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-base">3</span>
                      Add Language SDKs
                    </h3>
                    <p className="text-lg text-slate-600 font-medium mb-6 max-w-4xl">
                      Depending on your stack, install the specific SDK. We support npm, cargo, and go modules natively for seamless integration.
                    </p>
                    <DocCodeBlock 
                      language="npm" 
                      code={`npm install @hash-ai/core @hash-ai/react`} 
                    />
                  </section>

                </div>

                {/* Next Steps Footer */}
                <div className="mt-20 pt-10 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
                  <div className="text-slate-500 font-bold text-sm tracking-wide uppercase">
                    Last updated on October 24, 2024
                  </div>
                  <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/80 border border-slate-200 font-bold text-slate-800 hover:bg-white hover:text-violet-600 hover:shadow-lg hover:shadow-violet-500/10 transition-all">
                    Next: Quickstart Guide <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <div className="relative z-50 border-t border-slate-200/50 bg-slate-50/80 backdrop-blur-lg">
        <Footer />
      </div>
    </div>
  );
};

export default Docs;