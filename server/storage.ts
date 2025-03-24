import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { users, tests, testResults, discussionSlots, slotBookings } from '@shared/schema';
import session from "express-session";
import connectPg from "connect-pg-simple";
import { eq, and } from 'drizzle-orm';
import { User, Test, TestResult, DiscussionSlot, SlotBooking } from "@shared/schema";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // Auth
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: Omit<User, "id" | "createdAt">): Promise<User>;

  // Teacher-Student Relationship
  findTeacher(department: string, year: string, batch: string): Promise<User | undefined>;
  getTeacherStudents(teacherId: number, department: string, year: string, batch: string): Promise<User[]>;

  // Tests
  createTest(test: Omit<Test, "id">): Promise<Test>;
  getTests(): Promise<Test[]>;

  // Test Results
  createTestResult(result: Omit<TestResult, "id" | "completedAt">): Promise<TestResult>;
  getTestResults(userId: number): Promise<TestResult[]>;

  // Discussion Slots
  createDiscussionSlot(slot: Omit<DiscussionSlot, "id">): Promise<DiscussionSlot>;
  getDiscussionSlots(department: string, year: string, batch: string): Promise<DiscussionSlot[]>;

  // Slot Bookings
  createSlotBooking(booking: Omit<SlotBooking, "id" | "bookedAt">): Promise<SlotBooking>;

  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  private db: any;
  private pool: Pool;
  sessionStore: session.Store;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });

    this.db = drizzle(this.pool);
    this.sessionStore = new PostgresSessionStore({
      pool: this.pool,
      createTableIfMissing: true
    });

    // Log connection
    console.log('Initializing database connection...');
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: Omit<User, "id" | "createdAt">): Promise<User> {
    // Normalize and validate the user data
    const normalizedUser = {
      ...user,
      department: String(user.department || "").trim().toUpperCase(),
      year: String(user.year || "").trim(),
      batch: String(user.batch || "").trim().toUpperCase(),
      teacherId: user.teacherId ? Number(user.teacherId) : null
    };

    console.log('Creating new user:', {
      ...normalizedUser,
      password: '[REDACTED]'
    });

    const result = await this.db.insert(users).values(normalizedUser).returning();
    return result[0];
  }

  async findTeacher(department: string, year: string, batch: string): Promise<User | undefined> {
    const cleanDepartment = String(department).trim().toUpperCase();
    const cleanYear = String(year).trim();
    const cleanBatch = String(batch).trim().toUpperCase();

    console.log('Finding teacher for:', { cleanDepartment, cleanYear, cleanBatch });

    const result = await this.db
      .select()
      .from(users)
      .where(and(
        eq(users.role, 'teacher'),
        eq(users.department, cleanDepartment),
        eq(users.year, cleanYear),
        eq(users.batch, cleanBatch)
      ));

    return result[0];
  }

  async getTeacherStudents(teacherId: number, department: string, year: string, batch: string): Promise<User[]> {
    const cleanDepartment = String(department).trim().toUpperCase();
    const cleanYear = String(year).trim();
    const cleanBatch = String(batch).trim().toUpperCase();

    console.log('Getting students for teacher:', {
      teacherId,
      department: cleanDepartment,
      year: cleanYear,
      batch: cleanBatch
    });

    const students = await this.db
      .select()
      .from(users)
      .where(and(
        eq(users.role, 'student'),
        eq(users.teacherId, teacherId),
        eq(users.department, cleanDepartment),
        eq(users.year, cleanYear),
        eq(users.batch, cleanBatch)
      ));

    // Add progress information
    const studentsWithProgress = await Promise.all(students.map(async (student) => {
      const results = await this.getTestResults(student.id);
      return {
        ...student,
        testsCompleted: results.length,
        averageScore: results.length > 0
          ? Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length)
          : 0
      };
    }));

    return studentsWithProgress;
  }

  // Implement other methods similarly...
  async createTest(test: Omit<Test, "id">): Promise<Test> {
    const result = await this.db.insert(tests).values(test).returning();
    return result[0];
  }

  async getTests(): Promise<Test[]> {
    return await this.db.select().from(tests);
  }

  async createTestResult(result: Omit<TestResult, "id" | "completedAt">): Promise<TestResult> {
    const newResult = {
      ...result,
      completedAt: new Date()
    };
    const insertedResult = await this.db.insert(testResults).values(newResult).returning();
    return insertedResult[0];
  }

  async getTestResults(userId: number): Promise<TestResult[]> {
    return await this.db
      .select()
      .from(testResults)
      .where(eq(testResults.userId, userId));
  }

  async createDiscussionSlot(slot: Omit<DiscussionSlot, "id">): Promise<DiscussionSlot> {
    const result = await this.db.insert(discussionSlots).values(slot).returning();
    return result[0];
  }

  async getDiscussionSlots(department: string, year: string, batch: string): Promise<DiscussionSlot[]> {
    return await this.db
      .select()
      .from(discussionSlots)
      .where(and(
        eq(discussionSlots.department, department),
        eq(discussionSlots.year, year),
        eq(discussionSlots.batch, batch)
      ));
  }

  async createSlotBooking(booking: Omit<SlotBooking, "id" | "bookedAt">): Promise<SlotBooking> {
    const newBooking = {
      ...booking,
      bookedAt: new Date()
    };
    const result = await this.db.insert(slotBookings).values(newBooking).returning();
    return result[0];
  }
}

// Export a single instance
export const storage = new DatabaseStorage();