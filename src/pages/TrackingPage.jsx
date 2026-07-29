import { useSearchParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { productsData } from '../data/productsData';
import { formatDate } from '../utils/dateUtils';
import { ArrowLeft, PackageCheck, Truck, Clock, MapPin } from 'lucide-react';
import './TrackingPage.css';

export function TrackingPage() {
  const [searchParams] = useSearchParams();
  const { orders } = useOrders();

  const orderId = searchParams.get('orderId');
  const productId = searchParams.get('productId');

  // Find order or fallback to most recent order
  const targetOrder = orders.find((o) => o.id === orderId) || orders[0];

  if (!targetOrder) {
    return (
      <div className="tracking-page-container">
        <div className="tracking-card empty">
          <h2>No Order Found</h2>
          <p>We could not find the specified package tracking details.</p>
          <Link to="/orders" className="back-link">
            <ArrowLeft size={16} /> View all orders
          </Link>
        </div>
      </div>
    );
  }

  // Find target product in order
  const targetItem = targetOrder.products.find((p) => p.productId === productId) || targetOrder.products[0];
  const product = targetItem?.product || productsData.find((p) => p.id === targetItem?.productId) || productsData[0];

  const now = Date.now();
  const orderTimeMs = targetOrder.orderTimeMs || (now - 1000 * 60 * 60 * 24 * 2);
  const deliveryTimeMs = targetItem?.estimatedDeliveryTimeMs || (now + 1000 * 60 * 60 * 24 * 3);

  const totalDuration = Math.max(1, deliveryTimeMs - orderTimeMs);
  const elapsed = Math.max(0, now - orderTimeMs);
  const progressPercent = Math.min(100, Math.max(15, Math.round((elapsed / totalDuration) * 100)));

  // Status calculation
  let status = 'Preparing';
  let stepIndex = 1;
  if (progressPercent >= 100) {
    status = 'Delivered';
    stepIndex = 3;
  } else if (progressPercent >= 35) {
    status = 'Shipped';
    stepIndex = 2;
  }

  const deliveryDateStr = formatDate(deliveryTimeMs);

  return (
    <div className="tracking-page-container">
      <main className="tracking-content">
        <Link to="/orders" className="back-to-orders-link">
          <ArrowLeft size={16} /> View all orders
        </Link>

        <div className="tracking-card">
          <div className="tracking-header">
            <div className="delivery-status-group">
              <span className="delivery-status-label">Estimated Delivery</span>
              <h1 className="delivery-date-title">
                {status === 'Delivered' ? `Delivered on ${deliveryDateStr}` : `Arriving ${deliveryDateStr}`}
              </h1>
            </div>
            <div className="tracking-id-badge">
              Order #{targetOrder.id.slice(0, 12)}...
            </div>
          </div>

          {/* Product Specs */}
          <div className="tracking-product-summary">
            <div className="tracking-image-wrapper">
              <img src={product.image} alt={product.name} className="tracking-product-img" />
            </div>
            <div className="tracking-product-info">
              <h2 className="tracking-product-name">{product.name}</h2>
              <div className="tracking-product-qty">Quantity: {targetItem.quantity}</div>
            </div>
          </div>

          {/* Progress Timeline Labels */}
          <div className="progress-timeline-labels">
            <div className={`step-label ${stepIndex >= 1 ? 'active' : ''}`}>
              <div className="step-icon">
                <Clock size={16} />
              </div>
              <span>Preparing</span>
            </div>

            <div className={`step-label ${stepIndex >= 2 ? 'active' : ''}`}>
              <div className="step-icon">
                <Truck size={16} />
              </div>
              <span>Shipped</span>
            </div>

            <div className={`step-label ${stepIndex >= 3 ? 'active' : ''}`}>
              <div className="step-icon">
                <PackageCheck size={16} />
              </div>
              <span>Delivered</span>
            </div>
          </div>

          {/* Progress Bar Visual */}
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="progress-pulse-head"></div>
            </div>
          </div>

          <div className="tracking-live-note">
            <MapPin size={16} className="map-pin-icon" />
            <span>
              {status === 'Preparing' && 'Package is being processed and packaged at fulfillment center.'}
              {status === 'Shipped' && 'Package is in transit with carrier. On schedule for delivery.'}
              {status === 'Delivered' && 'Package was left near front door or porch.'}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}