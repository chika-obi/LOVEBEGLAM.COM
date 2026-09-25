import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, MessageCircle, Youtube, Facebook, Instagram, Share2 } from 'lucide-react';
import { SALON_CONTACT } from '../data/salonData';

export const FloatingControls: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSocialExpanded, setIsSocialExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    {
      name: 'WhatsApp',
      href: SALON_CONTACT.socials.whatsapp,
      icon: <MessageCircle className="w-5 h-5 text-white" />,
      bg: 'bg-[#25D366] hover:bg-[#20ba5a]',
      color: '#25D366',
    },
    {
      name: 'Instagram',
      href: SALON_CONTACT.socials.instagram,
      icon: <Instagram className="w-5 h-5 text-white" />,
      bg: 'bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af]',
      color: '#dd2a7b',
    },
    {
      name: 'TikTok',
      href: SALON_CONTACT.socials.tiktok,
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.14z" />
        </svg>
      ),
      bg: 'bg-black hover:bg-gray-900 border border-white/20',
      color: '#000000',
    },
    {
      name: 'YouTube',
      href: SALON_CONTACT.socials.youtube,
      icon: <Youtube className="w-5 h-5 text-white" />,
      bg: 'bg-[#FF0000] hover:bg-[#d60000]',
      color: '#FF0000',
    },
    {
      name: 'Facebook',
      href: SALON_CONTACT.socials.facebook,
      icon: <Facebook className="w-5 h-5 text-white" />,
      bg: 'bg-[#1877F2] hover:bg-[#166fe5]',
      color: '#1877F2',
    },
    {
      name: 'Email',
      href: SALON_CONTACT.socials.email,
      icon: <Mail className="w-5 h-5 text-white" />,
      bg: 'bg-[#D44638] hover:bg-[#c0392b]',
      color: '#D44638',
    },
  ];

  return (
    <>
      {/* Desktop Floating Right Social Dock */}
      <div className="fixed right-5 bottom-24 z-40 hidden lg:flex flex-col gap-3">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
            className={`w-11 h-11 rounded-full ${social.bg} flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-115 hover:-translate-x-1 cursor-pointer`}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Mobile Floating Social Trigger / Dock */}
      <div className="fixed left-4 bottom-5 z-40 lg:hidden flex items-center gap-2">
        <a
          href={SALON_CONTACT.socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl animate-bounce"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {isSocialExpanded && (
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 animate-fadeIn">
            {socials.slice(1, 5).map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full ${social.bg} flex items-center justify-center`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        )}

        <button
          onClick={() => setIsSocialExpanded(!isSocialExpanded)}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs"
          title="Toggle socials"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-5 bottom-6 z-40 w-12 h-12 rounded-full btn-glam flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-white stroke-[2.5]" />
        </button>
      )}
    </>
  );
};
