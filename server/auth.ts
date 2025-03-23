import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser, insertUserSchema } from "@shared/schema";
import { z } from "zod";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

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
      const user = await storage.getUserByUsername(username);
      if (!user || !(await comparePasswords(password, user.password))) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const userData = insertUserSchema.parse(req.body);

      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).send("Username already exists");
      }

      // For teacher registration, check if a teacher already exists for this batch
      if (userData.role === "teacher") {
        const existingTeacher = await storage.getTeacherByBatch(
          userData.department,
          userData.year,
          userData.batch
        );
        if (existingTeacher) {
          return res.status(400).send("Class teacher for this batch already exists");
        }
      }

      // For student registration, find and link to the class teacher
      let classTeacherId: number | null = null;
      if (userData.role === "student") {
        const classTeacher = await storage.getTeacherByBatch(
          userData.department,
          userData.year,
          userData.batch
        );
        if (classTeacher) {
          classTeacherId = classTeacher.id;
        }
      }

      // Create the user with hashed password
      const user = await storage.createUser({
        ...userData,
        password: await hashPassword(userData.password),
        classTeacherId
      });

      // Log the user in
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
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

  // New endpoint to get students for a teacher
  app.get("/api/teacher/students", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== "teacher") return res.sendStatus(403);

    const students = await storage.getStudentsByTeacher(req.user.id);
    res.json(students);
  });

  // New endpoint to get filtered discussion slots for students
  app.get("/api/discussion-slots", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    let slots;
    if (req.user.role === "student") {
      // Students only see slots for their batch
      slots = await storage.getDiscussionSlotsByBatch(
        req.user.department,
        req.user.year,
        req.user.batch
      );
    } else {
      // Teachers see all slots they created
      slots = await storage.getDiscussionSlots();
    }
    res.json(slots);
  });
}