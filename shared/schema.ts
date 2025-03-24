import { pgTable, text, serial, integer, boolean, timestamp, json, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["student", "teacher"] }).notNull(),
  department: text("department", { enum: ["CS", "IT", "MCA"] }).notNull(),
  year: text("year", { enum: ["1", "2", "3", "4"] }).notNull(),
  batch: text("batch", { enum: ["A", "B", "C"] }).notNull(),
  teacherId: integer("teacher_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  // Ensure unique teacher per department, year, and batch combination
  teacherConstraint: unique().on(table.department, table.year, table.batch)
    .where(sql`${table.role} = 'teacher'`)
}));

export const tests = pgTable("tests", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type", { enum: ["aptitude", "technical", "psychometric"] }).notNull(),
  questions: json("questions").$type<{
    question: string;
    options: string[];
    correctAnswer: number;
  }[]>().notNull(),
  createdBy: integer("created_by").references(() => users.id),
});

export const testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  testId: integer("test_id").references(() => tests.id),
  score: integer("score").notNull(),
  insights: json("insights").$type<{
    category: string;
    insights: string[];
    recommendations?: string[];
  }>(),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const discussionSlots = pgTable("discussion_slots", {
  id: serial("id").primaryKey(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  mentorId: integer("mentor_id").references(() => users.id),
  maxParticipants: integer("max_participants").notNull().default(6),
  topic: text("topic").notNull(),
  // Add fields for batch-specific slots
  department: text("department", { enum: ["CS", "IT", "MCA"] }).notNull(),
  year: text("year", { enum: ["1", "2", "3", "4"] }).notNull(),
  batch: text("batch", { enum: ["A", "B", "C"] }).notNull(),
});

export const slotBookings = pgTable("slot_bookings", {
  id: serial("id").primaryKey(),
  slotId: integer("slot_id").references(() => discussionSlots.id),
  userId: integer("user_id").references(() => users.id),
  bookedAt: timestamp("booked_at").defaultNow(),
});

// Update insert schemas with new fields
export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true,
  teacherId: true // This will be set by the backend
});

export const insertTestSchema = createInsertSchema(tests).omit({ id: true });
export const insertTestResultSchema = createInsertSchema(testResults).omit({ 
  id: true, 
  completedAt: true 
});
export const insertDiscussionSlotSchema = createInsertSchema(discussionSlots).omit({ id: true });
export const insertSlotBookingSchema = createInsertSchema(slotBookings).omit({ id: true, bookedAt: true });

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Test = typeof tests.$inferSelect;
export type TestResult = typeof testResults.$inferSelect;
export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
export type DiscussionSlot = typeof discussionSlots.$inferSelect;
export type SlotBooking = typeof slotBookings.$inferSelect;