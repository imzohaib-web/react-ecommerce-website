import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, ShoppingCart, Package, MapPin, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import './Navbar.css';

export function Navbar() {
  const navigate = useNavigate();
  const { summary } = useCart();
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories } = useProducts();
  const [localSearch, setLocalSearch] = useState(searchTerm);

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
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-logo-text">
            <span className="brand-name">amazon</span>
            <span className="brand-dot">.pro</span>
          </div>
          <div className="brand-subtitle">
            <Sparkles size={11} className="sparkle-icon" /> Premium Shop
          </div>
        </Link>

        {/* Location deliver to indicator */}
        <div className="navbar-location hide-mobile">
          <MapPin size={18} className="location-icon" />
          <div className="location-text">
            <span className="location-label">Deliver to</span>
            <span className="location-value">United States</span>
          </div>
        </div>

        {/* Search Bar Form */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <div className="search-category-select">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                navigate('/');
              }}
              aria-label="Select category"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <SlidersHorizontal size={14} className="select-icon" />
          </div>

          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search Amazon products, categories, keywords..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                setSearchTerm(e.target.value);
              }}
              className="search-input"
            />
            {localSearch && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button type="submit" className="search-submit-btn" aria-label="Submit Search">
            <Search size={18} />
          </button>
        </form>

        {/* Right Section Nav Actions */}
        <div className="navbar-actions">
          {/* Orders Link */}
          <Link to="/orders" className="nav-action-link">
            <Package size={20} className="nav-icon" />
            <div className="nav-text">
              <span className="nav-text-top">Returns</span>
              <span className="nav-text-bottom">& Orders</span>
            </div>
          </Link>

          {/* Cart Link with Badge */}
          <Link to="/checkout" className="nav-action-link nav-cart-btn">
            <div className="cart-icon-wrapper">
              <ShoppingCart size={24} />
              <span className="cart-badge-count">{summary.totalQuantity}</span>
            </div>
            <div className="nav-text hide-mobile">
              <span className="nav-text-top">Shopping</span>
              <span className="nav-text-bottom">Cart</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
