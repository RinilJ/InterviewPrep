import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

// Fallback questions when OpenAI API fails
const fallbackQuestions = {
  aptitude: [
    {
      question: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
      options: ["24", "32", "28", "30"],
      correctAnswer: 1,
      explanation: "The sequence multiplies each number by 2"
    },
    {
      question: "If a train travels 300 km in 4 hours, what is its average speed?",
      options: ["65 km/h", "75 km/h", "80 km/h", "85 km/h"],
      correctAnswer: 1,
      explanation: "Speed = Distance/Time = 300/4 = 75 km/h"
    }
  ],
  technical: [
    {
      question: "What is the time complexity of QuickSort in the average case?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      explanation: "QuickSort has an average time complexity of O(n log n)"
    },
    {
      question: "Which principle states that a class should have only one reason to change?",
      options: ["DRY", "KISS", "Single Responsibility", "Open/Closed"],
      correctAnswer: 2,
      explanation: "The Single Responsibility Principle (SRP) states that a class should have only one reason to change"
    }
  ],
  psychometric: [
    {
      question: "How do you typically handle tight deadlines?",
      options: [
        "Work overtime to complete everything",
        "Prioritize tasks and communicate with stakeholders",
        "Delegate all tasks to others",
        "Ignore less important tasks"
      ],
      correctAnswer: 1,
      explanation: "Effective deadline management involves prioritization and communication"
    },
    {
      question: "When working in a team, what's your preferred role?",
      options: [
        "Always the leader",
        "Supportive team member",
        "Independent contributor",
        "Flexible based on team needs"
      ],
      correctAnswer: 3,
      explanation: "Adaptability in team roles shows good collaboration skills"
    }
  ]
};

const PROMPTS = {
  aptitude: (topic: string) => `Generate an aptitude question for ${topic}. 
    The response should be in JSON format with the following structure:
    {
      "question": "the question text",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": 0-based index of correct option,
      "explanation": "explanation of the answer"
    }`,

  technical: (topic: string) => `Generate a technical programming question for ${topic}.
    For coding problems, include sample input/output.
    The response should be in JSON format with the following structure:
    {
      "question": "the question text with any necessary code snippets",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": 0-based index of correct option,
      "explanation": "detailed explanation with solution approach"
    }`,

  psychometric: (topic: string) => `Generate a psychometric test question for ${topic}.
    The question should assess personality traits or behavioral tendencies.
    The response should be in JSON format with the following structure:
    {
      "question": "the scenario or question",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": 0-based index of best option,
      "explanation": "explanation of what this choice indicates"
    }`
};

export async function generateQuestions(
  category: 'aptitude' | 'technical' | 'psychometric',
  topic: string,
  count: number = 5
): Promise<GeneratedQuestion[]> {
  try {
    const prompt = PROMPTS[category](topic);
    const questions: GeneratedQuestion[] = [];

    for (let i = 0; i < count; i++) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a professional question generator for aptitude, technical, and psychometric tests."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
        });

        const response = completion.choices[0]?.message?.content;
        if (response) {
          try {
            const questionData = JSON.parse(response);
            questions.push(questionData);
          } catch (error) {
            console.error('Failed to parse OpenAI response:', error);
            // Use a fallback question if parsing fails
            if (fallbackQuestions[category] && fallbackQuestions[category].length > 0) {
              questions.push(fallbackQuestions[category][i % fallbackQuestions[category].length]);
            }
          }
        }
      } catch (error) {
        console.error('OpenAI API error for single question:', error);
        // Use a fallback question if API call fails
        if (fallbackQuestions[category] && fallbackQuestions[category].length > 0) {
          questions.push(fallbackQuestions[category][i % fallbackQuestions[category].length]);
        }
      }
    }

    // If no questions were generated, use fallback questions
    if (questions.length === 0) {
      return fallbackQuestions[category] || [];
    }

    return questions;
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Return fallback questions if available, otherwise throw error
    if (fallbackQuestions[category]) {
      return fallbackQuestions[category];
    }
    throw new Error('Failed to generate questions');
  }
}