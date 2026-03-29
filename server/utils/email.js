const nodemailer = require('nodemailer');

const getMailerConfig = () => ({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
  to: process.env.ALERT_EMAIL_TO,
  from: process.env.SMTP_FROM,
});

const getMissingMailerKeys = (config) => {
  const missingKeys = [];

  if (!config.host) missingKeys.push('SMTP_HOST');
  if (!config.port) missingKeys.push('SMTP_PORT');
  if (!config.user) missingKeys.push('SMTP_USER');
  if (!config.pass) missingKeys.push('SMTP_PASS');
  if (!config.to) missingKeys.push('ALERT_EMAIL_TO');

  return missingKeys;
};

const sendContactNotificationEmail = async ({ name, phone, message, createdAt }) => {
  const config = getMailerConfig();
  const missingKeys = getMissingMailerKeys(config);

  if (missingKeys.length) {
    console.warn(
      `Email alerts are disabled. Missing SMTP configuration: ${missingKeys.join(', ')}`,
    );
    return { sent: false, reason: 'missing-config' };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const submittedAt = new Date(createdAt || Date.now()).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const subject = `New Loan Inquiry from ${name}`;

  const text = [
    'You received a new contact request from Manish Dutt Loan Services website.',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Message: ${message}`,
    `Submitted At: ${submittedAt}`,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 12px;">New Loan Inquiry Received</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${name}</p>
      <p style="margin: 0 0 8px;"><strong>Phone:</strong> ${phone}</p>
      <p style="margin: 0 0 8px;"><strong>Submitted At:</strong> ${submittedAt}</p>
      <p style="margin: 12px 0 6px;"><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; margin: 0;">${message}</p>
    </div>
  `;

  await transporter.sendMail({
    from: config.from || config.user,
    to: config.to,
    subject,
    text,
    html,
  });

  return { sent: true };
};

module.exports = {
  sendContactNotificationEmail,
};
