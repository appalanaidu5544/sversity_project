import React from 'react';
import { Quote } from 'lucide-react';

const SuccessStories = ({ stories }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F8F9FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#111827]">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {stories.map((story, index) => (
            <div key={index} className="glass-card p-10 relative overflow-hidden group">
              <div className="absolute top-6 right-6 text-[#E0E7FF] group-hover:text-[#CFFAFE] transition-colors duration-500">
                <Quote className="h-16 w-16" />
              </div>
              <div className="relative z-10">
                <p className="text-lg italic mb-8 text-[#1F2937] leading-relaxed">"{story.quote}"</p>
                <div>
                  <p className="font-bold text-[#4F46E5] text-lg">{story.author}</p>
                  <p className="text-sm font-medium text-[#6B7280]">{story.role}, {story.institution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;