
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import JobsList from '@/components/home/JobsList';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/layout/Footer';

const Index = () => {
  // Smooth scroll to top on component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col"
      >
        <Header />
        
        <main className="flex-grow">
          <Hero />
          <JobsList />
          <FeaturesSection />
          <CTASection />
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
