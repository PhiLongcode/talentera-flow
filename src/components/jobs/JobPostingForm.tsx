
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Briefcase, Calendar, DollarSign, Clock, MapPin, X, Plus, Tags } from 'lucide-react';
import { format } from 'date-fns';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { vi } from 'date-fns/locale';
import { JobPost } from '@/lib/validations/job';

interface JobPostingFormProps {
  form: UseFormReturn<JobPost>;
  onSubmit: (data: JobPost) => void;
  onPreview: () => void;
}

export function JobPostingForm({ form, onSubmit, onPreview }: JobPostingFormProps) {
  const { language } = useLanguage();
  const [newRequirement, setNewRequirement] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  
  const addRequirement = () => {
    if (newRequirement.trim()) {
      const currentRequirements = form.getValues('requirements') || [];
      form.setValue('requirements', [...currentRequirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };
  
  const removeRequirement = (index: number) => {
    const currentRequirements = form.getValues('requirements') || [];
    form.setValue('requirements', currentRequirements.filter((_, i) => i !== index));
  };
  
  const addBenefit = () => {
    if (newBenefit.trim()) {
      const currentBenefits = form.getValues('benefits') || [];
      form.setValue('benefits', [...currentBenefits, newBenefit.trim()]);
      setNewBenefit('');
    }
  };
  
  const removeBenefit = (index: number) => {
    const currentBenefits = form.getValues('benefits') || [];
    form.setValue('benefits', currentBenefits.filter((_, i) => i !== index));
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Briefcase className="h-4 w-4 inline mr-1" />
                  {language === 'en' ? "Job Title" : "Chức Danh"}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={language === 'en' ? "e.g. Senior React Developer" : "VD: Lập Trình Viên React Senior"} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Company Name */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'en' ? "Company Name" : "Tên Công Ty"}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={language === 'en' ? "e.g. Acme Inc." : "VD: Công Ty TNHH ABC"} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <MapPin className="h-4 w-4 inline mr-1" />
                  {language === 'en' ? "Location" : "Địa Điểm"}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={language === 'en' ? "e.g. Remote, New York, etc." : "VD: Từ xa, Hà Nội, v.v."} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Job Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Clock className="h-4 w-4 inline mr-1" />
                  {language === 'en' ? "Job Type" : "Loại Hình Công Việc"}
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? "Select job type" : "Chọn loại hình công việc"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full-time">{language === 'en' ? "Full-time" : "Toàn thời gian"}</SelectItem>
                    <SelectItem value="part-time">{language === 'en' ? "Part-time" : "Bán thời gian"}</SelectItem>
                    <SelectItem value="contract">{language === 'en' ? "Contract" : "Hợp đồng"}</SelectItem>
                    <SelectItem value="freelance">{language === 'en' ? "Freelance" : "Tự do"}</SelectItem>
                    <SelectItem value="internship">{language === 'en' ? "Internship" : "Thực tập"}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Tags className="h-4 w-4 inline mr-1" />
                  {language === 'en' ? "Category" : "Danh Mục"}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={language === 'en' ? "e.g. Software Development" : "VD: Phát Triển Phần Mềm"} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Experience Level */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'en' ? "Experience Level" : "Cấp Độ Kinh Nghiệm"}
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? "Select experience level" : "Chọn cấp độ kinh nghiệm"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="entry">{language === 'en' ? "Entry Level" : "Mới Vào Nghề"}</SelectItem>
                    <SelectItem value="mid">{language === 'en' ? "Mid Level" : "Cấp Trung"}</SelectItem>
                    <SelectItem value="senior">{language === 'en' ? "Senior Level" : "Cấp Cao"}</SelectItem>
                    <SelectItem value="executive">{language === 'en' ? "Executive" : "Quản Lý Cấp Cao"}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Salary Range */}
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="salary.min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <DollarSign className="h-4 w-4 inline mr-1" />
                    {language === 'en' ? "Minimum Salary" : "Lương Tối Thiểu"}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="salary.max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === 'en' ? "Maximum Salary" : "Lương Tối Đa"}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="salary.currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === 'en' ? "Currency" : "Đơn Vị Tiền Tệ"}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? "Select currency" : "Chọn đơn vị tiền tệ"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="VND">VND</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="salary.period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === 'en' ? "Payment Period" : "Chu Kỳ Thanh Toán"}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? "Select period" : "Chọn chu kỳ"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hourly">{language === 'en' ? "Hourly" : "Theo Giờ"}</SelectItem>
                      <SelectItem value="monthly">{language === 'en' ? "Monthly" : "Hàng Tháng"}</SelectItem>
                      <SelectItem value="yearly">{language === 'en' ? "Yearly" : "Hàng Năm"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Job Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === 'en' ? "Job Description" : "Mô Tả Công Việc"}
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={language === 'en' ? "Describe the job role and responsibilities..." : "Mô tả vai trò và trách nhiệm công việc..."} 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Requirements */}
        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === 'en' ? "Requirements" : "Yêu Cầu"}
              </FormLabel>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder={language === 'en' ? "Add a requirement..." : "Thêm yêu cầu..."}
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addRequirement();
                      }
                    }}
                  />
                  <Button type="button" onClick={addRequirement} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 mt-2">
                  {form.getValues('requirements')?.map((req, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                      <span className="text-sm">{req}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRequirement(index)}
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Benefits */}
        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === 'en' ? "Benefits" : "Phúc Lợi"}
              </FormLabel>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder={language === 'en' ? "Add a benefit..." : "Thêm phúc lợi..."}
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addBenefit();
                      }
                    }}
                  />
                  <Button type="button" onClick={addBenefit} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 mt-2">
                  {form.getValues('benefits')?.map((benefit, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                      <span className="text-sm">{benefit}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeBenefit(index)}
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Application Deadline */}
          <FormField
            control={form.control}
            name="applicationDeadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  <Calendar className="h-4 w-4 inline mr-1" />
                  {language === 'en' ? "Application Deadline" : "Hạn Nộp Hồ Sơ"}
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: language === 'vi' ? vi : undefined })
                        ) : (
                          <span>{language === 'en' ? "Select a date" : "Chọn ngày"}</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      locale={language === 'vi' ? vi : undefined}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Contact Email */}
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'en' ? "Contact Email" : "Email Liên Hệ"}
                </FormLabel>
                <FormControl>
                  <Input placeholder="contact@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            {language === 'en' ? "Reset Form" : "Đặt Lại"}
          </Button>
          
          <div className="space-x-2">
            <Button type="button" variant="outline" onClick={onPreview}>
              <Eye className="h-4 w-4 mr-2" />
              {language === 'en' ? "Preview" : "Xem Trước"}
            </Button>
            <Button type="submit">
              {language === 'en' ? "Publish Job" : "Đăng Tin"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
