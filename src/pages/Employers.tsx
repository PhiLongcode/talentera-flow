
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Briefcase, Building, Users, UserPlus, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const Employers = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: t('aiWelcomeMessage') }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsAiTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = {
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
      
      const { language } = useLanguage();
      const randomIndex = Math.floor(Math.random() * aiResponses[language].length);
      const aiMessage = { 
        role: 'ai' as const, 
        content: aiResponses[language][randomIndex]
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

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
            className="mt-16 max-w-4xl mx-auto"
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
