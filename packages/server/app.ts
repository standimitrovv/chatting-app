import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { IHttpError } from './models/ErrorModel';
import { socket } from './socket';

//routes
import { router as allChatRoutes } from './routes/AllChatRoutes';
import { router as userRoutes } from './routes/UserRoutes';
import { router as conversationRoutes } from './routes/ConversationRoutes';
import { router as directMessageRoutes } from './routes/DirectMessageRoutes';

dotenv.config();

const app = express();
app.disable('x-powered-by');

// API essentials
app.use(express.json());
app.use(cors());

// APIs
app.use('/all-chat', allChatRoutes);
app.use('/users', userRoutes);
app.use('/conversations', conversationRoutes);
app.use('/direct-messages', directMessageRoutes);

app.use(() => {
  throw new Error('Not implemented!');
});

app.use(
  (error: IHttpError, req: Request, res: Response, next: NextFunction) => {
    // BUG - error handling is not working - message.js - getConvoMessages
    if (res.headersSent) {
      return next(error);
    }

    res.status(error.code || 500).json({
      message: error.message || 'An unknown error occurred',
      code: error.code,
    });
  }
);

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

mongoose.connect(process.env.MONGODB_CONNECT!, () => {
  httpServer.listen(3001, () => {
    console.log('server started');

    socket(io);
  });
});
