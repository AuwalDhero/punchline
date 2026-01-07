const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body || '{}');

    if (!data.email) {
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

    const subject =
      data.type === 'newsletter'
        ? 'New Newsletter Subscription'
        : 'New Contact Form Submission';

    const html =
      data.type === 'newsletter'
        ? `<p><strong>Email:</strong> ${data.email}</p>`
        : `
          <p><strong>Name:</strong> ${data.fullName || 'N/A'}</p>
          <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Service:</strong> ${data.service || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message || 'N/A'}</p>
        `;

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
    console.error('SEND EMAIL ERROR:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Email failed', error: error.message }),
    };
  }
};
