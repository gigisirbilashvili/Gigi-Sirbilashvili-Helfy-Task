import { useCallback, useEffect, useState } from 'react';
import { taskApi } from '../services/taskApi';
import { Task, TaskDraft } from '../types/task';
import { getErrorMessage } from '../utils/errors';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      setTasks(await taskApi.getAll());
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const replaceTask = useCallback((updated: Task) => {
    setTasks((current) => current.map((task) => (task.id === updated.id ? updated : task)));
  }, []);

  const addTask = useCallback(async (draft: TaskDraft) => {
    const created = await taskApi.create(draft);
    setTasks((current) => [...current, created]);
  }, []);

  const editTask = useCallback(
    async (id: number, draft: TaskDraft) => replaceTask(await taskApi.update(id, draft)),
    [replaceTask],
  );

  const toggleTask = useCallback(
    async (id: number) => replaceTask(await taskApi.toggle(id)),
    [replaceTask],
  );

  const deleteTask = useCallback(async (id: number) => {
    await taskApi.remove(id);
    setTasks((current) => current.filter((task) => task.id !== id));
  }, []);

  return { tasks, isLoading, loadError, loadTasks, addTask, editTask, toggleTask, deleteTask };
};
