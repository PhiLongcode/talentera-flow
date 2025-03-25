
import React from 'react';
import { format, isValid } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Briefcase, Clock, DollarSign, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { JobPost } from '@/lib/validations/job';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface JobPostingPreviewProps {
  jobData: JobPost;
}

export function JobPostingPreview({ jobData }: JobPostingPreviewProps) {
  const { language } = useLanguage();
  
  const formatSalary = (min: number, max: number, currency: string, period: string) => {
    if (min === 0 && max === 0) {
      return language === 'en' ? 'Negotiable' : 'Thỏa thuận';
    }
    
    const formatNumber = (num: number) => {
      if (currency === 'VND') {
        return num.toLocaleString('vi-VN');
      }
      return num.toLocaleString('en-US');
    };
    
    const periods = {
      hourly: language === 'en' ? '/hour' : '/giờ',
      monthly: language === 'en' ? '/month' : '/tháng',
      yearly: language === 'en' ? '/year' : '/năm'
    };
    
    if (min > 0 && max > 0) {
      return `${currency} ${formatNumber(min)} - ${formatNumber(max)}${periods[period as keyof typeof periods]}`;
    } else if (min > 0) {
      return `${language === 'en' ? 'From' : 'Từ'} ${currency} ${formatNumber(min)}${periods[period as keyof typeof periods]}`;
    } else if (max > 0) {
      return `${language === 'en' ? 'Up to' : 'Đến'} ${currency} ${formatNumber(max)}${periods[period as keyof typeof periods]}`;
    }
    
    return language === 'en' ? 'Negotiable' : 'Thỏa thuận';
  };
  
  const experienceLevels = {
    entry: language === 'en' ? 'Entry Level' : 'Mới Vào Nghề',
    mid: language === 'en' ? 'Mid Level' : 'Cấp Trung',
    senior: language === 'en' ? 'Senior Level' : 'Cấp Cao',
    executive: language === 'en' ? 'Executive' : 'Quản Lý Cấp Cao'
  };
  
  const jobTypes = {
    'full-time': language === 'en' ? 'Full-time' : 'Toàn thời gian',
    'part-time': language === 'en' ? 'Part-time' : 'Bán thời gian',
    'contract': language === 'en' ? 'Contract' : 'Hợp đồng',
    'freelance': language === 'en' ? 'Freelance' : 'Tự do',
    'internship': language === 'en' ? 'Internship' : 'Thực tập'
  };
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{jobData.title || (language === 'en' ? 'Job Title' : 'Tiêu Đề Công Việc')}</h1>
            <p className="text-muted-foreground">{jobData.company || (language === 'en' ? 'Company Name' : 'Tên Công Ty')}</p>
          </div>
          <Badge variant="outline" className="text-sm">
            {experienceLevels[jobData.experience as keyof typeof experienceLevels]}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
            <span>{jobData.location || (language === 'en' ? 'Location' : 'Địa Điểm')}</span>
          </div>
          
          <div className="flex items-center">
            <Briefcase className="h-5 w-5 text-muted-foreground mr-2" />
            <span>{jobTypes[jobData.type as keyof typeof jobTypes]}</span>
          </div>
          
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
            <span>{formatSalary(
              jobData.salary.min,
              jobData.salary.max,
              jobData.salary.currency,
              jobData.salary.period
            )}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
            <span>
              {jobData.applicationDeadline && isValid(jobData.applicationDeadline) 
                ? format(
                    jobData.applicationDeadline, 
                    language === 'en' ? 'MMMM d, yyyy' : 'dd MMMM, yyyy',
                    { locale: language === 'vi' ? vi : undefined }
                  )
                : language === 'en' ? 'No deadline set' : 'Chưa có hạn chót'}
            </span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">{language === 'en' ? 'Job Description' : 'Mô Tả Công Việc'}</h2>
        <div className="whitespace-pre-line text-muted-foreground">
          {jobData.description || (language === 'en' ? 'No description provided.' : 'Chưa có mô tả.')}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">{language === 'en' ? 'Requirements' : 'Yêu Cầu'}</h2>
        {jobData.requirements && jobData.requirements.length > 0 ? (
          <ul className="space-y-2">
            {jobData.requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">
            {language === 'en' ? 'No requirements specified.' : 'Chưa có yêu cầu cụ thể.'}
          </p>
        )}
      </div>
      
      {jobData.benefits && jobData.benefits.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">{language === 'en' ? 'Benefits' : 'Phúc Lợi'}</h2>
          <ul className="space-y-2">
            {jobData.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div>
        <h2 className="text-xl font-semibold mb-4">{language === 'en' ? 'How to Apply' : 'Cách Ứng Tuyển'}</h2>
        <p className="text-muted-foreground">
          {language === 'en' 
            ? `Please send your resume and cover letter to: ${jobData.contactEmail || 'N/A'}`
            : `Vui lòng gửi hồ sơ và thư xin việc của bạn đến: ${jobData.contactEmail || 'N/A'}`}
        </p>
      </div>
    </div>
  );
}
