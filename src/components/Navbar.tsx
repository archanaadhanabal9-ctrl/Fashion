import React, { useState } from 'react';
import { ShoppingBag, Heart, Calendar, Menu, X, ChevronDown, Check } from 'lucide-react';
import { Currency } from '../types/boutique';
import { CURRENCY_RATES } from '../data/products';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenBooking: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  currency,
  onCurrencyChange,
  onOpenCart,
  onOpenWishlist,
  onOpenBooking,
  onNavigateSection
}) => {
  const [showPromo, setShowPromo] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E7E3DC] transition-all">
      {/* Slim Promotional Bar (<= 40px) */}
      {showPromo && (
        <div className="bg-[#18181A] text-[#FAF9F5] px-4 py-2 text-xs tracking-wider uppercase font-medium flex items-center justify-between">
          <div className="mx-auto flex items-center gap-2">
            <span>Complimentary Insured Courier & Atelier Alterations On All Orders</span>
            <span className="text-[#A29A8E] hidden sm:inline">· Privilege Code: <span className="text-white underline">SERENITE10</span> for 10% Off</span>
          </div>
          <button
            onClick={() => setShowPromo(false)}
            className="text-[#9E978C] hover:text-white transition-colors p-1"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-6 Clean Nav Links) — Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#18181A] p-2 hover:bg-[#EFECE6] rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="text-2xl sm:text-3xl font-serif-couture font-medium tracking-[0.18em] text-[#18181A] hover:opacity-85 transition-opacity"
          >
            MAISON SÉRÉNITÉ
          </a>
        </div>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.15em] text-[#5C564D] font-medium">
          <button
            onClick={() => handleNavClick('collections')}
            className="hover:text-[#18181A] transition-colors relative py-1 hover:underline underline-offset-8"
          >
            Collections
          </button>
          <button
            onClick={() => handleNavClick('atelier')}
            className="hover:text-[#18181A] transition-colors relative py-1 hover:underline underline-offset-8"
          >
            The Atelier
          </button>
          <button
            onClick={onOpenBooking}
            className="hover:text-[#18181A] transition-colors relative py-1 hover:underline underline-offset-8"
          >
            Bespoke Fitting
          </button>
          <button
            onClick={() => handleNavClick('lookbook')}
            className="hover:text-[#18181A] transition-colors relative py-1 hover:underline underline-offset-8"
          >
            Lookbook
          </button>
          <button
            onClick={() => handleNavClick('care')}
            className="hover:text-[#18181A] transition-colors relative py-1 hover:underline underline-offset-8"
          >
            Client Care
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 text-xs uppercase tracking-wider text-[#5C564D] hover:text-[#18181A] px-2 py-1.5 rounded border border-transparent hover:border-[#E2DDD5] transition-all"
              aria-label="Change currency"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-[#8A847A]" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#FAF9F5] border border-[#E2DDD5] shadow-lg rounded-md py-1 z-50">
                {(Object.keys(CURRENCY_RATES) as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onCurrencyChange(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                      currency === c ? 'bg-[#EFECE6] font-semibold text-[#18181A]' : 'text-[#5C564D] hover:bg-[#F3F0EA]'
                    }`}
                  >
                    <span>{CURRENCY_RATES[c].label}</span>
                    {currency === c && <Check className="w-3 h-3 text-[#18181A]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Book Appointment CTA Button */}
          <button
            onClick={onOpenBooking}
            className="hidden lg:flex items-center gap-2 text-xs uppercase tracking-wider text-[#18181A] hover:bg-[#EFECE6] border border-[#D5CEC2] px-3.5 py-2 rounded transition-colors font-medium whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Salon</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#5C564D] hover:text-[#18181A] transition-colors rounded-full hover:bg-[#EFECE6]"
            aria-label="Open wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#8C6D58] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 bg-[#18181A] text-[#FAF9F5] hover:bg-[#2C2C2E] transition-colors rounded-md flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-medium"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-semibold px-1">
              ({cartCount})
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7E3DC] bg-[#FAF9F5] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm uppercase tracking-widest text-[#18181A]">
            <button
              onClick={() => handleNavClick('collections')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('atelier')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              The Atelier
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="text-left py-2 border-b border-[#EFECE6] flex items-center justify-between"
            >
              <span>Bespoke Fitting</span>
              <span className="text-xs text-[#8C6D58] lowercase font-serif-couture italic">Paris & New York</span>
            </button>
            <button
              onClick={() => handleNavClick('lookbook')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              Lookbook
            </button>
            <button
              onClick={() => handleNavClick('care')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              Client Care
            </button>
          </nav>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#18181A] text-white py-3 text-xs uppercase tracking-widest font-medium rounded text-center"
            >
              Schedule Private Fitting
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
