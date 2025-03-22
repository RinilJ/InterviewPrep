import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertTestSchema, insertTestResultSchema } from "@shared/schema";
import { z } from "zod";
import { questionBank } from "./questionBank";

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Get aptitude topics
  app.get("/api/aptitude-topics", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(questionBank);
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

  // Generate test with questions from question bank
  app.get("/api/generate-test", (req, res) => {
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
      } else if (topicId.startsWith('T')) {
        category = 'technical';
      } else if (topicId.startsWith('P')) {
        category = 'psychometric';
      } else {
        return res.status(400).send("Invalid topic ID");
      }

      // Get questions from question bank
      const questions = questionBank[category][topicId];
      if (!questions || questions.length === 0) {
        return res.status(404).send("No questions available for this topic");
      }

      // Randomly select 10 unique questions
      const selectedQuestions = shuffleArray([...questions])
        .slice(0, 10)
        .map(q => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation
        }));

      // Get topic title
      const topicTitle = Object.values(questionBank)
        .flatMap(category => Object.entries(category))
        .find(([id]) => id === topicId)?.[1]?.[0]?.title || "Practice Test";

      res.json({
        topicId,
        title: topicTitle,
        questions: selectedQuestions
      });
    } catch (error) {
      console.error('Error generating test:', error);
      res.status(500).send("Failed to generate test questions. Please try again.");
    }
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

// Update the teacherStats to be dynamic based on filtered students
const teacherStats = (filteredStudents: any[]) => ({
  totalStudents: filteredStudents.length,
  activeSessions: 3,
  discussionSlots: sampleDiscussionSlots.length
});

// Sample discussion slots with some slots having no specific topic (open discussion)
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

// Sample student progress data
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

const aptitudeTopics = {
  verbal: [
    { id: "L01", title: "Direction Sense", range: "1.01 - 1.10" },
    { id: "L02", title: "Blood Relations", range: "1.11 - 1.20" },
    { id: "L03", title: "Coding and Decoding", range: "1.21 - 1.28" },
    { id: "L04", title: "Number Series", range: "1.29 - 1.34" },
    { id: "L05", title: "Letter (Alphabet) Series", range: "1.35 - 1.40" },
    { id: "L06", title: "Rankings and Arrangements", range: "1.41 - 1.54" },
    { id: "L07", title: "Number and Letter Analogies", range: "1.55 - 1.64" },
    { id: "L08", title: "Mixed Analogies", range: "1.65 - 1.77" },
    { id: "L09", title: "Syllogism (Deductions)", range: "1.78 - 1.82" },
    { id: "L10", title: "Odd Man Out (Classifications)", range: "1.83 - 1.91" },
    { id: "L11", title: "Data Sufficiency and Venn Diagrams", range: "1.92 - 1.98" },
    { id: "L12", title: "Calendars", range: "1.99 - 1.104" },
    { id: "L13", title: "Clocks", range: "2.01 - 2.09" }
  ],
  nonVerbal: [
    { id: "N01", title: "Logical Venn Diagrams", range: "2.10 - 2.19" },
    { id: "N02", title: "Dice and Cubes", range: "2.20 - 2.24" },
    { id: "N03", title: "Mirror and Water Images", range: "2.25 - 2.29" },
    { id: "N04", title: "Missing Number in Figures and Picture Series", range: "3.01 - 3.08" }
  ],
  mathematical: [
    { id: "Q01", title: "Percentages", range: "3.09 - 3.15" },
    { id: "Q02", title: "Profit and Loss", range: "3.16 - 3.23" },
    { id: "Q03", title: "Simple and Compound Interest", range: "3.24 - 3.31" },
    { id: "Q04", title: "Ratios and Proportions", range: "3.32 - 3.40" },
    { id: "Q05", title: "Age, Mixtures and Allegations", range: "3.41 - 3.48" },
    { id: "Q06", title: "Time and Work (+ Pipes and Cisterns)", range: "3.49 - 3.55" },
    { id: "Q07", title: "Time and Distance (+ Boats and Trains)", range: "3.56 - 3.63" },
    { id: "Q08", title: "Averages", range: "3.64 - 3.67" },
    { id: "Q09", title: "Geometry", range: "3.68 - 3.74" },
    { id: "Q10", title: "Numbers", range: "3.75 - 3.83" },
    { id: "Q11", title: "Permutations, Combinations and Probability", range: "3.84 - 3.90" },
    { id: "Q12", title: "Data Interpretation", range: "4.01 - 4.02" }
  ],
  technical: [
    {
      id: "T01",
      title: "Data Structures & Algorithms",
      range: "5.01 - 5.20",
      description: "Solving problems using arrays, linked lists, trees, graphs, sorting, searching, and dynamic programming"
    },
    {
      id: "T02",
      title: "Competitive Programming",
      range: "5.21 - 5.40",
      description: "Leetcode, Codeforces, HackerRank-style coding challenges"
    },
    {
      id: "T03",
      title: "System Design",
      range: "5.41 - 5.60",
      description: "Designing scalable and efficient systems, architecture patterns, and best practices"
    },
    {
      id: "T04",
      title: "Object-Oriented Programming",
      range: "5.61 - 5.80",
      description: "Concepts including inheritance, polymorphism, encapsulation, and abstraction"
    },
    {
      id: "T05",
      title: "Code Debugging Challenge",
      range: "5.81 - 5.99",
      description: "Debug and fix code issues in your preferred programming language"
    }
  ],
  psychometric: [
    { id: "P01", title: "Personality Assessment", range: "7.01 - 7.15" },
    { id: "P02", title: "Emotional Intelligence", range: "7.16 - 7.30" },
    { id: "P03", title: "Leadership Potential", range: "7.31 - 7.45" },
    { id: "P04", title: "Team Dynamics", range: "7.46 - 7.60" },
    { id: "P05", title: "Problem-Solving Style", range: "7.61 - 7.75" },
    { id: "P06", title: "Work Ethics", range: "7.76 - 7.90" },
    { id: "P07", title: "Stress Management", range: "7.91 - 8.05" },
    { id: "P08", title: "Communication Style", range: "8.06 - 8.20" }
  ]
};