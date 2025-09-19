import { useState } from 'react';
import type { TodoTask, CreateTaskDto, UpdateTaskDto } from './services/api';

// Components
import { Header } from './components/layout/Header';
import { WelcomeSection } from './components/layout/WelcomeSection';
import { CalendarTaskBrowser } from './components/calendar/CalendarTaskBrowser';
import { TaskList } from './components/taskcard/TaskList';
import { ErrorMessage } from './components/ui/ErrorMessage';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { Notification } from './components/ui/Notification';
import { CreateNewTask } from './components/createnewtask/CreateNewTask';
import { TaskDetail } from './components/updatetaskdetails/TaskDetail';
import { CalendarModal } from './components/calendar/CalendarModal';

// Hooks
import { useTasks } from './hooks/useTasks';
import { useNotification } from './hooks/useNotification';
import { useTaskModal } from './hooks/useTaskModal';

// Utils
import { filterTasks } from './utils/taskUtils';

function App() {
  // State
  const [activeTab, setActiveTab] = useState<'todo' | 'important' | 'notes' | 'completed'>('todo');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TodoTask | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarInitialDate, setCalendarInitialDate] = useState<Date>(new Date());

  // Custom hooks
  const { 
    tasks, 
    loading, 
    error, 
    createTask, 
    deleteTask, 
    updateTaskStatus, 
    toggleTaskImportance, 
    updateTask 
  } = useTasks();
  
  const { notification, showNotification } = useNotification();
  const { selectedTask, isDetailOpen, setSelectedTask, handleTaskClick, handleDetailClose } = useTaskModal();

  // Derived state
  const filteredTasks = filterTasks(tasks, activeTab);
  const todaysTasks = tasks.filter(task => task.status !== 2).length;

  // Handlers
  const handleCreateTask = async (taskData: CreateTaskDto) => {
    try {
      await createTask(taskData);
      showNotification('Task created successfully! 🎉', 'success');
    } catch (err) {
      showNotification('Failed to create task', 'error');
      throw err;
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTask(id);
      showNotification('Task deleted successfully! 🗑️', 'success');
      if (selectedTask?.id === id) handleDetailClose();
    } catch (err) {
      showNotification('Failed to delete task', 'error');
      console.error('Failed to delete task:', err);
    }
  };

  const handleStatusChange = async (id: number, newStatus: number) => {
    try {
      await updateTaskStatus(id, newStatus);
      showNotification('Task status updated! 🔄', 'success');
    } catch (err) {
      showNotification('Failed to update task status', 'error');
      console.error('Failed to update task status:', err);
    }
  };

  const handleToggleImportance = async (id: number) => {
    try {
      const updatedTask = await toggleTaskImportance(id);
      const isNowImportant = updatedTask.priority === 2;
      showNotification(
        isNowImportant ? 'Task marked as important! ⭐' : 'Task unmarked as important 📝', 
        'success'
      );
    } catch (err) {
      showNotification('Failed to update task importance', 'error');
      console.error('Failed to update task importance:', err);
    }
  };

  const handleFormSubmit = async (taskData: CreateTaskDto | UpdateTaskDto) => {
    if (editingTask) {
      // Handle update when needed
    } else {
      await handleCreateTask(taskData as CreateTaskDto);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  const handleOpenCalendar = (date?: Date) => {
    if (date) {
      setCalendarInitialDate(date);
    }
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
  };

  // Loading state
  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Metallic Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(244, 196, 48, 0.25) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(233, 236, 239, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 40% 40%, rgba(248, 249, 250, 0.2) 0%, transparent 60%),
            radial-gradient(circle at 60% 10%, rgba(244, 196, 48, 0.15) 0%, transparent 40%),
            linear-gradient(135deg, #f0f2f5 0%, #e8eaed 25%, #f5f7fa 50%, #e8eaed 75%, #f0f2f5 100%)
          `,
          backgroundSize: '300% 300%',
          animation: 'metallicFlow 15s ease-in-out infinite'
        }}
      >
        {/* Floating Metallic Particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-40"
              style={{
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                background: i % 4 === 0 ? '#F4C430' : i % 4 === 1 ? '#e6b800' : i % 4 === 2 ? '#d1d5db' : '#f8f9fa',
                boxShadow: i % 2 === 0 ? '0 0 10px rgba(244, 196, 48, 0.3)' : '0 0 8px rgba(233, 236, 239, 0.4)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float${i % 3} ${10 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Enhanced Geometric Patterns */}
        <div className="absolute inset-0 opacity-15">
          <div 
            className="absolute w-96 h-96 rounded-full"
            style={{
              top: '10%',
              left: '15%',
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(244, 196, 48, 0.1) 25%, transparent 50%, rgba(233, 236, 239, 0.1) 75%, transparent 100%)',
              animation: 'rotate 40s linear infinite'
            }}
          ></div>
          <div 
            className="absolute w-64 h-64 rounded-full"
            style={{
              bottom: '20%',
              right: '20%',
              background: 'conic-gradient(from 180deg, transparent 0%, rgba(244, 196, 48, 0.15) 30%, transparent 60%, rgba(248, 249, 250, 0.1) 90%, transparent 100%)',
              animation: 'rotate 35s linear infinite reverse'
            }}
          ></div>
          <div 
            className="absolute w-48 h-48 rounded-full"
            style={{
              top: '60%',
              left: '70%',
              background: 'radial-gradient(circle, rgba(244, 196, 48, 0.08) 0%, transparent 70%)',
              animation: 'float1 20s ease-in-out infinite'
            }}
          ></div>
        </div>
      </div>

      <Header 
        onCreateClick={() => setIsFormOpen(true)}
        onCalendarClick={() => handleOpenCalendar()}
      />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <WelcomeSection />
        
        {error && <ErrorMessage error={error} />}

        <CalendarTaskBrowser 
          tasks={filteredTasks} 
          todaysTasks={todaysTasks}
          onTaskClick={handleTaskClick}
          onCalendarClick={handleOpenCalendar}
        />

        <TaskList
          tasks={filteredTasks}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onTaskClick={handleTaskClick}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
          error={error}
        />

        {/* Modals */}
        <CreateNewTask
          task={editingTask}
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
        />

        <TaskDetail
          task={selectedTask}
          isOpen={isDetailOpen}
          onClose={handleDetailClose}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          onToggleImportance={handleToggleImportance}
          onTaskUpdate={(updatedTask) => {
            updateTask(updatedTask);
            setSelectedTask(updatedTask);
          }}
          onCalendarClick={handleOpenCalendar}
        />

        <CalendarModal
          isOpen={isCalendarOpen}
          onClose={handleCloseCalendar}
          tasks={tasks}
          initialDate={calendarInitialDate}
          onTaskClick={(task) => {
            handleTaskClick(task);
            handleCloseCalendar();
          }}
        />

        {notification && (
          <Notification message={notification.message} type={notification.type} />
        )}
      </div>
    </div>
  );
}

export default App;