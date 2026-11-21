export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority: Priority;
}

export type TaskDraft = Pick<Task, 'title' | 'description' | 'priority'>;

export type StatusFilter = 'all' | 'pending' | 'completed';

export type SortOption = 'newest' | 'oldest' | 'priority' | 'title';

export interface TaskViewOptions {
  status: StatusFilter;
  query: string;
  sort: SortOption;
}

export interface Option<T extends string> {
  value: T;
  label: string;
}
