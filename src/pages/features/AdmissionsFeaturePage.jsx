import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer';
import FeatureHero from '@/components/FeatureHero';
import FeatureHighlights from '@/components/FeatureHighlights';
import CTASection from '@/components/CTASection';
import { FileCheck, BrainCircuit, ShieldCheck } from 'lucide-react';

const AdmissionsFeaturePage = () => {
  const highlights = [
    { title: 'AI-Driven Profiling', description: 'Automatically evaluate applicant profiles against historical success metrics.', icon: BrainCircuit },
    { title: 'Document Verification', description: 'OCR and AI-powered verification of transcripts and identity documents.', icon: FileCheck },
    { title: 'Compliance Tracking', description: 'Ensure all admissions meet regional and institutional regulatory standards.', icon: ShieldCheck },
  ];

  return (
    <>
      <Helmet><title>Admissions System - Sversity</title></Helmet>
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        <main className="flex-1 page-fade-in">
          <FeatureHero 
            title="Smart Admissions System" 
            description="Transform your enrollment process with AI-driven profiling, automated document verification, and seamless applicant tracking."
          />
          <FeatureHighlights highlights={highlights} />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AdmissionsFeaturePage;