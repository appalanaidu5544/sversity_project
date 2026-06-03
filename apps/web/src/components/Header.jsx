import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, Mail, Phone } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const systems = [
    { name: 'Admissions', path: '/features/admissions' },
    { name: 'Academics', path: '/features/academics' },
    { name: 'Engagement', path: '/features/engagement' },
    { name: 'Fee Payments', path: '/features/fee-payments' },
    { name: 'Examinations', path: '/features/examinations' },
    { name: 'HR', path: '/features/hr' },
    { name: 'Transport', path: '/features/transport' },
    { name: 'Housing', path: '/features/housing' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Top Contact Bar */}
      <div className="glass-panel py-1.5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center sm:justify-end items-center gap-6 text-xs font-medium text-[#1F2937]">
          <a href="mailto:team@sversity.com" className="flex items-center gap-1.5 hover:text-[#4F46E5] transition-colors">
            <Mail className="h-3.5 w-3.5" />
            team@sversity.com
          </a>
          <a href="tel:9949279869" className="flex items-center gap-1.5 hover:text-[#4F46E5] transition-colors">
            <Phone className="h-3.5 w-3.5" />
            9949279869
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full glass-panel">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-[#1F2937] hover:text-[#4F46E5] hover:bg-white/50 px-3 py-2 rounded-lg transition-all">
                Home
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-[#1F2937] hover:text-[#4F46E5] hover:bg-white/50 px-3 py-2 rounded-lg transition-all outline-none">
                  Our Systems <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 p-2 glass-card border-white/40">
                  {systems.map((sys) => (
                    <DropdownMenuItem key={sys.name} asChild className="cursor-pointer rounded-md py-2 hover:bg-[#E0E7FF] focus:bg-[#E0E7FF] focus:text-[#4F46E5] text-[#1F2937]">
                      <Link to={sys.path}>{sys.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link to="/about" className="text-sm font-medium text-[#1F2937] hover:text-[#4F46E5] hover:bg-white/50 px-3 py-2 rounded-lg transition-all">
                About Us
              </Link>
              <Link to="/contact" className="text-sm font-medium text-[#1F2937] hover:text-[#4F46E5] hover:bg-white/50 px-3 py-2 rounded-lg transition-all">
                Contact Us
              </Link>
              <Link to="/knowledge-base" className="text-sm font-medium text-[#1F2937] hover:text-[#4F46E5] hover:bg-white/50 px-3 py-2 rounded-lg transition-all">
                Knowledge Base
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-[#1F2937] hover:text-[#4F46E5] transition-colors">
                Login
              </Link>
              <Button asChild className="btn-gradient-primary">
                <Link to="/contact">Book a demo</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-[#1F2937] hover:bg-white/50">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto glass-card border-l border-white/40">
                <div className="flex flex-col gap-6 mt-8">
                  <Link to="/" className="text-sm font-medium text-[#1F2937] hover:text-[#4F46E5]" onClick={() => setIsOpen(false)}>Home</Link>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-[#4F46E5]">Our Systems</h4>
                    <div className="grid grid-cols-1 gap-2 pl-2 border-l border-[#E5E7EB]">
                      {systems.map((sys) => (
                        <Link key={sys.name} to={sys.path} className="text-sm py-1 text-[#1F2937] hover:text-[#4F46E5]" onClick={() => setIsOpen(false)}>
                          {sys.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4 border-t border-[#E5E7EB] pt-4">
                    <Link to="/about" className="block text-sm font-medium text-[#1F2937] hover:text-[#4F46E5]" onClick={() => setIsOpen(false)}>About Us</Link>
                    <Link to="/contact" className="block text-sm font-medium text-[#1F2937] hover:text-[#4F46E5]" onClick={() => setIsOpen(false)}>Contact Us</Link>
                    <Link to="/knowledge-base" className="block text-sm font-medium text-[#1F2937] hover:text-[#4F46E5]" onClick={() => setIsOpen(false)}>Knowledge Base</Link>
                  </div>

                  <div className="space-y-4 border-t border-[#E5E7EB] pt-6">
                    <Button asChild variant="outline" className="w-full bg-white/50 border-white/50 hover:bg-white/80 text-[#1F2937]" onClick={() => setIsOpen(false)}>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full btn-gradient-primary" onClick={() => setIsOpen(false)}>
                      <Link to="/contact">Book a demo</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;