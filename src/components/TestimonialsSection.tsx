import React from 'react';
import { ATELIER_TESTIMONIALS } from '../data/products';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF9F5] border-t border-[#E9E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-semibold mb-2">
            Private Patronage
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-couture font-normal text-[#18181A]">
            Words From Our Private Patrons
          </h2>
          <p className="text-xs sm:text-sm text-[#736C61] mt-2">
            Reflections from collectors who have experienced our private salon fittings and limited edition acquisitions.
          </p>
        </div>

        {/* 3 Attributable Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ATELIER_TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-white border border-[#E7E2D8] rounded-sm flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="text-2xl font-serif-couture text-[#8C6D58] mb-3">“</div>
                <p className="font-serif-couture text-lg text-[#18181A] leading-relaxed italic mb-6">
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EFECE6]">
                <div className="text-xs font-semibold text-[#18181A] uppercase tracking-wider">
                  {item.author}
                </div>
                <div className="text-[11px] text-[#787166] mt-0.5">
                  {item.role} · {item.city}
                </div>
                <div className="text-[10px] text-[#8C6D58] uppercase tracking-wider font-mono mt-2">
                  Acquired: {item.verifiedOrder}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
