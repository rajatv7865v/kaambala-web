# Email Setup Guide

This guide will help you configure email sending for the contact form and enquiry modal.

## Prerequisites

- A Gmail account (or any SMTP-compatible email service)
- 2-Step Verification enabled on your Gmail account

## Setup Instructions

### 1. Create a `.env.local` file

Create a `.env.local` file in the root of your project with the following variables:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email address where you want to receive form submissions
RECIPIENT_EMAIL=info@kaambala.com
```

### 2. Generate Gmail App Password

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Scroll down to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "Kaambala Website" as the name
6. Click **Generate**
7. Copy the 16-character password (spaces will be removed automatically)
8. Paste it in your `.env.local` file as `SMTP_PASS`

### 3. Update Email Addresses

- **SMTP_USER**: Your Gmail address (e.g., `yourname@gmail.com`)
- **RECIPIENT_EMAIL**: The email address where you want to receive form submissions (can be the same as SMTP_USER or different)

### 4. Restart Your Development Server

After updating `.env.local`, restart your Next.js development server:

```bash
npm run dev
```

## Using Other Email Services

### Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo Mail

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### Custom SMTP Server

```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
```

## Testing

1. Fill out the contact form on `/contact` page
2. Or submit the enquiry form from the "Enquiry Now" button in the header
3. Check your `RECIPIENT_EMAIL` inbox for the form submission

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password (not your regular Gmail password)
- Verify 2-Step Verification is enabled
- Check that `SMTP_USER` matches your Gmail address exactly

### "Connection timeout" error
- Check your firewall settings
- Verify `SMTP_PORT` is correct (587 for TLS, 465 for SSL)
- Try changing `secure: false` to `secure: true` in the API route if using port 465

### Emails not received
- Check spam/junk folder
- Verify `RECIPIENT_EMAIL` is correct
- Check server logs for error messages

## Security Notes

- **Never commit `.env.local` to version control** (it's already in `.gitignore`)
- Use App Passwords instead of your main account password
- Consider using a dedicated email account for form submissions
- For production, use environment variables provided by your hosting platform

## API Endpoint

The email API is available at: `/api/send-email`

**Request Body:**
```json
{
  "type": "contact" | "enquiry",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "subject": "General Inquiry", // Only for contact form
  "service": "beauty-salon", // Only for enquiry form
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

