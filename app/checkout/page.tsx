'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addToCart } = useCart()
  const [service, setService] = useState<any>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [tip, setTip] = useState<number>(0)
  const [tipType, setTipType] = useState<'amount' | 'percentage' | 'none'>('none')
  const [selectedTipPercent, setSelectedTipPercent] = useState<number | null>(null)
  const [donation, setDonation] = useState<number>(0)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

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

  // Update tip when price changes if percentage tip is selected
  useEffect(() => {
    if (selectedTipPercent && price) {
      const percent = selectedTipPercent / 100
      setTip(Math.round(price * percent))
    }
  }, [price, selectedTipPercent])

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
      quantity: 1,
      tip: tip > 0 ? tip : undefined,
      donation: donation > 0 ? donation : undefined,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-[#e56481] transition-colors mb-4 group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Review your service details and complete your booking</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Service Details Section */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-[#e56481]/30 transition-all duration-300">
            {/* Service Image */}
            <div className="relative h-72 md:h-80 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.className = 'relative h-72 md:h-80 overflow-hidden bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 flex items-center justify-center'
                    const fallback = document.createElement('div')
                    fallback.className = 'text-8xl opacity-30'
                    fallback.textContent = service.icon
                    parent.appendChild(fallback)
                  }
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Icon Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50">
                <span className="text-3xl">{service.icon}</span>
              </div>
              
              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-white/50">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-bold text-gray-900">{service.rating || 4.8}</span>
                <span className="text-xs text-gray-500">({service.reviews || '0'})</span>
              </div>
            </div>

            {/* Service Info */}
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">{service.name}</h1>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-4 rounded-2xl border border-primary-100">
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <p className="text-xs text-gray-500 mb-1">Category</p>
                  <p className="font-bold text-gray-900 capitalize text-sm">{service.category?.replace('-', ' ') || 'General'}</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-2xl border border-yellow-100">
                  <div className="flex items-center gap-1 mb-2">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-lg font-bold text-gray-900">{service.rating || 4.8}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">Rating</p>
                  <p className="font-semibold text-gray-700 text-sm">{service.reviews || '0'} reviews</p>
                </div>
              </div>

              {/* Service Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#e56481] to-[#d45471] rounded-full"></span>
                  Service Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '✓', text: 'Verified Professionals', color: 'text-green-600' },
                    { icon: '⏰', text: 'On-Time Service', color: 'text-blue-600' },
                    { icon: '💯', text: '100% Satisfaction', color: 'text-purple-600' },
                    { icon: '🛟', text: '24/7 Support', color: 'text-pink-600' }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className={`text-lg ${feature.color}`}>{feature.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-[#e56481] to-[#d45471] rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
              </div>
              
              {/* Price Input */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">Price (Optional)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                <input
                  type="number"
                  value={price || ''}
                  onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="Enter price"
                    className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#e56481] focus:ring-4 focus:ring-[#e56481]/10 transition-all bg-white font-semibold"
                  />
                </div>
              </div>

              {/* Tip Section */}
              <div className="mb-6 border-t-2 border-gray-200 pt-6">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span>💝</span>
                  <span>Tip Your Service Provider (Optional)</span>
                </label>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setTipType('none')
                        setTip(0)
                        setSelectedTipPercent(null)
                      }}
                      className={`px-3 py-2.5 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 ${
                        tipType === 'none'
                          ? 'bg-[#e56481] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      No Tip
                    </button>
                    <button
                      onClick={() => {
                        setTipType('percentage')
                        setSelectedTipPercent(10)
                        if (price) setTip(Math.round(price * 0.1))
                      }}
                      className={`px-3 py-2.5 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 ${
                        selectedTipPercent === 10
                          ? 'bg-[#e56481] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      10%
                    </button>
                    <button
                      onClick={() => {
                        setTipType('percentage')
                        setSelectedTipPercent(15)
                        if (price) setTip(Math.round(price * 0.15))
                      }}
                      className={`px-3 py-2.5 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 ${
                        selectedTipPercent === 15
                          ? 'bg-[#e56481] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      15%
                    </button>
                    <button
                      onClick={() => {
                        setTipType('percentage')
                        setSelectedTipPercent(20)
                        if (price) setTip(Math.round(price * 0.20))
                      }}
                      className={`px-3 py-2.5 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 ${
                        selectedTipPercent === 20
                          ? 'bg-[#e56481] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      20%
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">Custom:</span>
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                      <input
                        type="number"
                        value={tipType === 'amount' ? tip : ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0
                          setTip(value)
                          setTipType('amount')
                          setSelectedTipPercent(null)
                        }}
                        placeholder="0"
                        className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#e56481] focus:ring-4 focus:ring-[#e56481]/10 text-sm bg-white font-semibold"
                      />
                    </div>
                  </div>
                  {tip > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                      <p className="text-sm font-semibold text-green-700">
                        💚 You're tipping ₹{tip.toLocaleString()} - Thank you for your generosity!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Donation Section */}
              <div className="mb-6 border-t-2 border-gray-200 pt-6">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-xl">💝</span>
                  <span>Support Our Community (Optional Donation)</span>
                </label>
                <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-pink-200 shadow-sm">
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                    Your donation helps us support underprivileged families and provide free services to those in need.
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <button
                      onClick={() => setDonation(50)}
                      className={`px-4 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 ${
                        donation === 50
                          ? 'bg-[#e56481] text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-pink-100 border-2 border-pink-200'
                      }`}
                    >
                      ₹50
                    </button>
                    <button
                      onClick={() => setDonation(100)}
                      className={`px-4 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 ${
                        donation === 100
                          ? 'bg-[#e56481] text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-pink-100 border-2 border-pink-200'
                      }`}
                    >
                      ₹100
                    </button>
                    <button
                      onClick={() => setDonation(200)}
                      className={`px-4 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 ${
                        donation === 200
                          ? 'bg-[#e56481] text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-pink-100 border-2 border-pink-200'
                      }`}
                    >
                      ₹200
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                    <input
                      type="number"
                      value={donation > 0 && ![50, 100, 200].includes(donation) ? donation : ''}
                      onChange={(e) => setDonation(parseFloat(e.target.value) || 0)}
                      placeholder="Custom amount"
                      className="w-full pl-8 pr-3 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-[#e56481] focus:ring-4 focus:ring-[#e56481]/10 text-sm bg-white font-semibold"
                    />
                  </div>
                  {donation > 0 && (
                    <div className="mt-3 bg-pink-100 border border-pink-300 rounded-xl p-3">
                      <p className="text-sm font-semibold text-pink-700">
                        💝 Thank you for donating ₹{donation.toLocaleString()}! Your contribution makes a difference.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t-2 border-gray-200 pt-6 space-y-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 -mx-5 -mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900 text-lg">
                    {price ? `₹${price.toLocaleString()}` : 'Price on request'}
                  </span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between items-center bg-green-50 p-3 rounded-xl border border-green-200">
                    <span className="text-gray-700 font-medium flex items-center gap-2">
                      <span>💚</span>
                      <span>Tip</span>
                    </span>
                    <span className="font-bold text-green-600">+₹{tip.toLocaleString()}</span>
                  </div>
                )}
                {donation > 0 && (
                  <div className="flex justify-between items-center bg-pink-50 p-3 rounded-xl border border-pink-200">
                    <span className="text-gray-700 font-medium flex items-center gap-2">
                      <span>💝</span>
                      <span>Donation</span>
                    </span>
                    <span className="font-bold text-pink-600">+₹{donation.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-extrabold text-[#e56481]">
                    {price ? `₹${((price) + tip + donation).toLocaleString()}` : 'Price on request'}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full mt-6 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-100 text-white"
                style={{ backgroundColor: '#e56481' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
              >
                Add to Cart
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => router.push('/services')}
                className="w-full mt-3 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 border-2 border-[#e56481] text-[#e56481] hover:bg-[#e56481] hover:text-white transform hover:scale-[1.02] active:scale-100"
              >
                Continue Shopping
              </button>
            </div>

            {/* Additional Details Section */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-[#e56481] to-[#d45471] rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">Additional Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e56481] to-[#d45471] flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Service Duration</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Average service time: 1-3 hours depending on service type</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e56481] to-[#d45471] flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Service Area</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">We serve all major cities across India. Service availability may vary by location.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e56481] to-[#d45471] flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Safety & Hygiene</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">All professionals follow strict safety protocols and use sanitized equipment</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e56481] to-[#d45471] flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Payment Options</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Pay via UPI, Credit/Debit cards, Net Banking, or Cash on Service</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-6 md:p-8 border-2 border-[#e56481]/30 mt-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
                <div className="w-2 h-10 bg-gradient-to-b from-[#e56481] to-[#d45471] rounded-full"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
                  <p className="text-sm text-gray-600 mt-1">Got questions? Find answers below</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  {
                    question: 'How do I schedule a service?',
                    answer: 'After adding to cart, you can select your preferred date and time during checkout. Our team will confirm the appointment within 2 hours.'
                  },
                  {
                    question: 'Can I cancel or reschedule my booking?',
                    answer: 'Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled time. Cancellations made within 24 hours may be subject to a cancellation fee.'
                  },
                  {
                    question: 'What if I\'m not satisfied with the service?',
                    answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy with the service, contact us within 24 hours and we\'ll either redo the service for free or provide a full refund.'
                  },
                  {
                    question: 'Are the service providers verified?',
                    answer: 'Yes, all our service providers undergo thorough background checks, identity verification, and skill assessments before joining our platform.'
                  },
                  {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept all major payment methods including UPI, Credit/Debit cards, Net Banking, Wallets, and Cash on Service (for select services).'
                  },
                  {
                    question: 'Is there a warranty on the services?',
                    answer: 'Yes, most services come with a warranty period ranging from 7 to 30 days depending on the service type. Details will be provided at the time of booking.'
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-[#e56481] hover:shadow-lg transition-all bg-white">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full px-5 py-5 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-[#e56481]/5 hover:to-transparent transition-all group"
                    >
                      <span className="font-bold text-gray-900 pr-4 group-hover:text-[#e56481] transition-colors text-left flex-1">{faq.question}</span>
                      <div className={`w-8 h-8 rounded-full bg-[#e56481]/10 flex items-center justify-center flex-shrink-0 transition-all ${openFaqIndex === index ? 'bg-[#e56481]' : ''}`}>
                        <svg
                          className={`w-5 h-5 text-[#e56481] flex-shrink-0 transform transition-transform ${
                            openFaqIndex === index ? 'rotate-180 text-white' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-5 pb-5 pt-2 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
                        <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-primary-50 via-accent-50 to-primary-50 rounded-3xl p-6 md:p-8 border-2 border-primary-200 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-5 text-lg flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span>Why Choose Us?</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Verified and background-checked professionals',
                  '100% satisfaction guarantee',
                  'Transparent pricing with no hidden charges',
                  '24/7 customer support'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Loading service details...</p>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}

