
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Briefcase, Calendar, DollarSign, Clock, MapPin, Tags, Globe, FileText, Eye, Save } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { JobPostingForm } from '@/components/jobs/JobPostingForm';
import { JobPostingPreview } from '@/components/jobs/JobPostingPreview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { jobPostSchema } from '@/lib/validations/job';
import { useToast } from '@/hooks/use-toast';

type JobFormValues = z.infer<typeof jobPostSchema>;

const CreateJob = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("edit");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      type: "full-time",
      category: "",
      experience: "entry",
      salary: {
        min: 0,
        max: 0,
        currency: "USD",
        period: "yearly"
      },
      description: "",
      requirements: [],
      benefits: [],
      applicationDeadline: undefined,
      contactEmail: "",
    },
  });
  
  const jobData = form.watch();
  
  const onSubmit = (data: JobFormValues) => {
    console.log("Form submitted:", data);
    // In a real app, you would send this data to an API
    
    // Show success toast
    toast({
      title: language === 'en' ? "Job Posted Successfully" : "Đăng Tin Thành Công",
      description: language === 'en' 
        ? "Your job posting has been successfully published." 
        : "Tin tuyển dụng của bạn đã được đăng thành công.",
      variant: "default",
    });
    
    // Redirect to jobs page after successful submission
    setTimeout(() => {
      navigate("/recruiter");
    }, 2000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold">
              {language === 'en' ? "Create Job Posting" : "Tạo Bài Đăng Tuyển Dụng"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {language === 'en' 
                ? "Fill in the details below to create a new job posting" 
                : "Điền thông tin bên dưới để tạo bài đăng tuyển dụng mới"}
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="edit">
                  <FileText className="h-4 w-4 mr-2" />
                  {language === 'en' ? "Edit Job" : "Chỉnh Sửa"}
                </TabsTrigger>
                <TabsTrigger value="preview">
                  <Eye className="h-4 w-4 mr-2" />
                  {language === 'en' ? "Preview" : "Xem Trước"}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="edit">
                <Card>
                  <CardContent className="pt-6">
                    <JobPostingForm 
                      form={form} 
                      onSubmit={onSubmit}
                      onPreview={() => setActiveTab("preview")}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preview">
                <Card>
                  <CardContent className="pt-6">
                    <JobPostingPreview jobData={jobData} />
                    
                    <Separator className="my-6" />
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab("edit")}
                      >
                        {language === 'en' ? "Back to Edit" : "Quay Lại Chỉnh Sửa"}
                      </Button>
                      <Button 
                        onClick={form.handleSubmit(onSubmit)}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {language === 'en' ? "Publish Job" : "Đăng Tin"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateJob;
