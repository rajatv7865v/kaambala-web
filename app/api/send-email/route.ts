import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email configuration - Update these with your actual email settings
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '', // Your email
    pass: process.env.SMTP_PASS || '', // Your email password or app password
  },
};

// Recipient email - where you want to receive the emails
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'info@kaambala.com';

// Input sanitization function
function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/[<>]/g, ''); // Remove potential HTML tags
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation (basic)
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...formData } = body;

    // Validate form type
    if (!type || (type !== 'contact' && type !== 'enquiry')) {
      return NextResponse.json(
        { success: false, error: 'Invalid form type. Must be "contact" or "enquiry".' },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    const sanitizedData: any = {};
    for (const key in formData) {
      if (typeof formData[key] === 'string') {
        sanitizedData[key] = sanitizeInput(formData[key]);
      } else {
        sanitizedData[key] = formData[key];
      }
    }

    // Validate required fields based on type
    if (type === 'contact') {
      if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.subject || !sanitizedData.message) {
        return NextResponse.json(
          { success: false, error: 'Missing required fields: name, email, subject, and message are required.' },
          { status: 400 }
        );
      }
      
      // Validate email format
      if (!isValidEmail(sanitizedData.email)) {
        return NextResponse.json(
          { success: false, error: 'Invalid email address format.' },
          { status: 400 }
        );
      }

      // Validate field lengths
      if (sanitizedData.name.length > 100) {
        return NextResponse.json(
          { success: false, error: 'Name is too long (max 100 characters).' },
          { status: 400 }
        );
      }
      if (sanitizedData.message.length > 2000) {
        return NextResponse.json(
          { success: false, error: 'Message is too long (max 2000 characters).' },
          { status: 400 }
        );
      }
    } else if (type === 'enquiry') {
      if (!sanitizedData.name || !sanitizedData.phone || !sanitizedData.service || !sanitizedData.message) {
        return NextResponse.json(
          { success: false, error: 'Missing required fields: name, phone, service, and message are required.' },
          { status: 400 }
        );
      }

      // Validate phone format
      if (!isValidPhone(sanitizedData.phone)) {
        return NextResponse.json(
          { success: false, error: 'Invalid phone number format.' },
          { status: 400 }
        );
      }

      // Validate email if provided
      if (sanitizedData.email && !isValidEmail(sanitizedData.email)) {
        return NextResponse.json(
          { success: false, error: 'Invalid email address format.' },
          { status: 400 }
        );
      }

      // Validate field lengths
      if (sanitizedData.name.length > 100) {
        return NextResponse.json(
          { success: false, error: 'Name is too long (max 100 characters).' },
          { status: 400 }
        );
      }
      if (sanitizedData.message.length > 2000) {
        return NextResponse.json(
          { success: false, error: 'Message is too long (max 2000 characters).' },
          { status: 400 }
        );
      }
    }

    // Create transporter
    const transporter = nodemailer.createTransport(EMAIL_CONFIG);

    // Email content based on type
    let subject = '';
    let htmlContent = '';

    if (type === 'contact') {
      subject = `Contact Form: ${sanitizedData.subject}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #e56481; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
            ${sanitizedData.phone ? `<p><strong>Phone:</strong> <a href="tel:${sanitizedData.phone}">${sanitizedData.phone}</a></p>` : ''}
            <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-left: 4px solid #e56481; margin-top: 10px; white-space: pre-wrap;">
              ${sanitizedData.message.replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This email was sent from the Kaambala website contact form at ${new Date().toLocaleString()}.
          </p>
        </div>
      `;
    } else if (type === 'enquiry') {
      const serviceNames: { [key: string]: string } = {
        'beauty-salon': 'Beauty & Salon',
        'cleaning': 'Home Cleaning',
        'ac-repair': 'AC & Repair',
        'plumbing': 'Plumbing',
        'electrician': 'Electrician',
        'carpenter': 'Carpenter',
        'painting': 'Painting',
        'other': 'Other'
      };
      const serviceDisplayName = serviceNames[sanitizedData.service] || sanitizedData.service;
      
      subject = `Service Enquiry: ${serviceDisplayName}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #e56481; padding-bottom: 10px;">
            New Service Enquiry
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Phone:</strong> <a href="tel:${sanitizedData.phone}">${sanitizedData.phone}</a></p>
            ${sanitizedData.email ? `<p><strong>Email:</strong> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>` : ''}
            <p><strong>Service Type:</strong> ${serviceDisplayName}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-left: 4px solid #e56481; margin-top: 10px; white-space: pre-wrap;">
              ${sanitizedData.message.replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This email was sent from the Kaambala website enquiry form at ${new Date().toLocaleString()}.
          </p>
        </div>
      `;
    }

    // Check if email config is set up
    if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
      console.error('Email configuration is missing. Please set SMTP_USER and SMTP_PASS in environment variables.');
      return NextResponse.json(
        { success: false, error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Send email
    const info = await transporter.sendMail({
      from: `"Kaambala Website" <${EMAIL_CONFIG.auth.user}>`,
      to: RECIPIENT_EMAIL,
      replyTo: sanitizedData.email || EMAIL_CONFIG.auth.user,
      subject: subject,
      html: htmlContent,
      // Add text version for email clients that don't support HTML
      text: type === 'contact' 
        ? `Contact Form Submission\n\nName: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\n${sanitizedData.phone ? `Phone: ${sanitizedData.phone}\n` : ''}Subject: ${sanitizedData.subject}\n\nMessage:\n${sanitizedData.message}`
        : `Service Enquiry\n\nName: ${sanitizedData.name}\nPhone: ${sanitizedData.phone}\n${sanitizedData.email ? `Email: ${sanitizedData.email}\n` : ''}Service: ${sanitizedData.service}\n\nMessage:\n${sanitizedData.message}`,
    });

    console.log('Email sent:', info.messageId);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}

