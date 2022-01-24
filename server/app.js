require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
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

mongoose.connect(process.env.MONGODB_CONNECT);

app.listen(3001, () => {
  console.log('app running');
});
