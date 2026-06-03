import React from 'react';
import { motion } from 'framer-motion';

const FeatureHighlights = ({ highlights }) => {
  return (
    <section className="py-20 bg-[#F8F9FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#111827]">Key Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 h-full flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-[#E0E7FF] flex items-center justify-center mb-6 shadow-inner">
                  <Icon className="h-7 w-7 text-[#4F46E5]" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-3">{item.title}</h3>
                <p className="text-[#1F2937] leading-relaxed flex-1">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;