import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Settings interfaces
export interface ThemeSettings {
  intensity: 'subtle' | 'normal' | 'enhanced';
  colorAccent: 'golden' | 'silver' | 'copper';
}

export interface NotificationSettings {
  autoSaveEnabled: boolean;
  duration: 2000 | 3000 | 5000; // milliseconds
  soundEnabled: boolean;
  // Email/SMS reminders (mock implementation for demo)
  emailReminders: boolean;
  smsReminders: boolean;
  dailyDigest: boolean;
  dueDateReminders: boolean;
  reminderTime: '09:00' | '12:00' | '18:00'; // Daily digest time
}

export interface TaskSettings {
  defaultPriority: 0 | 1 | 2; // Low, Medium, High
  defaultStatus: 0 | 1; // To Do, In Progress (Completed not allowed for new tasks)
  autoCompleteWithSubtasks: boolean;
}

export interface CalendarSettings {
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY';
  weekStartDay: 'sunday' | 'monday';
  overdueHighlighting: boolean;
}

export interface AppSettings {
  theme: ThemeSettings;
  notifications: NotificationSettings;
  tasks: TaskSettings;
  calendar: CalendarSettings;
}

// Default settings
const defaultSettings: AppSettings = {
  theme: {
    intensity: 'normal',
    colorAccent: 'golden'
  },
  notifications: {
    autoSaveEnabled: true,
    duration: 3000,
    soundEnabled: false,
    emailReminders: true,
    smsReminders: false,
    dailyDigest: true,
    dueDateReminders: true,
    reminderTime: '09:00'
  },
  tasks: {
    defaultPriority: 1, // Medium
    defaultStatus: 0, // To Do
    autoCompleteWithSubtasks: true
  },
  calendar: {
    dateFormat: 'MM/DD/YYYY',
    weekStartDay: 'sunday',
    overdueHighlighting: true
  }
};

// Context
interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetSettings: () => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Provider
interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('eTask_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('eTask_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
      // Deep merge for nested objects
      theme: { ...prev.theme, ...newSettings.theme },
      notifications: { ...prev.notifications, ...newSettings.notifications },
      tasks: { ...prev.tasks, ...newSettings.tasks },
      calendar: { ...prev.calendar, ...newSettings.calendar }
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('eTask_settings');
  };

  const value: SettingsContextType = {
    settings,
    updateSettings,
    resetSettings,
    isSettingsOpen,
    setIsSettingsOpen
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

// Hook
export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
