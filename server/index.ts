import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createServer as createNetServer } from "net";
import { Server as HttpServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('[Startup] Beginning server initialization...');

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
            log(logLine);
        }
    });

    next();
});

// Helper function to check if port is in use
async function isPortInUse(port: number): Promise<boolean> {
    console.log(`[Port Check] Testing port ${port} availability...`);
    return new Promise((resolve) => {
        const server = createNetServer()
            .once('error', () => {
                console.log(`[Port Check] Port ${port} is in use`);
                resolve(true);
            })
            .once('listening', () => {
                console.log(`[Port Check] Port ${port} is available`);
                server.close();
                resolve(false);
            })
            .listen(port, '0.0.0.0');
    });
}

(async () => {
    console.time('[Startup] Total startup time');
    const PORT = Number(process.env.PORT) || 5000;

    let server: HttpServer;
    try {
        console.log('[Startup] Initializing server components...');
        server = registerRoutes(app);

        // Global error handler
        app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
            console.error('[Error] Global error handler:', err);
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

        // Check port before attempting to start
        console.log(`[Port] Checking if port ${PORT} is available...`);
        const portInUse = await isPortInUse(PORT);
        if (portInUse) {
            throw new Error(`Port ${PORT} is already in use. Please ensure no other instance is running.`);
        }
        console.log(`[Port] Port ${PORT} is confirmed available`);

        // Start server with retry logic
        let retries = 0;
        const maxRetries = 3;
        const startServer = () => {
            return new Promise((resolve, reject) => {
                console.log(`[Server] Attempt ${retries + 1}/${maxRetries} to start server on port ${PORT}`);

                server.once('error', (err: any) => {
                    if (err.code === 'EADDRINUSE') {
                        console.log(`[Server] Port ${PORT} became busy, retrying...`);
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
                    console.log(`[Server] Successfully started on port ${PORT}`);
                    resolve(undefined);
                });
            });
        };

        await startServer();
        console.timeEnd('[Startup] Total startup time');
        log(`[Server] Running on port ${PORT}`);

        // Graceful shutdown handlers
        const shutdownHandler = (signal: string) => {
            console.log(`[Shutdown] ${signal} received. Shutting down gracefully...`);
            server.close(() => {
                console.log('[Shutdown] Server closed');
                process.exit(0);
            });

            // Force exit if graceful shutdown fails
            setTimeout(() => {
                console.error('[Shutdown] Could not close connections in time, forcefully shutting down');
                process.exit(1);
            }, 10000);
        };

        process.on('SIGTERM', () => shutdownHandler('SIGTERM'));
        process.on('SIGINT', () => shutdownHandler('SIGINT'));

    } catch (error) {
        console.error('[Error] Failed to start server:', error);
        process.exit(1);
    }
})();