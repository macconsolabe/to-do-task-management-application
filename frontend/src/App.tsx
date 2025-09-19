import { useState, useEffect } from 'react';

interface TodoTask {
  id: number;
  title: string;
  description: string;
  status: number;
  priority: number;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'todo' | 'starred' | 'notes' | 'completed'>('todo');

  // Use relative URL for API calls (works with both dev server and Docker)
  const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

  const loadTasks = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/TodoTasks`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const fetchedTasks = await response.json();
      setTasks(fetchedTasks);
      console.log('Tasks loaded:', fetchedTasks);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`Failed to load tasks: ${errorMessage}`);
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // const getStatusLabel = (status: number) => {
  //   switch (status) {
  //     case 0: return 'Pending';
  //     case 1: return 'In Progress';
  //     case 2: return 'Completed';
  //     default: return 'Unknown';
  //   }
  // };

  const getPriorityStars = (priority: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < priority + 1 ? 'text-yellow-400' : 'text-gray-300'}>
          ⭐
        </span>
      );
    }
    return stars;
  };

  const getProgressPercentage = (task: TodoTask) => {
    if (task.status === 2) return 100; // Completed
    if (task.status === 1) return 75;  // In Progress
    return 25; // Pending
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return '#F4C430'; // Yellow
    if (percentage >= 50) return '#3B82F6'; // Blue
    return '#8B5CF6'; // Purple
  };

  const filteredTasks = tasks.filter(task => {
    switch (activeTab) {
      case 'todo': return task.status !== 2;
      case 'starred': return task.priority === 2; // High priority as "starred"
      case 'completed': return task.status === 2;
      case 'notes': return task.description.length > 0;
      default: return true;
    }
  });

  const todaysTasks = tasks.filter(task => task.status !== 2).length;
  // const completedToday = tasks.filter(task => task.status === 2).length;

  const formatDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleDateString('en-US', { month: 'short' });
    const year = today.getFullYear();
    
    const getDayWithSuffix = (day: number) => {
      if (day > 3 && day < 21) return day + 'th';
      switch (day % 10) {
        case 1: return day + 'st';
        case 2: return day + 'nd';
        case 3: return day + 'rd';
        default: return day + 'th';
      }
    };
    
    return `${getDayWithSuffix(day)} ${month} ${year}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#faf9f7' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-6" style={{ borderColor: '#F4C430' }}></div>
          <p className="text-xl text-gray-700 font-light">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf9f7' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-8 h-1 bg-gray-800 rounded-full"></div>
          <div className="w-8 h-1 bg-gray-800 rounded-full mt-1"></div>
          <div className="w-8 h-1 bg-gray-800 rounded-full mt-2"></div>
        </div>
        <h1 className="text-2xl font-light text-gray-900">eTask</h1>
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#F4C430' }}>
          <span className="text-xl">👤</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <p className="text-gray-500 font-light mb-2">Welcome</p>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-light text-gray-900">Mac Developer</h2>
            <div className="text-right">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <span>📅</span>
                <span className="font-light">Today</span>
                <span style={{ color: '#F4C430' }}>▼</span>
              </div>
              <p className="text-gray-800 font-light">{formatDate()}</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-white border border-red-200 text-red-800 px-6 py-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <span className="font-light">{error}</span>
            </div>
          </div>
        )}

        {/* Today's Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-light text-gray-800 mb-4">Today({todaysTasks})</h3>
          
          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {filteredTasks.slice(0, 2).map((task) => {
              const progress = getProgressPercentage(task);
              const progressColor = getProgressColor(progress);
              
              return (
                <div key={task.id} className="p-6 rounded-3xl text-white shadow-lg" style={{ backgroundColor: progressColor }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg"></div>
                  </div>
                  <h4 className="text-xl font-light mb-2">{task.title}</h4>
                  <p className="text-white text-opacity-90 font-light mb-4">{task.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-white text-opacity-90 mt-1 font-light">{progress}%</p>
                  </div>
                  
                  {/* Due Date */}
                  {task.dueDate && (
                    <div className="flex items-center gap-2 text-white text-opacity-90">
                      <span>🕐</span>
                      <span className="font-light">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* My Tasks Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-light text-gray-900 mb-6">My Tasks</h3>
          
          {/* Tab Navigation */}
          <div className="flex gap-8 mb-6 border-b border-gray-200">
            {[
              { key: 'todo', label: 'To-Do' },
              { key: 'starred', label: 'Starred' },
              { key: 'notes', label: 'Notes' },
              { key: 'completed', label: 'Completed' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`pb-3 px-1 font-light transition-colors ${
                  activeTab === key 
                    ? 'border-b-2 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                style={{ 
                  borderColor: activeTab === key ? '#F4C430' : 'transparent',
                  color: activeTab === key ? '#F4C430' : undefined
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const progress = getProgressPercentage(task);
              const progressColor = getProgressColor(progress);
              
              return (
                <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-light text-gray-900">{task.title}</h4>
                        <div className="flex">
                          {getPriorityStars(task.priority)}
                        </div>
                      </div>
                      <p className="text-gray-600 font-light mb-4">{task.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300" 
                            style={{ 
                              width: `${progress}%`,
                              backgroundColor: progressColor
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm text-gray-500 font-light">
                            <span className="font-medium">Created:</span> {new Date(task.createdAt).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <span className="text-lg font-light text-gray-600">{progress}%</span>
                        </div>
                      </div>
                      
                      {/* Due Date */}
                      {task.dueDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 font-light">
                          <span>🕐</span>
                          <span className="font-medium">Due:</span>
                          <span className={new Date(task.dueDate) < new Date() ? 'text-red-600 font-medium' : ''}>
                            {new Date(task.dueDate).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })} | {new Date(task.dueDate).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              timeZoneName: 'short'
                            })}
                            {new Date(task.dueDate) < new Date() && ' (Overdue)'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredTasks.length === 0 && !error && (
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-light text-gray-800 mb-2">No {activeTab} tasks</h3>
              <p className="text-gray-600 font-light">
                {activeTab === 'todo' && 'All caught up! Create a new task to get started.'}
                {activeTab === 'starred' && 'No high priority tasks at the moment.'}
                {activeTab === 'completed' && 'No completed tasks yet.'}
                {activeTab === 'notes' && 'No tasks with notes found.'}
              </p>
            </div>
          )}
        </div>

        {/* Floating Add Button */}
        <div className="fixed bottom-8 right-8">
          <button 
            className="w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl"
            style={{ backgroundColor: '#F4C430' }}
            onClick={() => alert('Add task feature coming soon!')}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;