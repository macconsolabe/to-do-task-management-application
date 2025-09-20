import { useEffect, useState } from 'react';
import ezraLogo from '../../assets/ezralogo.png';

interface WelcomeIntroProps {
  onContinue: () => void;
}

export function WelcomeIntro({ onContinue }: WelcomeIntroProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Staggered animation sequence
    const timer1 = setTimeout(() => setShowLogo(true), 300);
    const timer2 = setTimeout(() => setShowTitle(true), 800);
    const timer3 = setTimeout(() => setShowSubtitle(true), 1300);
    const timer4 = setTimeout(() => setShowButton(true), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Ezra Logo */}
        <div className={`mb-8 transition-all duration-1000 transform ${
          showLogo ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}>
          <div 
            className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center overflow-hidden relative"
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
              className="w-16 h-16 object-contain relative z-10"
            />
          </div>
        </div>

        {/* Welcome Title */}
        <div className={`mb-4 transition-all duration-1000 transform ${
          showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h1 className="text-4xl font-light text-gray-800 mb-2">
            Welcome to <span style={{ color: '#F4C430' }} className="font-medium">ezraTask</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`mb-12 transition-all duration-1000 transform ${
          showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Your intelligent task management companion.<br />
            Let's get you started with a quick setup.
          </p>
        </div>

        {/* Continue Button */}
        <div className={`transition-all duration-1000 transform ${
          showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={onContinue}
            className="px-8 py-4 text-white rounded-2xl font-medium text-lg hover:shadow-lg transition-all duration-200 flex items-center gap-3 mx-auto relative overflow-hidden"
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
            <span className="relative z-10">Get Started</span>
            <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
