import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertTestSchema, insertTestResultSchema, insertDiscussionSlotSchema, insertSlotBookingSchema } from "@shared/schema";
import { z } from "zod";

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

// Sample teacher statistics
const teacherStats = {
  totalStudents: 45,
  activeSessions: 3,
  totalSlots: sampleDiscussionSlots.length
};

// Sample student progress data
const studentProgress = [
  {
    id: 1,
    username: "john_doe",
    lastActive: new Date("2025-02-13T08:30:00"),
    testsCompleted: 15,
    averageScore: 85
  },
  {
    id: 2,
    username: "jane_smith",
    lastActive: new Date("2025-02-13T09:45:00"),
    testsCompleted: 12,
    averageScore: 78
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
    { id: "T01", title: "Data Structures", range: "5.01 - 5.15" },
    { id: "T02", title: "Algorithms", range: "5.16 - 5.30" },
    { id: "T03", title: "Database Management", range: "5.31 - 5.45" },
    { id: "T04", title: "Operating Systems", range: "5.46 - 5.60" },
    { id: "T05", title: "Computer Networks", range: "5.61 - 5.75" },
    { id: "T06", title: "Object-Oriented Programming", range: "5.76 - 5.90" },
    { id: "T07", title: "Web Technologies", range: "5.91 - 6.05" },
    { id: "T08", title: "Software Engineering", range: "6.06 - 6.20" },
    { id: "T09", title: "Cloud Computing", range: "6.21 - 6.35" },
    { id: "T10", title: "Cybersecurity", range: "6.36 - 6.50" }
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

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Teacher-specific routes
  app.get("/api/teacher/stats", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }
    res.json(teacherStats);
  });

  app.get("/api/teacher/students", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }
    res.json(studentProgress);
  });

  // Get aptitude topics
  app.get("/api/aptitude-topics", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(aptitudeTopics);
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

  // Discussion Slots
  app.get("/api/discussion-slots", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(sampleDiscussionSlots);
  });

  app.post("/api/discussion-slots", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher") {
      return res.sendStatus(401);
    }

    const parsed = insertDiscussionSlotSchema.parse(req.body);
    const slot = await storage.createDiscussionSlot({
      ...parsed,
      mentorId: req.user.id,
      maxParticipants: parsed.maxParticipants || 10
    });
    res.status(201).json(slot);
  });

  // Slot Bookings
  app.post("/api/slot-bookings", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "student") {
      return res.sendStatus(401);
    }

    const parsed = insertSlotBookingSchema.parse(req.body);
    const booking = await storage.createSlotBooking({
      ...parsed,
      userId: req.user.id,
      bookedAt: new Date()
    });
    res.status(201).json(booking);
  });

  const httpServer = createServer(app);
  return httpServer;
}