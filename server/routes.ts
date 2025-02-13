import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertTestSchema, insertTestResultSchema, insertDiscussionSlotSchema, insertSlotBookingSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

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
      userId: req.user.id
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
      mentorId: req.user.id
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
      userId: req.user.id
    });
    res.status(201).json(booking);
  });

  const httpServer = createServer(app);
  return httpServer;
}
