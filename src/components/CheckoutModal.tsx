import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, CreditCard, Lock, ArrowLeft } from 'lucide-react';
import { CartItem, Currency, Order } from '../types/boutique';
import { CURRENCY_RATES } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  currency: Currency;
  discountAmount: number;
  giftBox: boolean;
  onClose: () => void;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  items,
  currency,
  discountAmount,
  giftBox,
  onClose,
  onOrderComplete
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form State
  const [fullName, setFullName] = useState('Archana Adhanabal');
  const [email, setEmail] = useState('archanaadhanabal9@gmail.com');
  const [phone, setPhone] = useState('+1 (555) 382-9102');
  const [street, setStreet] = useState('742 Evergreen Terrace, Suite 4B');
  const [city, setCity] = useState('New York');
  const [postalCode, setPostalCode] = useState('10021');
  const [country, setCountry] = useState('United States');
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'salon'>('courier');

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'concierge'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [cardHolder, setCardHolder] = useState('Archana Adhanabal');
  const [isProcessing, setIsProcessing] = useState(false);

  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const subtotalUSD = items.reduce((acc, i) => acc + i.product.priceUSD * i.quantity, 0);
  const subtotal = Math.round(subtotalUSD * rateInfo.rate);
  const total = Math.max(0, subtotal - discountAmount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `MS-PARIS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: Order = {
        orderId,
        items,
        subtotal,
        discount: discountAmount,
        total,
        currency,
        shippingAddress: {
          fullName,
          email,
          street,
          city,
          postalCode,
          country
        },
        giftBox,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      setCompletedOrder(newOrder);
      setIsProcessing(false);
      setStep('confirmation');
      onOrderComplete(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAF9F5] border border-[#E2DDD5] shadow-2xl rounded-sm overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-[#18181A] text-[#FAF9F5] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#C7BDB1]">
              Maison Sérénité Atelier
            </div>
            <h2 className="text-xl font-serif-couture font-light text-white">
              Private Client Acquisition Checkout
            </h2>
          </div>
          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              className="text-[#B5ACA0] hover:text-white p-1 rounded transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step 1: Details */}
        {step === 'details' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep('payment');
            }}
            className="p-6 sm:p-8 space-y-6"
          >
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[#8C6D58] font-semibold mb-3">
                1. Delivery & Recipient Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#5A544A] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#5A544A] block mb-1">Email Address (for Certificate of Provenance)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#5A544A] block mb-1">Phone Number (Courier Dispatch SMS)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#5A544A] block mb-1">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                  >
                    <option value="United States">United States</option>
                    <option value="France">France</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Italy">Italy</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-[#5A544A] block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#5A544A] block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#5A544A] block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method Selector */}
            <div className="pt-4 border-t border-[#EAE5DC]">
              <h4 className="text-xs uppercase tracking-widest text-[#8C6D58] font-semibold mb-3">
                Dispatch Preference
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setDeliveryMethod('courier')}
                  className={`p-3.5 border rounded cursor-pointer transition-all flex items-start gap-3 ${
                    deliveryMethod === 'courier'
                      ? 'border-[#18181A] bg-white shadow-xs'
                      : 'border-[#DDD7CD] bg-[#F7F4EE]'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === 'courier'}
                    onChange={() => setDeliveryMethod('courier')}
                    className="mt-0.5 text-[#18181A]"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#18181A]">Complimentary Global Armored Courier</div>
                    <div className="text-[11px] text-[#70695E]">Dispatched via DHL Express Signature Air (2-3 business days)</div>
                  </div>
                </label>

                <label
                  onClick={() => setDeliveryMethod('salon')}
                  className={`p-3.5 border rounded cursor-pointer transition-all flex items-start gap-3 ${
                    deliveryMethod === 'salon'
                      ? 'border-[#18181A] bg-white shadow-xs'
                      : 'border-[#DDD7CD] bg-[#F7F4EE]'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === 'salon'}
                    onChange={() => setDeliveryMethod('salon')}
                    className="mt-0.5 text-[#18181A]"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#18181A]">Salon Collection & Fitting</div>
                    <div className="text-[11px] text-[#70695E]">Collect at Paris Place Vendôme or NYC Madison Ave</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Summary Line */}
            <div className="p-4 bg-[#F3EFE7] rounded border border-[#E5DFD4] flex items-center justify-between text-xs">
              <div>
                <span className="text-[#5A544A]">Total Acquisition: </span>
                <span className="font-semibold text-[#18181A]">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
                {giftBox && <span className="text-[#8C6D58] ml-2">· Signature Gift Box Included</span>}
              </div>
              <div className="text-base font-serif-couture font-semibold text-[#18181A] tabular-nums">
                {rateInfo.symbol}{total.toLocaleString()}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs uppercase tracking-wider text-[#5A544B] hover:text-[#18181A]"
              >
                Return To Bag
              </button>
              <button
                type="submit"
                className="px-7 py-3 bg-[#18181A] text-white text-xs uppercase tracking-[0.16em] font-semibold rounded hover:bg-[#333336] transition-colors"
              >
                Proceed To Payment
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE5DC]">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-[#7A7366] hover:text-[#18181A] flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Delivery Details
              </button>
              <span className="text-xs uppercase tracking-wider text-[#8C6D58] font-semibold">
                Step 2 of 2: Payment
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-[#5A544B] font-medium block">
                Select Settlement Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 text-left border rounded transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#18181A] bg-white shadow-xs'
                      : 'border-[#DDD7CD] bg-[#F7F4EE]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#18181A] mb-1" />
                  <div className="text-xs font-semibold text-[#18181A]">Credit / Debit</div>
                  <div className="text-[10px] text-[#756E62]">Visa, Mastercard, Amex</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('concierge')}
                  className={`p-3 text-left border rounded transition-all ${
                    paymentMethod === 'concierge'
                      ? 'border-[#18181A] bg-white shadow-xs'
                      : 'border-[#DDD7CD] bg-[#F7F4EE]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#8C6D58] mb-1" />
                  <div className="text-xs font-semibold text-[#18181A]">Atelier Concierge</div>
                  <div className="text-[10px] text-[#756E62]">Private Banker Invoice</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire')}
                  className={`p-3 text-left border rounded transition-all ${
                    paymentMethod === 'wire'
                      ? 'border-[#18181A] bg-white shadow-xs'
                      : 'border-[#DDD7CD] bg-[#F7F4EE]'
                  }`}
                >
                  <Lock className="w-4 h-4 text-[#2E5E4E] mb-1" />
                  <div className="text-xs font-semibold text-[#18181A]">Bank Wire Transfer</div>
                  <div className="text-[10px] text-[#756E62]">SWIFT / SEPA in Paris</div>
                </button>
              </div>
            </div>

            {/* Credit Card Fields */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 bg-white p-4 rounded border border-[#E5DFD4]">
                <div>
                  <label className="text-xs text-[#5A544A] block mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#5A544A] block mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A] font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#5A544A] block mb-1">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#5A544A] block mb-1">Security Code (CVC)</label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A] font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'concierge' && (
              <div className="bg-[#F5F2EB] p-4 rounded border border-[#E5DFD4] text-xs text-[#635D53] leading-relaxed">
                Your private atelier concierge will connect with you via secure email (<span className="font-semibold text-[#18181A]">{email}</span>) within 2 hours to confirm measurement preferences and coordinate private courier delivery.
              </div>
            )}

            {paymentMethod === 'wire' && (
              <div className="bg-[#F5F2EB] p-4 rounded border border-[#E5DFD4] text-xs text-[#635D53] leading-relaxed space-y-1">
                <div><span className="font-semibold text-[#18181A]">Beneficiary:</span> Maison Sérénité Haute Couture SAS</div>
                <div><span className="font-semibold text-[#18181A]">IBAN:</span> FR76 3000 4001 2345 6789 0123 456</div>
                <div><span className="font-semibold text-[#18181A]">BIC / SWIFT:</span> BNPAFRPP</div>
                <div className="text-[11px] text-[#8C6D58] pt-1">Your order will be reserved in Paris inventory immediately.</div>
              </div>
            )}

            {/* Total Due Banner */}
            <div className="p-4 bg-[#18181A] text-white rounded flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#BDB5A9]">Authorized Amount</div>
                <div className="text-xs text-[#A8A094]">Complimentary worldwide insured dispatch</div>
              </div>
              <div className="text-2xl font-serif-couture font-medium tabular-nums">
                {rateInfo.symbol}{total.toLocaleString()}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-[#18181A] hover:bg-[#2C2C2E] disabled:bg-[#666] text-white text-xs uppercase tracking-[0.16em] font-semibold rounded transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Registering Acquisition in Paris...</span>
              ) : (
                <span>Confirm Acquisition · {rateInfo.symbol}{total.toLocaleString()}</span>
              )}
            </button>
          </form>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirmation' && completedOrder && (
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-14 h-14 bg-[#2E5E4E] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <Check className="w-7 h-7" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-semibold mb-1">
                Acquisition Confirmed
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-couture text-[#18181A]">
                Thank You, {completedOrder.shippingAddress.fullName}
              </h3>
              <p className="text-xs sm:text-sm text-[#736C61] mt-2 max-w-md mx-auto">
                Your order is officially registered with the atelier. A numbered Certificate of Provenance is currently being hand-inscribed.
              </p>
            </div>

            {/* Order Card */}
            <div className="bg-[#F5F2EB] p-6 rounded border border-[#E5DFD4] max-w-lg mx-auto text-left space-y-4">
              <div className="flex items-center justify-between border-b border-[#E0D9CD] pb-3 text-xs">
                <span className="text-[#6A6357]">Order Identifier:</span>
                <span className="font-mono font-bold text-[#18181A]">{completedOrder.orderId}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E0D9CD] pb-3 text-xs">
                <span className="text-[#6A6357]">Date:</span>
                <span className="text-[#18181A]">{completedOrder.date}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E0D9CD] pb-3 text-xs">
                <span className="text-[#6A6357]">Delivery Destination:</span>
                <span className="text-[#18181A] text-right font-medium">
                  {completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.country}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#6A6357]">Total Settled:</span>
                <span className="font-serif-couture text-lg font-semibold text-[#18181A] tabular-nums">
                  {rateInfo.symbol}{completedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#18181A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#333336] transition-colors"
              >
                Return To Atelier Showcase
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
