import { useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storage';
import { SORT_OPTIONS, STATUS_FILTERS } from '../constants/task';
import { SortOption, StatusFilter, Task } from '../types/task';
import { isOptionValue } from '../utils/options';
import { countByStatus, getVisibleTasks } from '../utils/taskView';
import { useLocalStorage } from './useLocalStorage';

const isStatusFilter = isOptionValue(STATUS_FILTERS);
const isSortOption = isOptionValue(SORT_OPTIONS);

export const useTaskView = (tasks: Task[]) => {
  const [status, setStatus] = useLocalStorage<StatusFilter>(
    STORAGE_KEYS.statusFilter,
    'all',
    isStatusFilter,
  );
  const [query, setQuery] = useState('');
  const [sort, setSort] = useLocalStorage<SortOption>(
    STORAGE_KEYS.sortOption,
    'newest',
    isSortOption,
  );

  const visibleTasks = useMemo(
    () => getVisibleTasks(tasks, { status, query, sort }),
    [tasks, status, query, sort],
  );

  const counts = useMemo(() => countByStatus(tasks), [tasks]);

  return {
    status,
    setStatus,
    query,
    setQuery,
    sort,
    setSort,
    visibleTasks,
    counts,
    viewKey: `${status}|${sort}|${query.trim()}`,
  };
};
