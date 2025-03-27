# Interview Preparation Platform

An advanced AI-driven interview preparation platform that combines sophisticated testing methodologies with engaging user experience design to assess candidates' technical and psychological attributes.

## Features

- **Role-based Access**: Teachers and students have different views and capabilities
- **Aptitude Tests**: Verbal, non-verbal, and mathematical reasoning sections
- **Technical Assessments**: DSA, OOP, and debugging challenges for Java and Python
- **Psychometric Tests**: Big Five Personality, MBTI, and other psychological assessments
- **Group Discussion Management**: Create, schedule, and participate in group discussions
- **Mentor Integration**: Invite external mentors to group discussions via email
- **Progress Tracking**: Comprehensive analytics and insights for individuals and groups

## Environment Setup

This application requires the following environment variables:

- `DATABASE_URL` - Connection string for PostgreSQL database
- `SENDGRID_API_KEY` - API key for email functionality via SendGrid
- `OPENAI_API_KEY` - API key for generating technical questions

## Setting Up SendGrid Email

The application uses SendGrid for sending emails, particularly for the group discussion mentor request feature. For emails to work properly:

1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com/)
2. Obtain an API key and set it as `SENDGRID_API_KEY` in your environment
3. **Important**: Verify the sender email address in your SendGrid account
   - The default sender email in the application is set to "projectfirthreeupdates@gmail.com"
   - Either verify this email in your SendGrid account, or
   - Change the sender email in `server/emailService.ts` to your own verified email

### Sender Verification Issue

If you see "Email sent successfully" messages but no emails are actually received, the most likely cause is that your sender email isn't verified in SendGrid. This is a security measure by SendGrid to prevent email spoofing.

To fix this:
1. Go to SendGrid dashboard > Settings > Sender Authentication
2. Verify your sender email or domain
3. Update the `from` field in the email parameters in `server/emailService.ts` to match your verified sender

Even without verified email, the application will still function correctly - group discussion slots will be created and updated, but email notifications will not be sent.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up the required environment variables
4. Start the application with `npm run dev`
5. Access the application at http://localhost:5000

## User Types and Registration

- **Teachers**: Register with department, year, and batch assignments
- **Students**: Register with matching department, year, and batch to connect with their teacher

## Group Discussion System

1. Teachers create group discussion slots
2. Teachers can invite external mentors via email
3. Students can view and book slots
4. Both teachers and mentors receive notifications about bookings

## Test Tracking

- Aptitude and technical tests affect the student's average score
- Psychometric tests provide insights without affecting scores
- Students must answer all questions in psychometric tests to see results