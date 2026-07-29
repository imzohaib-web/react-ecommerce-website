import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { DEMO_USER_ID, notificationApi } from './api';

const notificationsKey = ['notifications'];
const unreadCountKey = ['notifications', 'unread-count'];

export function useNotifications() {
  const queryClient = useQueryClient();
  const notifications = useQuery({ queryKey: notificationsKey, queryFn: notificationApi.list, retry: false });
  const unreadCount = useQuery({ queryKey: unreadCountKey, queryFn: notificationApi.unreadCount, retry: false });

  useEffect(() => {
    const socketUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');
    const socket = io(socketUrl, { auth: { userId: DEMO_USER_ID } });
    socket.on('notification:new', () => {
      queryClient.invalidateQueries({ queryKey: notificationsKey });
      queryClient.invalidateQueries({ queryKey: unreadCountKey });
    });
    return () => socket.disconnect();
  }, [queryClient]);

  const markRead = useMutation({
    mutationFn: notificationApi.markRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKey });
      queryClient.invalidateQueries({ queryKey: unreadCountKey });
    },
  });
  const markAllRead = useMutation({
    mutationFn: notificationApi.markAllRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKey });
      queryClient.invalidateQueries({ queryKey: unreadCountKey });
    },
  });

  return { notifications: notifications.data?.notifications || [], unreadCount: unreadCount.data?.unreadCount || 0, markRead, markAllRead };
}
