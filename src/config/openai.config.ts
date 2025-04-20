import { ChatOpenAI } from '@langchain/openai';

export const openai = new ChatOpenAI({
  temperature: 0.7,
  modelName: 'gpt-3.5-turbo',
  apiKey: process.env.OPENAI_API_KEY,
});
