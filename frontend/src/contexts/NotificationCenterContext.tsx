import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Notification types
export type NotificationType = 
  | 'task_created' 
  | 'task_updated' 
  | 'task_deleted'
  | 'status_changed' 
  | 'priority_changed' 
  | 'due_date_changed'
  | 'title_updated'
  | 'description_updated'
  | 'subtask_added'
  | 'subtask_removed'
  | 'subtask_completed'
  | 'subtask_updated'
  | 'progress_updated'
  | 'email_sent'
  | 'sms_sent';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  taskId?: number;
  taskTitle?: string;
}

interface NotificationCenterContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  isNotificationCenterOpen: boolean;
  setIsNotificationCenterOpen: (open: boolean) => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationCenterContext = createContext<NotificationCenterContextType | undefined>(undefined);

// Provider
interface NotificationCenterProviderProps {
  children: ReactNode;
}

export function NotificationCenterProvider({ children }: NotificationCenterProviderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      isRead: false
    };

    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep last 50 notifications
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Auto-mark all as read when notification center is opened
  const handleToggleNotificationCenter = (open: boolean) => {
    setIsNotificationCenterOpen(open);
    if (open && unreadCount > 0) {
      // Small delay to show the counter before clearing
      setTimeout(() => {
        markAllAsRead();
      }, 500);
    }
  };

  const value: NotificationCenterContextType = {
    notifications,
    unreadCount,
    isNotificationCenterOpen,
    setIsNotificationCenterOpen: handleToggleNotificationCenter,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications
  };

  return (
    <NotificationCenterContext.Provider value={value}>
      {children}
    </NotificationCenterContext.Provider>
  );
}

// Hook
export function useNotificationCenter() {
  const context = useContext(NotificationCenterContext);
  if (context === undefined) {
    throw new Error('useNotificationCenter must be used within a NotificationCenterProvider');
  }
  return context;
}
