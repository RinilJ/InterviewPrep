import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { getUniqueQuestionsForUser, questionBank, validateQuestionBank } from "./questionBank";

export function registerRoutes(app: Express): Server {
  console.log('[Routes] Starting route registration...');

  // Validate question bank during startup
  if (!validateQuestionBank()) {
    console.error('[Routes] Question bank validation failed');
    process.exit(1);
  }
  console.log('[Routes] Question bank validated successfully');

  // Set up authentication routes and middleware
  setupAuth(app);
  console.log('[Routes] Auth routes registered');

  // Get aptitude topics
  app.get("/api/aptitude-topics", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const topics = {
        verbal: Object.entries(questionBank.verbal).map(([id, topicData]) => ({
          id,
          title: topicData.title,
          questionCount: topicData.questions.length
        })),
        nonVerbal: Object.entries(questionBank.nonVerbal).map(([id, topicData]) => ({
          id,
          title: topicData.title,
          questionCount: topicData.questions.length
        })),
        mathematical: Object.entries(questionBank.mathematical).map(([id, topicData]) => ({
          id,
          title: topicData.title,
          questionCount: topicData.questions.length
        }))
      };

      res.json(topics);
    } catch (error) {
      console.error('[Routes] Error processing topics:', error);
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
      let category: keyof typeof questionBank;
      if (topicId.startsWith('L')) {
        category = 'verbal';
      } else if (topicId.startsWith('N')) {
        category = 'nonVerbal';
      } else if (topicId.startsWith('Q')) {
        category = 'mathematical';
      } else {
        return res.status(400).send("Invalid topic ID");
      }

      console.log(`[Routes] Generating test for user ${req.user.id}, topic ${topicId}`);

      // Get unique questions for this user and topic
      const questions = await getUniqueQuestionsForUser(req.user.id, topicId);

      if (!questions || questions.length === 0) {
        return res.status(404).send("No questions available for this topic");
      }

      res.json({
        topicId,
        title: questionBank[category][topicId].title,
        questions: questions,
        startTime: new Date().toISOString(),
        currentQuestionIndex: 0,
        answers: new Array(questions.length).fill(null)
      });

    } catch (error) {
      console.error('[Routes] Error generating test:', error);
      res.status(500).send("Failed to generate test questions");
    }
  });

  // Simple health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  console.log('[Routes] Core routes registered');
  const httpServer = createServer(app);
  console.log('[Routes] HTTP server created');

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