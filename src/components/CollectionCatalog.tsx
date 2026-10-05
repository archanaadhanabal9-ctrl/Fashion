import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product, ProductCategory, Currency } from '../types/boutique';
import { ProductCard } from './ProductCard';

interface CollectionCatalogProps {
  products: Product[];
  currency: Currency;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Silhouettes' },
  { id: 'silk-knitwear', label: 'Silk & Knitwear' },
  { id: 'outerwear', label: 'Coats & Outerwear' },
  { id: 'ready-to-wear', label: 'Tailored Suiting' },
  { id: 'evening', label: 'Evening Couture' },
  { id: 'leathercraft', label: 'Artisanal Leather' },
];

export const CollectionCatalog: React.FC<CollectionCatalogProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'edition'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          p.title.toLowerCase().includes(query) ||
          p.fabric.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.colorName.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
        if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
        if (sortBy === 'edition') return a.editionLimit - b.editionLimit;
        return 0; // featured order
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="collections" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#E9E4DC] pb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-medium mb-2">
            The Permanent Collection
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-couture font-normal text-[#18181A] tracking-tight">
            Curated Atelier Silhouettes
          </h2>
          <p className="text-sm text-[#736C61] mt-2 max-w-lg">
            Rare fibers spun by generational European artisans. Each garment is numbered and registered to its patron upon acquisition.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9387]" />
            <input
              type="text"
              placeholder="Search silk, wool, coat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A] transition-colors w-48 sm:w-56 text-[#18181A]"
            />
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="py-2 px-3 text-xs bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#18181A] text-[#18181A] cursor-pointer"
          >
            <option value="featured">Sort: Atelier Curated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="edition">Rarity: Limited Edition</option>
          </select>
        </div>
      </div>

      {/* Category Filter Tabs (Functional segmented buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap rounded transition-all ${
                isActive
                  ? 'bg-[#18181A] text-[#FAF9F5] shadow-xs'
                  : 'bg-white text-[#5C564D] hover:text-[#18181A] border border-[#E4DFD7] hover:border-[#CCC5BA]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid: 3-column desktop per Section 2.A */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-[#EAE6DF] rounded-md p-8">
          <p className="font-serif-couture text-2xl text-[#18181A]">No silhouettes match your query</p>
          <p className="text-xs text-[#8A847A] mt-2">Adjust your search term or select another category.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-6 px-4 py-2 text-xs uppercase tracking-wider bg-[#18181A] text-white rounded hover:bg-[#333336] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
