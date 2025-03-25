
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // In real app, we would call an API to authenticate the user
    console.log('Login data:', data);
    toast({
      title: "Đăng nhập thành công",
      description: "Chào mừng bạn quay trở lại!",
    });
    
    // Redirect to home page after successful login
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    toast({
      title: "Đang kết nối với Google",
      description: "Vui lòng đợi trong giây lát...",
    });
    
    // Simulate Google login
    setTimeout(() => {
      toast({
        title: "Đăng nhập thành công",
        description: "Đã đăng nhập với Google!",
      });
      navigate('/');
    }, 1500);
  };

  const handleMetaMaskLogin = () => {
    console.log('MetaMask login clicked');
    toast({
      title: "Đang kết nối với MetaMask",
      description: "Vui lòng xác nhận trong ví MetaMask của bạn...",
    });
    
    // Simulate MetaMask login
    setTimeout(() => {
      toast({
        title: "Đăng nhập thành công",
        description: "Đã đăng nhập với MetaMask!",
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
        className="min-h-screen py-20"
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
                <h1 className="text-3xl font-bold">Đăng nhập</h1>
                <p className="text-muted-foreground mt-2">
                  Truy cập tài khoản của bạn để tiếp tục
                </p>
              </div>

              {/* Social login buttons */}
              <div className="flex flex-col space-y-4 mb-6">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full flex items-center justify-center gap-2 py-5 hover:bg-secondary/50"
                  onClick={handleGoogleLogin}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-google"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path><path d="M19.5 12h-15"></path><path d="M15 7.5v9"></path><path d="M7.5 7.5v9"></path><path d="M12 7.5v9"></path><rect x="8" y="3" width="8" height="4" rx="1"></rect><rect x="8" y="17" width="8" height="4" rx="1"></rect></svg>
                  <span>Đăng nhập với Google</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full flex items-center justify-center gap-2 py-5 hover:bg-secondary/50"
                  onClick={handleMetaMaskLogin}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-metamask"><path d="M19.4 10.8l-2.9-8.8h-9l-2.9 8.8-2.6.9 1.7 2.4-.8 1.5 1.9 1 .8-1.5 1.7.5 2.7-1.5 1 .5 2.7 1.5 1.7-.5.8 1.5 1.9-1-.8-1.5 1.7-2.4-2.6-.9z"></path><path d="M19.3 11.2l1.3-2.7-1.3-2.7-1.3 2.7 1.3 2.7zM3.4 11.2l1.3-2.7-1.3-2.7-1.3 2.7 1.3 2.7zM15 16.8l-1.9.5-2.3-1.5-2.3 1.5-1.9-.5.8 2.7 4.8-1.2 2.8 1z"></path></svg>
                  <span>Đăng nhập với MetaMask</span>
                </Button>
              </div>
              
              <div className="relative my-6">
                <Separator />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-xs text-muted-foreground">
                  hoặc đăng nhập với email
                </span>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                  <div className="flex items-center justify-between">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full button-glow flex items-center justify-center gap-2"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-sm">
                  Chưa có tài khoản?{" "}
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    Đăng ký ngay
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

export default Login;
