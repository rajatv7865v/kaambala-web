'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AnimateOnScroll from './AnimateOnScroll'

const featuredServices = [
  {
    id: 1,
    title: 'Premium Salon Services',
    description: 'Get the best beauty treatments at your doorstep',
    icon: '💇‍♀️',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=400&fit=crop',
    category: 'beauty-salon',
    badge: 'Popular',
    discount: '20% OFF',
  },
  {
    id: 2,
    title: 'Deep Cleaning Service',
    description: 'Professional cleaning for your home',
    icon: '🧹',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop',
    category: 'cleaning',
    badge: 'New',
    discount: '15% OFF',
  },
  {
    id: 3,
    title: 'AC Service & Repair',
    description: 'Keep your AC running smoothly all year',
    icon: '❄️',
    image: 'https://images.unsplash.com/photo-1631542771833-cff2a0e0c0a0?w=800&h=400&fit=crop',
    category: 'ac-repair',
    badge: 'Hot Deal',
    discount: '25% OFF',
  },
  {
    id: 4,
    title: 'Electrician Services',
    description: 'Expert electrical repairs and installations',
    icon: '⚡',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop',
    category: 'electrician',
    badge: 'Best Value',
    discount: '10% OFF',
  },
]

export default function AdBanner() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredServices.length)
    }, 5000) // Auto-slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleServiceClick = (service: typeof featuredServices[0]) => {
    const serviceData = {
      id: service.id,
      name: service.title,
      category: service.category,
      icon: service.icon,
      image: service.image,
      rating: 4.8,
      reviews: '10K+',
    }
    const encoded = encodeURIComponent(JSON.stringify(serviceData))
    router.push(`/checkout?data=${encoded}`)
  }

  return (
    <section className="relative py-12 px-4 bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-accent-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-200/20 to-primary-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative max-w-7xl mx-auto">
        <AnimateOnScroll animation="fade-in-down">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Special Offers
              </h2>
              <div className="h-1 w-12 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Exclusive deals on our premium services
            </p>
          </div>
        </AnimateOnScroll>

        {/* Banner Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredServices.map((service) => (
                <div
                  key={service.id}
                  className="min-w-full relative"
                >
                  <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                    {/* Background Image */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

                    {/* Content */}
                    <div className="relative h-full flex items-center">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                          {/* Left Content */}
                          <AnimateOnScroll animation="fade-in-right">
                            <div className="text-white space-y-6">
                              {/* Badge */}
                              <div className="flex items-center gap-3">
                                <span className="px-4 py-2 bg-[#e56481] rounded-full text-sm font-bold shadow-lg">
                                  {service.badge}
                                </span>
                                <span className="px-4 py-2 bg-green-500 rounded-full text-sm font-bold shadow-lg">
                                  {service.discount}
                                </span>
                              </div>

                              {/* Icon */}
                              <div className="text-7xl">{service.icon}</div>

                              {/* Title */}
                              <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                                {service.title}
                              </h3>

                              {/* Description */}
                              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                                {service.description}
                              </p>

                              {/* CTA Button */}
                              <button
                                onClick={() => handleServiceClick(service)}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 text-white"
                                style={{ backgroundColor: '#e56481' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
                              >
                                Order Now
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </button>
                            </div>
                          </AnimateOnScroll>

                          {/* Right Image/Icon */}
                          <AnimateOnScroll animation="fade-in-left" className="hidden md:block">
                            <div className="flex justify-center items-center">
                              <div className="relative">
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-150"></div>
                                <div className="relative text-9xl opacity-80">
                                  {service.icon}
                                </div>
                              </div>
                            </div>
                          </AnimateOnScroll>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredServices.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-8 bg-[#e56481]'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => goToSlide((currentSlide - 1 + featuredServices.length) % featuredServices.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => goToSlide((currentSlide + 1) % featuredServices.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Quick Service Cards Below Banner */}
        <AnimateOnScroll animation="fade-in-up" delay={200}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredServices.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#e56481] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-left"
              >
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-[#e56481] transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                    {service.discount}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

