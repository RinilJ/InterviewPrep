import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { log } from "./vite";

export function registerRoutes(app: Express): Server {
  // Setup authentication
  setupAuth(app);

  // Basic test route
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  const httpServer = createServer(app);
  return httpServer;
}