import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Gift, Check, Tag } from 'lucide-react';
import { CartItem, Currency } from '../types/boutique';
import { CURRENCY_RATES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  currency: Currency;
  onClose: () => void;
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onProceedToCheckout: (appliedDiscount: number, giftBox: boolean) => void;
  onExploreCollections: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  currency,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCollections
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [giftBox, setGiftBox] = useState(true);

  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;

  // Subtotal in USD
  const subtotalUSD = items.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const subtotal = Math.round(subtotalUSD * rateInfo.rate);

  // Discount calculation
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'SERENITE10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Privilege Atelier discount applied');
    } else if (code === 'VIP20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Private Salon Client discount applied');
    } else {
      setPromoError('Invalid privilege code. Try SERENITE10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#E2DDD5] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E9E4DC] flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D58] font-medium">
                Your Acquisition
              </div>
              <h2 className="text-xl font-serif-couture font-normal text-[#18181A]">
                The Shopping Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#736C61] hover:text-[#18181A] rounded-full hover:bg-[#EFECE6] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Courier Notice */}
          <div className="bg-[#F4EFE6] px-6 py-2.5 border-b border-[#E7E0D3] text-xs text-[#5C564D] flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium text-[#2E5E4E]">
              <Check className="w-3.5 h-3.5" />
              Complimentary White-Glove Insured Courier
            </span>
            <span className="text-[11px] uppercase tracking-wider text-[#8A847A]">Worldwide</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center justify-center">
                <p className="font-serif-couture text-2xl text-[#18181A] mb-2">
                  Your bag is empty
                </p>
                <p className="text-xs text-[#736C61] max-w-xs mb-6">
                  Explore our numbered silhouettes, handcrafted in limited editions of 40 pieces.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreCollections();
                  }}
                  className="px-6 py-3 bg-[#18181A] text-white text-xs uppercase tracking-widest font-medium rounded hover:bg-[#333336] transition-colors"
                >
                  Explore The Collection
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice = Math.round(item.product.priceUSD * rateInfo.rate);
                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4 pb-6 border-b border-[#ECE7DE]"
                  >
                    <div className="w-20 h-24 bg-[#EFECE6] rounded-xs overflow-hidden shrink-0 border border-[#E2DDD5]">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif-couture text-base text-[#18181A] leading-snug">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                            className="text-[#9C9487] hover:text-[#992222] p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-[#7A7366] mt-0.5">
                          Size: <span className="font-medium text-[#18181A]">{item.selectedSize}</span>
                        </div>
                        <div className="text-[11px] text-[#8C8477]">
                          Color: {item.product.colorName}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#DDD7CD] bg-white rounded text-xs">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.selectedSize,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="px-2 py-1 hover:bg-[#F3EFE9] text-[#18181A]"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-1 font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.quantity + 1
                              )
                            }
                            className="px-2 py-1 hover:bg-[#F3EFE9] text-[#18181A]"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-sm font-semibold text-[#18181A] tabular-nums">
                          {rateInfo.symbol}{(itemPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Gift Box Checkbox */}
            {items.length > 0 && (
              <div className="bg-[#F5F2EB] p-3.5 rounded border border-[#E5DFD4] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Gift className="w-4 h-4 text-[#8C6D58]" />
                  <div>
                    <div className="text-xs font-medium text-[#18181A]">Signature Gift Packaging</div>
                    <div className="text-[11px] text-[#736C61]">Embossed presentation box with silk ribbon</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={giftBox}
                  onChange={(e) => setGiftBox(e.target.checked)}
                  className="rounded border-[#CCC5B8] text-[#18181A] focus:ring-0 cursor-pointer"
                />
              </div>
            )}

            {/* Privilege Code */}
            {items.length > 0 && (
              <div className="pt-2">
                <label className="text-[11px] uppercase tracking-wider text-[#665F54] font-medium block mb-1">
                  Privilege / Salon Invitation Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9A9387]" />
                    <input
                      type="text"
                      placeholder="e.g. SERENITE10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A] uppercase tracking-wider text-[#18181A]"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 bg-[#EAE6DF] hover:bg-[#DDD7CD] text-[#18181A] text-xs uppercase tracking-wider font-medium rounded transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && (
                  <p className="text-[11px] text-[#2E5E4E] font-medium mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> {promoSuccess}
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-[#992222] mt-1">{promoError}</p>
                )}
              </div>
            )}
          </div>

          {/* Footer & Totals */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E9E4DC] bg-[#FAF9F5] space-y-4">
              <div className="space-y-1.5 text-xs text-[#5C564D]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#18181A]">
                    {rateInfo.symbol}{subtotal.toLocaleString()}
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#2E5E4E] font-medium">
                    <span>Privilege Discount ({discountPercent}%)</span>
                    <span className="tabular-nums">
                      -{rateInfo.symbol}{discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Global Courier</span>
                  <span className="text-[#2E5E4E] font-medium uppercase text-[11px]">
                    Complimentary
                  </span>
                </div>

                <div className="pt-2 border-t border-[#EAE5DC] flex justify-between text-base font-serif-couture font-medium text-[#18181A]">
                  <span>Total Due</span>
                  <span className="tabular-nums">
                    {rateInfo.symbol}{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => onProceedToCheckout(discountAmount, giftBox)}
                className="w-full py-3.5 bg-[#18181A] hover:bg-[#2C2C2E] text-white text-xs uppercase tracking-[0.16em] font-semibold rounded transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed To Atelier Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C8477]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted 256-bit Couture Transaction Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
