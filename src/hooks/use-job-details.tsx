
import { useState, useEffect } from 'react';

// Re-using the job data from JobsList component
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
  {
    id: '7',
    title: 'Data Scientist',
    company: 'AISolutions',
    logo: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=100&auto=format&fit=crop',
    location: 'Toronto, Canada',
    salary: '$115K - $140K',
    jobType: 'Full-time',
    tags: ['Python', 'Machine Learning', 'Data Analysis'],
    featured: false,
    postedAt: '3 days ago',
  },
  {
    id: '8',
    title: 'Front-end Developer',
    company: 'WebCreators',
    logo: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=100&auto=format&fit=crop',
    location: 'Berlin, Germany',
    salary: '€60K - €80K',
    jobType: 'Full-time',
    tags: ['JavaScript', 'React', 'CSS'],
    featured: false,
    postedAt: '1 week ago',
  },
  {
    id: '9',
    title: 'AI Research Engineer',
    company: 'NeuraTech',
    logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=100&auto=format&fit=crop',
    location: 'Remote',
    salary: '$140K - $180K',
    jobType: 'Full-time',
    tags: ['AI', 'Deep Learning', 'PyTorch'],
    featured: true,
    postedAt: '2 days ago',
  },
  {
    id: '10',
    title: 'Mobile App Developer',
    company: 'AppWorks',
    logo: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=100&auto=format&fit=crop',
    location: 'Singapore',
    salary: '$90K - $120K',
    jobType: 'Full-time',
    tags: ['React Native', 'iOS', 'Android'],
    featured: false,
    postedAt: '5 days ago',
  },
  {
    id: '11',
    title: 'Technical Writer',
    company: 'DocuTech',
    logo: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=100&auto=format&fit=crop',
    location: 'Remote',
    salary: '$70K - $90K',
    jobType: 'Contract',
    tags: ['Documentation', 'API', 'Technical Writing'],
    featured: false,
    postedAt: '1 week ago',
  },
  {
    id: '12',
    title: 'Blockchain Developer',
    company: 'CryptoFuture',
    logo: 'https://images.unsplash.com/photo-1639152201720-5e536d254d81?q=80&w=100&auto=format&fit=crop',
    location: 'Zurich, Switzerland',
    salary: '$130K - $160K',
    jobType: 'Full-time',
    tags: ['Blockchain', 'Ethereum', 'Solidity'],
    featured: true,
    postedAt: '3 days ago',
  },
];

export type Job = {
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
};

export const useJobDetails = (jobId: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Simulate API call with setTimeout
    const fetchJobDetails = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const foundJob = jobs.find(j => j.id === jobId) || null;
        setJob(foundJob);
        
        if (foundJob) {
          // Find related jobs based on matching tags
          const related = jobs
            .filter(j => 
              j.id !== jobId && 
              j.tags.some(tag => foundJob.tags.includes(tag))
            )
            .slice(0, 3); // Limit to 3 related jobs
          
          setRelatedJobs(related);
        }
        
        setIsLoading(false);
      }, 800); // Simulate network delay
    };

    fetchJobDetails();
  }, [jobId]);

  return { job, isLoading, relatedJobs };
};
