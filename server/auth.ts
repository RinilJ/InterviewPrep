import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "development_secret",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
  };

  if (app.get("env") === "production") {
    app.set("trust proxy", 1);
  }

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        console.error('Login error:', error);
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    try {
      done(null, user.id);
    } catch (error) {
      console.error('Serialize error:', error);
      done(error);
    }
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      console.error('Deserialize error:', error);
      done(error);
    }
  });

  // Registration schema with proper type handling
  const registerSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["student", "teacher"]),
    department: z.enum(["CS", "IT", "MCA"]).nullable(),
    batch: z.string().nullable(),
    year: z.string().nullable()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      console.log("Registration request received:", {
        ...req.body,
        password: '[REDACTED]'
      });

      // Parse and validate request data
      const parsed = registerSchema.parse(req.body);

      // Check for existing user
      const existingUser = await storage.getUserByUsername(parsed.username);
      if (existingUser) {
        return res.status(400).send("Username already exists");
      }

      try {
        // Create user with null fallbacks for optional fields
        const hashedPassword = await hashPassword(parsed.password);
        const user = await storage.createUser({
          username: parsed.username,
          password: hashedPassword,
          role: parsed.role,
          department: parsed.department || null,
          batch: parsed.batch || null,
          year: parsed.year || null
        });

        console.log("User created successfully:", {
          id: user.id,
          username: user.username,
          role: user.role
        });

        // Log user in after registration
        req.login(user, (err) => {
          if (err) {
            console.error("Login after registration failed:", err);
            return next(err);
          }
          res.status(201).json(user);
        });
      } catch (error) {
        console.error("User creation error:", error);
        return res.status(500).send("Failed to create user");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json(error.issues);
      }
      next(error);
    }
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}