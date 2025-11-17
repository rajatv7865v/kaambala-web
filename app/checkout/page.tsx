'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addToCart } = useCart()
  const [service, setService] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState<number | null>(null)

  useEffect(() => {
    // Get service data from URL params
    const serviceData = searchParams.get('data')
    if (serviceData) {
      try {
        const decoded = JSON.parse(decodeURIComponent(serviceData))
        setService(decoded)
        setPrice(decoded.price || null)
      } catch (error) {
        console.error('Failed to parse service data', error)
      }
    }
  }, [searchParams])

  const handleAddToCart = () => {
    if (!service) return

    const cartItem = {
      id: service.id || Date.now().toString(),
      name: service.name,
      category: service.category,
      icon: service.icon,
      image: service.image,
      rating: service.rating || 4.8,
      reviews: service.reviews || '0',
      price: price || undefined,
      quantity: quantity,
    }

    addToCart(cartItem)
    router.push('/cart')
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Loading service details...</p>
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Service Details Section */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            {/* Service Image */}
            <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.className = 'relative h-80 overflow-hidden bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 flex items-center justify-center'
                    const fallback = document.createElement('div')
                    fallback.className = 'text-8xl opacity-30'
                    fallback.textContent = service.icon
                    parent.appendChild(fallback)
                  }
                }}
              />
              {/* Icon Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                <span className="text-3xl">{service.icon}</span>
              </div>
              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-bold text-gray-900">{service.rating || 4.8}</span>
              </div>
            </div>

            {/* Service Info */}
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.name}</h1>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-2 rounded-lg">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-semibold text-gray-900 capitalize">{service.category?.replace('-', ' ') || 'General'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-yellow-50 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="font-semibold text-gray-900">{service.rating || 4.8} ({service.reviews || '0'} reviews)</p>
                  </div>
                </div>
              </div>

              {/* Service Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Service Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Verified Professionals
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    On-Time Service
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    100% Satisfaction Guarantee
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 Customer Support
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#e56481] hover:bg-[#e56481] hover:text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#e56481] hover:bg-[#e56481] hover:text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Price Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Optional)</label>
                <input
                  type="number"
                  value={price || ''}
                  onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="Enter price"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#e56481] focus:ring-2 focus:ring-[#e56481]/20"
                />
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    {price ? `₹${(price * quantity).toLocaleString()}` : 'Price on request'}
                  </span>
                </div>
                {price && (
                  <div className="flex justify-between text-gray-600">
                    <span>Quantity</span>
                    <span className="font-semibold">{quantity}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#e56481]">
                    {price ? `₹${(price * quantity).toLocaleString()}` : 'Price on request'}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full mt-6 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-100 text-white"
                style={{ backgroundColor: '#e56481' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
              >
                Add to Cart
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => router.push('/services')}
                className="w-full mt-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border-2 border-[#e56481] text-[#e56481] hover:bg-[#e56481] hover:text-white"
              >
                Continue Shopping
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-6 border border-primary-100">
              <h3 className="font-bold text-gray-900 mb-3">Why Choose Us?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Verified and background-checked professionals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>100% satisfaction guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Transparent pricing with no hidden charges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>24/7 customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

