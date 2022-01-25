require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

//routes
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/user');

// API esentials
app.use(express.json());
app.use(cors());

// APIs
app.use('/chat', chatRoutes);
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGODB_CONNECT).then((result) => {
  const server = app.listen(3001);
  const io = require('./socket').init(server);
  io.on('connection', (socket) => console.log('Client connected'));
});
