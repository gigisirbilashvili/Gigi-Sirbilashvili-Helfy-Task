import { SortOption, StatusFilter } from '../../types/task';

export interface TaskFilterProps {
  value: StatusFilter;
  counts: Record<StatusFilter, number>;
  onChange: (status: StatusFilter) => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface SortSelectProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export interface TaskToolbarProps {
  status: StatusFilter;
  counts: Record<StatusFilter, number>;
  query: string;
  sort: SortOption;
  onStatusChange: (status: StatusFilter) => void;
  onQueryChange: (query: string) => void;
  onSortChange: (sort: SortOption) => void;
}
