// Subtask service for handling subtask-related API calls

import { BaseService } from './BaseService';
import type { Subtask, CreateSubtaskDto } from './types';

class SubtaskService extends BaseService {
  async toggleSubtask(subtaskId: number): Promise<void> {
    const response = await fetch(this.getUrl(`Subtasks/${subtaskId}/toggle`), {
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
    const response = await fetch(this.getUrl('Subtasks'), {
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
    const response = await fetch(this.getUrl(`Subtasks/${subtaskId}`), {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete subtask: ${response.statusText}`);
    }
  }

  async updateSubtask(subtaskId: number, title: string): Promise<Subtask> {
    const response = await fetch(this.getUrl(`Subtasks/${subtaskId}`), {
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
}

export const subtaskService = new SubtaskService();
