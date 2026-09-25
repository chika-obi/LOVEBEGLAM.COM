import React, { useEffect, useRef } from 'react';
import { Sparkles, Calendar, ArrowRight, Star, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import { SALON_CONTACT } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle luxury glitter particle system inspired by original LoveDeGlam
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      vy: number;
      vx: number;
      color: string;
    }> = [];

    const colors = ['#ffffff', '#ff94c2', '#ffd1e3', '#ffd79a'];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        vy: -(Math.random() * 0.5 + 0.15),
        vx: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.008) * 0.2;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <header className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 lg:pt-32 pb-16 overflow-hidden">
      {/* Background Image with Rich Dark Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/background.jpg"
          alt="LoveDeGlam Studio Background"
          className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-[1.1] scale-105 transform motion-safe:animate-pulse duration-[12000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/85 to-[#150a18]/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-black/60"></div>
      </div>

      {/* Glitter Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-1 pointer-events-none"
      />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* VIP Brand Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-xs sm:text-sm font-medium text-pink-200">
                Port Harcourt's Premier Luxury Beauty Studio & Academy
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.1] tracking-tight">
              Glam that tells{' '}
              <span className="text-pink-gradient italic font-serif">your story.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              Professional makeup artistry, seamless melted frontal installations, and bespoke hair
              revamping — handcrafted by experienced master stylists. Step into our VIP lounge, get
              pampered, and step out glowing with undeniable confidence.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="btn-glam px-7 py-3.5 rounded-2xl text-sm sm:text-base font-semibold flex items-center gap-2.5 shadow-2xl cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explore Services</span>
              </button>

              <a
                href={SALON_CONTACT.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Social Proof Strip */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9</span>
                <span className="text-gray-400">(2,300+ Reviews)</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-pink-400" />
                <span>Certified Master Stylists</span>
              </div>

              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400/40" />
                <span>Premium Hypoallergenic Products</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-rose-600/30 rounded-3xl blur-2xl opacity-60"></div>

              {/* Main Luxury Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/15 to-white/5 p-2 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-black">
                  <img
                    src="/image1.jpg"
                    alt="LoveDeGlam Signature Look"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-pink-400/40 text-[11px] font-semibold text-pink-200 uppercase tracking-wider">
                      Signature Look
                    </span>
                  </div>

                  {/* Bottom Info overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-display text-base font-bold">
                          Bridal & Melted Frontal Glam
                        </h4>
                        <p className="text-xs text-pink-300">
                          HD Airbrush Artistry · Custom Scalp Match
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-500 flex items-center justify-center text-pink-400">
                        <Sparkles className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Review Pill */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#141622]/95 border border-pink-500/30 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  AO
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold text-white">"Flawless All Day"</span>
                  </div>
                  <p className="text-[11px] text-gray-300">Amaka O. · Verified Bride</p>
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-pink-600 text-white rounded-2xl px-4 py-2.5 shadow-xl font-medium text-xs flex items-center gap-2 border border-pink-400/50">
                <Sparkles className="w-4 h-4 text-pink-200" />
                <span>8+ Years of Glamour</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Counters */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-pink-400">
              5,000+
            </div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
              Queens Styled
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-pink-400">
              99.8%
            </div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
              Client Satisfaction
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-pink-400">
              650+
            </div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
              Academy Graduates
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-pink-400">
              100%
            </div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
              Skin-Safe & Virgin Hair
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
