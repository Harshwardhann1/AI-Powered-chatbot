import { cohereChat } from './cohere.service';
import { Message } from '../models/message.model';
import { getIO } from '../socket';

const fallbackKeywords = [
  'don\'t know', 'not sure', 'cannot help', 'unable to assist', 
  'no idea', 'sorry', 'contact support', 'don’t understand'
];

function isFallbackReply(text: string): boolean {
  const textLower = text.toLowerCase();
  return fallbackKeywords.some(keyword => textLower.includes(keyword));
}

export const chatbotService = {
  async processMessage(userId: number, message: string): Promise<{ reply: string; escalated: boolean }> {
    await Message.create({ userId, role: 'user', content: message });

    const botReply = await cohereChat(message);

    await Message.create({ userId, role: 'bot', content: botReply });

    const fallback = isFallbackReply(botReply) || message.toLowerCase().includes('talk to human');

    if (fallback) {
      getIO().emit('chat:escalate', { userId, message });
      console.log(`[ESCALATE] User ${userId} needs human assistance.`);
    }

    return { reply: botReply, escalated: fallback };
  },
};
