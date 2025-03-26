import { db } from "./db";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { users, tests, testResults, discussionSlots, slotBookings } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { pool } from "./db";
import type { User, Test, TestResult, DiscussionSlot, SlotBooking } from "@shared/schema";

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
  getDiscussionSlot(id: number): Promise<DiscussionSlot | undefined>;
  updateDiscussionSlot(id: number, slot: Omit<DiscussionSlot, "id">): Promise<DiscussionSlot>;
  deleteDiscussionSlot(id: number): Promise<void>;

  // Slot Bookings
  createSlotBooking(booking: Omit<SlotBooking, "id" | "bookedAt">): Promise<SlotBooking>;
  getSlotBookings(slotId: number): Promise<SlotBooking[]>;

  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: Omit<User, "id" | "createdAt">): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async findTeacher(department: string, year: string, batch: string): Promise<User | undefined> {
    const [teacher] = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.role, "teacher"),
          eq(users.department, department),
          eq(users.year, year),
          eq(users.batch, batch)
        )
      );
    return teacher;
  }

  async getTeacherStudents(teacherId: number, department: string, year: string, batch: string): Promise<User[]> {
    const students = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.role, "student"),
          eq(users.teacherId, teacherId),
          eq(users.department, department),
          eq(users.year, year),
          eq(users.batch, batch)
        )
      );

    // Add test statistics for each student
    const studentsWithStats = await Promise.all(
      students.map(async (student) => {
        const results = await this.getTestResults(student.id);
        return {
          ...student,
          testsCompleted: results.length,
          averageScore: results.length > 0
            ? Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length)
            : 0
        };
      })
    );

    return studentsWithStats;
  }

  async createTest(test: Omit<Test, "id">): Promise<Test> {
    const [newTest] = await db.insert(tests).values(test).returning();
    return newTest;
  }

  async getTests(): Promise<Test[]> {
    return await db.select().from(tests);
  }

  async createTestResult(result: Omit<TestResult, "id" | "completedAt">): Promise<TestResult> {
    const [newResult] = await db.insert(testResults).values(result).returning();
    return newResult;
  }

  async getTestResults(userId: number): Promise<TestResult[]> {
    return await db
      .select()
      .from(testResults)
      .where(eq(testResults.userId, userId));
  }

  async createDiscussionSlot(slot: Omit<DiscussionSlot, "id">): Promise<DiscussionSlot> {
    const [newSlot] = await db.insert(discussionSlots).values(slot).returning();
    return newSlot;
  }

  async getDiscussionSlots(department: string, year: string, batch: string): Promise<DiscussionSlot[]> {
    const slots = await db
      .select()
      .from(discussionSlots)
      .where(
        and(
          eq(discussionSlots.department, department),
          eq(discussionSlots.year, year),
          eq(discussionSlots.batch, batch)
        )
      );

    // Add booking count for each slot
    const slotsWithBookings = await Promise.all(
      slots.map(async (slot) => {
        const bookings = await this.getSlotBookings(slot.id);
        return {
          ...slot,
          bookedCount: bookings.length
        };
      })
    );

    return slotsWithBookings;
  }

  async getDiscussionSlot(id: number): Promise<DiscussionSlot | undefined> {
    const [slot] = await db
      .select()
      .from(discussionSlots)
      .where(eq(discussionSlots.id, id));

    if (!slot) return undefined;

    const bookings = await this.getSlotBookings(id);
    return {
      ...slot,
      bookedCount: bookings.length
    };
  }

  async updateDiscussionSlot(id: number, slot: Omit<DiscussionSlot, "id">): Promise<DiscussionSlot> {
    const [updatedSlot] = await db
      .update(discussionSlots)
      .set(slot)
      .where(eq(discussionSlots.id, id))
      .returning();

    const bookings = await this.getSlotBookings(id);
    return {
      ...updatedSlot,
      bookedCount: bookings.length
    };
  }

  async deleteDiscussionSlot(id: number): Promise<void> {
    // First delete all bookings for this slot
    await db
      .delete(slotBookings)
      .where(eq(slotBookings.slotId, id));

    // Then delete the slot
    await db
      .delete(discussionSlots)
      .where(eq(discussionSlots.id, id));
  }

  async createSlotBooking(booking: Omit<SlotBooking, "id" | "bookedAt">): Promise<SlotBooking> {
    const [newBooking] = await db.insert(slotBookings).values(booking).returning();
    return newBooking;
  }

  async getSlotBookings(slotId: number): Promise<SlotBooking[]> {
    return await db
      .select()
      .from(slotBookings)
      .where(eq(slotBookings.slotId, slotId));
  }
}

export const storage = new DatabaseStorage();