import React, { useState } from 'react';
import { Calculator, Sparkles, Check, Calendar, Clock, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRICING_OPTIONS, SALON_CONTACT } from '../data/salonData';

export const BookingCalculator: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState(PRICING_OPTIONS.services[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const currentService =
    PRICING_OPTIONS.services.find((s) => s.id === selectedServiceId) ||
    PRICING_OPTIONS.services[0];

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = PRICING_OPTIONS.addons.find((a) => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const grandTotal = currentService.basePrice + addonsTotal;

  const generateWhatsAppMessage = () => {
    const selectedAddonNames = selectedAddons
      .map((id) => PRICING_OPTIONS.addons.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Hello LoveDeGlam! I would like to book an appointment:%0A%0A` +
      `• *Client Name:* ${clientName || 'Valued Queen'}%0A` +
      `• *Phone:* ${clientPhone || 'Not provided'}%0A` +
      `• *Selected Service:* ${currentService.name} (₦${currentService.basePrice.toLocaleString()})%0A` +
      `• *Add-ons:* ${selectedAddonNames || 'None'}%0A` +
      `• *Estimated Total:* ₦${grandTotal.toLocaleString()}%0A` +
      `• *Preferred Date:* ${preferredDate || 'To be scheduled'}%0A` +
      `• *Preferred Time:* ${preferredTime}%0A` +
      (notes ? `• *Special Requests:* ${encodeURIComponent(notes)}%0A` : '') +
      `%0APlease let me know your availability!`;

    return `https://wa.me/${SALON_CONTACT.whatsappNumber}?text=${text}`;
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <section id="estimator" className="py-24 bg-[#0b0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30">
            <Calculator className="w-4 h-4 text-pink-400" />
            <span className="text-xs sm:text-sm font-semibold text-pink-300 uppercase tracking-widest">
              Transparent Pricing
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Interactive <span className="text-pink-gradient italic font-serif">Glam Calculator.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Customize your beauty experience, select your preferred styling options, and receive an instant
            transparent estimate with zero hidden surprises.
          </p>
        </div>

        {/* Calculator Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Selections */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Main Service Selector */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#131520] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Select Primary Service</span>
                </h3>
                <span className="text-xs text-pink-300 font-medium">Required</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {PRICING_OPTIONS.services.map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-pink-500/15 border-pink-500 shadow-md shadow-pink-500/15'
                          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-white">
                          {service.name}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'border-pink-500 bg-pink-500 text-white'
                              : 'border-white/30'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-gray-400">{service.duration}</span>
                        <span className="font-bold text-pink-300">
                          ₦{service.basePrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Optional Luxury Add-ons */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#131520] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Enhance With Luxury Add-ons</span>
                </h3>
                <span className="text-xs text-gray-400">Optional</span>
              </div>

              <div className="space-y-2.5 pt-2">
                {PRICING_OPTIONS.addons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'bg-pink-500/15 border-pink-500'
                          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? 'border-pink-500 bg-pink-500 text-white'
                              : 'border-white/30'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-sm font-medium text-gray-200">
                          {addon.name}
                        </span>
                      </div>

                      <span className="text-xs font-bold text-pink-300 shrink-0">
                        +₦{addon.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Estimate Summary & Quick Booking Action */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#181a28] to-[#12131d] border border-pink-500/30 shadow-2xl relative overflow-hidden">
              {/* Subtle glam glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 text-pink-300 font-semibold text-sm">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span>Your Glam Summary</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-medium bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Live Estimate
                  </span>
                </div>

                {/* Line items */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-gray-300">{currentService.name}</span>
                    <span className="text-white font-semibold shrink-0">
                      ₦{currentService.basePrice.toLocaleString()}
                    </span>
                  </div>

                  {selectedAddons.map((id) => {
                    const addon = PRICING_OPTIONS.addons.find((a) => a.id === id);
                    if (!addon) return null;
                    return (
                      <div key={id} className="flex items-start justify-between gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <span className="text-pink-400">+</span>
                          <span>{addon.name}</span>
                        </span>
                        <span className="text-gray-300 shrink-0">
                          ₦{addon.price.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                      Estimated Investment
                    </span>
                    <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                      ₦{grandTotal.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <div>Approx. Duration</div>
                    <div className="text-pink-300 font-semibold">{currentService.duration}</div>
                  </div>
                </div>

                {/* Quick Date & Phone Details for WhatsApp prefill */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Your Full Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Queen Adaobi"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-pink-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Time Slot
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#1d1f2e] border border-white/10 text-white text-xs focus:outline-none focus:border-pink-500"
                      >
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:30 AM</option>
                        <option>1:00 PM</option>
                        <option>2:30 PM</option>
                        <option>4:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Primary Booking Button: WhatsApp */}
                <div className="space-y-2.5 pt-2">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Book Instant via WhatsApp</span>
                  </a>

                  <p className="text-[11px] text-center text-gray-400">
                    Sends your selected service, add-ons, and date straight to our official concierge.
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-pink-400" />
                    <span>No Advance Hidden Charges</span>
                  </div>
                  <span>•</span>
                  <span>Free Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
