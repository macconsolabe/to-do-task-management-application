import { useNotificationCenter } from '../../contexts/NotificationCenterContext';

export function NotificationHeader() {
  const { notifications, unreadCount, markAllAsRead, clearNotifications } = useNotificationCenter();

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs px-3 py-1 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="text-xs px-3 py-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{notifications.length} total • {unreadCount} unread</span>
      </div>
    </div>
  );
}
