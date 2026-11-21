import { Option, Priority, SortOption, StatusFilter, TaskDraft } from '../types/task';

export const TITLE_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 500;

export const EMPTY_DRAFT: TaskDraft = {
  title: '',
  description: '',
  priority: 'medium',
};

export const PRIORITY_OPTIONS: Option<Priority>[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export const STATUS_FILTERS: Option<StatusFilter>[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

export const SORT_OPTIONS: Option<SortOption>[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title A–Z' },
];
