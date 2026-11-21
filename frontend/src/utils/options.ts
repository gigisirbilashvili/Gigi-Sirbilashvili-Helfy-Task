import { Option } from '../types/task';
import { Guard } from './storage';

export const isOptionValue =
  <T extends string>(options: Option<T>[]): Guard<T> =>
  (value): value is T =>
    options.some((option) => option.value === value);
