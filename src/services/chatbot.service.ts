
import { getChatbotChain } from '../config/chain.config';
import { Message } from '../models/conversation.model';
import { getIO } from '../socket';

const chatbot = getChatbotChain();

const fallbackTriggers = [
  "i don't know",
  "i'm not sure",
  "i cannot help with that",
  "please contact support"
];

function isFallbackReply(text: string): boolean {
  return fallbackTriggers.some(trigger => text.toLowerCase().includes(trigger));
}

export const chatbotService = {
  async processMessage(userId: number, message: string): Promise<{ reply: string, escalated: boolean }> {
    await Message.create({ userId, role: 'user', content: message });

    const response = await chatbot.call({ input: message });
    const botReply = response.response;

    await Message.create({ userId, role: 'bot', content: botReply });

    const fallback = isFallbackReply(botReply) || message.toLowerCase().includes('talk to human');

    if (fallback) {
      getIO().emit('chat:escalate', { userId, message });
      console.log(`[ESCALATE] User ${userId} needs human assistance.`);
    }

    return { reply: botReply, escalated: fallback };
  },
};
