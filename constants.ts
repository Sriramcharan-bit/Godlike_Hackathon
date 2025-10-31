import type { Quest } from './types';

export const QUESTS: Quest[] = [
  { 
    id: 1, 
    title: 'Intro to Python Loops', 
    description: 'Watch this short video to understand the basics of `for` and `while` loops in Python, the foundation of iteration.', 
    xp: 5,
    type: 'video',
    videoId: '94UHCE1d-4A'
  },
  {
    id: 2,
    title: 'Loop Logic Quiz',
    description: 'Test your knowledge of Python loops with these multiple-choice questions. Select the correct answer for each one.',
    xp: 10,
    type: 'quiz',
    questions: [
      {
        question: 'What will be the output of: for i in range(3): print(i)',
        options: ['0 1 2 3', '0 1 2', '1 2 3', '1 2'],
        correctAnswerIndex: 1
      },
      {
        question: 'Which keyword is used to exit a loop prematurely?',
        options: ['stop', 'exit', 'break', 'return'],
        correctAnswerIndex: 2
      },
      {
        question: 'What does the `continue` keyword do inside a loop?',
        options: ['Ends the entire loop', 'Skips the rest of the current iteration', 'Resumes a paused loop', 'Raises an error'],
        correctAnswerIndex: 1
      }
    ]
  },
  { 
    id: 3, 
    title: 'Fix The Infinite Loop', 
    description: 'This code is supposed to count to 5, but it runs forever! Fix the bug in the code editor and run it to complete the quest.', 
    xp: 15,
    type: 'code',
    embedUrl: 'https://trinket.io/embed/python/1a56108f2f?runOption=run'
  },
  {
    id: 4,
    title: 'Debugging Challenge',
    description: 'This code is throwing an IndexError. Can you spot why? Analyze the buggy code and then reveal the fix to learn a common pitfall.',
    xp: 20,
    type: 'debug',
    buggyCode: `numbers = [1, 2, 3, 4, 5]
# This will cause an error!
for i in range(len(numbers)):
  print(numbers[i+1])`,
    fixedCode: `numbers = [1, 2, 3, 4, 5]
# Iterate directly over the items
for num in numbers:
  print(num)`
  },
  {
    id: 5,
    title: 'Mini Project: Countdown',
    description: 'Complete the code snippet to create a program that counts down from 5 to 1. This is a common pattern in programming!',
    xp: 25,
    type: 'project',
    instructions: 'Complete the `range()` function to make the loop count down from 5 to 1. The `range` function can take a start, stop, and step argument.',
    codeSnippet: 'for i in range(____):\n  print(i)'
  }
];

export const MAX_XP_PER_LEVEL = 100;
