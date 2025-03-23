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
  private currentId: number;
  sessionStore: session.Store;

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
      department: String(user.department || "").trim().toUpperCase(),
      year: String(user.year || "").trim(),
      batch: String(user.batch || "").trim().toUpperCase(),
      teacherId: user.teacherId !== undefined ? Number(user.teacherId) : null
    };

    this.users.set(id, newUser);
    console.log('Created user:', {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
      department: newUser.department,
      year: newUser.year,
      batch: newUser.batch,
      teacherId: newUser.teacherId
    });

    return newUser;
  }

  async findTeacher(department: string, year: string, batch: string): Promise<User | undefined> {
    // Normalize input
    const cleanDepartment = String(department).trim().toUpperCase();
    const cleanYear = String(year).trim();
    const cleanBatch = String(batch).trim().toUpperCase();

    console.log('Finding teacher for:', { cleanDepartment, cleanYear, cleanBatch });

    const teachers = Array.from(this.users.values());
    console.log('Current users:', teachers.map(u => ({
      id: u.id,
      username: u.username,
      role: u.role,
      department: u.department,
      year: u.year,
      batch: u.batch
    })));

    // Match teacher with exact matching credentials
    const teacher = teachers.find(
      (user) => 
        user.role === 'teacher' &&
        user.department === cleanDepartment &&
        user.year === cleanYear &&
        user.batch === cleanBatch
    );

    console.log('Found teacher:', teacher ? {
      id: teacher.id,
      username: teacher.username,
      role: teacher.role,
      department: teacher.department,
      year: teacher.year,
      batch: teacher.batch
    } : 'No teacher found');

    return teacher;
  }

  async getTeacherStudents(teacherId: number, department: string, year: string, batch: string): Promise<User[]> {
    // Normalize input
    const cleanDepartment = String(department).trim().toUpperCase();
    const cleanYear = String(year).trim();
    const cleanBatch = String(batch).trim().toUpperCase();

    console.log('Getting students for teacher:', { teacherId, cleanDepartment, cleanYear, cleanBatch });

    const allUsers = Array.from(this.users.values());
    console.log('Current users in system:', allUsers.map(u => ({
      id: u.id,
      username: u.username,
      role: u.role,
      teacherId: u.teacherId,
      department: u.department,
      year: u.year,
      batch: u.batch
    })));

    const students = allUsers.filter(
      (user) => {
        const isMatch = 
          user.role === 'student' &&
          user.teacherId === teacherId &&
          user.department === cleanDepartment &&
          user.year === cleanYear &&
          user.batch === cleanBatch;

        // Add detailed logging for each potential student match
        console.log('Evaluating user for match:', {
          userId: user.id,
          username: user.username,
          role: user.role,
          actualTeacherId: user.teacherId,
          expectedTeacherId: teacherId,
          actualDepartment: user.department,
          expectedDepartment: cleanDepartment,
          actualYear: user.year,
          expectedYear: cleanYear,
          actualBatch: user.batch,
          expectedBatch: cleanBatch,
          isMatch: isMatch
        });

        return isMatch;
      }
    );

    console.log('Found matching students:', students.map(s => ({
      id: s.id,
      username: s.username,
      teacherId: s.teacherId,
      department: s.department,
      year: s.year,
      batch: s.batch
    })));

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

    console.log('Final students with progress:', studentsWithProgress);
    return studentsWithProgress;
  }

  async getTests(): Promise<Test[]> {
    return Array.from(this.tests.values());
  }

  async createTest(test: Omit<Test, "id">): Promise<Test> {
    const id = this.currentId++;
    const newTest = { ...test, id };
    this.tests.set(id, newTest);
    return newTest;
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
        String(slot.department).trim() === String(department).trim() &&
        String(slot.year).trim() === String(year).trim() &&
        String(slot.batch).trim() === String(batch).trim()
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