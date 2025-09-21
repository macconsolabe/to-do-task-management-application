import { useNotificationCenter } from '../../contexts/NotificationCenterContext';

// Components
import { NotificationHeader } from './NotificationHeader';
import { NotificationList } from './NotificationList';

export function NotificationCenter() {
  const { notifications } = useNotificationCenter();

  return (
    <div 
      className="absolute top-full right-0 mt-2 w-96 max-h-96 rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50"
      style={{ 
        background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.15)'
      }}
    >
      {/* Metallic reflection overlay */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
        }}
      ></div>

      <div className="relative z-10">
        <NotificationHeader />
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            <NotificationList notifications={notifications} />
          ) : (
            <div className="p-6 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 19.462A8.978 8.978 0 003 15a9 9 0 0118 0 8.978 8.978 0 00-1.868 4.462M7 15a5 5 0 1110 0v1a3 3 0 11-6 0v-1z" />
              </svg>
              <p className="text-gray-500 font-light">No notifications yet</p>
              <p className="text-xs text-gray-400 mt-1">Your activity will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
