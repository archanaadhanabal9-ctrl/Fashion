import { Product } from '../types/boutique';
import heroCampaignImg from '../assets/images/hero_boutique_campaign_1791194594924.jpg';
import silkBlouseImg from '../assets/images/boutique_silk_blouse_1791194628017.jpg';
import cashmereCoatImg from '../assets/images/boutique_cashmere_coat_1791194640561.jpg';
import eveningGownImg from '../assets/images/boutique_evening_gown_1791194656908.jpg';
import leatherBagImg from '../assets/images/boutique_leather_bag_1791194668558.jpg';

export const HERO_IMAGE = heroCampaignImg;

export const PRODUCTS: Product[] = [
  {
    id: 'ms-01',
    title: "L'Aurore Draped Silk Blouse",
    subtitle: "Fluid Mulberry Silk with Architectural Drape",
    category: 'silk-knitwear',
    priceUSD: 680,
    fabric: '100% French Mulberry Silk (28 Momme)',
    origin: 'Hand-sewn in Lyon, France',
    description: "Sculpted from luminous 28-momme French mulberry silk, L'Aurore features a graceful asymmetric cowl collar that falls into a soft architectural drape. Cut on the bias to hug movement effortlessly.",
    details: [
      'Hand-rolled hems and concealed mother-of-pearl buttons',
      'Naturally hypoallergenic, temperature-regulating pure silk weave',
      'Cut on the bias for fluid kinetic drape',
      'Complimentary bespoke sleeve alterations included'
    ],
    sizes: ['FR 34 / US 2', 'FR 36 / US 4', 'FR 38 / US 6', 'FR 40 / US 8', 'Custom Measurement'],
    image: silkBlouseImg,
    gallery: [silkBlouseImg, heroCampaignImg],
    color: '#F4ECE1',
    colorName: 'Ivory Crème',
    editionLimit: 35,
    inStock: true,
    isNewArrival: true
  },
  {
    id: 'ms-02',
    title: 'Le Manteau No. 7 Cashmere Overcoat',
    subtitle: 'Double-Breasted Sculptural Tailoring',
    category: 'outerwear',
    priceUSD: 1850,
    fabric: '90% Virgin Biella Wool · 10% Mongolian Cashmere',
    origin: 'Atelier de Paris, France',
    description: 'An enduring monument of Parisian tailoring. Engineered with a clean, confident silhouette, structured drop-shoulders, and horn buttons carved in Jura. Fully lined in cupro silk.',
    details: [
      'Sourced from heritage Biella Italian spinning mills',
      'Hand-padded canvas chest construction for permanent posture retention',
      'Genuine Jura cattle horn buttons with signature cross-stitch',
      'Interior passport and fountain pen bespoke pockets'
    ],
    sizes: ['FR 36 / US 4', 'FR 38 / US 6', 'FR 40 / US 8', 'FR 42 / US 10', 'Bespoke Atelier Fit'],
    image: cashmereCoatImg,
    gallery: [cashmereCoatImg, heroCampaignImg],
    color: '#C79A73',
    colorName: 'Warm Camel',
    editionLimit: 25,
    inStock: true,
    isNewArrival: true
  },
  {
    id: 'ms-03',
    title: 'Émeraude Column Gown',
    subtitle: 'Sculptural Backless Evening Silk Satin',
    category: 'evening',
    priceUSD: 2400,
    fabric: 'Heavy Silk Duchess Satin (32 Momme)',
    origin: 'Haute Couture Salon, Paris',
    description: 'A striking floor-length column gown rendered in saturated emerald silk duchess satin. Features a clean high boat neckline in front giving way to a dramatic geometric low cowl back.',
    details: [
      'Weighted hem with invisible internal horsehair braid for clean drape',
      'Double-faced silk satin bodice with internal grosgrain stay',
      'Invisible side seam zipper with hand-stitched eyelets',
      'Includes private atelier fitting session upon receipt'
    ],
    sizes: ['FR 34 / US 2', 'FR 36 / US 4', 'FR 38 / US 6', 'FR 40 / US 8', 'Haute Couture Made-to-Order'],
    image: eveningGownImg,
    gallery: [eveningGownImg, heroCampaignImg],
    color: '#1B4D3E',
    colorName: 'Atelier Emerald',
    editionLimit: 20,
    inStock: true,
    isNewArrival: false
  },
  {
    id: 'ms-04',
    title: 'Le Petit Cavalier Saddle Bag',
    subtitle: 'Full-Grain Tuscan Calfskin with Hand-Polished Brass',
    category: 'leathercraft',
    priceUSD: 1290,
    fabric: 'Vegetable-Tanned Tuscan Vachetta Leather',
    origin: 'Florence, Italy & Paris, France',
    description: 'Constructed by master leather artisans in Scandicci. Each bag takes 18 hours of precise saddle-stitching using beeswax-coated linen thread, developing a unique, deep patina over decades.',
    details: [
      'Solid brushed architectural brass hardware, custom engraved',
      'Lined in velvety goat suede with twin card slots and magnetic flap',
      'Adjustable and detachable shoulder strap with 5-hole versatility',
      'Complimentary blind foil monogramming in Paris'
    ],
    sizes: ['One Size (24cm x 18cm x 7cm)'],
    image: leatherBagImg,
    gallery: [leatherBagImg, silkBlouseImg],
    color: '#6E432A',
    colorName: 'Cognac Saddle',
    editionLimit: 40,
    inStock: true,
    isNewArrival: false
  },
  {
    id: 'ms-05',
    title: "L'Iconique Atelier Trench",
    subtitle: 'Waterproof Silk-Cotton Gabardine with Storm Flap',
    category: 'outerwear',
    priceUSD: 1650,
    fabric: '65% Organic Egyptian Cotton · 35% Silk Gabardine',
    origin: 'Atelier de Paris, France',
    description: 'The definitive transitional coat as featured in our Autumn campaign. Combines weather-resistant tight-weave gabardine with an understated champagne sheen and hand-cast D-ring belt.',
    details: [
      'Water-repellent nanotechnology treatment without fluorocarbons',
      'Removable throat latch and gun flap with horn fastening',
      'Full cupro jacquard lining featuring Maison Sérénité compass motif',
      'Deep welt storm pockets with internal fleece lining'
    ],
    sizes: ['FR 34 / US 2', 'FR 36 / US 4', 'FR 38 / US 6', 'FR 40 / US 8', 'FR 42 / US 10'],
    image: heroCampaignImg,
    gallery: [heroCampaignImg, cashmereCoatImg],
    color: '#D8CCA3',
    colorName: 'Champagne Gabardine',
    editionLimit: 30,
    inStock: true,
    isHeroCampaign: true
  },
  {
    id: 'ms-06',
    title: 'Le Tailleur Ardoise Sculpted Blazer',
    subtitle: 'Sharp Architectural Shoulders in Super 140s Wool',
    category: 'ready-to-wear',
    priceUSD: 1150,
    fabric: 'Super 140s Virgin Wool Twill',
    origin: 'Atelier de Paris, France',
    description: 'Precision personified. A single-breasted blazer featuring crisp notched lapels, angled welt pockets, and sculpted waist suppression that elongates the silhouette with calm authority.',
    details: [
      'Full floating horsehair canvas ensures natural break and lifetime drape',
      'Functional 4-button surgeon cuffs with genuine horn buttons',
      'Double back vents for ease of movement',
      'Internal discreet phone and pen pockets'
    ],
    sizes: ['FR 34 / US 2', 'FR 36 / US 4', 'FR 38 / US 6', 'FR 40 / US 8', 'Custom Measurement'],
    image: cashmereCoatImg,
    gallery: [cashmereCoatImg, silkBlouseImg],
    color: '#26292E',
    colorName: 'Ardoise Slate',
    editionLimit: 25,
    inStock: true,
    isNewArrival: true
  }
];

export const CURRENCY_RATES: Record<string, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' }
};

export const ATELIER_TESTIMONIALS = [
  {
    quote: "The drape of the silk blouse and the quiet precision of the cashmere overcoat are unmatched. Having visited ateliers across Milan and Paris, Maison Sérénité captures that rare balance of restraint and uncompromising luxury.",
    author: "Éléonore de Saint-Germain",
    role: "Private Art Curator & Collector",
    city: "Paris, 7e",
    verifiedOrder: "Manteau No. 7 & L'Aurore Blouse"
  },
  {
    quote: "My bespoke fitting at the Madison Avenue salon was an extraordinary experience. The master tailor made three minor shoulder adjustments right before my eyes. The garment fits as though it was drawn on me.",
    author: "Katherine Vance",
    role: "Architectural Partner",
    city: "New York",
    verifiedOrder: "Le Tailleur Ardoise & Bespoke Trench"
  },
  {
    quote: "A limited edition of only 40 pieces means you will never run into someone wearing the same piece at the gallery preview. The craftsmanship and heavy silk satin weight are heirloom caliber.",
    author: "Lady Camilla Ross",
    role: "Patron of the Royal Academy",
    city: "London",
    verifiedOrder: "Émeraude Column Gown"
  }
];
