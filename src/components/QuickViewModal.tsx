import React, { useState } from 'react';
import { X, Check, ShieldCheck, Ruler, Truck, Sparkles, Heart } from 'lucide-react';
import { Product, Currency } from '../types/boutique';
import { CURRENCY_RATES } from '../data/products';

interface QuickViewModalProps {
  product: Product | null;
  currency: Currency;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: () => void;
  onOpenBooking: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  currency,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onOpenSizeGuide,
  onOpenBooking
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'FR 36 / US 4');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const convertedPrice = Math.round(product.priceUSD * rateInfo.rate);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#FAF9F5] border border-[#E2DDD5] shadow-2xl rounded-sm overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#736C61] hover:text-[#18181A] bg-white/80 backdrop-blur-sm rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Gallery */}
          <div className="p-6 sm:p-8 bg-[#F3EFE9] flex flex-col justify-between">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/40 border border-[#E5E0D7] rounded-sm">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-[#FAF9F5]/90 px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#5A544B] border border-[#E2DDD5]/70">
                Color: {product.colorName}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex items-center gap-3 mt-4">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-20 rounded overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-[#18181A]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Provenance Badge */}
            <div className="mt-6 pt-4 border-t border-[#E2DDD5] text-xs text-[#7A7366] flex items-center justify-between">
              <span>{product.origin}</span>
              <span className="font-serif-couture italic text-sm text-[#18181A]">Edition of {product.editionLimit}</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-[#8A8377] uppercase tracking-wider mb-2">
                <span>{product.fabric}</span>
                <span className="text-[#2E5E4E] font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" /> In Atelier Inventory
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl font-serif-couture font-normal text-[#18181A] leading-tight mb-2">
                {product.title}
              </h2>
              <p className="text-sm text-[#736C61] font-light leading-relaxed mb-4">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="text-2xl font-serif-couture font-medium text-[#18181A] tabular-nums mb-6">
                {rateInfo.symbol}{convertedPrice.toLocaleString()}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed mb-6 border-b border-[#EAE5DC] pb-6">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider text-[#18181A] font-medium">
                    Select Silhouette Size
                  </label>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-[#8C6D58] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size & Measurement Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 text-xs font-medium border rounded transition-all ${
                        selectedSize === size
                          ? 'border-[#18181A] bg-[#18181A] text-[#FAF9F5]'
                          : 'border-[#DDD7CC] bg-white text-[#5C564D] hover:border-[#8C8476]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Craftsmanship Highlights */}
              <div className="space-y-2 mb-6 bg-[#F6F3EC] p-3.5 rounded border border-[#ECE6DC]">
                <div className="text-xs font-medium text-[#18181A] uppercase tracking-wider mb-1">
                  Atelier Craftsmanship
                </div>
                {product.details.map((detail, idx) => (
                  <div key={idx} className="text-xs text-[#635D53] flex items-start gap-2">
                    <span className="text-[#8C6D58] font-bold">·</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contiguous Action Controls */}
            <div className="space-y-3 pt-4 border-t border-[#EAE5DC]">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#DDD7CD] bg-white rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs hover:bg-[#F3EFE9] text-[#18181A] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-medium tabular-nums min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs hover:bg-[#F3EFE9] text-[#18181A] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add To Bag Primary CTA */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 text-xs uppercase tracking-[0.16em] font-semibold rounded transition-all flex items-center justify-center gap-2 ${
                    addedSuccess
                      ? 'bg-[#2E5E4E] text-white'
                      : 'bg-[#18181A] hover:bg-[#2C2C2E] text-[#FAF9F5]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Your Bag</span>
                    </>
                  ) : (
                    <span>Add To Bag · {rateInfo.symbol}{(convertedPrice * quantity).toLocaleString()}</span>
                  )}
                </button>

                {/* Wishlist Icon */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 border rounded transition-colors ${
                    isWishlisted
                      ? 'border-[#18181A] bg-[#18181A] text-white'
                      : 'border-[#DDD7CD] bg-white text-[#5C564D] hover:text-[#18181A]'
                  }`}
                  aria-label="Wishlist item"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Bespoke Fitting Option */}
              <div className="flex items-center justify-between text-[11px] text-[#7A7366] pt-2">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#8C6D58]" />
                  Complimentary worldwide insured dispatch
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="text-[#18181A] font-medium hover:underline"
                >
                  Book Private Fitting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
