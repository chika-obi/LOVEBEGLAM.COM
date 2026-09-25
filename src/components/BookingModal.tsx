import React, { useState } from 'react';
import { X, Calendar, MessageCircle, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { SERVICES, SALON_CONTACT } from '../data/salonData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const [selectedService, setSelectedService] = useState(
    preselectedServiceId || SERVICES[0].id
  );
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00 AM');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentServiceObj =
    SERVICES.find((s) => s.id === selectedService) || SERVICES[0];

  const handleWhatsAppBooking = () => {
    const text = `Hello LoveDeGlam! I would like to book a consultation:%0A%0A` +
      `• *Name:* ${name || 'Glam Queen'}%0A` +
      `• *Phone:* ${phone || 'Not provided'}%0A` +
      `• *Service:* ${currentServiceObj.title}%0A` +
      `• *Preferred Date:* ${date || 'Flexible'}%0A` +
      `• *Preferred Time:* ${time}%0A` +
      (notes ? `• *Notes:* ${encodeURIComponent(notes)}%0A` : '') +
      `%0APlease let me know your available slots!`;

    window.open(`https://wa.me/${SALON_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#131522] rounded-3xl border border-pink-500/30 p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 text-white flex items-center justify-center transition cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
              Consultation Scheduled!
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Thank you, <span className="text-pink-300 font-semibold">{name || 'Queen'}</span>. We have
              received your request for{' '}
              <span className="text-white font-medium">{currentServiceObj.title}</span>. Our concierge
              will contact you shortly to confirm your slot.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleWhatsAppBooking}
                className="w-full btn-glam py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Instantly via WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>VIP Beauty Appointment</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mt-2">
                Book Your Consultation
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Port Harcourt Studio · No 11 Ebony Road, Oroazi
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Select Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c1e2d] border border-white/10 text-white text-xs focus:outline-none focus:border-pink-500"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} (From ₦{s.priceStartingAt.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1c1e2d] border border-white/10 text-white text-xs focus:outline-none focus:border-pink-500"
                  >
                    <option>9:00 AM</option>
                    <option>10:30 AM</option>
                    <option>12:00 PM</option>
                    <option>1:30 PM</option>
                    <option>3:00 PM</option>
                    <option>4:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Special Notes / Hair Condition
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Bringing virgin bundles for pre-bleach, wedding date, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-pink-500 resize-none"
                ></textarea>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full btn-glam py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Submit Appointment Request</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Or Book Instantly via WhatsApp Concierge</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
