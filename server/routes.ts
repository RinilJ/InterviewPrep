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
import {
  generateBigFiveInsights,
  generateMBTIInsights,
  generateEQInsights,
  generateSJTInsights
} from './questions/psychometric/insights';

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

      // For students, find their teacher first with exact matching
      let teacherId = null;
      if (role === 'student') {
        // Find teacher for this batch with exact matching
        const teacher = await storage.findTeacher(cleanDepartment, cleanYear, cleanBatch);
        console.log('Found teacher for student:', teacher);

        if (!teacher) {
          return res.status(400).send("No teacher found for this batch. Please ensure a teacher is registered first.");
        }

        teacherId = teacher.id;
        console.log('Setting teacherId for student:', teacherId);
      } else if (role === 'teacher') {
        // Check if a teacher already exists for this batch
        const existingTeacher = await storage.findTeacher(cleanDepartment, cleanYear, cleanBatch);
        if (existingTeacher) {
          return res.status(400).send("A teacher for this batch already exists");
        }
      }

      // Create user with normalized data
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
          range: "10 questions"
        })),
        nonVerbal: Object.entries(questionBank.nonVerbal || {}).map(([id, topicData]) => ({
          id,
          title: topicData.title,
          range: "10 questions"
        })),
        mathematical: Object.entries(questionBank.mathematical || {}).map(([id, topicData]) => ({
          id,
          title: topicData.title,
          range: "10 questions"
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

    try {
        const { testId, answers, type, testData } = req.body;
        console.log('Processing test results:', { type, answers, testId });

        // For psychometric tests, generate insights
        if (type && ['big-five', 'mbti', 'eq', 'sjt'].includes(type)) {
            let insights;

            // For MBTI, generate personality insights
            if (type === 'mbti') {
                if (!Array.isArray(answers) || answers.length === 0) {
                    return res.status(400).send("Invalid answers format for MBTI test");
                }

                try {
                    insights = generateMBTIInsights(answers);
                    console.log('Generated MBTI insights:', insights);
                } catch (error) {
                    console.error('Error generating MBTI insights:', error);
                    return res.status(500).send("Failed to generate MBTI insights");
                }
            } else {
                switch (type) {
                    case 'big-five':
                        insights = generateBigFiveInsights(answers);
                        break;
                    case 'eq':
                        insights = generateEQInsights(answers);
                        break;
                    case 'sjt':
                        insights = generateSJTInsights(answers);
                        break;
                }
            }

            // Store the test result with insights
            const result = await storage.createTestResult({
                userId: req.user.id,
                testId: testId || `${type}-assessment`,
                score: -1, // Use -1 to indicate this is a psychometric test
                answers: JSON.stringify(answers),
                insights: JSON.stringify(insights),
                type
            });

            // Return both the result and insights
            return res.status(201).json({
                ...result,
                insights,
                type
            });
        }

        // For technical and aptitude tests, calculate score normally
        const result = await storage.createTestResult({
            userId: req.user.id,
            testId,
            score: testData.score,
            answers: JSON.stringify(answers),
            type: 'technical' // Add type for filtering
        });

        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating test result:', error);
        res.status(500).send(`Failed to save test results: ${error.message}`);
    }
});

// Add endpoint to get student averages (excluding psychometric tests)
app.get("/api/student/average-score", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
        const results = await storage.getTestResults(req.user.id);

        // Filter out psychometric tests (score = -1) and calculate average
        const scoredTests = results.filter(test => test.score >= 0);

        if (scoredTests.length === 0) {
            return res.json({ average: 0, totalTests: 0 });
        }

        const average = scoredTests.reduce((sum, test) => sum + test.score, 0) / scoredTests.length;

        res.json({
            average: Math.round(average),
            totalTests: scoredTests.length
        });
    } catch (error) {
        console.error('Error calculating average score:', error);
        res.status(500).send("Failed to calculate average score");
    }
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
      // Get students that match the teacher's department, year, and batch
      const students = await storage.getTeacherStudents(
        req.user.id,
        req.user.department,
        req.user.year,
        req.user.batch
      );

      // Return only students that match the teacher's department, year, and batch
      const filteredStudents = students.filter(student =>
        student.department === req.user.department &&
        student.year === req.user.year &&
        student.batch === req.user.batch
      );

      // Add test progress data for each student
      const studentsWithProgress = await Promise.all(
        filteredStudents.map(async (student) => {
          try {
            const testResults = await storage.getTestResults(student.id);
            
            // Calculate tests completed
            const testsCompleted = testResults.length;
            
            // Calculate average score (exclude psychometric tests with score -1)
            const scoredTests = testResults.filter(test => test.score >= 0);
            const averageScore = scoredTests.length > 0
              ? Math.round(scoredTests.reduce((sum, test) => sum + test.score, 0) / scoredTests.length)
              : 0;
            
            return {
              ...student,
              testsCompleted,
              averageScore
            };
          } catch (error) {
            console.error(`Error getting test results for student ${student.id}:`, error);
            return {
              ...student,
              testsCompleted: 0,
              averageScore: 0
            };
          }
        })
      );

      res.json(studentsWithProgress);
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

  // Add this new endpoint after other teacher endpoints
  app.get("/api/teacher/student/:id/test-history", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }

    try {
      const studentId = parseInt(req.params.id);
      const student = await storage.getUser(studentId);

      // Verify student belongs to this teacher
      if (!student || student.teacherId !== req.user.id) {
        return res.status(403).send("Unauthorized to view this student's history");
      }

      const testResults = await storage.getTestResults(studentId);

      // Format results to include test type and date
      const formattedResults = testResults.map(result => {
        // Check for aptitude test patterns
        if (result.testId && /^[LNQ]\d+/.test(result.testId)) {
          const category = result.testId[0] === 'L' ? 'Verbal' :
                            result.testId[0] === 'N' ? 'Non-Verbal' :
                            'Quantitative';
          return {
            ...result,
            type: 'aptitude',
            date: result.completedAt,
            testName: `${category} Aptitude (${result.testId})`
          };
        }

        // For MBTI and other tests
        return {
          ...result,
          type: result.type || 'practice',
          date: result.completedAt,
          testName: result.testId || 'General Practice Test'
        };
      });

      res.json(formattedResults);
    } catch (error) {
      console.error('Error fetching student test history:', error);
      res.status(500).send("Failed to fetch test history");
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
      // Extract mentorId from request body, default to the teacher's ID if not specified
      const { mentorId: requestedMentorId, ...slotData } = req.body;
      const mentorId = requestedMentorId || req.user.id;

      const slot = await storage.createDiscussionSlot({
        ...slotData,
        mentorId,
        department: req.user.department,
        year: req.user.year,
        batch: req.user.batch,
        status: "pending",
        createdBy: req.user.id
      });

      // Handle mentor assignments and notifications
      if (mentorId !== req.user.id) {
        const mentor = await storage.getUser(mentorId);
        if (mentor) {
          // Create notification for the mentor
          await storage.createNotification({
            userId: mentorId,
            type: "mentor_assignment",
            message: `You have been assigned as a mentor for a group discussion on "${slot.topic}" scheduled for ${new Date(slot.startTime).toLocaleString()}`,
            relatedId: slot.id,
            isRead: false,
            date: new Date()
          });
          
          // Create a mentor response record in pending state
          await storage.createMentorResponse({
            slotId: slot.id,
            mentorId,
            status: "pending",
            reason: null,
            alternativeMentorId: null
          });
        }
      } else {
        // If the creator is also the mentor, automatically accept the slot
        await storage.createMentorResponse({
          slotId: slot.id,
          mentorId,
          status: "accepted",
          reason: null,
          alternativeMentorId: null
        });
        
        // Update the slot status to confirmed
        await storage.updateDiscussionSlot(slot.id, {
          ...slot,
          status: "confirmed"
        });
      }
      
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

  // Get a single discussion slot
  app.get("/api/discussion-slots/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const slot = await storage.getDiscussionSlot(parseInt(req.params.id));
      if (!slot) {
        return res.status(404).send("Discussion slot not found");
      }
      res.json(slot);
    } catch (error) {
      console.error('Error fetching discussion slot:', error);
      res.status(500).send("Failed to fetch discussion slot");
    }
  });

  // Update a discussion slot
  app.put("/api/discussion-slots/:id", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }

    try {
      const slotId = parseInt(req.params.id);
      const slot = await storage.getDiscussionSlot(slotId);

      if (!slot) {
        return res.status(404).send("Discussion slot not found");
      }

      // Check if the teacher owns this slot
      if (slot.mentorId !== req.user.id) {
        return res.status(403).send("You can only edit your own discussion slots");
      }

      const updatedSlot = await storage.updateDiscussionSlot(slotId, {
        ...req.body,
        mentorId: req.user.id,
        department: req.user.department,
        year: req.user.year,
        batch: req.user.batch
      });

      res.json(updatedSlot);
    } catch (error) {
      console.error('Error updating discussion slot:', error);
      res.status(500).send("Failed to update discussion slot");
    }
  });

  // Delete a discussion slot
  app.delete("/api/discussion-slots/:id", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }

    try {
      const slotId = parseInt(req.params.id);
      const slot = await storage.getDiscussionSlot(slotId);

      if (!slot) {
        return res.status(404).send("Discussion slot not found");
      }

      // Check if the teacher owns this slot
      if (slot.mentorId !== req.user.id) {
        return res.status(403).send("You can only cancel your own discussion slots");
      }

      await storage.deleteDiscussionSlot(slotId);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error deleting discussion slot:', error);
      res.status(500).send("Failed to delete discussion slot");
    }
  });

  app.post("/api/slot-bookings", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "student") {
      return res.sendStatus(401);
    }

    try {
      const { slotId } = req.body;
      if (!slotId) {
        return res.status(400).send("Slot ID is required");
      }

      // Get the slot details first
      const slot = await storage.getDiscussionSlot(slotId);
      if (!slot) {
        return res.status(404).send("Discussion slot not found");
      }

      // Check if slot is already full
      const bookings = await storage.getSlotBookings(slotId);
      if (bookings.length >= slot.maxParticipants) {
        return res.status(400).send("This slot is already full");
      }

      // Check if student already booked this slot
      const existingBooking = bookings.find(b => b.userId === req.user.id);
      if (existingBooking) {
        return res.status(400).send("You have already booked this slot");
      }

      // Get student details for notification
      const student = await storage.getUser(req.user.id);
      if (!student) {
        return res.status(404).send("Student not found");
      }

      // Create the booking
      const booking = await storage.createSlotBooking({
        slotId,
        userId: req.user.id
      });

      // Create notification for the mentor
      const notification = await storage.createNotification({
        userId: slot.mentorId,
        type: 'booking',
        message: `${student.username} has booked your discussion slot "${slot.topic}" on ${new Date(slot.startTime).toLocaleString()}`,
        relatedId: slotId,
        isRead: false,
        date: new Date()
      });

      res.status(201).json(booking);
    } catch (error) {
      console.error('Error booking slot:', error);
      res.status(500).send("Failed to book slot");
    }
  });

  // Mentor response endpoints
  app.get("/api/mentor-responses/pending", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }

    try {
      const mentorId = req.user.id;
      
      // Get all slots where this teacher is assigned as mentor
      const slots = await storage.getDiscussionSlots(
        req.user.department,
        req.user.year,
        req.user.batch
      );
      
      const pendingSlots = [];
      
      for (const slot of slots) {
        if (slot.mentorId === mentorId) {
          // Get the mentor response for this slot
          const response = await storage.getMentorResponse(slot.id);
          
          // Include slots with pending response status
          if (response && response.status === "pending") {
            pendingSlots.push({
              slot,
              response
            });
          }
        }
      }
      
      res.json(pendingSlots);
    } catch (error) {
      console.error('Error fetching pending mentor responses:', error);
      res.status(500).send("Failed to fetch pending responses");
    }
  });

  // Respond to mentor assignment
  app.post("/api/mentor-responses/:slotId", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }
    
    try {
      const slotId = parseInt(req.params.slotId);
      const { status, reason, alternativeMentorId } = req.body;
      
      if (!status || !["accepted", "declined", "tentative"].includes(status)) {
        return res.status(400).send("Invalid status. Must be accepted, declined, or tentative");
      }
      
      // Get the slot and make sure it exists
      const slot = await storage.getDiscussionSlot(slotId);
      if (!slot) {
        return res.status(404).send("Discussion slot not found");
      }
      
      // Make sure this teacher is the assigned mentor
      if (slot.mentorId !== req.user.id) {
        return res.status(403).send("You are not the assigned mentor for this slot");
      }
      
      // Get existing response or create a new one
      let response = await storage.getMentorResponse(slotId);
      
      if (response) {
        // Update existing response
        response = await storage.updateMentorResponse(response.id, {
          status,
          reason: reason || null,
          alternativeMentorId: alternativeMentorId || null
        });
      } else {
        // Create new response
        response = await storage.createMentorResponse({
          slotId,
          mentorId: req.user.id,
          status,
          reason: reason || null,
          alternativeMentorId: alternativeMentorId || null
        });
      }
      
      // If mentor declined, notify the teacher who created the slot
      if (status === "declined" && slot.createdBy && slot.createdBy !== req.user.id) {
        await storage.createNotification({
          userId: slot.createdBy,
          type: "mentor_response",
          message: `${req.user.username} has declined to mentor the discussion on "${slot.topic}" scheduled for ${new Date(slot.startTime).toLocaleString()}${reason ? `. Reason: ${reason}` : ''}`,
          relatedId: slotId,
          isRead: false,
          date: new Date()
        });
      }
      
      res.json(response);
    } catch (error) {
      console.error('Error responding to mentor assignment:', error);
      res.status(500).send("Failed to save response");
    }
  });

  // Get notifications for the current user
  app.get("/api/notifications", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    
    try {
      const notifications = await storage.getNotifications(req.user.id);
      res.json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).send("Failed to fetch notifications");
    }
  });
  
  // Mark a notification as read
  app.put("/api/notifications/:id/read", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    
    try {
      const notificationId = parseInt(req.params.id);
      const updatedNotification = await storage.markNotificationAsRead(notificationId);
      res.json(updatedNotification);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).send("Failed to update notification");
    }
  });
  
  // Delete a notification
  app.delete("/api/notifications/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    
    try {
      const notificationId = parseInt(req.params.id);
      await storage.deleteNotification(notificationId);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error deleting notification:', error);
      res.status(500).send("Failed to delete notification");
    }
  });
  
  // Mentor availability endpoints
  app.post("/api/mentor-availability", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }
    
    try {
      const { dayOfWeek, startTime, endTime, recurring, specificDate } = req.body;
      
      if (dayOfWeek === undefined || !startTime || !endTime) {
        return res.status(400).send("Missing required fields");
      }
      
      const availability = await storage.setMentorAvailability({
        mentorId: req.user.id,
        dayOfWeek,
        startTime,
        endTime,
        recurring: recurring !== false, // Default to true if not specified
        specificDate: specificDate ? new Date(specificDate) : null
      });
      
      res.status(201).json(availability);
    } catch (error) {
      console.error('Error setting mentor availability:', error);
      res.status(500).send("Failed to set availability");
    }
  });
  
  // Get mentor availability
  app.get("/api/mentor-availability", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }
    
    try {
      const availability = await storage.getMentorAvailability(req.user.id);
      res.json(availability);
    } catch (error) {
      console.error('Error fetching mentor availability:', error);
      res.status(500).send("Failed to fetch availability");
    }
  });
  
  // Get other teachers' availability
  app.get("/api/teachers/availability", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }
    
    try {
      // Find all teachers in the same department as the current teacher
      const teachersQuery = await storage.getTeachersInDepartment(
        req.user.department,
        req.user.id // exclude current teacher
      );
      
      // Get availability for each teacher
      const teachersWithAvailability = await Promise.all(
        teachersQuery.map(async (teacher) => {
          const availability = await storage.getMentorAvailability(teacher.id);
          return {
            id: teacher.id,
            name: teacher.username,
            department: teacher.department,
            availability: availability
          };
        })
      );
      
      res.json(teachersWithAvailability);
    } catch (error) {
      console.error('Error fetching teachers availability:', error);
      res.status(500).send("Failed to fetch teachers availability");
    }
  });
  
  // Delete mentor availability
  app.delete("/api/mentor-availability/:id", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }
    
    try {
      const availabilityId = parseInt(req.params.id);
      await storage.deleteMentorAvailability(availabilityId);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error deleting mentor availability:', error);
      res.status(500).send("Failed to delete availability");
    }
  });

  // Email notification API for mentor requests
  app.post("/api/send-mentor-request", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).send("Not authenticated");
      }
      
      if (req.user.role !== "teacher") {
        return res.status(403).send("Only teachers can send mentor requests");
      }
      
      const { slotId, mentorName, mentorEmail, topic, startTime, endTime } = req.body;
      
      if (!slotId || !mentorEmail) {
        return res.status(400).send("Missing required fields");
      }
      
      // Check if SendGrid API key is available
      if (!process.env.SENDGRID_API_KEY) {
        // Create a notification for the request
        await storage.createNotification({
          userId: req.user.id,
          type: "mentor_request",
          message: `Mentor request to ${mentorName} (${mentorEmail}) for "${topic || 'Open Discussion'}" could not be emailed. Check SENDGRID_API_KEY setup.`,
          isRead: false,
          relatedId: slotId,
          date: new Date()
        });
        
        return res.status(200).send("Mentor request created but email not sent (SENDGRID_API_KEY not configured)");
      }
      
      // Import email service
      const { sendMentorRequestEmail, generateMentorResponseLinks } = await import('./emailService');
      
      // Generate tokens for accept/reject links (in a real app, these would be securely stored)
      // For simplicity, we're using a basic approach here
      const acceptToken = Buffer.from(`accept-${slotId}-${Date.now()}`).toString('base64');
      const rejectToken = Buffer.from(`reject-${slotId}-${Date.now()}`).toString('base64');
      
      // Generate the accept/reject URLs
      const baseUrl = req.protocol + '://' + req.get('host');
      const responseLinks = generateMentorResponseLinks(slotId, acceptToken, rejectToken, baseUrl);
      
      // Send the email
      const emailSent = await sendMentorRequestEmail(
        mentorEmail,
        mentorName,
        {
          id: slotId,
          topic: topic || 'Open Discussion',
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          department: req.user.department,
          year: req.user.year,
          batch: req.user.batch
        },
        responseLinks,
        req.user.username // Teacher name
      );
      
      // Create a notification for the request
      await storage.createNotification({
        userId: req.user.id,
        type: "mentor_request",
        message: `Mentor request ${emailSent ? 'sent' : 'failed to send'} to ${mentorName} (${mentorEmail}) for "${topic || 'Open Discussion'}"`,
        isRead: false,
        relatedId: slotId,
        date: new Date()
      });
      
      // Create a mentor response entry
      await storage.createMentorResponse({
        slotId,
        mentorId: req.user.id, // In a real system, would link to mentor account if registered
        status: "pending",
        responseDate: new Date()
      });
      
      res.status(200).send(`Mentor request ${emailSent ? 'sent successfully' : 'created but email failed to send'}`);
    } catch (error) {
      console.error("Send mentor request error:", error);
      res.status(500).send("Failed to send mentor request");
    }
  });
  
  // Routes for mentor to accept/reject via email links
  app.get("/api/mentor-response/:slotId/accept", async (req, res) => {
    try {
      const slotId = parseInt(req.params.slotId);
      const token = req.query.token as string;
      
      if (!token) {
        return res.status(400).send("Invalid or missing token");
      }
      
      // In a real app, validate the token here
      
      const slot = await storage.getDiscussionSlot(slotId);
      if (!slot) {
        return res.status(404).send("Discussion slot not found");
      }
      
      // Update slot status
      await storage.updateDiscussionSlot(slotId, {
        ...slot,
        status: "confirmed"
      });
      
      // Get mentor response
      const mentorResponse = await storage.getMentorResponse(slotId);
      if (mentorResponse) {
        // Update mentor response
        await storage.updateMentorResponse(mentorResponse.id, {
          status: "accepted",
          responseDate: new Date()
        });
      }
      
      // Create notification for teacher
      await storage.createNotification({
        userId: slot.createdBy,
        type: "mentor_response",
        message: `${slot.mentorName || 'Mentor'} has accepted your request for the discussion "${slot.topic || 'Open Discussion'}"`,
        isRead: false,
        relatedId: slotId,
        date: new Date()
      });
      
      // Redirect to a thank you page or render a simple thank you message
      res.send(`
        <html>
          <head>
            <title>Mentor Request Accepted</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; text-align: center; }
              .container { max-width: 600px; margin: 50px auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
              h1 { color: #4CAF50; }
              p { line-height: 1.6; }
              .success-icon { font-size: 48px; color: #4CAF50; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="success-icon">✓</div>
              <h1>Thank You!</h1>
              <p>You have successfully accepted the mentor request for the discussion on "${slot.topic || 'Open Discussion'}".</p>
              <p>The discussion is scheduled for ${new Date(slot.startTime).toLocaleString()} - ${new Date(slot.endTime).toLocaleString()}.</p>
              <p>The teacher who requested your mentorship will be notified of your acceptance.</p>
            </div>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("Error processing mentor acceptance:", error);
      res.status(500).send("An error occurred while processing your acceptance");
    }
  });
  
  app.get("/api/mentor-response/:slotId/reject", async (req, res) => {
    try {
      const slotId = parseInt(req.params.slotId);
      const token = req.query.token as string;
      const reason = req.query.reason as string || "No reason provided";
      
      if (!token) {
        return res.status(400).send("Invalid or missing token");
      }
      
      // In a real app, validate the token here
      
      const slot = await storage.getDiscussionSlot(slotId);
      if (!slot) {
        return res.status(404).send("Discussion slot not found");
      }
      
      // Update slot status
      await storage.updateDiscussionSlot(slotId, {
        ...slot,
        status: "mentor_declined"
      });
      
      // Get mentor response
      const mentorResponse = await storage.getMentorResponse(slotId);
      if (mentorResponse) {
        // Update mentor response
        await storage.updateMentorResponse(mentorResponse.id, {
          status: "declined",
          reason,
          responseDate: new Date()
        });
      }
      
      // Create notification for teacher
      await storage.createNotification({
        userId: slot.createdBy,
        type: "mentor_response",
        message: `${slot.mentorName || 'Mentor'} has declined your request for the discussion "${slot.topic || 'Open Discussion'}"${reason ? `: ${reason}` : ''}`,
        isRead: false,
        relatedId: slotId,
        date: new Date()
      });
      
      // If a reason wasn't provided, show a form to collect it
      if (!reason) {
        return res.send(`
          <html>
            <head>
              <title>Decline Mentor Request</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; text-align: center; }
                .container { max-width: 600px; margin: 50px auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                h1 { color: #f44336; }
                form { margin: 20px 0; text-align: left; }
                textarea { width: 100%; padding: 10px; margin: 10px 0; border-radius: 5px; border: 1px solid #ddd; }
                button { background-color: #f44336; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
                p { line-height: 1.6; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Decline Mentor Request</h1>
                <p>You are declining the mentor request for the discussion on "${slot.topic || 'Open Discussion'}".</p>
                <form action="/api/mentor-response/${slotId}/reject" method="get">
                  <input type="hidden" name="token" value="${token}">
                  <label for="reason">Please provide a reason for declining (optional):</label>
                  <textarea name="reason" id="reason" rows="4"></textarea>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </body>
          </html>
        `);
      }
      
      // Redirect to a thank you page or render a simple thank you message
      res.send(`
        <html>
          <head>
            <title>Mentor Request Declined</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; text-align: center; }
              .container { max-width: 600px; margin: 50px auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
              h1 { color: #f44336; }
              p { line-height: 1.6; }
              .decline-icon { font-size: 48px; color: #f44336; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="decline-icon">✗</div>
              <h1>Request Declined</h1>
              <p>You have declined the mentor request for the discussion on "${slot.topic || 'Open Discussion'}".</p>
              <p>The teacher who requested your mentorship will be notified of your decision.</p>
              ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
            </div>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("Error processing mentor rejection:", error);
      res.status(500).send("An error occurred while processing your rejection");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}