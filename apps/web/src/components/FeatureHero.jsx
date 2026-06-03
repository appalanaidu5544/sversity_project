import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeatureHero = ({ title, description, ctaText = "Book a demo", ctaLink = "/contact" }) => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white to-[#F5F7FB]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto glass-card p-10 md:p-14"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-primary">
            {title}
          </h1>
          <p className="text-xl text-[#1F2937] mb-10 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="btn-gradient-primary w-full sm:w-auto h-12 px-8">
              <Link to={ctaLink}>{ctaText}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto glass-card border-[#4F46E5]/30 text-[#1F2937] hover:text-[#4F46E5] h-12 px-8">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureHero;