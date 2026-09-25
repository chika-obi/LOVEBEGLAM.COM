import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle, Sparkles } from 'lucide-react';
import { SALON_CONTACT } from '../data/salonData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bridal Makeup',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Bridal Makeup',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-[#0b0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30">
            <Mail className="w-4 h-4 text-pink-400" />
            <span className="text-xs sm:text-sm font-semibold text-pink-300 uppercase tracking-widest">
              Direct Inquiries
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Get In <span className="text-pink-gradient italic font-serif">Touch.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            We'd love to hear from you. Whether you're booking a VIP session, asking about hair revamping,
            or requesting enrollment for our upcoming masterclass — our concierge is ready to assist.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Studio Info & Contact Image */}
          <div className="lg:col-span-5 space-y-6">
            {/* Studio Info Card */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#131520] border border-white/10 space-y-6 shadow-xl">
              <h3 className="text-xl font-display font-bold text-white">
                Studio Headquarters
              </h3>

              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-white">Physical Location</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {SALON_CONTACT.address}
                    </p>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-white">Phone Numbers</h4>
                    <div className="space-y-1 text-xs">
                      {SALON_CONTACT.phones.map((phone, idx) => (
                        <div key={idx}>
                          <a
                            href={`tel:${phone}`}
                            className="text-gray-300 hover:text-pink-400 transition"
                          >
                            {phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-white">Official Email</h4>
                    <p className="text-xs">
                      <a
                        href={`mailto:${SALON_CONTACT.email}`}
                        className="text-gray-300 hover:text-pink-400 transition"
                      >
                        {SALON_CONTACT.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-white">Studio Hours</h4>
                    <p className="text-xs text-gray-300">{SALON_CONTACT.hours}</p>
                    <p className="text-xs text-pink-300/80">{SALON_CONTACT.sundayHours}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={SALON_CONTACT.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat With Concierge on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Studio Image feature from repo */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-xl relative aspect-[16/9] hidden sm:block">
              <img
                src="/contactImage.png"
                alt="LoveDeGlam Studio Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 text-xs text-gray-200 font-medium">
                LoveDeGlam VIP Studio · Ebony Road, Port Harcourt
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 rounded-3xl bg-[#131520] border border-white/10 shadow-2xl relative">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Thank You, {formData.name || 'Friend'}!
                  </h3>
                  <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                    Your inquiry for <span className="text-pink-300 font-semibold">{formData.service}</span> has been received. Our team will review your message and contact you via phone or email within 2-4 hours.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/${SALON_CONTACT.whatsappNumber}?text=Hello!%20I%20just%20submitted%20a%20form%20on%20your%20website%20for%20${encodeURIComponent(
                        formData.service
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glam px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Speed Up via WhatsApp</span>
                    </a>
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs sm:text-sm border border-white/10"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-white">
                      Send a Direct Message
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Fill out the form below and our glam coordinator will get back to you promptly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Full Name <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Email Address <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Service Requested
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#1c1e2b] border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500 transition"
                      >
                        <option>Bridal Makeup</option>
                        <option>Frontal Wig Installation</option>
                        <option>Everyday / Soft Glam Makeup</option>
                        <option>Hair Revamping & Silk Infusion</option>
                        <option>Hair Masterclass (Academy)</option>
                        <option>Makeup Masterclass (Academy)</option>
                        <option>General VIP Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Your Message or Consultation Details
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us what you need, your event date, or any questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-500 transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-glam py-3.5 px-6 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
