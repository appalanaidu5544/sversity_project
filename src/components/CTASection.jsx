import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-[#F8F9FA]">
      {/* Background Pattern/Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4F46E5_1px,transparent_1px),linear-gradient(to_bottom,#4F46E5_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-[#E0E7FF] rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-[#CFFAFE] rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto glass-card p-12 md:p-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6 tracking-tight">
            Ready to transform your campus?
          </h2>
          <p className="text-xl text-[#1F2937] mb-10 max-w-2xl mx-auto">
            Join leading institutions using Sversity to automate operations, engage students, and drive academic excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button asChild size="lg" className="w-full sm:w-auto btn-gradient-primary text-base h-14 px-8">
              <Link to="/contact">Book a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto glass-card border-[#4F46E5]/30 text-[#1F2937] hover:text-[#4F46E5] text-base h-14 px-8">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium text-[#1F2937]">
            <a href="mailto:team@sversity.com" className="flex items-center gap-2 hover:text-[#4F46E5] transition-colors">
              <Mail className="h-4 w-4 text-[#4F46E5]" />
              team@sversity.com
            </a>
            <span className="hidden sm:block text-[#E5E7EB]">•</span>
            <a href="tel:9949279869" className="flex items-center gap-2 hover:text-[#06B6D4] transition-colors">
              <Phone className="h-4 w-4 text-[#06B6D4]" />
              9949279869
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;