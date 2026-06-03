import React from 'react';
import { Helmet } from 'react-helmet';
//import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeatureHero from '@/components/FeatureHero';
import FeatureHighlights from '@/components/FeatureHighlights';
import CTASection from '@/components/CTASection';
import { FileEdit, Shield, Award } from 'lucide-react';

const ExaminationsFeaturePage = () => {
  const highlights = [
    { title: 'OBE-Aligned Assessment', description: 'Map exam questions directly to course outcomes.', icon: FileEdit },
    { title: 'AI Proctoring', description: 'Secure online examinations with advanced AI monitoring.', icon: Shield },
    { title: 'NAD Integration', description: 'Direct integration with National Academic Depository.', icon: Award },
  ];

  return (
    <>
      <Helmet><title>Examinations System - Sversity</title></Helmet>
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        {/* <Header /> */}
        <main className="flex-1 page-fade-in">
          <FeatureHero 
            title="Secure Examinations" 
            description="Conduct flawless assessments with our AI-driven examination system featuring OBE alignment and NAD integration."
          />
          <FeatureHighlights highlights={highlights} />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ExaminationsFeaturePage;