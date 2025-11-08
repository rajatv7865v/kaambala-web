# API Implementation Guide

## Overview
All forms in the Kaambala website are now connected to a unified email API that sends form submissions via email.

## API Endpoint

**URL:** `/api/send-email`  
**Method:** `POST`  
**Content-Type:** `application/json`

## Form Types

### 1. Contact Form (`type: "contact"`)
**Location:** `/contact` page

**Required Fields:**
- `name` (string, max 100 chars)
- `email` (string, must be valid email format)
- `subject` (string)
- `message` (string, max 2000 chars)

**Optional Fields:**
- `phone` (string)

**Example Request:**
```json
{
  "type": "contact",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "subject": "General Inquiry",
  "message": "I need help with..."
}
```

### 2. Service Enquiry Form (`type: "enquiry"`)
**Location:** Enquiry modal (triggered from Navbar, MostBooked, HowItWorks, Services)

**Required Fields:**
- `name` (string, max 100 chars)
- `phone` (string, must be valid phone format)
- `service` (string, one of: beauty-salon, cleaning, ac-repair, plumbing, electrician, carpenter, painting, other)
- `message` (string, max 2000 chars)

**Optional Fields:**
- `email` (string, must be valid email format if provided)

**Example Request:**
```json
{
  "type": "enquiry",
  "name": "Jane Smith",
  "phone": "+91 9876543210",
  "email": "jane@example.com",
  "service": "beauty-salon",
  "message": "I need a haircut service..."
}
```

## API Features

### ✅ Security & Validation
- **Input Sanitization:** All inputs are sanitized to prevent XSS attacks
- **Email Validation:** Validates email format using regex
- **Phone Validation:** Validates phone number format
- **Field Length Limits:** Prevents excessively long inputs
- **Required Field Validation:** Ensures all required fields are present

### ✅ Error Handling
- Returns appropriate HTTP status codes (400 for validation errors, 500 for server errors)
- Provides clear error messages for debugging
- Logs errors to console for monitoring

### ✅ Email Features
- HTML email templates with branding
- Plain text fallback for email clients
- Clickable email and phone links
- Timestamp included in emails
- Service name mapping for better readability

## Forms Connected

1. ✅ **Contact Page Form** (`/contact`)
   - Full form with name, email, phone, subject, message
   - Success/error status messages
   - Form reset on success

2. ✅ **Enquiry Modal Form** (Navbar)
   - Accessible from "Enquiry Now" button
   - Pre-fills service type when opened from service cards
   - Auto-closes on successful submission

3. ✅ **MostBooked "Book Now" Buttons**
   - Opens enquiry modal with pre-filled service type
   - Service type auto-detected from service name

4. ✅ **HowItWorks "Get Started Now" Button**
   - Opens enquiry modal

5. ✅ **Services Component Cards**
   - Clicking any service card opens enquiry modal
   - Service type auto-mapped from service name

## Global Enquiry Context

A React Context (`EnquiryContext`) manages the enquiry modal state globally, allowing any component to:
- Open the enquiry modal: `openEnquiryModal(serviceType?)`
- Close the enquiry modal: `closeEnquiryModal()`
- Check if modal is open: `isEnquiryModalOpen`
- Get pre-filled service: `prefillService`

**Usage Example:**
```tsx
import { useEnquiry } from '@/contexts/EnquiryContext'

function MyComponent() {
  const { openEnquiryModal } = useEnquiry();
  
  return (
    <button onClick={() => openEnquiryModal('beauty-salon')}>
      Book Service
    </button>
  );
}
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## Environment Variables Required

Create a `.env.local` file with:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=info@kaambala.com
```

See `EMAIL_SETUP.md` for detailed setup instructions.

## Testing

1. **Test Contact Form:**
   - Navigate to `/contact`
   - Fill out the form
   - Submit and check email inbox

2. **Test Enquiry Form:**
   - Click "Enquiry Now" in header
   - Or click any "Book Now" button
   - Fill out the form
   - Submit and check email inbox

3. **Test Service Pre-filling:**
   - Click a service card in Services section
   - Or click "Book Now" on a MostBooked service
   - Verify service type is pre-filled in modal

## Error Scenarios Handled

- Missing required fields
- Invalid email format
- Invalid phone format
- Field length exceeded
- Email service not configured
- SMTP connection errors
- Network errors

All errors are displayed to users with friendly messages.

