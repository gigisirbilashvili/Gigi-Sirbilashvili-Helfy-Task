import { STATUS_FILTERS } from '../../constants/task';
import { classNames } from '../../utils/classNames';
import { TaskFilterProps } from './types';

export const TaskFilter = ({ value, counts, onChange }: TaskFilterProps) => (
  <div className="segmented" role="group" aria-label="Filter by status">
    {STATUS_FILTERS.map((option) => {
      const isActive = option.value === value;

      return (
        <button
          key={option.value}
          type="button"
          className={classNames('segmented__option', isActive && 'segmented__option--active')}
          aria-pressed={isActive}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          <span className="segmented__count">{counts[option.value]}</span>
        </button>
      );
    })}
  </div>
);
