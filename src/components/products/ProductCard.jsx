import { useState } from 'react';
import { ShoppingBag, Eye, Star, Check, Heart } from 'lucide-react';
import { formatMoney } from '../../utils/money';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import './ProductCard.css';

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { setQuickViewProduct, wishlist, toggleWishlist } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // Mock slashed original price for 2026 look (25% higher)
  const originalPriceCents = Math.round(product.priceCents * 1.25);

  return (
    <div className="flagship-product-card">
      {/* Top Badges & Wishlist Action */}
      <div className="card-top-bar">
        {product.category && (
          <span className="category-tag-pill">{product.category}</span>
        )}
        <button
          type="button"
          className={`wishlist-heart-btn ${isWishlisted ? 'active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Add to Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? '#f43f5e' : 'none'} color={isWishlisted ? '#f43f5e' : '#64748b'} />
        </button>
      </div>

      {/* Image Container */}
      <div className="product-image-container" onClick={() => setQuickViewProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="product-main-image"
          loading="lazy"
        />
        <button
          type="button"
          className="card-quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
        >
          <Eye size={15} /> Quick View
        </button>
      </div>

      {/* Rating Pill & Title */}
      <div className="product-card-body">
        <div className="rating-pill-row">
          <div className="star-rating-badge">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span className="rating-score">{product.rating.stars}</span>
            <span className="rating-reviews">({product.rating.count})</span>
          </div>
        </div>

        <h3
          className="product-card-title"
          onClick={() => setQuickViewProduct(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Pricing Row */}
        <div className="product-price-row">
          <div className="price-box">
            <span className="current-price">${formatMoney(product.priceCents)}</span>
            <span className="slashed-price">${formatMoney(originalPriceCents)}</span>
          </div>
          <span className="discount-badge">-20%</span>
        </div>

        {/* Quantity and Add to Cart Action */}
        <div className="card-footer-actions">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="card-qty-dropdown"
            aria-label="Select quantity"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={`flagship-add-btn ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
