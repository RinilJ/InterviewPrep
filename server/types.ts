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