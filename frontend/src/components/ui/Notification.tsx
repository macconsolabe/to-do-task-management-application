interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

export function Notification({ message, type }: NotificationProps) {
  return (
    <div 
      className="fixed top-6 right-6 z-[9999] px-6 py-4 rounded-2xl shadow-xl relative overflow-hidden"
      style={{ 
        position: 'fixed',
        top: '24px',
        right: '24px',
        background: type === 'success' 
          ? 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)'
          : 'linear-gradient(145deg, #fef2f2 0%, #fee2e2 50%, #fef2f2 100%)',
        boxShadow: type === 'success'
          ? 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 10px 25px rgba(244,196,48,0.15)'
          : 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 10px 25px rgba(239,68,68,0.15)'
      }}
    >
      {/* Metallic reflection overlay */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
        }}
      ></div>
      
      <div className="relative z-10 flex items-center gap-3">
        <div 
          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium"
          style={{ 
            background: type === 'success' 
              ? 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)'
              : 'linear-gradient(145deg, #EF4444 0%, #DC2626 50%, #EF4444 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
          }}
        >
          {type === 'success' ? '✓' : '!'}
        </div>
        <span className={`font-light ${type === 'success' ? 'text-gray-800' : 'text-red-800'}`}>
          {message}
        </span>
      </div>
    </div>
  );
}
