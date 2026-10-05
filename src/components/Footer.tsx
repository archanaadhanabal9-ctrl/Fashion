import React, { useState } from 'react';
import { Mail, ArrowRight, Check, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onNavigateSection
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#141416] text-[#FAF9F5] border-t border-[#242428] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#29292F]">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <a href="#hero" className="text-2xl font-serif-couture font-medium tracking-[0.2em] text-white">
              MAISON SÉRÉNITÉ
            </a>
            <p className="text-xs text-[#9E978C] leading-relaxed font-light">
              Haute couture ready-to-wear and bespoke tailoring atelier. Limited to forty numbered editions per silhouette.
            </p>
            <div className="pt-2 text-[11px] text-[#A8A196] space-y-1">
              <div>Member of the Syndicat de la Couture Parisienne</div>
              <div>Registered Haute Façon Atelier</div>
            </div>
          </div>

          {/* Salons */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C7BDB1] font-semibold">
              Our Salons
            </div>
            <div className="text-xs text-[#B3ACA0] space-y-3 font-light">
              <div>
                <div className="text-white font-medium">Paris Flagship Atelier</div>
                <div>14 Place Vendôme, 75001 Paris</div>
                <div className="text-[11px] text-[#80796E]">+33 1 42 68 00 24</div>
              </div>

              <div>
                <div className="text-white font-medium">New York Salon</div>
                <div>680 Madison Avenue, New York, NY 10065</div>
                <div className="text-[11px] text-[#80796E]">+1 212 555 0192</div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C7BDB1] font-semibold">
              Client Services
            </div>
            <ul className="text-xs text-[#B3ACA0] space-y-2 font-light">
              <li>
                <button
                  onClick={() => onNavigateSection('collections')}
                  className="hover:text-white transition-colors"
                >
                  Haute Couture Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors"
                >
                  Schedule Salon Fitting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('atelier')}
                  className="hover:text-white transition-colors"
                >
                  Fabric & Loom Provenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('care')}
                  className="hover:text-white transition-colors"
                >
                  Complimentary Alterations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('care')}
                  className="hover:text-white transition-colors"
                >
                  Insured Global Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C7BDB1] font-semibold">
              Privilege Salon Register
            </div>
            <p className="text-xs text-[#9E978C] font-light leading-relaxed">
              Receive private invitations to seasonal salon previews and private couture trunk shows.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter private email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#212124] border border-[#3A3A40] rounded text-white focus:outline-none focus:border-[#C7BDB1] placeholder:text-[#6E685F]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-white text-[#18181A] hover:bg-[#EFECE6] rounded text-xs font-semibold uppercase tracking-wider flex items-center transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 bg-[#1F2B24] border border-[#2E5E4E] rounded text-xs text-[#8CD1B0] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You are inscribed on the Salon Registry.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7367] gap-4">
          <div>
            © {new Date().getFullYear()} Maison Sérénité Haute Couture. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#B3ACA0] transition-colors cursor-pointer">Privacy Charter</span>
            <span className="hover:text-[#B3ACA0] transition-colors cursor-pointer">Terms of Acquisition</span>
            <span className="hover:text-[#B3ACA0] transition-colors cursor-pointer">Ethics & Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
