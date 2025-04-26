import express from 'express';
import authRoutes from './routes/auth.routes';
import chatRoutes from './routes/chat.routes'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => callback(null, origin),  // Dynamically allow all origins
  credentials: true,                                     // Only if using cookies or auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes)

export default app;
