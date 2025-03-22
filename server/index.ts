import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting server initialization...');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the client/public directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Logging middleware
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
    console.time('server-startup');

    let server;
    try {
        server = registerRoutes(app);

        // Global error handler
        app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
            console.error('Global error:', err);
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

        const PORT = process.env.PORT || 5000;

        // Attempt to start server with retries
        let retries = 0;
        const maxRetries = 3;
        const startServer = () => {
            return new Promise((resolve, reject) => {
                server.once('error', (err: any) => {
                    if (err.code === 'EADDRINUSE') {
                        console.log(`Port ${PORT} is busy, retrying...`);
                        server.close();
                        if (retries < maxRetries) {
                            retries++;
                            setTimeout(() => {
                                server.listen(PORT, "0.0.0.0", resolve);
                            }, 1000);
                        } else {
                            reject(new Error(`Port ${PORT} is in use after ${maxRetries} retries`));
                        }
                    } else {
                        reject(err);
                    }
                });

                server.listen(PORT, "0.0.0.0", () => {
                    console.log(`Server started successfully on port ${PORT}`);
                    resolve(undefined);
                });
            });
        };

        await startServer();
        console.timeEnd('server-startup');
        log(`Server running on port ${PORT}`);

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM received. Shutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
})();