import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { getOrderById, updateOrder } from '@/lib/orders';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const order = getOrderById(params.id);
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.status !== 'pending') {
      return NextResponse.json(
        { success: false, error: 'Order is not available for acceptance' },
        { status: 400 }
      );
    }

    if (order.assignedTo) {
      return NextResponse.json(
        { success: false, error: 'Order is already assigned to another provider' },
        { status: 400 }
      );
    }

    // Assign order to provider and update status
    const updatedOrder = updateOrder(params.id, {
      assignedTo: user.id,
      status: 'confirmed',
    });

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: 'Failed to accept order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to accept order' },
      { status: 500 }
    );
  }
}

