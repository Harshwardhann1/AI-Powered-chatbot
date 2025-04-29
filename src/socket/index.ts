import { Server } from 'socket.io';
import http from 'http';
import { Message } from '../models/message.model';

let io: Server;

export const initSocketServer = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
    path: "/socket.io",                   // Ensure this matches frontend
  });

  // ✅ Define namespace "/api/chat"
  const chatNamespace = io.of("/api/chat");

  chatNamespace.on('connection', (socket) => {
    console.log(`🔌 Socket connected on /api/chat namespace: ${socket.id}`);

    // 🔑 Optional: Token check if you're sending token via auth
    const token = socket.handshake.auth?.token;
    console.log("Received token:", token);

    // ✅ Join room logic (if userId is provided)
    socket.on('join_room', (userId: number) => {
      socket.join(`room_${userId}`);
      console.log(`👨‍💼 Agent joined room_${userId}`);
    });

    // ✅ Message sending event (frontend will emit "send_message")
    socket.on('send_message', async ({ userId, message }: { userId: number; message: string }) => {
      console.log(`📩 Message from agent to room_${userId}: ${message}`);

      // Emit back to the room
      chatNamespace.to(`room_${userId}`).emit('receive_message', { role: 'agent', message });

      // Save the message to the database
      await Message.create({
        userId,
        role: 'agent',
        content: message,
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`❌ Socket disconnected from /api/chat namespace: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => io;
