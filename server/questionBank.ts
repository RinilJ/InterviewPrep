import { Question, QuestionBank } from './types';
import * as verbalQuestions from './questions/verbal';
import * as nonVerbalQuestions from './questions/nonVerbal';
import * as mathematicalQuestions from './questions/mathematical';

// Cache for tracking used questions per session
const sessionQuestions = new Map<string, Set<string>>();

// Question bank structure with lazy loading
export const questionBank: QuestionBank = {
  verbal: {
    "L01": {
      title: "Direction Sense",
      getQuestions: verbalQuestions.getDirectionSenseQuestions
    },
    "L02": {
      title: "Blood Relations",
      getQuestions: verbalQuestions.getBloodRelationQuestions
    },
    "L03": {
      title: "Coding and Decoding",
      getQuestions: verbalQuestions.getCodingDecodingQuestions
    },
    "L04": {
      title: "Number Series",
      getQuestions: verbalQuestions.getNumberSeriesQuestions
    },
    "L05": {
      title: "Analogy",
      getQuestions: verbalQuestions.getAnalogyQuestions
    },
    "L06": {
      title: "Synonyms",
      getQuestions: verbalQuestions.getSynonymQuestions
    },
    "L07": {
      title: "Antonyms",
      getQuestions: verbalQuestions.getAntonymQuestions
    },
    "L08": {
      title: "Sentence Completion",
      getQuestions: verbalQuestions.getSentenceCompletionQuestions
    },
    "L09": {
      title: "Reading Comprehension",
      getQuestions: verbalQuestions.getReadingComprehensionQuestions
    },
    "L10": {
      title: "Verbal Reasoning",
      getQuestions: verbalQuestions.getVerbalReasoningQuestions
    },
    "L11": {
      title: "Word Order",
      getQuestions: verbalQuestions.getWordOrderQuestions
    },
    "L12": {
      title: "Logical Sequence",
      getQuestions: verbalQuestions.getLogicalSequenceQuestions
    }
  },
  nonVerbal: {
    "N01": {
      title: "Logical Venn Diagrams",
      getQuestions: nonVerbalQuestions.getLogicalVennQuestions
    },
    "N02": {
      title: "Dice and Cubes",
      getQuestions: nonVerbalQuestions.getDiceCubeQuestions
    },
    "N03": {
      title: "Figure Series",
      getQuestions: nonVerbalQuestions.getFigureSeriesQuestions
    },
    "N04": {
      title: "Pattern Completion",
      getQuestions: nonVerbalQuestions.getPatternCompletionQuestions
    }
  },
  mathematical: {
    "Q01": {
      title: "Percentages",
      getQuestions: mathematicalQuestions.getPercentageQuestions
    },
    "Q02": {
      title: "Profit and Loss",
      getQuestions: mathematicalQuestions.getProfitLossQuestions
    },
    "Q03": {
      title: "Interest",
      getQuestions: mathematicalQuestions.getInterestQuestions
    },
    "Q04": {
      title: "Time and Work",
      getQuestions: mathematicalQuestions.getTimeWorkQuestions
    },
    "Q05": {
      title: "Time and Distance",
      getQuestions: mathematicalQuestions.getTimeDistanceQuestions
    },
    "Q06": {
      title: "Averages",
      getQuestions: mathematicalQuestions.getAverageQuestions
    },
    "Q07": {
      title: "Ratios and Proportions",
      getQuestions: mathematicalQuestions.getRatioProportionQuestions
    },
    "Q08": {
      title: "Geometry",
      getQuestions: mathematicalQuestions.getGeometryQuestions
    },
    "Q09": {
      title: "Numbers",
      getQuestions: mathematicalQuestions.getNumberQuestions
    },
    "Q10": {
      title: "Data Interpretation",
      getQuestions: mathematicalQuestions.getDataInterpretationQuestions
    },
    "Q11": {
      title: "Permutations and Combinations",
      getQuestions: mathematicalQuestions.getPermutationCombinationQuestions
    },
    "Q12": {
      title: "Probability",
      getQuestions: mathematicalQuestions.getProbabilityQuestions
    }
  }
};

// Fisher-Yates shuffle algorithm for better randomization
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
    const selected = shuffled.slice(0, count).map(q => {
      // Store the correct answer value before shuffling
      const correctAnswerValue = q.options[q.correctAnswer];
      
      // Shuffle the options
      const shuffledOptions = shuffleArray([...q.options]);
      
      // Find the new index of the correct answer
      const newCorrectAnswerIndex = shuffledOptions.findIndex(option => option === correctAnswerValue);
      
      return {
        ...q,
        options: shuffledOptions,
        correctAnswer: newCorrectAnswerIndex
      };
    });

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