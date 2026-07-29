import { Router } from 'express';
import {
  getUnreadCount,
  listNotifications,
  markAllAsRead,
  markAsRead,
} from '../controllers/notificationController.js';

export const notificationRouter = Router();

notificationRouter.get('/', listNotifications);
notificationRouter.get('/unread-count', getUnreadCount);
notificationRouter.patch('/read-all', markAllAsRead);
notificationRouter.patch('/:notificationId/read', markAsRead);
