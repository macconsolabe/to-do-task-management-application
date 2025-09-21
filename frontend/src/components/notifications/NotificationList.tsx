import type { NotificationItem } from '../../contexts/NotificationCenterContext';
import { NotificationItem as NotificationItemComponent } from './NotificationItem';

interface NotificationListProps {
  notifications: NotificationItem[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  return (
    <div className="divide-y divide-gray-100">
      {notifications.map((notification) => (
        <NotificationItemComponent 
          key={notification.id} 
          notification={notification} 
        />
      ))}
    </div>
  );
}