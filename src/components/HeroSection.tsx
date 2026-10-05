import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroSectionProps {
  onExploreClick: () => void;
  onBookClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onBookClick
}) => {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#18181A] text-[#FAF9F5]">
      {/* Visual Canvas Container */}
      <div className="relative w-full min-h-[580px] lg:min-h-[720px] flex items-center">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Maison Sérénité Autumn Winter Haute Couture Campaign in Parisian Atelier"
            className="w-full h-full object-cover object-center brightness-[0.88] filter"
            referrerPolicy="no-referrer"
          />
          {/* Measured gradient scrim for WCAG AA readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141416]/90 via-[#141416]/65 to-black/30" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-2xl">
            {/* Subtle editorial kicker without pills */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C7BDB1] mb-4">
              <span>Collection No. 14</span>
              <span aria-hidden="true">·</span>
              <span>Autumn / Winter Haute Couture</span>
              <span aria-hidden="true">·</span>
              <span>Paris</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-couture font-normal tracking-tight text-[#FAF9F5] leading-[1.08] mb-6 [text-wrap:balance]">
              Silhouettes of Quiet Permanence.
            </h1>

            {/* Body */}
            <p className="text-base sm:text-lg text-[#D5CEC2] font-light leading-relaxed mb-8 max-w-xl">
              Sculpted from Lyon mulberry silk, Biella virgin wool, and vegetable-tanned Tuscan calfskin. Handcrafted in limited editions of no more than 40 numbered pieces.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-3 bg-[#FAF9F5] text-[#18181A] px-7 py-3.5 text-xs uppercase tracking-[0.16em] font-semibold rounded hover:bg-[#EFECE6] transition-all group"
              >
                <span>Discover Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2 border border-[#E7E3DC]/40 text-[#FAF9F5] px-6 py-3.5 text-xs uppercase tracking-[0.16em] font-medium rounded hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <span>Reserve Salon Fitting</span>
              </button>
            </div>

            {/* Claim-to-Proof Adjacency Row */}
            <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-6 text-[#D5CEC2]">
              <div>
                <p className="text-xl sm:text-2xl font-serif-couture text-white font-medium tabular-nums">
                  40
                </p>
                <p className="text-xs text-[#A8A196] uppercase tracking-wider mt-1">
                  Numbered Pieces Max
                </p>
              </div>

              <div>
                <p className="text-xl sm:text-2xl font-serif-couture text-white font-medium">
                  Lyon & Biella
                </p>
                <p className="text-xs text-[#A8A196] uppercase tracking-wider mt-1">
                  Heritage European Mills
                </p>
              </div>

              <div>
                <p className="text-xl sm:text-2xl font-serif-couture text-white font-medium">
                  30+ Hrs
                </p>
                <p className="text-xs text-[#A8A196] uppercase tracking-wider mt-1">
                  Hand-Finishing Per Piece
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
