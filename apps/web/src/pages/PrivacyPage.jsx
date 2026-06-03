import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer';

const PrivacyPage = () => {
  return (
    <>
      <Helmet><title>Privacy Policy - Sversity</title></Helmet>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-12">Last updated: April 7, 2026</p>
            
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">1. Introduction</h2>
              <p className="text-muted-foreground mb-6">At Sversity, we take your privacy seriously. This policy describes how we collect, use, and protect your personal data when you use our campus management platform.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">2. Data Collection</h2>
              <p className="text-muted-foreground mb-6">We collect information that you provide directly to us, including name, email address, institutional affiliation, and usage data generated while interacting with our services.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">3. Data Usage</h2>
              <p className="text-muted-foreground mb-6">Your data is used exclusively to provide, maintain, and improve our services, process transactions, and communicate with you regarding your account.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">4. Contact Us</h2>
              <p className="text-muted-foreground mb-6">If you have questions about this policy, please contact us at privacy@sversity.com.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPage;