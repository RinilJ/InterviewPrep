import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import {
  getBigFiveQuestions,
  getMBTIQuestions,
  getRavensQuestions,
  getSJTQuestions,
  getEQQuestions
} from './questions/psychometric';
import { insertTestSchema, insertTestResultSchema } from "@shared/schema";
import { getUniqueQuestionsForUser, questionBank } from "./questionBank";
import { getArrayQuestionsJava, getArrayQuestionsPython } from './questions/technical/dsa';
import { getOOPQuestionsJava, getOOPQuestionsPython } from './questions/technical/oop';
import { getDebuggingQuestionsJava, getDebuggingQuestionsPython } from './questions/technical/debugging';

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  app.post("/api/register", async (req, res, next) => {
    try {
      const { role, department, year, batch, ...userData } = req.body;
      console.log('Registration attempt:', { role, department, year, batch, ...userData });

      // Validate required fields
      if (!department || !year || !batch) {
        return res.status(400).send("Department, year, and batch are required");
      }

      // Enforce specific values and normalize
      const cleanDepartment = String(department).trim().toUpperCase();
      if (!['CS', 'IT', 'MCA'].includes(cleanDepartment)) {
        return res.status(400).send("Department must be CS, IT, or MCA");
      }

      const cleanYear = String(year).trim();
      if (!['1', '2', '3', '4'].includes(cleanYear)) {
        return res.status(400).send("Year must be 1, 2, 3, or 4");
      }

      const cleanBatch = String(batch).trim().toUpperCase();
      if (!['A', 'B', 'C'].includes(cleanBatch)) {
        return res.status(400).send("Batch must be A, B, or C");
      }

      console.log('Normalized registration data:', { cleanDepartment, cleanYear, cleanBatch });

      // For students, find their teacher first
      let teacherId = null;
      if (role === 'student') {
        console.log('Looking for teacher with credentials:', { cleanDepartment, cleanYear, cleanBatch });
        const classTeacher = await storage.findTeacher(cleanDepartment, cleanYear, cleanBatch);
        console.log('Found teacher for student:', classTeacher);

        if (!classTeacher) {
          console.log('No teacher found for:', { cleanDepartment, cleanYear, cleanBatch });
          return res.status(400).send("No teacher found for this batch. Please ensure a teacher is registered first.");
        }
        teacherId = classTeacher.id;
        console.log('Setting teacherId for student:', teacherId);
      } else if (role === 'teacher') {
        // Check if a teacher already exists for this batch
        const existingTeacher = await storage.findTeacher(cleanDepartment, cleanYear, cleanBatch);
        console.log('Existing teacher check:', existingTeacher);
        if (existingTeacher) {
          return res.status(400).send("Class teacher for this batch already exists");
        }
      }

      // Create the user with normalized data
      const user = await storage.createUser({
        ...userData,
        role,
        department: cleanDepartment,
        year: cleanYear,
        batch: cleanBatch,
        teacherId
      });

      console.log('Created user:', {
        id: user.id,
        username: user.username,
        role: user.role,
        department: user.department,
        year: user.year,
        batch: user.batch,
        teacherId: user.teacherId
      });

      // Log in the new user
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).send("Failed to register user");
    }
  });

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

      // Create a shuffle function for random selection
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      // Get unique random questions
      const shuffledQuestions = shuffleArray([...questions]);
      const selectedQuestions = shuffledQuestions.slice(0, numQuestions);

      // Remove any duplicate questions if they exist
      const uniqueQuestions = Array.from(new Set(selectedQuestions.map(q => q.question)))
        .map(question => selectedQuestions.find(q => q.question === question))
        .slice(0, numQuestions);

      res.json({
        title: `${category.toUpperCase()} Test (${language})`,
        questions: uniqueQuestions,
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

  // Add endpoint to get teacher's students
  app.get("/api/teacher/students", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }

    try {
      const students = await storage.getTeacherStudents(
        req.user.id,
        req.user.department,
        req.user.year,
        req.user.batch
      );
      res.json(students);
    } catch (error) {
      console.error('Error fetching teacher students:', error);
      res.status(500).send("Failed to fetch students");
    }
  });


  // Update the teacher stats endpoint to use real data
  app.get("/api/teacher/stats", async (req, res) => {
      if (!req.isAuthenticated() || req.user.role !== "teacher") {
          return res.sendStatus(401);
      }

      try {
          // Get students for this teacher's batch
          const students = await storage.getTeacherStudents(
              req.user.id,
              req.user.department,
              req.user.year,
              req.user.batch
          );

          // Get discussion slots for this batch
          const slots = await storage.getDiscussionSlots(
              req.user.department,
              req.user.year,
              req.user.batch
          );

          // Calculate active sessions (slots happening today)
          const today = new Date();
          const activeSessions = slots.filter(slot => {
              const slotDate = new Date(slot.startTime);
              return slotDate.toDateString() === today.toDateString();
          }).length;

          res.json({
              totalStudents: students.length,
              activeSessions,
              discussionSlots: slots.length
          });
      } catch (error) {
          console.error('Error fetching teacher stats:', error);
          res.status(500).send("Failed to fetch teacher statistics");
      }
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

  // Add route for psychometric tests
  app.get("/api/psychometric-test", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const testType = req.query.type as string;
    if (!testType) return res.status(400).send("Test type is required");

    try {
      let questions;
      let title;

      switch(testType) {
        case 'big-five':
          questions = await getBigFiveQuestions();
          title = "Big Five Personality Test";
          break;
        case 'mbti':
          questions = await getMBTIQuestions();
          title = "Myers-Briggs Type Indicator";
          break;
        case 'ravens':
          questions = await getRavensQuestions();
          title = "Raven's Progressive Matrices";
          break;
        case 'sjt':
          questions = await getSJTQuestions();
          title = "Situational Judgment Test";
          break;
        case 'eq':
          questions = await getEQQuestions();
          title = "Emotional Intelligence Test";
          break;
        default:
          return res.status(400).send("Invalid test type");
      }

      // Ensure we have questions
      if (!questions || questions.length === 0) {
        return res.status(404).send("No questions available for this test type");
      }

      // Return 10 random questions
      const randomQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 10);

      res.json({
        title,
        questions: randomQuestions,
        timeLimit: 30 * 60, // 30 minutes for psychometric tests
        type: testType
      });
    } catch (error) {
      console.error('Error generating psychometric test:', error);
      res.status(500).send("Failed to generate test questions");
    }
  });

  // Modified discussion slots endpoint
  app.post("/api/discussion-slots", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }

    try {
      const slot = await storage.createDiscussionSlot({
        ...req.body,
        mentorId: req.user.id,
        department: req.user.department,
        year: req.user.year,
        batch: req.user.batch
      });
      res.status(201).json(slot);
    } catch (error) {
      console.error('Error creating discussion slot:', error);
      res.status(500).send("Failed to create discussion slot");
    }
  });

  // Get discussion slots for students
  app.get("/api/discussion-slots", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const slots = await storage.getDiscussionSlots(
        req.user.department,
        req.user.year,
        req.user.batch
      );
      res.json(slots);
    } catch (error) {
      console.error('Error fetching discussion slots:', error);
      res.status(500).send("Failed to fetch discussion slots");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}