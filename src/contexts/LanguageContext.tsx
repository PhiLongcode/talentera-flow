
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'vi';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dictionary for translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'home': 'Home',
    'findJobs': 'Find Jobs',
    'employers': 'Employers',
    'postJob': 'Post Job',
    'signIn': 'Sign In',
    'joinNow': 'Join Now',
    
    // Hero Section
    'discoverMatch': 'Discover your perfect career match',
    'connect': 'Connect',
    'grow': 'Grow',
    'prosper': 'Prosper',
    'revolutionaryPlatform': 'A revolutionary platform connecting talents with opportunities through the power of blockchain and AI. Secure, transparent, and efficient.',
    'searchPlaceholder': 'Search for jobs, skills, or companies...',
    'search': 'Search',
    'jobsAvailable': '10,000+ Jobs Available',
    'topCompanies': '500+ Top Companies',
    
    // Features Section
    'whyChoose': 'Why Choose TalenteraFlow',
    'platformCombines': 'Our platform combines cutting-edge technology with intuitive design to create a seamless recruitment experience.',
    'secureBlockchain': 'Secure Blockchain Verification',
    'secureBlockchainDesc': 'Your credentials and experience are securely stored on blockchain, ensuring authenticity and immutability.',
    'aiPowered': 'AI-Powered Job Matching',
    'aiPoweredDesc': 'Our advanced algorithms analyze your skills and preferences to recommend the most suitable opportunities.',
    'dataInsights': 'Data-Driven Insights',
    'dataInsightsDesc': 'Access real-time market analytics and salary data to make informed career decisions.',
    'networking': 'Professional Networking',
    'networkingDesc': 'Connect with industry leaders and peers to expand your professional network and discover new opportunities.',
    
    // CTA Section
    'readyTransform': 'Ready to Transform Your Career Journey?',
    'joinThousands': 'Join thousands of professionals who have already discovered the power of blockchain-verified recruitment and AI-powered job matching.',
    'getStarted': 'Get Started',
    'learnMore': 'Learn More',
    
    // Jobs List
    'featuredJobs': 'Featured Jobs',
    'viewAllJobs': 'View All Jobs',
    'filterJobs': 'Filter Jobs',
    'location': 'Location',
    'jobType': 'Job Type',
    'salary': 'Salary',
    'tags': 'Tags',
    'postedAt': 'Posted',
    'applyNow': 'Apply Now',
    'saveJob': 'Save Job',
    'jobDescription': 'Job Description',
    'responsibilities': 'Responsibilities',
    'requirements': 'Requirements',
    'benefits': 'Benefits',
    'aboutCompany': 'About the Company',
    'relatedJobs': 'Related Jobs',
    'jobDetails': 'Job Details',
    'allJobs': 'All Jobs',
    'resetFilters': 'Reset Filters',
    'applyFilters': 'Apply Filters',
    'noJobsFound': 'No jobs found matching your criteria',
    
    // Language
    'language': 'Language',
    'english': 'English',
    'vietnamese': 'Vietnamese',
  },
  vi: {
    // Navigation
    'home': 'Trang chủ',
    'findJobs': 'Tìm việc',
    'employers': 'Nhà tuyển dụng',
    'postJob': 'Đăng việc',
    'signIn': 'Đăng nhập',
    'joinNow': 'Tham gia ngay',
    
    // Hero Section
    'discoverMatch': 'Khám phá công việc phù hợp nhất với bạn',
    'connect': 'Kết nối',
    'grow': 'Phát triển',
    'prosper': 'Thịnh vượng',
    'revolutionaryPlatform': 'Nền tảng cách mạng kết nối tài năng với cơ hội thông qua sức mạnh của blockchain và AI. An toàn, minh bạch và hiệu quả.',
    'searchPlaceholder': 'Tìm kiếm công việc, kỹ năng hoặc công ty...',
    'search': 'Tìm kiếm',
    'jobsAvailable': 'Hơn 10.000 công việc',
    'topCompanies': 'Hơn 500 công ty hàng đầu',
    
    // Features Section
    'whyChoose': 'Tại sao chọn TalenteraFlow',
    'platformCombines': 'Nền tảng của chúng tôi kết hợp công nghệ tiên tiến với thiết kế trực quan để tạo ra trải nghiệm tuyển dụng liền mạch.',
    'secureBlockchain': 'Xác minh blockchain an toàn',
    'secureBlockchainDesc': 'Thông tin và kinh nghiệm của bạn được lưu trữ an toàn trên blockchain, đảm bảo tính xác thực và không thể thay đổi.',
    'aiPowered': 'Kết nối việc làm bằng trí tuệ nhân tạo',
    'aiPoweredDesc': 'Thuật toán tiên tiến của chúng tôi phân tích kỹ năng và sở thích của bạn để giới thiệu những cơ hội phù hợp nhất.',
    'dataInsights': 'Thông tin dữ liệu thực tế',
    'dataInsightsDesc': 'Truy cập phân tích thị trường và dữ liệu lương theo thời gian thực để đưa ra quyết định nghề nghiệp sáng suốt.',
    'networking': 'Mạng lưới chuyên nghiệp',
    'networkingDesc': 'Kết nối với các nhà lãnh đạo ngành và đồng nghiệp để mở rộng mạng lưới chuyên nghiệp và khám phá cơ hội mới.',
    
    // CTA Section
    'readyTransform': 'Sẵn sàng thay đổi hành trình sự nghiệp của bạn?',
    'joinThousands': 'Tham gia cùng hàng nghìn chuyên gia đã khám phá sức mạnh của tuyển dụng được xác minh bằng blockchain và kết nối việc làm bằng AI.',
    'getStarted': 'Bắt đầu ngay',
    'learnMore': 'Tìm hiểu thêm',
    
    // Jobs List
    'featuredJobs': 'Công việc nổi bật',
    'viewAllJobs': 'Xem tất cả công việc',
    'filterJobs': 'Lọc công việc',
    'location': 'Địa điểm',
    'jobType': 'Loại công việc',
    'salary': 'Lương',
    'tags': 'Thẻ',
    'postedAt': 'Đăng lúc',
    'applyNow': 'Ứng tuyển ngay',
    'saveJob': 'Lưu công việc',
    'jobDescription': 'Mô tả công việc',
    'responsibilities': 'Trách nhiệm',
    'requirements': 'Yêu cầu',
    'benefits': 'Quyền lợi',
    'aboutCompany': 'Về công ty',
    'relatedJobs': 'Công việc liên quan',
    'jobDetails': 'Chi tiết công việc',
    'allJobs': 'Tất cả công việc',
    'resetFilters': 'Đặt lại bộ lọc',
    'applyFilters': 'Áp dụng bộ lọc',
    'noJobsFound': 'Không tìm thấy công việc phù hợp với tiêu chí của bạn',
    
    // Language
    'language': 'Ngôn ngữ',
    'english': 'Tiếng Anh',
    'vietnamese': 'Tiếng Việt',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

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
