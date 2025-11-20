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

    // Get pending orders that are not assigned yet and match the provider's service type
    const allOrders = getAllOrders();
    const providerServiceType = user.serviceType || 'other';
    
    const availableOrders = allOrders.filter(order => {
      if (order.status !== 'pending' || order.assignedTo) {
        return false;
      }
      
      const orderServiceType = (order.serviceType || '').toLowerCase().trim();
      const providerServiceTypeLower = providerServiceType.toLowerCase().trim();
      
      // Exact match
      if (orderServiceType === providerServiceTypeLower) {
        return true;
      }
      
      // Handle special cases for service type matching
      const serviceTypeMap: { [key: string]: string[] } = {
        'electrician': ['electrician', 'electrical'],
        'plumbing': ['plumbing', 'plumber'],
        'beauty-salon': ['beauty-salon', 'beauty', 'salon'],
        'carpenter': ['carpenter', 'carpentry'],
        'cleaning': ['cleaning', 'clean'],
        'ac-repair': ['ac-repair', 'ac', 'air-conditioning'],
        'painting': ['painting', 'paint'],
      };
      
      // Check if order service type matches any variant of provider service type
      const providerVariants = serviceTypeMap[providerServiceTypeLower] || [providerServiceTypeLower];
      return providerVariants.some(variant => 
        orderServiceType === variant || 
        orderServiceType.includes(variant) ||
        variant.includes(orderServiceType)
      );
    });

    return NextResponse.json({ success: true, orders: availableOrders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

