import nodemailer from 'nodemailer';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Punchline Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📩 New ${data.type || 'Contact'} Submission`,
      html: `
        <h2>New Submission</h2>
        <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
        <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
        <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
        <p><strong>Service:</strong> ${data.service || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message || 'N/A'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
}
