import { Notification } from '../models/Notification.js';

function notificationQuery(userId) {
  return { userId };
}

export async function listNotifications(req, res, next) {
  try {
    const notifications = await Notification.find(notificationQuery(req.userId))
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    res.json({ notifications });
  } catch (error) {
    next(error);
  }
}

export async function getUnreadCount(req, res, next) {
  try {
    const unreadCount = await Notification.countDocuments({ ...notificationQuery(req.userId), read: false });
    res.json({ unreadCount });
  } catch (error) {
    next(error);
  }
}

export async function markAsRead(req, res, next) {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.notificationId, ...notificationQuery(req.userId) },
      { read: true },
      { new: true },
    );
    if (!notification) return res.status(404).json({ message: 'Notification not found.' });
    return res.json({ notification });
  } catch (error) {
    return next(error);
  }
}

export async function markAllAsRead(req, res, next) {
  try {
    await Notification.updateMany({ ...notificationQuery(req.userId), read: false }, { read: true });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
