const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON body' }),
    };
  }

  const {
    type,
    email,
    fullName,
    company,
    service,
    message,
  } = data;

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Email is required' }),
    };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let subject = '';
  let html = '';

  if (type === 'newsletter') {
    subject = 'New Newsletter Subscription';
    html = `<p><strong>Email:</strong> ${email}</p>`;
  } else {
    subject = 'New Contact Form Submission';
    html = `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${fullName || 'N/A'}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${service || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'N/A'}</p>
    `;
  }

  try {
    await transporter.sendMail({
      from: `"Punchline Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject,
      html,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' }),
    };
  }
};
