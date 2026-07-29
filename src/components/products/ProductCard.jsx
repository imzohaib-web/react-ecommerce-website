import { useState } from 'react';
import { ShoppingCart, Eye, Star, Check } from 'lucide-react';
import { formatMoney } from '../../utils/money';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import './ProductCard.css';

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { setQuickViewProduct } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const ratingStars = Math.round(product.rating.stars * 10);
  const ratingImagePath = `images/ratings/rating-${ratingStars}.png`;

  return (
    <div className="product-card">
      {/* Category badge */}
      {product.category && (
        <span className="product-badge-category">{product.category}</span>
      )}

      {/* Image container with quick view overlay */}
      <div className="product-card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />
        <button
          type="button"
          className="quick-view-trigger-btn"
          onClick={() => setQuickViewProduct(product)}
          aria-label="Quick view product"
        >
          <Eye size={16} /> Quick View
        </button>
      </div>

      {/* Product Title */}
      <h3
        className="product-card-title line-clamp-2"
        onClick={() => setQuickViewProduct(product)}
        title={product.name}
      >
        {product.name}
      </h3>

      {/* Rating */}
      <div className="product-card-rating">
        <img
          src={ratingImagePath}
          alt={`${product.rating.stars} stars`}
          className="rating-stars-img"
        />
        <span className="rating-count-text">({product.rating.count})</span>
      </div>

      {/* Price */}
      <div className="product-card-price">
        <span className="price-currency">$</span>
        <span className="price-amount">{formatMoney(product.priceCents)}</span>
      </div>

      {/* Quantity selector */}
      <div className="product-card-quantity-row">
        <label htmlFor={`qty-${product.id}`} className="qty-label">
          Qty:
        </label>
        <select
          id={`qty-${product.id}`}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="qty-select"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Add to Cart button */}
      <button
        type="button"
        className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
        onClick={handleAddToCart}
      >
        {isAdded ? (
          <>
            <Check size={18} /> Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart size={18} /> Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
