export interface Resource {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'pending';
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ListOptions {
  limit?: number;
  cursor?: string;
  filter?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  data: T[];
  cursor?: string;
  hasMore: boolean;
  total: number;
}
