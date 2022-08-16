import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

//routes
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/user');
const conversationRoutes = require('./routes/conversation');
const messageRoutes = require('./routes/message');

dotenv.config();

const app = express();

// API essentials
app.use(express.json());
app.use(cors());

// APIs
app.use('/all-chat', chatRoutes);
app.use('/users', userRoutes);
app.use('/conversations', conversationRoutes);
app.use('/messages', messageRoutes);

app.use(() => {
  throw new Error('Not implemented!');
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // BUG - error handling is not working - message.js - getConvoMessages
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code || 500).json({
    message: error.message || 'An unknown error occurred',
    code: error.code,
  });
});

mongoose.connect(process.env.MONGODB_CONNECT!).then((result) => {
  const server = app.listen(3001);
  const io = require('./socket').init(server);
  io.on('connection', () => console.log('Client connected'));
});
