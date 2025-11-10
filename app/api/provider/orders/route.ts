import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { getAllOrders } from '@/lib/orders';

export async function GET(request: NextRequest) {
  try {
    const user = getAuthenticatedUser(request);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (user.role !== 'service-provider') {
      return NextResponse.json(
        { success: false, error: 'Forbidden. Service provider access required.' },
        { status: 403 }
      );
    }

    // Get orders assigned to this provider or pending orders
    const allOrders = getAllOrders();
    const providerOrders = allOrders.filter(order => 
      order.assignedTo === user.id || order.status === 'pending'
    );

    return NextResponse.json({ success: true, orders: providerOrders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

