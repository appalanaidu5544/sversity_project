import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
//import Logout from '@/components/Logout';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: 'team@sversity.com', phone: '', institution: '', subject: '', message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pb.collection('ContactSubmissions').create(formData, { $autoCancel: false });
      setSuccess(true);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: 'team@sversity.com', phone: '', institution: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Contact Us - Sversity</title></Helmet>
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        {/* <Logout /> */}    
        <main className="flex-1 page-fade-in">
          <section className="py-20 bg-gradient-to-b from-white to-[#F5F7FB] text-center">
            <div className="container mx-auto px-4">
              <div className="glass-card max-w-3xl mx-auto p-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">Get in Touch</h1>
                <p className="text-xl text-[#1F2937]">We're here to help transform your institution.</p>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid lg:grid-cols-2 gap-12">
                
                {/* Form Section */}
                <div className="glass-card p-8 md:p-10 relative">
                  {success ? (
                    <div className="absolute inset-0 glass-card z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
                      <div className="w-20 h-20 bg-[#CFFAFE] rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="h-10 w-10 text-[#06B6D4]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#111827] mb-2">Message Sent!</h3>
                      <p className="text-[#1F2937]">Thank you for reaching out. We will respond within 24 hours.</p>
                    </div>
                  ) : null}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#111827]">Name *</label>
                        <Input className="glass-input h-12" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#111827]">Reply-to Email *</label>
                        <Input className="glass-input h-12" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#111827]">Phone</label>
                        <Input className="glass-input h-12" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#111827]">Institution</label>
                        <Input className="glass-input h-12" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#111827]">Subject</label>
                      <Select value={formData.subject} onValueChange={v => setFormData({...formData, subject: v})}>
                        <SelectTrigger className="glass-input h-12"><SelectValue placeholder="Select a subject" /></SelectTrigger>
                        <SelectContent className="glass-card">
                          <SelectItem value="demo">Request a Demo</SelectItem>
                          <SelectItem value="sales">Sales Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#111827]">Message *</label>
                      <Textarea className="glass-input resize-none" required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full btn-gradient-primary h-14 text-lg font-semibold">
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>

                {/* Contact Info Section */}
                <div className="space-y-8">
                  <div className="grid gap-4">
                    <a href="mailto:team@sversity.com" className="glass-card p-6 flex items-center gap-6 hover:border-[#4F46E5]/50 transition-colors group">
                      <div className="w-14 h-14 rounded-xl bg-[#E0E7FF] flex items-center justify-center text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-colors shadow-inner">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-[#111827] text-lg">Email Us</p>
                        <span className="text-[#1F2937]">team@sversity.com</span>
                      </div>
                    </a>
                    <a href="tel:9949279869" className="glass-card p-6 flex items-center gap-6 hover:border-[#06B6D4]/50 transition-colors group">
                      <div className="w-14 h-14 rounded-xl bg-[#CFFAFE] flex items-center justify-center text-[#06B6D4] group-hover:bg-[#06B6D4] group-hover:text-white transition-colors shadow-inner">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-[#111827] text-lg">Call Us</p>
                        <span className="text-[#1F2937]">9949279869</span>
                      </div>
                    </a>
                    <a href="https://share.google/RRP5bT3zjX0mmWen5" target="_blank" rel="noopener noreferrer" className="glass-card p-6 flex items-center gap-6 hover:border-[#A855F7]/50 transition-colors group">
                      <div className="w-14 h-14 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#A855F7] group-hover:bg-[#A855F7] group-hover:text-white transition-colors shadow-inner">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-[#111827] text-lg">Visit Us</p>
                        <span className="text-[#1F2937]">T-Hub, Hyderabad</span>
                      </div>
                    </a>
                  </div>
                  
                  <div className="glass-card p-2 h-64 overflow-hidden relative">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8272226612307!2d78.3778323153705!3d17.4436439880448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e456692353%3A0x39f17d40b426310d!2sT-Hub!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, borderRadius: '8px' }} 
                      allowFullScreen="" 
                      loading="lazy"
                      title="T-Hub Hyderabad Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;