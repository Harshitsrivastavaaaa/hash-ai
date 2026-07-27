import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Solutions', href: '/solutions' },
    { name: 'Research', href: '/research' },
    { name: 'Pricing', href: '#' },
    { name: 'Docs', href: '/docs' },
  ];

  return (
    <>
      {/* Desktop Navigation - Premium Edge-to-Edge */}
      <motion.nav 
        className={`fixed top-0 inset-x-0 z-50 w-full flex items-center justify-between px-6 md:px-12 transition-all duration-500
          ${scrolled 
            ? 'py-4 bg-white/60 backdrop-blur-2xl border-b border-white/80 shadow-[0_4px_30px_rgba(0,0,0,0.04)]' 
            : 'py-6 bg-transparent border-b-transparent shadow-none'}`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative bg-gradient-to-tr from-indigo-600 to-violet-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-105">
            <BrainCircuit className="w-5 h-5 text-white" />
            {/* Subtle glow behind logo */}
            <div className="absolute inset-0 bg-indigo-500 blur-md -z-10 opacity-50 group-hover:opacity-80 transition-opacity" />
          </div>
          <span className="font-extrabold text-slate-900 tracking-tight text-xl">
            Hash<span className="text-indigo-600">.</span>
          </span>
        </Link>

        {/* Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-700"
            >
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 bg-indigo-50/80 border border-indigo-100/50 rounded-xl z-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Actions (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-5">
          <Link 
            to="/login" 
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign in
          </Link>
          <Link 
            to="/signup" 
            className="relative group flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-xl overflow-hidden shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
          >
            {/* Animated Gradient Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative z-50 p-2.5 rounded-xl bg-slate-100/50 text-slate-900 hover:bg-slate-200/50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.div>
        </button>
      </motion.nav>

      {/* Full-Screen Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden bg-white/80 flex flex-col justify-center px-8 overflow-hidden"
          >
            {/* Ambient Mobile Background Blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            
            <div className="relative z-10 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 300, damping: 24 }}
                  className="border-b border-slate-200/60 pb-4"
                >
                  <Link 
                    to={link.href} 
                    className="text-4xl font-extrabold text-slate-800 hover:text-indigo-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 24 }}
                className="flex flex-col gap-4 mt-8"
              >
                <Link 
                  to="/login" 
                  className="w-full py-4 rounded-2xl text-lg font-bold text-slate-700 bg-white/50 border border-slate-200 backdrop-blur-md shadow-sm text-center hover:bg-white transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  to="/signup" 
                  className="w-full py-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-slate-900 to-slate-800 shadow-xl shadow-slate-900/20 text-center active:scale-95 transition-transform"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;