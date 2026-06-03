import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#F8F9FA] relative overflow-hidden border-t border-[#E5E7EB] pt-16 pb-8">
      {/* Subtle glass overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] pointer-events-none"></div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="https://horizons-cdn.hostinger.com/ab98a221-4cef-403f-a384-84eb26761e2f/8b4b3c8fead9e08be0fc931b2025bd4c.png" 
                alt="Sversity Logo" 
                className="h-8 w-auto group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-[#4F46E5] leading-none">
                  Sversity
                </span>
                <span className="text-[10px] text-[#06B6D4] font-semibold tracking-wider uppercase mt-0.5">
                  Secure. Smart. Scalable.
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-[#1F2937]">
              The unified campus management platform designed to empower modern educational institutions with AI-driven tools.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#4F46E5] hover:text-white hover:bg-[#4F46E5] transition-all" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#06B6D4] hover:text-white hover:bg-[#06B6D4] transition-all" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#4F46E5] hover:text-white hover:bg-[#4F46E5] transition-all" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#111827] font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/features/admissions" className="text-[#1F2937] hover:text-[#4F46E5] hover:underline transition-all">Admissions</Link></li>
              <li><Link to="/features/academics" className="text-[#1F2937] hover:text-[#4F46E5] hover:underline transition-all">Academics</Link></li>
              <li><Link to="/features/fee-payments" className="text-[#1F2937] hover:text-[#4F46E5] hover:underline transition-all">Fee Management</Link></li>
              <li><Link to="/features/housing" className="text-[#1F2937] hover:text-[#4F46E5] hover:underline transition-all">Student Housing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#111827] font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="text-[#1F2937] hover:text-[#4F46E5] hover:underline transition-all">About Us</Link></li>
              <li><Link to="/contact" className="text-[#1F2937] hover:text-[#4F46E5] hover:underline transition-all">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-[#1F2937] hover:text-[#4F46E5] hover:underline transition-all">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[#1F2937] hover:text-[#4F46E5] hover:underline transition-all">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#111827] font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="mailto:team@sversity.com" className="flex items-center gap-3 text-[#1F2937] hover:text-[#4F46E5] transition-colors glass-card p-2 -ml-2">
                  <Mail className="h-4 w-4 text-[#4F46E5]" />
                  team@sversity.com
                </a>
              </li>
              <li>
                <a href="tel:9949279869" className="flex items-center gap-3 text-[#1F2937] hover:text-[#4F46E5] transition-colors glass-card p-2 -ml-2">
                  <Phone className="h-4 w-4 text-[#06B6D4]" />
                  9949279869
                </a>
              </li>
              <li>
                <a href="https://share.google/RRP5bT3zjX0mmWen5" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-[#1F2937] hover:text-[#4F46E5] transition-colors glass-card p-2 -ml-2">
                  <MapPin className="h-4 w-4 text-[#A855F7] mt-0.5 shrink-0" />
                  <span>T-Hub, Hyderabad</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280]">
            Copyright © 2026 Sversity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;