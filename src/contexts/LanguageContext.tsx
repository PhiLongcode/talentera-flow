
import React, { createContext, useContext, useState } from "react";

// Define the type for the language context
interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: any; // Translator function
}

// Create the context with an initial value
const LanguageContext = createContext<LanguageContextType>({
  language: "vi",
  setLanguage: () => {},
  t: (key: string) => key,
});

// Define translations
const translations = {
  en: {
    // Common
    home: "Home",
    jobs: "Jobs",
    employers: "Employers",
    candidates: "Candidates",
    login: "Login",
    register: "Register",
    logOut: "Log Out",
    search: "Search",
    manage: "Manage",
    explore: "Explore",
    findJobs: "Find Jobs",
    myProfile: "My Profile",
    settings: "Settings",
    review: "Review",
    applications: "Applications",
    viewAllApplications: "View All Applications",
    viewAllJobs: "View All Jobs",
    viewAllActivities: "View All Activities",
    management: "Management",
    dashboard: "Dashboard",
    companyProfile: "Company Profile",
    backToMain: "Back to Main Site",
    days: "days",
    lastWeek: "last week",
    hoursAgo: "hours ago",
    dayAgo: "day ago",
    
    // Hero section
    heroTitle: "Find Your Dream Job",
    heroSubtitle: "Connect with top employers and discover opportunities that match your skills and aspirations.",
    heroAction: "Get Started",
    heroSearchPlaceholder: "Search for jobs, skills, or companies",
    
    // Features section
    featuresTitle: "Why Choose JobConnect",
    featuresSubtitle: "The platform that connects talent with opportunity",
    featuresCardOneTitle: "Smart Job Matching",
    featuresCardOneDesc: "Our AI-powered matching system connects you with jobs that fit your skills and preferences.",
    featuresCardTwoTitle: "Professional Network",
    featuresCardTwoDesc: "Build your professional network and connect with industry leaders.",
    featuresCardThreeTitle: "Career Growth",
    featuresCardThreeDesc: "Access resources and tools to develop your skills and advance your career.",
    
    // CTA section
    ctaEmployersTitle: "For Employers",
    ctaEmployersSubtitle: "Find the right talent for your team",
    ctaEmployersDesc: "Post jobs, search candidates, and build your employer brand on JobConnect.",
    ctaEmployersButton: "Post a Job",
    ctaCandidatesTitle: "For Job Seekers",
    ctaCandidatesSubtitle: "Discover your next opportunity",
    ctaCandidatesDesc: "Search jobs, build your profile, and connect with employers on JobConnect.",
    ctaCandidatesButton: "Create Profile",
    
    // Jobs section
    recentJobs: "Recent Jobs",
    recentJobsDesc: "Explore the latest job opportunities across various industries",
    jobLocation: "Location",
    jobType: "Job Type",
    jobSalary: "Salary",
    jobPosted: "Posted",
    jobApply: "Apply Now",
    jobDetails: "View Details",
    jobFilters: "Filters",
    jobSearch: "Job Search",
    jobSearchPlaceholder: "Job title, keyword, or company",
    
    // Candidate Portal
    candidatePortal: "Candidate Portal",
    candidateWelcome: "Welcome to Your Candidate Dashboard",
    candidateWelcomeDesc: "Manage your job applications, update your profile, and discover new opportunities",
    candidateFeatures: "What You Can Do",
    candidateFeaturesDesc: "Explore all the features available to help advance your career",
    
    candidateJobSearch: "Job Search",
    candidateJobSearchDesc: "Find and apply to jobs that match your skills and experience",
    candidateProfile: "Profile Management",
    candidateProfileDesc: "Build and maintain your professional profile to stand out to employers",
    candidateApplications: "Application Tracking",
    candidateApplicationsDesc: "Track the status of your job applications and interviews",
    candidateMessages: "Messages",
    candidateMessagesDesc: "Communicate with recruiters and network with professionals",
    
    applicationTips: "Application Tips",
    tipTimelyApply: "Apply Early",
    tipTimelyApplyDesc: "Be among the first to apply to increase your chances of getting noticed",
    tipTailorResume: "Tailor Your Resume",
    tipTailorResumeDesc: "Customize your resume and cover letter for each job application",
    tipFollowUp: "Follow Up",
    tipFollowUpDesc: "Send a follow-up message after applying to show your continued interest",
    
    readyToApply: "Ready to Find Your Next Opportunity?",
    readyToApplyDesc: "Browse thousands of jobs from top employers",
    browseOpenings: "Browse Job Openings",
    
    // Recruiter Portal
    recruiterPortal: "Recruiter Portal",
    recruiterDashboard: "Recruiter Dashboard",
    recruiterActivities: "Activities",
    
    recruiterJobManagement: "Job Management",
    recruiterJobManagementDesc: "Post, edit, and manage job listings",
    recruiterCandidates: "Candidate Management",
    recruiterCandidatesDesc: "Review and track applicants",
    recruiterCompanyProfile: "Company Profile",
    recruiterCompanyProfileDesc: "Manage your company's presence",
    recruiterTalentSearch: "Talent Search",
    recruiterTalentSearchDesc: "Find qualified candidates",
    
    activeJobs: "Active Jobs",
    activeJobsDesc: "Currently open positions at your company",
    newApplications: "New Applications",
    candidatesShortlisted: "Candidates Shortlisted",
    averageTimeToHire: "Average Time to Hire",
    
    keyMetrics: "Key Metrics",
    quickAccess: "Quick Access",
    recentActivity: "Recent Activity",
    latestActivitiesDesc: "Your recent activities on the platform",
    
    newCandidateApplied: "New Candidate Applied",
    newCandidateAppliedDesc: "John Doe applied for Senior React Developer position",
    jobPostingViewed: "Job Posting Viewed",
    jobPostingViewedDesc: "Your UX/UI Designer job posting received 45 views",
    jobEdited: "Job Posting Edited",
    jobEditedDesc: "You updated the Marketing Specialist position details",
    
    recentApplications: "Recent Applications",
    recentApplicationsDesc: "Latest candidates who applied to your job postings",
    
    postJob: "Post Job",
    
    // Login/Register
    emailAddress: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot Password?",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    signUpNow: "Sign Up Now",
    signInNow: "Sign In Now",
    signInWithGoogle: "Sign in with Google",
    signInWithMetaMask: "Sign in with MetaMask",
    signUpWithGoogle: "Sign up with Google",
    signUpWithMetaMask: "Sign up with MetaMask",
    orSignInWith: "or sign in with email",
    orSignUpWith: "or sign up with email",
    fullName: "Full Name",
    createAccount: "Create Account",
    agreeToTerms: "I agree to the Terms of Service and Privacy Policy",
    
    // Errors and success messages
    errorRequired: "This field is required",
    errorEmail: "Please enter a valid email",
    errorPassword: "Password must be at least 6 characters",
    errorPasswordMatch: "Passwords do not match",
    successLogin: "Login successful",
    successRegistration: "Registration successful",
    welcomeBack: "Welcome back!",
    connectingGoogle: "Connecting to Google",
    pleaseWait: "Please wait a moment...",
    loginSuccessGoogle: "Successfully logged in with Google!",
    connectingMetaMask: "Connecting to MetaMask",
    confirmInWallet: "Please confirm in your MetaMask wallet...",
    loginSuccessMetaMask: "Successfully logged in with MetaMask!",
  },
  vi: {
    // Common
    home: "Trang chủ",
    jobs: "Việc làm",
    employers: "Nhà tuyển dụng",
    candidates: "Ứng viên",
    login: "Đăng nhập",
    register: "Đăng ký",
    logOut: "Đăng xuất",
    search: "Tìm kiếm",
    manage: "Quản lý",
    explore: "Khám phá",
    findJobs: "Tìm việc làm",
    myProfile: "Hồ sơ của tôi",
    settings: "Cài đặt",
    review: "Xem xét",
    applications: "Đơn ứng tuyển",
    viewAllApplications: "Xem tất cả đơn ứng tuyển",
    viewAllJobs: "Xem tất cả việc làm",
    viewAllActivities: "Xem tất cả hoạt động",
    management: "Quản lý",
    dashboard: "Bảng điều khiển",
    companyProfile: "Hồ sơ công ty",
    backToMain: "Quay lại trang chính",
    days: "ngày",
    lastWeek: "tuần trước",
    hoursAgo: "giờ trước",
    dayAgo: "ngày trước",
    
    // Hero section
    heroTitle: "Tìm Công Việc Mơ Ước Của Bạn",
    heroSubtitle: "Kết nối với các nhà tuyển dụng hàng đầu và khám phá cơ hội phù hợp với kỹ năng và nguyện vọng của bạn.",
    heroAction: "Bắt Đầu",
    heroSearchPlaceholder: "Tìm kiếm việc làm, kỹ năng hoặc công ty",
    
    // Features section
    featuresTitle: "Tại Sao Chọn JobConnect",
    featuresSubtitle: "Nền tảng kết nối tài năng với cơ hội",
    featuresCardOneTitle: "Kết Nối Việc Làm Thông Minh",
    featuresCardOneDesc: "Hệ thống kết nối thông minh của chúng tôi sẽ gợi ý những công việc phù hợp với kỹ năng và sở thích của bạn.",
    featuresCardTwoTitle: "Mạng Lưới Chuyên Nghiệp",
    featuresCardTwoDesc: "Xây dựng mạng lưới chuyên nghiệp và kết nối với những người dẫn đầu trong ngành.",
    featuresCardThreeTitle: "Phát Triển Nghề Nghiệp",
    featuresCardThreeDesc: "Tiếp cận các tài nguyên và công cụ để phát triển kỹ năng và thăng tiến trong sự nghiệp.",
    
    // CTA section
    ctaEmployersTitle: "Dành Cho Nhà Tuyển Dụng",
    ctaEmployersSubtitle: "Tìm kiếm nhân tài phù hợp cho đội ngũ của bạn",
    ctaEmployersDesc: "Đăng tin tuyển dụng, tìm kiếm ứng viên và xây dựng thương hiệu tuyển dụng trên JobConnect.",
    ctaEmployersButton: "Đăng Tin Tuyển Dụng",
    ctaCandidatesTitle: "Dành Cho Người Tìm Việc",
    ctaCandidatesSubtitle: "Khám phá cơ hội tiếp theo của bạn",
    ctaCandidatesDesc: "Tìm kiếm việc làm, xây dựng hồ sơ và kết nối với nhà tuyển dụng trên JobConnect.",
    ctaCandidatesButton: "Tạo Hồ Sơ",
    
    // Jobs section
    recentJobs: "Việc Làm Gần Đây",
    recentJobsDesc: "Khám phá các cơ hội việc làm mới nhất trong nhiều ngành khác nhau",
    jobLocation: "Địa điểm",
    jobType: "Loại công việc",
    jobSalary: "Mức lương",
    jobPosted: "Đăng tải",
    jobApply: "Ứng Tuyển Ngay",
    jobDetails: "Xem Chi Tiết",
    jobFilters: "Bộ lọc",
    jobSearch: "Tìm kiếm việc làm",
    jobSearchPlaceholder: "Chức danh, từ khóa hoặc công ty",
    
    // Candidate Portal
    candidatePortal: "Cổng Thông Tin Ứng Viên",
    candidateWelcome: "Chào mừng đến với Bảng Điều Khiển Ứng Viên",
    candidateWelcomeDesc: "Quản lý đơn ứng tuyển, cập nhật hồ sơ và khám phá cơ hội mới",
    candidateFeatures: "Những Gì Bạn Có Thể Làm",
    candidateFeaturesDesc: "Khám phá tất cả các tính năng có sẵn để giúp thăng tiến trong sự nghiệp",
    
    candidateJobSearch: "Tìm Kiếm Việc Làm",
    candidateJobSearchDesc: "Tìm và ứng tuyển vào các công việc phù hợp với kỹ năng và kinh nghiệm của bạn",
    candidateProfile: "Quản Lý Hồ Sơ",
    candidateProfileDesc: "Xây dựng và duy trì hồ sơ chuyên nghiệp để nổi bật với nhà tuyển dụng",
    candidateApplications: "Theo Dõi Đơn Ứng Tuyển",
    candidateApplicationsDesc: "Theo dõi trạng thái của các đơn ứng tuyển và phỏng vấn",
    candidateMessages: "Tin Nhắn",
    candidateMessagesDesc: "Liên lạc với nhà tuyển dụng và kết nối với các chuyên gia",
    
    applicationTips: "Mẹo Ứng Tuyển",
    tipTimelyApply: "Ứng Tuyển Sớm",
    tipTimelyApplyDesc: "Hãy là một trong những người đầu tiên ứng tuyển để tăng cơ hội được chú ý",
    tipTailorResume: "Tùy Chỉnh CV",
    tipTailorResumeDesc: "Điều chỉnh CV và thư xin việc cho từng đơn ứng tuyển",
    tipFollowUp: "Theo Dõi",
    tipFollowUpDesc: "Gửi tin nhắn theo dõi sau khi ứng tuyển để thể hiện sự quan tâm liên tục",
    
    readyToApply: "Sẵn Sàng Tìm Cơ Hội Tiếp Theo?",
    readyToApplyDesc: "Duyệt qua hàng ngàn việc làm từ các nhà tuyển dụng hàng đầu",
    browseOpenings: "Duyệt Qua Các Vị Trí Tuyển Dụng",
    
    // Recruiter Portal
    recruiterPortal: "Cổng Thông Tin Nhà Tuyển Dụng",
    recruiterDashboard: "Bảng Điều Khiển Nhà Tuyển Dụng",
    recruiterActivities: "Hoạt Động",
    
    recruiterJobManagement: "Quản Lý Việc Làm",
    recruiterJobManagementDesc: "Đăng, chỉnh sửa và quản lý danh sách việc làm",
    recruiterCandidates: "Quản Lý Ứng Viên",
    recruiterCandidatesDesc: "Xem xét và theo dõi người ứng tuyển",
    recruiterCompanyProfile: "Hồ Sơ Công Ty",
    recruiterCompanyProfileDesc: "Quản lý sự hiện diện của công ty bạn",
    recruiterTalentSearch: "Tìm Kiếm Nhân Tài",
    recruiterTalentSearchDesc: "Tìm ứng viên đủ điều kiện",
    
    activeJobs: "Việc Làm Đang Hoạt Động",
    activeJobsDesc: "Các vị trí đang mở tại công ty của bạn",
    newApplications: "Đơn Ứng Tuyển Mới",
    candidatesShortlisted: "Ứng Viên Vào Danh Sách Ngắn",
    averageTimeToHire: "Thời Gian Tuyển Dụng Trung Bình",
    
    keyMetrics: "Số Liệu Chính",
    quickAccess: "Truy Cập Nhanh",
    recentActivity: "Hoạt Động Gần Đây",
    latestActivitiesDesc: "Các hoạt động gần đây của bạn trên nền tảng",
    
    newCandidateApplied: "Ứng Viên Mới Đã Ứng Tuyển",
    newCandidateAppliedDesc: "John Doe đã ứng tuyển vào vị trí Senior React Developer",
    jobPostingViewed: "Tin Tuyển Dụng Được Xem",
    jobPostingViewedDesc: "Tin tuyển dụng UX/UI Designer của bạn đã nhận 45 lượt xem",
    jobEdited: "Tin Tuyển Dụng Được Chỉnh Sửa",
    jobEditedDesc: "Bạn đã cập nhật chi tiết vị trí Marketing Specialist",
    
    recentApplications: "Đơn Ứng Tuyển Gần Đây",
    recentApplicationsDesc: "Các ứng viên mới nhất đã ứng tuyển vào tin tuyển dụng của bạn",
    
    postJob: "Đăng Tin Tuyển Dụng",
    
    // Login/Register
    emailAddress: "Địa chỉ Email",
    password: "Mật khẩu",
    confirmPassword: "Xác nhận Mật khẩu",
    forgotPassword: "Quên mật khẩu?",
    dontHaveAccount: "Chưa có tài khoản?",
    alreadyHaveAccount: "Đã có tài khoản?",
    signUpNow: "Đăng ký ngay",
    signInNow: "Đăng nhập ngay",
    signInWithGoogle: "Đăng nhập với Google",
    signInWithMetaMask: "Đăng nhập với MetaMask",
    signUpWithGoogle: "Đăng ký với Google",
    signUpWithMetaMask: "Đăng ký với MetaMask",
    orSignInWith: "hoặc đăng nhập với email",
    orSignUpWith: "hoặc đăng ký với email",
    fullName: "Họ và Tên",
    createAccount: "Tạo Tài Khoản",
    agreeToTerms: "Tôi đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật",
    
    // Errors and success messages
    errorRequired: "Trường này là bắt buộc",
    errorEmail: "Vui lòng nhập một địa chỉ email hợp lệ",
    errorPassword: "Mật khẩu phải có ít nhất 6 ký tự",
    errorPasswordMatch: "Mật khẩu không khớp",
    successLogin: "Đăng nhập thành công",
    successRegistration: "Đăng ký thành công",
    welcomeBack: "Chào mừng bạn quay trở lại!",
    connectingGoogle: "Đang kết nối với Google",
    pleaseWait: "Vui lòng đợi trong giây lát...",
    loginSuccessGoogle: "Đã đăng nhập với Google!",
    connectingMetaMask: "Đang kết nối với MetaMask",
    confirmInWallet: "Vui lòng xác nhận trong ví MetaMask của bạn...",
    loginSuccessMetaMask: "Đã đăng nhập với MetaMask!",
  },
};

// Create a provider component for the language context
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>("vi");

  // Create a translation function that returns the correct string based on the current language
  const t = (key: string) => {
    if (!translations[language as keyof typeof translations]) {
      return key;
    }
    
    const langDict = translations[language as keyof typeof translations];
    return langDict[key as keyof typeof langDict] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
