# Service Provider Accounts

This document lists all the dummy service provider accounts available for testing the provider dashboard.

## Service Provider Accounts

### 1. Service Provider
- **Email:** `provider@kaambala.com`
- **Password:** `provider123`
- **Phone:** +91 9876543211
- **Role:** Service Provider

### 2. John Electrician
- **Email:** `electrician@kaambala.com`
- **Password:** `electrician123`
- **Phone:** +91 9876543212
- **Role:** Service Provider
- **Specialty:** Electrical Services

### 3. Mike Plumber
- **Email:** `plumber@kaambala.com`
- **Password:** `plumber123`
- **Phone:** +91 9876543213
- **Role:** Service Provider
- **Specialty:** Plumbing Services

### 4. Sarah Beautician
- **Email:** `beautician@kaambala.com`
- **Password:** `beautician123`
- **Phone:** +91 9876543214
- **Role:** Service Provider
- **Specialty:** Beauty & Salon Services

### 5. David Carpenter
- **Email:** `carpenter@kaambala.com`
- **Password:** `carpenter123`
- **Phone:** +91 9876543215
- **Role:** Service Provider
- **Specialty:** Carpentry Services

## How to Login

1. Navigate to `/login`
2. Enter any of the service provider email addresses above
3. Enter the corresponding password
4. You will be automatically redirected to the provider dashboard

## Features Available to Service Providers

- **View Available Orders:** See all pending orders waiting to be accepted
- **Accept Orders:** Accept orders and assign them to yourself
- **Manage Orders:** Update order status (Confirmed → In Progress → Completed)
- **View My Orders:** See all orders assigned to you
- **Dashboard Statistics:** View statistics about your assigned orders
- **Profile Management:** Update your profile information

## Account Types Summary

### Regular User
- **Email:** `demo@kaambala.com`
- **Password:** `demo123`
- **Role:** User
- **Access:** User dashboard, create orders, view own orders

### Service Provider
- Multiple accounts listed above
- **Role:** Service Provider
- **Access:** Provider dashboard, accept orders, manage assigned orders

## Important Notes

- These are dummy accounts created for testing purposes
- In production, service provider accounts should be created through a secure registration/approval process
- Passwords are stored in plain text for demo purposes only
- In production, passwords must be hashed using bcrypt or similar
- Service provider accounts are automatically created when the server starts

