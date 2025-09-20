import { useState, useMemo } from 'react';
import type { TodoTask } from '../../services/api';

export function useCalendarState(tasks: TodoTask[]) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Get tasks for the selected date
  const tasksForSelectedDate = useMemo(() => {
    const selectedDateStr = selectedDate.toDateString();
    
    return tasks.filter(task => {
      // Filter by due date if it exists
      if (task.dueDate) {
        const taskDueDate = new Date(task.dueDate).toDateString();
        return taskDueDate === selectedDateStr;
      }
      
      // If no due date, check created date for today's tasks
      const taskCreatedDate = new Date(task.createdAt).toDateString();
      const todayStr = new Date().toDateString();
      
      // Show tasks created today if selected date is today and task has no due date
      return selectedDateStr === todayStr && taskCreatedDate === todayStr;
    });
  }, [tasks, selectedDate]);

  // Get formatted date string for display
  const selectedDateString = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const selectedDateStr = selectedDate.toDateString();
    const todayStr = today.toDateString();
    const yesterdayStr = yesterday.toDateString();
    const tomorrowStr = tomorrow.toDateString();

    if (selectedDateStr === todayStr) {
      return 'Today';
    } else if (selectedDateStr === yesterdayStr) {
      return 'Yesterday';
    } else if (selectedDateStr === tomorrowStr) {
      return 'Tomorrow';
    } else {
      return selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: selectedDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  }, [selectedDate]);

  // Navigation functions
  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  return {
    selectedDate,
    selectedDateString,
    tasksForSelectedDate,
    setSelectedDate,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    taskCount: tasksForSelectedDate.length
  };
}
