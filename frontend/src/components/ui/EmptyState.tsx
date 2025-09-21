import { useTheme } from '../../hooks/ui/useTheme';

interface EmptyStateProps {
  activeTab: string;
}

export function EmptyState({ activeTab }: EmptyStateProps) {
  const { metallicGradient, metallicShadow, reflectionOverlay } = useTheme();
  
  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'todo': return 'All caught up! Create a new task to get started.';
      case 'inprogress': return 'No tasks in progress. Start working on some tasks!';
      case 'completed': return 'No completed tasks yet. Finish some tasks to see them here.';
      case 'important': return 'No important tasks at the moment.';
      default: return 'No tasks found.';
    }
  };

  return (
    <div 
      className="p-12 rounded-3xl shadow-sm border border-gray-200 text-center relative overflow-hidden"
      style={{ 
        background: metallicGradient,
        boxShadow: metallicShadow
      }}
    >
      {/* Dynamic reflection based on theme intensity */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: reflectionOverlay
        }}
      ></div>
      <div className="relative z-10">
      <div className="text-6xl mb-4">📝</div>
      <h3 className="text-2xl font-light text-gray-800 mb-2">No {activeTab} tasks</h3>
      <p className="text-gray-600 font-light">{getEmptyMessage()}</p>
      </div>
    </div>
  );
}
