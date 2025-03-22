
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobFilters from '@/components/jobs/JobFilters';
import JobsList from '@/components/home/JobsList';

const Jobs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <section className="container mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Tìm kiếm cơ hội nghề nghiệp</h1>
            <p className="text-muted-foreground max-w-3xl">
              Khám phá hàng ngàn cơ hội việc làm từ các công ty hàng đầu với chứng chỉ được xác minh bằng blockchain và khả năng kết nối thông qua AI.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <JobFilters />
            </div>
            <div className="lg:col-span-3">
              <JobsList showFullList={true} />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
