import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async ({
  to,
  subject,
  body
}: {
  to: string;
  subject: string;
  body: string;
}) => {
  try {
    await resend.emails.send({
      from: process.env.SENDER_ADDRESS!,
      to,
      subject,
      html: body
    });
  } catch (error) {
    console.error('Error sending email', error);
    throw new Error('Email failed to send.')
  }
};
