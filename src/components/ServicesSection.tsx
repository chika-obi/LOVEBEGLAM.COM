import React, { useState } from 'react';
import { Sparkles, Check, Clock, Calendar, ArrowRight, Star } from 'lucide-react';
import { SERVICES } from '../data/salonData';
import { ServiceCategory } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory | 'all'>('all');

  const filteredServices =
    activeTab === 'all'
      ? SERVICES
      : SERVICES.filter((service) => service.category === activeTab);

  const tabs: { label: string; value: ServiceCategory | 'all' }[] = [
    { label: 'All Services', value: 'all' },
    { label: 'Makeup Artistry', value: 'makeup' },
    { label: 'Frontal Installation', value: 'frontal' },
    { label: 'Hair Revamping', value: 'revamp' },
    { label: 'Training Academy', value: 'training' },
  ];

  return (
    <section id="services" className="py-24 bg-[#0b0c10] relative">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-xs sm:text-sm font-semibold text-pink-300 uppercase tracking-widest">
              Signature Offerings
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Crafted for <span className="text-pink-gradient italic font-serif">Excellence.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            From regal bridal glam and undetectable melted frontals to bespoke wig revitalization and
            masterclasses, every session is a celebration of your individuality.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.value
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25 scale-105'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-pink-500/50 transition-all duration-500 flex flex-col justify-between shadow-xl hover:-translate-y-1.5"
            >
              {/* Image banner */}
              <div className="relative h-60 w-full overflow-hidden bg-black">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12131b] via-[#12131b]/30 to-transparent"></div>

                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-pink-500 text-white text-[11px] font-bold shadow-lg flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      Client Favorite
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 left-4">
                  <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-xs text-pink-300 font-medium">
                    {service.category.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Service details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs text-pink-300/80 font-medium mt-1">
                    {service.subtitle}
                  </p>

                  <p className="text-sm text-gray-300 mt-3 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Duration & Starting Price tag */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-pink-400" />
                      <span>{service.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">From </span>
                      <span className="text-white font-bold text-sm">
                        ₦{service.priceStartingAt.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Highlights list */}
                  <div className="mt-5 space-y-2">
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                      Includes:
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="w-full py-3 px-4 rounded-xl bg-pink-500/15 hover:bg-pink-500 text-pink-300 hover:text-white border border-pink-500/30 text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book This Service</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
