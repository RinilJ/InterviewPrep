import pkg from 'pg';
const { Pool } = pkg;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../shared/schema';

// Create database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  console.log('Starting migration...');
  
  // Create tables
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      department TEXT NOT NULL,
      year TEXT NOT NULL,
      batch TEXT NOT NULL,
      teacher_id INTEGER,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS tests (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      questions JSONB NOT NULL,
      created_by INTEGER REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS test_results (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      test_id INTEGER REFERENCES tests(id),
      score INTEGER NOT NULL,
      insights JSONB,
      completed_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS discussion_slots (
      id SERIAL PRIMARY KEY,
      start_time TIMESTAMP NOT NULL,
      end_time TIMESTAMP NOT NULL,
      mentor_id INTEGER REFERENCES users(id),
      max_participants INTEGER NOT NULL DEFAULT 6,
      topic TEXT NOT NULL,
      department TEXT NOT NULL,
      year TEXT NOT NULL,
      batch TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_by INTEGER REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS slot_bookings (
      id SERIAL PRIMARY KEY,
      slot_id INTEGER REFERENCES discussion_slots(id),
      user_id INTEGER REFERENCES users(id),
      booked_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) NOT NULL,
      type TEXT NOT NULL,
      message TEXT NOT NULL,
      related_id INTEGER,
      is_read BOOLEAN NOT NULL DEFAULT FALSE,
      date TIMESTAMP DEFAULT NOW() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS mentor_responses (
      id SERIAL PRIMARY KEY,
      slot_id INTEGER REFERENCES discussion_slots(id) NOT NULL,
      mentor_id INTEGER REFERENCES users(id) NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      reason TEXT,
      response_date TIMESTAMP DEFAULT NOW(),
      alternative_mentor_id INTEGER REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS mentor_availability (
      id SERIAL PRIMARY KEY,
      mentor_id INTEGER REFERENCES users(id) NOT NULL,
      day_of_week INTEGER NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      recurring BOOLEAN DEFAULT TRUE,
      specific_date TIMESTAMP
    );

    -- Add foreign key constraint for teacher_id in users table
    ALTER TABLE users ADD CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES users(id);
  `);

  console.log('Migration completed successfully!');
  process.exit(0);
}

main().catch(e => {
  console.error('Migration failed:', e);
  process.exit(1);
});