const API_BASE_URL = '/api';

interface ErrorBody {
  error?: string;
  details?: string[];
}

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const OFFLINE_MESSAGE = 'Cannot reach the server. Make sure the backend is running on port 4000.';

const readErrorBody = async (response: Response): Promise<ErrorBody> => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const toApiError = async (response: Response): Promise<ApiError> => {
  const body = await readErrorBody(response);

  if (body.details?.length) {
    return new ApiError(body.details.join('. '), response.status);
  }

  if (body.error) {
    return new ApiError(body.error, response.status);
  }

  if (response.status >= 500) {
    return new ApiError(OFFLINE_MESSAGE, response.status);
  }

  return new ApiError(`Request failed with status ${response.status}`, response.status);
};

export const request = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init.headers },
    });
  } catch {
    throw new ApiError(OFFLINE_MESSAGE, 0);
  }

  if (!response.ok) {
    throw await toApiError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
};
