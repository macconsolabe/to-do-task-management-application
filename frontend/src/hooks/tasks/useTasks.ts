import { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import type { TodoTask, CreateTaskDto } from '../../services/api';

export function useTasks() {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setError(null);
      setLoading(true);
      const fetchedTasks = await apiService.getAllTasks();
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

  const createTask = async (taskData: CreateTaskDto) => {
    const newTask = await apiService.createTask(taskData);
    setTasks((prev: TodoTask[]) => [newTask, ...prev]);
    return newTask;
  };

  const deleteTask = async (id: number) => {
    await apiService.deleteTask(id);
    setTasks((prev: TodoTask[]) => prev.filter(task => task.id !== id));
  };

  const updateTaskStatus = async (id: number, newStatus: number) => {
    await apiService.updateTaskStatus(id, newStatus);
    setTasks((prev: TodoTask[]) => prev.map(task =>
      task.id === id
        ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const toggleTaskImportance = async (id: number) => {
    const updatedTask = await apiService.toggleTaskImportance(id);
    setTasks((prev: TodoTask[]) => prev.map(task =>
      task.id === id ? updatedTask : task
    ));
    return updatedTask;
  };

  const updateTask = (updatedTask: TodoTask) => {
    setTasks((prev: TodoTask[]) => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    setTasks,
    createTask,
    deleteTask,
    updateTaskStatus,
    toggleTaskImportance,
    updateTask,
    loadTasks
  };
}
