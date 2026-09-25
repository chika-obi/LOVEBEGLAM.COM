import React, { useState } from 'react';
import { Play, Sparkles, X, Clock, Video, Film } from 'lucide-react';
import { VIDEO_SHOWCASES, SALON_CONTACT } from '../data/salonData';
import { VideoItem } from '../types';

export const VideoSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section id="videos" className="py-24 bg-[#0b0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30">
            <Film className="w-4 h-4 text-pink-400" />
            <span className="text-xs sm:text-sm font-semibold text-pink-300 uppercase tracking-widest">
              Live Transformations
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            See Our Work In <span className="text-pink-gradient italic font-serif">Action.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Watch real-time beauty transformations, precision frontal melting procedures, and silk infusion
            hair revamps straight from our Port Harcourt glam studio.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VIDEO_SHOWCASES.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group relative rounded-3xl overflow-hidden bg-[#131521] border border-white/10 hover:border-pink-500/50 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>

                {/* Play Button Trigger */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-pink-500/90 group-hover:bg-pink-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform backdrop-blur-sm">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-pink-400" />
                  <span>{video.duration}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-pink-600/80 backdrop-blur-md text-white text-[11px] font-semibold">
                  {video.category}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6 space-y-2">
                <h3 className="font-display text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {video.description}
                </p>
                <div className="pt-3 flex items-center justify-between text-xs text-pink-400 font-semibold">
                  <span>Watch session video</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube Channel Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-[#191420] to-pink-950/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-600/30">
              <Video className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-display font-bold text-white">
                Follow LoveDeGlam on YouTube & TikTok
              </h4>
              <p className="text-xs sm:text-sm text-gray-300">
                Subscribe for weekly wig care tips, live frontal installs, and bridal BTS stories.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={SALON_CONTACT.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold transition shadow-md"
            >
              Watch on YouTube
            </a>
            <a
              href={SALON_CONTACT.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition border border-white/15"
            >
              TikTok Reels
            </a>
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#141624] rounded-3xl overflow-hidden border border-pink-500/40 shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">
                  {activeVideo.category}
                </span>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-2xl">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <h4 className="text-white font-bold text-base max-w-md">
                  {activeVideo.title}
                </h4>
                <p className="text-xs text-gray-300 max-w-sm">
                  Full transformation videos and daily reels are published continuously on our official YouTube and TikTok accounts.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={SALON_CONTACT.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                  >
                    Watch Full HD on YouTube
                  </a>
                  <a
                    href={SALON_CONTACT.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/20 text-white text-xs font-semibold hover:bg-white/30 transition"
                  >
                    View on TikTok
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              {activeVideo.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
