import { Server } from 'socket.io';
import { createServer } from 'http';

const httpServer = createServer();

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});
