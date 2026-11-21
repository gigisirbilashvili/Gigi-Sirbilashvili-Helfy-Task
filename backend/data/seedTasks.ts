import { subHours } from 'date-fns';
import { SeedTask } from '../types/task';

const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export const seedTasks: SeedTask[] = [
  {
    title: 'Task1',
    description: LOREM_IPSUM,
    priority: 'medium',
    completed: true,
    createdAt: subHours(new Date(), 2),
  },
  {
    title: 'Task2',
    description: LOREM_IPSUM,
    priority: 'medium',
    createdAt: subHours(new Date(), 1),
  },
];
