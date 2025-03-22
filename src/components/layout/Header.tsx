
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Moon, Sun, Search, BriefcaseBusiness, Building, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Search className="w-4 h-4 mr-2" /> },
    { name: 'Find Jobs', path: '/jobs', icon: <BriefcaseBusiness className="w-4 h-4 mr-2" /> },
    { name: 'Employers', path: '/employers', icon: <Building className="w-4 h-4 mr-2" /> },
    { name: 'Post Job', path: '/post-job', icon: <User className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass-card' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold text-gradient"
            >
              TalenteraFlow
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="group relative px-4 py-2 rounded-full overflow-hidden"
              >
                <span className="relative z-10 flex items-center text-sm font-medium text-foreground group-hover:text-primary">
                  {item.icon}
                  {item.name}
                </span>
                <span className="absolute inset-0 bg-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out rounded-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-secondary"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </Button>
            
            <Link to="/login">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 rounded-full hover:bg-secondary"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
            
            <Link to="/register">
              <Button 
                className="rounded-full button-glow"
              >
                Join Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-card mt-1 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-secondary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
              <div className="flex flex-col pt-3 border-t border-border gap-2">
                <Link 
                  to="/login" 
                  className="w-full" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link 
                  to="/register" 
                  className="w-full" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full button-glow">
                    Join Now
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
