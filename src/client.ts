import { Resource, ListOptions, PaginatedResponse } from './types';
import { SDKError, AuthError } from './errors';

export interface ClientConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export class Client {
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;

  constructor(config: ClientConfig) {
    if (!config.apiKey) throw new AuthError('API key is required');
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.platform.dev/v1';
    this.timeout = config.timeout || 30000;
  }

  get resources() {
    return {
      list: (options?: ListOptions) => this.listResources(options),
      get: (id: string) => this.getResource(id),
      create: (data: Partial<Resource>) => this.createResource(data),
      delete: (id: string) => this.deleteResource(id),
    };
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new SDKError(`Request failed: ${res.status}`, res.status);
    return res.json() as Promise<T>;
  }

  private listResources(options?: ListOptions): Promise<PaginatedResponse<Resource>> {
    const params = new URLSearchParams();
    if (options?.limit) params.set('limit', String(options.limit));
    if (options?.cursor) params.set('cursor', options.cursor);
    return this.request('GET', `/resources?${params}`);
  }

  private getResource(id: string): Promise<Resource> {
    return this.request('GET', `/resources/${id}`);
  }

  private createResource(data: Partial<Resource>): Promise<Resource> {
    return this.request('POST', '/resources', data);
  }

  private deleteResource(id: string): Promise<void> {
    return this.request('DELETE', `/resources/${id}`);
  }
}
// touched 2026-01-02
