import { useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsContext';

// Components
import { SettingsHeader } from './SettingsHeader';
import { SettingsThemeSection } from './SettingsThemeSection';
import { SettingsNotificationSection } from './SettingsNotificationSection';
import { SettingsTaskSection } from './SettingsTaskSection';
import { SettingsCalendarSection } from './SettingsCalendarSection';
import { SettingsActions } from './SettingsActions';

export function SettingsModal() {
  const { isSettingsOpen, setIsSettingsOpen } = useSettings();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isSettingsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSettingsOpen]);

  if (!isSettingsOpen) return null;

  const handleClose = () => {
    setIsSettingsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-3xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden relative"
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

        <SettingsHeader onClose={handleClose} />

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 relative z-10 pb-32">
          <SettingsThemeSection />
          <SettingsNotificationSection />
          <SettingsTaskSection />
          <SettingsCalendarSection />
          <SettingsActions />
        </div>
      </div>
    </div>
  );
}
