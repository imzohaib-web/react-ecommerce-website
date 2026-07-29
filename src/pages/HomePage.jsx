import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/products/ProductCard';
import { CategoryCarousel } from '../components/products/CategoryCarousel';
import { ProductQuickView } from '../components/products/ProductQuickView';
import { FlashDeals } from '../components/home/FlashDeals';
import { RecentlyViewed } from '../components/home/RecentlyViewed';
import { Newsletter } from '../components/home/Newsletter';
import { Sparkles, ArrowRight, Zap, Truck, Star, Search, ArrowUpDown } from 'lucide-react';
import './HomePage.css';

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

  // Filter products based on activeTab
  const displayedProducts = filteredProducts.filter((p) => {
    if (activeTab === 'top-rated') return p.rating.stars >= 4.5;
    if (activeTab === 'best-sellers') return p.rating.count > 200;
    return true;
  });

  return (
    <main className="flagship-home-page">
      {/* Hero Section */}
      <section className="flagship-hero">
        <div className="hero-grid-layout">
          <div className="hero-text-side">
            <div className="hero-tag-badge">
              <Sparkles size={14} className="hero-sparkle" /> NEXT-GEN ECOMMERCE 2026
            </div>
            <h1 className="hero-headline">
              Discover Products Built for <span className="headline-gradient">Modern Living</span>
            </h1>
            <p className="hero-description">
              Curated tech, apparel, and lifestyle essentials. Enjoy fast express delivery, 30-day hassle-free returns, and premium customer care.
            </p>

            <div className="hero-btn-group">
              <button
                type="button"
                className="hero-primary-btn"
                onClick={() => window.scrollTo({ top: 750, behavior: 'smooth' })}
              >
                Shop Collection <ArrowRight size={18} />
              </button>
              <button
                type="button"
                className="hero-secondary-btn"
                onClick={() => window.scrollTo({ top: 1250, behavior: 'smooth' })}
              >
                <Zap size={18} color="#f59e0b" /> Flash Deals
              </button>
            </div>

            <div className="hero-trust-metrics">
              <div className="metric-item">
                <div className="metric-stars">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                </div>
                <span>4.9/5 from 50k+ Happy Customers</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <Truck size={16} className="metric-icon" />
                <span>Free Express Shipping On $25+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="flagship-body-container">
        {/* Horizontal Scrolling Category Carousel */}
        <CategoryCarousel />

        {/* Flash Deals Section */}
        <FlashDeals />

        {/* Popular Products & Catalog Grid */}
        <section className="catalog-section" id="catalog">
          <div className="catalog-section-header">
            <div>
              <span className="section-tag-pill">Catalog</span>
              <h2 className="section-main-title">Popular Products & Deals</h2>
            </div>

            {/* Filter Tabs */}
            <div className="catalog-tabs-bar">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Products
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'best-sellers' ? 'active' : ''}`}
                onClick={() => setActiveTab('best-sellers')}
              >
                Best Sellers
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'top-rated' ? 'active' : ''}`}
                onClick={() => setActiveTab('top-rated')}
              >
                Top Rated (4.5★+)
              </button>
            </div>
          </div>

          {/* Toolbar Controls */}
          <div className="flagship-toolbar">
            <div className="toolbar-stats-text">
              Showing <strong>{displayedProducts.length}</strong> items
              {selectedCategory !== 'All' && <span className="filter-chip">Category: {selectedCategory}</span>}
              {searchTerm && <span className="filter-chip">Search: "{searchTerm}"</span>}
            </div>

            <div className="toolbar-sort-box">
              <ArrowUpDown size={15} className="sort-icon-leading" />
              <label htmlFor="sort-dropdown">Sort by:</label>
              <select
                id="sort-dropdown"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value)}
                className="flagship-sort-select"
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
            <div className="flagship-products-grid">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-catalog-state">
              <Search size={48} className="empty-icon" />
              <h3>No products matched your search</h3>
              <p>Try clearing your search query or picking another category.</p>
              <button
                type="button"
                className="reset-filters-btn"
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

        {/* Recently Viewed Products */}
        <RecentlyViewed />

        {/* VIP Newsletter Subscription */}
        <Newsletter />
      </div>

      {/* Quick View Modal */}
      <ProductQuickView />
    </main>
  );
}
