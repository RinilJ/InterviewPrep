import { Question } from '../types';

// Direction Sense Questions (L01)
export async function getDirectionSenseQuestions(): Promise<Question[]> {
  return [
    {
      question: "Starting from point A, John walks 3 km North, then 4 km East, and finally 3 km South. How far is he from point A?",
      options: ["4 km", "5 km", "6 km", "7 km"],
      correctAnswer: 0,
      explanation: "The North and South movements cancel out (3 km North and 3 km South). Only the 4 km East remains."
    },
    {
      question: "Mary walks 2 km South, then 3 km East, then 2 km North. What is the shortest distance to her starting point?",
      options: ["3 km", "4 km", "5 km", "7 km"],
      correctAnswer: 0,
      explanation: "The South and North movements cancel out. Only the 3 km East movement remains."
    },
    // Add more similar questions with different distances and directions...
    {
      question: "From his house, Tom walks 6 km West, then 8 km North. What is the direct distance from his house?",
      options: ["10 km", "12 km", "14 km", "16 km"],
      correctAnswer: 0,
      explanation: "Using Pythagorean theorem: √(6² + 8²) = 10 km"
    },
    // Continue adding more direction sense questions...
    // Total ~100 questions
  ];
}

// Blood Relations Questions (L02)
export async function getBloodRelationQuestions(): Promise<Question[]> {
  return [
    {
      question: "If A is B's father and C is B's sister, how is A related to C?",
      options: ["Father", "Uncle", "Brother", "Grandfather"],
      correctAnswer: 0,
      explanation: "Since A is B's father and C is B's sister, A must be C's father."
    },
    {
      question: "If P is Q's son and R is P's sister, how is R related to Q?",
      options: ["Daughter", "Sister", "Mother", "Aunt"],
      correctAnswer: 0,
      explanation: "Since P is Q's son and R is P's sister, R must be Q's daughter."
    },
    // Add more blood relation questions...
    // Continue with ~100 unique blood relation scenarios
  ];
}

// Example of Coding-Decoding Questions (L03)
export async function getCodingDecodingQuestions(): Promise<Question[]> {
  return [
    {
      question: "If COMPUTER is coded as RFUVQNPC, how is PRINTER coded?",
      options: ["QSJOUFQ", "SFUOJSQ", "QSJOUFS", "None of these"],
      correctAnswer: 2,
      explanation: "Each letter is shifted one position forward in the alphabet"
    },
    // Add many more coding-decoding questions...
  ];
}

// Add similar extensive question sets for other verbal sections...
// Each section should have around 100 unique, high-quality questions