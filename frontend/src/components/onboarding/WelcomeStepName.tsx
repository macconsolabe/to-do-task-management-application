import { useState, useEffect } from 'react';

interface WelcomeStepNameProps {
  value: string;
  error?: string;
  onNext: (name: string) => void;
  isVisible: boolean;
}

export function WelcomeStepName({ value, error, onNext, isVisible }: WelcomeStepNameProps) {
  const [name, setName] = useState(value);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNext(name.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.trim()) {
      handleSubmit(e);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className={`text-center max-w-md w-full transition-all duration-500 transform ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F4C430' }}></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
          <p className="text-sm text-gray-500 font-light">Step 1 of 3</p>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-3xl font-light text-gray-800 mb-4">
            What's your name?
          </h2>
          <p className="text-gray-600 font-light">
            We'll use this to personalize your experience
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your full name"
              className="w-full px-6 py-4 text-xl text-center border-2 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-md transition-all"
              style={{ 
                background: 'rgba(255, 255, 255, 0.4)',
                borderColor: error ? '#ef4444' : '#F4C430',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
                '--tw-ring-color': '#F4C430'
              } as any}
              autoFocus
              maxLength={100}
            />
            {error && (
              <p className="mt-2 text-red-600 text-sm">{error}</p>
            )}
          </div>

          {/* Next Button */}
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full px-6 py-4 text-white rounded-2xl font-medium text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 4px 15px rgba(0,0,0,0.1)'
            }}
          >
            {/* Metallic reflection overlay */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.1) 100%)'
              }}
            ></div>
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Next</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
