import type { TodoTask } from '../../services/api';

interface FormData {
  title: string;
  description: string;
  priority: number;
  status: number;
  dueDate: string;
  manualProgress: number;
}

interface CreateNewTaskProgressSectionProps {
  task?: TodoTask;
  formData: FormData;
  subtasks: string[];
  onProgressChange: (progress: number) => void;
}

export function CreateNewTaskProgressSection({ task, formData, subtasks, onProgressChange }: CreateNewTaskProgressSectionProps) {
  // Only show manual progress section if it's a new task and no subtasks
  if (task || subtasks.length > 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 p-4 rounded-2xl">
      <h4 className="text-lg font-medium text-gray-800 mb-3">Initial Progress</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Starting Progress:</span>
          <span className="text-2xl font-bold" style={{ color: '#F4C430' }}>{formData.manualProgress}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={formData.manualProgress}
          onChange={(e) => onProgressChange(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #F4C430 0%, #F4C430 ${formData.manualProgress}%, #e5e7eb ${formData.manualProgress}%, #e5e7eb 100%)`
          }}
        />
        <p className="text-sm text-gray-600 font-light">
          Set initial progress for this task
        </p>
      </div>
    </div>
  );
}
