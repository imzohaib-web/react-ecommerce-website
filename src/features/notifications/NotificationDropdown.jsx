import { Bell, CheckCheck } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { NotificationList } from './NotificationList';
import { useNotifications } from './useNotifications';
import './notifications.css';

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();
  const recentNotifications = notifications.slice(0, 5);

  return (
    <div className="notification-menu">
      <button className="notification-bell" type="button" onClick={() => setOpen((value) => !value)} aria-label="Notifications" aria-expanded={open}>
        <Bell size={22} />
        {unreadCount > 0 && <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>}
      </button>
      {open && (
        <section className="notification-dropdown" aria-label="Recent notifications">
          <header className="notification-dropdown-header">
            <div><strong>Notifications</strong><span>{unreadCount ? `${unreadCount} unread` : 'All caught up'}</span></div>
            {unreadCount > 0 && <button type="button" className="text-action" onClick={() => markAllRead.mutate()}><CheckCheck size={16} /> Mark all read</button>}
          </header>
          <NotificationList notifications={recentNotifications} onMarkRead={(id) => markRead.mutate(id)} compact />
          <Link to="/notifications" className="view-all-notifications" onClick={() => setOpen(false)}>View all notifications</Link>
        </section>
      )}
    </div>
  );
}
