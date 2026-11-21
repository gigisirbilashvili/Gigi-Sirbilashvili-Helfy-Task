import { RequestHandler } from 'express';
import { getTaskId } from '../middleware/parseTaskId';
import { TaskStore } from '../services/TaskStore';
import { Task } from '../types/task';
import { notFound } from '../utils/HttpError';

const ensureFound = (task: Task | undefined, id: number): Task => {
  if (!task) {
    throw notFound(`Task ${id} not found`);
  }

  return task;
};

export const createTaskController = (store: TaskStore) => {
  const list: RequestHandler = (_req, res) => {
    res.json(store.findAll());
  };

  const getOne: RequestHandler = (_req, res) => {
    const id = getTaskId(res);

    res.json(ensureFound(store.findById(id), id));
  };

  const create: RequestHandler = (req, res) => {
    res.status(201).json(store.create(req.body));
  };

  const update: RequestHandler = (req, res) => {
    const id = getTaskId(res);

    res.json(ensureFound(store.update(id, req.body), id));
  };

  const toggle: RequestHandler = (_req, res) => {
    const id = getTaskId(res);

    res.json(ensureFound(store.toggle(id), id));
  };

  const remove: RequestHandler = (_req, res) => {
    const id = getTaskId(res);

    if (!store.remove(id)) {
      throw notFound(`Task ${id} not found`);
    }

    res.status(204).end();
  };

  return { list, getOne, create, update, toggle, remove };
};
