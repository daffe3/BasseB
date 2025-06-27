import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    if (!formData.name || !formData.email || !formData.eventDate || !formData.numGuests) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: process.env.EMAIL_USER,
      subject: `New Catering Inquiry from ${formData.name}`,
      html: `
        <p>You have a new catering inquiry!</p>
        <h3>Customer Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.phone || 'N/A'}</li>
        </ul>
        <h3>Event Details:</h3>
        <ul>
          <li><strong>Preferred Event Date:</strong> ${formData.eventDate}</li>
          <li><strong>Type of Event:</strong> ${formData.eventType}</li>
          <li><strong>Number of Guests:</strong> ${formData.numGuests}</li>
          <li><strong>Estimated Budget:</strong> ${formData.budget || 'N/A'}</li>
        </ul>
        <h3>Additional Details/Requests:</h3>
        <p>${formData.message || 'N/A'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Inquiry submitted successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error submitting inquiry:', error);
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
         return NextResponse.json({ message: 'Email sending failed: Invalid credentials. Check EMAIL_USER and EMAIL_PASS in .env.local.' }, { status: 500 });
      }
      return NextResponse.json({ message: `Error submitting inquiry: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}