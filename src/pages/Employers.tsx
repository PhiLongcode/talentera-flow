
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Briefcase, Building, Users, UserPlus, ChevronRight, Bot, Trash2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const Employers = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: t('aiWelcomeMessage') }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showClearButton, setShowClearButton] = useState(false);

  // Selected conversation topic
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  // List of conversation topics
  const topics = [
    { id: 'job-posting', icon: Briefcase, name: { en: 'Job Posting', vi: 'Đăng Tin Tuyển Dụng' } },
    { id: 'candidate-screening', icon: Users, name: { en: 'Candidate Screening', vi: 'Sàng Lọc Ứng Viên' } },
    { id: 'interview', icon: UserPlus, name: { en: 'Interview Tips', vi: 'Lời Khuyên Phỏng Vấn' } },
    { id: 'company-profile', icon: Building, name: { en: 'Company Profile', vi: 'Hồ Sơ Công Ty' } },
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsAiTyping(true);
    setShowClearButton(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let aiResponseContent = '';
      
      // Topic-specific responses based on selected topic
      if (selectedTopic === 'job-posting') {
        const jobPostingResponses = {
          en: [
            "I can help you create an effective job posting. What position are you looking to fill?",
            "For an effective job posting, include clear requirements, responsibilities, and company benefits.",
            "Would you like me to provide a template for your job description?",
            "Including salary range in job postings can increase application rates by up to 30%.",
            "What skills are most important for this position?"
          ],
          vi: [
            "Tôi có thể giúp bạn tạo một bài đăng việc làm hiệu quả. Bạn đang tìm kiếm vị trí nào?",
            "Để có bài đăng việc làm hiệu quả, hãy nêu rõ yêu cầu, trách nhiệm và lợi ích công ty.",
            "Bạn có muốn tôi cung cấp mẫu cho mô tả công việc của bạn không?",
            "Việc đưa ra mức lương trong bài đăng việc làm có thể tăng tỷ lệ ứng tuyển lên đến 30%.",
            "Những kỹ năng nào quan trọng nhất cho vị trí này?"
          ]
        };
        const randomIndex = Math.floor(Math.random() * jobPostingResponses[language].length);
        aiResponseContent = jobPostingResponses[language][randomIndex];
      } 
      else if (selectedTopic === 'candidate-screening') {
        const screeningResponses = {
          en: [
            "What specific qualifications are you looking for in candidates?",
            "I recommend using a skills assessment test for technical positions.",
            "Would you like tips on how to efficiently pre-screen resumes?",
            "Group interviews can be effective for assessing teamwork and communication skills.",
            "Have you considered using video interviews for initial screening?"
          ],
          vi: [
            "Bạn đang tìm kiếm những trình độ cụ thể nào ở ứng viên?",
            "Tôi khuyên bạn nên sử dụng bài kiểm tra đánh giá kỹ năng cho các vị trí kỹ thuật.",
            "Bạn có muốn mẹo về cách sàng lọc sơ bộ hồ sơ một cách hiệu quả không?",
            "Phỏng vấn nhóm có thể hiệu quả để đánh giá kỹ năng làm việc nhóm và giao tiếp.",
            "Bạn đã cân nhắc sử dụng phỏng vấn video cho sàng lọc ban đầu chưa?"
          ]
        };
        const randomIndex = Math.floor(Math.random() * screeningResponses[language].length);
        aiResponseContent = screeningResponses[language][randomIndex];
      }
      else if (selectedTopic === 'interview') {
        const interviewResponses = {
          en: [
            "Behavioral questions can help assess how candidates handled past situations.",
            "Consider using a structured interview process for all candidates.",
            "Would you like examples of effective interview questions for this role?",
            "I recommend preparing a scoring rubric to evaluate candidates objectively.",
            "What specific traits are you looking for in your ideal candidate?"
          ],
          vi: [
            "Câu hỏi hành vi có thể giúp đánh giá cách ứng viên xử lý các tình huống trong quá khứ.",
            "Hãy cân nhắc sử dụng quy trình phỏng vấn có cấu trúc cho tất cả ứng viên.",
            "Bạn có muốn ví dụ về các câu hỏi phỏng vấn hiệu quả cho vai trò này không?",
            "Tôi khuyên bạn nên chuẩn bị một bảng đánh giá để đánh giá ứng viên một cách khách quan.",
            "Bạn đang tìm kiếm những đặc điểm cụ thể nào ở ứng viên lý tưởng của mình?"
          ]
        };
        const randomIndex = Math.floor(Math.random() * interviewResponses[language].length);
        aiResponseContent = interviewResponses[language][randomIndex];
      }
      else if (selectedTopic === 'company-profile') {
        const profileResponses = {
          en: [
            "A compelling company profile should highlight your culture and values.",
            "Would you like suggestions on how to improve your employer branding?",
            "Company profiles with photos and videos get 50% more views.",
            "What unique benefits do you offer that differentiate your company?",
            "I can help you craft a company mission statement that attracts talent."
          ],
          vi: [
            "Một hồ sơ công ty hấp dẫn nên nêu bật văn hóa và giá trị của bạn.",
            "Bạn có muốn gợi ý về cách cải thiện thương hiệu nhà tuyển dụng của mình không?",
            "Hồ sơ công ty có hình ảnh và video nhận được nhiều lượt xem hơn 50%.",
            "Những lợi ích độc đáo nào bạn cung cấp để phân biệt công ty của bạn?",
            "Tôi có thể giúp bạn xây dựng một tuyên bố sứ mệnh công ty thu hút nhân tài."
          ]
        };
        const randomIndex = Math.floor(Math.random() * profileResponses[language].length);
        aiResponseContent = profileResponses[language][randomIndex];
      }
      else {
        // Default responses if no topic is selected
        const defaultResponses = {
          en: [
            "I can help you create and manage job listings that attract qualified candidates.",
            "Our AI-powered system can match your job requirements with potential candidates automatically.",
            "Would you like me to help you write an effective job description?",
            "I can provide insights on market rates for this position based on current data.",
            "Let me show you how our platform can streamline your hiring process."
          ],
          vi: [
            "Tôi có thể giúp bạn tạo và quản lý danh sách công việc để thu hút ứng viên phù hợp.",
            "Hệ thống AI của chúng tôi có thể tự động kết nối yêu cầu công việc với ứng viên tiềm năng.",
            "Bạn có muốn tôi giúp viết mô tả công việc hiệu quả không?",
            "Tôi có thể cung cấp thông tin về mức lương thị trường cho vị trí này dựa trên dữ liệu hiện tại.",
            "Hãy để tôi chỉ cho bạn cách nền tảng của chúng tôi có thể hợp lý hóa quy trình tuyển dụng của bạn."
          ]
        };
        const randomIndex = Math.floor(Math.random() * defaultResponses[language].length);
        aiResponseContent = defaultResponses[language][randomIndex];
      }
      
      const aiMessage = { 
        role: 'ai' as const, 
        content: aiResponseContent
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsAiTyping(false);
      toast({
        title: t('newMessageReceived'),
        description: t('aiRespondedToYourQuery'),
      });
    }, 1500);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([{ role: 'ai', content: t('aiWelcomeMessage') }]);
    setShowClearButton(false);
    setSelectedTopic(null);
  };

  const selectTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    // Add a welcome message for the selected topic
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      const welcomeMessage = {
        en: `Let's discuss about ${topic.name.en}. How can I help you today?`,
        vi: `Hãy thảo luận về ${topic.name.vi}. Tôi có thể giúp gì cho bạn hôm nay?`
      };
      
      setMessages([
        { role: 'ai', content: welcomeMessage[language] }
      ]);
    }
  };

  const employerFeatures = [
    { 
      icon: Briefcase, 
      title: t('manageJobListings'),
      description: t('manageJobListingsDesc')
    },
    { 
      icon: Users, 
      title: t('candidateMatching'),
      description: t('candidateMatchingDesc')
    },
    { 
      icon: Building, 
      title: t('companyProfile'),
      description: t('companyProfileDesc')
    },
    { 
      icon: UserPlus, 
      title: t('talentAcquisition'),
      description: t('talentAcquisitionDesc')
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('employers')}</h1>
            <p className="text-muted-foreground mb-8">
              {t('revolutionaryPlatform')}
            </p>
          </motion.div>
          
          {/* Employer Features */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {employerFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="flex items-center text-primary">
                        {t('learnMore')} <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{feature.title}</DialogTitle>
                        <DialogDescription className="pt-4">
                          {feature.description}
                          <p className="mt-4">{t('featureComingSoon')}</p>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
          
          {/* AI Assistant Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  {t('aiRecruitmentAssistant')}
                </CardTitle>
                <CardDescription>
                  {t('aiAssistantDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Topics sidebar for larger screens */}
                  <div className="md:w-1/4 space-y-3">
                    <h3 className="font-medium text-sm">{language === 'en' ? 'Conversation Topics' : 'Chủ Đề Hội Thoại'}</h3>
                    <div className="space-y-2">
                      {topics.map((topic) => (
                        <Button 
                          key={topic.id}
                          variant={selectedTopic === topic.id ? "default" : "outline"}
                          className="w-full justify-start text-left"
                          onClick={() => selectTopic(topic.id)}
                        >
                          <topic.icon className="mr-2 h-4 w-4" />
                          <span>{topic.name[language]}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Chat container */}
                  <div className="md:w-3/4">
                    <div className="bg-muted/50 rounded-lg p-4 h-[300px] overflow-y-auto mb-4">
                      {messages.map((message, index) => (
                        <div 
                          key={index} 
                          className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                        >
                          <div 
                            className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                              message.role === 'user' 
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground'
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                      {isAiTyping && (
                        <div className="text-left">
                          <div className="inline-block rounded-lg px-4 py-2 bg-secondary text-secondary-foreground">
                            <span className="inline-block animate-pulse">•••</span>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef}></div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        placeholder={t('askAiPlaceholder')}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow"
                      />
                      <Button onClick={handleSendMessage} disabled={isAiTyping || !inputMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                      {showClearButton && (
                        <Button variant="outline" onClick={clearConversation} title={language === 'en' ? 'Clear conversation' : 'Xóa cuộc trò chuyện'}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {/* Mobile topics - shown below chat on small screens */}
                    <div className="md:hidden mt-4">
                      <Separator className="my-2" />
                      <h3 className="font-medium text-sm mb-2">{language === 'en' ? 'Conversation Topics' : 'Chủ Đề Hội Thoại'}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {topics.map((topic) => (
                          <Button 
                            key={topic.id}
                            variant={selectedTopic === topic.id ? "default" : "outline"}
                            size="sm"
                            className="justify-start text-left"
                            onClick={() => selectTopic(topic.id)}
                          >
                            <topic.icon className="mr-2 h-3 w-3" />
                            <span className="text-xs">{topic.name[language]}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Employers;
