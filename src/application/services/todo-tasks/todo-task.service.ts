import sqlite3 from 'sqlite3';
import { Request } from 'express';
import { Encrypt } from '../../../utils/encrypt';

const db = new sqlite3.Database('todo-tasks.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE
    )`);
});

export class TodoTaskService {
  public static async getTasks(): Promise<any> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM tasks', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const tasks: any[] = rows.map((row: any) => ({
            ...row,
            completed: row.completed === 1,
          }));
          resolve({
            data: Encrypt.encrypt(JSON.stringify(tasks)),
            status: 200,
          });
        }
      });
    });
  }

  public static async createTask(rq: Request): Promise<any> {
    const bodyDecripted = JSON.parse(Encrypt.decrypt(rq.body.encryptedBody));
    const title = bodyDecripted.title;
    const description = bodyDecripted.description;
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(
        'INSERT INTO tasks (title, description) VALUES (?, ?)'
      );
      stmt.run(title, description, function (err: any): void {
        if (err) {
          reject(err);
        } else {
          resolve({
            data: Encrypt.encrypt('Tarea creada exitosamente'),
            status: 201,
          });
        }
      });
      stmt.finalize();
    });
  }

  public static async updateTask(rq: Request): Promise<any> {
    const bodyDecripted = JSON.parse(Encrypt.decrypt(rq.body.encryptedBody));
    const { id } = rq.params;
    const completed = bodyDecripted.completed ? 1 : 0;
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
        [rq.body.title, rq.body.description, completed, id],
        function (err: any): void {
          if (err) {
            reject(err);
          } else {
            resolve({
              data: Encrypt.encrypt('Tarea actualizada exitosamente'),
              status: 200,
            });
          }
        }
      );
    });
  }

  public static async updateTaskComplete(rq: Request): Promise<any> {
    const { id } = rq.params;
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE tasks SET completed = 1 WHERE id = ?',
        [id],
        function (err: any): void {
          if (err) {
            reject(err);
          } else {
            resolve({
              data: Encrypt.encrypt('Tarea actualizada exitosamente'),
              status: 200,
            });
          }
        }
      );
    });
  }

  public static async deleteTask(rq: Request): Promise<any> {
    const { id } = rq.params;
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks WHERE id = ?', [id], function (err: any): void {
        if (err) {
          reject(err);
        } else {
          resolve({
            data: Encrypt.encrypt('Tarea eliminada exitosamente'),
            status: 200,
          });
        }
      });
    });
  }
}
