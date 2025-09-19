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
    <div 
      className="p-12 rounded-3xl shadow-sm border border-gray-200 text-center relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.05), 0 4px 15px rgba(0,0,0,0.05)'
      }}
    >
      {/* Subtle reflection */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)'
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
