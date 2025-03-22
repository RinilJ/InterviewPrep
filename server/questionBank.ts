import { z } from 'zod';

// Question bank structure with sample questions
export const questionBank = {
  verbal: {
    "L01": {
      title: "Direction Sense",
      questions: [
        {
          id: "L01-1",
          question: "If you are facing north and turn 90 degrees clockwise, which direction are you facing?",
          options: ["East", "West", "South", "North"],
          correctAnswer: 0,
          explanation: "When facing north, a 90-degree clockwise turn means you're facing east."
        },
        {
          id: "L01-2",
          question: "Starting from south, if you turn right twice, which direction will you face?",
          options: ["North", "South", "East", "West"],
          correctAnswer: 0,
          explanation: "From south, turning right twice (180 degrees) leads to north."
        }
      ]
    },
    "L02": {
      title: "Blood Relations",
      questions: [
        {
          id: "L02-1",
          question: "If A is B's sister and C is B's mother, how is A related to C?",
          options: ["Daughter", "Mother", "Aunt", "Grandmother"],
          correctAnswer: 0,
          explanation: "Since A is B's sister and C is B's mother, A must be C's daughter."
        }
      ]
    }
  },
  nonVerbal: {
    "N01": {
      title: "Logical Venn Diagrams",
      questions: [
        {
          id: "N01-1",
          question: "In a Venn diagram showing the relationship between 'Birds', 'Flying creatures', and 'Insects', where would a butterfly be placed?",
          options: [
            "Intersection of Flying creatures and Insects only",
            "Intersection of all three sets",
            "Birds section only",
            "Outside all sets"
          ],
          correctAnswer: 0,
          explanation: "A butterfly is both a flying creature and an insect, but not a bird."
        }
      ]
    }
  },
  mathematical: {
    "Q01": {
      title: "Percentages",
      questions: [
        {
          id: "Q01-1",
          question: "What is 15% of 200?",
          options: ["30", "25", "35", "40"],
          correctAnswer: 0,
          explanation: "15% of 200 = (15/100) × 200 = 30"
        }
      ]
    }
  }
};

// Validate question bank structure and content
export function validateQuestionBank(): boolean {
  try {
    // Check main categories exist
    if (!questionBank.verbal || !questionBank.nonVerbal || !questionBank.mathematical) {
      return false;
    }

    // Check each category has valid questions
    for (const category of Object.values(questionBank)) {
      for (const topic of Object.values(category)) {
        if (!Array.isArray(topic.questions)) {
          return false;
        }

        // Validate each question
        for (const question of topic.questions) {
          if (!question.id || !question.question || !Array.isArray(question.options) || 
              question.correctAnswer === undefined || !question.explanation) {
            return false;
          }
        }
      }
    }

    return true;
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}

// Async question generation with proper typing
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export async function getUniqueQuestionsForUser(
  userId: number,
  topicId: string,
  count: number = 10
): Promise<Question[]> {
  console.time(`generateQuestions-${userId}-${topicId}`);

  try {
    let category: 'verbal' | 'nonVerbal' | 'mathematical';
    if (topicId.startsWith('L')) category = 'verbal';
    else if (topicId.startsWith('N')) category = 'nonVerbal';
    else if (topicId.startsWith('Q')) category = 'mathematical';
    else throw new Error('Invalid topic ID');

    const topic = questionBank[category][topicId];
    if (!topic) throw new Error('Topic not found');

    const questions = topic.questions;
    if (!questions || questions.length === 0) {
      throw new Error('No questions available for this topic');
    }

    // Shuffle questions and return requested count
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    console.timeEnd(`generateQuestions-${userId}-${topicId}`);
    return selected;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}