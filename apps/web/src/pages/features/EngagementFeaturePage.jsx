import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer';
import FeatureHero from '@/components/FeatureHero';
import FeatureHighlights from '@/components/FeatureHighlights';
import CTASection from '@/components/CTASection';
import { Users, Calendar, Globe } from 'lucide-react';

const EngagementFeaturePage = () => {
  const highlights = [
    { title: 'Event Management', description: 'Organize, promote, and track attendance for campus events.', icon: Calendar },
    { title: 'Club Hub', description: 'Centralized platform for student organizations and societies.', icon: Users },
    { title: 'SDG Tracking', description: 'Align and measure student activities against UN Sustainable Development Goals.', icon: Globe },
  ];

  return (
    <>
      <Helmet><title>Student Engagement - Sversity</title></Helmet>
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        <main className="flex-1 page-fade-in">
          <FeatureHero 
            title="Holistic Student Engagement" 
            description="Foster a vibrant campus community with tools for events, clubs, surveys, and SDG-aligned activity tracking."
          />
          <FeatureHighlights highlights={highlights} />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EngagementFeaturePage;