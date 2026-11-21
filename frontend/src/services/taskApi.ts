import { Task, TaskDraft } from '../types/task';
import { request } from './apiClient';

const withBody = (method: string, body: unknown): RequestInit => ({
  method,
  body: JSON.stringify(body),
});

export const taskApi = {
  getAll: () => request<Task[]>('/tasks'),
  create: (draft: TaskDraft) => request<Task>('/tasks', withBody('POST', draft)),
  update: (id: number, draft: TaskDraft) => request<Task>(`/tasks/${id}`, withBody('PUT', draft)),
  toggle: (id: number) => request<Task>(`/tasks/${id}/toggle`, { method: 'PATCH' }),
  remove: (id: number) => request<void>(`/tasks/${id}`, { method: 'DELETE' }),
};
