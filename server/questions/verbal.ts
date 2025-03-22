// Verbal Questions Module
import { Question } from '../types';

export function getDirectionSenseQuestions(): Question[] {
  console.log('Loading Direction Sense questions');
  return [
    {
      question: "A person walks 3 km North, then 4 km East, and finally 3 km South. How far is he from the starting point?",
      options: ["4 km", "5 km", "6 km", "7 km"],
      correctAnswer: 0,
      explanation: "The person ends up 4 km East of the starting point as the North and South movements cancel out."
    },
    // Add more questions...
  ];
}

export function getBloodRelationQuestions(): Question[] {
  console.log('Loading Blood Relations questions');
  return [
    {
      question: "A is B's sister, C is B's mother, D is C's father, E is D's mother. How is A related to E?",
      options: ["Great granddaughter", "Grandmother", "Daughter", "Granddaughter"],
      correctAnswer: 0,
      explanation: "A is B's sister → C is their mother → D is their grandfather → E is their great grandmother"
    },
    // Add more questions...
  ];
}

// Add other verbal question generators...
