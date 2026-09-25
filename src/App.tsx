import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'makeup' | 'frontal' | 'revamp'>('all');
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; category: string } | null>(null);

  // Dark Mode Theme State (default: light, saved in localStorage if user toggles)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lovedeglam_theme');
      return saved === 'dark';
    }
    return false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('lovedeglam_theme', next ? 'dark' : 'light');
      }
      return next;
    });
  };

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Makeup Session',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Domain Expiration Notice State & Countdown
  // Active every year from September 17 to October 17 (or Oct 27)
  const [domainNotice, setDomainNotice] = useState<{
    isActive: boolean;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expiryDateFormatted: string;
  } | null>(null);
  const [isDomainBannerDismissed, setIsDomainBannerDismissed] = useState(false);
  const [isWebsiteSuspended, setIsWebsiteSuspended] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Check for secret owner administrative bypass: ?owner_key=renew_unlock or ?admin=unlock
      const urlParams = new URLSearchParams(window.location.search);
      const hasBypass =
        urlParams.get('owner_key') === 'renew_unlock' ||
        urlParams.get('admin') === 'unlock' ||
        sessionStorage.getItem('lovedeglam_admin_bypass') === 'true';

      if (urlParams.get('owner_key') === 'renew_unlock' || urlParams.get('admin') === 'unlock') {
        sessionStorage.setItem('lovedeglam_admin_bypass', 'true');
      }

      // Check if testing preview suspension: ?simulate=expired
      const simulateExpired = urlParams.get('simulate') === 'expired';

      // Start date: Sept 17 of current year (Month index 8)
      // Expiry date: Oct 17 23:59:59 (Month index 9)
      const currentExpiry = new Date(currentYear, 9, 17, 23, 59, 59);
      const currentStart = new Date(currentYear, 8, 17, 0, 0, 0);

      // Check suspension condition:
      // Suspended if current time has passed Oct 17 23:59:59 during the renewal month or if simulated
      // and user is not an authorized administrator with the bypass key
      const hasExpiredThisPeriod =
        simulateExpired ||
        (now >= currentExpiry && now.getMonth() === 9 && now.getDate() >= 18);

      if (hasExpiredThisPeriod && !hasBypass) {
        setIsWebsiteSuspended(true);
        setDomainNotice(null);
        return;
      }

      setIsWebsiteSuspended(false);

      // Calculate countdown target:
      let targetExpiry = currentExpiry;
      let startDate = currentStart;

      // If current date has passed October 17, next cycle is next year
      if (now > currentExpiry) {
        targetExpiry = new Date(currentYear + 1, 9, 17, 23, 59, 59);
        startDate = new Date(currentYear + 1, 8, 17, 0, 0, 0);
      }

      // Check if current date falls within active warning window (Sept 17 to Oct 17)
      if (now >= startDate && now <= targetExpiry) {
        const diffMs = targetExpiry.getTime() - now.getTime();
        const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setDomainNotice({
          isActive: true,
          days,
          hours,
          minutes,
          seconds,
          expiryDateFormatted: targetExpiry.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
        });
      } else {
        setDomainNotice(null);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Gallery items with categories matching salon work
  const allGalleryItems = [
    { src: '/image1.jpg', alt: 'Bridal Royalty Glam', title: 'Bridal Royalty Glam', category: 'makeup' },
    { src: '/image2.jpg', alt: 'Flawless Melted Frontal', title: 'Flawless Melted Frontal', category: 'frontal' },
    { src: '/image3.jpg', alt: 'Signature Silk Infusion Revamp', title: 'Signature Silk Infusion Revamp', category: 'revamp' },
    { src: '/image4.jpg', alt: 'Dewy Soft Glam Makeup', title: 'Dewy Soft Glam Makeup', category: 'makeup' },
    { src: '/image5.jpg', alt: '360 Frontal & Curl Sculpting', title: '360 Frontal & Curl Sculpting', category: 'frontal' },
    { src: '/image6.jpg', alt: 'Custom Wig Making & Revamp', title: 'Custom Wig Making & Revamp', category: 'revamp' },
  ];

  const filteredGallery =
    galleryFilter === 'all'
      ? allGalleryItems
      : allGalleryItems.filter((item) => item.category === galleryFilter);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas glitter particles effect (exact formula)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const particles: Array<{ x: number; y: number; r: number; a: number; vy: number }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: rand(0, W),
        y: rand(0, H),
        r: rand(0.6, 2.6),
        a: rand(0.1, 0.9),
        vy: rand(0.1, 0.6),
      });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath();
        ctx.globalAlpha = p.a * 0.9;
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.vy;
        p.x += Math.sin(p.y * 0.01 + p.r);
        if (p.y < -10) {
          p.y = H + 10;
          p.x = rand(0, W);
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Automatic slideshow interval (4 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % filteredGallery.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [filteredGallery.length]);

  // Scroll to top button visibility check
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const scrollToSection = (id: string) => {
    setNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // WhatsApp formatted direct link
  const getWhatsAppBookingLink = (service?: string) => {
    const chosenService = service || contactForm.service;
    const text = `Hello LoveDeGlam! I would like to book a session:%0A%0A` +
      `• *Client Name:* ${contactForm.name || 'Valued Queen'}%0A` +
      `• *Phone:* ${contactForm.phone || 'Provided upon request'}%0A` +
      `• *Service:* ${chosenService}%0A` +
      (contactForm.message ? `• *Notes:* ${encodeURIComponent(contactForm.message)}%0A` : '') +
      `%0APlease let me know your available slots!`;
    return `https://wa.me/2348095294480?text=${text}`;
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  // =========================================================================
  // Professional Service Suspension Lockdown Screen (When timing runs out)
  // =========================================================================
  if (isWebsiteSuspended) {
    return (
      <div className="fixed inset-0 z-[99999] bg-[#0c0d12] text-white flex flex-col justify-between overflow-y-auto selection:bg-[#ff4d9e] selection:text-white">
        {/* Top Header Bar */}
        <header className="w-full border-b border-white/10 bg-black/40 backdrop-blur-md py-4 px-6">
          <div className="max-w-[1100px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="LoveDeGlam Logo"
                className="w-10 h-10 rounded-full object-cover border border-white/30"
              />
              <span className="font-playfair text-xl font-bold tracking-wide text-white">
                LoveDeGlam
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs uppercase tracking-wider font-semibold text-red-400">
                Service Suspended
              </span>
            </div>
          </div>
        </header>

        {/* Center Suspension Notice Card */}
        <main className="flex-1 flex items-center justify-center p-6 sm:p-10 my-auto">
          <div className="max-w-[720px] w-full bg-[#161822] rounded-3xl border border-red-500/30 p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Warning Lock Icon / Graphic */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center text-4xl mx-auto shadow-lg shadow-red-500/30 mb-6">
              🔒
            </div>

            <span className="text-xs uppercase tracking-widest font-bold text-red-400 bg-red-950/60 border border-red-800/60 px-3.5 py-1.5 rounded-full inline-block mb-4">
              Annual Domain Renewal Notice
            </span>

            <h1 className="font-playfair text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Website Temporarily Inactive
            </h1>

            <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed max-w-[560px] mx-auto mb-6">
              The domain registration and hosting services for{' '}
              <strong className="text-white underline decoration-red-400 underline-offset-4">
                www.lovedeglam.com
              </strong>{' '}
              have completed their active cycle (October 17). Access to the digital studio platform is
              temporarily offline pending administrative renewal.
            </p>

            {/* Info Box */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-5 mb-8 text-left text-xs sm:text-sm text-gray-300 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-gray-400">Domain Name:</span>
                <span className="font-mono text-white font-semibold">www.lovedeglam.com</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-gray-400">Scheduled Expiry:</span>
                <span className="font-mono text-amber-300">October 17 (Annual Cycle)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Current Status:</span>
                <span className="font-mono text-red-400 font-semibold">Awaiting Renewal Confirmation</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* WhatsApp direct to owner/studio */}
              <a
                href="https://wa.me/2348095294480?text=Hello%20LoveDeGlam!%20I%20am%20inquiring%20about%20the%20website%20domain%20renewal%20and%20session%20bookings."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <i className="fa-brands fa-whatsapp text-lg"></i>
                <span>Contact Studio on WhatsApp</span>
              </a>

              {/* Refresh / Check Status Button */}
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/20 transition cursor-pointer"
              >
                <span>🔄 Check Renewal Status</span>
              </button>
            </div>

            {/* Note for Owner */}
            <p className="text-[11px] text-gray-500 mt-6 mb-0">
              Are you the site owner or administrator? Complete your payment via your domain registrar or use your authorized bypass key to access the backend.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-white/10 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} LoveDeGlam. All rights reserved. Handcrafted in Port Harcourt, Nigeria.
        </footer>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-x-hidden selection:bg-[#ff4d9e] selection:text-white transition-colors duration-500 ${
        isDarkMode ? 'bg-[#0b0c10] text-[#f3f4f6]' : 'bg-white text-[#0f0f10]'
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. Responsive Navigation Bar */}
      {/* ========================================================================= */}
      <nav
        className={`fixed top-0 left-0 w-full backdrop-blur-[6px] z-[1000] py-3.5 transition-colors duration-300 border-b ${
          isDarkMode
            ? 'bg-black/80 border-white/10'
            : 'bg-black/55 border-white/10'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="flex items-center gap-3 group text-white hover:text-[#ff7ab6] transition-colors"
          >
            <img
              src="/logo.jpg"
              alt="LoveDeGlam logo"
              className="w-9 h-9 rounded-full object-cover border border-white/30 shadow-md group-hover:scale-105 transition-transform"
            />
            <span className="font-playfair text-[20px] sm:text-[23px] font-bold tracking-normal">
              LoveDeGlam
            </span>
          </a>

          {/* Hamburger Button for Mobile */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1 z-50 focus:outline-none"
            aria-label="Toggle navigation"
          >
            <span
              className={`w-[26px] h-[3px] bg-white rounded-full transition-transform duration-300 ${
                navOpen ? 'rotate-45 translate-y-[8px]' : ''
              }`}
            ></span>
            <span
              className={`w-[26px] h-[3px] bg-white rounded-full transition-opacity duration-300 ${
                navOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-[26px] h-[3px] bg-white rounded-full transition-transform duration-300 ${
                navOpen ? '-rotate-45 -translate-y-[8px]' : ''
              }`}
            ></span>
          </button>

          {/* Nav Links */}
          <ul
            className={`list-none flex items-center gap-7 m-0 p-0 transition-all duration-300 ${
              navOpen
                ? 'flex flex-col items-center gap-5 py-6 absolute top-[56px] left-0 w-full bg-black/95 shadow-2xl md:static md:flex-row md:w-auto md:bg-transparent md:p-0'
                : 'hidden md:flex'
            }`}
          >
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                  setNavOpen(false);
                }}
                className="text-white font-medium text-[15px] hover:text-[#ff7ab6] transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('services');
                }}
                className="text-white font-medium text-[15px] hover:text-[#ff7ab6] transition-colors"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('gallery');
                }}
                className="text-white font-medium text-[15px] hover:text-[#ff7ab6] transition-colors"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#videos"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('videos');
                }}
                className="text-white font-medium text-[15px] hover:text-[#ff7ab6] transition-colors"
              >
                Videos
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('testimonials');
                }}
                className="text-white font-medium text-[15px] hover:text-[#ff7ab6] transition-colors"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('faq');
                }}
                className="text-white font-medium text-[15px] hover:text-[#ff7ab6] transition-colors"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="text-white font-medium text-[15px] hover:text-[#ff7ab6] transition-colors"
              >
                Contact
              </a>
            </li>

            {/* Subtle, Minimalist Switch Toggle (Placed right after Contact) */}
            <li className="flex items-center">
              <button
                type="button"
                role="switch"
                aria-checked={isDarkMode}
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-white/20 transition-colors duration-300 ease-in-out focus:outline-none ${
                  isDarkMode ? 'bg-pink-900/60' : 'bg-white/15 hover:bg-white/25'
                }`}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label="Toggle dark mode"
              >
                <span
                  className={`pointer-events-none flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-md transition duration-300 ease-in-out text-[11px] ${
                    isDarkMode
                      ? 'translate-x-5 bg-gradient-to-tr from-pink-500 to-rose-400 text-white'
                      : 'translate-x-0.5 text-amber-500'
                  }`}
                >
                  {isDarkMode ? '🌙' : '☀️'}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Glitter Particle Canvas */}
      <canvas
        ref={canvasRef}
        id="glitter"
        className="absolute inset-0 z-[1] pointer-events-none w-full h-full"
      />

      {/* ========================================================================= */}
      {/* 2. Hero Section (With Background Image, Glass Card & SVG Wave) */}
      {/* ========================================================================= */}
      <header className="hero">
        {/* Hero Left Content */}
        <div className="hero-inner wrap">
          {/* Logo Card */}
          <div className="logo card">
            <img src="/logo.jpg" alt="LoveDeGlam logo" />
            <div>
              <h1>LoveDeGlam</h1>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>
                Luxury · Confidence · Transformation
              </div>
            </div>
          </div>

          <h2 className="lead fade-up">Glam that tells your story.</h2>

          <p className="lead-desc fade-up">
            Professional makeup, premium frontal installation and bespoke hair revamping —
            handcrafted by experienced stylists. Book a consultation, get a trial, and step out
            glowing.
          </p>

          <div className="actions fade-up">
            <button
              onClick={() => scrollToSection('contact')}
              className="btn primary"
              id="bookNow"
            >
              Book a Consultation
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="btn ghost"
              id="viewMore"
            >
              Our Services
            </button>
          </div>

          <div style={{ height: '24px' }}></div>

          <div
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '13px',
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div>⭐ 4.9 (2.3k reviews)</div>
            <div>•</div>
            <div>Professional stylists</div>
            <div>•</div>
            <div>Premium products</div>
          </div>
        </div>

        {/* Hero Right Showcase Card */}
        <div className="showcase wrap">
          <div className="card fade-up">
            <div className="showcase-inner">
              <div className="hero-img">
                <img src="/background.jpg" alt="LoveDeGlam showcase" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative SVG Wave */}
        <svg
          className="waves"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--pink-1)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--pink-2)" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <path
            d="M0,120 C200,180 400,40 600,80 C800,120 1000,20 1200,80 L1200,200 L0,200 Z"
            fill="url(#g1)"
          ></path>
        </svg>
      </header>

      {/* ========================================================================= */}
      {/* 3. Main Content Area (Clean natural layout flow, no negative CSS gaps) */}
      {/* ========================================================================= */}
      <main className="relative z-10">
        {/* ======================================================================= */}
        {/* Services Section */}
        {/* ======================================================================= */}
        <section
          id="services"
          className="text-center py-16 sm:py-20"
          style={{
            background: 'linear-gradient(180deg, #ff4d9e 0%, #ff2e84 100%)',
          }}
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <h2 className="mt-0 font-playfair text-[32px] sm:text-[38px] font-bold text-white mb-2">
              Our Signature Services
            </h2>
            <p className="text-white/90 text-sm max-w-xl mx-auto mb-10">
              High-definition bridal artistry, melted frontals, and revitalizing wig treatments
              designed to bring out your inner queen.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
              {/* Card 1: Makeup Artistry & Frontal Installation */}
              <article
                className={`p-7 rounded-[18px] text-left transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-[#14161f]/95 text-gray-200 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-pink-500/40'
                    : 'bg-white/95 text-gray-800 shadow-[0_10px_25px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]'
                }`}
              >
                <div>
                  <h3
                    className={`m-0 mb-2 text-[20px] font-bold group-hover:text-[#ff2e84] transition-colors ${
                      isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                    }`}
                  >
                    All Kinds (Makeup Artistry)
                  </h3>
                  <p
                    className={`text-[14px] leading-relaxed mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-[#444]'
                    }`}
                  >
                    Bridal, editorial, photoshoots, and everyday glam. We use premium, skin-safe
                    brands and tailor looks to your skin tone and style.
                  </p>
                  <h3
                    className={`m-0 mb-2 text-[20px] font-bold group-hover:text-[#ff2e84] transition-colors pt-2 border-t ${
                      isDarkMode ? 'border-white/10 text-white' : 'border-gray-100 text-[#0f0f10]'
                    }`}
                  >
                    Frontal Installation
                  </h3>
                  <p
                    className={`text-[14px] leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-[#444]'
                    }`}
                  >
                    Seamless frontal installs with natural hairlines. Custom lace bleaching, plucking,
                    color-matching, and maintenance guidance included.
                  </p>
                </div>
                <div
                  className={`pt-4 mt-4 border-t flex items-center justify-between ${
                    isDarkMode ? 'border-white/10' : 'border-gray-100'
                  }`}
                >
                  <span className="text-xs text-[#ff2e84] font-bold uppercase tracking-wider">
                    From ₦30,000
                  </span>
                  <a
                    href={getWhatsAppBookingLink('Makeup & Frontal Install')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-semibold group-hover:text-[#ff2e84] transition-colors ${
                      isDarkMode ? 'text-white' : 'text-[#111827]'
                    }`}
                  >
                    Book Now →
                  </a>
                </div>
              </article>

              {/* Card 2: Hair Revamping */}
              <article
                className={`p-7 rounded-[18px] text-left transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-[#14161f]/95 text-gray-200 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-pink-500/40'
                    : 'bg-white/95 text-gray-800 shadow-[0_10px_25px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]'
                }`}
              >
                <div>
                  <h3
                    className={`m-0 mb-2 text-[20px] font-bold group-hover:text-[#ff2e84] transition-colors ${
                      isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                    }`}
                  >
                    Hair Revamping
                  </h3>
                  <ul
                    className={`list-disc pl-5 mb-4 text-[14px] space-y-1.5 leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-[#333]'
                    }`}
                  >
                    <li>Custom wig making</li>
                    <li>Premium revamping</li>
                    <li>Premium silk infusion service</li>
                    <li>Curl definition & bounce</li>
                    <li>Precision wig styling</li>
                  </ul>
                  <p
                    className={`text-[14px] leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-[#444]'
                    }`}
                  >
                    Glueless customization, cutting-edge restyles, extensions revival, color refresh,
                    and deep restorative treatments.
                  </p>
                </div>
                <div
                  className={`pt-4 mt-4 border-t flex items-center justify-between ${
                    isDarkMode ? 'border-white/10' : 'border-gray-100'
                  }`}
                >
                  <span className="text-xs text-[#ff2e84] font-bold uppercase tracking-wider">
                    From ₦25,000
                  </span>
                  <a
                    href={getWhatsAppBookingLink('Hair Revamping')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-semibold group-hover:text-[#ff2e84] transition-colors ${
                      isDarkMode ? 'text-white' : 'text-[#111827]'
                    }`}
                  >
                    Revamp Hair →
                  </a>
                </div>
              </article>

              {/* Card 3: Training (Hair-Installation) */}
              <article
                className={`p-7 rounded-[18px] text-left transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-[#14161f]/95 text-gray-200 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-pink-500/40'
                    : 'bg-white/95 text-gray-800 shadow-[0_10px_25px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]'
                }`}
              >
                <div>
                  <h3
                    className={`m-0 mb-2 text-[20px] font-bold group-hover:text-[#ff2e84] transition-colors ${
                      isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                    }`}
                  >
                    Training <br />(Hair-Installation)
                  </h3>
                  <ul
                    className={`list-disc pl-5 text-[14px] space-y-1.5 leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-[#333]'
                    }`}
                  >
                    <li>Glued &amp; Glueless Frontal Wig Installation</li>
                    <li>Frontal Ponytails &amp; Sew-ins</li>
                    <li>5x5, 6x6, 7x6 Closures</li>
                    <li>360 &amp; Double Frontal Wigs</li>
                    <li>Natural &amp; Relaxed Hair Ponytails</li>
                    <li>Braided Frontal Wigs</li>
                    <li>Premium Wig Revamping &amp; Styling</li>
                  </ul>
                </div>
                <div
                  className={`pt-4 mt-4 border-t flex items-center justify-between ${
                    isDarkMode ? 'border-white/10' : 'border-gray-100'
                  }`}
                >
                  <span className="text-xs text-[#ff2e84] font-bold uppercase tracking-wider">
                    Certified Academy
                  </span>
                  <a
                    href={getWhatsAppBookingLink('Hair Installation Masterclass')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-semibold group-hover:text-[#ff2e84] transition-colors ${
                      isDarkMode ? 'text-white' : 'text-[#111827]'
                    }`}
                  >
                    Enroll →
                  </a>
                </div>
              </article>

              {/* Card 4: Training (Makeup) */}
              <article
                className={`p-7 rounded-[18px] text-left transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-[#14161f]/95 text-gray-200 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-pink-500/40'
                    : 'bg-white/95 text-gray-800 shadow-[0_10px_25px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]'
                }`}
              >
                <div>
                  <h3
                    className={`m-0 mb-2 text-[20px] font-bold group-hover:text-[#ff2e84] transition-colors ${
                      isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                    }`}
                  >
                    Training <br />(Makeup)
                  </h3>
                  <ul
                    className={`list-disc pl-5 text-[14px] space-y-1.5 leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-[#333]'
                    }`}
                  >
                    <li>Flawless long wear bridal makeup</li>
                    <li>Eyeshadow switching (Simple to Bold)</li>
                    <li>Skin prep for diverse skin types</li>
                    <li>Product awareness &amp; recommendations</li>
                    <li>Phone photo &amp; video editing</li>
                    <li>Studio lighting setup</li>
                    <li>Deep discussions on the beauty business</li>
                  </ul>
                </div>
                <div
                  className={`pt-4 mt-4 border-t flex items-center justify-between ${
                    isDarkMode ? 'border-white/10' : 'border-gray-100'
                  }`}
                >
                  <span className="text-xs text-[#ff2e84] font-bold uppercase tracking-wider">
                    Hands-on Practice
                  </span>
                  <a
                    href={getWhatsAppBookingLink('Makeup Artistry Masterclass')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-semibold group-hover:text-[#ff2e84] transition-colors ${
                      isDarkMode ? 'text-white' : 'text-[#111827]'
                    }`}
                  >
                    Enroll →
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* Gallery Section with Category Filters and Modal Zoom */}
        {/* ======================================================================= */}
        <section
          id="gallery"
          aria-label="Gallery"
          className={`py-16 sm:py-20 px-5 text-center transition-colors duration-500 ${
            isDarkMode ? 'bg-[#0f1118]' : 'bg-[#fcf8fa]'
          }`}
        >
          <div className="max-w-[1200px] mx-auto">
            <h2
              className={`font-playfair text-[34px] font-bold mb-3 ${
                isDarkMode ? 'text-white' : 'text-[#0f0f10]'
              }`}
            >
              Transformation Gallery
            </h2>
            <p
              className={`text-sm max-w-lg mx-auto mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-[#666]'
              }`}
            >
              Browse real client transformations crafted at LoveDeGlam Studio, Port Harcourt.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {[
                { label: 'All Looks', value: 'all' },
                { label: 'Makeup Artistry', value: 'makeup' },
                { label: 'Frontal Installs', value: 'frontal' },
                { label: 'Hair Revamping', value: 'revamp' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setGalleryFilter(tab.value as any);
                    setSlideIndex(0);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    galleryFilter === tab.value
                      ? 'bg-[#ff2e84] text-white shadow-md'
                      : isDarkMode
                      ? 'bg-[#1a1d28] text-gray-300 hover:bg-[#252938] border border-white/10'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Slider Container */}
            <div className="relative max-w-[1000px] mx-auto overflow-hidden rounded-[14px] shadow-2xl bg-black border border-white/10">
              {/* Prev Button */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-[12px] top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white border-none text-[28px] w-11 h-11 flex items-center justify-center cursor-pointer rounded-full z-20 transition-colors"
                aria-label="Previous slide"
              >
                &#10094;
              </button>

              {/* Slides Track */}
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}
              >
                {filteredGallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className="w-full max-w-[1000px] h-[360px] sm:h-[460px] relative shrink-0 cursor-pointer group"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-6">
                      <div className="text-left">
                        <span className="px-2.5 py-1 rounded-md bg-[#ff2e84] text-white text-[11px] font-bold uppercase tracking-wider">
                          {img.category}
                        </span>
                        <h4 className="text-white font-playfair font-bold text-lg sm:text-xl mt-1">
                          {img.title}
                        </h4>
                      </div>
                      <span className="text-xs text-white/90 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
                        Click to view full size 🔍
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextSlide}
                className="absolute right-[12px] top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white border-none text-[28px] w-11 h-11 flex items-center justify-center cursor-pointer rounded-full z-20 transition-colors"
                aria-label="Next slide"
              >
                &#10095;
              </button>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* Video Section (With Real Previews & Direct Channel Links) */}
        {/* ======================================================================= */}
        <section
          id="videos"
          className={`py-16 sm:py-20 transition-colors duration-500 ${
            isDarkMode ? 'bg-[#0b0c10]' : 'bg-white'
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <div className="text-center mb-10">
              <h2
                className={`font-playfair text-[32px] sm:text-[36px] mb-2 font-bold ${
                  isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                }`}
              >
                See Our Work In Action
              </h2>
              <p
                className={`text-[15px] max-w-md mx-auto ${
                  isDarkMode ? 'text-gray-400' : 'text-[#666]'
                }`}
              >
                Watch recent client transformations, frontal melting sessions, and wig revamping.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[25px]">
              {/* Video Card 1 */}
              <div
                className={`rounded-[16px] overflow-hidden flex flex-col transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-[#14161f] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-black border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
                }`}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src="/image1.jpg"
                    alt="Bridal Glow Session"
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                    <a
                      href="https://youtube.com/@lovedeglam?si=Tva3S1B6eR4VljjR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-[#ff2e84] text-white flex items-center justify-center text-xl shadow-xl hover:scale-110 transition-transform"
                    >
                      ▶
                    </a>
                  </div>
                </div>
                <div
                  className={`p-4 flex-1 flex flex-col justify-between ${
                    isDarkMode ? 'bg-[#14161f] text-gray-200' : 'bg-white text-[#0f0f10]'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#ff2e84] uppercase tracking-wider">
                      Bridal Artistry
                    </span>
                    <h4
                      className={`font-bold text-sm mt-1 ${
                        isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                      }`}
                    >
                      Full Bridal Glam &amp; Skin Prep Routine
                    </h4>
                  </div>
                  <a
                    href="https://youtube.com/@lovedeglam?si=Tva3S1B6eR4VljjR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#ff2e84] mt-3 inline-block hover:underline"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              </div>

              {/* Video Card 2 */}
              <div
                className={`rounded-[16px] overflow-hidden flex flex-col transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-[#14161f] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-black border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
                }`}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src="/image2.jpg"
                    alt="Frontal Melting Masterclass"
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                    <a
                      href="https://www.tiktok.com/@love.de.glam?_t=ZS-90MDaXhYsc5&_r=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl shadow-xl hover:scale-110 transition-transform border border-white/30"
                    >
                      ▶
                    </a>
                  </div>
                </div>
                <div
                  className={`p-4 flex-1 flex flex-col justify-between ${
                    isDarkMode ? 'bg-[#14161f] text-gray-200' : 'bg-white text-[#0f0f10]'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#ff2e84] uppercase tracking-wider">
                      Frontal Install
                    </span>
                    <h4
                      className={`font-bold text-sm mt-1 ${
                        isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                      }`}
                    >
                      Melted Glueless Frontal Installation
                    </h4>
                  </div>
                  <a
                    href="https://www.tiktok.com/@love.de.glam?_t=ZS-90MDaXhYsc5&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-semibold mt-3 inline-block hover:underline ${
                      isDarkMode ? 'text-pink-400' : 'text-[#0f0f10]'
                    }`}
                  >
                    Watch on TikTok →
                  </a>
                </div>
              </div>

              {/* Video Card 3 */}
              <div
                className={`rounded-[16px] overflow-hidden flex flex-col transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-[#14161f] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-black border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
                }`}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src="/image3.jpg"
                    alt="Silk Infusion Revamping"
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                    <a
                      href="https://youtube.com/@lovedeglam?si=Tva3S1B6eR4VljjR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-[#ff2e84] text-white flex items-center justify-center text-xl shadow-xl hover:scale-110 transition-transform"
                    >
                      ▶
                    </a>
                  </div>
                </div>
                <div
                  className={`p-4 flex-1 flex flex-col justify-between ${
                    isDarkMode ? 'bg-[#14161f] text-gray-200' : 'bg-white text-[#0f0f10]'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#ff2e84] uppercase tracking-wider">
                      Hair Revamping
                    </span>
                    <h4
                      className={`font-bold text-sm mt-1 ${
                        isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                      }`}
                    >
                      Silk Infusion &amp; 3-Year Old Bundle Revival
                    </h4>
                  </div>
                  <a
                    href="https://youtube.com/@lovedeglam?si=Tva3S1B6eR4VljjR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#ff2e84] mt-3 inline-block hover:underline"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* Testimonials Section (Interactive 3D Motion Cards, Real Photos & Filter) */}
        {/* ======================================================================= */}
        <section
          id="testimonials"
          className={`text-center py-16 sm:py-24 transition-colors duration-500 relative overflow-hidden ${
            isDarkMode ? 'bg-[#0f1118]' : 'bg-[#faf5f8]'
          }`}
        >
          {/* Subtle Ambient Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase font-bold tracking-widest text-[#ff2e84] bg-pink-500/10 border border-pink-500/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Client Love & Reviews
              </span>
              <h2
                className={`font-playfair text-[32px] sm:text-[40px] font-bold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                }`}
              >
                What Queens Say About Us
              </h2>
              <p
                className={`text-sm sm:text-[15px] max-w-xl mx-auto mb-10 leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-[#666]'
                }`}
              >
                From royalty-level bridal glam and seamless frontal melting to revitalized silk bundles — read verified feedback from our Port Harcourt studio.
              </p>
            </motion.div>

            {/* Testimonials 3D Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 text-left">
              {[
                {
                  name: 'Amaka Okonkwo',
                  role: 'Verified Bride',
                  location: 'GRA Phase 2, Port Harcourt',
                  rating: 5,
                  image: '/image1.jpg',
                  tag: 'Bridal Artistry',
                  comment:
                    'LoveDeGlam made my traditional and white wedding look completely effortless! The HD makeup stayed fresh for over 14 hours despite the dancing, humidity, and tears. Every photo turned out magazine-ready.',
                },
                {
                  name: 'Jade Nwachukwu',
                  role: 'Fashion Model & Creator',
                  location: 'Old GRA, Port Harcourt',
                  rating: 5,
                  image: '/image2.jpg',
                  tag: 'Frontal Install',
                  comment:
                    'The frontal install was pure sorcery. The lace was undetectable even in direct 4K video lighting. Bleaching, custom plucking, and hairline detailing were flawless. She gave me expert aftercare tips too!',
                },
                {
                  name: 'Sarah Tammy-Briggs',
                  role: 'Corporate Executive',
                  location: 'Peter Odili Road',
                  rating: 5,
                  image: '/image3.jpg',
                  tag: 'Hair Revamping',
                  comment:
                    'I sent in two wigs that were dry and tangled for 3 years. The silk infusion revival service gave them back the body, gloss, and bounce of brand-new luxury bundles. Her turnaround was fast and professional.',
                },
                {
                  name: 'Chisom Victoria',
                  role: 'Birthday Glam Queen',
                  location: 'Woji, Port Harcourt',
                  rating: 5,
                  image: '/image6.jpg',
                  tag: 'Soft Glam Makeup',
                  comment:
                    'Booked a birthday shoot session. The skin prep routine was so relaxing and luxurious, and the eyeshadow switch was perfection. I have never felt more confident. My WhatsApp status was on fire all day!',
                },
                {
                  name: 'Dr. Eberechukwu A.',
                  role: 'Medical Consultant',
                  location: 'Rumuola, Port Harcourt',
                  rating: 5,
                  image: '/image8.jpg',
                  tag: 'Glueless Frontal',
                  comment:
                    'As a busy professional, I needed a glueless frontal that looks realistic and is easy to wear without messing with glue. LoveDeGlam built the perfect custom band unit. It snaps on effortlessly every morning.',
                },
                {
                  name: 'Khadijah Bello',
                  role: 'Academy Masterclass Graduate',
                  location: 'Abuja & Port Harcourt',
                  rating: 5,
                  image: '/image10.jpg',
                  tag: 'Masterclass Student',
                  comment:
                    'Taking the Hair-Installation & Revamping masterclass was the best career investment of my year. Hands-on practice, personalized coaching, business guidance, and certified diploma. Already booking my own clients!',
                },
              ].map((testimony, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{
                    y: -8,
                    rotateX: 4,
                    rotateY: -2,
                    transition: { duration: 0.3 },
                  }}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                  className={`relative p-7 rounded-[22px] flex flex-col justify-between transition-all duration-300 border ${
                    isDarkMode
                      ? 'bg-gradient-to-b from-[#171a25] to-[#12141d] border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.65)] hover:border-pink-500/50 hover:shadow-[0_15px_40px_rgba(255,77,158,0.2)]'
                      : 'bg-white/95 border-rose-100 shadow-[0_10px_30px_rgba(255,77,158,0.08)] hover:border-[#ff4d9e]/40 hover:shadow-[0_20px_45px_rgba(255,77,158,0.18)] backdrop-blur-sm'
                  }`}
                >
                  {/* Decorative Quote Mark */}
                  <div
                    className={`absolute top-5 right-6 text-4xl font-serif select-none pointer-events-none ${
                      isDarkMode ? 'text-white/5' : 'text-pink-100'
                    }`}
                  >
                    “
                  </div>

                  <div>
                    {/* Header: Stars & Tag */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1 text-amber-400 text-sm">
                        {'★'.repeat(testimony.rating)}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff2e84] bg-pink-500/10 border border-pink-500/20 px-2.5 py-0.5 rounded-full">
                        {testimony.tag}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <p
                      className={`text-[14px] leading-relaxed italic mb-6 ${
                        isDarkMode ? 'text-gray-300' : 'text-[#444]'
                      }`}
                    >
                      "{testimony.comment}"
                    </p>
                  </div>

                  {/* Client Info with Real Photo */}
                  <div
                    className={`pt-4 border-t flex items-center gap-3.5 ${
                      isDarkMode ? 'border-white/10' : 'border-rose-100'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={testimony.image}
                        alt={testimony.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#ff2e84] shadow-md"
                      />
                      <span
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold"
                        title="Verified Client"
                      >
                        ✓
                      </span>
                    </div>

                    <div>
                      <strong
                        className={`text-[15px] font-bold block leading-snug ${
                          isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                        }`}
                      >
                        {testimony.name}
                      </strong>
                      <div className="text-xs text-[#ff2e84] font-medium leading-tight">
                        {testimony.role}
                      </div>
                      <span
                        className={`text-[11px] block mt-0.5 ${
                          isDarkMode ? 'text-gray-400' : 'text-[#777]'
                        }`}
                      >
                        📍 {testimony.location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonials Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className={`mt-12 py-4 px-6 rounded-2xl inline-flex flex-wrap items-center justify-center gap-6 text-xs border ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-gray-300'
                  : 'bg-white border-pink-200 text-gray-700 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold">
                <span className="text-amber-400 text-sm">★★★★★</span>
                <span>4.9 / 5.0 Rating</span>
              </div>
              <span className="hidden sm:inline opacity-30">•</span>
              <div>Over 2,300+ Satisfied Clients across Nigeria</div>
              <span className="hidden sm:inline opacity-30">•</span>
              <div className="text-[#ff2e84] font-semibold">100% Genuine Port Harcourt Artistry</div>
            </motion.div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* FAQ Section (Booking, Deposit Policies & Service Preparation) */}
        {/* ======================================================================= */}
        <section
          id="faq"
          className={`py-16 sm:py-24 border-y transition-colors duration-500 ${
            isDarkMode
              ? 'bg-[#0f1118] border-white/10'
              : 'bg-[#fff9fb] border-rose-100'
          }`}
        >
          <div className="max-w-[900px] mx-auto px-6 sm:px-8">
            <div className="text-center mb-12">
              <span className="text-xs uppercase font-bold tracking-widest text-[#ff2e84] bg-pink-500/10 border border-pink-500/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Got Questions?
              </span>
              <h2
                className={`font-playfair text-[32px] sm:text-[38px] font-bold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                }`}
              >
                Frequently Asked Questions
              </h2>
              <p
                className={`text-sm sm:text-[15px] max-w-lg mx-auto ${
                  isDarkMode ? 'text-gray-400' : 'text-[#666]'
                }`}
              >
                Everything you need to know about reserving your appointment, our deposit terms, and how to prepare for your glam session.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3.5">
              {[
                {
                  question: 'How do I secure an appointment with LoveDeGlam?',
                  category: 'Booking',
                  answer:
                    'Appointments can be booked directly through our website contact form or by messaging our WhatsApp concierge (+234 809 529 4480). To reserve your desired date and time slot, a non-refundable 50% commitment deposit is required upon booking confirmation.',
                },
                {
                  question: 'What is your deposit and cancellation policy?',
                  category: 'Deposit Policy',
                  answer:
                    'A 50% deposit secures your exclusive slot. Deposits are non-refundable. If you need to reschedule, please notify us at least 48 hours before your appointment time. Rescheduling within 48 hours allows you to transfer your deposit to a new date within 30 days (subject to artist availability). Same-day cancellations or no-shows forfeit the deposit.',
                },
                {
                  question: 'How should I prepare my skin before a makeup appointment?',
                  category: 'Preparation',
                  answer:
                    'Please arrive with a clean, freshly washed, and product-free face (no heavy oils or sunscreens). We strongly recommend grooming or threading your brows 24–48 hours prior. Exfoliating your lips and moisturizing your skin the night before ensures a silky, long-lasting, creaseless finish.',
                },
                {
                  question: 'What do I need to prepare before a Frontal Wig Installation?',
                  category: 'Preparation',
                  answer:
                    'For custom frontal customization (bleaching knots, plucking, and lace tinting to match your scalp), your wig or frontal must be dropped off at our Oroazi studio at least 24 to 48 hours before your installation appointment. Please come with your natural hair washed, blown-out, and free of heavy pomades for the flattest cornrow base.',
                },
                {
                  question: 'How long does a Hair Revamp take, and what is included?',
                  category: 'Hair Revamp',
                  answer:
                    'Our signature Hair Revamp includes deep detox clarifying wash, premium hydration conditioning, silk infusion hot oil treatment, closure/frontal lace cleanup, bundle tightening, and signature curl sculpting or bone-straight flat ironing. Turnaround time is usually 3 to 5 business days, with express 24-hour service available upon request.',
                },
                {
                  question: 'Do you offer home, hotel, or bridal on-location services?',
                  category: 'Location & Travel',
                  answer:
                    'Yes! While our main studio is located at No 11 Ebony Road, Oroazi, Port Harcourt, our team travels across Nigeria for bridal parties, editorials, and VIP clients. On-location travel fees vary based on the location and distance. Contact us with your venue details for a customized quote.',
                },
                {
                  question: 'How can I enroll in the Hair or Makeup Training Masterclasses?',
                  category: 'Academy & Training',
                  answer:
                    'We offer beginner-friendly and advanced 1-on-1 masterclasses with certified certificates, practical kits, photoshoot portfolio creation, and mentorship. You can reach out directly via WhatsApp to request the current curriculum, session schedules, and installment fee plans.',
                },
              ].map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className={`rounded-[16px] overflow-hidden transition-all duration-200 border ${
                      isDarkMode
                        ? 'bg-[#14161f] border-white/10 hover:border-pink-500/40 shadow-md'
                        : 'bg-white border-pink-200/80 hover:border-[#ff4d9e] shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff2e84] bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md shrink-0">
                          {faq.category}
                        </span>
                        <span
                          className={`font-semibold text-[15px] sm:text-[16px] ${
                            isDarkMode ? 'text-gray-100' : 'text-[#0f0f10]'
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-transform duration-300 ${
                          isOpen
                            ? 'bg-[#ff2e84] text-white rotate-180'
                            : isDarkMode
                            ? 'bg-white/10 text-pink-300'
                            : 'bg-pink-100 text-[#ff2e84]'
                        }`}
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        className={`px-5 sm:px-6 pb-5 pt-1 text-[14px] leading-relaxed border-t ${
                          isDarkMode
                            ? 'bg-[#10121a] text-gray-300 border-white/10'
                            : 'bg-[#fffdfd] text-[#444] border-rose-50'
                        }`}
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Support Callout */}
            <div
              className={`mt-10 p-6 rounded-2xl border text-center flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-pink-950/40 via-rose-950/30 to-purple-950/40 border-pink-500/30'
                  : 'bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/10 border-pink-200'
              }`}
            >
              <div className="text-left">
                <h4
                  className={`font-bold text-sm ${
                    isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                  }`}
                >
                  Still have questions or special requirements?
                </h4>
                <p
                  className={`text-xs m-0 mt-0.5 ${
                    isDarkMode ? 'text-gray-400' : 'text-[#666]'
                  }`}
                >
                  Speak directly with our chief stylist on WhatsApp for bespoke bookings.
                </p>
              </div>
              <a
                href="https://wa.me/2348095294480?text=Hello%20LoveDeGlam!%20I%20have%20a%20question%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-2 shrink-0 shadow-md transition-all"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                <span>Chat with Stylist</span>
              </a>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* Contact Section (High-Contrast, Clean Layout & Instant WhatsApp) */}
        {/* ======================================================================= */}
        <section
          id="contact"
          className={`py-16 sm:py-24 transition-colors duration-500 ${
            isDarkMode ? 'bg-[#0b0c10]' : 'bg-white'
          }`}
        >
          <div className="max-w-[1100px] mx-auto px-5">
            <div className="text-center mb-[50px]">
              <h2
                className={`font-playfair text-[34px] sm:text-[38px] mb-[10px] font-bold ${
                  isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                }`}
              >
                Get In Touch
              </h2>
              <p
                className={`max-w-[600px] mx-auto leading-[1.6] text-[15px] ${
                  isDarkMode ? 'text-gray-400' : 'text-[#666]'
                }`}
              >
                We'd love to hear from you. Whether you're booking a session, asking questions, or
                requesting a consultation — send us a message or chat directly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 items-start">
              {/* CONTACT DETAILS */}
              <div className="flex flex-col gap-4">
                <div
                  className={`flex items-start gap-4 p-5 rounded-[16px] border shadow-sm transition-transform duration-300 hover:-translate-y-0.5 ${
                    isDarkMode
                      ? 'bg-[#14161f] border-white/10 text-gray-200'
                      : 'bg-[#fff5f9] border-pink-200 text-gray-800'
                  }`}
                >
                  <span className="text-[24px]">📍</span>
                  <div>
                    <h4
                      className={`text-[15px] font-bold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                      }`}
                    >
                      Studio Location
                    </h4>
                    <p
                      className={`text-[14px] m-0 leading-relaxed ${
                        isDarkMode ? 'text-gray-400' : 'text-[#555]'
                      }`}
                    >
                      No 11 Ebony Road, Oroazi, Port Harcourt, Rivers State, Nigeria
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-5 rounded-[16px] border shadow-sm transition-transform duration-300 hover:-translate-y-0.5 ${
                    isDarkMode
                      ? 'bg-[#14161f] border-white/10 text-gray-200'
                      : 'bg-[#fff5f9] border-pink-200 text-gray-800'
                  }`}
                >
                  <span className="text-[24px]">📞</span>
                  <div>
                    <h4
                      className={`text-[15px] font-bold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                      }`}
                    >
                      Phone Lines
                    </h4>
                    <p
                      className={`text-[14px] m-0 leading-relaxed ${
                        isDarkMode ? 'text-gray-400' : 'text-[#555]'
                      }`}
                    >
                      <a href="tel:+2349073733455" className="hover:text-[#ff2e84]">+234 907 373 3455</a><br />
                      <a href="tel:+2349162648527" className="hover:text-[#ff2e84]">+234 916 264 8527</a><br />
                      <a
                        href="tel:+2348095294480"
                        className={`hover:text-[#ff2e84] font-semibold ${
                          isDarkMode ? 'text-pink-300' : 'text-[#0f0f10]'
                        }`}
                      >
                        +234 809 529 4480 (WhatsApp)
                      </a>
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-5 rounded-[16px] border shadow-sm transition-transform duration-300 hover:-translate-y-0.5 ${
                    isDarkMode
                      ? 'bg-[#14161f] border-white/10 text-gray-200'
                      : 'bg-[#fff5f9] border-pink-200 text-gray-800'
                  }`}
                >
                  <span className="text-[24px]">✉</span>
                  <div>
                    <h4
                      className={`text-[15px] font-bold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                      }`}
                    >
                      Email
                    </h4>
                    <p
                      className={`text-[14px] m-0 ${
                        isDarkMode ? 'text-gray-400' : 'text-[#555]'
                      }`}
                    >
                      <a href="mailto:lovedeglam@gmail.com" className="hover:text-[#ff2e84]">
                        lovedeglam@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-5 rounded-[16px] border shadow-sm transition-transform duration-300 hover:-translate-y-0.5 ${
                    isDarkMode
                      ? 'bg-[#14161f] border-white/10 text-gray-200'
                      : 'bg-[#fff5f9] border-pink-200 text-gray-800'
                  }`}
                >
                  <span className="text-[24px]">🌐</span>
                  <div>
                    <h4
                      className={`text-[15px] font-bold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                      }`}
                    >
                      Official Website
                    </h4>
                    <p className="text-[14px] m-0">
                      <a
                        href="https://www.lovedeglam.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:text-[#ff2e84] font-medium ${
                          isDarkMode ? 'text-pink-300' : 'text-[#0f0f10]'
                        }`}
                      >
                        www.lovedeglam.com
                      </a>
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-5 rounded-[16px] border shadow-sm transition-transform duration-300 hover:-translate-y-0.5 ${
                    isDarkMode
                      ? 'bg-[#14161f] border-white/10 text-gray-200'
                      : 'bg-[#fff5f9] border-pink-200 text-gray-800'
                  }`}
                >
                  <span className="text-[24px]">⏰</span>
                  <div>
                    <h4
                      className={`text-[15px] font-bold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                      }`}
                    >
                      Working Hours
                    </h4>
                    <p
                      className={`text-[14px] m-0 ${
                        isDarkMode ? 'text-gray-400' : 'text-[#555]'
                      }`}
                    >
                      Mon – Sat : 9:00 AM – 6:00 PM
                    </p>
                    <p className="text-[12px] text-[#ff2e84] m-0 mt-0.5 font-medium">Sunday: VIP Appointments Only</p>
                  </div>
                </div>

                {/* Direct WhatsApp Callout */}
                <a
                  href={getWhatsAppBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-[14px] bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer text-center"
                >
                  <i className="fa-brands fa-whatsapp text-lg"></i>
                  <span>Fast Track via WhatsApp Concierge</span>
                </a>
              </div>

              {/* CONTACT FORM */}
              <div
                className={`p-7 sm:p-9 rounded-[20px] border transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-[#14161f] border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.7)]'
                    : 'bg-[#fff0f6] border-pink-200 shadow-[0_10px_35px_rgba(255,77,158,0.12)]'
                }`}
              >
                {contactSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
                      ✓
                    </div>
                    <h3
                      className={`text-2xl font-playfair font-bold ${
                        isDarkMode ? 'text-white' : 'text-[#0f0f10]'
                      }`}
                    >
                      Thank you, {contactForm.name || 'Queen'}!
                    </h3>
                    <p
                      className={`text-sm max-w-md mx-auto leading-relaxed ${
                        isDarkMode ? 'text-gray-300' : 'text-[#444]'
                      }`}
                    >
                      We have received your message regarding <strong className="text-[#ff2e84]">{contactForm.service}</strong>. Our team will contact you shortly.
                    </p>
                    <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={getWhatsAppBookingLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-6 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba5a] transition flex items-center justify-center gap-2"
                      >
                        <i className="fa-brands fa-whatsapp"></i>
                        <span>Continue to WhatsApp</span>
                      </a>
                      <button
                        onClick={() => {
                          setContactSubmitted(false);
                          setContactForm({
                            name: '',
                            email: '',
                            phone: '',
                            service: 'Makeup Session',
                            message: '',
                          });
                        }}
                        className={`py-3 px-6 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                          isDarkMode
                            ? 'bg-white/10 border-white/20 text-gray-200 hover:bg-white/20'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form id="contactForm" onSubmit={handleContactSubmit} className="flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col mb-4">
                        <label
                          className={`text-[14px] mb-1.5 font-semibold ${
                            isDarkMode ? 'text-gray-200' : 'text-[#0f0f10]'
                          }`}
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="e.g. Queen Adaobi"
                          className={`p-3 rounded-lg border text-[14px] focus:border-[#ff2e84] focus:outline-none focus:ring-2 focus:ring-pink-300/30 transition-colors ${
                            isDarkMode
                              ? 'bg-[#1e212d] border-white/10 text-white placeholder-gray-500'
                              : 'bg-white border-pink-200 text-[#0f0f10] placeholder-gray-400'
                          }`}
                        />
                      </div>

                      <div className="flex flex-col mb-4">
                        <label
                          className={`text-[14px] mb-1.5 font-semibold ${
                            isDarkMode ? 'text-gray-200' : 'text-[#0f0f10]'
                          }`}
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="yourname@gmail.com"
                          className={`p-3 rounded-lg border text-[14px] focus:border-[#ff2e84] focus:outline-none focus:ring-2 focus:ring-pink-300/30 transition-colors ${
                            isDarkMode
                              ? 'bg-[#1e212d] border-white/10 text-white placeholder-gray-500'
                              : 'bg-white border-pink-200 text-[#0f0f10] placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col mb-4">
                        <label
                          className={`text-[14px] mb-1.5 font-semibold ${
                            isDarkMode ? 'text-gray-200' : 'text-[#0f0f10]'
                          }`}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="+234 ..."
                          className={`p-3 rounded-lg border text-[14px] focus:border-[#ff2e84] focus:outline-none focus:ring-2 focus:ring-pink-300/30 transition-colors ${
                            isDarkMode
                              ? 'bg-[#1e212d] border-white/10 text-white placeholder-gray-500'
                              : 'bg-white border-pink-200 text-[#0f0f10] placeholder-gray-400'
                          }`}
                        />
                      </div>

                      <div className="flex flex-col mb-4">
                        <label
                          className={`text-[14px] mb-1.5 font-semibold ${
                            isDarkMode ? 'text-gray-200' : 'text-[#0f0f10]'
                          }`}
                        >
                          Select Service
                        </label>
                        <select
                          value={contactForm.service}
                          onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                          className={`p-3 rounded-lg border text-[14px] focus:border-[#ff2e84] focus:outline-none focus:ring-2 focus:ring-pink-300/30 transition-colors ${
                            isDarkMode
                              ? 'bg-[#1e212d] border-white/10 text-white'
                              : 'bg-white border-pink-200 text-[#0f0f10]'
                          }`}
                        >
                          <option>Makeup Session (Everyday/Soft Glam)</option>
                          <option>Bridal Makeup Artistry</option>
                          <option>Frontal Wig Installation</option>
                          <option>Hair Revamping &amp; Silk Infusion</option>
                          <option>Hair-Installation Masterclass</option>
                          <option>Makeup Artistry Masterclass</option>
                          <option>VIP Consultation</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col mb-4">
                      <label
                        className={`text-[14px] mb-1.5 font-semibold ${
                          isDarkMode ? 'text-gray-200' : 'text-[#0f0f10]'
                        }`}
                      >
                        Your Message / Preferred Appointment Date
                      </label>
                      <textarea
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us about your event, wedding date, or custom wig needs..."
                        className={`p-3 rounded-lg border text-[14px] focus:border-[#ff2e84] focus:outline-none focus:ring-2 focus:ring-pink-300/30 resize-none transition-colors ${
                          isDarkMode
                            ? 'bg-[#1e212d] border-white/10 text-white placeholder-gray-500'
                            : 'bg-white border-pink-200 text-[#0f0f10] placeholder-gray-400'
                        }`}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-[14px] border-none rounded-lg bg-gradient-to-r from-[#ff4d9e] to-[#ff2e84] text-white text-[15px] font-semibold cursor-pointer transition-all duration-300 hover:brightness-110 hover:shadow-lg shadow-pink-500/20"
                    >
                      Send Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 4. Responsive Floating Social Contact Bar (No hardcoded 1150px) */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 max-[600px]:flex-row max-[600px]:bottom-4 max-[600px]:left-1/2 max-[600px]:-translate-x-1/2 max-[600px]:right-auto max-[600px]:gap-2.5 max-[600px]:p-2 max-[600px]:bg-black/60 max-[600px]:backdrop-blur-md max-[600px]:rounded-full max-[600px]:shadow-2xl">
        <a
          href="mailto:lovedeglam@gmail.com"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl text-white no-underline transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:scale-110 hover:-translate-y-1 bg-[#D44638]"
          title="Email"
        >
          <i className="fa-solid fa-envelope"></i>
        </a>

        <a
          href="https://wa.me/2348095294480?text=Hello%20LoveDeGlam!%20I%20would%20like%20to%20book%20a%20session."
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl text-white no-underline transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:scale-110 hover:-translate-y-1 bg-[#25D366]"
          title="WhatsApp"
        >
          <i className="fa-brands fa-whatsapp"></i>
        </a>

        <a
          href="https://youtube.com/@lovedeglam?si=Tva3S1B6eR4VljjR"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl text-white no-underline transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:scale-110 hover:-translate-y-1 bg-[#FF0000]"
          title="YouTube"
        >
          <i className="fa-brands fa-youtube"></i>
        </a>

        <a
          href="https://www.facebook.com/share/1A4atmAeEw/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl text-white no-underline transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:scale-110 hover:-translate-y-1 bg-[#1877F2]"
          title="Facebook"
        >
          <i className="fa-brands fa-facebook-f"></i>
        </a>

        <a
          href="https://www.tiktok.com/@love.de.glam?_t=ZS-90MDaXhYsc5&_r=1"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl text-white no-underline transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:scale-110 hover:-translate-y-1 bg-[#000000] border border-white/20"
          title="TikTok"
        >
          <i className="fa-brands fa-tiktok"></i>
        </a>

        <a
          href="https://www.instagram.com/lovedeglam?igsh=YWYzYmcydDJyZGg0&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl text-white no-underline transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:scale-110 hover:-translate-y-1"
          style={{
            background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)',
          }}
          title="Instagram"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
      </div>

      {/* ========================================================================= */}
      {/* 5. Footer */}
      {/* ========================================================================= */}
      <footer
        className="py-12 text-center flex flex-col items-center justify-center border-t border-rose-200"
        style={{
          background: 'linear-gradient(10deg, #111827, #240a1b)',
        }}
      >
        <div className="max-w-[1200px] w-full mx-auto px-6 flex flex-col items-center gap-6">
          {/* Main Footer Brand Card */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/[0.06] rounded-[20px] p-6 backdrop-blur-[8px] shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/10">
            <img
              src="/logo.jpg"
              alt="LoveDeGlam logo"
              className="w-12 h-12 rounded-[12px] object-cover border-2 border-white/20"
            />
            <div className="text-white text-sm font-medium">
              © {new Date().getFullYear()} LoveDeGlam — All rights reserved. Handcrafted in Port Harcourt.
            </div>
          </div>

          {/* Annual Domain Renewal Notice & Countdown (Sept 17 - Oct 17) */}
          {domainNotice && domainNotice.isActive && !isDomainBannerDismissed && (
            <div className="w-full max-w-[850px] bg-gradient-to-r from-red-950/80 via-red-900/90 to-red-950/80 rounded-2xl p-5 border border-red-500/40 shadow-xl backdrop-blur-sm text-left">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      ⚠️ Domain Renewal Notice
                    </span>
                    <span className="text-xs text-red-200 font-mono">
                      Expires: {domainNotice.expiryDateFormatted}
                    </span>
                  </div>
                  <p className="text-sm text-white/90 m-0">
                    The annual domain registration for <strong>www.lovedeglam.com</strong> is due for renewal.
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                  <div className="flex items-center gap-1.5 font-mono font-bold text-sm bg-black/50 px-3.5 py-1.5 rounded-lg border border-red-500/30 text-white">
                    <span className="text-amber-400">{domainNotice.days}d</span> :
                    <span>{String(domainNotice.hours).padStart(2, '0')}h</span> :
                    <span>{String(domainNotice.minutes).padStart(2, '0')}m</span> :
                    <span className="text-red-400">{String(domainNotice.seconds).padStart(2, '0')}s</span>
                  </div>

                  <button
                    onClick={() => setIsDomainBannerDismissed(true)}
                    className="text-xs text-white/60 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition cursor-pointer"
                    title="Dismiss for this session"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 6. Lightbox Image Modal */}
      {/* ========================================================================= */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#111827] rounded-2xl overflow-hidden shadow-2xl border border-pink-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-[#ff2e84] text-white flex items-center justify-center transition cursor-pointer"
            >
              ✕
            </button>
            <div className="max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-5 flex items-center justify-between bg-[#111827] text-white border-t border-white/10">
              <div>
                <span className="text-xs text-[#ff7ab6] uppercase tracking-wider font-semibold">
                  {selectedImage.category}
                </span>
                <h3 className="text-lg font-playfair font-bold text-white">
                  {selectedImage.title}
                </h3>
              </div>
              <a
                href={getWhatsAppBookingLink(`Look: ${selectedImage.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary text-xs py-2 px-4"
              >
                Book This Look
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          id="scrollTopBtn"
          title="Back to top"
          className="fixed bottom-[30px] right-[90px] max-[600px]:right-4 max-[600px]:bottom-20 z-[998] bg-gradient-to-r from-[#ff7ab6] to-[#ff4d9e] text-white border-none py-[12px] px-[16px] rounded-full cursor-pointer text-[16px] shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:opacity-90 transition-all flex items-center justify-center"
        >
          ⬆
        </button>
      )}
    </div>
  );
}
