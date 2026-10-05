export type ProductCategory = 
  | 'all' 
  | 'ready-to-wear' 
  | 'outerwear' 
  | 'silk-knitwear' 
  | 'evening' 
  | 'leathercraft';

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  priceUSD: number;
  fabric: string;
  origin: string;
  description: string;
  details: string[];
  sizes: string[];
  image: string;
  gallery: string[];
  color: string;
  colorName: string;
  editionLimit: number;
  inStock: boolean;
  isNewArrival?: boolean;
  isHeroCampaign?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  salonLocation: 'Paris 8e (Place Vendôme)' | 'New York (Madison Avenue)' | 'Virtual Private Salon';
  date: string;
  timeSlot: string;
  tailorPreference: string;
  notes: string;
  createdAt: string;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  currency: Currency;
  shippingAddress: {
    fullName: string;
    email: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  giftBox: boolean;
  date: string;
}
