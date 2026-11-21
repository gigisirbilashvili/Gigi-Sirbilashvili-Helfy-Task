import { Router } from 'express';
import { createTaskController } from '../controllers/taskController';
import { parseTaskId } from '../middleware/parseTaskId';
import { validateBody } from '../middleware/validate';
import { taskBodySchema } from '../schemas/taskSchemas';
import { TaskStore } from '../services/TaskStore';

export const createTaskRouter = (store: TaskStore): Router => {
  const router = Router();
  const tasks = createTaskController(store);

  router.param('id', parseTaskId);

  router.get('/', tasks.list);

  router.post('/', validateBody(taskBodySchema), tasks.create);

  router.get('/:id', tasks.getOne);

  router.put('/:id', validateBody(taskBodySchema), tasks.update);

  router.delete('/:id', tasks.remove);

  router.patch('/:id/toggle', tasks.toggle);

  return router;
};
