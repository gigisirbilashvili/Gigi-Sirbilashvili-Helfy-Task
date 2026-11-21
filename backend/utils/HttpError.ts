export class HttpError extends Error {
  readonly status: number;
  readonly details?: string[];

  constructor(status: number, message: string, details?: string[]) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
  }
}

export const notFound = (message: string) => new HttpError(404, message);

export const badRequest = (message: string, details?: string[]) =>
  new HttpError(400, message, details);
