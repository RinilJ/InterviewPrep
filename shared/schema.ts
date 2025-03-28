import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  role: text("role", { enum: ["student", "teacher"] }).notNull(),
  department: text("department").notNull(),
  year: text("year").notNull(),
  batch: text("batch").notNull(),
  teacherId: integer("teacher_id"), // Will be set up as a foreign key after table definition
  createdAt: timestamp("created_at").defaultNow(),
});

// Update insert schema with strict validation
// Add foreign key relationship after table declaration
sql`ALTER TABLE ${users} ADD CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES ${users} (id)`;

export const insertUserSchema = createInsertSchema(users)
  .omit({ 
    id: true, 
    createdAt: true,
    teacherId: true 
  })
  .extend({
    department: z.string().min(1),
    year: z.string().min(1),
    batch: z.string().min(1)
  });

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
  department: text("department").notNull(),
  year: text("year").notNull(),
  batch: text("batch").notNull(),
  status: text("status", { enum: ["pending", "confirmed", "cancelled", "rescheduled"] }).default("pending"),
  createdBy: integer("created_by").references(() => users.id),
});

export const slotBookings = pgTable("slot_bookings", {
  id: serial("id").primaryKey(),
  slotId: integer("slot_id").references(() => discussionSlots.id),
  userId: integer("user_id").references(() => users.id),
  bookedAt: timestamp("booked_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type", { enum: ["booking", "cancellation", "update", "mentor_assignment", "mentor_response", "substitution"] }).notNull(),
  message: text("message").notNull(),
  relatedId: integer("related_id").notNull(), // Can be slot ID or other related entity
  isRead: boolean("is_read").notNull().default(false),
  date: timestamp("date").defaultNow().notNull(),
});

// New tables for mentor responses and availability
export const mentorResponses = pgTable("mentor_responses", {
  id: serial("id").primaryKey(),
  slotId: integer("slot_id").references(() => discussionSlots.id).notNull(),
  mentorId: integer("mentor_id").references(() => users.id).notNull(),
  status: text("status", { enum: ["pending", "accepted", "declined", "tentative"] }).notNull().default("pending"),
  reason: text("reason"),
  responseDate: timestamp("response_date").defaultNow(),
  alternativeMentorId: integer("alternative_mentor_id").references(() => users.id),
});

export const mentorAvailability = pgTable("mentor_availability", {
  id: serial("id").primaryKey(),
  mentorId: integer("mentor_id").references(() => users.id).notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0-6 for Sunday-Saturday
  startTime: text("start_time").notNull(), // 24hr format "HH:MM"
  endTime: text("end_time").notNull(), // 24hr format "HH:MM"
  recurring: boolean("recurring").default(true),
  specificDate: timestamp("specific_date"), // For non-recurring availability
});

export const insertTestSchema = createInsertSchema(tests).omit({ id: true });
export const insertTestResultSchema = createInsertSchema(testResults).omit({ 
  id: true, 
  completedAt: true 
});
export const insertDiscussionSlotSchema = createInsertSchema(discussionSlots).omit({ id: true });
export const insertSlotBookingSchema = createInsertSchema(slotBookings).omit({ id: true, bookedAt: true });
export const insertNotificationSchema = createInsertSchema(notifications).omit({ id: true });
export const insertMentorResponseSchema = createInsertSchema(mentorResponses).omit({ id: true, responseDate: true });
export const insertMentorAvailabilitySchema = createInsertSchema(mentorAvailability).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Test = typeof tests.$inferSelect;
export type TestResult = typeof testResults.$inferSelect;
export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
export type DiscussionSlot = typeof discussionSlots.$inferSelect & { bookedCount?: number };
export type SlotBooking = typeof slotBookings.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type MentorResponse = typeof mentorResponses.$inferSelect;
export type InsertMentorResponse = z.infer<typeof insertMentorResponseSchema>;
export type MentorAvailability = typeof mentorAvailability.$inferSelect;
export type InsertMentorAvailability = z.infer<typeof insertMentorAvailabilitySchema>;