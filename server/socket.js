let io;

module.exports = {
  init: (httpServer) => {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) throw new Error('No socket connection');
    return io;
  },
};
