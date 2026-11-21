import '../../styles/states.css';

const PLACEHOLDERS = [1, 2, 3];

export const TaskSkeleton = () => (
  <div className="skeleton-row" aria-busy="true" aria-label="Loading tasks">
    {PLACEHOLDERS.map((id) => (
      <div key={id} className="skeleton-card">
        <span className="skeleton-line skeleton-line--short" />
        <span className="skeleton-line skeleton-line--title" />
        <span className="skeleton-line" />
        <span className="skeleton-line skeleton-line--medium" />
      </div>
    ))}
  </div>
);
