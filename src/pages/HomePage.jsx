import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/products/ProductCard';
import { CategoryPills } from '../components/products/CategoryPills';
import { ProductQuickView } from '../components/products/ProductQuickView';
import { ShoppingBag, Search, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
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

  return (
    <main className="home-page">
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} /> Summer Tech & Apparel Clearance
          </div>
          <h1 className="hero-title">
            Unbeatable Deals on Top Brands & Essentials
          </h1>
          <p className="hero-subtitle">
            Explore thousands of products with free standard shipping and 30-day money-back guarantee.
          </p>
        </div>
      </section>

      {/* Main Catalog Container */}
      <div className="catalog-container">
        {/* Category Pills Filter */}
        <CategoryPills />

        {/* Toolbar Header */}
        <div className="catalog-toolbar">
          <div className="toolbar-stats">
            <span className="results-count">
              Showing <strong>{filteredProducts.length}</strong> products
            </span>
            {selectedCategory !== 'All' && (
              <span className="active-filter-badge">
                Category: {selectedCategory}
              </span>
            )}
            {searchTerm && (
              <span className="active-filter-badge">
                Query: "{searchTerm}"
              </span>
            )}
          </div>

          <div className="toolbar-controls">
            <div className="sort-wrapper">
              <ArrowUpDown size={15} className="sort-icon" />
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products-found">
            <Search size={48} className="no-products-icon" />
            <h3>No products found matching your search</h3>
            <p>Try searching for broader terms like "socks", "shoes", or "kitchen".</p>
            <button
              type="button"
              className="reset-search-btn"
              onClick={() => setSearchTerm('')}
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <ProductQuickView />
    </main>
  );
}
