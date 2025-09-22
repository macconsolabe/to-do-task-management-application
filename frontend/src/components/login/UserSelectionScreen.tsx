import { useState, useEffect } from 'react';
import type { User } from '../../services/types';
import { UserBubble } from './UserBubble';
import ezraLogo from '../../assets/ezralogo.png';

interface UserSelectionScreenProps {
  users: User[];
  onUserSelect: (user: User) => void;
  onCreateNewAccount: () => void;
}

export function UserSelectionScreen({ users, onUserSelect, onCreateNewAccount }: UserSelectionScreenProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showCreateLink, setShowCreateLink] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

  useEffect(() => {
    // Staggered animation sequence
    const timer1 = setTimeout(() => setShowLogo(true), 200);
    const timer2 = setTimeout(() => setShowTitle(true), 600);
    const timer3 = setTimeout(() => setShowUsers(true), 1000);
    const timer4 = setTimeout(() => setShowCreateLink(true), 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleUserSelect = async (user: User) => {
    setLoadingUserId(user.id);
    try {
      await onUserSelect(user);
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Metallic Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(244, 196, 48, 0.25) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(233, 236, 239, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 40% 40%, rgba(248, 249, 250, 0.2) 0%, transparent 60%),
            radial-gradient(circle at 60% 10%, rgba(244, 196, 48, 0.15) 0%, transparent 40%),
            linear-gradient(135deg, #f0f2f5 0%, #e8eaed 25%, #f5f7fa 50%, #e8eaed 75%, #f0f2f5 100%)
          `,
          backgroundSize: '300% 300%',
          animation: 'metallicFlow 15s ease-in-out infinite'
        }}
      >
        {/* Floating Metallic Particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-40"
              style={{
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                background: i % 4 === 0 ? '#F4C430' : i % 4 === 1 ? '#e6b800' : i % 4 === 2 ? '#d1d5db' : '#f8f9fa',
                boxShadow: i % 2 === 0 ? '0 0 10px rgba(244, 196, 48, 0.3)' : '0 0 8px rgba(233, 236, 239, 0.4)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float${i % 3} ${10 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Enhanced Geometric Patterns */}
        <div className="absolute inset-0 opacity-15">
          <div 
            className="absolute w-96 h-96 rounded-full"
            style={{
              top: '10%',
              left: '15%',
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(244, 196, 48, 0.1) 25%, transparent 50%, rgba(233, 236, 239, 0.1) 75%, transparent 100%)',
              animation: 'rotate 40s linear infinite'
            }}
          ></div>
          <div 
            className="absolute w-64 h-64 rounded-full"
            style={{
              bottom: '20%',
              right: '20%',
              background: 'conic-gradient(from 180deg, transparent 0%, rgba(244, 196, 48, 0.15) 30%, transparent 60%, rgba(248, 249, 250, 0.1) 90%, transparent 100%)',
              animation: 'rotate 35s linear infinite reverse'
            }}
          ></div>
          <div 
            className="absolute w-48 h-48 rounded-full"
            style={{
              top: '60%',
              left: '70%',
              background: 'radial-gradient(circle, rgba(244, 196, 48, 0.08) 0%, transparent 70%)',
              animation: 'float1 20s ease-in-out infinite'
            }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-lg w-full">
          
          {/* Ezra Logo */}
          <div className={`mb-8 transition-all duration-1000 transform ${
            showLogo ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}>
            <div 
              className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center overflow-hidden relative"
              style={{ 
                background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2), 0 8px 25px rgba(0,0,0,0.15)'
              }}
            >
              {/* Metallic reflection overlay */}
              <div 
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
                }}
              ></div>
              <img 
                src={ezraLogo} 
                alt="Ezra Logo" 
                className="w-12 h-12 object-contain relative z-10"
              />
            </div>
          </div>

          {/* Welcome Back Title */}
          <div className={`mb-12 transition-all duration-1000 transform ${
            showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h1 className="text-4xl font-light text-gray-800 mb-4">
              Welcome back!
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Choose your account to continue
            </p>
          </div>

          {/* User Selection Grid */}
          <div className={`mb-12 transition-all duration-1000 transform ${
            showUsers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className={`gap-8 justify-items-center max-w-4xl mx-auto ${
              users.length === 1 ? 'flex justify-center' :
              users.length === 2 ? 'grid grid-cols-2' :
              users.length === 3 ? 'grid grid-cols-3' :
              users.length === 4 ? 'grid grid-cols-2 md:grid-cols-4' :
              'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
            }`}>
              {users.slice(0, 5).map((user) => (
                <UserBubble
                  key={user.id}
                  user={user}
                  onClick={handleUserSelect}
                  isLoading={loadingUserId === user.id}
                />
              ))}
            </div>
            {users.length > 5 && (
              <p className="text-sm text-gray-500 font-light mt-6 text-center">
                Showing first 5 accounts. Contact admin for more users.
              </p>
            )}
          </div>

          {/* Create New Account Link */}
          <div className={`transition-all duration-1000 transform ${
            showCreateLink ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={onCreateNewAccount}
              className="text-gray-600 hover:text-yellow-600 transition-colors font-light text-sm underline decoration-dotted underline-offset-4"
              style={{ color: '#6b7280' }}
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
