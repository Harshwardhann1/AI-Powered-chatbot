import { PromptCategory } from '../config/prompts.config';

const mentalHealthKeywords = [
  'stress', 'anxiety', 'depression', 'panic', 'mental health',
  'sad', 'overwhelmed', 'burnout', 'lonely', 'grief', 'trauma', 'fear',
  'feeling down', 'emotional support', 'cope', 'coping strategies'
];

const fitnessKeywords = [
  'exercise', 'diet', 'workout', 'gym', 'fitness', 'calories', 
  'weight loss', 'muscle gain', 'yoga', 'cardio', 'strength training',
  'nutrition', 'protein', 'fat loss', 'healthy eating', 'hydration', 'stretching'
];

export const selectPromptCategory = (message: string): PromptCategory => {
  const lowerCaseMsg = message.toLowerCase();

  // Check for mental health-related keywords
  if (mentalHealthKeywords.some((keyword) => lowerCaseMsg.includes(keyword))) {
    return 'mentalHealth';
  }

  // Check for fitness-related keywords
  if (fitnessKeywords.some((keyword) => lowerCaseMsg.includes(keyword))) {
    return 'fitness';
  }

  // Default to general if no match found
  return 'general';
};
