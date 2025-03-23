// Types for Question Bank
export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  code?: string;
}

export interface TopicModule {
  title: string;
  getQuestions: () => Promise<Question[]>;
}

export interface QuestionBank {
  verbal: {
    [key: string]: TopicModule;
  };
  nonVerbal: {
    [key: string]: TopicModule;
  };
  mathematical: {
    [key: string]: TopicModule;
  };
}

// Technical Question Types
export interface TechnicalQuestion extends Question {
  code?: string;
  language: 'java' | 'python';
  category: 'dsa' | 'oop' | 'debugging';
  difficulty: 'easy' | 'medium' | 'hard';
  sampleInput?: string;
  sampleOutput?: string;
  testCases?: string[];
}

export interface TechnicalTopicModule extends TopicModule {
  language: 'java' | 'python';
  getQuestions: () => Promise<TechnicalQuestion[]>;
}

export interface TechnicalQuestionBank {
  dsa: {
    [key: string]: TechnicalTopicModule;
  };
  oop: {
    [key: string]: TechnicalTopicModule;
  };
  debugging: {
    [key: string]: TechnicalTopicModule;
  };
}