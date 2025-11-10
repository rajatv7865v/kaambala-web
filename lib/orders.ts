// Simple in-memory storage for orders (in production, use a database)
export interface Order {
  id: string;
  userId: string;
  service: string;
  serviceType: string;
  description: string;
  address: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string;
  assignedTo?: string;
  price?: number;
}

let orders: Order[] = [];

export function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
  const order: Order = {
    ...orderData,
    id: Date.now().toString() + Math.random().toString(36).substring(2),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

export function getOrdersByUserId(userId: string): Order[] {
  return orders.filter(o => o.userId === userId).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrderById(id: string): Order | undefined {
  return orders.find(o => o.id === id);
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const order = orders.find(o => o.id === id);
  if (!order) return null;
  
  Object.assign(order, updates, { updatedAt: new Date().toISOString() });
  return order;
}

export function deleteOrder(id: string): boolean {
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return false;
  orders.splice(index, 1);
  return true;
}

export function getAllOrders(): Order[] {
  return [...orders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

