export const describePending = (count: number): string => {
  if (count === 0) return 'Nothing left to do.';
  return `${count} ${count === 1 ? 'task' : 'tasks'} left to do.`;
};
