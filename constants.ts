import type { Quest } from './types';

export const QUESTS: Quest[] = [
  { id: 1, title: 'The First Step', description: 'Embark on your journey by completing this introductory quest. Learn the basics of our platform and earn your first XP!', xp: 5 },
  { id: 2, title: 'Building Blocks', description: 'Dive into the core concepts. This quest will challenge you to understand the fundamental building blocks of the subject.', xp: 10 },
  { id: 3, title: 'Intermediate Challenge', description: 'Apply your newfound knowledge to a practical problem. This quest bridges theory and practice.', xp: 15 },
  { id: 4, title: 'Advanced Techniques', description: 'Explore complex features and advanced strategies. This quest is for those who want to deepen their expertise.', xp: 20 },
  { id: 5, title: 'The Final Test', description: 'Prove your mastery by tackling a comprehensive final project. This is the ultimate test of your skills!', xp: 25 },
];

export const MAX_XP_PER_LEVEL = 100;