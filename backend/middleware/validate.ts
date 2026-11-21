import { RequestHandler } from 'express';
import { Schema, ValidationError, ValidationOptions } from 'joi';
import { badRequest } from '../utils/HttpError';

const VALIDATION_OPTIONS: ValidationOptions = {
  abortEarly: false,
  errors: { wrap: { label: false } },
};

const toMessages = (error: ValidationError) => error.details.map((detail) => detail.message);

export const validateWith = <T>(schema: Schema<T>, input: unknown) => {
  const { value, error } = schema.validate(input, VALIDATION_OPTIONS);

  if (error) {
    throw badRequest('Validation failed', toMessages(error));
  }

  return value;
};

export const validateBody =
  <T>(schema: Schema<T>): RequestHandler =>
  (req, _res, next) => {
    req.body = validateWith(schema, req.body);
    next();
  };
