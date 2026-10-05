import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product, Currency } from '../types/boutique';
import { CURRENCY_RATES } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  wishlistProducts: Product[];
  currency: Currency;
  onClose: () => void;
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onExploreCollections: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  wishlistProducts,
  currency,
  onClose,
  onRemoveFromWishlist,
  onMoveToCart,
  onExploreCollections
}) => {
  if (!isOpen) return null;

  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#E2DDD5] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E9E4DC] flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D58] font-medium">
                Saved Curations
              </div>
              <h2 className="text-xl font-serif-couture font-normal text-[#18181A]">
                The Wishlist ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#736C61] hover:text-[#18181A] rounded-full hover:bg-[#EFECE6] transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center justify-center">
                <Heart className="w-10 h-10 text-[#C7BDB1] mb-3 stroke-1" />
                <p className="font-serif-couture text-2xl text-[#18181A] mb-2">
                  No saved silhouettes
                </p>
                <p className="text-xs text-[#736C61] max-w-xs mb-6">
                  Save pieces to monitor availability in our limited edition runs of 40 pieces.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreCollections();
                  }}
                  className="px-6 py-3 bg-[#18181A] text-white text-xs uppercase tracking-widest font-medium rounded hover:bg-[#333336] transition-colors"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => {
                const convertedPrice = Math.round(product.priceUSD * rateInfo.rate);
                return (
                  <div
                    key={product.id}
                    className="flex gap-4 pb-6 border-b border-[#ECE7DE]"
                  >
                    <div className="w-20 h-24 bg-[#EFECE6] rounded-xs overflow-hidden shrink-0 border border-[#E2DDD5]">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif-couture text-base text-[#18181A] leading-snug">
                            {product.title}
                          </h4>
                          <button
                            onClick={() => onRemoveFromWishlist(product)}
                            className="text-[#9C9487] hover:text-[#992222] p-1 transition-colors"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-[#7A7366] mt-0.5">
                          {product.origin}
                        </div>
                        <div className="text-sm font-semibold text-[#18181A] tabular-nums mt-1">
                          {rateInfo.symbol}{convertedPrice.toLocaleString()}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            onMoveToCart(product);
                            onRemoveFromWishlist(product);
                          }}
                          className="w-full py-2 bg-[#18181A] hover:bg-[#333336] text-white text-xs uppercase tracking-wider font-medium rounded transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 border-t border-[#E9E4DC] bg-[#FAF9F5]">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => onMoveToCart(p));
                  onClose();
                }}
                className="w-full py-3.5 bg-[#18181A] text-white text-xs uppercase tracking-[0.16em] font-semibold rounded hover:bg-[#2C2C2E] transition-all flex items-center justify-center gap-2"
              >
                <span>Move All Available To Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
