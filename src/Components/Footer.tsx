import { BrainCircuit, Github, Twitter, Linkedin, ArrowRight, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-16 pb-8 relative overflow-hidden border-t border-slate-200/60 w-full">
      
      {/* Ambient Glows */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute top-[-20%] right-0 w-[400px] h-[400px] bg-violet-200/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none" />

      <div className="w-full px-6 md:px-12 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/*  Brand & Newsletter  */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:pr-8">
            <div className="flex items-center gap-2.5">
              <div className="relative bg-gradient-to-tr from-indigo-600 to-violet-500 p-2 rounded-xl shadow-sm">
                <BrainCircuit className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                Hash<span className="text-indigo-600">.</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Building the decentralized nervous system for the next generation of autonomous AI agents.
            </p>
            
            {/* Newsletter Input */}
            <div className="relative max-w-sm group mt-4">
              <input 
                type="email" 
                placeholder="Stay updated..." 
                className="w-full bg-white border border-slate-200 shadow-sm rounded-full py-2.5 pl-5 pr-12 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 text-white bg-slate-900 hover:bg-indigo-600 rounded-full p-1.5 transition-colors shadow-sm">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Spacer for large screens */}
          <div className="hidden xl:block xl:col-span-2"></div>
          <div className="lg:col-span-7 xl:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Product */}
            <div>
              <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-5">Product</h4>
              <ul className="space-y-3.5 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Edge Inference</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Agent SDK</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Marketplace</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Changelog</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-5">Company</h4>
              <ul className="space-y-3.5 text-sm text-slate-600">
                <li><a href="/about" className="hover:text-indigo-600 transition-colors">About Us</a></li>
                <li className="flex items-center">
                  <a href="#" className="hover:text-indigo-600 transition-colors">Careers</a> 
                  <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full ml-2 uppercase tracking-wide">Hiring</span>
                </li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-5">Location</h4>
              
              {/* Location Line */}
              <div className="flex items-start gap-2.5 text-sm text-slate-600 mb-6">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p>66 Neural Blvd, Suite 06</p>
                  <p>San Francisco, CA 94107</p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-6 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Hash#AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white shadow-sm px-3 py-1.5 rounded-full border border-slate-200/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            All systems operational
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;