import { PriorityBadgeProps } from './types';

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => (
  <span className={`priority-badge priority-badge--${priority}`}>
    <span className="priority-badge__dot" />
    {priority}
  </span>
);
