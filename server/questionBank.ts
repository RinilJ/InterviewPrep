import { Question, QuestionBank } from './types';

// Cache for loaded questions
const questionCache = new Map<string, Question[]>();

// Cache for tracking used questions per session
const sessionQuestions = new Map<string, Set<string>>();

// Question bank structure with dynamic loading
export const questionBank: QuestionBank = {
  verbal: {
    "L09": {
      title: "Reading Comprehension",
      getQuestions: async () => {
        const key = 'L09';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/verbal');
          const questions = await module.getReadingComprehensionQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    },
    "L10": {
      title: "Verbal Reasoning",
      getQuestions: async () => {
        const key = 'L10';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/verbal');
          const questions = await module.getVerbalReasoningQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    },
    "L11": {
      title: "Word Order",
      getQuestions: async () => {
        const key = 'L11';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/verbal');
          const questions = await module.getWordOrderQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    },
    "L12": {
      title: "Logical Sequence",
      getQuestions: async () => {
        const key = 'L12';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/verbal');
          const questions = await module.getLogicalSequenceQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    }
  },
  nonVerbal: {
    "N03": {
      title: "Figure Series",
      getQuestions: async () => {
        const key = 'N03';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/nonVerbal');
          const questions = await module.getFigureSeriesQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    },
    "N04": {
      title: "Pattern Completion",
      getQuestions: async () => {
        const key = 'N04';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/nonVerbal');
          const questions = await module.getPatternCompletionQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    }
  },
  mathematical: {
    "Q06": {
      title: "Averages",
      getQuestions: async () => {
        const key = 'Q06';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/mathematical');
          const questions = await module.getAverageQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    },
    "Q07": {
      title: "Ratios and Proportions",
      getQuestions: async () => {
        const key = 'Q07';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/mathematical');
          const questions = await module.getRatioProportionQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    },
    "Q08": {
      title: "Geometry",
      getQuestions: async () => {
        const key = 'Q08';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/mathematical');
          const questions = await module.getGeometryQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    },
    "Q09": {
      title: "Numbers",
      getQuestions: async () => {
        const key = 'Q09';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/mathematical');
          const questions = await module.getNumberQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    },
    "Q10": {
      title: "Data Interpretation",
      getQuestions: async () => {
        const key = 'Q10';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/mathematical');
          const questions = await module.getDataInterpretationQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    },
    "Q11": {
      title: "Permutations and Combinations",
      getQuestions: async () => {
        const key = 'Q11';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/mathematical');
          const questions = await module.getPermutationCombinationQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    },
    "Q12": {
      title: "Probability",
      getQuestions: async () => {
        const key = 'Q12';
        if (!questionCache.has(key)) {
          console.time(`loadQuestions-${key}`);
          const module = await import('./questions/mathematical');
          const questions = await module.getProbabilityQuestions();
          questionCache.set(key, questions);
          console.timeEnd(`loadQuestions-${key}`);
          console.log(`Cached ${questions.length} questions for ${key}`);
        }
        return questionCache.get(key)!;
      }
    }
  }
};

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get unique questions for a test session
export async function getUniqueQuestionsForUser(
  userId: number,
  topicId: string,
  count: number = 10
): Promise<Question[]> {
  console.log(`Getting ${count} questions for user ${userId}, topic ${topicId}`);

  try {
    // Determine category from topic ID
    let category: keyof QuestionBank;
    if (topicId.startsWith('L')) category = 'verbal';
    else if (topicId.startsWith('N')) category = 'nonVerbal';
    else if (topicId.startsWith('Q')) category = 'mathematical';
    else throw new Error(`Invalid topic ID: ${topicId}`);

    const topic = questionBank[category][topicId];
    if (!topic) {
      throw new Error(`Topic not found: ${topicId}`);
    }

    // Initialize session tracking with timestamp
    const sessionKey = `${userId}-${topicId}-${Date.now()}`;
    if (!sessionQuestions.has(sessionKey)) {
      console.log(`Initializing new session for user ${userId}, topic ${topicId}`);
      sessionQuestions.set(sessionKey, new Set());
    }
    const sessionUsedQuestions = sessionQuestions.get(sessionKey)!;

    // Load questions for this topic
    console.time(`loadQuestions-${topicId}`);
    const allQuestions = await topic.getQuestions();
    console.timeEnd(`loadQuestions-${topicId}`);

    if (!allQuestions || allQuestions.length < count) {
      throw new Error(`Not enough questions available for topic ${topicId}. Need ${count}, have ${allQuestions?.length || 0}`);
    }

    console.log(`Loaded ${allQuestions.length} questions for topic ${topicId}`);

    // Filter out previously used questions
    const availableQuestions = allQuestions.filter(q => !sessionUsedQuestions.has(q.question));
    console.log(`${availableQuestions.length} questions available after filtering used ones`);

    // If running low on unique questions, clear the session
    if (availableQuestions.length < count) {
      console.log(`Resetting session for topic ${topicId} due to low question count`);
      sessionUsedQuestions.clear();
    }

    // Select random questions and shuffle options
    const questionsToUse = availableQuestions.length < count ? allQuestions : availableQuestions;
    const shuffled = shuffleArray(questionsToUse);
    const selected = shuffled.slice(0, count).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));

    // Mark selected questions as used
    selected.forEach(q => sessionUsedQuestions.add(q.question));
    console.log(`Selected ${selected.length} questions for user ${userId}, topic ${topicId}`);

    return selected;

  } catch (error) {
    console.error('Error in getUniqueQuestionsForUser:', error);
    throw error;
  }
}

// Clean up old sessions periodically (every hour)
setInterval(() => {
  const oneHourAgo = Date.now() - 3600000;
  let cleanedCount = 0;
  for (const [key] of sessionQuestions) {
    const timestamp = parseInt(key.split('-')[2]);
    if (timestamp < oneHourAgo) {
      sessionQuestions.delete(key);
      cleanedCount++;
    }
  }
  if (cleanedCount > 0) {
    console.log(`Cleaned up ${cleanedCount} old sessions`);
  }
}, 3600000);