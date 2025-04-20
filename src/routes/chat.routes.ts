import { Router } from 'express';
import { handleChat, getChatHistory } from '../controllers/chat.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// 🔐 User must be authenticated to chat or fetch history
router.post('/chat', authenticate, handleChat);
router.get('/chat/history', authenticate, getChatHistory);

export default router;
