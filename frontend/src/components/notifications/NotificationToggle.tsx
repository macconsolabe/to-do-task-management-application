import { useRef, useEffect } from 'react';
import { useNotificationCenter } from '../../contexts/NotificationCenterContext';
import { NotificationCenter } from './NotificationCenter';

export function NotificationToggle() {
  const { 
    unreadCount, 
    isNotificationCenterOpen, 
    setIsNotificationCenterOpen 
  } = useNotificationCenter();
  
  const toggleRef = useRef<HTMLDivElement>(null);

  // Close notification center when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
        setIsNotificationCenterOpen(false);
      }
    };

    if (isNotificationCenterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationCenterOpen, setIsNotificationCenterOpen]);

  return (
    <div className="relative" ref={toggleRef}>
      <button
        onClick={() => setIsNotificationCenterOpen(!isNotificationCenterOpen)}
        className="relative p-3 text-gray-600 hover:text-gray-800 rounded-full transition-colors hover:bg-black hover:bg-opacity-5"
      >
        {/* Bell/Ear Icon */}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 19.462A8.978 8.978 0 003 15a9 9 0 0118 0 8.978 8.978 0 00-1.868 4.462M7 15a5 5 0 1110 0v1a3 3 0 11-6 0v-1z" />
        </svg>
        
        {/* Counter Badge */}
        {unreadCount > 0 && (
          <div 
            className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center text-xs font-medium text-white rounded-full animate-pulse"
            style={{ 
              background: 'linear-gradient(145deg, #EF4444 0%, #DC2626 50%, #EF4444 100%)',
              boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
            }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </button>

      {/* Notification Center Dropdown */}
      {isNotificationCenterOpen && <NotificationCenter />}
    </div>
  );
}
