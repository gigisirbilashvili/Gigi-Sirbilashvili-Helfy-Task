export const PRIORITIES = ['low', 'medium', 'high'] as const;

export type Priority = (typeof PRIORITIES)[number];

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
}

export interface TaskInput {
  title: string;
  description: string;
  priority: Priority;
  completed?: boolean;
}

export interface SeedTask extends TaskInput {
  createdAt: Date;
}
