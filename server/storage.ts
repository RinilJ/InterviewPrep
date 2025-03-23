import { IStorage } from "./storage";
import session from "express-session";
import createMemoryStore from "memorystore";
import { User, Test, TestResult, DiscussionSlot, SlotBooking } from "@shared/schema";

const MemoryStore = createMemoryStore(session);

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
      department: String(user.department || ""),
      year: String(user.year || ""),
      batch: String(user.batch || ""),
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
    console.log('Finding teacher for:', { department, year, batch });

    const teachers = Array.from(this.users.values());
    console.log('All users:', teachers.map(u => ({
      id: u.id,
      username: u.username,
      role: u.role,
      department: u.department,
      year: u.year,
      batch: u.batch
    })));

    const teacher = teachers.find(
      (user) => 
        user.role === 'teacher' &&
        String(user.department).trim() === String(department).trim() &&
        String(user.year).trim() === String(year).trim() &&
        String(user.batch).trim() === String(batch).trim()
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
    console.log('Getting students for teacher:', { teacherId, department, year, batch });

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
          Number(user.teacherId) === Number(teacherId) &&
          String(user.department).trim() === String(department).trim() &&
          String(user.year).trim() === String(year).trim() &&
          String(user.batch).trim() === String(batch).trim();

        console.log('Checking user:', {
          userId: user.id,
          username: user.username,
          matchResult: isMatch,
          conditions: {
            roleMatch: user.role === 'student',
            teacherIdMatch: Number(user.teacherId) === Number(teacherId),
            departmentMatch: String(user.department).trim() === String(department).trim(),
            yearMatch: String(user.year).trim() === String(year).trim(),
            batchMatch: String(user.batch).trim() === String(batch).trim()
          }
        });

        return isMatch;
      }
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

    console.log('Found students with progress:', studentsWithProgress);
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