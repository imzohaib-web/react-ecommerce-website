import { Link } from 'react-router-dom';
import { Package, RotateCcw, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import { useOrders } from '../../context/OrdersContext';
import { useCart } from '../../context/CartContext';
import { formatMoney } from '../../utils/money';
import { formatDate } from '../../utils/dateUtils';
import './OrderPage.css';

export function OrderPage() {
  const { orders } = useOrders();
  const { addToCart } = useCart();

  return (
    <div className="orders-page-container">
      <main className="orders-page-content">
        <h1 className="orders-page-title">
          <Package size={28} /> Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="empty-orders-card">
            <ShoppingBag size={56} className="empty-orders-icon" />
            <h2>No orders placed yet</h2>
            <p>You have not placed any orders yet. Start exploring products and build your shopping list!</p>
            <Link to="/" className="explore-catalog-btn">
              Explore Catalog <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const orderDateStr = formatDate(order.orderTimeMs);

              return (
                <div key={order.id} className="order-card">
                  {/* Order Card Header */}
                  <div className="order-card-header">
                    <div className="order-header-left">
                      <div className="order-meta-group">
                        <span className="meta-label">ORDER PLACED</span>
                        <span className="meta-value">{orderDateStr}</span>
                      </div>
                      <div className="order-meta-group">
                        <span className="meta-label">TOTAL</span>
                        <span className="meta-value">${formatMoney(order.totalCostCents)}</span>
                      </div>
                      <div className="order-meta-group">
                        <span className="meta-label">SHIP TO</span>
                        <span className="meta-value highlight-link">Customer</span>
                      </div>
                    </div>

                    <div className="order-header-right">
                      <div className="order-meta-group align-right">
                        <span className="meta-label">ORDER # {order.id}</span>
                        <div className="order-actions-links">
                          <span className="meta-link">View invoice</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Card Items List */}
                  <div className="order-card-body">
                    {order.products.map((item) => {
                      const { product } = item;
                      if (!product) return null;

                      const deliveryDateStr = formatDate(item.estimatedDeliveryTimeMs);
                      const isDelivered = Date.now() > item.estimatedDeliveryTimeMs;

                      return (
                        <div key={item.productId} className="order-product-row">
                          <div className="product-delivery-badge">
                            <Truck size={18} className="truck-icon" />
                            <span>
                              {isDelivered ? `Delivered on ${deliveryDateStr}` : `Arriving ${deliveryDateStr}`}
                            </span>
                          </div>

                          <div className="order-product-details-grid">
                            {/* Product Image */}
                            <div className="order-product-image-wrapper">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="order-product-image"
                              />
                            </div>

                            {/* Product Description */}
                            <div className="order-product-info">
                              <h3 className="order-product-title">{product.name}</h3>
                              <div className="order-product-qty">
                                Quantity: {item.quantity}
                              </div>
                              <div className="order-product-price">
                                ${formatMoney(product.priceCents * item.quantity)}
                              </div>

                              <button
                                type="button"
                                className="buy-again-btn"
                                onClick={() => addToCart(product.id, item.quantity)}
                              >
                                <RotateCcw size={15} /> Buy it again
                              </button>
                            </div>

                            {/* Tracking Button */}
                            <div className="order-product-actions">
                              <Link
                                to={`/tracking?orderId=${order.id}&productId=${product.id}`}
                                className="track-package-btn"
                              >
                                Track package
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
