import { Bell, CheckCircle2, Package, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import './NotificationsPage.css';

export function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: 'Order Shipped!',
      message: 'Your order #27cba69d has been shipped and is on its way.',
      time: '2 hours ago',
      type: 'shipping'
    },
    {
      id: 2,
      title: 'Summer Sale Flash Deal',
      message: 'Exclusive 20% discount on select Home & Kitchen items.',
      time: '1 day ago',
      type: 'promo'
    },
    {
      id: 3,
      title: 'Account Security Update',
      message: 'Your account security preferences were updated successfully.',
      time: '3 days ago',
      type: 'system'
    }
  ];

  return (
    <div className="notifications-page-container">
      <main className="notifications-content">
        <h1 className="notifications-page-title">
          <Bell size={28} /> Notifications
        </h1>

        <div className="notifications-card">
          {notifications.map((n) => (
            <div key={n.id} className="notification-item-row">
              <div className="notification-icon-wrapper">
                {n.type === 'shipping' && <Package size={20} className="shipping-icon" />}
                {n.type === 'promo' && <Sparkles size={20} className="promo-icon" />}
                {n.type === 'system' && <CheckCircle2 size={20} className="system-icon" />}
              </div>
              <div className="notification-text-content">
                <div className="notification-item-header">
                  <h3 className="notification-item-title">{n.title}</h3>
                  <span className="notification-item-time">{n.time}</span>
                </div>
                <p className="notification-item-msg">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
