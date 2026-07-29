import { Award, Bell, BookOpenCheck, Check, CircleCheck, Info } from 'lucide-react';

const icons = {
  quiz_completed: CircleCheck,
  certificate_generated: Award,
  course_completed: BookOpenCheck,
  system: Info,
};

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export function NotificationList({ notifications, onMarkRead, compact = false }) {
  if (!notifications.length) {
    return <div className="notifications-empty"><Bell size={24} /><p>No notifications yet.</p></div>;
  }

  return (
    <div className={`notification-list${compact ? ' notification-list-compact' : ''}`}>
      {notifications.map((notification) => {
        const Icon = icons[notification.type] || Info;
        return (
          <article className={`notification-item${notification.read ? '' : ' notification-unread'}`} key={notification._id}>
            <span className="notification-type-icon"><Icon size={19} /></span>
            <div className="notification-copy">
              <h2>{notification.title}</h2>
              <p>{notification.message}</p>
              <time dateTime={notification.createdAt}>{formatDate(notification.createdAt)}</time>
            </div>
            {!notification.read && (
              <button className="notification-read-button" type="button" title="Mark as read" aria-label={`Mark ${notification.title} as read`} onClick={() => onMarkRead(notification._id)}>
                <Check size={17} />
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
}
