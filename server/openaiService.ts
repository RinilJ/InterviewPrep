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
        }
      }
    }

    return questions;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate questions');
  }
}