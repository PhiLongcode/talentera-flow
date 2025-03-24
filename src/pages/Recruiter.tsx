
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Users, 
  Briefcase, 
  Building, 
  Search, 
  Edit,
  User,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const Recruiter: React.FC = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Briefcase className="h-12 w-12 text-primary" />,
      title: t.recruiterJobManagement,
      description: t.recruiterJobManagementDesc,
      link: '/recruiter/jobs'
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: t.recruiterCandidates,
      description: t.recruiterCandidatesDesc,
      link: '/recruiter/candidates'
    },
    {
      icon: <Building className="h-12 w-12 text-primary" />,
      title: t.recruiterCompanyProfile,
      description: t.recruiterCompanyProfileDesc,
      link: '/recruiter/company'
    },
    {
      icon: <Search className="h-12 w-12 text-primary" />,
      title: t.recruiterTalentSearch,
      description: t.recruiterTalentSearchDesc,
      link: '/recruiter/search'
    }
  ];
  
  const stats = [
    {
      title: t.activeJobs,
      value: '12',
      change: '+2',
      status: 'positive',
    },
    {
      title: t.newApplications,
      value: '48',
      change: '+15',
      status: 'positive',
    },
    {
      title: t.candidatesShortlisted,
      value: '24',
      change: '+8',
      status: 'positive',
    },
    {
      title: t.averageTimeToHire,
      value: '18',
      unit: t.days,
      change: '-3',
      status: 'positive',
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/5">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Building className="h-6 w-6" />
              <div className="font-semibold">
                {t.recruiterPortal}
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t.management}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/recruiter/dashboard">
                        <Briefcase className="h-4 w-4" />
                        <span>{t.dashboard}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/recruiter/jobs">
                        <Briefcase className="h-4 w-4" />
                        <span>{t.jobs}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/recruiter/candidates">
                        <Users className="h-4 w-4" />
                        <span>{t.candidates}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/recruiter/search">
                        <Search className="h-4 w-4" />
                        <span>{t.search}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>{t.settings}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/recruiter/company">
                        <Building className="h-4 w-4" />
                        <span>{t.companyProfile}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/recruiter/profile">
                        <User className="h-4 w-4" />
                        <span>{t.myProfile}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/recruiter/settings">
                        <Settings className="h-4 w-4" />
                        <span>{t.settings}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/">
                  <span>{t.backToMain}</span>
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <Helmet>
            <title>{t.recruiterPortal} | JobConnect</title>
          </Helmet>
          
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-4 md:px-6 h-14 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="font-semibold">{t.recruiterDashboard}</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="sm">
                  <Link to="/recruiter/jobs/new">
                    <Edit className="h-4 w-4 mr-2" /> {t.postJob}
                  </Link>
                </Button>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-4 md:p-6">
            {/* Dashboard Stats */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">{t.keyMetrics}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {stat.value}
                          {stat.unit && <span className="text-sm font-normal ml-1">{stat.unit}</span>}
                        </div>
                        <div className={`text-xs flex items-center mt-1 ${
                          stat.status === 'positive' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {stat.change}
                          <span className="text-muted-foreground ml-1">{t.lastWeek}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
            
            {/* Tabs Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">{t.recruiterActivities}</h2>
              <Tabs defaultValue="recent" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="recent">{t.recentActivity}</TabsTrigger>
                  <TabsTrigger value="jobs">{t.jobs}</TabsTrigger>
                  <TabsTrigger value="applications">{t.applications}</TabsTrigger>
                </TabsList>
                <TabsContent value="recent" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.recentActivity}</CardTitle>
                      <CardDescription>{t.latestActivitiesDesc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 pb-4 border-b">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {t.newCandidateApplied}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t.newCandidateAppliedDesc}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              2 {t.hoursAgo}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 pb-4 border-b">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {t.jobPostingViewed}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t.jobPostingViewedDesc}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              5 {t.hoursAgo}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Edit className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {t.jobEdited}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t.jobEditedDesc}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              1 {t.dayAgo}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" size="sm">
                        <Link to="/recruiter/activities">
                          {t.viewAllActivities}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="jobs" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.activeJobs}</CardTitle>
                      <CardDescription>{t.activeJobsDesc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b">
                          <div>
                            <p className="font-medium">Senior React Developer</p>
                            <p className="text-sm text-muted-foreground">12 {t.applications}</p>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link to="/recruiter/jobs/1">
                              {t.manage}
                            </Link>
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between pb-4 border-b">
                          <div>
                            <p className="font-medium">UX/UI Designer</p>
                            <p className="text-sm text-muted-foreground">8 {t.applications}</p>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link to="/recruiter/jobs/2">
                              {t.manage}
                            </Link>
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing Specialist</p>
                            <p className="text-sm text-muted-foreground">5 {t.applications}</p>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link to="/recruiter/jobs/5">
                              {t.manage}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" size="sm">
                        <Link to="/recruiter/jobs">
                          {t.viewAllJobs}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="applications" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.recentApplications}</CardTitle>
                      <CardDescription>{t.recentApplicationsDesc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b">
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-muted-foreground">Senior React Developer</p>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link to="/recruiter/applications/1">
                              {t.review}
                            </Link>
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between pb-4 border-b">
                          <div>
                            <p className="font-medium">Jane Smith</p>
                            <p className="text-sm text-muted-foreground">UX/UI Designer</p>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link to="/recruiter/applications/2">
                              {t.review}
                            </Link>
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Mike Johnson</p>
                            <p className="text-sm text-muted-foreground">Marketing Specialist</p>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link to="/recruiter/applications/3">
                              {t.review}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" size="sm">
                        <Link to="/recruiter/applications">
                          {t.viewAllApplications}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>
            
            {/* Features Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">{t.quickAccess}</h2>
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
                          <Link to={feature.link}>{t.manage} →</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Recruiter;
