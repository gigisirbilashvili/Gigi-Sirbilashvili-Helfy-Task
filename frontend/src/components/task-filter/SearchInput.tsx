import { SearchIcon } from 'lucide-react';
import { SearchInputProps } from './types';

export const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <label className="search-input">
    <SearchIcon />
    <input
      type="search"
      className="search-input__field"
      placeholder="Search tasks"
      aria-label="Search tasks"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </label>
);
