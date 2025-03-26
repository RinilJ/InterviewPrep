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
  getDiscussionSlot(id: number): Promise<DiscussionSlot | undefined>;
  updateDiscussionSlot(id: number, slot: Omit<DiscussionSlot, "id">): Promise<DiscussionSlot>;
  deleteDiscussionSlot(id: number): Promise<void>;

  // Slot Bookings
  createSlotBooking(booking: Omit<SlotBooking, "id" | "bookedAt">): Promise<SlotBooking>;
  getSlotBookings(slotId: number): Promise<SlotBooking[]>;

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

    // Normalize and validate the user data
    const normalizedUser = {
      ...user,
      id,
      createdAt: new Date(),
      department: String(user.department || "").trim().toUpperCase(),
      year: String(user.year || "").trim(),
      batch: String(user.batch || "").trim().toUpperCase()
    };

    // For teachers, check if a teacher already exists for this batch
    if (user.role === 'teacher') {
      const existingTeacher = await this.findTeacher(
        normalizedUser.department,
        normalizedUser.year,
        normalizedUser.batch
      );

      if (existingTeacher) {
        throw new Error("Class teacher for this batch already exists");
      }

      // Teachers don't have a teacherId
      normalizedUser.teacherId = null;
    }
    // For students, find and assign their teacher with exact matching
    else if (user.role === 'student') {
      const teacher = await this.findTeacher(
        normalizedUser.department,
        normalizedUser.year,
        normalizedUser.batch
      );

      if (!teacher) {
        throw new Error("No teacher found for your batch. Please ensure a teacher is registered first.");
      }

      // Only assign teacher if department, year, and batch match exactly
      if (teacher.department === normalizedUser.department &&
          teacher.year === normalizedUser.year &&
          teacher.batch === normalizedUser.batch) {
        normalizedUser.teacherId = teacher.id;
      } else {
        throw new Error("No matching teacher found for your batch.");
      }
    }

    this.users.set(id, normalizedUser);
    console.log(`Created ${normalizedUser.role} with ID: ${id}`);
    return normalizedUser;
  }

  async findTeacher(department: string, year: string, batch: string): Promise<User | undefined> {
    // Normalize input
    const cleanDepartment = String(department).trim().toUpperCase();
    const cleanYear = String(year).trim();
    const cleanBatch = String(batch).trim().toUpperCase();

    // Find matching teacher with exact matching of department, year, and batch
    const teacher = Array.from(this.users.values()).find(user => {
      return user.role === 'teacher' &&
        user.department === cleanDepartment &&
        user.year === cleanYear &&
        user.batch === cleanBatch;
    });

    // Log only the result
    if (teacher) {
      console.log('Found teacher:', {
        id: teacher.id,
        department: teacher.department,
        year: teacher.year,
        batch: teacher.batch
      });
    }

    return teacher;
  }

  async getTeacherStudents(teacherId: number, department: string, year: string, batch: string): Promise<User[]> {
    // Normalize input
    const cleanDepartment = String(department).trim().toUpperCase();
    const cleanYear = String(year).trim();
    const cleanBatch = String(batch).trim().toUpperCase();

    // Find matching students with strict matching of department, year, and batch
    const students = Array.from(this.users.values()).filter(user => {
      return user.role === 'student' &&
        Number(user.teacherId) === Number(teacherId) &&
        user.department === cleanDepartment &&
        user.year === cleanYear &&
        user.batch === cleanBatch;
    });

    // Log only the count and basic info
    console.log('Found students:', {
      count: students.length,
      teacherId,
      department: cleanDepartment,
      year: cleanYear,
      batch: cleanBatch
    });

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
    const slots = Array.from(this.discussionSlots.values()).filter(
      (slot) =>
        String(slot.department).trim() === String(department).trim() &&
        String(slot.year).trim() === String(year).trim() &&
        String(slot.batch).trim() === String(batch).trim()
    );

    // Add booking count for each slot
    const slotsWithBookings = await Promise.all(slots.map(async (slot) => {
      const bookings = await this.getSlotBookings(slot.id);
      return {
        ...slot,
        bookedCount: bookings.length
      };
    }));

    return slotsWithBookings;
  }

  async getDiscussionSlot(id: number): Promise<DiscussionSlot | undefined> {
    const slot = this.discussionSlots.get(id);
    if (!slot) return undefined;

    const bookings = await this.getSlotBookings(id);
    return {
      ...slot,
      bookedCount: bookings.length
    };
  }

  async getSlotBookings(slotId: number): Promise<SlotBooking[]> {
    return Array.from(this.slotBookings.values()).filter(
      (booking) => booking.slotId === slotId
    );
  }

  async createSlotBooking(booking: Omit<SlotBooking, "id" | "bookedAt">): Promise<SlotBooking> {
    const id = this.currentId++;
    const newBooking = { ...booking, id, bookedAt: new Date() };
    this.slotBookings.set(id, newBooking);

    // After creating a booking, refresh the discussion slot data
    const slot = await this.getDiscussionSlot(booking.slotId);
    console.log(`Created booking for slot ${booking.slotId}, new count: ${slot?.bookedCount}`);

    return newBooking;
  }

  async updateDiscussionSlot(id: number, slot: Omit<DiscussionSlot, "id">): Promise<DiscussionSlot> {
    const existingSlot = this.discussionSlots.get(id);
    if (!existingSlot) {
      throw new Error("Discussion slot not found");
    }

    const updatedSlot = { ...slot, id };
    this.discussionSlots.set(id, updatedSlot);

    // Add booking count to the response
    const bookings = await this.getSlotBookings(id);
    return {
      ...updatedSlot,
      bookedCount: bookings.length
    };
  }

  async deleteDiscussionSlot(id: number): Promise<void> {
    if (!this.discussionSlots.has(id)) {
      throw new Error("Discussion slot not found");
    }

    // Delete the slot and all its bookings
    this.discussionSlots.delete(id);

    // Delete all bookings for this slot
    const bookingsToDelete = Array.from(this.slotBookings.values())
      .filter(booking => booking.slotId === id)
      .map(booking => booking.id);

    bookingsToDelete.forEach(bookingId => {
      this.slotBookings.delete(bookingId);
    });
  }
}

export const storage = new MemStorage();