import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, Sparkles, UserCheck } from 'lucide-react';
import { Appointment } from '../types/boutique';

interface BespokeBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmAppointment: (appt: Appointment) => void;
}

const SALONS = [
  {
    id: 'Paris 8e (Place Vendôme)',
    name: 'Paris Flagship Atelier',
    address: '14 Place Vendôme, 75001 Paris, France',
    hours: '10:00 – 19:00 CET',
  },
  {
    id: 'New York (Madison Avenue)',
    name: 'New York Private Salon',
    address: '680 Madison Avenue, New York, NY 10065',
    hours: '10:00 – 18:30 EST',
  },
  {
    id: 'Virtual Private Salon',
    name: 'High-Definition Virtual Styling Suite',
    address: 'Worldwide Encrypted Video Consultation & Fabric Swatch Delivery',
    hours: 'Available across all time zones',
  },
];

const TIME_SLOTS = [
  '10:30 AM',
  '12:00 PM',
  '2:30 PM',
  '4:00 PM',
  '5:30 PM'
];

export const BespokeBookingModal: React.FC<BespokeBookingModalProps> = ({
  isOpen,
  onClose,
  onConfirmAppointment
}) => {
  if (!isOpen) return null;

  const [selectedSalon, setSelectedSalon] = useState<'Paris 8e (Place Vendôme)' | 'New York (Madison Avenue)' | 'Virtual Private Salon'>('Paris 8e (Place Vendôme)');
  const [selectedDate, setSelectedDate] = useState('2026-10-14');
  const [selectedTime, setSelectedTime] = useState('2:30 PM');
  const [fullName, setFullName] = useState('Archana Adhanabal');
  const [email, setEmail] = useState('archanaadhanabal9@gmail.com');
  const [phone, setPhone] = useState('+1 (555) 382-9102');
  const [tailorPreference, setTailorPreference] = useState('Master Tailor Jean-Paul & Colorist Cécile');
  const [notes, setNotes] = useState('Interested in custom fit for the Cashmere Overcoat and Silk evening pieces for the Winter Gala.');
  const [confirmedPass, setConfirmedPass] = useState<Appointment | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appt: Appointment = {
      id: `APT-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName,
      email,
      phone,
      salonLocation: selectedSalon,
      date: selectedDate,
      timeSlot: selectedTime,
      tailorPreference,
      notes,
      createdAt: new Date().toISOString()
    };
    setConfirmedPass(appt);
    onConfirmAppointment(appt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF9F5] border border-[#E2DDD5] shadow-2xl rounded-sm overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-[#18181A] text-white flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#C7BDB1]">
              Atelier Appointments
            </div>
            <h2 className="text-xl font-serif-couture font-light">
              Reserve Private Styling & Bespoke Fitting
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#A29A8E] hover:text-white p-1 rounded transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!confirmedPass ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Salon Selection */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8C6D58] font-semibold block mb-3">
                1. Select Atelier Salon
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SALONS.map((salon) => (
                  <button
                    key={salon.id}
                    type="button"
                    onClick={() => setSelectedSalon(salon.id as any)}
                    className={`p-3 text-left border rounded transition-all flex flex-col justify-between ${
                      selectedSalon === salon.id
                        ? 'border-[#18181A] bg-white shadow-xs'
                        : 'border-[#DDD7CD] bg-[#F7F4EE] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#18181A]">{salon.name}</div>
                      <div className="text-[11px] text-[#70695E] mt-1 line-clamp-2">{salon.address}</div>
                    </div>
                    <div className="text-[10px] text-[#8C6D58] mt-2 font-medium">{salon.hours}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#5A544A] block mb-1 font-medium">Preferred Date</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#5A544A] block mb-1 font-medium">Available Salon Session</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Patron Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EAE5DC]">
              <div>
                <label className="text-xs text-[#5A544A] block mb-1">Patron Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                />
              </div>

              <div>
                <label className="text-xs text-[#5A544A] block mb-1">Private Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-[#5A544A] block mb-1">Direct Mobile / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-[#5A544A] block mb-1">Tailoring Focus & Silhouette Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specific pieces you wish to fit, alteration requirements, or occasion deadlines..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A]"
                />
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs uppercase tracking-wider text-[#5A544B] hover:text-[#18181A]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#18181A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#333336] transition-colors"
              >
                Confirm Salon Reservation
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-14 h-14 bg-[#2E5E4E] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <Check className="w-7 h-7" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-semibold mb-1">
                Reservation Confirmed
              </div>
              <h3 className="text-2xl font-serif-couture text-[#18181A]">
                We Look Forward to Welcoming You
              </h3>
              <p className="text-xs sm:text-sm text-[#736C61] mt-1 max-w-md mx-auto">
                An invitation pass and private salon briefing have been dispatched to {confirmedPass.email}.
              </p>
            </div>

            {/* Pass details */}
            <div className="bg-[#F5F2EB] p-5 rounded border border-[#E5DFD4] max-w-md mx-auto text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#E0D9CD] pb-2">
                <span className="text-[#6A6357]">Reference Code:</span>
                <span className="font-mono font-bold text-[#18181A]">{confirmedPass.id}</span>
              </div>
              <div className="flex justify-between border-b border-[#E0D9CD] pb-2">
                <span className="text-[#6A6357]">Salon Location:</span>
                <span className="font-semibold text-[#18181A]">{confirmedPass.salonLocation}</span>
              </div>
              <div className="flex justify-between border-b border-[#E0D9CD] pb-2">
                <span className="text-[#6A6357]">Date & Time:</span>
                <span className="text-[#18181A] font-medium">{confirmedPass.date} at {confirmedPass.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6A6357]">Private Stylist:</span>
                <span className="text-[#18181A]">{confirmedPass.tailorPreference}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#18181A] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#333336] transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
