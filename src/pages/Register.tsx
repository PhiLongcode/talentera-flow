
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải có ít nhất 2 ký tự",
  }),
  email: z.string().email({
    message: "Email không hợp lệ",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự",
  }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "Bạn cần đồng ý với điều khoản sử dụng",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    // In real app, we would call an API to register the user
    console.log('Register data:', data);
    toast({
      title: "Đăng ký thành công",
      description: "Tài khoản của bạn đã được tạo.",
    });
    
    // Redirect to login page after successful registration
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
    toast({
      title: "Đang kết nối với Google",
      description: "Vui lòng đợi trong giây lát...",
    });
    
    // Simulate Google signup
    setTimeout(() => {
      toast({
        title: "Đăng ký thành công",
        description: "Đã đăng ký với Google!",
      });
      navigate('/');
    }, 1500);
  };

  const handleMetaMaskSignup = () => {
    console.log('MetaMask signup clicked');
    toast({
      title: "Đang kết nối với MetaMask",
      description: "Vui lòng xác nhận trong ví MetaMask của bạn...",
    });
    
    // Simulate MetaMask signup
    setTimeout(() => {
      toast({
        title: "Đăng ký thành công",
        description: "Đã đăng ký với MetaMask!",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen py-16 md:py-20"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-8 shadow-xl"
            >
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold">Đăng ký tài khoản</h1>
                <p className="text-muted-foreground mt-2">
                  Tham gia cộng đồng của chúng tôi ngay hôm nay
                </p>
              </div>

              {/* Social signup buttons */}
              <div className="flex flex-col space-y-4 mb-6">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full flex items-center justify-center gap-2 py-5 hover:bg-secondary/50"
                  onClick={handleGoogleSignup}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-google"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path><path d="M19.5 12h-15"></path><path d="M15 7.5v9"></path><path d="M7.5 7.5v9"></path><path d="M12 7.5v9"></path><rect x="8" y="3" width="8" height="4" rx="1"></rect><rect x="8" y="17" width="8" height="4" rx="1"></rect></svg>
                  <span>Đăng ký với Google</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full flex items-center justify-center gap-2 py-5 hover:bg-secondary/50"
                  onClick={handleMetaMaskSignup}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-metamask"><path d="M19.4 10.8l-2.9-8.8h-9l-2.9 8.8-2.6.9 1.7 2.4-.8 1.5 1.9 1 .8-1.5 1.7.5 2.7-1.5 1 .5 2.7 1.5 1.7-.5.8 1.5 1.9-1-.8-1.5 1.7-2.4-2.6-.9z"></path><path d="M19.3 11.2l1.3-2.7-1.3-2.7-1.3 2.7 1.3 2.7zM3.4 11.2l1.3-2.7-1.3-2.7-1.3 2.7 1.3 2.7zM15 16.8l-1.9.5-2.3-1.5-2.3 1.5-1.9-.5.8 2.7 4.8-1.2 2.8 1z"></path></svg>
                  <span>Đăng ký với MetaMask</span>
                </Button>
              </div>
              
              <div className="relative my-6">
                <Separator />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-xs text-muted-foreground">
                  hoặc đăng ký với email
                </span>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              className="pl-10"
                              placeholder="Nguyễn Văn A"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              className="pl-10"
                              placeholder="email@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              className="pl-10"
                              type="password"
                              placeholder="••••••"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Xác nhận mật khẩu</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              className="pl-10"
                              type="password"
                              placeholder="••••••"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Tôi đồng ý với{" "}
                            <Link to="/terms" className="text-primary hover:underline">
                              Điều khoản sử dụng
                            </Link>{" "}
                            và{" "}
                            <Link to="/privacy" className="text-primary hover:underline">
                              Chính sách bảo mật
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full button-glow flex items-center justify-center gap-2"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-sm">
                  Đã có tài khoản?{" "}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Register;
