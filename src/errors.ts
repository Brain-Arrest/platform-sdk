export class SDKError extends Error {
  public statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'SDKError';
    this.statusCode = statusCode;
  }
}

export class AuthError extends SDKError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'AuthError';
  }
}

export class RateLimitError extends SDKError {
  public retryAfter: number;

  constructor(retryAfter: number) {
    super(`Rate limited. Retry after ${retryAfter}s`, 429);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}
