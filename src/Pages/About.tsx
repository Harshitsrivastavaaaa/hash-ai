import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Users, 
  Globe, 
  Shield, 
  Code2, 
  Target, 
  Linkedin, 
  Twitter, 
  ArrowUpRight 
} from "lucide-react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// --- THEME ---
const theme = {
  accent: "text-fuchsia-400",
  gradientText: "from-fuchsia-400 via-violet-400 to-cyan-400",
};

// --- DATA ---
const stats = [
  { label: "Models Served", value: "30M+" },
  { label: "Edge Nodes", value: "14k" },
  { label: "Contributors", value: "850+" },
  { label: "Uptime", value: "99.99%" },
];

const values = [
  {
    icon: <Shield />,
    title: "Radical Privacy",
    desc: "We believe AI should serve the user, not the surveillance economy. Your weights, your data, your rules.",
  },
  {
    icon: <Globe />,
    title: "Decentralization",
    desc: "A single entity shouldn't control the world's intelligence. We are building the distributed neural grid.",
  },
  {
    icon: <Code2 />,
    title: "Developer Obsession",
    desc: "We build tools we want to use. CLI-first, type-safe, and blazingly fast execution.",
  },
];

const team = [
  {
    name: "Alexei V.",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    bio: "Ex-OpenAI researcher. Building the future of distributed inference."
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
    bio: "Rustacean & Systems Architect. Previously scaled infrastructure at Cloudflare."
  },
  {
    name: "Marcus J.",
    role: "Head of Product",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
    bio: "Design systems expert. Turning complex neural networks into simple APIs."
  },
  {
    name: "Elena R.",
    role: "Lead AI Engineer",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces",
    bio: "PhD in Quantization. Making LLMs run on toasters since 2020."
  },
];

// --- COMPONENTS ---

const TeamCard = ({ member, index }: { member: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative"
  >
    <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-fuchsia-500/50">
      {/* Image Container */}
      <div className="aspect-square overflow-hidden relative">
        <div className="absolute inset-0 bg-fuchsia-600/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img 
          src={member.img} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        
        {/* Social Overlay */}
        <div className="absolute bottom-4 left-4 flex gap-2 z-20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-fuchsia-600 text-white transition-colors">
            <Twitter className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-fuchsia-600 text-white transition-colors">
            <Linkedin className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-fuchsia-400 text-sm font-medium mb-4">{member.role}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  const { scrollY } = useScroll();
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
        <motion.div style={{ y: yBlob1 }} className="absolute -top-[10%] -left-[10%] w-[900px] h-[900px] bg-fuchsia-600/20 rounded-full blur-[120px]" />
        <motion.div style={{ y: yBlob2 }} className="absolute top-[20%] -right-[20%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-fuchsia-300 text-sm font-medium mb-8">
              <Target className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Democratizing the <br/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>
                Fabric of Intelligence.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Hash#AI was born from a simple belief: Artificial Intelligence is too powerful to be controlled by a handful of corporations. We are building the decentralized nervous system for the open web.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- STATS GRID --- */}
      <section className="relative z-10 py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Core Values</h2>
            <p className="text-gray-400 text-lg max-w-xl">
              We are a team of researchers, hackers, and idealists working to rewrite the rules of AI compute.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-3xl bg-[#0a0a0a]/50 border border-white/10 backdrop-blur-sm hover:bg-white/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 mb-6 group-hover:scale-110 transition-transform">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="relative z-10 py-32 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet the Minds</h2>
              <p className="text-gray-400">The humans behind the machine intelligence.</p>
            </div>
            <button className="text-fuchsia-400 hover:text-white transition-colors flex items-center gap-2 font-medium">
              Join the team <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <TeamCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Build the future with us.
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            We are always looking for brilliant minds to help us scale the Neural Grid. 
            Remote-first, open-source, and deeply technical.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
              View Open Roles
            </button>
            <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors font-medium">
              Read Culture Docs
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

export default About;