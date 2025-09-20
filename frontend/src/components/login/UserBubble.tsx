import type { User } from '../../services/api';

interface UserBubbleProps {
  user: User;
  onClick: (user: User) => void;
  isLoading?: boolean;
}

export function UserBubble({ user, onClick, isLoading }: UserBubbleProps) {
  // Get user initials
  const getUserInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="text-center">
      {/* User Avatar Bubble */}
      <button
        onClick={() => onClick(user)}
        disabled={isLoading}
        className="w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden mx-auto mb-3"
        style={{ 
          background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2), 0 8px 25px rgba(244, 196, 48, 0.3)'
        }}
      >
        {/* Metallic reflection overlay */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
          }}
        ></div>
        
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" />
        ) : (
          <span className="relative z-10">{getUserInitials(user.name)}</span>
        )}
      </button>

      {/* User Name */}
      <div className="max-w-32 px-2">
        <h3 className="text-gray-800 font-medium text-sm text-center leading-tight break-words">{user.name}</h3>
        <p className="text-gray-500 text-xs font-light text-center leading-tight break-words mt-1">{user.email}</p>
      </div>
    </div>
  );
}
