interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

export function Notification({ message, type }: NotificationProps) {
  return (
    <div 
      className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-2xl shadow-lg ${
        type === 'success' 
          ? 'bg-white border text-green-700' 
          : 'bg-white border text-red-700'
      }`}
      style={{ borderColor: type === 'success' ? '#F4C430' : '#EF4444' }}
    >
      <div className="flex items-center gap-3">
        {type === 'success' ? (
          <span className="text-xl">✅</span>
        ) : (
          <span className="text-xl">⚠️</span>
        )}
        <span className="font-light">{message}</span>
      </div>
    </div>
  );
}
