import { z } from 'zod';

// Interface for question data
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface SessionData {
  usedQuestions: Set<string>;
  startTime: number;
}

// Session tracking with cleanup
const sessions = new Map<string, SessionData>();

// Cleanup old sessions every hour
setInterval(() => {
  const oneHourAgo = Date.now() - 3600000;
  for (const [key, data] of sessions) {
    if (data.startTime < oneHourAgo) {
      sessions.delete(key);
    }
  }
}, 3600000);

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Question generator functions
const questionGenerators = {
  L01: () => { // Direction Sense
    const directions = ['North', 'South', 'East', 'West'];
    const questions: Question[] = [];

    for (let i = 0; i < 100; i++) {
      const steps = Math.floor(Math.random() * 2) + 2;
      const path = [];
      const usedDirections = new Set();

      for (let j = 0; j < steps; j++) {
        let dir;
        do {
          dir = directions[Math.floor(Math.random() * directions.length)];
        } while (usedDirections.has(dir));
        usedDirections.add(dir);

        const dist = Math.floor(Math.random() * 5) + 1;
        path.push(`${dist}km ${dir}`);
      }

      questions.push({
        id: `L01-${i}`,
        question: `A person walks ${path.join(', then ')}. What direction are they from the starting point?`,
        options: shuffleArray([...directions]),
        correctAnswer: 0,
        explanation: 'Calculate the final position by following each step and determine the opposite direction.'
      });
    }
    return questions;
  },

  L02: () => { // Blood Relations
    const relations = ['father', 'mother', 'sister', 'brother', 'son', 'daughter'];
    const names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const questions: Question[] = [];

    for (let i = 0; i < 100; i++) {
      const name1 = names[Math.floor(Math.random() * names.length)];
      const name2 = names[Math.floor(Math.random() * names.length)];
      const relation = relations[Math.floor(Math.random() * relations.length)];

      questions.push({
        id: `L02-${i}`,
        question: `If ${name1} is ${name2}'s ${relation}, what is ${name2} to ${name1}?`,
        options: shuffleArray(['child', 'parent', 'sibling', 'cousin']),
        correctAnswer: 0,
        explanation: `Analyze the given relationship and determine the reciprocal relation.`
      });
    }
    return questions;
  },

  N01: () => { // Logical Venn Diagrams
    const sets = ['Animals', 'Mammals', 'Birds', 'Fish', 'Pets', 'Wild'];
    const questions: Question[] = [];

    for (let i = 0; i < 100; i++) {
      const set1 = sets[Math.floor(Math.random() * sets.length)];
      const set2 = sets[Math.floor(Math.random() * sets.length)];

      questions.push({
        id: `N01-${i}`,
        question: `In a Venn diagram showing ${set1} and ${set2}, what would the intersection represent?`,
        options: shuffleArray([
          `${set1} that are also ${set2}`,
          `Only ${set1}`,
          `Only ${set2}`,
          `Neither ${set1} nor ${set2}`
        ]),
        correctAnswer: 0,
        explanation: `The intersection represents elements common to both sets.`
      });
    }
    return questions;
  },

  Q01: () => { // Percentages
    const questions: Question[] = [];

    for (let i = 0; i < 100; i++) {
      const num1 = Math.floor(Math.random() * 100) + 1;
      const num2 = Math.floor(Math.random() * 100) + 1;
      const answer = Math.round((num1 / num2) * 100);

      questions.push({
        id: `Q01-${i}`,
        question: `${num1} is what percentage of ${num2}?`,
        options: shuffleArray([
          answer.toString(),
          (answer + 10).toString(),
          (answer - 10).toString(),
          (answer * 2).toString()
        ]),
        correctAnswer: 0,
        explanation: `To find the percentage, divide ${num1} by ${num2} and multiply by 100.`
      });
    }
    return questions;
  }
};

// Question bank with generated questions
export const questionBank = {
  verbal: {
    "L01": { title: "Direction Sense", questions: questionGenerators.L01() },
    "L02": { title: "Blood Relations", questions: questionGenerators.L02() },
    "L03": { title: "Coding and Decoding", questions: [] }, // Will add more generators
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
    "N01": { title: "Logical Venn Diagrams", questions: questionGenerators.N01() },
    "N02": { title: "Dice and Cubes", questions: [] },
    "N03": { title: "Figure Series", questions: [] },
    "N04": { title: "Pattern Completion", questions: [] }
  },
  mathematical: {
    "Q01": { title: "Percentages", questions: questionGenerators.Q01() },
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

// Get unique questions for a test session
export async function getUniqueQuestionsForUser(
  userId: number,
  topicId: string,
  count: number = 10
): Promise<Question[]> {
  console.time(`getQuestions-${userId}-${topicId}`);
  const sessionKey = `${userId}-${topicId}`;

  try {
    // Initialize session if needed
    if (!sessions.has(sessionKey)) {
      sessions.set(sessionKey, {
        usedQuestions: new Set(),
        startTime: Date.now()
      });
    }

    const session = sessions.get(sessionKey)!;

    // Get category and topic questions
    let category: 'verbal' | 'nonVerbal' | 'mathematical';
    if (topicId.startsWith('L')) category = 'verbal';
    else if (topicId.startsWith('N')) category = 'nonVerbal';
    else category = 'mathematical';

    const topicQuestions = questionBank[category][topicId].questions;

    // Filter out previously used questions
    const availableQuestions = topicQuestions.filter(q => !session.usedQuestions.has(q.id));

    if (availableQuestions.length < count) {
      session.usedQuestions.clear(); // Reset if not enough questions
      return getUniqueQuestionsForUser(userId, topicId, count);
    }

    // Select random questions
    const selectedQuestions = shuffleArray(availableQuestions)
      .slice(0, count)
      .map(q => {
        session.usedQuestions.add(q.id);
        return {
          ...q,
          options: shuffleArray([...q.options])
        };
      });

    console.timeEnd(`getQuestions-${userId}-${topicId}`);
    return selectedQuestions;

  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}

// Validate question bank structure
export function validateQuestionBank(): boolean {
  console.log('Validating question bank structure');
  try {
    return (
      typeof questionBank === 'object' &&
      questionBank.verbal &&
      questionBank.nonVerbal &&
      questionBank.mathematical &&
      Object.values(questionBank.verbal).every(topic => Array.isArray(topic.questions)) &&
      Object.values(questionBank.nonVerbal).every(topic => Array.isArray(topic.questions)) &&
      Object.values(questionBank.mathematical).every(topic => Array.isArray(topic.questions))
    );
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}