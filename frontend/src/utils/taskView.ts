import { compareAsc, compareDesc, parseISO } from 'date-fns';
import { Priority, SortOption, StatusFilter, Task, TaskViewOptions } from '../types/task';

const PRIORITY_RANK: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

const comparators: Record<SortOption, (a: Task, b: Task) => number> = {
  newest: (a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)),
  oldest: (a, b) => compareAsc(parseISO(a.createdAt), parseISO(b.createdAt)),
  priority: (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority],
  title: (a, b) => a.title.localeCompare(b.title),
};

export const filterByStatus = (tasks: Task[], status: StatusFilter): Task[] => {
  if (status === 'all') {
    return tasks;
  }

  const wantCompleted = status === 'completed';

  return tasks.filter((task) => task.completed === wantCompleted);
};

export const searchTasks = (tasks: Task[], query: string): Task[] => {
  const needle = query.trim().toLowerCase();

  if (!needle) {
    return tasks;
  }

  return tasks.filter((task) => `${task.title} ${task.description}`.toLowerCase().includes(needle));
};

export const sortTasks = (tasks: Task[], sort: SortOption): Task[] =>
  [...tasks].sort(comparators[sort]);

export const getVisibleTasks = (tasks: Task[], { status, query, sort }: TaskViewOptions): Task[] =>
  sortTasks(searchTasks(filterByStatus(tasks, status), query), sort);

export const countByStatus = (tasks: Task[]): Record<StatusFilter, number> => {
  const completed = tasks.filter((task) => task.completed).length;

  return { all: tasks.length, pending: tasks.length - completed, completed };
};
