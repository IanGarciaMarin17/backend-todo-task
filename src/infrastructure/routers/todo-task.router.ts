import express from 'express';
import { TodoTaskController } from '../controllers/todo-tasks/todo-task.controller';

const TodoTaskRouter = express.Router();

TodoTaskRouter.get('/tasks', TodoTaskController.getTasks);

TodoTaskRouter.post('/tasks', TodoTaskController.createTasks);

TodoTaskRouter.put('/tasks/:id', TodoTaskController.updateTasks);
TodoTaskRouter.put(
  '/tasks/complete/:id',
  TodoTaskController.updateTasksComplete
);

TodoTaskRouter.delete('/tasks/:id', TodoTaskController.deleteTasks);

export { TodoTaskRouter };
