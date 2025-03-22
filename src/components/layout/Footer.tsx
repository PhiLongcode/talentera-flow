
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Twitter, Facebook, Linkedin, Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold text-gradient">TalenteraFlow</h3>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Revolutionizing recruitment through blockchain verification
              and AI-powered matching, creating a transparent and efficient
              ecosystem for job seekers and employers.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Find Jobs', 'For Employers', 'Pricing'].map((item, index) => (
                <li key={index}>
                  <Link 
                    to="/" 
                    className="text-muted-foreground hover:text-foreground flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:translate-x-1" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-medium text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {['Blog', 'Documentation', 'Support Center', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                <li key={index}>
                  <Link 
                    to="/" 
                    className="text-muted-foreground hover:text-foreground flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:translate-x-1" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-medium text-lg mb-4">Stay Updated</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and opportunities.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="rounded-l-full rounded-r-none border-r-0" 
                />
                <Button className="rounded-r-full rounded-l-none">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} TalenteraFlow. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
