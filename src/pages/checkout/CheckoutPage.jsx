import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Lock, Trash2, ShieldCheck, ShoppingBag, ArrowLeft, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrdersContext';
import { formatMoney } from '../../utils/money';
import { getEstimatedDeliveryDate } from '../../utils/dateUtils';
import './CheckoutPage.css';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, summary, deliveryOptions, updateQuantity, removeFromCart, updateDeliveryOption, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder(cart, summary);
      clearCart();
      setIsSubmitting(false);
      if (order) {
        navigate('/orders');
      }
    }, 600);
  };

  return (
    <div className="checkout-container">
      {/* Dedicated Flagship Checkout Header */}
      <header className="checkout-header">
        <div className="checkout-header-content">
          <Link to="/" className="checkout-logo">
            <div className="logo-icon-box">
              <Sparkles size={16} />
            </div>
            <span className="logo-main">AURA</span>
            <span className="logo-sub">2026</span>
          </Link>

          <div className="checkout-title-central">
            Review Order (
            <Link to="/" className="return-home-link">
              {summary.totalQuantity} {summary.totalQuantity === 1 ? 'item' : 'items'}
            </Link>
            )
          </div>

          <div className="checkout-secure-badge">
            <Lock size={16} className="lock-icon" />
            <span className="secure-text hide-mobile">256-Bit SSL Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="checkout-page-body">
        <h1 className="checkout-page-title">Order Checkout</h1>

        {cart.length === 0 ? (
          <div className="empty-cart-card">
            <ShoppingBag size={56} className="empty-cart-icon" />
            <h2>Your Shopping Cart is Empty</h2>
            <p>Your shopping cart has no items. Explore our product catalog to discover deals.</p>
            <Link to="/" className="back-to-shop-btn">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="checkout-grid">
            {/* Left Column: Order Items */}
            <div className="checkout-items-list">
              {cart.map((cartItem) => {
                const { product, deliveryOption } = cartItem;
                const estimatedDateStr = getEstimatedDeliveryDate(deliveryOption.deliveryDays);

                return (
                  <div key={cartItem.productId} className="cart-item-card">
                    <div className="delivery-date-banner">
                      Estimated Arrival: <span className="highlight-date">{estimatedDateStr}</span>
                    </div>

                    <div className="cart-item-details-grid">
                      {/* Product Image */}
                      <div className="cart-item-image-wrapper">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="cart-item-image"
                        />
                      </div>

                      {/* Product Info & Quantity Actions */}
                      <div className="cart-item-info">
                        <h3 className="cart-item-name">{product.name}</h3>
                        <div className="cart-item-price">
                          ${formatMoney(product.priceCents)}
                        </div>

                        <div className="cart-item-quantity-row">
                          <label htmlFor={`cart-qty-${cartItem.productId}`}>Qty:</label>
                          <select
                            id={`cart-qty-${cartItem.productId}`}
                            value={cartItem.quantity}
                            onChange={(e) =>
                              updateQuantity(cartItem.productId, Number(e.target.value))
                            }
                            className="cart-qty-select"
                          >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            className="delete-item-btn"
                            onClick={() => removeFromCart(cartItem.productId)}
                            title="Remove item"
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Delivery Option Radio Buttons */}
                      <div className="delivery-options-container">
                        <div className="delivery-options-title">
                          Select Delivery Method:
                        </div>

                        {deliveryOptions.map((option) => {
                          const optionDateStr = getEstimatedDeliveryDate(option.deliveryDays);
                          const isSelected = cartItem.deliveryOptionId === option.id;

                          return (
                            <label
                              key={option.id}
                              className={`delivery-option-item ${isSelected ? 'selected' : ''}`}
                            >
                              <input
                                type="radio"
                                name={`delivery-option-${cartItem.productId}`}
                                checked={isSelected}
                                onChange={() =>
                                  updateDeliveryOption(cartItem.productId, option.id)
                                }
                                className="delivery-radio-input"
                              />
                              <div className="delivery-option-details">
                                <div className="delivery-option-date">{optionDateStr}</div>
                                <div className="delivery-option-price">
                                  {option.priceCents === 0
                                    ? 'FREE Express Shipping'
                                    : `$${formatMoney(option.priceCents)} Standard Shipping`}
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="payment-summary-column">
              <div className="payment-summary-card">
                <h2 className="payment-summary-title">Payment Summary</h2>

                <div className="payment-summary-row">
                  <span>Items ({summary.totalQuantity}):</span>
                  <span className="money-amount">${formatMoney(summary.productPriceCents)}</span>
                </div>

                <div className="payment-summary-row">
                  <span>Shipping & handling:</span>
                  <span className="money-amount">${formatMoney(summary.shippingCostCents)}</span>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <span>Total before tax:</span>
                  <span className="money-amount">${formatMoney(summary.totalCostBeforeTaxCents)}</span>
                </div>

                <div className="payment-summary-row">
                  <span>Estimated tax (10%):</span>
                  <span className="money-amount">${formatMoney(summary.taxCents)}</span>
                </div>

                <div className="payment-summary-divider"></div>

                <div className="payment-summary-row total-row">
                  <span>Order Total:</span>
                  <span className="money-amount grand-total">${formatMoney(summary.totalCostCents)}</span>
                </div>

                <button
                  type="button"
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing Order...' : 'Complete Order'}
                </button>

                <div className="checkout-guarantee-note">
                  <ShieldCheck size={16} /> Guaranteed Safe & Secure Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
