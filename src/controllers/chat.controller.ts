import { Request, Response } from 'express';
import { chatbotService } from '../services/chatbot.service';
import { Message } from '../models/message.model';

export const handleChat = async (req: Request, res: Response): Promise<any> => {
  const { message } = req.body;
  const userId = (req as any).user?.id;

  if (!userId) return res.status(401).json({ message: 'User not authenticated' });

  try {
    const { reply, escalated } = await chatbotService.processMessage(userId, message);
    res.json({ reply, escalated });
  } catch (err) {
    res.status(500).json({ message: 'Chatbot failed', error: err });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const messages = await Message.findAll({
      where: { userId },
      order: [['createdAt', 'ASC']]
    });

    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load history', error: err });
  }
};
