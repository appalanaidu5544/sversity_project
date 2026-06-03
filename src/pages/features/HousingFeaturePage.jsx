import React from 'react';
import { Helmet } from 'react-helmet';
//import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeatureHero from '@/components/FeatureHero';
import FeatureHighlights from '@/components/FeatureHighlights';
import CTASection from '@/components/CTASection';
import { Home, Wrench, Activity } from 'lucide-react';

const HousingFeaturePage = () => {
  const highlights = [
    { title: 'Occupancy Analytics', description: 'Real-time insights into room availability and utilization.', icon: Activity },
    { title: 'Maintenance Scheduling', description: 'Automated ticketing and tracking for facility repairs.', icon: Wrench },
    { title: 'Smart Allocation', description: 'Algorithm-based room assignments based on student preferences.', icon: Home },
  ];

  return (
    <>
      <Helmet><title>Student Housing - Sversity</title></Helmet>
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        {/* <Header /> */}
        <main className="flex-1 page-fade-in">
          <FeatureHero 
            title="Smart Hostel Management" 
            description="Create comfortable living environments with intelligent occupancy analytics, maintenance scheduling, and smart allocation."
          />
          <FeatureHighlights highlights={highlights} />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HousingFeaturePage;