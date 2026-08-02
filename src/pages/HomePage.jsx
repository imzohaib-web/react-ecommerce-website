import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/products/ProductCard';
import { CategoryCarousel } from '../components/products/CategoryCarousel';
import { ProductQuickView } from '../components/products/ProductQuickView';
import { FlashDeals } from '../components/home/FlashDeals';
import { RecentlyViewed } from '../components/home/RecentlyViewed';
import { Newsletter } from '../components/home/Newsletter';
import { Sparkles, ArrowRight, Zap, Truck, Star, Search, ArrowUpDown } from 'lucide-react';

export function HomePage() {
  const {
    filteredProducts,
    searchTerm,
    selectedCategory,
    sortMode,
    setSortMode,
    setSearchTerm
  } = useProducts();

  const [activeTab, setActiveTab] = useState('all');

  const displayedProducts = filteredProducts.filter((p) => {
    if (activeTab === 'top-rated') return p.rating.stars >= 4.5;
    if (activeTab === 'best-sellers') return p.rating.count > 200;
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Sparkles size={14} className="text-amber-400 animate-pulse" /> NEXT-GEN ECOMMERCE 2026
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Discover Products Built for{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Modern Living
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Curated tech, apparel, and lifestyle essentials. Enjoy fast express delivery, 30-day hassle-free returns, and premium customer care.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-400/20 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm"
                onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
              >
                Shop Collection <ArrowRight size={18} />
              </button>
              <button
                type="button"
                className="bg-slate-800/90 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl border border-slate-700 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm"
                onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })}
              >
                <Zap size={18} className="text-amber-400" /> Flash Deals
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span>4.9/5 from 50k+ Happy Customers</span>
              </div>
              <div className="w-1 h-1 bg-slate-700 rounded-full hidden sm:block" />
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-amber-400" />
                <span>Free Express Shipping On $25+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Category Carousel */}
        <CategoryCarousel />

        {/* Flash Deals Section */}
        <FlashDeals />

        {/* Catalog Section */}
        <section className="mb-12" id="catalog">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="inline-block bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full mb-1">
                Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Popular Products & Deals</h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl self-start md:self-auto">
              <button
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
                onClick={() => setActiveTab('all')}
              >
                All Products
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'best-sellers'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
                onClick={() => setActiveTab('best-sellers')}
              >
                Best Sellers
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'top-rated'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
                onClick={() => setActiveTab('top-rated')}
              >
                Top Rated (4.5★+)
              </button>
            </div>
          </div>

          {/* Toolbar Controls */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 text-xs text-slate-600">
            <div className="flex items-center gap-2 flex-wrap">
              <span>
                Showing <strong>{displayedProducts.length}</strong> items
              </span>
              {selectedCategory !== 'All' && (
                <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                  Category: {selectedCategory}
                </span>
              )}
              {searchTerm && (
                <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
                  Search: "{searchTerm}"
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown size={15} className="text-slate-400" />
              <label htmlFor="sort-dropdown" className="font-semibold">Sort by:</label>
              <select
                id="sort-dropdown"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                <option value="featured">Featured Items</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid or Empty State */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm flex flex-col items-center my-6">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">No products matched your search</h3>
              <p className="text-sm text-slate-500 mb-6">Try clearing your search query or picking another category.</p>
              <button
                type="button"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer text-sm"
                onClick={() => {
                  setSearchTerm('');
                  setActiveTab('all');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* Recently Viewed */}
        <RecentlyViewed />

        {/* VIP Newsletter */}
        <Newsletter />
      </div>

      {/* Quick View Modal */}
      <ProductQuickView />
    </main>
  );
}
