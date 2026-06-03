import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer';

const TermsPage = () => {
  return (
    <>
      <Helmet><title>Terms of Service - Sversity</title></Helmet>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-12">Last updated: April 7, 2026</p>
            
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-6">By accessing or using the Sversity platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">2. User Responsibilities</h2>
              <p className="text-muted-foreground mb-6">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">3. Intellectual Property</h2>
              <p className="text-muted-foreground mb-6">The platform, including its original content, features, and functionality, is owned by Sversity and is protected by international copyright, trademark, and other intellectual property laws.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">4. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-6">In no event shall Sversity be liable for any indirect, incidental, special, consequential or punitive damages arising out of your use of the service.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TermsPage;