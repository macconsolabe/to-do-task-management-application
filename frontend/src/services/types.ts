// Shared types and interfaces for the application

// User interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  tasks?: TodoTask[];
}

export interface CreateUserDto {
  name: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

// Task interfaces
export interface Subtask {
  id: number;
  title: string;
  isCompleted: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  todoTaskId: number;
}

export interface TodoTask {
  id: number;
  title: string;
  description: string;
  status: number;
  priority: number;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  manualProgress: number;
  userId?: number;
  subtasks: Subtask[];
}

export interface CreateTaskDto {
  title: string;
  description: string;
  priority: number;
  dueDate?: string;
  userId: number;
}

export interface UpdateTaskDto {
  title: string;
  description: string;
  status: number;
  priority: number;
  dueDate?: string;
}

export interface CreateSubtaskDto {
  Title: string;
  TodoTaskId: number;
  Order: number;
}
