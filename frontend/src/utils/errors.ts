export const getErrorMessage = (error: unknown): string =>
  error instanceof Error && error.message ? error.message : 'Something unexpected happened';
