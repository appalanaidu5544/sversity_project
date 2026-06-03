import React from 'react';
import { Helmet } from 'react-helmet';
//import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import TeamMemberCard from '@/components/TeamMemberCard';
import { Trophy, Star, Award } from 'lucide-react';

const AboutPage = () => {
  const team = [
    {
      name: "Mohammed Sajeed",
      role: "Cofounder and CEO",
      title: "Web Development Manager",
      bio: "Web Development Manager with expertise in 21st-century technologies and experience in verticals including hospitality, eCommerce, Edtech and Healthcare. Also a founder of other startups. On a mission to make people of all ages and backgrounds be creative with problem-solving as fun and see its importance in shaping better future."
    },
    {
      name: "Rajasekhar Thota",
      role: "Cofounder and CTO",
      title: "Product Development Lead",
      bio: "Product Development Lead with experience in EdTech startups delivering curriculum in STEAM Robotics Automation, Internet of Things, Game making and 3D printing. Consulting for IoT start-ups for prototype development. Currently working on AI and ML projects. Loves to explore technology trends through conferences and hackathons."
    },
    {
      name: "Mohammed Tameem",
      role: "Operations and Business Development Director",
      title: "Operations and Business Development Director",
      bio: "Operations and Business Development Director with diversified experience in IoTA corporate relations, Blockchain, Hyperledger Fabric and Internet of Things. Master's degree from University of Liverpool with interdisciplinary knowledge in technology and business. Helping with pedagogy development with global standards from Robokalam."
    }
  ];

  const awards = [
    { title: "Best EdTech Innovation 2023", icon: Trophy, desc: "Recognized for outstanding contribution to educational technology." },
    { title: "Technology Excellence Award", icon: Star, desc: "Awarded for robust and scalable campus management architecture." },
    { title: "Innovation in Education Award", icon: Award, desc: "Honored for transforming traditional learning methodologies." }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Sversity</title>
      </Helmet>
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        {/* <Header /> */}
        <main className="flex-1 page-fade-in">
          <section className="py-24 text-center bg-gradient-to-b from-white to-[#F5F7FB]">
            <div className="container mx-auto px-4">
              <div className="glass-card max-w-4xl mx-auto p-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-primary">Empowering Education Through Technology</h1>
                <p className="text-xl text-[#1F2937] max-w-3xl mx-auto leading-relaxed">
                  We build intelligent, scalable systems that allow educational institutions to focus on what matters most: student success.
                </p>
              </div>
            </div>
          </section>

          <section className="py-24">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid md:grid-cols-2 gap-12 items-stretch">
                <div className="glass-card p-10">
                  <h2 className="text-3xl font-bold mb-6 text-[#111827]">Our Story</h2>
                  <p className="text-[#1F2937] mb-6 leading-relaxed">
                    Founded by educators and technologists, Sversity was born from the frustration of dealing with fragmented, outdated campus software. We envisioned a unified ecosystem.
                  </p>
                  <p className="text-[#1F2937] mb-8 leading-relaxed">
                    Today, we provide a comprehensive suite of tools that seamlessly integrate every aspect of campus life, from admissions to alumni relations.
                  </p>
                  <div className="inline-block bg-[#E0E7FF] text-[#4F46E5] px-5 py-2.5 rounded-lg text-sm font-bold border border-[#4F46E5]/20 shadow-sm">
                    Proudly partnered with Robokalam.com
                  </div>
                </div>
                <div className="glass-card p-10 bg-gradient-to-br from-white/80 to-[#E0E7FF]/30">
                  <h2 className="text-3xl font-bold mb-6 text-[#4F46E5]">Our Vision</h2>
                  <p className="text-[#1F2937] leading-relaxed text-lg">
                    To be the digital backbone of every forward-thinking educational institution globally, fostering environments where innovation and learning thrive without administrative friction.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 bg-gradient-to-b from-[#F8F9FA] to-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#111827]">Leadership Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {team.map((member, idx) => (
                  <TeamMemberCard 
                    key={idx}
                    name={member.name}
                    role={member.role}
                    title={member.title}
                    bio={member.bio}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 bg-[#F8F9FA]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#111827]">Awards & Recognition</h2>
                <p className="text-lg text-[#1F2937]">Recognized for excellence in educational technology by Robokalam.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {awards.map((award, idx) => {
                  const Icon = award.icon;
                  return (
                    <div key={idx} className="glass-card p-8 text-center group">
                      <div className="w-16 h-16 mx-auto bg-[#E0E7FF] rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-8 w-8 text-[#4F46E5]" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-[#111827]">{award.title}</h3>
                      <p className="text-[#1F2937] leading-relaxed">{award.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;