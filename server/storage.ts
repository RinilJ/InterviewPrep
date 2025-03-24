import session from "express-session";
import createMemoryStore from "memorystore";
import { User, Test, TestResult, DiscussionSlot, SlotBooking, NewUser } from "@shared/schema";
import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import { users, tests, testResults, discussionSlots, slotBookings } from '../shared/schema';
import { eq } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // Auth
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: NewUser): Promise<User>;

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

export class PostgresStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: NewUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async findTeacher(department: string, year: string, batch: string): Promise<User | undefined> {
    const cleanDepartment = String(department).trim().toUpperCase();
    const cleanYear = String(year).trim();
    const cleanBatch = String(batch).trim().toUpperCase();

    const result = await db.select().from(users)
      .where(
        eq(users.role, 'teacher'),
        eq(users.department, cleanDepartment),
        eq(users.year, cleanYear),
        eq(users.batch, cleanBatch)
      );
    return result[0];
  }

  async getTeacherStudents(teacherId: number, department: string, year: string, batch: string): Promise<User[]> {
    const cleanDepartment = String(department).trim().toUpperCase();
    const cleanYear = String(year).trim();
    const cleanBatch = String(batch).trim().toUpperCase();

    const students = await db.select().from(users)
      .where(
        eq(users.role, 'student'),
        eq(users.teacherId, teacherId),
        eq(users.department, cleanDepartment),
        eq(users.year, cleanYear),
        eq(users.batch, cleanBatch)
      );

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


  async getTests(): Promise<Test[]> {
    const result = await db.select().from(tests);
    return result;
  }

  async createTest(test: Omit<Test, "id">): Promise<Test> {
    const result = await db.insert(tests).values(test).returning();
    return result[0];
  }

  async createTestResult(result: Omit<TestResult, "id" | "completedAt">): Promise<TestResult> {
    const newResult = {...result, completedAt: new Date()}
    const res = await db.insert(testResults).values(newResult).returning();
    return res[0];
  }

  async getTestResults(userId: number): Promise<TestResult[]> {
    const result = await db.select().from(testResults).where(eq(testResults.userId, userId));
    return result;
  }

  async createDiscussionSlot(slot: Omit<DiscussionSlot, "id">): Promise<DiscussionSlot> {
    const result = await db.insert(discussionSlots).values(slot).returning();
    return result[0];
  }

  async getDiscussionSlots(department: string, year: string, batch: string): Promise<DiscussionSlot[]> {
    const result = await db.select().from(discussionSlots).where(
      eq(discussionSlots.department, department),
      eq(discussionSlots.year, year),
      eq(discussionSlots.batch, batch)
    );
    return result;
  }

  async createSlotBooking(booking: Omit<SlotBooking, "id" | "bookedAt">): Promise<SlotBooking> {
    const newBooking = {...booking, bookedAt: new Date()};
    const result = await db.insert(slotBookings).values(newBooking).returning();
    return result[0];
  }
}

export const storage = new PostgresStorage();