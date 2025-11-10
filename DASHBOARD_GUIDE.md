# Dashboard System Guide

## Overview

A complete authentication and dashboard system has been implemented for the Kaambala web application. Users can now register, login, create orders, view their order history, and manage their profile.

## Features

### 🔐 Authentication
- **User Registration**: Sign up with name, email, phone, and password
- **User Login**: Secure login with email and password
- **Session Management**: Token-based authentication with localStorage
- **Protected Routes**: Dashboard pages are protected and require authentication

### 📊 Dashboard
- **Overview Page**: Displays order statistics and recent orders
- **Orders Management**: 
  - View all orders with filtering by status
  - Create new orders
  - View order details
- **User Profile**: Update personal information (name, phone, address)

## File Structure

```
app/
├── login/
│   └── page.tsx              # Login page
├── signup/
│   └── page.tsx              # Registration page
├── dashboard/
│   ├── layout.tsx             # Dashboard layout with protected route
│   ├── page.tsx               # Dashboard overview
│   ├── orders/
│   │   ├── page.tsx          # Orders list page
│   │   ├── new/
│   │   │   └── page.tsx      # Create new order
│   │   └── [id]/
│   │       └── page.tsx      # Order detail page
│   └── profile/
│       └── page.tsx          # User profile page
└── api/
    ├── auth/
    │   ├── login/route.ts    # Login API
    │   ├── signup/route.ts   # Signup API
    │   ├── me/route.ts       # Get current user
    │   └── profile/route.ts  # Update profile
    └── orders/
        ├── route.ts          # List/Create orders
        └── [id]/route.ts     # Get/Update/Delete order

contexts/
└── AuthContext.tsx           # Authentication context

components/
├── ProtectedRoute.tsx        # Route protection wrapper
└── DashboardNavbar.tsx       # Dashboard navigation

lib/
├── auth.ts                   # Authentication utilities
└── orders.ts                 # Order management utilities
```

## Usage

### For Users

1. **Sign Up**
   - Navigate to `/signup` or click "Login" → "Sign up"
   - Fill in your details and create an account

2. **Login**
   - Navigate to `/login` or click "Login" in the navbar
   - Use your email and password to sign in
   - Demo credentials: `demo@kaambala.com` / `demo123`

3. **Dashboard**
   - After login, you'll be redirected to `/dashboard`
   - View your order statistics and recent orders

4. **Create Order**
   - Click "New Order" or navigate to `/dashboard/orders/new`
   - Fill in service details and submit

5. **View Orders**
   - Navigate to `/dashboard/orders` to see all your orders
   - Filter by status (All, Pending, Confirmed, In Progress, Completed, Cancelled)
   - Click on any order to view details

6. **Update Profile**
   - Navigate to `/dashboard/profile`
   - Update your name, phone, or address
   - Click "Update Profile" to save changes

### For Developers

#### Authentication Flow

1. User signs up/logs in via `/api/auth/signup` or `/api/auth/login`
2. Server returns a token and user data
3. Token is stored in `localStorage` as `auth_token`
4. `AuthContext` manages user state globally
5. Protected routes check authentication via `ProtectedRoute` component

#### API Endpoints

**Authentication:**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth token)
- `PUT /api/auth/profile` - Update user profile (requires auth token)

**Orders:**
- `GET /api/orders` - Get all orders for current user (requires auth token)
- `POST /api/orders` - Create new order (requires auth token)
- `GET /api/orders/[id]` - Get order details (requires auth token)
- `PUT /api/orders/[id]` - Update order (requires auth token)
- `DELETE /api/orders/[id]` - Delete order (requires auth token)

#### Authentication Context

```typescript
const { user, isLoading, login, signup, logout, updateProfile } = useAuth();
```

- `user`: Current user object or null
- `isLoading`: Boolean indicating if auth check is in progress
- `login(email, password)`: Login function
- `signup(name, email, phone, password)`: Signup function
- `logout()`: Logout function
- `updateProfile(data)`: Update user profile

## Current Implementation Notes

### Storage
- **Current**: In-memory storage (data is lost on server restart)
- **Production**: Should be replaced with a database (PostgreSQL, MongoDB, etc.)

### Security
- **Current**: Simple token-based authentication
- **Production**: 
  - Use JWT tokens with expiration
  - Hash passwords with bcrypt
  - Implement refresh tokens
  - Add rate limiting
  - Add CSRF protection

### Password Storage
- **Current**: Passwords stored in plain text (for demo purposes)
- **Production**: Must hash passwords using bcrypt or similar

## Demo User

A demo user is automatically created on server start:
- **Email**: `demo@kaambala.com`
- **Password**: `demo123`

## Navigation Updates

The main navbar now shows:
- **When logged out**: "Login" and "Enquiry Now" buttons
- **When logged in**: "Dashboard" and "Logout" buttons

## Order Status

Orders can have the following statuses:
- `pending` - Order created, awaiting confirmation
- `confirmed` - Order confirmed by service provider
- `in-progress` - Service is being performed
- `completed` - Service completed
- `cancelled` - Order cancelled

## Next Steps for Production

1. **Database Integration**
   - Replace in-memory storage with a database
   - Use Prisma, TypeORM, or similar ORM

2. **Enhanced Security**
   - Implement JWT with refresh tokens
   - Hash passwords with bcrypt
   - Add input validation and sanitization
   - Implement rate limiting

3. **Email Verification**
   - Send verification emails on signup
   - Implement email verification flow

4. **Password Reset**
   - Add "Forgot Password" functionality
   - Send reset links via email

5. **Order Notifications**
   - Send email/SMS notifications on order status changes
   - Real-time updates using WebSockets

6. **Payment Integration**
   - Add payment gateway integration
   - Track payment status

7. **Service Provider Dashboard**
   - Create separate dashboard for service providers
   - Allow providers to view and manage assigned orders

