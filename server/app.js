require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

//routes
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/user');
const conversationRoutes = require('./routes/conversation');
const messageRoutes = require('./routes/message');

//db util functions
const updateUserStatus = require('./controllers/db/user/updateStatus');

// API essentials
app.use(express.json());
app.use(cors());

// APIs
app.use('/all-chat', chatRoutes);
app.use('/users', userRoutes);
app.use('/conversations', conversationRoutes);
app.use('/messages', messageRoutes);

app.use((req, res, next) => {
  throw new Error('Not implemented!');
});

app.use((error, req, res, next) => {
  // BUG - error handling is not working - message.js - getConvoMessages
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code || 500).json({
    message: error.message || 'An unknown error occurred',
    code: error.code,
  });
});

mongoose.connect(process.env.MONGODB_CONNECT).then((result) => {
  const server = app.listen(3001);

  const io = require('./socket').init(server);

  io.on('connection', (socket) => {
    socket.on('join', async (userId) => {
      //set user status to online
      await updateUserStatus(userId, 'Available');
    });

    socket.on('disconnect', async (userId) => {
      // set user status to offline
      await updateUserStatus(userId, 'Offline');
    });
  });
});
