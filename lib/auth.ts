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
  serviceType?: string; // Service type for service providers (e.g., 'electrician', 'plumber', etc.)
  createdAt: string;
}

// In-memory storage (replace with database in production)
let users: User[] = [];

// Simple token generation (in production, use JWT)
function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Token storage with expiration (in production, use Redis or database)
interface TokenData {
  userId: string;
  expiresAt: number; // timestamp in milliseconds
}

const tokens: { [key: string]: TokenData } = {}; // token -> TokenData

export function getUserByEmail(email: string): User | undefined {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function createUser(name: string, email: string, phone: string, password: string, role: 'user' | 'admin' | 'service-provider' = 'user', serviceType?: string): User {
  const user: User = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    phone,
    password, // In production, hash this with bcrypt
    role,
    serviceType,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

export function createToken(userId: string): string {
  const token = generateToken();
  // Token expires in 24 hours (24 * 60 * 60 * 1000 milliseconds)
  const expiresAt = Date.now() + (24 * 60 * 60 * 1000);
  tokens[token] = {
    userId,
    expiresAt,
  };
  return token;
}

export function getUserIdFromToken(token: string): string | null {
  const tokenData = tokens[token];
  
  if (!tokenData) {
    return null;
  }
  
  // Check if token is expired
  if (Date.now() > tokenData.expiresAt) {
    // Token expired, remove it
    delete tokens[token];
    return null;
  }
  
  return tokenData.userId;
}

export function deleteToken(token: string): void {
  delete tokens[token];
}

// Clean up expired tokens periodically (optional, for memory management)
export function cleanupExpiredTokens(): void {
  const now = Date.now();
  Object.keys(tokens).forEach(token => {
    if (tokens[token].expiresAt < now) {
      delete tokens[token];
    }
  });
}

// Run cleanup every hour (only in server environment)
if (typeof process !== 'undefined' && process.env) {
  setInterval(cleanupExpiredTokens, 60 * 60 * 1000); // Every hour
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
      serviceType: 'other',
    },
    {
      name: 'John Electrician',
      email: 'electrician@kaambala.com',
      phone: '+91 9876543212',
      password: 'electrician123',
      serviceType: 'electrician',
    },
    {
      name: 'Mike Plumber',
      email: 'plumber@kaambala.com',
      phone: '+91 9876543213',
      password: 'plumber123',
      serviceType: 'plumbing',
    },
    {
      name: 'Sarah Beautician',
      email: 'beautician@kaambala.com',
      phone: '+91 9876543214',
      password: 'beautician123',
      serviceType: 'beauty-salon',
    },
    {
      name: 'David Carpenter',
      email: 'carpenter@kaambala.com',
      phone: '+91 9876543215',
      password: 'carpenter123',
      serviceType: 'carpenter',
    },
  ];

  providerAccounts.forEach(account => {
    const providerUser = createUser(account.name, account.email, account.phone, account.password, 'service-provider', account.serviceType);
    console.log(`Service provider account created: ${providerUser.email} / Password: ${account.password} / Service Type: ${account.serviceType}`);
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

