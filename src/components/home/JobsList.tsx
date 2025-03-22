
import React from 'react';
import { motion } from 'framer-motion';
import JobCard from './JobCard';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

// Sample job data
const jobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechFusion',
    logo: 'https://images.unsplash.com/photo-1549921296-3b0f9a35af35?q=80&w=100&auto=format&fit=crop',
    location: 'San Francisco, CA',
    salary: '$120K - $150K',
    jobType: 'Full-time',
    tags: ['React', 'TypeScript', 'Remote'],
    featured: true,
    postedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'Designo Studios',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100&auto=format&fit=crop',
    location: 'New York, NY',
    salary: '$90K - $120K',
    jobType: 'Full-time',
    tags: ['Figma', 'UI Design', 'Prototyping'],
    featured: true,
    postedAt: '3 days ago',
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'DataFlow',
    logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=100&auto=format&fit=crop',
    location: 'Austin, TX',
    salary: '$110K - $140K',
    jobType: 'Full-time',
    tags: ['Node.js', 'MongoDB', 'AWS'],
    featured: false,
    postedAt: '1 week ago',
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'InnovateCorp',
    logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=100&auto=format&fit=crop',
    location: 'Seattle, WA',
    salary: '$130K - $160K',
    jobType: 'Full-time',
    tags: ['Product', 'Agile', 'Strategy'],
    featured: false,
    postedAt: '3 days ago',
  },
  {
    id: '5',
    title: 'Marketing Specialist',
    company: 'GrowthHackers',
    logo: 'https://images.unsplash.com/photo-1529612700005-e35377bf1415?q=80&w=100&auto=format&fit=crop',
    location: 'Remote',
    salary: '$70K - $90K',
    jobType: 'Contract',
    tags: ['Digital Marketing', 'SEO', 'Content'],
    featured: false,
    postedAt: '4 days ago',
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudStack',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=100&auto=format&fit=crop',
    location: 'Boston, MA',
    salary: '$100K - $135K',
    jobType: 'Full-time',
    tags: ['Kubernetes', 'Docker', 'CI/CD'],
    featured: false,
    postedAt: '1 week ago',
  },
];

const JobsList = () => {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Featured Opportunities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Discover top positions from industry-leading companies, 
            with blockchain-verified credentials and AI-powered matching.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <JobCard
              key={job.id}
              {...job}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Button
            variant="outline"
            className="rounded-full group hover:bg-primary hover:text-primary-foreground"
          >
            <span>View All Opportunities</span>
            <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default JobsList;
