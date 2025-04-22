import { CohereClient } from 'cohere-ai';

const co = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

export const cohereChat = async (message: string): Promise<string> => {
  try {
    const response = await co.generate({
      model: 'command',
      prompt: message,
      maxTokens: 300,
      temperature: 0.7,
    });

    const reply = response.generations[0].text.trim();
    return reply;
  } catch (error) {
    console.error('Cohere API error:', error);
    throw new Error('Cohere failed to generate a response');
  }
};
