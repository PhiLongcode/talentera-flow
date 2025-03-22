import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, MapPin, Briefcase, DollarSign, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  jobType: string;
  tags: string[];
  featured?: boolean;
  postedAt: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  logo,
  location,
  salary,
  jobType,
  tags,
  featured = false,
  postedAt,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle card 3D rotation effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to the card center
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    // Calculate the rotation degree based on mouse position
    // Reduce the effect by dividing by larger values
    const rotateY = -((e.clientX - cardCenterX) / 15);
    const rotateX = (e.clientY - cardCenterY) / 15;
    
    // Update mouse position for highlight effect
    const x = ((e.clientX - cardRect.left) / cardRect.width) * 100;
    const y = ((e.clientY - cardRect.top) / cardRect.height) * 100;
    setMousePosition({ x, y });
    
    // Apply transform directly for smoother effect
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    // Reset the card position smoothly
    cardRef.current.style.transition = 'transform 0.5s ease-out';
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    
    // Remove transition after animation completes
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.transition = '';
      }
    }, 500);
  };
  
  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <Link to={`/jobs/${id}`}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl overflow-hidden relative"
        style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px)' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Light effect following cursor */}
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(var(--primary), 0.3), transparent 50%)`,
            mixBlendMode: 'plus-lighter'
          }}
        />
        
        {featured && (
          <div className="absolute top-0 right-0">
            <div className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg flex items-center">
              <Star className="w-3 h-3 mr-1 text-yellow-300" />
              Featured
            </div>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-lg overflow-hidden mr-4 bg-secondary flex items-center justify-center">
                <img 
                  src={logo} 
                  alt={company} 
                  className="h-full w-full object-cover" 
                  onError={(e) => {
                    // If logo fails to load, show first letter of company
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.currentTarget.parentNode as HTMLElement).innerHTML = company.charAt(0);
                  }}
                />
              </div>
              <div>
                <h3 className="font-medium text-lg">{title}</h3>
                <p className="text-muted-foreground text-sm">{company}</p>
              </div>
            </div>
            <Button
              variant="ghost" 
              size="icon"
              className="rounded-full h-8 w-8 flex items-center justify-center"
              onClick={toggleSave}
            >
              <Bookmark 
                className={`h-4 w-4 transition-colors ${isSaved ? 'fill-primary text-primary' : ''}`} 
              />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1.5" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="w-4 h-4 mr-1.5" />
              <span>{jobType}</span>
            </div>
            <div className="flex items-center text-sm font-medium">
              <DollarSign className="w-4 h-4 mr-1.5 text-green-500" />
              <span>{salary}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Posted {postedAt}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="rounded-full font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button
              className="rounded-full button-glow"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle apply click if needed
              }}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default JobCard;
