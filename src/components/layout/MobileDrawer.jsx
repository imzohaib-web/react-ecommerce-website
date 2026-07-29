import { Link, useNavigate } from 'react-router-dom';
import { X, Package, ShoppingCart, Heart, Home, Tag, Sparkles } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import './MobileDrawer.css';

export function MobileDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { categories, selectedCategory, setSelectedCategory, setSearchTerm, wishlist } = useProducts();
  const { summary } = useCart();

  if (!isOpen) return null;

  return (
    <div className="mobile-drawer-overlay" onClick={onClose}>
      <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="mobile-drawer-header">
          <div className="drawer-brand">
            <Sparkles size={18} className="brand-icon" />
            <span className="brand-name">AURA</span>
            <span className="brand-badge">2026</span>
          </div>
          <button type="button" className="drawer-close-btn" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="mobile-drawer-body">
          <div className="drawer-section">
            <div className="drawer-section-title">Navigation</div>
            <Link to="/" className="drawer-link" onClick={onClose}>
              <Home size={18} /> Home Storefront
            </Link>
            <Link to="/orders" className="drawer-link" onClick={onClose}>
              <Package size={18} /> My Orders
            </Link>
            <Link to="/checkout" className="drawer-link" onClick={onClose}>
              <ShoppingCart size={18} /> Shopping Cart ({summary.totalQuantity})
            </Link>
            <div className="drawer-link disabled">
              <Heart size={18} /> Wishlist ({wishlist.length})
            </div>
          </div>

          <div className="drawer-section">
            <div className="drawer-section-title">Categories</div>
            <div className="drawer-categories-list">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`drawer-cat-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearchTerm('');
                    navigate('/');
                    onClose();
                  }}
                >
                  <Tag size={14} /> {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
