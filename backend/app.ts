import cors from 'cors';
import express from 'express';
import { seedTasks } from './data/seedTasks';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { createTaskRouter } from './routes/taskRoutes';
import { TaskStore } from './services/TaskStore';

export const createApp = (store = new TaskStore(seedTasks)) => {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '10kb' }));

  app.use('/api/tasks', createTaskRouter(store));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
