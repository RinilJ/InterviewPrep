import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  console.log('[Routes] Starting route registration...');

  // Set up authentication routes and middleware
  setupAuth(app);
  console.log('[Routes] Auth routes registered');

  // Simple health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Test endpoint
  app.get("/api/test", (req, res) => {
    res.json({ message: "Server is running" });
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