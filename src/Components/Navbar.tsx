import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();

  // Handle scroll effect for dynamic sizing
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
      {/* Desktop & Tablet Floating Dock */}
      <motion.nav
        className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out flex items-center justify-between backdrop-blur-2xl border bg-white/40 shadow-[0_8px_32px_0_rgba(148,163,184,0.15)]
          ${scrolled 
            ? 'top-4 w-[90%] md:w-[75%] max-w-4xl rounded-[2rem] border-white/80 py-2.5 px-4 shadow-slate-200/50' 
            : 'top-6 w-[95%] md:w-[85%] max-w-6xl rounded-[2.5rem] border-white/50 py-4 px-6 shadow-transparent'
          }
        `}
      >
        {/* --- Logo --- */}
        <Link to="/" className="flex items-center gap-2.5 group pl-2">
          <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300 group-hover:scale-105">
             <BrainCircuit className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold tracking-tight text-slate-900 text-lg">
            Hash<span className="text-violet-600">#</span>
          </span>
        </Link>

        {/* --- Center: Magnetic Nav Links --- */}
        <div className="hidden md:flex items-center p-1.5 rounded-full bg-white/30 border border-white/40">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 rounded-full"
            >
              {/* Sliding Hover Background */}
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="nav-hover-bg"
                  className="absolute inset-0 bg-white shadow-sm border border-slate-100 rounded-full z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* --- Right Actions --- */}
        <div className="hidden md:flex items-center pr-2">
          <Link 
            to="/login" 
            className="text-sm font-bold text-slate-600 hover:text-violet-600 px-4 py-2 transition-colors"
          >
            Log in
          </Link>
        </div>

        {/* --- Mobile Menu Toggle --- */}
        <button 
          className="md:hidden relative z-50 p-2 rounded-full bg-white/50 border border-white/80 text-slate-800 hover:bg-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* --- Mobile App-Like Drawer --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-24 left-4 right-4 z-40 md:hidden overflow-hidden rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-slate-300/50 p-6"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link, i) => (
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  key={link.name}
                >
                  <Link 
                    to={link.href} 
                    className="block text-xl font-bold text-slate-800 hover:text-violet-600 transition-colors py-3 px-4 rounded-2xl hover:bg-white/60"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-4 mt-2 border-t border-slate-200/60 flex flex-col">
                <Link 
                  to="/login" 
                  className="w-full text-center py-3.5 rounded-2xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 active:scale-95 transition-transform"
                >
                  Log in
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-slate-900/10 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;