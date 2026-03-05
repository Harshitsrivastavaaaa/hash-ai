import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Solutions', href: '/solutions' },
    { name: 'Research', href: '/research' },
    { name: 'Pricing', href: '#' },
    { name: 'Docs', href: '#' },
  ];

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? 'top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] max-w-5xl rounded-full border border-white/80 bg-white/50 backdrop-blur-xl shadow-xl shadow-slate-200/50 py-3 px-6'
            : 'top-0 w-full border-b border-transparent bg-transparent py-6 px-6'
        }`}
      >
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
          
          {/* --- Logo --- */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`relative flex items-center justify-center rounded-lg transition-all duration-300 ${scrolled ? 'p-1' : 'p-1.5 bg-violet-100 border border-violet-200'}`}>
               <BrainCircuit className={`text-violet-600 transition-all ${scrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
            </div>
            <span className={`font-extrabold tracking-tight text-slate-900 transition-all ${scrolled ? 'text-lg' : 'text-xl'}`}>
              Hash#AI
            </span>
          </Link>

          {/* --- Desktop Menu --- */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-semibold text-slate-600 hover:text-violet-700 px-4 py-2 rounded-full hover:bg-white/60 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* --- Desktop Action --- */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-sm font-bold text-slate-600 hover:text-violet-700 transition-colors"
            >
              Log in
            </Link>
            <button className={`
              group relative overflow-hidden rounded-full font-bold text-sm transition-all duration-300
              ${scrolled 
                ? 'bg-violet-600 text-white px-5 py-2 shadow-md shadow-violet-500/25' 
                : 'bg-white/60 border border-slate-200 text-slate-800 px-6 py-2.5 hover:border-violet-300 hover:bg-white'}
            `}>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className={`relative flex items-center gap-2 ${scrolled ? 'text-white' : 'text-slate-800 group-hover:text-white transition-colors duration-300'}`}>
                API Key <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* --- Mobile Toggle --- */}
          <button 
            className="md:hidden text-slate-800 hover:text-violet-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay (Full Screen) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-slate-50/90 pt-24 px-6 md:hidden border-b border-white/50 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, i) => (
                <motion.a 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name} 
                  href={link.href} 
                  className="text-2xl font-bold text-slate-800 hover:text-violet-600 transition-colors py-3 border-b border-slate-200/50"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-8 flex flex-col gap-4"
              >
                <Link 
                  to="/login" 
                  className="w-full text-center py-3 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition-colors"
                >
                  Log in
                </Link>
                <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold shadow-lg shadow-violet-500/25 active:scale-95 transition-transform">
                  Get Started
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;