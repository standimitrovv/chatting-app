import { Server } from 'socket.io';
import { DirectMessage } from './models/DirectMessageModel';

export const socket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('client connected', socket.id);

    socket.on('message', (data: { message: DirectMessage }) => {
      console.log(data.message);
      socket.to(data.message.conversationId).emit('message', data.message);
    });
  });
};
