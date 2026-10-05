import React, { useState } from 'react';
import { Heart, Eye, Plus, Check } from 'lucide-react';
import { Product, Currency } from '../types/boutique';
import { CURRENCY_RATES } from '../data/products';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'FR 36 / US 4');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imageError, setImageError] = useState(false);

  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const convertedPrice = Math.round(product.priceUSD * rateInfo.rate);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-[#FAF9F5] border border-[#E9E4DC] hover:border-[#D5CEC2] rounded-sm transition-all duration-300 hover:shadow-sm cursor-pointer"
    >
      {/* Visual Slot: 68% of card height on subtle neutral backdrop */}
      <div className="relative w-full aspect-[4/5] bg-[#F2EFE9] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EBE7DF]">
            <span className="font-serif-couture text-lg text-[#5A544A] italic">{product.title}</span>
            <span className="text-xs uppercase tracking-wider text-[#8A847A] mt-2">{product.fabric}</span>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors backdrop-blur-sm ${
            isWishlisted
              ? 'bg-[#18181A] text-white shadow-sm'
              : 'bg-white/80 text-[#5C564D] hover:bg-white hover:text-[#18181A]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Subtle Edition Tag (Clean unboxed text, not pill spam) */}
        <div className="absolute top-3 left-3 bg-[#FAF9F5]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#5A544B] font-medium border border-[#E2DDD5]/60">
          Limited Edition of {product.editionLimit}
        </div>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-[#18181A] py-2 px-3 text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 shadow-sm border border-[#E2DDD5]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Examine Silhouette</span>
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Metadata: Fabric & Provenance (Clean unboxed with dot separator) */}
          <div className="text-[11px] uppercase tracking-wider text-[#8A8377] flex items-center gap-1.5 mb-1.5">
            <span className="truncate max-w-[140px]">{product.origin}</span>
            <span aria-hidden="true">·</span>
            <span>{product.colorName}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif-couture text-lg text-[#18181A] leading-snug group-hover:text-[#6E5748] transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-[#736C61] line-clamp-1 mt-1 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-2 border-t border-[#EFECE6] flex items-center justify-between">
          <div className="text-base font-semibold text-[#18181A] tabular-nums tracking-tight">
            {rateInfo.symbol}{convertedPrice.toLocaleString()}
          </div>

          {/* Inline Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded transition-all flex items-center gap-1.5 ${
              addedAnimation
                ? 'bg-[#2E5E4E] text-white'
                : 'bg-[#18181A] text-white hover:bg-[#333336]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
