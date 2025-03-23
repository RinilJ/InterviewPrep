import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertTestSchema, insertTestResultSchema } from "@shared/schema";
import { getUniqueQuestionsForUser, questionBank } from "./questionBank";
import { getArrayQuestionsJava, getArrayQuestionsPython } from './questions/technical/dsa';
import { getOOPQuestionsJava, getOOPQuestionsPython } from './questions/technical/oop';
import { getDebuggingQuestionsJava, getDebuggingQuestionsPython } from './questions/technical/debugging';

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Get aptitude topics
  app.get("/api/aptitude-topics", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const topics = {
        verbal: Object.entries(questionBank.verbal).map(([id, topicData]) => ({
          id,
          title: topicData.title,
          range: "Dynamic questions"
        })),
        nonVerbal: Object.entries(questionBank.nonVerbal || {}).map(([id, topicData]) => ({
          id,
          title: topicData.title,
          range: "Dynamic questions"
        })),
        mathematical: Object.entries(questionBank.mathematical || {}).map(([id, topicData]) => ({
          id,
          title: topicData.title,
          range: "Dynamic questions"
        }))
      };

      res.json(topics);
    } catch (error) {
      console.error('Error processing question bank:', error);
      res.status(500).send('Failed to load topics');
    }
  });

  // Generate test with unique questions
  app.get("/api/generate-test", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const topicId = req.query.topicId as string;
    if (!topicId) return res.status(400).send("Topic ID is required");

    try {
      // Determine category from topic ID
      let category: string;
      if (topicId.startsWith('L')) {
        category = 'verbal';
      } else if (topicId.startsWith('N')) {
        category = 'nonVerbal';
      } else if (topicId.startsWith('Q')) {
        category = 'mathematical';
      } else {
        return res.status(400).send("Invalid topic ID");
      }

      console.time('generateTest');

      // Get unique questions for this user and topic
      const questions = await getUniqueQuestionsForUser(req.user.id, topicId);

      // Log question generation for debugging
      console.log(`Generated ${questions.length} questions for user ${req.user.id}, topic ${topicId}`);
      console.log('First question:', questions[0]?.question.substring(0, 30) + '...');
      console.timeEnd('generateTest');

      if (!questions || questions.length === 0) {
        return res.status(404).send("No questions available for this topic");
      }

      res.json({
        topicId,
        title: questionBank[category][topicId].title,
        questions: questions
      });
    } catch (error) {
      console.error('Error generating test:', error);
      res.status(500).send("Failed to generate test questions: " + error.message);
    }
  });

  // Technical test generation
  app.post("/api/technical-test/generate", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const { category, language } = req.body;
    if (!category || !language) {
      return res.status(400).send("Category and language are required");
    }

    try {
      let questions;
      const numQuestions = 10; // Number of questions per test

      // Get questions based on category and language
      switch(category) {
        case 'dsa':
          questions = language === 'java' ? 
            await getArrayQuestionsJava() : 
            await getArrayQuestionsPython();
          break;
        case 'oop':
          questions = language === 'java' ? 
            await getOOPQuestionsJava() : 
            await getOOPQuestionsPython();
          break;
        case 'debugging':
          questions = language === 'java' ? 
            await getDebuggingQuestionsJava() : 
            await getDebuggingQuestionsPython();
          break;
        default:
          return res.status(400).send("Invalid category");
      }

      // Randomly select questions
      const selectedQuestions = questions
        .sort(() => Math.random() - 0.5)
        .slice(0, numQuestions);

      res.json({
        title: `${category.toUpperCase()} Test (${language})`,
        questions: selectedQuestions,
        timeLimit: 60 * 60, // 60 minutes
        category,
        language
      });
    } catch (error) {
      console.error('Error generating technical test:', error);
      res.status(500).send("Failed to generate test questions");
    }
  });

  // Tests
  app.get("/api/tests", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const tests = await storage.getTests();
    res.json(tests);
  });

  app.post("/api/tests", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }

    const parsed = insertTestSchema.parse(req.body);
    const test = await storage.createTest({ ...parsed, createdBy: req.user.id });
    res.status(201).json(test);
  });

  // Test Results
  app.get("/api/test-results", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const results = await storage.getTestResults(req.user.id);
    res.json(results);
  });

  app.post("/api/test-results", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const parsed = insertTestResultSchema.parse(req.body);
    const result = await storage.createTestResult({
      ...parsed,
      userId: req.user.id,
      completedAt: new Date()
    });
    res.status(201).json(result);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  //Teacher-specific routes
  app.get("/api/teacher/stats", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }

    // Filter students based on teacher's department
    const filteredStudents = studentProgress.filter(student =>
      student.department === req.user.department
    );

    res.json(teacherStats(filteredStudents));
  });

  app.get("/api/teacher/students", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }

    // Filter students based on teacher's department
    const filteredStudents = studentProgress.filter(student =>
      student.department === req.user.department
    );

    res.json(filteredStudents);
  });


  app.post("/api/forgot-password", async (req, res) => {
    const { email } = req.body;
    const user = await storage.getUserByEmail(email);

    if (!user) {
      return res.status(404).send("No account found with this email");
    }

    // In a real application, you would:
    // 1. Generate a password reset token
    // 2. Save it to the database with an expiration
    // 3. Send an email with a reset link
    // For demo purposes, we'll just send a success response

    res.status(200).send("Password reset instructions sent");
  });

  const httpServer = createServer(app);
  return httpServer;
}

const teacherStats = (filteredStudents: any[]) => ({
  totalStudents: filteredStudents.length,
  activeSessions: 3,
  discussionSlots: sampleDiscussionSlots.length
});

const sampleDiscussionSlots = [
  {
    id: 1,
    topic: null, // Open discussion slot
    startTime: new Date("2025-02-14T10:00:00"),
    endTime: new Date("2025-02-14T11:30:00"),
    maxParticipants: 8,
    mentorId: 1,
    mentor: { username: "Dr. Sarah Johnson" }
  },
  {
    id: 2,
    topic: "Data Structures Problem Solving",
    startTime: new Date("2025-02-14T14:00:00"),
    endTime: new Date("2025-02-14T15:30:00"),
    maxParticipants: 6,
    mentorId: 2,
    mentor: { username: "Prof. Michael Chen" }
  },
  {
    id: 3,
    topic: null, // Open discussion slot
    startTime: new Date("2025-02-15T11:00:00"),
    endTime: new Date("2025-02-15T12:30:00"),
    maxParticipants: 10,
    mentorId: 3,
    mentor: { username: "Ms. Emily Brown" }
  }
];

const studentProgress = [
  {
    id: 1,
    username: "john_doe",
    department: "CS",
    batch: "A",
    year: "3",
    lastActive: new Date("2025-02-13T08:30:00"),
    testsCompleted: 15,
    averageScore: 85
  },
  {
    id: 2,
    username: "jane_smith",
    department: "CS",
    batch: "A",
    year: "3",
    lastActive: new Date("2025-02-13T09:45:00"),
    testsCompleted: 12,
    averageScore: 78
  },
  {
    id: 3,
    username: "mike_wilson",
    department: "IT",
    batch: "B",
    year: "4",
    lastActive: new Date("2025-02-13T10:15:00"),
    testsCompleted: 18,
    averageScore: 92
  }
];