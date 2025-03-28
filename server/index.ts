import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the client/public directory
app.use(express.static(path.join(__dirname, '../client/public')));

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
        if (path.startsWith("/api")) {
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

(async () => {
    const server = registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        res.status(status).json({ message });
        throw err;
    });

    // Serve HTML files for all non-API routes
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
            // Check if the requested file exists
            const filePath = path.join(__dirname, '../client/public', req.path);
            if (req.path === '/') {
                res.sendFile(path.join(__dirname, '../client/public/index.html'));
            } else {
                res.sendFile(path.join(__dirname, '../client/public/index.html'));
            }
        }
    });

    const PORT = 5000;
    server.listen(PORT, "0.0.0.0", () => {
        log(`serving on port ${PORT}`);
        console.log(`🚀 Server is running at: http://localhost:${PORT}`);
    });
})();