import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertTestSchema, insertTestResultSchema, insertDiscussionSlotSchema, insertSlotBookingSchema } from "@shared/schema";
import { z } from "zod";

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
  practiceTests: [
    { id: "T01", title: "Section Tests", subtests: [
      { id: "T01.1", title: "Section Test 1", range: "4.03 - 4.04" },
      { id: "T01.2", title: "Section Test 2", range: "4.05 - 4.06" },
      { id: "T01.3", title: "Section Test 3", range: "4.07 - 4.08" },
      { id: "T01.4", title: "Section Test 4", range: "4.09 - 4.10" }
    ]},
    { id: "T02", title: "Model Tests", subtests: [
      { id: "T02.1", title: "Model Test 1", range: "4.11 - 4.12" },
      { id: "T02.2", title: "Model Test 2", range: "4.13 - 4.15" },
      { id: "T02.3", title: "Model Test 3", range: "4.15 - 4.17" },
      { id: "T02.4", title: "Model Test 4", range: "4.17 - 4.19" }
    ]}
  ]
};

export function registerRoutes(app: Express): Server {
  setupAuth(app);

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

  app.get("/api/discussion-slots", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const slots = await storage.getDiscussionSlots();

    // Fetch mentor info for each slot
    const slotsWithMentors = await Promise.all(
      slots.map(async (slot) => {
        const mentor = slot.mentorId ? await storage.getUser(slot.mentorId) : undefined;
        return {
          ...slot,
          mentor: mentor ? { username: mentor.username } : undefined,
        };
      })
    );

    res.json(slotsWithMentors);
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