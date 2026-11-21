import { Task } from '../../types/task';
import { classNames } from '../../utils/classNames';

export const getTaskCardClass = ({ priority, completed }: Task): string =>
  classNames('task-card', `task-card--${priority}`, completed && 'task-card--done');
