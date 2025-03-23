import { IStorage } from "./storage";
import session from "express-session";
import createMemoryStore from "memorystore";
import { User, Test, TestResult, DiscussionSlot, SlotBooking } from "@shared/schema";

const MemoryStore = createMemoryStore(session);

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tests: Map<number, Test>;
  private testResults: Map<number, TestResult>;
  private discussionSlots: Map<number, DiscussionSlot>;
  private slotBookings: Map<number, SlotBooking>;
  sessionStore: session.Store;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.tests = new Map();
    this.testResults = new Map();
    this.discussionSlots = new Map();
    this.slotBookings = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(user: Omit<User, "id" | "createdAt">): Promise<User> {
    const id = this.currentId++;
    const newUser = { 
      ...user, 
      id, 
      createdAt: new Date(),
      department: user.department || "",
      year: user.year || "",
      batch: user.batch || "",
      teacherId: user.teacherId || null
    };
    this.users.set(id, newUser);
    console.log('Created user:', newUser); // Debug log
    return newUser;
  }

  async findTeacher(department: string, year: string, batch: string): Promise<User | undefined> {
    console.log('Finding teacher for:', { department, year, batch }); // Debug log

    const teachers = Array.from(this.users.values());
    const teacher = teachers.find(
      (user) => 
        user.role === 'teacher' &&
        String(user.department) === String(department) &&
        String(user.year) === String(year) &&
        String(user.batch) === String(batch)
    );

    console.log('Found teacher:', teacher ? {
      id: teacher.id,
      username: teacher.username,
      role: teacher.role,
      department: teacher.department,
      year: teacher.year,
      batch: teacher.batch
    } : null); // Debug log

    return teacher;
  }

  async getTeacherStudents(teacherId: number, department: string, year: string, batch: string): Promise<User[]> {
    console.log('Getting students for teacher:', { teacherId, department, year, batch }); // Debug log

    const allUsers = Array.from(this.users.values());
    const students = allUsers.filter(
      (user) => 
        user.role === 'student' &&
        String(user.teacherId) === String(teacherId) &&
        String(user.department) === String(department) &&
        String(user.year) === String(year) &&
        String(user.batch) === String(batch)
    );

    // Get test results for each student
    const studentsWithProgress = await Promise.all(students.map(async (student) => {
      const results = await this.getTestResults(student.id);
      const averageScore = results.length > 0
        ? Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length)
        : 0;

      return {
        ...student,
        testsCompleted: results.length,
        averageScore
      };
    }));

    console.log('Found students with progress:', studentsWithProgress); // Debug log
    return studentsWithProgress;
  }

  async createTest(test: Omit<Test, "id">): Promise<Test> {
    const id = this.currentId++;
    const newTest = { ...test, id };
    this.tests.set(id, newTest);
    return newTest;
  }

  async getTests(): Promise<Test[]> {
    return Array.from(this.tests.values());
  }

  async createTestResult(result: Omit<TestResult, "id" | "completedAt">): Promise<TestResult> {
    const id = this.currentId++;
    const newResult = { ...result, id, completedAt: new Date() };
    this.testResults.set(id, newResult);
    return newResult;
  }

  async getTestResults(userId: number): Promise<TestResult[]> {
    return Array.from(this.testResults.values()).filter(
      (result) => result.userId === userId,
    );
  }

  async createDiscussionSlot(slot: Omit<DiscussionSlot, "id">): Promise<DiscussionSlot> {
    const id = this.currentId++;
    const newSlot = { ...slot, id };
    this.discussionSlots.set(id, newSlot);
    return newSlot;
  }

  async getDiscussionSlots(department: string, year: string, batch: string): Promise<DiscussionSlot[]> {
    return Array.from(this.discussionSlots.values()).filter(
      (slot) => 
        slot.department === department &&
        slot.year === year &&
        slot.batch === batch
    );
  }

  async createSlotBooking(booking: Omit<SlotBooking, "id" | "bookedAt">): Promise<SlotBooking> {
    const id = this.currentId++;
    const newBooking = { ...booking, id, bookedAt: new Date() };
    this.slotBookings.set(id, newBooking);
    return newBooking;
  }
}

export const storage = new MemStorage();