import React from 'react';
import { Compass, Feather, Scissors, Sparkles, Shield, ArrowUpRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface AtelierStorySectionProps {
  onOpenBooking: () => void;
  onExploreCollections: () => void;
}

export const AtelierStorySection: React.FC<AtelierStorySectionProps> = ({
  onOpenBooking,
  onExploreCollections
}) => {
  return (
    <section id="atelier" className="py-20 lg:py-28 bg-[#18181A] text-[#FAF9F5] border-t border-[#29292C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C7BDB1] font-medium mb-3">
            Atelier De Confection
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-couture font-normal tracking-tight text-white leading-tight">
            The Philosophy of the Singular Garment
          </h2>
          <p className="text-sm sm:text-base text-[#B0A89C] font-light mt-4 leading-relaxed">
            In an era of disposable fashion, Maison Sérénité operates under the discipline of radical restraint. We produce fewer than four hundred garments each year across all silhouettes, ensuring each patron receives an heirloom of singular craftsmanship.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Pillar 1 */}
          <div className="p-8 bg-[#212124] border border-[#333338] rounded-sm space-y-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C7BDB1] font-semibold">
              Pillar 01
            </div>
            <h3 className="font-serif-couture text-2xl text-white">
              Fiber Provenance
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A196] leading-relaxed font-light">
              We commission bespoke weaves exclusively from heritage European family mills: 28-momme mulberry silk from Lyon, Grade A long-staple cashmere from Biella, and full-grain vegetable-tanned vachetta leather from Tuscany.
            </p>
            <div className="pt-2 text-xs text-[#E5DFD4] font-mono">
              Lyon · Biella · Scandicci
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 bg-[#212124] border border-[#333338] rounded-sm space-y-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C7BDB1] font-semibold">
              Pillar 02
            </div>
            <h3 className="font-serif-couture text-2xl text-white">
              The Master's Needle
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A196] leading-relaxed font-light">
              Every coat and tailored jacket features floating horsehair chest canvas, hand-rolled lapels, and functional surgeon cuffs carved from natural horn. Over 30 hours of meticulous hand-assembly accompany each coat.
            </p>
            <div className="pt-2 text-xs text-[#E5DFD4] font-mono">
              30+ Hours Hand-Crafted
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 bg-[#212124] border border-[#333338] rounded-sm space-y-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C7BDB1] font-semibold">
              Pillar 03
            </div>
            <h3 className="font-serif-couture text-2xl text-white">
              Strict Scarcity
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A196] leading-relaxed font-light">
              No silhouette exceeds 40 numbered pieces worldwide. When an edition sells out, its pattern is retired to our Parisian archive, preserving the uncompromising uniqueness of your wardrobe.
            </p>
            <div className="pt-2 text-xs text-[#E5DFD4] font-mono">
              Numbered Registry Archive
            </div>
          </div>
        </div>

        {/* Lookbook Campaign Banner */}
        <div id="lookbook" className="relative rounded-sm overflow-hidden bg-[#242428] border border-[#3A3A40]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-8">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[#C7BDB1] font-medium mb-3">
                  The Editorial Lookbook
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif-couture text-white leading-tight mb-4">
                  Autumn / Winter Haute Couture Vol. XIV
                </h3>
                <p className="text-xs sm:text-sm text-[#B0A89C] font-light leading-relaxed">
                  Photographed in the historic neoclassical salons of Paris. Featuring architectural draping, muted earthen palettes, and structured outerwear created for the discerning global collector.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onExploreCollections}
                    className="px-6 py-3 bg-[#FAF9F5] text-[#18181A] text-xs uppercase tracking-widest font-semibold rounded hover:bg-white transition-colors"
                  >
                    View All Silhouettes
                  </button>
                  <button
                    onClick={onOpenBooking}
                    className="px-6 py-3 border border-[#6E685F] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium rounded hover:bg-white/5 transition-colors"
                  >
                    Book Private Fitting Session
                  </button>
                </div>
                <div className="text-[11px] text-[#8A847A] tracking-wider uppercase">
                  Available for fitting in Paris, New York, or Private Virtual Suite
                </div>
              </div>
            </div>

            <div className="relative min-h-[300px] lg:min-h-[440px]">
              <img
                src={HERO_IMAGE}
                alt="Maison Sérénité Lookbook Vol XIV"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
