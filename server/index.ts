import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

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
    try {
        log('Starting server initialization...');
        const server = registerRoutes(app);

        app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
            console.error('Error in request handler:', err);
            const status = err.status || err.statusCode || 500;
            const message = err.message || "Internal Server Error";
            res.status(status).json({ message });
        });

        // Serve HTML files for all non-API routes
        app.get('*', (req, res) => {
            if (!req.path.startsWith('/api')) {
                res.sendFile(path.join(__dirname, '../client/public/index.html'));
            }
        });

        // Try multiple ports if the default is in use
        const ports = [5000, 3000, 8080];
        let port: number | undefined;

        for (const testPort of ports) {
            try {
                await new Promise((resolve, reject) => {
                    server.listen(testPort, "0.0.0.0", () => {
                        port = testPort;
                        log(`Server successfully started on port ${port}`);
                        resolve(true);
                    }).on('error', (err: any) => {
                        if (err.code === 'EADDRINUSE') {
                            log(`Port ${testPort} is in use, trying next port...`);
                        } else {
                            reject(err);
                        }
                    });
                });

                if (port) break; // Successfully bound to a port
            } catch (err) {
                console.error(`Failed to bind to port ${testPort}:`, err);
            }
        }

        if (!port) {
            throw new Error('Failed to bind to any available port');
        }

        // Add cleanup handler
        const cleanup = () => {
            log('Shutting down server...');
            server.close(() => {
                log('Server shutdown complete');
                process.exit(0);
            });
        };

        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
})();