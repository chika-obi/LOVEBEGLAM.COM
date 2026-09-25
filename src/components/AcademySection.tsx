import React, { useState } from 'react';
import { GraduationCap, Award, CheckCircle2, Users, BookOpen, Sparkles, ArrowRight, Video, Camera } from 'lucide-react';
import { SALON_CONTACT } from '../data/salonData';

interface AcademySectionProps {
  onEnroll: (courseName: string) => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({ onEnroll }) => {
  const [selectedCourse, setSelectedCourse] = useState<'hair' | 'makeup'>('hair');

  return (
    <section id="academy" className="py-24 bg-[#0e1019] relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-rose-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30">
            <GraduationCap className="w-4 h-4 text-pink-400" />
            <span className="text-xs sm:text-sm font-semibold text-pink-300 uppercase tracking-widest">
              LoveDeGlam Beauty Academy
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Learn From The <span className="text-pink-gradient italic font-serif">Master Artist.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Fast-track your beauty career with practical, hands-on masterclasses in Port Harcourt.
            Master cutting-edge frontal installations, flawless bridal artistry, client psychology, and viral content creation.
          </p>

          {/* Course Toggle Switch */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 mt-6">
            <button
              onClick={() => setSelectedCourse('hair')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCourse === 'hair'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Hair Installation & Revamping Masterclass
            </button>
            <button
              onClick={() => setSelectedCourse('makeup')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCourse === 'makeup'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Professional Bridal & Glam Makeup
            </button>
          </div>
        </div>

        {/* Selected Course Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual & Student Highlights */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/15 to-white/5 p-2 backdrop-blur-xl border border-white/15 shadow-2xl">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-black relative">
                <img
                  src={selectedCourse === 'hair' ? '/image5.jpg' : '/image8.jpg'}
                  alt="Academy Masterclass in Session"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                {/* Floating Certificate Badge */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-500/40 text-xs font-semibold text-pink-300 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Accredited Certificate Included</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold">1-on-1 Mentorship Available</div>
                      <div className="text-xs text-gray-300">Live human models provided during practical exams</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Curriculum & Enrollment */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-7 sm:p-9 rounded-3xl bg-[#141624] border border-white/10 shadow-2xl space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
                  Full Practical Curriculum
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {selectedCourse === 'hair'
                    ? 'Hair Installation, Customization & Revamping'
                    : 'Luxury Bridal & Editorial Makeup Artistry'}
                </h3>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                  {selectedCourse === 'hair'
                    ? 'From the fundamentals of lace ventilation and custom knot bleaching to advanced 360 installs and commercial wig revamping.'
                    : 'Master skin prep across diverse undertones, switch effortlessly between soft and editorial eyeshadows, and build an influential brand.'}
                </p>
              </div>

              {/* Curriculum Bullet Points from Original LoveDeGlam Repo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(selectedCourse === 'hair'
                  ? [
                      'Glued & Glueless Frontal Wig Installation Protocols',
                      'Frontal Ponytails, Half-Up Buns & Luxury Sew-ins',
                      '5x5, 6x6, and 7x6 HD Lace Closure Mastery',
                      '360 & Double Frontal Wig Construction',
                      'Natural & Relaxed Hair Ponytails & Braid Foundations',
                      'Braided Frontal Wigs & Parting Precision',
                      'Premium Wig Revamping, Silk Infusion & Thermal Styling',
                      'Vendor Sourcing for Virgin Bundles & HD Lace',
                    ]
                  : [
                      'Flawless 18-hr Bridal Makeup across diverse skin tones',
                      'Eyeshadow Mastery: Soft nude blends to bold cut-creases',
                      'Advanced skin prep chemistry for all skin types',
                      'Studio light setup & beauty ring lighting essentials',
                      'Smartphone photo/video editing & viral reel creation',
                      'Product recommendations, budget dupes & kit essentials',
                      'Pricing strategy, client consultations & contracts',
                      'Instagram & TikTok organic client growth roadmap',
                    ]
                ).map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-gray-200">{topic}</span>
                  </div>
                ))}
              </div>

              {/* Bonus Academy Perks */}
              <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-pink-400" />
                  <div className="text-xs text-pink-200">
                    <span className="font-bold text-white">Bonus Media Masterclass:</span> How to shoot
                    and edit viral 4K Instagram & TikTok beauty videos on your phone.
                  </div>
                </div>
              </div>

              {/* Action & Enrollment CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-400">Tuition Starting At:</span>
                  <div className="text-2xl font-bold text-white">
                    ₦{selectedCourse === 'hair' ? '150,000' : '160,000'}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() =>
                      onEnroll(
                        selectedCourse === 'hair'
                          ? 'Hair Installation Masterclass'
                          : 'Makeup Artistry Masterclass'
                      )
                    }
                    className="w-full sm:w-auto btn-glam px-7 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Register / Request Syllabus</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
