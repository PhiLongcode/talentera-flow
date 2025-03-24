import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

type Language = 'en' | 'vi';

type Translations = {
  [key: string]: {
    en: string;
    vi: string;
  };
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Record<string, string>;
}

const translations: Translations = {
  headerHome: {
    en: 'Home',
    vi: 'Trang chủ',
  },
  headerJobs: {
    en: 'Jobs',
    vi: 'Việc làm',
  },
  headerEmployers: {
    en: 'Employers',
    vi: 'Nhà tuyển dụng',
  },
  headerLogin: {
    en: 'Login',
    vi: 'Đăng nhập',
  },
  headerSignup: {
    en: 'Sign Up',
    vi: 'Đăng ký',
  },
  
  // Homepage Elements
  heroTitle: {
    en: 'Find Your Dream Job',
    vi: 'Tìm Kiếm Công Việc Mơ Ước',
  },
  heroSubtitle: {
    en: 'Connecting talent with opportunity.',
    vi: 'Kết nối tài năng với cơ hội.',
  },
  searchPlaceholder: {
    en: 'Search for jobs...',
    vi: 'Tìm kiếm việc làm...',
  },
  searchButton: {
    en: 'Search',
    vi: 'Tìm kiếm',
  },
  featuredJobs: {
    en: 'Featured Jobs',
    vi: 'Việc làm nổi bật',
  },
  featuredCompanies: {
    en: 'Featured Companies',
    vi: 'Công ty nổi bật',
  },
  viewAllJobs: {
    en: 'View All Jobs',
    vi: 'Xem tất cả việc làm',
  },
  
  // Job Listing
  jobTitle: {
    en: 'Job Title',
    vi: 'Tên công việc',
  },
  companyName: {
    en: 'Company Name',
    vi: 'Tên công ty',
  },
  location: {
    en: 'Location',
    vi: 'Địa điểm',
  },
  salary: {
    en: 'Salary',
    vi: 'Mức lương',
  },
  jobType: {
    en: 'Job Type',
    vi: 'Loại công việc',
  },
  postedDate: {
    en: 'Posted Date',
    vi: 'Ngày đăng',
  },
  applyNow: {
    en: 'Apply Now',
    vi: 'Ứng tuyển ngay',
  },
  
  // Job Details
  jobDescription: {
    en: 'Job Description',
    vi: 'Mô tả công việc',
  },
  requirements: {
    en: 'Requirements',
    vi: 'Yêu cầu',
  },
  responsibilities: {
    en: 'Responsibilities',
    vi: 'Trách nhiệm',
  },
  benefits: {
    en: 'Benefits',
    vi: 'Quyền lợi',
  },
  
  // Employer Page
  aboutUs: {
    en: 'About Us',
    vi: 'Về chúng tôi',
  },
  ourMission: {
    en: 'Our Mission',
    vi: 'Sứ mệnh của chúng tôi',
  },
  ourValues: {
    en: 'Our Values',
    vi: 'Giá trị của chúng tôi',
  },
  
  // Dialogs and Modals
  confirm: {
    en: 'Confirm',
    vi: 'Xác nhận',
  },
  cancel: {
    en: 'Cancel',
    vi: 'Hủy',
  },
  close: {
    en: 'Close',
    vi: 'Đóng',
  },
  submit: {
    en: 'Submit',
    vi: 'Gửi',
  },
  
  // Candidate Portal Translations
  candidatePortal: {
    en: 'Candidate Portal',
    vi: 'Cổng Ứng Viên',
  },
  candidateWelcome: {
    en: 'Your Career Journey Starts Here',
    vi: 'Hành Trình Sự Nghiệp Của Bạn Bắt Đầu Từ Đây',
  },
  candidateWelcomeDesc: {
    en: 'Discover opportunities that match your skills and aspirations with AI-powered job matching and blockchain-verified credentials.',
    vi: 'Khám phá các cơ hội phù hợp với kỹ năng và nguyện vọng của bạn với công nghệ AI và chứng chỉ được xác minh bằng blockchain.',
  },
  candidateFeatures: {
    en: 'Tools for Your Success',
    vi: 'Công Cụ Cho Sự Thành Công Của Bạn',
  },
  candidateFeaturesDesc: {
    en: 'Everything you need to find, apply for, and land your dream job.',
    vi: 'Tất cả những gì bạn cần để tìm kiếm, ứng tuyển và giành được công việc mơ ước.',
  },
  candidateJobSearch: {
    en: 'Job Search',
    vi: 'Tìm Kiếm Việc Làm',
  },
  candidateJobSearchDesc: {
    en: 'Explore jobs tailored to your skills and experience.',
    vi: 'Khám phá các công việc phù hợp với kỹ năng và kinh nghiệm của bạn.',
  },
  candidateProfile: {
    en: 'Profile Builder',
    vi: 'Xây Dựng Hồ Sơ',
  },
  candidateProfileDesc: {
    en: 'Create a compelling profile with blockchain-verified credentials.',
    vi: 'Tạo hồ sơ ấn tượng với chứng chỉ được xác minh bằng blockchain.',
  },
  candidateApplications: {
    en: 'Applications',
    vi: 'Đơn Ứng Tuyển',
  },
  candidateApplicationsDesc: {
    en: 'Track all your job applications in one place.',
    vi: 'Theo dõi tất cả đơn ứng tuyển của bạn tại một nơi.',
  },
  candidateMessages: {
    en: 'Messages',
    vi: 'Tin Nhắn',
  },
  candidateMessagesDesc: {
    en: 'Communicate directly with employers and recruiters.',
    vi: 'Giao tiếp trực tiếp với nhà tuyển dụng.',
  },
  findJobs: {
    en: 'Find Jobs',
    vi: 'Tìm Việc Làm',
  },
  myProfile: {
    en: 'My Profile',
    vi: 'Hồ Sơ Của Tôi',
  },
  recentJobs: {
    en: 'Recent Job Opportunities',
    vi: 'Cơ Hội Việc Làm Gần Đây',
  },
  recentJobsDesc: {
    en: 'Explore the latest job openings matching your profile.',
    vi: 'Khám phá các vị trí việc làm mới nhất phù hợp với hồ sơ của bạn.',
  },
  applicationTips: {
    en: 'Application Success Tips',
    vi: 'Mẹo Ứng Tuyển Thành Công',
  },
  tipTimelyApply: {
    en: 'Apply Early',
    vi: 'Ứng Tuyển Sớm',
  },
  tipTimelyApplyDesc: {
    en: 'Be among the first applicants to increase your chances of getting noticed.',
    vi: 'Hãy là một trong những ứng viên đầu tiên để tăng cơ hội được chú ý.',
  },
  tipTailorResume: {
    en: 'Tailor Your Resume',
    vi: 'Tuỳ Chỉnh CV',
  },
  tipTailorResumeDesc: {
    en: 'Customize your resume for each application to highlight relevant skills.',
    vi: 'Điều chỉnh CV của bạn cho từng đơn ứng tuyển để nổi bật các kỹ năng liên quan.',
  },
  tipFollowUp: {
    en: 'Follow Up',
    vi: 'Theo Dõi Phản Hồi',
  },
  tipFollowUpDesc: {
    en: 'Send a follow-up message after applying to demonstrate your interest.',
    vi: 'Gửi tin nhắn theo dõi sau khi ứng tuyển để thể hiện sự quan tâm của bạn.',
  },
  readyToApply: {
    en: 'Ready to Find Your Next Opportunity?',
    vi: 'Sẵn Sàng Tìm Cơ Hội Tiếp Theo?',
  },
  readyToApplyDesc: {
    en: 'Browse through our curated list of job openings and find your perfect match.',
    vi: 'Duyệt qua danh sách các vị trí việc làm được tuyển chọn và tìm sự phù hợp hoàn hảo cho bạn.',
  },
  browseOpenings: {
    en: 'Browse Job Openings',
    vi: 'Duyệt Qua Vị Trí Tuyển Dụng',
  },
  explore: {
    en: 'Explore',
    vi: 'Khám Phá',
  },
  
  // Recruiter Portal Translations
  recruiterPortal: {
    en: 'Recruiter Portal',
    vi: 'Cổng Nhà Tuyển Dụng',
  },
  recruiterDashboard: {
    en: 'Recruiter Dashboard',
    vi: 'Bảng Điều Khiển Nhà Tuyển Dụng',
  },
  management: {
    en: 'Management',
    vi: 'Quản Lý',
  },
  dashboard: {
    en: 'Dashboard',
    vi: 'Bảng Điều Khiển',
  },
  jobs: {
    en: 'Jobs',
    vi: 'Việc Làm',
  },
  candidates: {
    en: 'Candidates',
    vi: 'Ứng Viên',
  },
  search: {
    en: 'Search',
    vi: 'Tìm Kiếm',
  },
  settings: {
    en: 'Settings',
    vi: 'Cài Đặt',
  },
  companyProfile: {
    en: 'Company Profile',
    vi: 'Hồ Sơ Công Ty',
  },
  backToMain: {
    en: 'Back to Main Site',
    vi: 'Quay Về Trang Chính',
  },
  postJob: {
    en: 'Post Job',
    vi: 'Đăng Tuyển',
  },
  keyMetrics: {
    en: 'Key Metrics',
    vi: 'Chỉ Số Chính',
  },
  activeJobs: {
    en: 'Active Jobs',
    vi: 'Việc Làm Đang Hoạt Động',
  },
  newApplications: {
    en: 'New Applications',
    vi: 'Đơn Ứng Tuyển Mới',
  },
  candidatesShortlisted: {
    en: 'Shortlisted',
    vi: 'Ứng Viên Trong Danh Sách Ngắn',
  },
  averageTimeToHire: {
    en: 'Avg. Time to Hire',
    vi: 'Thời Gian Tuyển Dụng TB',
  },
  days: {
    en: 'days',
    vi: 'ngày',
  },
  lastWeek: {
    en: 'last week',
    vi: 'tuần trước',
  },
  recruiterActivities: {
    en: 'Activities',
    vi: 'Hoạt Động',
  },
  recentActivity: {
    en: 'Recent Activity',
    vi: 'Hoạt Động Gần Đây',
  },
  applications: {
    en: 'Applications',
    vi: 'Đơn Ứng Tuyển',
  },
  latestActivitiesDesc: {
    en: 'Your latest recruiting activities',
    vi: 'Các hoạt động tuyển dụng gần đây của bạn',
  },
  newCandidateApplied: {
    en: 'New Candidate Applied',
    vi: 'Ứng Viên Mới Đã Ứng Tuyển',
  },
  newCandidateAppliedDesc: {
    en: 'John Doe applied for Senior React Developer position',
    vi: 'John Doe đã ứng tuyển vị trí Senior React Developer',
  },
  hoursAgo: {
    en: 'hours ago',
    vi: 'giờ trước',
  },
  jobPostingViewed: {
    en: 'Job Posting Viewed',
    vi: 'Tin Tuyển Dụng Được Xem',
  },
  jobPostingViewedDesc: {
    en: 'Your UX/UI Designer posting received 45 new views',
    vi: 'Tin tuyển dụng UX/UI Designer của bạn đã nhận được 45 lượt xem mới',
  },
  jobEdited: {
    en: 'Job Listing Edited',
    vi: 'Tin Tuyển Dụng Đã Chỉnh Sửa',
  },
  jobEditedDesc: {
    en: 'You updated the requirements for Marketing Specialist position',
    vi: 'Bạn đã cập nhật yêu cầu cho vị trí Marketing Specialist',
  },
  dayAgo: {
    en: 'day ago',
    vi: 'ngày trước',
  },
  viewAllActivities: {
    en: 'View All Activities',
    vi: 'Xem Tất Cả Hoạt Động',
  },
  activeJobsDesc: {
    en: 'Currently active job listings',
    vi: 'Các tin tuyển dụng đang hoạt động',
  },
  manage: {
    en: 'Manage',
    vi: 'Quản Lý',
  },
  viewAllJobs: {
    en: 'View All Jobs',
    vi: 'Xem Tất Cả Việc Làm',
  },
  recentApplications: {
    en: 'Recent Applications',
    vi: 'Đơn Ứng Tuyển Gần Đây',
  },
  recentApplicationsDesc: {
    en: 'Recently received job applications',
    vi: 'Các đơn ứng tuyển nhận được gần đây',
  },
  review: {
    en: 'Review',
    vi: 'Xem Xét',
  },
  viewAllApplications: {
    en: 'View All Applications',
    vi: 'Xem Tất Cả Đơn Ứng Tuyển',
  },
  quickAccess: {
    en: 'Quick Access',
    vi: 'Truy Cập Nhanh',
  },
  recruiterJobManagement: {
    en: 'Job Management',
    vi: 'Quản Lý Việc Làm',
  },
  recruiterJobManagementDesc: {
    en: 'Create, edit, and manage your job listings.',
    vi: 'Tạo, chỉnh sửa và quản lý các tin tuyển dụng của bạn.',
  },
  recruiterCandidates: {
    en: 'Candidate Management',
    vi: 'Quản Lý Ứng Viên',
  },
  recruiterCandidatesDesc: {
    en: 'Review applications and manage candidate pipeline.',
    vi: 'Xem xét đơn ứng tuyển và quản lý quy trình ứng viên.',
  },
  recruiterCompanyProfile: {
    en: 'Company Profile',
    vi: 'Hồ Sơ Công Ty',
  },
  recruiterCompanyProfileDesc: {
    en: 'Update your company information and branding.',
    vi: 'Cập nhật thông tin và thương hiệu công ty của bạn.',
  },
  recruiterTalentSearch: {
    en: 'Talent Search',
    vi: 'Tìm Kiếm Nhân Tài',
  },
  recruiterTalentSearchDesc: {
    en: 'Find candidates with AI-powered matching.',
    vi: 'Tìm ứng viên với công nghệ kết nối AI.',
  },
  aboutCompany: {
    en: 'About Us',
    vi: 'Về Chúng Tôi',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>((localStorage.getItem('language') as Language) || 'en');

  // Update localStorage when language changes
  useState(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = useMemo(() => {
    const translatedStrings: Record<string, string> = {};
    
    Object.keys(translations).forEach((key) => {
      translatedStrings[key] = translations[key][language];
    });
    
    return translatedStrings;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
