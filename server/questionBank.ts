import { z } from 'zod';

// Question bank structure (titles only)
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

// Simple startup validation - only checks structure
export function validateQuestionBank(): boolean {
  console.log('Validating question bank structure');
  try {
    return (
      typeof questionBank === 'object' &&
      questionBank.verbal &&
      questionBank.nonVerbal &&
      questionBank.mathematical
    );
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}

// Session tracking with cleanup
const sessions = new Map<string, Set<string>>();

// Lightweight cleanup every hour
setInterval(() => {
  const oneHourAgo = Date.now() - 3600000;
  sessions.forEach((_, key) => {
    const timestamp = parseInt(key.split('-')[2]);
    if (timestamp < oneHourAgo) {
      sessions.delete(key);
    }
  });
}, 3600000);

// Async question generation
export async function getUniqueQuestionsForUser(
  userId: number,
  topicId: string,
  count: number = 10
): Promise<any[]> {
  console.time(`generateQuestions-${userId}-${topicId}`);

  const sessionKey = `${userId}-${topicId}-${Date.now()}`;
  if (!sessions.has(sessionKey)) {
    sessions.set(sessionKey, new Set());
  }

  try {
    // Generate basic questions
    const questions = await generateBasicQuestions(topicId, count);
    const usedQuestions = sessions.get(sessionKey)!;

    // Filter unique questions
    const uniqueQuestions = questions.filter(q => !usedQuestions.has(q.id));
    uniqueQuestions.forEach(q => usedQuestions.add(q.id));

    console.timeEnd(`generateQuestions-${userId}-${topicId}`);
    return uniqueQuestions.slice(0, count);
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}

// Basic question generation
async function generateBasicQuestions(topicId: string, count: number): Promise<any[]> {
  return new Promise(resolve => {
    const questions = [];
    const timestamp = Date.now();

    for (let i = 0; i < count; i++) {
      const question = {
        id: `${topicId}-${timestamp}-${i}`,
        question: `Sample question ${i + 1} for ${topicId}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a sample explanation'
      };
      questions.push(question);
    }

    resolve(questions);
  });
}