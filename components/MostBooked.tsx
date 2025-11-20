'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AnimateOnScroll from './AnimateOnScroll'
import { useEnquiry } from '@/contexts/EnquiryContext'

// Helper function to get local image based on service name
const getServiceImage = (serviceName: string, category: string, fallbackImage: string): string => {
  const serviceNameLower = serviceName.toLowerCase()
  const categoryLower = category.toLowerCase()
  
  // Check for keywords in service name and category
  if (serviceNameLower.includes('haircut') || serviceNameLower.includes('hair cut')) {
    return '/assets/images/Haircut.jpeg'
  }
  if (serviceNameLower.includes('facial')) {
    return '/assets/images/Facial.jpeg'
  }
  if (serviceNameLower.includes('ac') || serviceNameLower.includes('air condition') || categoryLower.includes('ac')) {
    return '/assets/images/AC Repair (1).jpeg'
  }
  if (serviceNameLower.includes('plumb') || serviceNameLower.includes('tap') || serviceNameLower.includes('pipe') || serviceNameLower.includes('leak') || serviceNameLower.includes('flush') || categoryLower.includes('plumb')) {
    return '/assets/images/Plumbing.jpeg'
  }
  if (serviceNameLower.includes('paint') || serviceNameLower.includes('wall')) {
    return '/assets/images/Home Painting.jpeg'
  }
  if (serviceNameLower.includes('sofa') || serviceNameLower.includes('furniture') || serviceNameLower.includes('cabinet') || serviceNameLower.includes('carpenter') || serviceNameLower.includes('drill')) {
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
  if (serviceNameLower.includes('cleaning') || categoryLower.includes('cleaning')) {
    return '/assets/images/SOFA Repair.jpeg' // Use SOFA repair image for cleaning services
  }
  
  return fallbackImage
}

const mostBookedServices = [
  {
    id: 1,
    name: 'Intense cleaning (2 bathrooms)',
    rating: 4.79,
    reviews: '3.5M',
    image: '/assets/images/SOFA Repair.jpeg',
    icon: '🧹',
    category: 'cleaning',
  },
  {
    id: 2,
    name: 'Classic cleaning (2 bathrooms)',
    rating: 4.82,
    reviews: '1.5M',
    image: '/assets/images/SOFA Repair.jpeg',
    icon: '🧹',
    category: 'cleaning',
  },
  {
    id: 3,
    name: 'Foam-jet AC service',
    rating: 4.77,
    reviews: '1.8M',
    image: '/assets/images/AC Repair (1).jpeg',
    icon: '❄️',
    category: 'ac-repair',
  },
  {
    id: 4,
    name: 'Tap repair',
    rating: 4.81,
    reviews: '121K',
    image: '/assets/images/Plumbing.jpeg',
    icon: '🚿',
    category: 'plumbing',
  },
  {
    id: 5,
    name: 'Haircut for men',
    rating: 4.88,
    reviews: '471K',
    image: '/assets/images/Haircut.jpeg',
    icon: '💇‍♂️',
    category: 'beauty-salon',
  },
  {
    id: 6,
    name: 'Automatic top load machine check-up',
    rating: 4.78,
    reviews: '333K',
    image: '/assets/images/AC Repair (1).jpeg',
    icon: '🔧',
    category: 'ac-repair',
  },
  {
    id: 7,
    name: 'Fan repair (ceiling/exhaust/wall)',
    rating: 4.81,
    reviews: '93K',
    image: '/assets/images/AC Repair (1).jpeg',
    icon: '⚡',
    category: 'electrician',
  },
  {
    id: 8,
    name: 'Drill & hang (wall decor)',
    rating: 4.86,
    reviews: '100K',
    image: '/assets/images/SOFA Repair.jpeg',
    icon: '🔨',
    category: 'carpenter',
  },
  {
    id: 9,
    name: 'Flush tank repair (external PVC)',
    rating: 4.79,
    reviews: '69K',
    image: '/assets/images/Plumbing.jpeg',
    icon: '🚿',
    category: 'plumbing',
  },
  {
    id: 10,
    name: 'Intense cleaning (3 bathrooms)',
    rating: 4.79,
    reviews: '3.5M',
    image: '/assets/images/SOFA Repair.jpeg',
    icon: '🧹',
    category: 'cleaning',
  },
].map(service => ({
  ...service,
  image: getServiceImage(service.name, service.category, service.image)
}))

export default function MostBooked() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('.service-card')?.clientWidth || 300;
      const gap = 24; // gap-6 = 1.5rem = 24px
      const scrollAmount = cardWidth + gap;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll animation="fade-in-down">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-16 bg-gradient-to-r from-[#e56481] to-[#d45471] rounded-full"></div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
                Most Booked Services
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[#d45471] to-[#e56481] rounded-full"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover our most popular services trusted by millions of customers
            </p>
          </div>
        </AnimateOnScroll>
        
        {/* Scrollable Container */}
        <div className="relative">
          {/* Left Arrow Button */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-gray-200 hover:border-[#e56481]"
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6 text-gray-700 hover:text-[#e56481] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Arrow Button */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-gray-200 hover:border-[#e56481]"
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6 text-gray-700 hover:text-[#e56481] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onScroll={checkScrollButtons}
          >
            {mostBookedServices.map((service, index) => (
              <div
                key={service.id}
                className="service-card flex-shrink-0"
                style={{ 
                  width: 'calc((100% - 72px) / 4)',
                  minWidth: '280px'
                }}
              >
                <AnimateOnScroll animation="scale-in" delay={index * 50}>
                  <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-[#e56481] hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2 h-full flex flex-col">
                    {/* Service Image Section */}
                    <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          // Fallback gradient if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.className = 'relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 flex items-center justify-center';
                            const fallback = document.createElement('div');
                            fallback.className = 'text-6xl opacity-30';
                            fallback.textContent = service.icon;
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Icon Badge Overlay - Top Left */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/50">
                        <span className="text-3xl">{service.icon}</span>
                      </div>
                      
                      {/* Rating Badge Overlay - Top Right */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl flex items-center gap-1.5 border border-white/50">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-bold text-gray-900">{service.rating}</span>
                      </div>
                      
                      {/* Popular Badge */}
                      <div className="absolute bottom-4 left-4 bg-gradient-to-r from-[#e56481] to-[#d45471] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        ⭐ Most Booked
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        {/* Icon in content */}
                        <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-primary-100">
                          <span className="text-2xl">{service.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#e56481] transition-colors leading-tight mb-2">
                            {service.name}
                          </h3>
                          
                          {/* Reviews */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-sm font-semibold text-gray-700">{service.rating}</span>
                            </div>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-600 font-medium">{service.reviews} reviews</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Order Button */}
                      <button 
                        onClick={() => {
                          const serviceData = {
                            id: service.id,
                            name: service.name,
                            category: service.category,
                            icon: service.icon,
                            image: service.image,
                            rating: service.rating,
                            reviews: service.reviews,
                          }
                          const encoded = encodeURIComponent(JSON.stringify(serviceData))
                          router.push(`/checkout?data=${encoded}`)
                        }}
                        className="w-full mt-auto text-white px-6 py-3.5 rounded-xl transition-all duration-300 text-base font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-100" 
                        style={{ backgroundColor: '#e56481' }} 
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'} 
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

