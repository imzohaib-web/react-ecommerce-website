import { Bell, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { NotificationList } from './NotificationList';
import { useNotifications } from './useNotifications';

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();
  const recentNotifications = notifications.slice(0, 5);

  return (
    <div className="relative">
      <button
        className="relative p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-amber-400 text-slate-950 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <section className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-900 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <header className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
            <div className="text-xs">
              <strong className="block">Notifications</strong>
              <span className="text-[11px] text-slate-400">
                {unreadCount ? `${unreadCount} unread` : 'All caught up'}
              </span>
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                onClick={() => markAllRead.mutate()}
              >
                <CheckCheck size={14} /> Mark read
              </button>
            )}
          </header>

          <div className="max-h-72 overflow-y-auto p-2">
            <NotificationList notifications={recentNotifications} onMarkRead={(id) => markRead.mutate(id)} compact />
          </div>

          <Link
            to="/notifications"
            className="block text-center text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 py-2.5 border-t border-slate-100 transition-colors"
            onClick={() => setOpen(false)}
          >
            View all notifications
          </Link>
        </section>
      )}
    </div>
  );
}
