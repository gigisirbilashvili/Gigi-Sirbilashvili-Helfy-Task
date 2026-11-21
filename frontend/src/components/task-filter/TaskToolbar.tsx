import { SearchInput } from './SearchInput';
import { SortSelect } from './SortSelect';
import { TaskFilter } from './TaskFilter';
import { TaskToolbarProps } from './types';
import '../../styles/toolbar.css';

export const TaskToolbar = ({
  status,
  counts,
  query,
  sort,
  onStatusChange,
  onQueryChange,
  onSortChange,
}: TaskToolbarProps) => (
  <div className="toolbar">
    <TaskFilter value={status} counts={counts} onChange={onStatusChange} />
    <div className="toolbar__right">
      <SearchInput value={query} onChange={onQueryChange} />
      <SortSelect value={sort} onChange={onSortChange} />
    </div>
  </div>
);
