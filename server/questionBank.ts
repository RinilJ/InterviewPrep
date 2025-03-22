import { z } from 'zod';

// Helper function to format explanation
function formatExplanation(question: string, answer: string, reasoning: string, formula?: string): string {
  let explanation = `Correct Answer: ${answer}\n\nReasoning: ${reasoning}`;
  if (formula) {
    explanation += `\n\nFormula Used: ${formula}`;
  }
  return explanation;
}

// Cache for tracking used questions per test session
const sessionQuestions = new Map<string, Set<string>>();

// Get unique random indices
function getUniqueRandomIndices(max: number, count: number): number[] {
  const indices = Array.from({ length: max }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

// Topic-specific question generators
function generateDirectionSenseQuestion(): any {
  const directions = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];
  const distances = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const steps = Math.floor(Math.random() * 2) + 2; // 2-3 steps
  const path = [];
  let finalPosition = { x: 0, y: 0 };

  // Generate unique path
  const usedDirections = new Set();
  for (let i = 0; i < steps; i++) {
    let dir;
    do {
      dir = directions[Math.floor(Math.random() * directions.length)];
    } while (usedDirections.has(dir));
    usedDirections.add(dir);

    const dist = distances[Math.floor(Math.random() * distances.length)];
    path.push(`${dist} km ${dir}`);

    switch (dir) {
      case 'North': finalPosition.y += dist; break;
      case 'South': finalPosition.y -= dist; break;
      case 'East': finalPosition.x += dist; break;
      case 'West': finalPosition.x -= dist; break;
      case 'North-East': finalPosition.x += dist * 0.707; finalPosition.y += dist * 0.707; break;
      case 'North-West': finalPosition.x -= dist * 0.707; finalPosition.y += dist * 0.707; break;
      case 'South-East': finalPosition.x += dist * 0.707; finalPosition.y -= dist * 0.707; break;
      case 'South-West': finalPosition.x -= dist * 0.707; finalPosition.y -= dist * 0.707; break;
    }
  }

  return {
    question: `A person walks ${path.join(', then ')}. In which direction is the person from the starting point?`,
    options: ['North', 'South', 'East', 'West'],
    correctAnswer: Math.floor(Math.random() * 4),
    explanation: `Calculate the final direction based on the movements: ${path.join(', then ')}`
  };
}

function generateBloodRelationsQuestion(): any {
  const relations = [
    { role: 'father', inverse: 'son' },
    { role: 'mother', inverse: 'daughter' },
    { role: 'brother', inverse: 'sister' },
    { role: 'uncle', inverse: 'nephew' },
    { role: 'aunt', inverse: 'niece' },
    { role: 'grandfather', inverse: 'grandson' }
  ];
  const names = ['John', 'Mary', 'James', 'Sarah', 'Robert', 'Emma', 'William', 'Elizabeth'];

  const relation = relations[Math.floor(Math.random() * relations.length)];
  const name1 = names[Math.floor(Math.random() * names.length)];
  const name2 = names[Math.floor(Math.random() * names.length)];

  return {
    question: `If ${name1} is ${relation.role} of ${name2}, what is ${name2} to ${name1}?`,
    options: [relation.inverse, relation.role, 'cousin', 'not related'],
    correctAnswer: 0,
    explanation: `Since ${name1} is the ${relation.role} of ${name2}, ${name2} must be the ${relation.inverse} of ${name1}.`
  };
}

function generateCodingDecodingQuestion(): any {
  const words = ['COMPUTER', 'PROGRAM', 'KEYBOARD', 'MONITOR', 'SYSTEM'];
  const word = words[Math.floor(Math.random() * words.length)];
  const shift = Math.floor(Math.random() * 3) + 1;

  const encoded = word.split('').map(c =>
    String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65)
  ).join('');

  return {
    question: `If each letter in ${word} is shifted ${shift} position(s) forward in the alphabet, what is the coded word?`,
    options: [
      encoded,
      encoded.split('').reverse().join(''),
      word.split('').reverse().join(''),
      word
    ],
    correctAnswer: 0,
    explanation: `Each letter is shifted ${shift} positions forward in the alphabet. Original word: ${word}, Encoded: ${encoded}`
  };
}

// Main function to generate questions for a topic
function generateQuestionsForTopic(topicId: string, count: number = 10): any[] {
  console.time(`generateQuestionsForTopic-${topicId}`);

  let generateQuestion;
  switch (topicId) {
    case 'L01':
      generateQuestion = generateDirectionSenseQuestion;
      break;
    case 'L02':
      generateQuestion = generateBloodRelationsQuestion;
      break;
    case 'L03':
      generateQuestion = generateCodingDecodingQuestion;
      break;
    // Add more cases for other topics
    default:
      generateQuestion = generateDirectionSenseQuestion; // Fallback
  }

  const questions = [];
  const uniqueQuestionKeys = new Set<string>();

  while (questions.length < count) {
    const question = generateQuestion();
    const questionKey = `${question.question}-${question.correctAnswer}`;

    if (!uniqueQuestionKeys.has(questionKey)) {
      uniqueQuestionKeys.add(questionKey);
      questions.push(question);
    }
  }

  console.timeEnd(`generateQuestionsForTopic-${topicId}`);
  return questions;
}

// Main function to get unique questions for a user
export function getUniqueQuestionsForUser(userId: number, topicId: string, count: number = 10): any[] {
  console.time('getUniqueQuestionsForUser');

  const sessionKey = `${userId}-${topicId}-${Date.now()}`;
  if (!sessionQuestions.has(sessionKey)) {
    sessionQuestions.set(sessionKey, new Set());
  }

  try {
    const questions = generateQuestionsForTopic(topicId, count);

    if (questions.length < count) {
      throw new Error(`Could not generate enough unique questions (got ${questions.length}, needed ${count})`);
    }

    // Mark questions as used
    const sessionUsedQuestions = sessionQuestions.get(sessionKey)!;
    questions.forEach(q => {
      sessionUsedQuestions.add(q.question);
      q.options = shuffleArray([...q.options]);
    });

    console.timeEnd('getUniqueQuestionsForUser');
    return questions;

  } catch (error) {
    console.error('Error in getUniqueQuestionsForUser:', error);
    throw error;
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Clean up old sessions periodically
setInterval(() => {
  const oneHourAgo = Date.now() - 3600000;
  for (const [key] of sessionQuestions) {
    const timestamp = parseInt(key.split('-')[2]);
    if (timestamp < oneHourAgo) {
      sessionQuestions.delete(key);
    }
  }
}, 3600000);

// Question bank structure
export const questionBank = {
  verbal: {
    "L01": { title: "Direction Sense", questions: [] },
    "L02": { title: "Blood Relations", questions: [] },
    "L03": { title: "Coding and Decoding", questions: [] },
    "L04": { title: "Number Series", questions: [] },
    "L05": { title: "Analogy", questions: [] },
    "L06": { title: "Synonyms", questions: [] },
    "L07": { title: "Antonyms", questions: [] },
    "L08": { title: "Sentence Completion", questions: [] },
    "L09": { title: "Reading Comprehension", questions: [] },
    "L10": { title: "Verbal Reasoning", questions: [] },
    "L11": { title: "Word Order", questions: [] },
    "L12": { title: "Logical Sequence", questions: [] }
  },
  nonVerbal: {
    "N01": { title: "Logical Venn Diagrams", questions: [] },
    "N02": { title: "Dice and Cubes", questions: [] },
    "N03": { title: "Figure Series", questions: [] },
    "N04": { title: "Pattern Completion", questions: [] }
  },
  mathematical: {
    "Q01": { title: "Percentages", questions: [] },
    "Q02": { title: "Profit and Loss", questions: [] },
    "Q03": { title: "Interest", questions: [] },
    "Q04": { title: "Time and Work", questions: [] },
    "Q05": { title: "Time and Distance", questions: [] },
    "Q06": { title: "Averages", questions: [] },
    "Q07": { title: "Ratios and Proportions", questions: [] },
    "Q08": { title: "Geometry", questions: [] },
    "Q09": { title: "Numbers", questions: [] },
    "Q10": { title: "Data Interpretation", questions: [] },
    "Q11": { title: "Permutations and Combinations", questions: [] },
    "Q12": { title: "Probability", questions: [] }
  }
};