import { useState } from 'react';
import { X, ShoppingCart, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { formatMoney } from '../../utils/money';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import './ProductQuickView.css';

export function ProductQuickView() {
  const { quickViewProduct, setQuickViewProduct } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct.id, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const ratingStars = Math.round(quickViewProduct.rating.stars * 10);
  const ratingImagePath = `images/ratings/rating-${ratingStars}.png`;

  return (
    <div
      className="quick-view-overlay"
      onClick={() => setQuickViewProduct(null)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="quick-view-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="quick-view-close-btn"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="quick-view-grid">
          {/* Left Column: Image */}
          <div className="quick-view-image-container">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="quick-view-image"
            />
          </div>

          {/* Right Column: Info */}
          <div className="quick-view-info">
            <span className="quick-view-category">{quickViewProduct.category || 'General'}</span>

            <h2 className="quick-view-title">{quickViewProduct.name}</h2>

            <div className="quick-view-rating">
              <img
                src={ratingImagePath}
                alt={`${quickViewProduct.rating.stars} stars`}
                className="rating-stars-img"
              />
              <span className="rating-count-text">
                {quickViewProduct.rating.stars} ({quickViewProduct.rating.count} customer ratings)
              </span>
            </div>

            <div className="quick-view-price">
              ${formatMoney(quickViewProduct.priceCents)}
              <span className="in-stock-badge">In Stock</span>
            </div>

            <p className="quick-view-description">
              {quickViewProduct.description ||
                'High-quality product designed for maximum performance, longevity, and overall customer satisfaction.'}
            </p>

            <div className="quick-view-guarantees">
              <div className="guarantee-item">
                <Truck size={16} /> Free Shipping Available
              </div>
              <div className="guarantee-item">
                <ShieldCheck size={16} /> Authentic Quality Guaranteed
              </div>
              <div className="guarantee-item">
                <RotateCcw size={16} /> 30-Day Free Return Policy
              </div>
            </div>

            <div className="quick-view-actions">
              <div className="quick-view-qty">
                <label htmlFor="modal-qty">Quantity:</label>
                <select
                  id="modal-qty"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className={`quick-view-add-btn ${isAdded ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <>
                    <Check size={18} /> Added to Shopping Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
