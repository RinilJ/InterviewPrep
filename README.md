# Interview Preparation Platform

A comprehensive platform designed to help students prepare for interviews through aptitude tests, technical assessments, and psychometric evaluations, with integrated group discussion management.

## Features

### For Students
- **Aptitude Tests**: Practice with various question types including verbal, mathematical, and non-verbal reasoning.
- **Technical Assessments**: Master technical concepts with language-specific (Java/Python) challenges in DSA, OOP, and debugging.
- **Psychometric Assessments**: Gain insights into personality traits with Big Five, MBTI, and other psychological tests.
- **Group Discussion Sessions**: Book slots for group discussions supervised by mentors.
- **Progress Tracking**: Monitor performance across different test types and review past results.

### For Teachers
- **Student Management**: Track students from the same department, year, and batch.
- **Group Discussion Management**: Create, edit, and manage discussion slots.
- **Mentor Coordination**: Invite external mentors to facilitate group discussions via email.
- **Analytics Dashboard**: View student participation and performance metrics.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database (already configured in the Replit environment)
- SendGrid API key (for email notifications)
- OpenAI API key (for dynamic question generation)

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - `DATABASE_URL`: PostgreSQL connection string (if using a database)
   - `SENDGRID_API_KEY`: API key for SendGrid email service
   - `OPENAI_API_KEY`: API key for OpenAI services
   - `SESSION_SECRET`: Secret for session encryption

4. Start the application:
   ```
   npm run dev
   ```

## Usage

### Student Journey
1. **Register/Login**: Create an account with your student details.
2. **Take Tests**: Select from various aptitude, technical, or psychometric tests.
3. **View Results**: Review your performance and gain personalized insights.
4. **Book Discussion Slots**: Join group discussions to enhance your interview skills.

### Teacher Journey
1. **Register/Login**: Create an account with teacher privileges.
2. **Manage Students**: View students assigned to your department, year, and batch.
3. **Create Discussion Slots**: Schedule group discussions and invite mentors.
4. **Track Progress**: Monitor student performance and participation.

## Technical Overview

### Architecture
- **Frontend**: HTML, CSS, JavaScript with modular components
- **Backend**: Node.js with Express and TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session-based authentication
- **Email Service**: SendGrid for mentor invitations and notifications
- **AI Integration**: OpenAI for dynamic question generation

### Assessment Modules
- **Aptitude**: 
  - Verbal: Reading comprehension, analogies, synonyms/antonyms
  - Mathematical: Profit/loss, percentages, geometry
  - Non-verbal: Logical reasoning, pattern recognition

- **Technical**:
  - Data Structures & Algorithms (DSA)
  - Object-Oriented Programming (OOP)
  - Debugging challenges
  - Language-specific questions (Java/Python)

- **Psychometric**:
  - Big Five personality traits
  - Myers-Briggs Type Indicator (MBTI)
  - Other psychological assessments

### Group Discussion System
- Role-based access control (students, teachers, mentors)
- Email notifications for mentor invitations
- Real-time slot booking and management
- Participant tracking

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Special thanks to all contributors and testers
- Inspired by modern interview preparation methods and techniques