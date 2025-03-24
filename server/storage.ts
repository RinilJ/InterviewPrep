import session from "express-session";
import createMemoryStore from "memorystore";
import { User, Test, TestResult, DiscussionSlot, SlotBooking, PsychometricResult } from "@shared/schema";

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
  getTest(id: number): Promise<Test | undefined>;

  // Test Results
  createTestResult(result: Omit<TestResult, "id" | "completedAt">): Promise<TestResult>;
  getTestResults(userId: number): Promise<TestResult[]>;

  // Psychometric Results
  createPsychometricResult(result: Omit<PsychometricResult, "id" | "completedAt">): Promise<PsychometricResult>;
  getPsychometricResults(userId: number): Promise<PsychometricResult[]>;

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
  private psychometricResults: Map<number, PsychometricResult>;
  private discussionSlots: Map<number, DiscussionSlot>;
  private slotBookings: Map<number, SlotBooking>;
  private currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.tests = new Map();
    this.testResults = new Map();
    this.psychometricResults = new Map();
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

    // Normalize and validate the user data
    const normalizedUser = {
      ...user,
      id,
      createdAt: new Date(),
      department: String(user.department || "").trim().toUpperCase(),
      year: String(user.year || "").trim(),
      batch: String(user.batch || "").trim().toUpperCase()
    };

    // Handle teacherId specifically
    if (user.role === 'student' && user.teacherId) {
      normalizedUser.teacherId = Number(user.teacherId);
      console.log('Setting teacherId for student:', {
        studentId: id,
        teacherId: normalizedUser.teacherId
      });
    } else {
      normalizedUser.teacherId = null;
    }

    // Log the full user object being created
    console.log('Creating new user:', {
      ...normalizedUser,
      password: '[REDACTED]'
    });

    this.users.set(id, normalizedUser);

    // Verify the user was stored correctly
    const storedUser = this.users.get(id);
    console.log('Stored user verification:', {
      id: storedUser?.id,
      username: storedUser?.username,
      role: storedUser?.role,
      department: storedUser?.department,
      year: storedUser?.year,
      batch: storedUser?.batch,
      teacherId: storedUser?.teacherId
    });

    return normalizedUser;
  }

  async findTeacher(department: string, year: string, batch: string): Promise<User | undefined> {
    // Normalize input
    const cleanDepartment = String(department).trim().toUpperCase();
    const cleanYear = String(year).trim();
    const cleanBatch = String(batch).trim().toUpperCase();

    console.log('Finding teacher for:', { cleanDepartment, cleanYear, cleanBatch });

    // Get all users and log them
    const allUsers = Array.from(this.users.values());
    console.log('All users in system:', allUsers.map(u => ({
      id: u.id,
      username: u.username,
      role: u.role,
      department: u.department,
      year: u.year,
      batch: u.batch
    })));

    // Find matching teacher
    const teacher = allUsers.find(user => {
      const matches = {
        isTeacher: user.role === 'teacher',
        departmentMatch: user.department === cleanDepartment,
        yearMatch: user.year === cleanYear,
        batchMatch: user.batch === cleanBatch
      };

      const isMatch = Object.values(matches).every(match => match === true);

      console.log('Teacher match evaluation:', {
        userId: user.id,
        username: user.username,
        role: user.role,
        matches,
        isMatch
      });

      return isMatch;
    });

    if (teacher) {
      console.log('Found matching teacher:', {
        id: teacher.id,
        username: teacher.username,
        department: teacher.department,
        year: teacher.year,
        batch: teacher.batch
      });
    } else {
      console.log('No matching teacher found');
    }

    return teacher;
  }

  async getTeacherStudents(teacherId: number, department: string, year: string, batch: string): Promise<User[]> {
    // Normalize input
    const cleanDepartment = String(department).trim().toUpperCase();
    const cleanYear = String(year).trim();
    const cleanBatch = String(batch).trim().toUpperCase();

    console.log('Getting students for teacher:', {
      teacherId,
      department: cleanDepartment,
      year: cleanYear,
      batch: cleanBatch
    });

    // Get all users and log them
    const allUsers = Array.from(this.users.values());
    console.log('All users in system:', allUsers.map(u => ({
      id: u.id,
      username: u.username,
      role: u.role,
      teacherId: u.teacherId,
      department: u.department,
      year: u.year,
      batch: u.batch
    })));

    // Find matching students
    const students = allUsers.filter(user => {
      const matches = {
        isStudent: user.role === 'student',
        teacherMatch: Number(user.teacherId) === Number(teacherId),
        departmentMatch: user.department === cleanDepartment,
        yearMatch: user.year === cleanYear,
        batchMatch: user.batch === cleanBatch
      };

      const isMatch = Object.values(matches).every(match => match === true);

      console.log('Student match evaluation:', {
        userId: user.id,
        username: user.username,
        matches,
        isMatch
      });

      return isMatch;
    });

    console.log('Matched students:', students.map(s => ({
      id: s.id,
      username: s.username,
      teacherId: s.teacherId
    })));

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

  async getTest(id: number): Promise<Test | undefined> {
    return this.tests.get(id);
  }

  async createPsychometricResult(result: Omit<PsychometricResult, "id" | "completedAt">): Promise<PsychometricResult> {
    const id = this.currentId++;
    const newResult = { 
      ...result, 
      id, 
      completedAt: new Date() 
    };

    console.log('Creating psychometric result:', {
      id: newResult.id,
      userId: newResult.userId,
      testId: newResult.testId,
      insights: newResult.insights
    });

    this.psychometricResults.set(id, newResult);
    return newResult;
  }

  async getPsychometricResults(userId: number): Promise<PsychometricResult[]> {
    return Array.from(this.psychometricResults.values())
      .filter(result => result.userId === userId);
  }
}

export const storage = new MemStorage();