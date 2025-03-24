
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the type for our translations
type Translations = {
  [key: string]: {
    en: string;
    vi: string;
  };
};

// Define the type for our context
type LanguageContextType = {
  language: 'en' | 'vi';
  setLanguage: (lang: 'en' | 'vi') => void;
  t: (key: string) => string;
  translations: Translations;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define all translations here
const translations: Translations = {
  // Header links
  home: {
    en: 'Home',
    vi: 'Trang chủ',
  },
  jobs: {
    en: 'Jobs',
    vi: 'Việc làm',
  },
  employers: {
    en: 'Employers',
    vi: 'Nhà tuyển dụng',
  },
  // Languages
  english: {
    en: 'English',
    vi: 'Tiếng Anh',
  },
  vietnamese: {
    en: 'Vietnamese',
    vi: 'Tiếng Việt',
  },
  // Hero
  findYourPerfectJob: {
    en: 'Find Your Perfect Job',
    vi: 'Tìm Công Việc Hoàn Hảo Của Bạn',
  },
  getConnected: {
    en: 'Get connected to the best job opportunities with our advanced job search platform',
    vi: 'Kết nối với các cơ hội việc làm tốt nhất với nền tảng tìm việc tiên tiến của chúng tôi',
  },
  searchJobs: {
    en: 'Search Jobs',
    vi: 'Tìm Việc Làm',
  },
  // Features
  featuredServices: {
    en: 'Featured Services',
    vi: 'Dịch Vụ Nổi Bật',
  },
  bestFeaturesForYou: {
    en: 'The Best Features For You',
    vi: 'Những Tính Năng Tốt Nhất Cho Bạn',
  },
  jobAlerts: {
    en: 'Job Alerts',
    vi: 'Thông Báo Việc Làm',
  },
  getNotified: {
    en: 'Get notified when new jobs match your profile',
    vi: 'Nhận thông báo khi có việc làm mới phù hợp với hồ sơ của bạn',
  },
  resumeBuilder: {
    en: 'Resume Builder',
    vi: 'Tạo Hồ Sơ',
  },
  createProfessional: {
    en: 'Create professional resumes with our easy-to-use builder',
    vi: 'Tạo hồ sơ chuyên nghiệp với công cụ dễ sử dụng của chúng tôi',
  },
  careerAdvice: {
    en: 'Career Advice',
    vi: 'Lời Khuyên Nghề Nghiệp',
  },
  expertTips: {
    en: 'Expert tips and guidance to advance your career',
    vi: 'Lời khuyên và hướng dẫn từ chuyên gia để thăng tiến trong sự nghiệp',
  },
  aiMatching: {
    en: 'AI Matching',
    vi: 'Ghép Cặp AI',
  },
  smartAi: {
    en: 'Smart AI algorithms to match you with the right job',
    vi: 'Thuật toán AI thông minh để ghép bạn với công việc phù hợp',
  },
  // CTA
  startYourJourney: {
    en: 'Start Your Journey Today',
    vi: 'Bắt Đầu Hành Trình Của Bạn Ngay Hôm Nay',
  },
  joinPlatform: {
    en: 'Join our platform and discover new opportunities',
    vi: 'Tham gia nền tảng của chúng tôi và khám phá cơ hội mới',
  },
  signUp: {
    en: 'Sign Up',
    vi: 'Đăng Ký',
  },
  // Jobs list
  featuredJobs: {
    en: 'Featured Jobs',
    vi: 'Việc Làm Nổi Bật',
  },
  discoverJobs: {
    en: 'Discover the most exciting jobs available today',
    vi: 'Khám phá những công việc thú vị nhất hiện có',
  },
  viewAllJobs: {
    en: 'View All Jobs',
    vi: 'Xem Tất Cả Việc Làm',
  },
  // Footer
  aboutUs: {
    en: 'About Us',
    vi: 'Về Chúng Tôi',
  },
  contactUs: {
    en: 'Contact Us',
    vi: 'Liên Hệ',
  },
  privacyPolicy: {
    en: 'Privacy Policy',
    vi: 'Chính Sách Bảo Mật',
  },
  termsOfService: {
    en: 'Terms of Service',
    vi: 'Điều Khoản Dịch Vụ',
  },
  copyright: {
    en: '© 2023 JobHub. All rights reserved.',
    vi: '© 2023 JobHub. Đã đăng ký Bản quyền.',
  },
  // Employers page
  revolutionaryPlatform: {
    en: 'Our revolutionary platform connects employers with top talent using advanced AI technologies',
    vi: 'Nền tảng cách mạng của chúng tôi kết nối nhà tuyển dụng với nhân tài hàng đầu bằng công nghệ AI tiên tiến',
  },
  manageJobListings: {
    en: 'Manage Job Listings',
    vi: 'Quản Lý Danh Sách Việc Làm',
  },
  manageJobListingsDesc: {
    en: 'Create, edit and manage your job listings with our easy-to-use interface',
    vi: 'Tạo, chỉnh sửa và quản lý danh sách việc làm của bạn với giao diện dễ sử dụng của chúng tôi',
  },
  candidateMatching: {
    en: 'Candidate Matching',
    vi: 'Kết Nối Ứng Viên',
  },
  candidateMatchingDesc: {
    en: 'Our AI algorithm matches your job requirements with qualified candidates',
    vi: 'Thuật toán AI của chúng tôi kết nối yêu cầu công việc của bạn với các ứng viên đủ điều kiện',
  },
  companyProfile: {
    en: 'Company Profile',
    vi: 'Hồ Sơ Công Ty',
  },
  companyProfileDesc: {
    en: 'Showcase your company culture and values to attract the right talent',
    vi: 'Giới thiệu văn hóa và giá trị công ty của bạn để thu hút đúng nhân tài',
  },
  talentAcquisition: {
    en: 'Talent Acquisition',
    vi: 'Thu Hút Nhân Tài',
  },
  talentAcquisitionDesc: {
    en: 'Advanced tools to streamline your recruitment process and find the best candidates',
    vi: 'Công cụ tiên tiến để tối ưu hóa quy trình tuyển dụng và tìm ứng viên tốt nhất',
  },
  aiRecruitmentAssistant: {
    en: 'AI Recruitment Assistant',
    vi: 'Trợ Lý Tuyển Dụng AI',
  },
  aiAssistantDescription: {
    en: 'Ask our AI assistant any questions about recruitment, job postings or candidate selection',
    vi: 'Hỏi trợ lý AI của chúng tôi bất kỳ câu hỏi nào về tuyển dụng, đăng tin tuyển dụng hoặc lựa chọn ứng viên',
  },
  askAiPlaceholder: {
    en: 'Ask our AI assistant a question...',
    vi: 'Hỏi trợ lý AI của chúng tôi một câu hỏi...',
  },
  learnMore: {
    en: 'Learn More',
    vi: 'Tìm Hiểu Thêm',
  },
  featureComingSoon: {
    en: 'This feature is coming soon. Stay tuned for updates!',
    vi: 'Tính năng này sẽ sớm ra mắt. Hãy đón chờ các cập nhật!',
  },
  aiWelcomeMessage: {
    en: 'Hello! I\'m your AI recruitment assistant. How can I help you today?',
    vi: 'Xin chào! Tôi là trợ lý tuyển dụng AI của bạn. Tôi có thể giúp gì cho bạn hôm nay?',
  },
  newMessageReceived: {
    en: 'New Message Received',
    vi: 'Đã Nhận Tin Nhắn Mới',
  },
  aiRespondedToYourQuery: {
    en: 'AI assistant has responded to your query',
    vi: 'Trợ lý AI đã trả lời câu hỏi của bạn',
  },
  // New translations for AI Assistant
  conversationTopics: {
    en: 'Conversation Topics',
    vi: 'Chủ Đề Hội Thoại',
  },
  jobPostingTopic: {
    en: 'Job Posting',
    vi: 'Đăng Tin Tuyển Dụng',
  },
  candidateScreeningTopic: {
    en: 'Candidate Screening',
    vi: 'Sàng Lọc Ứng Viên',
  },
  interviewTipsTopic: {
    en: 'Interview Tips',
    vi: 'Lời Khuyên Phỏng Vấn',
  },
  companyProfileTopic: {
    en: 'Company Profile',
    vi: 'Hồ Sơ Công Ty',
  },
  clearConversation: {
    en: 'Clear conversation',
    vi: 'Xóa cuộc trò chuyện',
  },
};

// Create the provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get the initial language from localStorage or default to English
  const [language, setLanguage] = useState<'en' | 'vi'>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'vi') ? savedLanguage : 'en';
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translate function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  // Context value
  const value = {
    language,
    setLanguage,
    t,
    translations,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
