import type { CalendarSettings } from '../contexts/SettingsContext';

export const formatDate = (date: Date | string, settings: CalendarSettings): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (settings.dateFormat === 'DD/MM/YYYY') {
    return dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } else {
    return dateObj.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }
};

export const formatDateLong = (date: Date | string, settings: CalendarSettings): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (settings.dateFormat === 'DD/MM/YYYY') {
    return dateObj.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } else {
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }
};

export const isOverdue = (dueDate: string | undefined, taskStatus: number): boolean => {
  if (!dueDate || taskStatus === 2) return false; // No due date or completed task
  return new Date(dueDate) < new Date();
};

export const shouldHighlightOverdue = (
  dueDate: string | undefined, 
  taskStatus: number, 
  settings: CalendarSettings
): boolean => {
  return settings.overdueHighlighting && isOverdue(dueDate, taskStatus);
};

export const getWeekStartDay = (settings: CalendarSettings): number => {
  return settings.weekStartDay === 'monday' ? 1 : 0; // 0 = Sunday, 1 = Monday
};