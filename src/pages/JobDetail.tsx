
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, MapPin, Briefcase, DollarSign, Globe, Users, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useJobDetails } from '@/hooks/use-job-details';

const JobDetail = () => {
  const { jobId } = useParams();
  const { job, isLoading, relatedJobs } = useJobDetails(jobId as string);

  const handleApply = () => {
    toast({
      title: "Đã gửi đơn ứng tuyển",
      description: "Hồ sơ của bạn đã được gửi đến nhà tuyển dụng",
    });
  };

  const handleSave = () => {
    toast({
      title: "Đã lưu công việc",
      description: "Công việc đã được lưu vào danh sách của bạn",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy công việc</h2>
          <p className="text-muted-foreground mb-6">Công việc bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/jobs">
            <Button>Quay lại trang tìm việc</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <Link to="/jobs" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Quay lại danh sách việc làm</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Job Header */}
              <div className="bg-card rounded-xl p-6 shadow-sm mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-lg overflow-hidden mr-4 bg-secondary flex items-center justify-center">
                      <img 
                        src={job.logo} 
                        alt={job.company} 
                        className="h-full w-full object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.currentTarget.parentNode as HTMLElement).innerHTML = job.company.charAt(0);
                        }}
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-10 w-10"
                      onClick={handleSave}
                    >
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{job.jobType}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                    <span className="font-medium">{job.salary}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Đăng {job.postedAt}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="rounded-full font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-center md:justify-start">
                  <Button 
                    className="rounded-full w-full md:w-auto button-glow"
                    onClick={handleApply}
                  >
                    Ứng tuyển ngay
                  </Button>
                </div>
              </div>

              {/* Job Description */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Mô tả công việc</h2>
                  <div className="prose prose-blue max-w-none">
                    <p className="mb-4">
                      Công ty {job.company} đang tìm kiếm {job.title} có kinh nghiệm để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi. Đây là một vị trí toàn thời gian, nơi bạn sẽ có cơ hội làm việc với các công nghệ mới nhất và góp phần xây dựng các ứng dụng có tác động lớn.
                    </p>
                    
                    <h3 className="text-lg font-semibold my-3">Trách nhiệm:</h3>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>Phát triển và duy trì các ứng dụng sử dụng các công nghệ tiên tiến</li>
                      <li>Cộng tác với các nhóm sản phẩm và thiết kế để tạo ra trải nghiệm người dùng tuyệt vời</li>
                      <li>Tối ưu hóa hiệu suất ứng dụng và đảm bảo khả năng mở rộng</li>
                      <li>Viết mã sạch, có khả năng bảo trì và kiểm thử</li>
                      <li>Tham gia vào quá trình đánh giá mã và cải tiến liên tục</li>
                    </ul>

                    <h3 className="text-lg font-semibold my-3">Yêu cầu:</h3>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>Ít nhất 3 năm kinh nghiệm trong lĩnh vực phát triển phần mềm</li>
                      <li>Kinh nghiệm sâu rộng với {job.tags.join(', ')}</li>
                      <li>Hiểu biết mạnh mẽ về các nguyên tắc và mẫu thiết kế phần mềm</li>
                      <li>Kỹ năng giao tiếp và làm việc nhóm xuất sắc</li>
                      <li>Khả năng làm việc độc lập và quản lý nhiều nhiệm vụ</li>
                    </ul>

                    <h3 className="text-lg font-semibold my-3">Lợi ích:</h3>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>Mức lương cạnh tranh và gói phúc lợi hấp dẫn</li>
                      <li>Môi trường làm việc linh hoạt</li>
                      <li>Cơ hội học hỏi và phát triển chuyên môn</li>
                      <li>Bảo hiểm sức khỏe toàn diện</li>
                      <li>Các hoạt động team building thường xuyên</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Về công ty</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <a href="#" className="text-primary hover:underline">website công ty</a>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span>50-200 nhân viên</span>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span>Thành lập năm 2015</span>
                  </div>
                  <p className="text-muted-foreground">
                    {job.company} là một công ty công nghệ đang phát triển nhanh chóng, chuyên về xây dựng giải pháp phần mềm sáng tạo giúp các doanh nghiệp chuyển đổi số và tăng trưởng. Chúng tôi tự hào về văn hóa làm việc năng động và môi trường đổi mới của mình.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="sticky top-28">
                {/* Apply Now Card */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-4">Ứng tuyển nhanh</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Nộp hồ sơ ngay để tăng cơ hội được tuyển dụng cho vị trí này
                    </p>
                    <Button 
                      className="w-full rounded-full button-glow mb-3"
                      onClick={handleApply}
                    >
                      Ứng tuyển ngay
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full rounded-full"
                      onClick={handleSave}
                    >
                      <Bookmark className="mr-2 h-4 w-4" />
                      Lưu công việc
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Jobs */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-4">Công việc tương tự</h3>
                    <div className="space-y-4">
                      {relatedJobs.map((relatedJob) => (
                        <Link key={relatedJob.id} to={`/jobs/${relatedJob.id}`}>
                          <div className="p-3 hover:bg-accent rounded-lg transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="h-10 w-10 rounded-md bg-secondary flex-shrink-0 flex items-center justify-center">
                                <img 
                                  src={relatedJob.logo} 
                                  alt={relatedJob.company} 
                                  className="h-full w-full object-cover" 
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.currentTarget.parentNode as HTMLElement).innerHTML = relatedJob.company.charAt(0);
                                  }}
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm line-clamp-1">{relatedJob.title}</h4>
                                <p className="text-xs text-muted-foreground">{relatedJob.company}</p>
                              </div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{relatedJob.location}</span>
                              <span>{relatedJob.postedAt}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetail;
