// src/app.ts
import Server from './bin/server';
import express from 'express';
import { TodoTaskRouter } from './infrastructure/routers/todo-task.router';
import cors from 'cors';

const PORT = 4000;
const server = new Server(PORT);

server.app.use(cors());

// Middlewares
server.app.use(express.json());

const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers['x-authorization'];

  if (token === 'bdb1234') {
    next();
  } else {
    res.status(403).json({ error: 'No autorizado' });
  }
};

server.app.use(authMiddleware); // Aplicar el middleware de autenticación

// Routes
server.app.use('/todo-tasks', TodoTaskRouter);

server.start();
