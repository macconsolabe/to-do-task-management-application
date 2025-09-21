import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Help Context
interface HelpContextType {
  isHelpOpen: boolean;
  setIsHelpOpen: (open: boolean) => void;
  activeHelpSection: 'getting-started' | 'features' | 'shortcuts' | 'about';
  setActiveHelpSection: (section: 'getting-started' | 'features' | 'shortcuts' | 'about') => void;
}

const HelpContext = createContext<HelpContextType | undefined>(undefined);

// Provider
interface HelpProviderProps {
  children: ReactNode;
}

export function HelpProvider({ children }: HelpProviderProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [activeHelpSection, setActiveHelpSection] = useState<'getting-started' | 'features' | 'shortcuts' | 'about'>('getting-started');

  const value: HelpContextType = {
    isHelpOpen,
    setIsHelpOpen,
    activeHelpSection,
    setActiveHelpSection
  };

  return (
    <HelpContext.Provider value={value}>
      {children}
    </HelpContext.Provider>
  );
}

// Hook
export function useHelp() {
  const context = useContext(HelpContext);
  if (context === undefined) {
    throw new Error('useHelp must be used within a HelpProvider');
  }
  return context;
}
