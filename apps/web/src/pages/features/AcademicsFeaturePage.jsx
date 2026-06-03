import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer';
import FeatureHero from '@/components/FeatureHero';
import FeatureHighlights from '@/components/FeatureHighlights';
import CTASection from '@/components/CTASection';
import { BookOpen, Target, LineChart } from 'lucide-react';

const AcademicsFeaturePage = () => {
  const highlights = [
    { title: 'AI-Powered Learning', description: 'Personalized learning paths adapted to individual student performance.', icon: BookOpen },
    { title: 'OBE Compliance', description: 'Built-in Outcome-Based Education mapping and tracking.', icon: Target },
    { title: 'NEP 2020 Ready', description: 'Fully compliant with National Education Policy 2020 guidelines.', icon: LineChart },
  ];

  return (
    <>
      <Helmet><title>Academics System - Sversity</title></Helmet>
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        <main className="flex-1 page-fade-in">
          <FeatureHero 
            title="Intelligent Academics" 
            description="Deliver exceptional educational experiences with our AI-powered, fully compliant learning management system."
          />
          <FeatureHighlights highlights={highlights} />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AcademicsFeaturePage;