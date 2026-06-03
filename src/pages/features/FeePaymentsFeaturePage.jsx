import React from 'react';
import { Helmet } from 'react-helmet';
//import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeatureHero from '@/components/FeatureHero';
import FeatureHighlights from '@/components/FeatureHighlights';
import CTASection from '@/components/CTASection';
import { CreditCard, Network, PieChart } from 'lucide-react';

const FeePaymentsFeaturePage = () => {
  const highlights = [
    { title: 'Omnichannel Collection', description: 'Accept payments via cards, bank transfers, UPI, and digital wallets.', icon: CreditCard },
    { title: 'Smart Routing', description: 'Automatically route funds to appropriate institutional accounts.', icon: Network },
    { title: 'Financial Analytics', description: 'Real-time dashboards for revenue tracking and forecasting.', icon: PieChart },
  ];

  return (
    <>
      <Helmet><title>Fee Payments - Sversity</title></Helmet>
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        {/* <Header /> */}
        <main className="flex-1 page-fade-in">
          <FeatureHero 
            title="Smart Fee Management" 
            description="Simplify financial operations with AI-driven omnichannel fee collection, smart routing, and comprehensive analytics."
          />
          <FeatureHighlights highlights={highlights} />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FeePaymentsFeaturePage;