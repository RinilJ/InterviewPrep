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
  retryCount: number;
}

// Cache for tracking sessions
const sessions = new Map<string, SessionData>();

// Clean up old sessions periodically
setInterval(() => {
  const oneHourAgo = Date.now() - 3600000;
  for (const [key, data] of sessions) {
    if (data.startTime < oneHourAgo) {
      sessions.delete(key);
    }
  }
}, 3600000);

// Asynchronous function to get unique questions for a test
export async function getUniqueQuestionsForUser(
  userId: number,
  topicId: string,
  count: number = 10,
  maxRetries: number = 2
): Promise<Question[]> {
  console.time(`getQuestions-${userId}-${topicId}`);

  const sessionKey = `${userId}-${topicId}`;

  try {
    // Initialize or get session
    if (!sessions.has(sessionKey)) {
      sessions.set(sessionKey, {
        usedQuestions: new Set(),
        startTime: Date.now(),
        retryCount: 0
      });
    }

    const session = sessions.get(sessionKey)!;
    console.log(`Session ${sessionKey}: Used questions = ${session.usedQuestions.size}, Retries = ${session.retryCount}`);

    // Check retry limit
    if (session.retryCount >= maxRetries) {
      sessions.delete(sessionKey);
      throw new Error(`Max retries (${maxRetries}) exceeded for question generation`);
    }

    // Generate small batch of questions
    const batchSize = Math.min(15, count * 1.5); // Generate 50% more than needed, max 15
    console.time('generateQuestions');
    const questions = await generateQuestions(topicId, batchSize);
    console.timeEnd('generateQuestions');

    // Filter unique questions
    const uniqueQuestions = questions.filter(q => !session.usedQuestions.has(q.id));
    console.log(`Generated ${uniqueQuestions.length} unique questions of ${count} needed`);

    if (uniqueQuestions.length < count) {
      session.retryCount++;
      throw new Error('Not enough unique questions');
    }

    // Select random questions and mark as used
    const selectedQuestions = uniqueQuestions.slice(0, count).map(q => {
      session.usedQuestions.add(q.id);
      return {
        ...q,
        options: shuffleArray([...q.options])
      };
    });

    // Reset retry count on success
    session.retryCount = 0;
    console.timeEnd(`getQuestions-${userId}-${topicId}`);
    return selectedQuestions;

  } catch (error) {
    console.error('Question generation error:', error);
    if (sessions.get(sessionKey)?.retryCount! < maxRetries) {
      console.log(`Retrying question generation (${sessions.get(sessionKey)?.retryCount! + 1}/${maxRetries})`);
      return getUniqueQuestionsForUser(userId, topicId, count, maxRetries);
    }
    throw error;
  }
}

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Asynchronous question generation
async function generateQuestions(topicId: string, count: number): Promise<Question[]> {
  return new Promise((resolve) => {
    const questions: Question[] = [];

    for (let i = 0; i < count; i++) {
      const baseQuestion = generateQuestionByType(topicId, i);
      questions.push({
        ...baseQuestion,
        id: `${topicId}-${Date.now()}-${i}`
      });
    }

    resolve(shuffleArray(questions));
  });
}

// Generate question based on topic type
function generateQuestionByType(topicId: string, index: number): Question {
  const timestamp = Date.now();

  if (topicId.startsWith('L')) { // Verbal
    return generateVerbalQuestion(topicId, index, timestamp);
  } else if (topicId.startsWith('N')) { // Non-verbal
    return generateNonVerbalQuestion(topicId, index, timestamp);
  } else { // Mathematical
    return generateMathQuestion(topicId, index, timestamp);
  }
}

function generateVerbalQuestion(topicId: string, index: number, timestamp: number): Question {
  const directions = ['North', 'South', 'East', 'West'];
  const steps = Math.floor(Math.random() * 2) + 2;
  const path = [];

  for (let i = 0; i < steps; i++) {
    const dir = directions[Math.floor(Math.random() * directions.length)];
    const dist = Math.floor(Math.random() * 5) + 1;
    path.push(`${dist}km ${dir}`);
  }

  return {
    id: `${topicId}-${timestamp}-${index}`,
    question: `A person walks ${path.join(', then ')}. What direction are they from the start?`,
    options: shuffleArray([...directions]),
    correctAnswer: 0,
    explanation: 'Follow the path step by step to determine the final direction.'
  };
}

function generateNonVerbalQuestion(topicId: string, index: number, timestamp: number): Question {
  const shapes = ['circle', 'triangle', 'square', 'pentagon'];
  const sequence = shapes.slice(0, 3);

  return {
    id: `${topicId}-${timestamp}-${index}`,
    question: `What comes next in the sequence: ${sequence.join(', ')}?`,
    options: shuffleArray([...shapes]),
    correctAnswer: 0,
    explanation: 'Look for the pattern in the sequence.'
  };
}

function generateMathQuestion(topicId: string, index: number, timestamp: number): Question {
  const num1 = Math.floor(Math.random() * 50) + 1;
  const num2 = Math.floor(Math.random() * 50) + 1;
  const answer = num1 + num2;

  return {
    id: `${topicId}-${timestamp}-${index}`,
    question: `What is ${num1} + ${num2}?`,
    options: shuffleArray([
      answer.toString(),
      (answer + 5).toString(),
      (answer - 5).toString(),
      (answer * 2).toString()
    ]),
    correctAnswer: 0,
    explanation: `${num1} + ${num2} = ${answer}`
  };
}

// Question bank structure (titles only, questions generated on-demand)
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