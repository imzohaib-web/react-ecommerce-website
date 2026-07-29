import { useState, useEffect } from 'react';
import { Zap, Clock, ShoppingBag, Check } from 'lucide-react';
import { productsData } from '../../data/productsData';
import { formatMoney } from '../../utils/money';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import './FlashDeals.css';

export function FlashDeals() {
  const { addToCart } = useCart();
  const { setQuickViewProduct } = useProducts();
  const [addedMap, setAddedMap] = useState({});

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = productsData.slice(3, 7).map((p, idx) => ({
    ...p,
    discountPercent: 35 + idx * 5,
    claimedPercent: 70 + idx * 6
  }));

  const handleAdd = (productId) => {
    addToCart(productId, 1);
    setAddedMap((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  const formatDigit = (num) => String(num).padStart(2, '0');

  return (
    <section className="flash-deals-section">
      <div className="flash-deals-banner">
        <div className="flash-header-left">
          <div className="flash-title-group">
            <span className="flash-badge"><Zap size={16} fill="#f59e0b" color="#f59e0b" /> Limited Time Offer</span>
            <h2 className="flash-main-title">24-Hour Flash Clearance</h2>
          </div>
          <div className="countdown-timer-box">
            <Clock size={16} className="clock-icon" />
            <span className="timer-label">Ends in:</span>
            <div className="timer-digits">
              <span className="digit-block">{formatDigit(timeLeft.hours)}h</span> :
              <span className="digit-block">{formatDigit(timeLeft.minutes)}m</span> :
              <span className="digit-block">{formatDigit(timeLeft.seconds)}s</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flash-grid">
        {dealProducts.map((product) => {
          const isAdded = addedMap[product.id];
          const salePriceCents = Math.round(product.priceCents * (1 - product.discountPercent / 100));

          return (
            <div key={product.id} className="flash-deal-card">
              <span className="flash-discount-tag">-{product.discountPercent}% OFF</span>

              <div
                className="flash-image-wrapper"
                onClick={() => setQuickViewProduct(product)}
              >
                <img src={product.image} alt={product.name} className="flash-product-img" />
              </div>

              <div className="flash-card-content">
                <h3 className="flash-product-title" onClick={() => setQuickViewProduct(product)}>
                  {product.name}
                </h3>

                <div className="flash-price-row">
                  <span className="flash-sale-price">${formatMoney(salePriceCents)}</span>
                  <span className="flash-orig-price">${formatMoney(product.priceCents)}</span>
                </div>

                {/* Stock Claimed Progress Bar */}
                <div className="flash-progress-container">
                  <div className="progress-label-row">
                    <span>Claimed: {product.claimedPercent}%</span>
                    <span>Selling Fast</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill-gradient"
                      style={{ width: `${product.claimedPercent}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  type="button"
                  className={`flash-add-btn ${isAdded ? 'added' : ''}`}
                  onClick={() => handleAdd(product.id)}
                >
                  {isAdded ? (
                    <>
                      <Check size={16} /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} /> Claim Deal
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
