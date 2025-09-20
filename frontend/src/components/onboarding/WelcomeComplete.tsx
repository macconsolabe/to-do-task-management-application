import { useEffect, useState } from 'react';

interface WelcomeCompleteProps {
  userName: string;
  onComplete: () => void;
  isVisible: boolean;
}

export function WelcomeComplete({ userName, onComplete, isVisible }: WelcomeCompleteProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowContent(true), 100);
      
      // Auto-transition to main app after showing success
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 3000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(completeTimer);
      };
    } else {
      setShowContent(false);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className={`text-center max-w-md transition-all duration-500 transform ${
        showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        
        {/* Success Animation */}
        <div className="mb-8">
          <div 
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center overflow-hidden relative mb-6"
            style={{ 
              background: 'linear-gradient(145deg, #10b981 0%, #059669 50%, #10b981 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2), 0 8px 25px rgba(16, 185, 129, 0.3)'
            }}
          >
            {/* Metallic reflection overlay */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)'
              }}
            ></div>
            <svg className="w-12 h-12 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-light text-gray-800 mb-4">
            Welcome aboard, <span style={{ color: '#F4C430' }} className="font-medium">{userName}</span>!
          </h2>
          <p className="text-gray-600 font-light">
            Your account has been created successfully.<br />
            Let's start managing your tasks!
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="flex items-center justify-center gap-3 text-gray-500">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-yellow-400 rounded-full animate-spin"></div>
          <span className="font-light">Preparing your workspace...</span>
        </div>
      </div>
    </div>
  );
}
