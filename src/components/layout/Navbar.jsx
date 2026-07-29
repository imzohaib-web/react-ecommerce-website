import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Package, Heart, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { MobileDrawer } from './MobileDrawer';
import './Navbar.css';

export function Navbar() {
  const navigate = useNavigate();
  const { summary } = useCart();
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories, wishlist } = useProducts();
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(localSearch);
    navigate('/');
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    setSearchTerm('');
  };

  return (
    <>
      <header className="flagship-navbar">
        <div className="navbar-inner">
          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={22} />
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flagship-brand">
            <div className="brand-logo-icon">
              <Sparkles size={18} />
            </div>
            <div className="brand-text-container">
              <span className="brand-title">AURA</span>
              <span className="brand-tag">2026</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form className="flagship-search" onSubmit={handleSearchSubmit}>
            <div className="search-select-box hide-tablet">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  navigate('/');
                }}
                aria-label="Category select"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-input-group">
              <Search size={18} className="search-icon-leading" />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  setSearchTerm(e.target.value);
                }}
                className="flagship-search-input"
              />
              {localSearch && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button type="submit" className="search-submit-button" aria-label="Submit search">
              Search
            </button>
          </form>

          {/* Nav Right Actions */}
          <div className="flagship-actions">
            <Link to="/orders" className="nav-action-btn hide-mobile">
              <Package size={20} />
              <span className="nav-action-label">Orders</span>
            </Link>

            <div className="nav-action-btn hide-mobile" title="Wishlist">
              <div className="icon-badge-wrapper">
                <Heart size={20} />
                {wishlist.length > 0 && <span className="action-badge-dot">{wishlist.length}</span>}
              </div>
              <span className="nav-action-label">Saved</span>
            </div>

            <Link to="/checkout" className="nav-action-btn cart-highlight-btn">
              <div className="icon-badge-wrapper">
                <ShoppingBag size={20} />
                <span className="action-badge-count">{summary.totalQuantity}</span>
              </div>
              <span className="nav-action-label hide-mobile">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      <MobileDrawer isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
