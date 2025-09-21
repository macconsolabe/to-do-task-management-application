// API service for eTask application

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

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5001/api';
  }

  async getAllTasks(userId?: number): Promise<TodoTask[]> {
    const url = userId 
      ? `${this.baseUrl}/TodoTasks?userId=${userId}`
      : `${this.baseUrl}/TodoTasks`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    return response.json();
  }

  async getTask(id: number): Promise<TodoTask> {
    const response = await fetch(`${this.baseUrl}/TodoTasks/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch task: ${response.statusText}`);
    }
    return response.json();
  }

  async createTask(task: CreateTaskDto): Promise<TodoTask> {
    const response = await fetch(`${this.baseUrl}/TodoTasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to create task: ${errorData}`);
    }
    
    return response.json();
  }

  async updateTask(id: number, task: UpdateTaskDto): Promise<TodoTask> {
    const response = await fetch(`${this.baseUrl}/TodoTasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to update task: ${errorData}`);
    }
    
    return response.json();
  }

  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/TodoTasks/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.statusText}`);
    }
  }

  async updateTaskStatus(id: number, status: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/TodoTasks/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(status),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update task status: ${response.statusText}`);
    }
  }

  async toggleTaskImportance(id: number): Promise<TodoTask> {
    // Get current task to toggle its priority
    const currentTask = await this.getTask(id);
    const newPriority = currentTask.priority === 2 ? 1 : 2; // Toggle between Medium(1) and High(2)
    
    const updateData: UpdateTaskDto = {
      title: currentTask.title,
      description: currentTask.description,
      status: currentTask.status,
      priority: newPriority,
      dueDate: currentTask.dueDate
    };
    
    await this.updateTask(id, updateData);
    return { ...currentTask, priority: newPriority, updatedAt: new Date().toISOString() };
  }

  async toggleSubtask(subtaskId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/Subtasks/${subtaskId}/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to toggle subtask: ${response.statusText}`);
    }
  }

  async createSubtask(subtask: CreateSubtaskDto): Promise<Subtask> {
    const response = await fetch(`${this.baseUrl}/Subtasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subtask),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to create subtask: ${errorData}`);
    }
    
    return response.json();
  }

  async deleteSubtask(subtaskId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/Subtasks/${subtaskId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete subtask: ${response.statusText}`);
    }
  }

  async updateSubtask(subtaskId: number, title: string): Promise<Subtask> {
    const response = await fetch(`${this.baseUrl}/Subtasks/${subtaskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to update subtask: ${errorData}`);
    }
    return response.json();
  }

  async updateTaskProgress(taskId: number, manualProgress: number): Promise<TodoTask> {
    const response = await fetch(`${this.baseUrl}/TodoTasks/${taskId}/progress`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ manualProgress }),
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to update task progress: ${errorData}`);
    }
    return response.json();
  }

  // User API methods
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/Users`);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    return response.json();
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseUrl}/Users/current`);
      if (response.status === 404) {
        return null; // No user found
      }
      if (!response.ok) {
        throw new Error(`Failed to fetch current user: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseUrl}/Users/by-email/${encodeURIComponent(email)}`);
      if (response.status === 404) {
        return null; // User not found
      }
      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const response = await fetch(`${this.baseUrl}/Users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to create user: ${errorData}`);
    }
    return response.json();
  }

  async updateUser(userId: number, userData: UpdateUserDto): Promise<User> {
    const response = await fetch(`${this.baseUrl}/Users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to update user: ${errorData}`);
    }
    return response.json();
  }

  async deleteUser(userId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/Users/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }
  }
}

export const apiService = new ApiService();
