import { Request, Response } from 'express';
import { TodoTaskService } from '../../../application/services/todo-tasks/todo-task.service';

export class TodoTaskController {
  public static async getTasks(_rq: Request, res: Response): Promise<any> {
    try {
      const tasks = await TodoTaskService.getTasks();
      return res.status(tasks.status).json(tasks.data).end();
    } catch (error: any) {
      return res.status(500).json({ error: error.message }).end();
    }
  }

  public static async createTasks(rq: Request, res: Response): Promise<any> {
    try {
      const task = await TodoTaskService.createTask(rq);
      return res.status(task.status).json(task.data).end();
    } catch (error: any) {
      return res.status(500).json({ error: error.message }).end();
    }
  }

  public static async updateTasks(rq: Request, res: Response): Promise<any> {
    try {
      const tasks = await TodoTaskService.updateTask(rq);
      return res.status(tasks.status).json(tasks.data).end();
    } catch (error: any) {
      return res.status(500).json({ error: error.message }).end();
    }
  }

  public static async updateTasksComplete(
    rq: Request,
    res: Response
  ): Promise<any> {
    try {
      const tasks = await TodoTaskService.updateTaskComplete(rq);
      return res.status(tasks.status).json(tasks.data).end();
    } catch (error: any) {
      return res.status(500).json({ error: error.message }).end();
    }
  }

  public static async deleteTasks(rq: Request, res: Response): Promise<any> {
    try {
      const tasks = await TodoTaskService.deleteTask(rq);
      return res.status(tasks.status).json(tasks.data).end();
    } catch (error: any) {
      return res.status(500).json({ error: error.message }).end();
    }
  }
}
