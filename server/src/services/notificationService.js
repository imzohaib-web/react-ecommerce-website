import { Notification } from '../models/Notification.js';

let io;

export function configureNotificationSocket(socketServer) {
  io = socketServer;
}

export async function createNotification({ userId, title, message, type }) {
  const notification = await Notification.create({ userId, title, message, type });
  io?.to(`user:${userId}`).emit('notification:new', notification.toJSON());
  return notification;
}

export function notifyQuizCompleted(userId, quizName) {
  return createNotification({
    userId,
    title: 'Quiz completed',
    message: `You completed ${quizName}.`,
    type: 'quiz_completed',
  });
}

export function notifyCertificateGenerated(userId, courseName) {
  return createNotification({
    userId,
    title: 'Certificate ready',
    message: `Your certificate for ${courseName} is ready to view.`,
    type: 'certificate_generated',
  });
}

export function notifyCourseCompleted(userId, courseName) {
  return createNotification({
    userId,
    title: 'Course completed',
    message: `Congratulations on completing ${courseName}.`,
    type: 'course_completed',
  });
}
