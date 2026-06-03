import React from 'react';
import { Helmet } from 'react-helmet';
//import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeatureHero from '@/components/FeatureHero';
import FeatureHighlights from '@/components/FeatureHighlights';
import CTASection from '@/components/CTASection';
import { Briefcase, Calculator, Star } from 'lucide-react';

const HRFeaturePage = () => {
  const highlights = [
    { title: 'Payroll Automation', description: 'Error-free, automated payroll processing with tax compliance.', icon: Calculator },
    { title: 'Benefits Management', description: 'Streamlined handling of EPF, gratuity, and insurance.', icon: Briefcase },
    { title: 'Faculty Appraisal', description: 'Data-driven performance reviews and goal tracking.', icon: Star },
  ];

  return (
    <>
      <Helmet><title>Human Resources - Sversity</title></Helmet>
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        {/* <Header /> */}
        <main className="flex-1 page-fade-in">
          <FeatureHero 
            title="Institutional HR Management" 
            description="Empower your staff with automated payroll, comprehensive benefits management, and intelligent appraisal systems."
          />
          <FeatureHighlights highlights={highlights} />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HRFeaturePage;