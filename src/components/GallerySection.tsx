import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Maximize2, X, Eye, Heart, Share2, Calendar } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/salonData';
import { GalleryItem, ServiceCategory } from '../types';

interface GallerySectionProps {
  onBookLook?: (title: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onBookLook }) => {
  // Slider state for featured highlights
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Grid filter state
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');

  // Lightbox modal state
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const featuredSliderItems = GALLERY_ITEMS.slice(0, 6);

  // Auto-play for the featured slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % featuredSliderItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredSliderItems.length]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? featuredSliderItems.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % featuredSliderItems.length);
  };

  const filteredGridItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const categories: { label: string; value: ServiceCategory | 'all' }[] = [
    { label: 'All Looks (13)', value: 'all' },
    { label: 'Makeup Artistry', value: 'makeup' },
    { label: 'Frontal Installs', value: 'frontal' },
    { label: 'Hair Revamp', value: 'revamp' },
    { label: 'Academy & Masterclasses', value: 'training' },
  ];

  return (
    <section id="gallery" className="py-24 bg-[#0d0e15] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-xs sm:text-sm font-semibold text-pink-300 uppercase tracking-widest">
              Transformation Portfolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            The <span className="text-pink-gradient italic font-serif">LoveDeGlam</span> Gallery.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Real clients, real queens. Browse our high-definition portfolio of bridal glows, undetectable
            scalp-melted frontals, and restored virgin hair bundles.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1. Featured Spotlight Slider (Interactive recreation from original repo) */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-pink-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              <span>Featured Runway Highlights</span>
            </div>
            <div className="text-xs text-gray-400">
              Slide {currentSlideIndex + 1} of {featuredSliderItems.length}
            </div>
          </div>

          <div
            className="relative rounded-3xl overflow-hidden bg-black/60 border border-pink-500/30 shadow-2xl group"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Viewport & Sliding Container */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[500px] w-full overflow-hidden">
              <div
                className="flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
              >
                {featuredSliderItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="w-full h-full flex-shrink-0 relative overflow-hidden"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                    {/* Overlay Info */}
                    <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                      <div className="space-y-1">
                        <span className="px-3 py-1 rounded-full bg-pink-500 text-white text-xs font-semibold uppercase tracking-wider">
                          {item.tag}
                        </span>
                        <h3 className="text-xl sm:text-3xl font-display font-bold text-white drop-shadow-md">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300 max-w-xl line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedImage(item)}
                        className="btn-glam px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
                      >
                        <Maximize2 className="w-4 h-4" />
                        <span>View High-Res</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <button
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-pink-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-pink-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Indicator Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {featuredSliderItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'w-7 bg-pink-500'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. Full Portfolio Grid with Interactive Filters & Lightbox */}
        {/* ========================================================================= */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Full Lookbook & Archives
            </h3>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    activeCategory === cat.value
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry / Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredGridItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-black/60 border border-white/10 hover:border-pink-500/60 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-pink-300">
                    {item.tag}
                  </span>
                </div>

                {/* Expand Icon Button */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-pink-500/80 text-white flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Title & Description */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <h4 className="text-sm font-display font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-300 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. Fullscreen Lightbox Modal */}
      {/* ========================================================================= */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#12141f] rounded-3xl overflow-hidden border border-pink-500/30 shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-pink-600 text-white flex items-center justify-center border border-white/20 transition cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Preview Container */}
            <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden max-h-[70vh] md:max-h-[85vh]">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain max-h-[70vh] md:max-h-[85vh]"
              />
            </div>

            {/* Look Details Sidebar */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold border border-pink-500/30">
                  {selectedImage.tag}
                </div>

                <h3 className="text-2xl font-display font-bold text-white">
                  {selectedImage.title}
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedImage.description}
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-xs font-semibold text-pink-300 uppercase tracking-wider">
                    Service Standards
                  </div>
                  <ul className="text-xs text-gray-300 space-y-1.5">
                    <li>• Handcrafted at LoveDeGlam Studio, Port Harcourt</li>
                    <li>• HD skin prep & custom lace tint matching included</li>
                    <li>• Tailored to individual bone structure and undertone</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    const title = selectedImage.title;
                    setSelectedImage(null);
                    if (onBookLook) onBookLook(title);
                  }}
                  className="w-full btn-glam py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Exact Look</span>
                </button>

                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium border border-white/10 cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
