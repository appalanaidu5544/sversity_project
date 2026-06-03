import React from 'react';
import { 
  UserCheck, 
  BookOpenCheck, 
  Users, 
  CreditCard, 
  FileEdit, 
  Briefcase, 
  Bus, 
  Home 
} from 'lucide-react';

const FeaturesGrid = () => {
  const features = [
    {
      title: 'Admissions',
      description: 'Smart enrollment system with AI-driven profiling and document verification.',
      icon: UserCheck,
      colorClass: 'text-[#4F46E5]',
      bgClass: 'bg-[#E0E7FF]',
    },
    {
      title: 'Academics',
      description: 'AI-powered learning management with OBE and NEP 2020 compliance.',
      icon: BookOpenCheck,
      colorClass: 'text-[#06B6D4]',
      bgClass: 'bg-[#CFFAFE]',
    },
    {
      title: 'Engagement',
      description: 'Holistic student engagement platform with events, clubs, surveys, and SDG-aligned tracking.',
      icon: Users,
      colorClass: 'text-[#A855F7]',
      bgClass: 'bg-[#F3E8FF]',
    },
    {
      title: 'Fee Payments',
      description: 'AI-driven omnichannel fee collection with smart routing and analytics.',
      icon: CreditCard,
      colorClass: 'text-[#4F46E5]',
      bgClass: 'bg-[#E0E7FF]',
    },
    {
      title: 'Examinations',
      description: 'AI-driven examination system with OBE-aligned assessment and NAD integration.',
      icon: FileEdit,
      colorClass: 'text-[#06B6D4]',
      bgClass: 'bg-[#CFFAFE]',
    },
    {
      title: 'Human Resources',
      description: 'HR management system with payroll automation, EPF, gratuity, and faculty appraisal.',
      icon: Briefcase,
      colorClass: 'text-[#A855F7]',
      bgClass: 'bg-[#F3E8FF]',
    },
    {
      title: 'Transport',
      description: 'Smart transportation with GPS tracking, route optimization, and student safety monitoring.',
      icon: Bus,
      colorClass: 'text-[#4F46E5]',
      bgClass: 'bg-[#E0E7FF]',
    },
    {
      title: 'Student Housing',
      description: 'Smart hostel management with occupancy analytics and maintenance scheduling.',
      icon: Home,
      colorClass: 'text-[#06B6D4]',
      bgClass: 'bg-[#CFFAFE]',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#F8F9FA] to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[#111827]">
            A unified ecosystem for modern campuses
          </h2>
          <p className="text-lg text-[#1F2937]">
            Replace fragmented tools with a single, intelligent platform designed to handle every aspect of institutional management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="glass-card p-6 flex flex-col sm:flex-row gap-6 items-start">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${feature.bgClass}`}>
                  <Icon className={`h-7 w-7 ${feature.colorClass}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111827] mb-2">{feature.title}</h3>
                  <p className="text-[#1F2937] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;