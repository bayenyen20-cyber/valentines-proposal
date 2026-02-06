import nodemailer from 'nodemailer';

export async function sendEmailNotification(userName: string, userEmail: string) {
  // Skip if email is not configured
  if (!process.env.SMTP_USER || !process.env.NOTIFICATION_EMAIL) {
    console.log('Email not configured - skipping notification');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: '💖 She Said YES! - Valentine\'s Day Proposal',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 100%);">
          <h1 style="color: #e91e63; text-align: center; font-size: 32px;">🎉 Amazing News! 🎉</h1>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px 0;">
            <h2 style="color: #c2185b; margin-top: 0;">💖 She Said YES! 💖</h2>
            <p style="font-size: 18px; color: #333; line-height: 1.6;">
              <strong>${userName}</strong> just accepted your Valentine's Day proposal!
            </p>
            
            <div style="background: #fff3f8; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #e91e63;">
              <p style="margin: 5px 0; color: #666;"><strong>Name:</strong> ${userName}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> ${userEmail}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p style="font-size: 16px; color: #666; line-height: 1.6;">
              Time to start planning that perfect Valentine's Day date! 🌹✨
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #999; font-size: 14px;">💕 Sent from your Valentine's Proposal System 💕</p>
          </div>
        </div>
      `,
    });

    console.log('Email notification sent successfully!');
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

export async function sendConsoleNotification(userName: string, userEmail: string) {
  console.log('\n' + '='.repeat(60));
  console.log('🎉💖 VALENTINE\'S DAY PROPOSAL ACCEPTED! 💖🎉');
  console.log('='.repeat(60));
  console.log(`Name: ${userName}`);
  console.log(`Email: ${userEmail}`);
  console.log(`Time: ${new Date().toLocaleString()}`);
  console.log('='.repeat(60) + '\n');
}
