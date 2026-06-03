import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
//import Logout from '@/components/Logout';
import Footer from '@/components/Footer';
import FeaturesGrid from '@/components/FeaturesGrid';
import AnalyticsSection from '@/components/AnalyticsSection';
import CTASection from '@/components/CTASection';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Sversity - Campus Management Platform</title>
        <meta name="description" content="The unified campus management platform designed to empower modern educational institutions with AI-driven tools." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        
        <main className="flex-1 page-fade-in">
          <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-gradient-to-b from-white to-[#F5F7FB]">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E0E7FF] to-[#CFFAFE] blur-3xl rounded-full mix-blend-multiply"></div>
            </div>
            
            <div className="relative z-10 max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111827] mb-8" style={{ letterSpacing: '-0.02em' }}>
                The operating system for <br className="hidden md:block" />
                <span className="text-gradient-primary">
                  modern education
                </span>
              </h1>
              <p className="text-xl text-[#1F2937] max-w-2xl mx-auto mb-12 leading-relaxed">
                Streamline admissions, automate academics, and engage students with a single, intelligent platform built for the future of learning.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Button asChild size="lg" className="btn-gradient-primary w-full sm:w-auto h-14 px-10 text-lg">
                  <Link to="/contact">Book a demo</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="glass-card border-[#4F46E5]/30 text-[#1F2937] hover:text-[#4F46E5] w-full sm:w-auto h-14 px-10 text-lg">
                  <Link to="/about">Learn more</Link>
                </Button>
              </div>
            </div>
          </section>

          <FeaturesGrid />
          <AnalyticsSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;