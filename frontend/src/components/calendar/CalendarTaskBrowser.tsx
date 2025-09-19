import type { TodoTask } from '../../services/api';
import { useCalendarState } from '../../hooks/useCalendarState';
import { DateNavigation } from '../ui/DateNavigation';
import { CalendarCardCarousel } from '../taskcard/CalendarCardCarousel';

interface CalendarTaskBrowserProps {
  tasks: TodoTask[];
  todaysTasks: number;
  onTaskClick?: (task: TodoTask) => void;
  onCalendarClick?: (date?: Date) => void;
}

export function CalendarTaskBrowser({ tasks, onTaskClick, onCalendarClick }: CalendarTaskBrowserProps) {
  const {
    selectedDate,
    selectedDateString,
    tasksForSelectedDate,
    goToPreviousDay,
    goToNextDay,
    goToToday
  } = useCalendarState(tasks);

  return (
    <div className="mb-8">
      {/* Date Navigation */}
      <DateNavigation
        selectedDateString={selectedDateString}
        onPreviousDay={goToPreviousDay}
        onNextDay={goToNextDay}
        onToday={goToToday}
      />
      
      {/* Calendar Card Carousel */}
      <CalendarCardCarousel
        tasks={tasksForSelectedDate}
        selectedDateString={selectedDateString}
        selectedDate={selectedDate}
        onTaskClick={onTaskClick}
        onCalendarClick={onCalendarClick}
      />
    </div>
  );
}
