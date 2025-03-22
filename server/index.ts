import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit the process, just log the error
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process, just log the error
});

const app = express();

try {
  // Basic health check route
  app.get("/ping", (req, res) => {
    res.send("pong");
  });
  log("Health check route added");

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  log("Express middleware setup complete");

  // Serve static files from the client/public directory
  app.use(express.static(path.join(__dirname, '../client/public')));
  log("Static file serving setup complete");

  // Request logging middleware
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api") || path === "/ping") {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }

        log(logLine);
      }
    });

    next();
  });
  log("Request logging middleware setup complete");

  // Start server setup
  (async () => {
    try {
      log("Starting route registration...");
      const server = registerRoutes(app);
      log("Routes registered successfully");

      // Global error handler
      app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        console.error('Global error handler caught:', err);
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        res.status(status).json({ 
          message,
          error: app.get('env') === 'development' ? err.toString() : undefined
        });
      });

      // Serve HTML files for all non-API routes
      app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
          res.sendFile(path.join(__dirname, '../client/public/index.html'));
        }
      });

      const PORT = process.env.PORT || 5000;
      server.listen(PORT, "0.0.0.0", () => {
        log(`Server started successfully on port ${PORT}`);
      });

    } catch (error) {
      console.error("Failed to start server:", error);
      // Don't exit the process, let it continue running
    }
  })();

} catch (error) {
  console.error("Error during Express app setup:", error);
  // Don't exit the process, let it continue running
}