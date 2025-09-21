import { useEffect } from 'react';
import { useHelp } from '../../contexts/HelpContext';

// Components
import { HelpHeader } from './HelpHeader';
import { HelpSidebar } from './HelpSidebar';
import { HelpGettingStarted } from './HelpGettingStarted';
import { HelpFeatures } from './HelpFeatures';
import { HelpShortcuts } from './HelpShortcuts';
import { HelpAbout } from './HelpAbout';

export function HelpModal() {
  const { isHelpOpen, setIsHelpOpen, activeHelpSection } = useHelp();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isHelpOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isHelpOpen]);

  if (!isHelpOpen) return null;

  const handleClose = () => {
    setIsHelpOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const renderHelpContent = () => {
    switch (activeHelpSection) {
      case 'getting-started':
        return <HelpGettingStarted />;
      case 'features':
        return <HelpFeatures />;
      case 'shortcuts':
        return <HelpShortcuts />;
      case 'about':
        return <HelpAbout />;
      default:
        return <HelpGettingStarted />;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-3xl shadow-xl w-full max-w-5xl max-h-[90vh] flex overflow-hidden relative"
        style={{ 
          background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.2)'
        }}
      >
        {/* Metallic reflection overlay */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.3) 100%)'
          }}
        ></div>

        <div className="flex w-full relative z-10">
          {/* Sidebar */}
          <HelpSidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <HelpHeader onClose={handleClose} />
            
            <div className="flex-1 overflow-y-auto p-6">
              {renderHelpContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
