import { SORT_OPTIONS } from '../../constants/task';
import { SortOption } from '../../types/task';
import { SortSelectProps } from './types';

export const SortSelect = ({ value, onChange }: SortSelectProps) => (
  <label className="sort-select">
    <span className="sort-select__label">Sort</span>
    <select
      className="sort-select__field"
      value={value}
      onChange={(event) => onChange(event.target.value as SortOption)}
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);
