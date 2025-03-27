#!/usr/bin/env node
// Usage: node update-sendgrid-cli.js "YOUR_API_KEY" "your-verified@email.com"

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get command line arguments
const apiKey = process.argv[2] || '';
const senderEmail = process.argv[3] || '';

if (!apiKey || !senderEmail) {
  console.error('Usage: node update-sendgrid-cli.js "YOUR_API_KEY" "your-verified@email.com"');
  process.exit(1);
}

const emailServicePath = path.join(__dirname, 'server', 'emailService.ts');

try {
  // Read the current file
  const data = fs.readFileSync(emailServicePath, 'utf8');

  // Update the file content
  let updatedData = data;
  updatedData = updatedData.replace(
    /export const SENDGRID_API_KEY = "([^"]+)"/,
    `export const SENDGRID_API_KEY = "${apiKey}"`
  );
  updatedData = updatedData.replace(
    /export const VERIFIED_SENDER_EMAIL = "([^"]+)"/,
    `export const VERIFIED_SENDER_EMAIL = "${senderEmail}"`
  );

  // Write the updated content back to the file
  fs.writeFileSync(emailServicePath, updatedData, 'utf8');

  console.log('-----------------------------------------------------');
  console.log('SendGrid configuration updated successfully!');
  console.log('-----------------------------------------------------');
  console.log(`API key: ${apiKey === "YOUR_SENDGRID_API_KEY_HERE" || apiKey === "SG.TEST123456789.DUMMY_KEY_FOR_TEST" ? "not set" : "updated"}`);
  console.log(`Sender email: ${senderEmail}`);
  console.log('\nIMPORTANT: Make sure your sender email is verified in SendGrid!');
  console.log('Restart the server for changes to take effect.');
  console.log('-----------------------------------------------------');

} catch (error) {
  console.error('Error updating SendGrid configuration:', error);
  process.exit(1);
}