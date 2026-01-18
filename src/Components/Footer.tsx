import React from 'react';
import { BrainCircuit, Github, Twitter, Linkedin, ArrowRight, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#030014] pt-20 pb-10 relative overflow-hidden">
      
      {/* Top Gradient Line (Cosmic Glow) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Newsletter */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 p-1.5 rounded-lg">
                <BrainCircuit className="w-5 h-5 text-fuchsia-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Hash#AI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building the decentralized nervous system for the next generation of autonomous AI agents.
            </p>
            
            {/* Newsletter Input */}
            <div className="relative max-w-xs group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-fuchsia-400 transition-colors p-1">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Edge Inference</a></li>
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Agent SDK</a></li>
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Model Marketplace</a></li>
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="/About" className="hover:text-fuchsia-400 transition-colors">About Us</a></li>
              <li>
                <a href="#" className="hover:text-fuchsia-400 transition-colors">Careers</a> 
                <span className="text-[10px] bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 px-2 py-0.5 rounded-full ml-2">Hiring</span>
              </li>
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Legal & Privacy</a></li>
              <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 4: Connect & Location */}
          <div>
            <h4 className="text-white font-semibold mb-6">Connect</h4>
            
            {/* Social Icons */}
            <div className="flex gap-4 mb-8">
              <SocialIcon icon={<Github className="w-5 h-5" />} />
              <SocialIcon icon={<Twitter className="w-5 h-5" />} />
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
            </div>

            {/* Location Line */}
            <div className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin className="w-5 h-5 text-fuchsia-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-white font-medium">Headquarters</p>
                <p>66 Neural Blvd, Suite 06</p>
                <p>San Francisco, CA 94107</p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Hash#AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Hash# Hyper Network Online
          </div>
        </div>

      </div>
    </footer>
  );
};

// Helper component for social icons
const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a 
    href="#" 
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-fuchsia-600 hover:text-white hover:border-fuchsia-500 transition-all duration-300 group"
  >
    <div className="group-hover:scale-110 transition-transform">
      {icon}
    </div>
  </a>
);

export default Footer;