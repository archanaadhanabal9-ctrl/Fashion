/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, Currency, Appointment, Order } from './types/boutique';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CollectionCatalog } from './components/CollectionCatalog';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { BespokeBookingModal } from './components/BespokeBookingModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AtelierStorySection } from './components/AtelierStorySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ClientCareSection } from './components/ClientCareSection';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';

const STORAGE_KEY_CART = 'maison_serenite_cart_v1';
const STORAGE_KEY_WISHLIST = 'maison_serenite_wishlist_v1';
const STORAGE_KEY_CURRENCY = 'maison_serenite_currency_v1';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENCY);
      return (saved as Currency) || 'USD';
    } catch {
      return 'USD';
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
      return saved ? JSON.parse(saved) : ['ms-01'];
    } catch {
      return ['ms-01'];
    }
  });

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutGiftBox, setCheckoutGiftBox] = useState(true);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENCY, currency);
    } catch (e) {
      console.warn('Failed to save currency to localStorage', e);
    }
  }, [currency]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, selectedSize: size, quantity }];
    });
    showToast(`Added ${product.title} (${size}) to your bag`);
  };

  const handleUpdateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed ${product.title} from Wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.title} to your Wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product, product.sizes[0] || 'FR 36 / US 4', 1);
  };

  // Checkout flow
  const handleProceedToCheckout = (appliedDiscount: number, giftBox: boolean) => {
    setCheckoutDiscount(appliedDiscount);
    setCheckoutGiftBox(giftBox);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (order: Order) => {
    // Clear bag on successful purchase
    setCart([]);
    showToast(`Acquisition ${order.orderId} registered in Paris!`);
  };

  // Salon Appointment
  const handleConfirmAppointment = (appt: Appointment) => {
    showToast(`Fitting reserved at ${appt.salonLocation} for ${appt.date}`);
  };

  // Section Navigation
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1A1A] flex flex-col font-sans-body selection:bg-[#E2DDD5]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18181A] text-[#FAF9F5] px-4 py-3 rounded shadow-xl text-xs uppercase tracking-wider font-medium flex items-center gap-2.5 border border-[#3A3A40] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Check className="w-4 h-4 text-[#8CD1B0]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreClick={() => scrollToSection('collections')}
          onBookClick={() => setIsBookingOpen(true)}
        />

        {/* Collections Catalog Grid */}
        <CollectionCatalog
          products={products}
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p, size) => handleAddToCart(p, size, 1)}
        />

        {/* The Atelier & Lookbook Story */}
        <AtelierStorySection
          onOpenBooking={() => setIsBookingOpen(true)}
          onExploreCollections={() => scrollToSection('collections')}
        />

        {/* Patron Reviews */}
        <TestimonialsSection />

        {/* Client Care & Guarantees */}
        <ClientCareSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => setIsBookingOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Quick View PDP Modal */}
      <QuickViewModal
        product={quickViewProduct}
        currency={currency}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onOpenBooking={() => {
          setIsSizeGuideOpen(false);
          setIsBookingOpen(true);
        }}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        currency={currency}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        onExploreCollections={() => scrollToSection('collections')}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        wishlistProducts={wishlistProducts}
        currency={currency}
        onClose={() => setIsWishlistOpen(false)}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
        onExploreCollections={() => scrollToSection('collections')}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cart}
        currency={currency}
        discountAmount={checkoutDiscount}
        giftBox={checkoutGiftBox}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={handleOrderComplete}
      />

      {/* Bespoke Fitting Reservation Modal */}
      <BespokeBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onConfirmAppointment={handleConfirmAppointment}
      />
    </div>
  );
}
