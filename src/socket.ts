import { Server } from 'socket.io';
import http from 'http';
import { Message } from './models/message.model';

let io: Server;

export const initSocketServer = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // Replace with your frontend domain in production
    },
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    socket.on('agent:join', (userId: number) => {
      socket.join(`room_${userId}`);
      console.log(`👨‍💼 Agent joined room_${userId}`);
    });

    socket.on('agent:message', async ({ userId, message }: { userId: number; message: string }) => {
      io.to(`room_${userId}`).emit('agent:message', { role: 'agent', message });

      // Store agent message in DB
      await Message.create({
        userId,
        role: 'agent',
        content: message,
      });
    });

    socket.on('disconnect', () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => io;
