import { ErrorRequestHandler, RequestHandler } from 'express';
import { HttpError, notFound } from '../utils/HttpError';

interface ExposedError {
  status: number;
  message: string;
  expose: true;
}

const isExposedError = (err: unknown): err is ExposedError =>
  typeof err === 'object' &&
  err !== null &&
  'expose' in err &&
  err.expose === true &&
  'status' in err;

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(notFound(`Route ${req.method} ${req.originalUrl} does not exist`));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res
      .status(err.status)
      .json({ error: err.message, ...(err.details && { details: err.details }) });
    return;
  }

  if (isExposedError(err)) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Something went wrong on our side' });
};
