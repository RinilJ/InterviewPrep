import session from "express-session";
import createMemoryStore from "memorystore";
import { User, Test, TestResult, DiscussionSlot, SlotBooking, Notification, MentorResponse, MentorAvailability } from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql, and, eq, ne } from "drizzle-orm";
import pkg from 'pg';
const { Pool } = pkg;
import connectPg from "connect-pg-simple";
import * as schema from "@shared/schema";

const PostgresSessionStore = connectPg(session);
const MemoryStore = createMemoryStore(session);

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Instantiate Drizzle with the pool and schema
const db = drizzle(pool, { schema });

export interface IStorage {
  // Auth
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: Omit<User, "id" | "createdAt">): Promise<User>;

  // Teacher-Student Relationship
  findTeacher(department: string, year: string, batch: string): Promise<User | undefined>;
  getTeacherStudents(teacherId: number, department: string, year: string, batch: string): Promise<User[]>;
  getTeachersInDepartment(department: string, excludeTeacherId?: number): Promise<User[]>;

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

  // Notifications
  createNotification(notification: Omit<Notification, "id">): Promise<Notification>;
  getNotifications(userId: number): Promise<Notification[]>;
  markNotificationAsRead(id: number): Promise<Notification>;
  deleteNotification(id: number): Promise<void>;
  
  // Mentor Responses
  createMentorResponse(response: Omit<MentorResponse, "id" | "responseDate">): Promise<MentorResponse>;
  getMentorResponse(slotId: number): Promise<MentorResponse | undefined>;
  updateMentorResponse(id: number, response: Partial<MentorResponse>): Promise<MentorResponse>;
  
  // Mentor Availability
  setMentorAvailability(availability: Omit<MentorAvailability, "id">): Promise<MentorAvailability>;
  getMentorAvailability(mentorId: number): Promise<MentorAvailability[]>;
  deleteMentorAvailability(id: number): Promise<void>;

  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tests: Map<number, Test>;
  private testResults: Map<number, TestResult>;
  private discussionSlots: Map<number, DiscussionSlot>;
  private slotBookings: Map<number, SlotBooking>;
  private notifications: Map<number, Notification>;
  private mentorResponses: Map<number, MentorResponse>;
  private mentorAvailability: Map<number, MentorAvailability>;
  private currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.tests = new Map();
    this.testResults = new Map();
    this.discussionSlots = new Map();
    this.slotBookings = new Map();
    this.notifications = new Map();
    this.mentorResponses = new Map();
    this.mentorAvailability = new Map();
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

    // Normalize user data
    const normalizedUser = {
      ...user,
      id,
      createdAt: new Date(),
      department: String(user.department || "").trim().toUpperCase(),
      year: String(user.year || "").trim(),
      batch: String(user.batch || "").trim().toUpperCase()
    };

    // For teachers, check if a teacher already exists for this exact combination
    if (user.role === 'teacher') {
      // Get all existing teachers
      const existingTeachers = Array.from(this.users.values())
        .filter(t => t.role === 'teacher');

      // Log registration attempt
      console.log('Teacher registration attempt:', {
        department: normalizedUser.department,
        year: normalizedUser.year,
        batch: normalizedUser.batch
      });

      // Check if the exact combination exists
      const duplicateTeacher = existingTeachers.find(t => 
        t.department === normalizedUser.department &&
        t.year === normalizedUser.year &&
        t.batch === normalizedUser.batch
      );

      if (duplicateTeacher) {
        throw new Error("A teacher already exists for this exact department, year, and batch combination");
      }

      normalizedUser.teacherId = null;
    }
    // For students, find and assign their teacher
    else if (user.role === 'student') {
      const assignedTeacher = Array.from(this.users.values()).find(t =>
        t.role === 'teacher' &&
        t.department === normalizedUser.department &&
        t.year === normalizedUser.year &&
        t.batch === normalizedUser.batch
      );

      if (!assignedTeacher) {
        throw new Error("No teacher found for your batch. Please ensure a teacher is registered first.");
      }

      normalizedUser.teacherId = assignedTeacher.id;
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

    // Find students with exact matching of department, year, and batch
    const students = Array.from(this.users.values()).filter(user =>
      user.role === 'student' &&
      user.teacherId === teacherId &&
      user.department === cleanDepartment &&
      user.year === cleanYear &&
      user.batch === cleanBatch
    );

    // Log only the count and basic info
    console.log('Found students:', {
      count: students.length,
      teacherId,
      department: cleanDepartment,
      year: cleanYear,
      batch: cleanBatch
    });

    return students;
  }
  
  async getTeachersInDepartment(department: string, excludeTeacherId?: number): Promise<User[]> {
    // Normalize input
    const cleanDepartment = String(department).trim().toUpperCase();
    
    // Find teachers in the same department but not the current teacher
    const teachers = Array.from(this.users.values()).filter(user =>
      user.role === 'teacher' &&
      user.department === cleanDepartment &&
      (excludeTeacherId === undefined || user.id !== excludeTeacherId)
    );
    
    console.log(`Found ${teachers.length} teachers in department ${cleanDepartment}`);
    return teachers;
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

  // Notification methods
  async createNotification(notification: Omit<Notification, "id">): Promise<Notification> {
    const id = this.currentId++;
    const newNotification = { ...notification, id };
    this.notifications.set(id, newNotification);
    return newNotification;
  }

  async getNotifications(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(notification => notification.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first
  }

  async markNotificationAsRead(id: number): Promise<Notification> {
    const notification = this.notifications.get(id);
    if (!notification) {
      throw new Error("Notification not found");
    }

    const updatedNotification = { ...notification, isRead: true };
    this.notifications.set(id, updatedNotification);
    return updatedNotification;
  }

  async deleteNotification(id: number): Promise<void> {
    if (!this.notifications.has(id)) {
      throw new Error("Notification not found");
    }
    this.notifications.delete(id);
  }
  
  // Mentor Response methods
  async createMentorResponse(response: Omit<MentorResponse, "id" | "responseDate">): Promise<MentorResponse> {
    const id = this.currentId++;
    const newResponse = { ...response, id, responseDate: new Date() };
    this.mentorResponses.set(id, newResponse);
    
    // Update slot status based on mentor response
    if (response.slotId) {
      const slot = this.discussionSlots.get(response.slotId);
      if (slot) {
        let updatedStatus: "pending" | "confirmed" | "cancelled" | "rescheduled" = "pending";
        
        if (response.status === "accepted") {
          updatedStatus = "confirmed";
        } else if (response.status === "declined" && !response.alternativeMentorId) {
          updatedStatus = "cancelled";
        } else if (response.status === "declined" && response.alternativeMentorId) {
          updatedStatus = "rescheduled";
        }
        
        const updatedSlot = { ...slot, status: updatedStatus };
        this.discussionSlots.set(response.slotId, updatedSlot);
        
        // If mentor declined, notify students who booked the slot
        if (response.status === "declined") {
          this.notifyStudentsOfChange(response.slotId, updatedStatus, response.reason);
        }
      }
    }
    
    return newResponse;
  }
  
  async getMentorResponse(slotId: number): Promise<MentorResponse | undefined> {
    return Array.from(this.mentorResponses.values()).find(
      (response) => response.slotId === slotId
    );
  }
  
  async updateMentorResponse(id: number, response: Partial<MentorResponse>): Promise<MentorResponse> {
    const existingResponse = this.mentorResponses.get(id);
    if (!existingResponse) {
      throw new Error("Mentor response not found");
    }
    
    const updatedResponse = { ...existingResponse, ...response, responseDate: new Date() };
    this.mentorResponses.set(id, updatedResponse);
    
    // Update slot status based on updated response
    if (updatedResponse.slotId && response.status) {
      const slot = this.discussionSlots.get(updatedResponse.slotId);
      if (slot) {
        let updatedStatus: "pending" | "confirmed" | "cancelled" | "rescheduled" = "pending";
        
        if (updatedResponse.status === "accepted") {
          updatedStatus = "confirmed";
        } else if (updatedResponse.status === "declined" && !updatedResponse.alternativeMentorId) {
          updatedStatus = "cancelled";
        } else if (updatedResponse.status === "declined" && updatedResponse.alternativeMentorId) {
          updatedStatus = "rescheduled";
        }
        
        const updatedSlot = { ...slot, status: updatedStatus };
        this.discussionSlots.set(updatedResponse.slotId, updatedSlot);
        
        // If mentor changed response to declined, notify students who booked the slot
        if (response.status === "declined") {
          this.notifyStudentsOfChange(updatedResponse.slotId, updatedStatus, updatedResponse.reason);
        }
      }
    }
    
    return updatedResponse;
  }
  
  // Mentor Availability methods
  async setMentorAvailability(availability: Omit<MentorAvailability, "id">): Promise<MentorAvailability> {
    const id = this.currentId++;
    const newAvailability = { ...availability, id };
    this.mentorAvailability.set(id, newAvailability);
    return newAvailability;
  }
  
  async getMentorAvailability(mentorId: number): Promise<MentorAvailability[]> {
    return Array.from(this.mentorAvailability.values())
      .filter(availability => availability.mentorId === mentorId);
  }
  
  async deleteMentorAvailability(id: number): Promise<void> {
    if (!this.mentorAvailability.has(id)) {
      throw new Error("Mentor availability not found");
    }
    this.mentorAvailability.delete(id);
  }
  
  // Helper method to notify students when a slot status changes
  private async notifyStudentsOfChange(slotId: number, newStatus: string, reason?: string | null): Promise<void> {
    const bookings = await this.getSlotBookings(slotId);
    const slot = await this.getDiscussionSlot(slotId);
    
    if (!slot) return;
    
    // Create notifications for all students who booked this slot
    for (const booking of bookings) {
      let message = '';
      
      if (newStatus === 'cancelled') {
        message = `Your group discussion "${slot.topic}" scheduled for ${new Date(slot.startTime).toLocaleString()} has been cancelled.`;
        if (reason) message += ` Reason: ${reason}`;
      } else if (newStatus === 'rescheduled') {
        message = `Your group discussion "${slot.topic}" scheduled for ${new Date(slot.startTime).toLocaleString()} has been rescheduled with a different mentor.`;
        if (reason) message += ` Reason: ${reason}`;
      }
      
      await this.createNotification({
        userId: booking.userId,
        type: newStatus === 'cancelled' ? 'cancellation' : 'update',
        message,
        relatedId: slotId,
        isRead: false,
        date: new Date()
      });
    }
  }
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
  }

  // Auth methods
  async getUser(id: number): Promise<User | undefined> {
    const results = await db.select().from(schema.users).where(sql`id = ${id}`);
    return results[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await db.select().from(schema.users).where(sql`username = ${username}`);
    return results[0];
  }

  async createUser(user: Omit<User, "id" | "createdAt">): Promise<User> {
    // Normalize user data
    const normalizedUser = {
      ...user,
      department: String(user.department || "").trim().toUpperCase(),
      year: String(user.year || "").trim(),
      batch: String(user.batch || "").trim().toUpperCase()
    };

    // For teachers, check if a teacher already exists for this exact combination
    if (user.role === 'teacher') {
      const existingTeachers = await db.select()
        .from(schema.users)
        .where(sql`role = 'teacher' AND department = ${normalizedUser.department} AND year = ${normalizedUser.year} AND batch = ${normalizedUser.batch}`);

      if (existingTeachers.length > 0) {
        throw new Error("A teacher already exists for this exact department, year, and batch combination");
      }
    }
    // For students, find and assign their teacher
    else if (user.role === 'student') {
      const assignedTeachers = await db.select()
        .from(schema.users)
        .where(sql`role = 'teacher' AND department = ${normalizedUser.department} AND year = ${normalizedUser.year} AND batch = ${normalizedUser.batch}`);

      if (assignedTeachers.length === 0) {
        throw new Error("No teacher found for your batch. Please ensure a teacher is registered first.");
      }

      normalizedUser.teacherId = assignedTeachers[0].id;
    }

    const insertedUsers = await db.insert(schema.users).values(normalizedUser).returning();
    return insertedUsers[0];
  }

  // Teacher-Student Relationship methods
  async findTeacher(department: string, year: string, batch: string): Promise<User | undefined> {
    // Normalize input
    const cleanDepartment = String(department).trim().toUpperCase();
    const cleanYear = String(year).trim();
    const cleanBatch = String(batch).trim().toUpperCase();

    const teachers = await db.select()
      .from(schema.users)
      .where(sql`role = 'teacher' AND department = ${cleanDepartment} AND year = ${cleanYear} AND batch = ${cleanBatch}`);

    return teachers[0];
  }

  async getTeacherStudents(teacherId: number, department: string, year: string, batch: string): Promise<User[]> {
    // Normalize input
    const cleanDepartment = String(department).trim().toUpperCase();
    const cleanYear = String(year).trim();
    const cleanBatch = String(batch).trim().toUpperCase();

    return await db.select()
      .from(schema.users)
      .where(sql`role = 'student' AND teacher_id = ${teacherId} AND department = ${cleanDepartment} AND year = ${cleanYear} AND batch = ${cleanBatch}`);
  }
  
  async getTeachersInDepartment(department: string, excludeTeacherId?: number): Promise<User[]> {
    // Normalize input
    const cleanDepartment = String(department).trim().toUpperCase();
    
    // Build the query with proper drizzle where conditions
    const conditions = [
      eq(schema.users.role, 'teacher'),
      eq(schema.users.department, cleanDepartment)
    ];
    
    // Add exclusion condition if needed
    if (excludeTeacherId !== undefined) {
      conditions.push(ne(schema.users.id, excludeTeacherId));
    }
    
    // Execute the query with all conditions
    const teachers = await db.select()
      .from(schema.users)
      .where(and(...conditions));
    
    console.log(`Found ${teachers.length} teachers in department ${cleanDepartment}`);
    return teachers;
  }

  // Tests methods
  async getTests(): Promise<Test[]> {
    return await db.select().from(schema.tests);
  }

  async createTest(test: Omit<Test, "id">): Promise<Test> {
    const insertedTests = await db.insert(schema.tests).values(test).returning();
    return insertedTests[0];
  }

  // Test Results methods
  async createTestResult(result: Omit<TestResult, "id" | "completedAt">): Promise<TestResult> {
    const insertedResults = await db.insert(schema.testResults).values(result).returning();
    return insertedResults[0];
  }

  async getTestResults(userId: number): Promise<TestResult[]> {
    return await db.select()
      .from(schema.testResults)
      .where(sql`user_id = ${userId}`);
  }

  // Discussion Slots methods
  async createDiscussionSlot(slot: Omit<DiscussionSlot, "id">): Promise<DiscussionSlot> {
    const insertedSlots = await db.insert(schema.discussionSlots).values(slot).returning();
    return insertedSlots[0];
  }

  async getDiscussionSlots(department: string, year: string, batch: string): Promise<DiscussionSlot[]> {
    const slots = await db.select()
      .from(schema.discussionSlots)
      .where(sql`department = ${department} AND year = ${year} AND batch = ${batch}`);

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
    const slots = await db.select().from(schema.discussionSlots).where(sql`id = ${id}`);
    
    if (slots.length === 0) return undefined;
    
    const bookings = await this.getSlotBookings(id);
    return {
      ...slots[0],
      bookedCount: bookings.length
    };
  }

  async updateDiscussionSlot(id: number, slot: Omit<DiscussionSlot, "id">): Promise<DiscussionSlot> {
    const updatedSlots = await db.update(schema.discussionSlots)
      .set(slot)
      .where(sql`id = ${id}`)
      .returning();

    if (updatedSlots.length === 0) {
      throw new Error("Discussion slot not found");
    }

    // Add booking count to the response
    const bookings = await this.getSlotBookings(id);
    return {
      ...updatedSlots[0],
      bookedCount: bookings.length
    };
  }

  async deleteDiscussionSlot(id: number): Promise<void> {
    // First delete all bookings for this slot
    await db.delete(schema.slotBookings).where(sql`slot_id = ${id}`);
    
    // Then delete the slot
    const result = await db.delete(schema.discussionSlots).where(sql`id = ${id}`).returning();
    
    if (result.length === 0) {
      throw new Error("Discussion slot not found");
    }
  }

  // Slot Bookings methods
  async getSlotBookings(slotId: number): Promise<SlotBooking[]> {
    return await db.select()
      .from(schema.slotBookings)
      .where(sql`slot_id = ${slotId}`);
  }

  async createSlotBooking(booking: Omit<SlotBooking, "id" | "bookedAt">): Promise<SlotBooking> {
    const insertedBookings = await db.insert(schema.slotBookings).values(booking).returning();
    return insertedBookings[0];
  }

  // Notifications methods
  async createNotification(notification: Omit<Notification, "id">): Promise<Notification> {
    const insertedNotifications = await db.insert(schema.notifications).values(notification).returning();
    return insertedNotifications[0];
  }

  async getNotifications(userId: number): Promise<Notification[]> {
    return await db.select()
      .from(schema.notifications)
      .where(sql`user_id = ${userId}`)
      .orderBy(sql`date desc`);
  }

  async markNotificationAsRead(id: number): Promise<Notification> {
    const updatedNotifications = await db.update(schema.notifications)
      .set({ isRead: true })
      .where(sql`id = ${id}`)
      .returning();

    if (updatedNotifications.length === 0) {
      throw new Error("Notification not found");
    }

    return updatedNotifications[0];
  }

  async deleteNotification(id: number): Promise<void> {
    const result = await db.delete(schema.notifications).where(sql`id = ${id}`).returning();
    
    if (result.length === 0) {
      throw new Error("Notification not found");
    }
  }

  // Mentor Response methods
  async createMentorResponse(response: Omit<MentorResponse, "id" | "responseDate">): Promise<MentorResponse> {
    const insertedResponses = await db.insert(schema.mentorResponses).values({
      ...response,
      responseDate: new Date()
    }).returning();
    
    const newResponse = insertedResponses[0];
    
    // Update slot status based on mentor response
    if (response.slotId) {
      const slots = await db.select().from(schema.discussionSlots).where(sql`id = ${response.slotId}`);
      
      if (slots.length > 0) {
        let updatedStatus: "pending" | "confirmed" | "cancelled" | "rescheduled" = "pending";
        
        if (response.status === "accepted") {
          updatedStatus = "confirmed";
        } else if (response.status === "declined" && !response.alternativeMentorId) {
          updatedStatus = "cancelled";
        } else if (response.status === "declined" && response.alternativeMentorId) {
          updatedStatus = "rescheduled";
        }
        
        await db.update(schema.discussionSlots)
          .set({ status: updatedStatus })
          .where(sql`id = ${response.slotId}`);
        
        // If mentor declined, notify students who booked the slot
        if (response.status === "declined") {
          this.notifyStudentsOfChange(response.slotId, updatedStatus, response.reason);
        }
      }
    }
    
    return newResponse;
  }

  async getMentorResponse(slotId: number): Promise<MentorResponse | undefined> {
    const responses = await db.select()
      .from(schema.mentorResponses)
      .where(sql`slot_id = ${slotId}`);
    
    return responses[0];
  }

  async updateMentorResponse(id: number, response: Partial<MentorResponse>): Promise<MentorResponse> {
    const updatedResponses = await db.update(schema.mentorResponses)
      .set({
        ...response,
        responseDate: new Date()
      })
      .where(sql`id = ${id}`)
      .returning();
    
    if (updatedResponses.length === 0) {
      throw new Error("Mentor response not found");
    }
    
    const updatedResponse = updatedResponses[0];
    
    // Update slot status based on updated response
    if (updatedResponse.slotId && response.status) {
      const slots = await db.select().from(schema.discussionSlots).where(sql`id = ${updatedResponse.slotId}`);
      
      if (slots.length > 0) {
        let updatedStatus: "pending" | "confirmed" | "cancelled" | "rescheduled" = "pending";
        
        if (updatedResponse.status === "accepted") {
          updatedStatus = "confirmed";
        } else if (updatedResponse.status === "declined" && !updatedResponse.alternativeMentorId) {
          updatedStatus = "cancelled";
        } else if (updatedResponse.status === "declined" && updatedResponse.alternativeMentorId) {
          updatedStatus = "rescheduled";
        }
        
        await db.update(schema.discussionSlots)
          .set({ status: updatedStatus })
          .where(sql`id = ${updatedResponse.slotId}`);
        
        // If mentor changed response to declined, notify students who booked the slot
        if (response.status === "declined") {
          this.notifyStudentsOfChange(updatedResponse.slotId, updatedStatus, updatedResponse.reason);
        }
      }
    }
    
    return updatedResponse;
  }

  // Mentor Availability methods
  async setMentorAvailability(availability: Omit<MentorAvailability, "id">): Promise<MentorAvailability> {
    const insertedAvailabilities = await db.insert(schema.mentorAvailability).values(availability).returning();
    return insertedAvailabilities[0];
  }

  async getMentorAvailability(mentorId: number): Promise<MentorAvailability[]> {
    return await db.select()
      .from(schema.mentorAvailability)
      .where(sql`mentor_id = ${mentorId}`);
  }

  async deleteMentorAvailability(id: number): Promise<void> {
    const result = await db.delete(schema.mentorAvailability).where(sql`id = ${id}`).returning();
    
    if (result.length === 0) {
      throw new Error("Mentor availability not found");
    }
  }

  // Helper method to notify students when a slot status changes
  private async notifyStudentsOfChange(slotId: number, newStatus: string, reason?: string | null): Promise<void> {
    const bookings = await this.getSlotBookings(slotId);
    const slots = await db.select().from(schema.discussionSlots).where(sql`id = ${slotId}`);
    
    if (slots.length === 0) return;
    
    const slot = slots[0];
    
    // Create notifications for all students who booked this slot
    for (const booking of bookings) {
      let message = '';
      
      if (newStatus === 'cancelled') {
        message = `Your group discussion "${slot.topic}" scheduled for ${new Date(slot.startTime).toLocaleString()} has been cancelled.`;
        if (reason) message += ` Reason: ${reason}`;
      } else if (newStatus === 'rescheduled') {
        message = `Your group discussion "${slot.topic}" scheduled for ${new Date(slot.startTime).toLocaleString()} has been rescheduled with a different mentor.`;
        if (reason) message += ` Reason: ${reason}`;
      }
      
      await this.createNotification({
        userId: booking.userId,
        type: newStatus === 'cancelled' ? 'cancellation' : 'update',
        message,
        relatedId: slotId,
        isRead: false,
        date: new Date()
      });
    }
  }
}

// Choose the appropriate storage implementation based on environment
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage() 
  : new MemStorage();