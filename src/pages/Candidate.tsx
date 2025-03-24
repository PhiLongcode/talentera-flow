
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  User, 
  Briefcase, 
  FileText, 
  Search, 
  Calendar, 
  Mail,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobsList from '@/components/home/JobsList';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Candidate: React.FC = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Briefcase className="h-12 w-12 text-primary" />,
      title: t.candidateJobSearch,
      description: t.candidateJobSearchDesc,
      link: '/jobs'
    },
    {
      icon: <FileText className="h-12 w-12 text-primary" />,
      title: t.candidateProfile,
      description: t.candidateProfileDesc,
      link: '/candidate/profile'
    },
    {
      icon: <Calendar className="h-12 w-12 text-primary" />,
      title: t.candidateApplications,
      description: t.candidateApplicationsDesc,
      link: '/candidate/applications'
    },
    {
      icon: <Mail className="h-12 w-12 text-primary" />,
      title: t.candidateMessages,
      description: t.candidateMessagesDesc,
      link: '/candidate/messages'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t.candidatePortal} | JobConnect</title>
      </Helmet>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                  {t.candidateWelcome}
                </h1>
                <p className="mt-4 text-xl text-muted-foreground max-w-[800px] mx-auto">
                  {t.candidateWelcomeDesc}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 flex flex-col sm:flex-row gap-4"
              >
                <Button asChild size="lg">
                  <Link to="/jobs">
                    <Search className="mr-2 h-4 w-4" /> {t.findJobs}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/candidate/profile">
                    <User className="mr-2 h-4 w-4" /> {t.myProfile}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t.candidateFeatures}</h2>
              <p className="text-muted-foreground max-w-[800px] mx-auto">
                {t.candidateFeaturesDesc}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="mb-4">{feature.icon}</div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-4">
                      <Button asChild variant="ghost" className="w-full">
                        <Link to={feature.link}>{t.explore} →</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Recent Jobs Section */}
        <section className="bg-muted/50 py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t.recentJobs}</h2>
              <p className="text-muted-foreground max-w-[800px] mx-auto">
                {t.recentJobsDesc}
              </p>
            </div>
            
            <JobsList showFullList={false} />
          </div>
        </section>
        
        {/* Application Tips */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6">{t.applicationTips}</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{t.tipTimelyApply}</h3>
                      <p className="text-muted-foreground">{t.tipTimelyApplyDesc}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{t.tipTailorResume}</h3>
                      <p className="text-muted-foreground">{t.tipTailorResumeDesc}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{t.tipFollowUp}</h3>
                      <p className="text-muted-foreground">{t.tipFollowUpDesc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-primary/5 border border-primary/10 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4">{t.readyToApply}</h3>
                  <p className="mb-6 text-muted-foreground">
                    {t.readyToApplyDesc}
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <Link to="/jobs">
                      <Search className="mr-2 h-4 w-4" />
                      {t.browseOpenings}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Candidate;
