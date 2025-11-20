'use client'

import { useState, useEffect, Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Helper function to get local image based on service name
const getServiceImage = (serviceName: string, category: string, fallbackImage: string): string => {
  const serviceNameLower = serviceName.toLowerCase()
  const categoryLower = category.toLowerCase()
  
  // Check for keywords in service name and category
  if (serviceNameLower.includes('haircut') || serviceNameLower.includes('hair cut') || serviceNameLower.includes('haircut &')) {
    return '/assets/images/Haircut.jpeg'
  }
  if (serviceNameLower.includes('facial') || serviceNameLower.includes('cleanup')) {
    return '/assets/images/Facial.jpeg'
  }
  if (serviceNameLower.includes('ac') || serviceNameLower.includes('air condition') || categoryLower.includes('ac')) {
    return '/assets/images/AC Repair (1).jpeg'
  }
  if (serviceNameLower.includes('plumb') || serviceNameLower.includes('tap') || serviceNameLower.includes('pipe') || serviceNameLower.includes('leak') || categoryLower.includes('plumb')) {
    return '/assets/images/Plumbing.jpeg'
  }
  if (serviceNameLower.includes('paint') || serviceNameLower.includes('wall') || categoryLower.includes('paint')) {
    return '/assets/images/Home Painting.jpeg'
  }
  if (serviceNameLower.includes('sofa') || serviceNameLower.includes('furniture') || serviceNameLower.includes('cabinet') || serviceNameLower.includes('carpenter')) {
    return '/assets/images/SOFA Repair.jpeg'
  }
  if (serviceNameLower.includes('door') || serviceNameLower.includes('lock')) {
    return '/assets/images/Doorlock repair.jpeg'
  }
  if (serviceNameLower.includes('cctv') || serviceNameLower.includes('camera') || serviceNameLower.includes('security')) {
    return '/assets/images/CCTV Install.jpeg'
  }
  if (serviceNameLower.includes('mehandi') || serviceNameLower.includes('henna') || serviceNameLower.includes('bridal')) {
    return serviceNameLower.includes('bridal') ? '/assets/images/Mehandi bride.jpeg' : '/assets/images/Mehandi .jpeg'
  }
  
  return fallbackImage
}

// Service data structure - in a real app, this would come from an API
const serviceData: { [key: string]: { [key: string]: any[] } } = {
  'women-salon': {
    'haircut-&-styling': [
      {
        id: 'ws-hs-1',
        name: 'Classic Haircut',
        description: 'Professional haircut with styling consultation',
        price: 299,
        duration: '45 min',
        rating: 4.8,
        reviews: '2.5K+',
        image: '/assets/images/Haircut.jpeg',
        features: ['Expert Stylist', 'Hair Wash', 'Styling', 'Consultation'],
      },
      {
        id: 'ws-hs-2',
        name: 'Premium Haircut & Styling',
        description: 'Luxury haircut with premium styling products',
        price: 499,
        duration: '60 min',
        rating: 4.9,
        reviews: '1.8K+',
        image: '/assets/images/Haircut.jpeg',
        features: ['Senior Stylist', 'Premium Products', 'Hair Wash', 'Styling', 'Hair Spa'],
      },
    ],
    'hair-color': [
      {
        id: 'ws-hc-1',
        name: 'Full Hair Color',
        description: 'Complete hair coloring with premium color',
        price: 1299,
        duration: '2-3 hours',
        rating: 4.7,
        reviews: '1.2K+',
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=400&fit=crop',
        features: ['Premium Color', 'Color Protection', 'Hair Wash', 'Conditioning'],
      },
    ],
  },
  'cleaning': {
    'deep-cleaning': [
      {
        id: 'cl-dc-1',
        name: 'Complete Deep Cleaning',
        description: 'Thorough deep cleaning of entire home',
        price: 1999,
        duration: '4-6 hours',
        rating: 4.8,
        reviews: '5.2K+',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop',
        features: ['All Rooms', 'Bathroom Deep Clean', 'Kitchen Deep Clean', 'Window Cleaning', 'Dusting'],
      },
      {
        id: 'cl-dc-2',
        name: 'Premium Deep Cleaning',
        description: 'Ultra-deep cleaning with sanitization',
        price: 2999,
        duration: '6-8 hours',
        rating: 4.9,
        reviews: '3.1K+',
        image: '/assets/images/SOFA Repair.jpeg',
        features: ['All Rooms', 'Sanitization', 'Carpet Cleaning', 'Window Cleaning', 'Appliance Cleaning'],
      },
    ],
    'regular-cleaning': [
      {
        id: 'cl-rc-1',
        name: 'Standard Regular Cleaning',
        description: 'Regular maintenance cleaning service',
        price: 999,
        duration: '2-3 hours',
        rating: 4.7,
        reviews: '4.5K+',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
        features: ['All Rooms', 'Dusting', 'Mopping', 'Bathroom Cleaning', 'Kitchen Cleaning'],
      },
    ],
  },
  'ac-service': {
    'ac-installation': [
      {
        id: 'ac-ai-1',
        name: 'AC Installation Service',
        description: 'Professional AC installation with warranty',
        price: 2999,
        duration: '3-4 hours',
        rating: 4.8,
        reviews: '2.8K+',
        image: '/assets/images/AC Repair (1).jpeg',
        features: ['Expert Installation', 'Warranty', 'Testing', 'Gas Filling'],
      },
    ],
    'ac-repair': [
      {
        id: 'ac-ar-1',
        name: 'AC Repair Service',
        description: 'Complete AC repair and maintenance',
        price: 799,
        duration: '1-2 hours',
        rating: 4.7,
        reviews: '3.5K+',
        image: '/assets/images/AC Repair (1).jpeg',
        features: ['Diagnosis', 'Repair', 'Testing', '30 Days Warranty'],
      },
    ],
  },
  // Add more services as needed - fallback generator will handle others
}

// Fallback service data generator
const generateServiceData = (category: string, subcategory: string) => {
  const defaultImage = '/assets/images/Haircut.jpeg' // Default fallback
  const baseServices = [
    {
      id: `${category}-${subcategory}-1`,
      name: `${subcategory} - Basic`,
      description: `Professional ${subcategory.toLowerCase()} service with expert care`,
      price: 299,
      duration: '1 hour',
      rating: 4.7,
      reviews: '1.5K+',
      image: getServiceImage(`${subcategory} - Basic`, category, defaultImage),
      features: ['Expert Service', 'Quality Assured', 'On-Time Service'],
    },
    {
      id: `${category}-${subcategory}-2`,
      name: `${subcategory} - Premium`,
      description: `Premium ${subcategory.toLowerCase()} service with advanced care`,
      price: 599,
      duration: '2 hours',
      rating: 4.9,
      reviews: '2.1K+',
      image: getServiceImage(`${subcategory} - Premium`, category, defaultImage),
      features: ['Premium Service', 'Expert Professional', 'Quality Products', 'Extended Warranty'],
    },
    {
      id: `${category}-${subcategory}-3`,
      name: `${subcategory} - Standard`,
      description: `Standard ${subcategory.toLowerCase()} service package`,
      price: 399,
      duration: '1.5 hours',
      rating: 4.6,
      reviews: '980+',
      image: getServiceImage(`${subcategory} - Standard`, category, defaultImage),
      features: ['Professional Service', 'Quality Assured', 'Quick Service'],
    },
  ]
  return baseServices
}

const categoryIcons: { [key: string]: string } = {
  'women-salon': '💇‍♀️',
  'cleaning': '🧹',
  'ac-service': '❄️',
  'electrician': '⚡',
  'plumber': '🚿',
  'appliance-repair': '🔧',
  'men-salon': '💇‍♂️',
  'home-repair': '🛠️',
}

const categoryColors: { [key: string]: string } = {
  'women-salon': 'from-pink-500 to-pink-600',
  'cleaning': 'from-green-500 to-green-600',
  'ac-service': 'from-blue-500 to-blue-600',
  'electrician': 'from-yellow-500 to-yellow-600',
  'plumber': 'from-cyan-500 to-cyan-600',
  'appliance-repair': 'from-indigo-500 to-indigo-600',
  'men-salon': 'from-blue-500 to-blue-600',
  'home-repair': 'from-amber-500 to-amber-600',
}

function SubcategoryServicesContent() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const category = params.category as string
  const subcategory = params.subcategory as string

  useEffect(() => {
    setLoading(true)
    // Decode URL parameters
    const decodedCategory = decodeURIComponent(category)
    const decodedSubcategory = decodeURIComponent(subcategory)

    // Get services from data or generate fallback
    const categoryKey = decodedCategory.toLowerCase().replace(/\s+/g, '-')
    const subcategoryKey = decodedSubcategory.toLowerCase().replace(/\s+/g, '-')

    if (serviceData[categoryKey] && serviceData[categoryKey][subcategoryKey]) {
      // Update images for services from serviceData
      const servicesWithLocalImages = serviceData[categoryKey][subcategoryKey].map((service: any) => ({
        ...service,
        image: getServiceImage(service.name, categoryKey, service.image)
      }))
      setServices(servicesWithLocalImages)
    } else {
      setServices(generateServiceData(categoryKey, subcategoryKey))
    }
    setLoading(false)
  }, [category, subcategory])

  const handleAddToCart = (service: any) => {
    const cartItem = {
      id: service.id,
      name: service.name,
      category: decodeURIComponent(category),
      icon: categoryIcons[category.toLowerCase().replace(/\s+/g, '-')] || '🏠',
      image: service.image,
      rating: service.rating,
      reviews: service.reviews,
      price: service.price,
      quantity: 1,
    }
    addToCart(cartItem)
    router.push('/cart')
  }

  const categoryColor = categoryColors[category.toLowerCase().replace(/\s+/g, '-')] || 'from-primary-500 to-accent-500'
  const categoryIcon = categoryIcons[category.toLowerCase().replace(/\s+/g, '-')] || '🏠'

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e56481] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading services...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className={`relative bg-gradient-to-r ${categoryColor} text-white py-16 md:py-20 px-4 overflow-hidden`}>
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 transform hover:translate-x-1 group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Categories</span>
          </button>

          <div className="flex items-center gap-6 md:gap-8">
            <div className="text-6xl md:text-7xl bg-white/20 rounded-3xl p-5 md:p-6 backdrop-blur-sm shadow-2xl border border-white/30">
              {categoryIcon}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight">
                {decodeURIComponent(subcategory)}
              </h1>
              <p className="text-white/90 text-lg md:text-xl">
                {services.length} premium service{services.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 overflow-hidden hover:border-[#e56481] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  {/* Service Image */}
                  <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.className = 'relative h-72 overflow-hidden bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 flex items-center justify-center'
                          const fallback = document.createElement('div')
                          fallback.className = 'text-6xl opacity-30'
                          fallback.textContent = categoryIcon
                          parent.appendChild(fallback)
                        }
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 shadow-xl flex items-center gap-1.5 border border-white/50">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-bold text-gray-900">{service.rating}</span>
                      <span className="text-xs text-gray-500">({service.reviews})</span>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-xl border border-white/50">
                      <span className="text-2xl md:text-3xl font-extrabold text-gray-900">₹{service.price}</span>
                      <span className="text-xs text-gray-500 block">Starting from</span>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="p-6 md:p-7">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#e56481] transition-colors duration-300 leading-tight">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-5 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Service Info */}
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                        <svg className="w-4 h-4 text-[#e56481]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{service.duration}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">What's Included:</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg text-xs font-semibold border border-gray-200 hover:border-[#e56481] transition-colors"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAddToCart(service)}
                        className="flex-1 px-6 py-3.5 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                        style={{ backgroundColor: '#e56481' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          const serviceData = {
                            id: service.id,
                            name: service.name,
                            category: decodeURIComponent(category),
                            icon: categoryIcon,
                            image: service.image,
                            rating: service.rating,
                            reviews: service.reviews,
                            price: service.price,
                          }
                          const encoded = encodeURIComponent(JSON.stringify(serviceData))
                          router.push(`/checkout?data=${encoded}`)
                        }}
                        className="px-6 py-3.5 rounded-xl font-bold border-2 border-[#e56481] text-[#e56481] hover:bg-[#e56481] hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-7xl mb-6">🔍</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">No Services Found</h3>
              <p className="text-gray-600 mb-8 text-lg">We couldn't find any services for this subcategory.</p>
              <button
                onClick={() => router.push('/services')}
                className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#e56481' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
              >
                Browse All Services
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function SubcategoryServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e56481] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <SubcategoryServicesContent />
    </Suspense>
  )
}

