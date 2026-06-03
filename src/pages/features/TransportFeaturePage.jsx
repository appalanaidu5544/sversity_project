import React from 'react';
import { Helmet } from 'react-helmet';
//import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeatureHero from '@/components/FeatureHero';
import FeatureHighlights from '@/components/FeatureHighlights';
import CTASection from '@/components/CTASection';
import { Map, Route, ShieldAlert } from 'lucide-react';

const TransportFeaturePage = () => {
  const highlights = [
    { title: 'Live GPS Tracking', description: 'Real-time visibility of all campus vehicles.', icon: Map },
    { title: 'Route Optimization', description: 'AI algorithms to minimize travel time and fuel costs.', icon: Route },
    { title: 'Safety Monitoring', description: 'Automated alerts for speeding, deviations, and delays.', icon: ShieldAlert },
  ];

  return (
    <>
      <Helmet><title>Transport Management - Sversity</title></Helmet>
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        {/* <Header /> */}
        <main className="flex-1 page-fade-in">
          <FeatureHero 
            title="Smart Transportation" 
            description="Ensure student safety and operational efficiency with GPS tracking, route optimization, and real-time monitoring."
          />
          <FeatureHighlights highlights={highlights} />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TransportFeaturePage;