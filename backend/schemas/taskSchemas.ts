import Joi from 'joi';
import { PRIORITIES, TaskInput } from '../types/task';

export const TITLE_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 500;

export const taskBodySchema = Joi.object<TaskInput>({
  title: Joi.string()
    .trim()
    .max(TITLE_MAX_LENGTH)
    .required()
    .messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is required',
      'string.base': 'Title must be a string',
      'string.max': `Title must be at most ${TITLE_MAX_LENGTH} characters`,
    }),
  description: Joi.string()
    .trim()
    .allow('')
    .max(DESCRIPTION_MAX_LENGTH)
    .default('')
    .messages({
      'string.base': 'Description must be a string',
      'string.max': `Description must be at most ${DESCRIPTION_MAX_LENGTH} characters`,
    }),
  priority: Joi.string()
    .valid(...PRIORITIES)
    .default('medium')
    .messages({ 'any.only': `Priority must be one of: ${PRIORITIES.join(', ')}` }),
  completed: Joi.boolean().strict().messages({ 'boolean.base': 'Completed must be a boolean' }),
})
  .required()
  .messages({
    'any.required': 'Request body must be a JSON object',
    'object.base': 'Request body must be a JSON object',
    'object.unknown': '{{#label}} is not allowed',
  });

export const taskIdSchema = Joi.number().integer().positive().required().messages({
  'number.base': 'Task id must be a positive integer',
  'number.integer': 'Task id must be a positive integer',
  'number.positive': 'Task id must be a positive integer',
  'number.unsafe': 'Task id is too large',
});
