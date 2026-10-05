import React, { useState } from 'react';
import { ChevronDown, Sparkles, Feather, Scissors, Truck, RefreshCw } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does the limited edition numbering work?",
    answer: "Every silhouette in Maison Sérénité is crafted in an edition of at most 40 pieces. Each item arrives with an individually hand-stamped label and an archival Certificate of Provenance signed by the master tailor who oversaw its construction."
  },
  {
    question: "What is included with complimentary bespoke alterations?",
    answer: "Every acquisition includes complimentary alterations. You may bring your garment to our Paris or New York salons for in-person fitting, or coordinate via our high-definition virtual concierge. Hem adjustments, sleeve tailoring, and waist shaping are performed without charge."
  },
  {
    question: "How are garments shipped and insured?",
    answer: "All orders are dispatched via armored private courier (DHL Express Signature Air or private white-glove messenger in Paris and New York). Every shipment is fully insured up to its acquisition value and requires patron photographic ID upon delivery."
  },
  {
    question: "How should I care for 28-momme French mulberry silk and Biella cashmere?",
    answer: "Mulberry silk should be dry-cleaned by a luxury specialist or gently hand-steamed without direct water droplets. Cashmere should be aired between wearings on cedar hangers; natural lanolin helps resist odors and preserve the soft hand over decades."
  },
  {
    question: "What is the return and exchange policy?",
    answer: "We offer complimentary worldwide returns and size exchanges within 30 days of acquisition. Garments must remain in un-worn condition with the numbered seal intact."
  }
];

export const ClientCareSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="care" className="py-20 lg:py-28 bg-[#FAF9F5] border-t border-[#E9E4DC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-semibold mb-2">
            The Patron Service
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-couture font-normal text-[#18181A]">
            Client Care & Atelier Guarantees
          </h2>
          <p className="text-xs sm:text-sm text-[#736C61] mt-2">
            Everything you need to know regarding acquisitions, bespoke alterations, and lifetime preservation.
          </p>
        </div>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="p-4 bg-white border border-[#E7E2D8] rounded text-center space-y-2">
            <Truck className="w-5 h-5 text-[#18181A] mx-auto" />
            <div className="text-xs font-semibold uppercase tracking-wider text-[#18181A]">Insured Dispatch</div>
            <div className="text-[11px] text-[#736C61]">Armored global air courier on all acquisitions</div>
          </div>

          <div className="p-4 bg-white border border-[#E7E2D8] rounded text-center space-y-2">
            <Scissors className="w-5 h-5 text-[#18181A] mx-auto" />
            <div className="text-xs font-semibold uppercase tracking-wider text-[#18181A]">Atelier Alterations</div>
            <div className="text-[11px] text-[#736C61]">Complimentary tailoring in Paris & New York</div>
          </div>

          <div className="p-4 bg-white border border-[#E7E2D8] rounded text-center space-y-2">
            <Sparkles className="w-5 h-5 text-[#18181A] mx-auto" />
            <div className="text-xs font-semibold uppercase tracking-wider text-[#18181A]">Limited Editions</div>
            <div className="text-[11px] text-[#736C61]">Strict limit of 40 pieces per silhouette</div>
          </div>

          <div className="p-4 bg-white border border-[#E7E2D8] rounded text-center space-y-2">
            <RefreshCw className="w-5 h-5 text-[#18181A] mx-auto" />
            <div className="text-xs font-semibold uppercase tracking-wider text-[#18181A]">30-Day Returns</div>
            <div className="text-[11px] text-[#736C61]">Complimentary worldwide return courier</div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E5DFD4] bg-white rounded-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="font-serif-couture text-lg text-[#18181A]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C8477] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#18181A]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C564D] leading-relaxed border-t border-[#F2EEE7]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
