import { useState } from 'react';
import type { TodoTask, CreateTaskDto, UpdateTaskDto } from './services/api';

// Components
import { Header } from './components/layout/Header';
import { WelcomeSection } from './components/layout/WelcomeSection';
import { TodaysSummary } from './components/taskcard/TodaysSummary';
import { TaskList } from './components/taskcard/TaskList';
import { ErrorMessage } from './components/ui/ErrorMessage';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { Notification } from './components/ui/Notification';
import { CreateNewTask } from './components/createnewtask/CreateNewTask';
import { TaskDetail } from './components/updatetaskdetails/TaskDetail';

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

  // Loading state
  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf9f7' }}>
      <Header onCreateClick={() => setIsFormOpen(true)} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <WelcomeSection />
        
        {error && <ErrorMessage error={error} />}

        <TodaysSummary tasks={filteredTasks} todaysTasks={todaysTasks} />

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
        />

        {notification && (
          <Notification message={notification.message} type={notification.type} />
        )}
      </div>
    </div>
  );
}

export default App;