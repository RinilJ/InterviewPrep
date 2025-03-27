# Interview Preparation Platform

An advanced AI-driven interview preparation platform that combines sophisticated testing methodologies with engaging user experience design to assess candidates' technical and psychological attributes.

## Features

- **Aptitude Testing:** Verbal, Non-Verbal, and Mathematical aptitude assessment
- **Technical Testing:** DSA, OOP, and Debugging challenges in Java and Python
- **Psychometric Testing:** MBTI and Big Five personality assessments
- **Group Discussion:** Schedule and manage group discussions with mentor integration
- **Progress Tracking:** Comprehensive test result tracking and analysis
- **Email Integration:** SendGrid-based notifications for group discussion scheduling

## Setting Up SendGrid Email Functionality

This application uses SendGrid for sending emails. Follow these steps to configure SendGrid:

### Option 1: Using the Command-line Update Script (Recommended)

1. Run the command-line update script with your credentials:
   ```
   node update-sendgrid-cli.js "YOUR_SENDGRID_API_KEY" "your-verified@email.com"
   ```

2. The script will automatically update the configuration file with your:
   - SendGrid API key
   - Verified sender email

3. Restart the server for changes to take effect.

### Option 2: Using the Interactive Update Script

1. Run the interactive update script:
   ```
   node update-sendgrid.js
   ```

2. Follow the prompts to enter your:
   - SendGrid API key
   - Verified sender email

3. Restart the server for changes to take effect.

### Option 3: Manual Configuration

1. Open `server/emailService.ts`
2. Update the constants at the top of the file:
   ```typescript
   export const SENDGRID_API_KEY = "YOUR_SENDGRID_API_KEY_HERE";
   export const VERIFIED_SENDER_EMAIL = "your-verified@email.com";
   ```
3. Restart the server for changes to take effect.

### Verifying SendGrid Integration

1. Access the test endpoint: http://localhost:5000/api/test-sendgrid
2. Check the server logs and response for status information.

## Important Notes

- You must use a verified sender email in SendGrid.
- The sender email must be verified in your SendGrid account to avoid delivery failures.
- If email sending fails but API key appears correct, check the sender email verification status in your SendGrid dashboard.

## Running the Application

1. Start the application:
   ```
   npm run dev
   ```

2. Access the application at: http://localhost:5000