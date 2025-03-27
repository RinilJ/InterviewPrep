#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const emailServicePath = path.join(__dirname, 'server', 'emailService.ts');

// Read the current file
fs.readFile(emailServicePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading emailService.ts:', err);
    process.exit(1);
  }

  // Extract the current values
  const apiKeyMatch = data.match(/export const SENDGRID_API_KEY = "([^"]+)"/);
  const senderEmailMatch = data.match(/export const VERIFIED_SENDER_EMAIL = "([^"]+)"/);

  const currentApiKey = apiKeyMatch ? apiKeyMatch[1] : "YOUR_SENDGRID_API_KEY_HERE";
  const currentSenderEmail = senderEmailMatch ? senderEmailMatch[1] : "projectfirthreeupdates@gmail.com";

  console.log('-----------------------------------------------------');
  console.log('SendGrid Configuration Update Tool');
  console.log('-----------------------------------------------------');
  console.log('This tool updates your SendGrid API key and sender email');
  console.log('in the emailService.ts file.\n');

  // Prompt for API key
  rl.question(`Enter your SendGrid API key [current: ${currentApiKey === "YOUR_SENDGRID_API_KEY_HERE" || currentApiKey === "SG.TEST123456789.DUMMY_KEY_FOR_TEST" ? "not set" : "hidden for security"}]: `, (apiKey) => {
    // Use the current value if nothing is entered
    apiKey = apiKey.trim() || currentApiKey;

    // Prompt for sender email
    rl.question(`Enter your verified SendGrid sender email [current: ${currentSenderEmail}]: `, (senderEmail) => {
      // Use the current value if nothing is entered
      senderEmail = senderEmail.trim() || currentSenderEmail;

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
      fs.writeFile(emailServicePath, updatedData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing to emailService.ts:', err);
          process.exit(1);
        }

        console.log('\n-----------------------------------------------------');
        console.log('SendGrid configuration updated successfully!');
        console.log('-----------------------------------------------------');
        console.log(`API key: ${apiKey === "YOUR_SENDGRID_API_KEY_HERE" || apiKey === "SG.TEST123456789.DUMMY_KEY_FOR_TEST" ? "not set" : "updated"}`);
        console.log(`Sender email: ${senderEmail}`);
        console.log('\nIMPORTANT: Make sure your sender email is verified in SendGrid!');
        console.log('Restart the server for changes to take effect.');
        console.log('-----------------------------------------------------');

        rl.close();
      });
    });
  });
});