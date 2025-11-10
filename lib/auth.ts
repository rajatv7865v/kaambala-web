import { NextRequest } from 'next/server';

// Simple in-memory storage (in production, use a database)
// This will be replaced with a proper database
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string; // In production, this should be hashed
  address?: string;
  role?: 'user' | 'admin' | 'service-provider'; // User role
  createdAt: string;
}

// In-memory storage (replace with database in production)
let users: User[] = [];

// Simple token generation (in production, use JWT)
function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Simple token storage (in production, use Redis or database)
const tokens: { [key: string]: string } = {}; // token -> userId

export function getUserByEmail(email: string): User | undefined {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function createUser(name: string, email: string, phone: string, password: string, role: 'user' | 'admin' | 'service-provider' = 'user'): User {
  const user: User = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    phone,
    password, // In production, hash this with bcrypt
    role,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

export function createToken(userId: string): string {
  const token = generateToken();
  tokens[token] = userId;
  return token;
}

export function getUserIdFromToken(token: string): string | null {
  return tokens[token] || null;
}

export function deleteToken(token: string): void {
  delete tokens[token];
}

export function verifyPassword(user: User, password: string): boolean {
  // In production, compare hashed passwords
  return user.password === password;
}

export function getAuthenticatedUser(request: NextRequest): User | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.substring(7);
  const userId = getUserIdFromToken(token);
  if (!userId) {
    return null;
  }
  
  const user = getUserById(userId);
  if (!user) {
    return null;
  }
  
  // Remove password from user object
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
}

export function updateUser(userId: string, updates: Partial<User>): User | null {
  const user = getUserById(userId);
  if (!user) {
    return null;
  }
  
  if (updates.name) user.name = updates.name;
  if (updates.phone) user.phone = updates.phone;
  if (updates.address !== undefined) user.address = updates.address;
  
  return user;
}

export function getAllUsers(): User[] {
  return users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  });
}

// Function to ensure service provider accounts exist
function initializeServiceProviderAccounts() {
  // Check if service provider accounts already exist
  const existingProvider = users.find(u => u.role === 'service-provider');
  if (existingProvider) {
    return; // Service provider accounts already exist
  }

  // Create multiple service provider accounts for testing
  const providerAccounts = [
    {
      name: 'Service Provider',
      email: 'provider@kaambala.com',
      phone: '+91 9876543211',
      password: 'provider123',
    },
    {
      name: 'John Electrician',
      email: 'electrician@kaambala.com',
      phone: '+91 9876543212',
      password: 'electrician123',
    },
    {
      name: 'Mike Plumber',
      email: 'plumber@kaambala.com',
      phone: '+91 9876543213',
      password: 'plumber123',
    },
    {
      name: 'Sarah Beautician',
      email: 'beautician@kaambala.com',
      phone: '+91 9876543214',
      password: 'beautician123',
    },
    {
      name: 'David Carpenter',
      email: 'carpenter@kaambala.com',
      phone: '+91 9876543215',
      password: 'carpenter123',
    },
  ];

  providerAccounts.forEach(account => {
    const providerUser = createUser(account.name, account.email, account.phone, account.password, 'service-provider');
    console.log(`Service provider account created: ${providerUser.email} / Password: ${account.password}`);
  });
}

// Initialize with demo users for testing
if (users.length === 0) {
  // Create demo user account
  const demoUser = createUser('Demo User', 'demo@kaambala.com', '+91 1234567890', 'demo123', 'user');
  console.log('Demo user created:', demoUser.email, 'Password: demo123');
  
  // Initialize service provider accounts
  initializeServiceProviderAccounts();
} else {
  // Ensure accounts exist even if users array is not empty
  initializeServiceProviderAccounts();
}

