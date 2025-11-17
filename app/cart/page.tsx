'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function CartPage() {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some services to get started!</p>
            <button
              onClick={() => router.push('/services')}
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-white"
              style={{ backgroundColor: '#e56481' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
            >
              Browse Services
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.className = 'relative w-full sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 flex items-center justify-center flex-shrink-0'
                          const fallback = document.createElement('div')
                          fallback.className = 'text-6xl opacity-30'
                          fallback.textContent = item.icon
                          parent.appendChild(fallback)
                        }
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{item.icon}</span>
                          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500 capitalize mb-2">{item.category?.replace('-', ' ')}</p>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm text-gray-600">{item.rating} ({item.reviews} reviews)</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <label className="text-sm font-semibold text-gray-700">Quantity:</label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#e56481] hover:bg-[#e56481] hover:text-white transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#e56481] hover:bg-[#e56481] hover:text-white transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {item.price && (
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#e56481]">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-500">₹{item.price.toLocaleString()} each</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({getTotalItems()})</span>
                  <span className="font-semibold">
                    {getTotalPrice() > 0 ? `₹${getTotalPrice().toLocaleString()}` : 'Price on request'}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-[#e56481]">
                      {getTotalPrice() > 0 ? `₹${getTotalPrice().toLocaleString()}` : 'Price on request'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push('/dashboard/orders/new')}
                className="w-full mb-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-100 text-white"
                style={{ backgroundColor: '#e56481' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => router.push('/services')}
                className="w-full mb-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border-2 border-[#e56481] text-[#e56481] hover:bg-[#e56481] hover:text-white"
              >
                Continue Shopping
              </button>

              <button
                onClick={clearCart}
                className="w-full px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

