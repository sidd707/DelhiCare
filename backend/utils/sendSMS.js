import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const client = twilio(accountSid, authToken);

export const sendSms = async (to, message) => {
  try {
    const sms = await client.messages.create({
      body: message,
      messagingServiceSid: messagingServiceSid,
      to: to, 
    });

    console.log(`SMS sent to ${to}: ${sms.sid}`);
    return sms.sid;
  } catch (error) {
    console.error(`Failed to send SMS to ${to}:`, error.message);
    throw new Error(`Failed to send SMS: ${error.message}`);
  }
};
