interface EmptyStateProps {
  activeTab: string;
}

export function EmptyState({ activeTab }: EmptyStateProps) {
  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'todo': return 'All caught up! Create a new task to get started.';
      case 'important': return 'No important tasks at the moment.';
      case 'completed': return 'No completed tasks yet.';
      case 'notes': return 'No tasks with notes found.';
      default: return 'No tasks found.';
    }
  };

  return (
    <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
      <div className="text-6xl mb-4">📝</div>
      <h3 className="text-2xl font-light text-gray-800 mb-2">No {activeTab} tasks</h3>
      <p className="text-gray-600 font-light">{getEmptyMessage()}</p>
    </div>
  );
}
