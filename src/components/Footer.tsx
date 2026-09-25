import React from 'react';
import { Heart, Sparkles, MapPin, Phone, Mail, Instagram, MessageCircle } from 'lucide-react';
import { SALON_CONTACT } from '../data/salonData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07080b] border-t border-rose-500/20 pt-16 pb-12 relative overflow-hidden text-gray-400 text-sm">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-40 bg-pink-600/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="LoveDeGlam Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-pink-500/40"
              />
              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-wide">
                  LoveDeGlam
                </h3>
                <p className="text-xs text-pink-300 font-medium tracking-wider">
                  Luxury · Confidence · Transformation
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Glam that tells your story. Port Harcourt's destination for luxury bridal makeup,
              scalp-melted frontals, silk infusion revamping, and masterclasses.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-1 text-amber-400">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <span>2,300+ Delighted Clients</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-pink-400 transition">
                  Signature Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-pink-400 transition">
                  Transformation Gallery
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-pink-400 transition">
                  Price Estimator
                </a>
              </li>
              <li>
                <a href="#academy" className="hover:text-pink-400 transition">
                  LoveDeGlam Academy
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-pink-400 transition">
                  Video Reels
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-pink-400 transition">
                  Client Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Specialties
            </h4>
            <ul className="space-y-2 text-xs">
              <li>Bridal Traditional & White Wedding</li>
              <li>HD Glueless Frontal Installation</li>
              <li>Silk Infusion & Curl Revival</li>
              <li>360 & Closure Customization</li>
              <li>Photoshoot & Red Carpet Artistry</li>
              <li>Masterclass Certificate Training</li>
            </ul>
          </div>

          {/* Studio Visit */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Studio Location
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  No 11 Ebony Road, Oroazi, Port Harcourt, Rivers State, Nigeria
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-400 shrink-0" />
                <a href={`tel:${SALON_CONTACT.primaryPhone}`} className="hover:text-pink-400">
                  {SALON_CONTACT.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-400 shrink-0" />
                <a href={`mailto:${SALON_CONTACT.email}`} className="hover:text-pink-400">
                  {SALON_CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span>© {currentYear} LoveDeGlam Beauty Studio. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <span>Port Harcourt, Nigeria</span>
            <span>•</span>
            <span className="text-pink-400/80">Handcrafted with luxury care</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
