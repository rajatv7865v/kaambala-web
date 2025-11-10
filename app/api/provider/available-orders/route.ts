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

    // Get pending orders that are not assigned yet
    const allOrders = getAllOrders();
    const availableOrders = allOrders.filter(order => 
      order.status === 'pending' && !order.assignedTo
    );

    return NextResponse.json({ success: true, orders: availableOrders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

