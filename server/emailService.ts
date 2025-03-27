import { MailService } from '@sendgrid/mail';

// Force initialize the SendGrid client to check the API key
let mailService: MailService | null = null;

// Initialize SendGrid client
function initializeMailService() {
  try {
    // This is a more robust check for the API key
    const apiKey = process.env.SENDGRID_API_KEY;
    
    if (!apiKey) {
      console.warn('SendGrid API key not found in environment variables');
      return null;
    }

    console.log(`Initializing SendGrid with API key starting with ${apiKey.substring(0, 4)}...`);
    
    const service = new MailService();
    service.setApiKey(apiKey);
    
    return service;
  } catch (error) {
    console.error('Error initializing SendGrid client:', error);
    return null;
  }
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string | undefined;
  html?: string | undefined;
}

/**
 * Sends an email using SendGrid
 * @param params Email parameters
 * @returns Boolean indicating success or failure
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  // Lazy initialization of the mail service
  if (!mailService) {
    mailService = initializeMailService();
  }
  
  // If SendGrid is still not configured, log a message and return
  if (!mailService) {
    console.log('SendGrid not configured, would have sent:', params);
    return false;
  }

  try {
    const mailData: any = {
      to: params.to,
      from: params.from,
      subject: params.subject,
    };
    
    if (params.text) mailData.text = params.text;
    if (params.html) mailData.html = params.html;
    
    console.log(`Attempting to send email to: ${params.to}`);
    console.log(`Email from: ${params.from}`);
    
    await mailService.send(mailData);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    
    // Log more details about the error for debugging
    if (error.response) {
      console.error('SendGrid API error details:', {
        status: error.response.status,
        body: error.response.body,
        errors: error.response.body?.errors
      });
    }
    
    return false;
  }
}

// Helper function to generate acceptance/rejection links
export function generateMentorResponseLinks(slotId: number, acceptToken: string, rejectToken: string, baseUrl: string): { acceptUrl: string, rejectUrl: string } {
  return {
    acceptUrl: `${baseUrl}/api/mentor-response/${slotId}/accept?token=${acceptToken}`,
    rejectUrl: `${baseUrl}/api/mentor-response/${slotId}/reject?token=${rejectToken}`
  };
}

/**
 * Sends a mentor request email
 * @param mentorEmail Mentor's email address
 * @param mentorName Mentor's name
 * @param slotDetails Discussion slot details
 * @param responseLinks URLs for accept/reject actions
 * @param teacherName Name of the teacher who sent the request
 * @returns Boolean indicating success or failure
 */
export async function sendMentorRequestEmail(
  mentorEmail: string,
  mentorName: string,
  slotDetails: {
    id: number;
    topic: string;
    startTime: Date;
    endTime: Date;
    department: string;
    year: string;
    batch: string;
  },
  responseLinks: {
    acceptUrl: string;
    rejectUrl: string;
  },
  teacherName: string
): Promise<boolean> {
  const startTimeStr = new Date(slotDetails.startTime).toLocaleString();
  const endTimeStr = new Date(slotDetails.endTime).toLocaleString();

  // NOTE: The sender email must be verified in your SendGrid account
  // If the app shows "email sent successfully" but no email is received,
  // go to SendGrid and verify this email or change to your verified email
  const emailParams: EmailParams = {
    to: mentorEmail,
    from: 'projectfirthreeupdates@gmail.com', // This must be a verified sender in your SendGrid account
    subject: 'Group Discussion Mentor Request',
    text: `
      Hello ${mentorName},

      You've been invited by ${teacherName} to be a mentor for a group discussion:
      
      Topic: ${slotDetails.topic || 'Open Discussion'}
      Time: ${startTimeStr} - ${endTimeStr}
      Department: ${slotDetails.department}
      Year: ${slotDetails.year}
      Batch: ${slotDetails.batch}
      
      To ACCEPT this request, click here: ${responseLinks.acceptUrl}
      To DECLINE this request, click here: ${responseLinks.rejectUrl}
      
      Thank you for your consideration.
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #4a4a4a;">Group Discussion Mentor Request</h2>
        <p>Hello <strong>${mentorName}</strong>,</p>
        <p>You've been invited by <strong>${teacherName}</strong> to be a mentor for a group discussion:</p>
        
        <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Topic:</strong> ${slotDetails.topic || 'Open Discussion'}</p>
          <p><strong>Time:</strong> ${startTimeStr} - ${endTimeStr}</p>
          <p><strong>Department:</strong> ${slotDetails.department}</p>
          <p><strong>Year:</strong> ${slotDetails.year}</p>
          <p><strong>Batch:</strong> ${slotDetails.batch}</p>
        </div>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${responseLinks.acceptUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">ACCEPT</a>
          <a href="${responseLinks.rejectUrl}" style="display: inline-block; background-color: #f44336; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">DECLINE</a>
        </div>
        
        <p>Thank you for your consideration.</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">This is an automated message, please do not reply to this email.</p>
      </div>
    `
  };

  return await sendEmail(emailParams);
}

/**
 * Sends a notification email to the teacher about the mentor's response
 */
export async function sendMentorResponseNotificationEmail(
  teacherEmail: string,
  teacherName: string,
  mentorName: string,
  status: 'accepted' | 'declined',
  slotDetails: {
    topic: string;
    startTime: Date;
    endTime: Date;
  },
  declineReason?: string
): Promise<boolean> {
  const startTimeStr = new Date(slotDetails.startTime).toLocaleString();
  const endTimeStr = new Date(slotDetails.endTime).toLocaleString();
  
  const statusText = status === 'accepted' ? 'accepted' : 'declined';
  const statusColor = status === 'accepted' ? '#4CAF50' : '#f44336';
  
  // NOTE: The sender email must be verified in your SendGrid account
  const emailParams: EmailParams = {
    to: teacherEmail,
    from: 'projectfirthreeupdates@gmail.com', // This must be a verified sender in your SendGrid account
    subject: `Mentor Request ${status === 'accepted' ? 'Accepted' : 'Declined'}: ${slotDetails.topic}`,
    text: `
      Hello ${teacherName},
      
      ${mentorName} has ${statusText} your request to mentor the group discussion:
      
      Topic: ${slotDetails.topic || 'Open Discussion'}
      Time: ${startTimeStr} - ${endTimeStr}
      
      ${status === 'declined' && declineReason ? `Reason for declining: ${declineReason}` : ''}
      
      ${status === 'accepted' 
        ? 'The discussion slot is now confirmed and students can book it.' 
        : 'Please find another mentor for this discussion slot or reschedule it.'}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #4a4a4a;">Mentor Request ${status === 'accepted' ? 'Accepted' : 'Declined'}</h2>
        <p>Hello <strong>${teacherName}</strong>,</p>
        <p><strong>${mentorName}</strong> has <span style="color: ${statusColor};">${statusText}</span> your request to mentor the group discussion:</p>
        
        <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Topic:</strong> ${slotDetails.topic || 'Open Discussion'}</p>
          <p><strong>Time:</strong> ${startTimeStr} - ${endTimeStr}</p>
        </div>
        
        ${status === 'declined' && declineReason ? 
          `<div style="background-color: #fff3f3; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #f44336;">
            <p><strong>Reason for declining:</strong> ${declineReason}</p>
          </div>` : ''}
        
        <p>${status === 'accepted' 
          ? 'The discussion slot is now confirmed and students can book it.' 
          : 'Please find another mentor for this discussion slot or reschedule it.'}</p>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">This is an automated message, please do not reply to this email.</p>
      </div>
    `
  };
  
  return await sendEmail(emailParams);
}