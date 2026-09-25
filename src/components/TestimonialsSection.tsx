import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/salonData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c + 1) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0d0e15] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-xs sm:text-sm font-semibold text-pink-300 uppercase tracking-widest">
              Real Experiences
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Words of <span className="text-pink-gradient italic font-serif">Love & Glam.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Read authentic reviews from radiant brides, fashion models, corporate executives, and proud
            graduates of our beauty academy.
          </p>
        </div>

        {/* Featured Testimonial Hero Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative rounded-3xl bg-gradient-to-b from-[#181a29] to-[#12131d] border border-pink-500/30 p-8 sm:p-12 shadow-2xl">
            <Quote className="absolute top-6 right-6 sm:top-10 sm:right-10 w-16 h-16 text-pink-500/15 pointer-events-none" />

            <div className="space-y-6">
              {/* Stars */}
              <div className="flex items-center gap-1.5 text-amber-400">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-lg sm:text-2xl text-gray-100 font-display italic leading-relaxed">
                "{TESTIMONIALS[currentIndex].comment}"
              </p>

              {/* Author & Service */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">
                      {TESTIMONIALS[currentIndex].name}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/30">
                      <CheckCircle2 className="w-3 h-3 text-pink-400" />
                      Verified Client
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {TESTIMONIALS[currentIndex].role} · {TESTIMONIALS[currentIndex].location}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs font-semibold text-pink-300">
                    Service: {TESTIMONIALS[currentIndex].service}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {TESTIMONIALS[currentIndex].date}
                  </div>
                </div>
              </div>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center justify-between pt-8 mt-6 border-t border-white/5">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === i ? 'w-8 bg-pink-500' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-600 text-white flex items-center justify-center border border-white/15 transition cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-600 text-white flex items-center justify-center border border-white/15 transition cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Quick Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3 hover:border-pink-500/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <strong className="text-white font-semibold text-sm">{item.name}</strong>
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-300 italic line-clamp-3">
                "{item.comment}"
              </p>
              <div className="text-[11px] text-pink-300 font-medium">
                {item.service}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
