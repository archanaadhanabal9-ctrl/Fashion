import React, { useState } from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  if (!isOpen) return null;

  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  const SIZE_DATA = [
    { fr: 'FR 34', us: 'US 2', uk: 'UK 6', it: 'IT 38', bustCm: '82', waistCm: '62', hipCm: '88', bustIn: '32.3', waistIn: '24.4', hipIn: '34.6' },
    { fr: 'FR 36', us: 'US 4', uk: 'UK 8', it: 'IT 40', bustCm: '86', waistCm: '66', hipCm: '92', bustIn: '33.8', waistIn: '26.0', hipIn: '36.2' },
    { fr: 'FR 38', us: 'US 6', uk: 'UK 10', it: 'IT 42', bustCm: '90', waistCm: '70', hipCm: '96', bustIn: '35.4', waistIn: '27.5', hipIn: '37.8' },
    { fr: 'FR 40', us: 'US 8', uk: 'UK 12', it: 'IT 44', bustCm: '94', waistCm: '74', hipCm: '100', bustIn: '37.0', waistIn: '29.1', hipIn: '39.4' },
    { fr: 'FR 42', us: 'US 10', uk: 'UK 14', it: 'IT 46', bustCm: '98', waistCm: '78', hipCm: '104', bustIn: '38.6', waistIn: '30.7', hipIn: '40.9' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#FAF9F5] border border-[#E2DDD5] shadow-2xl rounded-sm p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#736C61] hover:text-[#18181A] rounded-full transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C6D58] mb-2 font-medium">
          <Ruler className="w-4 h-4" />
          <span>Atelier Precision Sizing</span>
        </div>

        <h3 className="text-2xl font-serif-couture font-normal text-[#18181A] mb-2">
          International Proportion Guide
        </h3>
        <p className="text-xs sm:text-sm text-[#736C61] font-light mb-6">
          All silhouettes are tailored according to classic French haute couture proportions. Every order includes complimentary bespoke adjustments upon request.
        </p>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-wider text-[#5A544A] font-medium">Measurement Scale</span>
          <div className="flex bg-[#EFECE6] p-0.5 rounded border border-[#DDD7CD]">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                unit === 'cm' ? 'bg-white text-[#18181A] shadow-xs' : 'text-[#6A6357]'
              }`}
            >
              Centimeters (cm)
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                unit === 'in' ? 'bg-white text-[#18181A] shadow-xs' : 'text-[#6A6357]'
              }`}
            >
              Inches (in)
            </button>
          </div>
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto border border-[#E5E0D7] bg-white rounded">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F6F3EC] text-[#5A544B] border-b border-[#E5E0D7] uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">France</th>
                <th className="py-2.5 px-3">USA</th>
                <th className="py-2.5 px-3">UK</th>
                <th className="py-2.5 px-3">Italy</th>
                <th className="py-2.5 px-3">Bust</th>
                <th className="py-2.5 px-3">Waist</th>
                <th className="py-2.5 px-3">Hips</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6] text-[#2C2925] tabular-nums">
              {SIZE_DATA.map((row) => (
                <tr key={row.fr} className="hover:bg-[#FAF9F5]">
                  <td className="py-2.5 px-3 font-semibold">{row.fr}</td>
                  <td className="py-2.5 px-3">{row.us}</td>
                  <td className="py-2.5 px-3">{row.uk}</td>
                  <td className="py-2.5 px-3">{row.it}</td>
                  <td className="py-2.5 px-3 font-mono">{unit === 'cm' ? `${row.bustCm} cm` : `${row.bustIn}"`}</td>
                  <td className="py-2.5 px-3 font-mono">{unit === 'cm' ? `${row.waistCm} cm` : `${row.waistIn}"`}</td>
                  <td className="py-2.5 px-3 font-mono">{unit === 'cm' ? `${row.hipCm} cm` : `${row.hipIn}"`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bespoke Fit Callout */}
        <div className="mt-6 p-4 bg-[#F5F2EA] rounded border border-[#E5DFD4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#18181A] uppercase tracking-wider">
              Require Custom Alterations or Bespoke Sizing?
            </div>
            <div className="text-xs text-[#70695E] mt-0.5">
              Submit your bespoke measurements or schedule a private fitting with our Paris or New York salon tailors.
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="px-4 py-2 bg-[#18181A] text-white text-xs uppercase tracking-wider font-medium rounded hover:bg-[#333336] transition-colors whitespace-nowrap"
          >
            Request Bespoke Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
