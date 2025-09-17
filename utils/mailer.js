const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

async function sendVerificationEmail(to, otp) {
  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif">
      <h2>Verify your email</h2>
      <p>Your OTP is:</p>
      <div style="font-size:24px;font-weight:700;letter-spacing:4px">${otp}</div>
      <p>This code expires in ${process.env.OTP_EXP_MINUTES || 10} minutes.</p>
    </div>
  `;
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: 'Verify your email',
    text: `Your OTP is ${otp} (expires in ${process.env.OTP_EXP_MINUTES || 10} minutes).`,
    html,
  });
}

module.exports = { sendVerificationEmail };
