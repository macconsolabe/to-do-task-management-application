import type { TodoTask } from '../../services/types';
import { TaskCard } from './TaskCard';
import { TaskTabs } from './TaskTabs';
import { EmptyState } from '../ui/EmptyState';

interface TaskListProps {
  tasks: TodoTask[];
  activeTab: 'todo' | 'inprogress' | 'completed' | 'important';
  onTabChange: (tab: 'todo' | 'inprogress' | 'completed' | 'important') => void;
  onTaskClick: (task: TodoTask) => void;
  onStatusChange: (id: number, status: number) => void;
  onDelete: (id: number) => void;
  error: string | null;
}

export function TaskList({ 
  tasks, 
  activeTab, 
  onTabChange, 
  onTaskClick, 
  onStatusChange, 
  onDelete, 
  error 
}: TaskListProps) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-light text-gray-900 mb-6">My Tasks</h3>
      
      <TaskTabs activeTab={activeTab} onTabChange={onTabChange} />

      <div className="space-y-4">
        {tasks.map((task: TodoTask) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskClick={onTaskClick}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </div>

      {tasks.length === 0 && !error && (
        <EmptyState activeTab={activeTab} />
      )}
    </div>
  );
}