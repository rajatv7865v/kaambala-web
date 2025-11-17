'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AnimateOnScroll from './AnimateOnScroll'
import { useEnquiry } from '@/contexts/EnquiryContext'

const mostBookedServices = [
  {
    id: 1,
    name: 'Intense cleaning (2 bathrooms)',
    rating: 4.79,
    reviews: '3.5M',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    icon: '🧹',
    category: 'cleaning',
  },
  {
    id: 2,
    name: 'Classic cleaning (2 bathrooms)',
    rating: 4.82,
    reviews: '1.5M',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop',
    icon: '🧹',
    category: 'cleaning',
  },
  {
    id: 3,
    name: 'Foam-jet AC service',
    rating: 4.77,
    reviews: '1.8M',
    image: 'https://images.unsplash.com/photo-1631542771833-cff2a0e0c0a0?w=400&h=300&fit=crop',
    icon: '❄️',
    category: 'ac-repair',
  },
  {
    id: 4,
    name: 'Tap repair',
    rating: 4.81,
    reviews: '121K',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop',
    icon: '🚿',
    category: 'plumbing',
  },
  {
    id: 5,
    name: 'Haircut for men',
    rating: 4.88,
    reviews: '471K',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
    icon: '💇‍♂️',
    category: 'beauty-salon',
  },
  {
    id: 6,
    name: 'Automatic top load machine check-up',
    rating: 4.78,
    reviews: '333K',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    icon: '🔧',
    category: 'ac-repair',
  },
  {
    id: 7,
    name: 'Fan repair (ceiling/exhaust/wall)',
    rating: 4.81,
    reviews: '93K',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop',
    icon: '⚡',
    category: 'electrician',
  },
  {
    id: 8,
    name: 'Drill & hang (wall decor)',
    rating: 4.86,
    reviews: '100K',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
    icon: '🔨',
    category: 'carpenter',
  },
  {
    id: 9,
    name: 'Flush tank repair (external PVC)',
    rating: 4.79,
    reviews: '69K',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop',
    icon: '🚿',
    category: 'plumbing',
  },
  {
    id: 10,
    name: 'Intense cleaning (3 bathrooms)',
    rating: 4.79,
    reviews: '3.5M',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    icon: '🧹',
    category: 'cleaning',
  },
]

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
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll animation="fade-in-down">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full animate-pulse-slow"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Most booked services
              </h2>
              <div className="h-1 w-12 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full animate-pulse-slow"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-200"
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Arrow Button */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-200"
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1 h-full">
                {/* Service Image Section */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback gradient if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.className = 'relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 flex items-center justify-center';
                        const fallback = document.createElement('div');
                        fallback.className = 'text-6xl opacity-30';
                        fallback.textContent = service.icon;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  {/* Icon Badge Overlay - Top Left */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  {/* Rating Badge Overlay - Top Right */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-bold text-gray-900">{service.rating}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-2">
                    {/* Icon in content */}
                    <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-2 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl">{service.icon}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-[#e56481] transition-colors leading-snug flex-1">
                      {service.name}
                    </h3>
                  </div>
                  
                  {/* Reviews */}
                  <div className="flex items-center gap-2 mb-4 ml-11">
                    <span className="text-xs text-gray-500">({service.reviews} reviews)</span>
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
                    className="w-full text-white px-6 py-3 rounded-xl transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-100" 
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

