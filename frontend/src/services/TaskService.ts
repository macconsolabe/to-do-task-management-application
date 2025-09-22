// Task service for handling task-related API calls

import { BaseService } from './BaseService';
import type { TodoTask, CreateTaskDto, UpdateTaskDto } from './types';

class TaskService extends BaseService {
  async getAllTasks(userId?: number): Promise<TodoTask[]> {
    const url = userId 
      ? this.getUrl(`TodoTasks?userId=${userId}`)
      : this.getUrl('TodoTasks');
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    return response.json();
  }

  async searchTasks(query: string, userId?: number): Promise<TodoTask[]> {
    if (!query.trim()) {
      return [];
    }
    
    const params = new URLSearchParams({ query: query.trim() });
    if (userId) {
      params.append('userId', userId.toString());
    }
    
    const url = this.getUrl(`TodoTasks/search?${params.toString()}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to search tasks: ${response.statusText}`);
    }
    
    return response.json();
  }

  async getTask(id: number): Promise<TodoTask> {
    const response = await fetch(this.getUrl(`TodoTasks/${id}`));
    if (!response.ok) {
      throw new Error(`Failed to fetch task: ${response.statusText}`);
    }
    return response.json();
  }

  async createTask(task: CreateTaskDto): Promise<TodoTask> {
    const response = await fetch(this.getUrl('TodoTasks'), {
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
    const response = await fetch(this.getUrl(`TodoTasks/${id}`), {
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
    const response = await fetch(this.getUrl(`TodoTasks/${id}`), {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.statusText}`);
    }
  }

  async updateTaskStatus(id: number, status: number): Promise<void> {
    const response = await fetch(this.getUrl(`TodoTasks/${id}/status`), {
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

  async updateTaskProgress(taskId: number, manualProgress: number): Promise<TodoTask> {
    const response = await fetch(this.getUrl(`TodoTasks/${taskId}/progress`), {
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
}

export const taskService = new TaskService();
