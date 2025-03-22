
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Brain, LineChart, Users } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Secure Blockchain Verification',
    description: 'Your credentials and experience are securely stored on blockchain, ensuring authenticity and immutability.',
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: 'AI-Powered Job Matching',
    description: 'Our advanced algorithms analyze your skills and preferences to recommend the most suitable opportunities.',
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: 'Data-Driven Insights',
    description: 'Access real-time market analytics and salary data to make informed career decisions.',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Professional Networking',
    description: 'Connect with industry leaders and peers to expand your professional network and discover new opportunities.',
  },
];

const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="py-20 px-4 md:px-6 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl"
        />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Why Choose TalenteraFlow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Our platform combines cutting-edge technology with intuitive design 
            to create a seamless recruitment experience.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
