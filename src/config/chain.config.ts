import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts';
import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';
import { openai } from '../config/openai.config';

const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
  "You are a compassionate mental health advisor. Your role is to provide emotional support, listen without judgment, and offer practical coping strategies for stress, anxiety, loneliness, and related concerns. Avoid medical diagnosis or medication advice. Always encourage the user to seek professional help if necessary."
);

const humanPrompt = HumanMessagePromptTemplate.fromTemplate("{input}");

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  systemPrompt,
  humanPrompt,
]);

export const getChatbotChain = () => {
  return new ConversationChain({
    llm: openai,
    memory: new BufferMemory(),
    prompt: chatPrompt,
  });
};
