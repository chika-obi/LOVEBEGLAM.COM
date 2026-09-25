import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, Sparkles, MessageCircle } from 'lucide-react';
import { SALON_CONTACT } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Price Estimator', href: '#estimator' },
    { name: 'Academy', href: '#academy' },
    { name: 'Videos', href: '#videos' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-rose-950 via-[#19101d] to-pink-950 text-xs py-2 px-4 text-center border-b border-rose-900/30 text-rose-200/90 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Now Booking: Bridal Season & Masterclasses in Port Harcourt</span>
          </div>
          <div className="flex items-center gap-5 text-gray-300">
            <a
              href={`tel:${SALON_CONTACT.primaryPhone}`}
              className="flex items-center gap-1.5 hover:text-pink-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-pink-400" />
              <span>{SALON_CONTACT.primaryPhone}</span>
            </a>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">{SALON_CONTACT.hours}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed top-0 md:top-[33px] left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0d0e15]/90 backdrop-blur-md border-b border-rose-500/20 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#0b0c10]/90 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/logo.jpg"
                  alt="LoveDeGlam Logo"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-pink-500/60 shadow-lg group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-black rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-pink-400 transition-colors">
                  LoveDeGlam
                </span>
                <span className="text-[10px] tracking-widest text-pink-300 uppercase font-medium">
                  Luxury · Beauty · Academy
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-500 hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={SALON_CONTACT.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="btn-glam px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Session</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => onOpenBooking()}
                className="sm:hidden btn-glam px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d0e15]/95 backdrop-blur-xl border-b border-rose-500/20 px-4 pt-4 pb-6 mt-3 space-y-3 transition-all animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 pb-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-pink-500/15 hover:text-pink-400 transition"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full btn-glam py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation</span>
              </button>

              <a
                href={SALON_CONTACT.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-sm font-medium flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp (+234 809 529 4480)</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
