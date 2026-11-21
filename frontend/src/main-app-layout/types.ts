import { Task } from '../types/task';

export type FormState = { mode: 'create' } | { mode: 'edit'; task: Task } | null;
