import { RequestParamHandler, Response } from 'express';
import { taskIdSchema } from '../schemas/taskSchemas';
import { validateWith } from './validate';

export const parseTaskId: RequestParamHandler = (_req, res, next, value: string) => {
  res.locals.taskId = validateWith(taskIdSchema, value);
  next();
};

export const getTaskId = (res: Response): number => res.locals.taskId;
