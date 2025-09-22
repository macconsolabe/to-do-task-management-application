// User service for handling user-related API calls

import { BaseService } from './BaseService';
import type { User, CreateUserDto, UpdateUserDto } from './types';

class UserService extends BaseService {
  async getUsers(): Promise<User[]> {
    const response = await fetch(this.getUrl('Users'));
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    return response.json();
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch(this.getUrl('Users/current'));
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
      const response = await fetch(this.getUrl(`Users/by-email/${encodeURIComponent(email)}`));
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
    const response = await fetch(this.getUrl('Users'), {
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
    const response = await fetch(this.getUrl(`Users/${userId}`), {
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
    const response = await fetch(this.getUrl(`Users/${userId}`), {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }
  }
}

export const userService = new UserService();
