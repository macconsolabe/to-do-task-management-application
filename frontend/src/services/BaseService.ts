// Base service class with common functionality

export class BaseService {
  protected baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5001/api';
  }

  protected getUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }
}
