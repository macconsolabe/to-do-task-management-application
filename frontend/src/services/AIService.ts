import { BaseService } from './BaseService';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ParsedTask {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
  subtasks: string[];
}

export interface AIChatRequest {
  message: string;
  userId?: number;
  conversationHistory?: ChatMessage[];
}

export interface AIChatResponse {
  response: string;
  parsedTask?: ParsedTask;
  waitingFor?: string;
  isTaskReady: boolean;
}

export interface CreateTaskFromAI {
  task: ParsedTask;
  userId: number;
}

class AIService extends BaseService {
  constructor() {
    super();
  }

  async checkStatus(): Promise<{ enabled: boolean; message: string }> {
    try {
      const response = await fetch(this.getUrl('AI/status'));
      if (!response.ok) {
        return { enabled: false, message: 'AI service unavailable' };
      }
      return response.json();
    } catch (error) {
      return { enabled: false, message: 'AI service unavailable' };
    }
  }

  async chat(request: AIChatRequest): Promise<AIChatResponse> {
    const response = await fetch(this.getUrl('AI/chat'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to chat with AI: ${response.statusText}`);
    }

    return response.json();
  }

  async createTaskFromAI(request: CreateTaskFromAI): Promise<any> {
    const response = await fetch(this.getUrl('AI/create-task'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create task from AI: ${response.statusText}`);
    }

    return response.json();
  }
}

export const aiService = new AIService();
