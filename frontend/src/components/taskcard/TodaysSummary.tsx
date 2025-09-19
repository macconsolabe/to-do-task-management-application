import type { TodoTask } from '../../services/api';
import { ProgressCard } from './ProgressCard';

interface TodaysSummaryProps {
  tasks: TodoTask[];
  todaysTasks: number;
}

export function TodaysSummary({ tasks, todaysTasks }: TodaysSummaryProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-light text-gray-800 mb-4">Today({todaysTasks})</h3>
      
      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {tasks.slice(0, 2).map((task: TodoTask) => (
          <ProgressCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
