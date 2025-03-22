
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, TrendingUp, BriefcaseBusiness, Building } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundItemsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Handle parallax mouse effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !backgroundItemsRef.current) return;
      
      const items = backgroundItemsRef.current.querySelectorAll('.parallax-item');
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the container
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      
      // Calculate center position
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      
      // Calculate distance from center (normalized)
      const distanceX = (mouseX - centerX) / centerX;
      const distanceY = (mouseY - centerY) / centerY;
      
      items.forEach((item, index) => {
        // Different items move at different rates
        const depth = (index % 3 + 1) * 15;
        const moveX = distanceX * depth;
        const moveY = distanceY * depth;
        
        // Apply the transform
        (item as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
    >
      {/* Background animated elements */}
      <div 
        ref={backgroundItemsRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="parallax-item absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-primary/5 animate-float"></div>
        <div className="parallax-item absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-blue-300/10 animate-pulse-soft delay-700"></div>
        <div className="parallax-item absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-primary/10 animate-float delay-500"></div>
        <div className="parallax-item absolute top-1/2 right-1/5 w-24 h-24 rounded-full bg-blue-400/20 animate-pulse-soft"></div>
        <div className="parallax-item absolute bottom-1/5 right-1/3 w-56 h-56 rounded-full bg-primary/5 animate-float delay-300"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-secondary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            <span className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t('discoverMatch')}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-gradient">{t('connect')},</span> {t('grow')}, 
            <br className="hidden md:block" /> {t('and')} 
            <span className="text-gradient"> {t('prosper')}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10"
          >
            {t('revolutionaryPlatform')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-xl"
          >
            <div className="relative flex-grow glass-card rounded-full overflow-hidden shadow-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')} 
                className="w-full bg-transparent py-3 pl-12 pr-4 text-foreground focus:outline-none focus:ring-0 border-none" 
              />
            </div>
            <Button 
              size="lg" 
              className="rounded-full magnetic-button button-glow flex items-center gap-2 px-6"
            >
              <span>{t('search')}</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex flex-wrap gap-8 justify-center"
          >
            <div className="flex items-center text-muted-foreground">
              <BriefcaseBusiness className="mr-2 h-5 w-5" />
              <span className="text-sm">{t('jobsAvailable')}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Building className="mr-2 h-5 w-5" />
              <span className="text-sm">{t('topCompanies')}</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
          <path 
            fill="currentColor" 
            fillOpacity="0.05" 
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,218.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
