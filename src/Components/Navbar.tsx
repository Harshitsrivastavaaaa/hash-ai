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
            ? 'top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] max-w-5xl rounded-full border border-white/10 bg-[#030014]/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] py-3 px-6'
            : 'top-0 w-full border-b border-transparent bg-transparent py-6 px-6'
        }`}
      >
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
          
          {/* --- Logo --- */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`relative flex items-center justify-center rounded-lg transition-all duration-300 ${scrolled ? 'p-1' : 'p-1.5 bg-fuchsia-500/10 border border-fuchsia-500/20'}`}>
               <BrainCircuit className={`text-fuchsia-400 transition-all ${scrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
            </div>
            <span className={`font-bold tracking-tight text-white transition-all ${scrolled ? 'text-lg' : 'text-xl'}`}>
              Hash#AI
            </span>
          </Link>

          {/* --- Desktop Menu --- */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* --- Desktop Action --- */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <button className={`
              group relative overflow-hidden rounded-full font-semibold text-sm text-white transition-all duration-300
              ${scrolled ? 'bg-fuchsia-600 px-5 py-2' : 'bg-white/5 border border-white/10 px-6 py-2.5 hover:border-fuchsia-500/50'}
            `}>
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                API Key <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* --- Mobile Toggle --- */}
          <button 
            className="md:hidden text-white hover:text-fuchsia-400 transition-colors"
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
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-[#030014]/90 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, i) => (
                <motion.a 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name} 
                  href={link.href} 
                  className="text-2xl font-medium text-white hover:text-fuchsia-400 transition-colors py-2 border-b border-white/5"
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
                  className="w-full text-center py-3 rounded-xl border border-white/10 text-white font-medium"
                >
                  Log in
                </Link>
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold shadow-lg shadow-fuchsia-900/20">
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