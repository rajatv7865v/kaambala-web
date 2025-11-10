import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { createOrder, getOrdersByUserId } from '@/lib/orders';

export async function GET(request: NextRequest) {
  try {
    const user = getAuthenticatedUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const orders = getOrdersByUserId(user.id);
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getAuthenticatedUser(request);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { service, serviceType, description, address, phone, scheduledDate, price } = await request.json();

    if (!service || !serviceType || !description || !address || !phone) {
      return NextResponse.json(
        { success: false, error: 'Service, service type, description, address, and phone are required' },
        { status: 400 }
      );
    }

    const order = createOrder({
      userId: user.id,
      service,
      serviceType,
      description,
      address,
      phone,
      scheduledDate,
      price,
      status: 'pending',
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

