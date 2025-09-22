import { useState, useEffect } from 'react';
import type { TodoTask, CreateTaskDto, UpdateTaskDto } from '../../services/types';
import { taskService } from '../../services/TaskService';
import { useUser } from '../../contexts/UserContext';

export function useTasks() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setError(null);
      setLoading(true);
      const fetchedTasks = await taskService.getAllTasks(user?.id);
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
    const newTask = await taskService.createTask(taskData);
    setTasks((prev: TodoTask[]) => [newTask, ...prev]);
    return newTask;
  };

  const deleteTask = async (id: number) => {
    await taskService.deleteTask(id);
    setTasks((prev: TodoTask[]) => prev.filter(task => task.id !== id));
  };

  const updateTaskStatus = async (id: number, newStatus: number) => {
    await taskService.updateTaskStatus(id, newStatus);
    setTasks((prev: TodoTask[]) => prev.map(task =>
      task.id === id
        ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const toggleTaskImportance = async (id: number) => {
    const updatedTask = await taskService.toggleTaskImportance(id);
    setTasks((prev: TodoTask[]) => prev.map(task =>
      task.id === id ? updatedTask : task
    ));
    return updatedTask;
  };

  const updateTask = async (id: number, taskData: UpdateTaskDto): Promise<TodoTask> => {
    const updatedTask = await taskService.updateTask(id, taskData);
    setTasks((prev: TodoTask[]) => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    return updatedTask;
  };

  const updateTaskById = (updatedTask: TodoTask) => {
    setTasks((prev: TodoTask[]) => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

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
    updateTaskById,
    loadTasks
  };
}
