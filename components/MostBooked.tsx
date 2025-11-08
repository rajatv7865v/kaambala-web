'use client'

import AnimateOnScroll from './AnimateOnScroll'
import { useEnquiry } from '@/contexts/EnquiryContext'

const mostBookedServices = [
  {
    id: 1,
    name: 'Intense cleaning (2 bathrooms)',
    rating: 4.79,
    reviews: '3.5M',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Classic cleaning (2 bathrooms)',
    rating: 4.82,
    reviews: '1.5M',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Foam-jet AC service',
    rating: 4.77,
    reviews: '1.8M',
    image: 'https://images.unsplash.com/photo-1631542771833-cff2a0e0c0a0?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Tap repair',
    rating: 4.81,
    reviews: '121K',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    name: 'Haircut for men',
    rating: 4.88,
    reviews: '471K',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    name: 'Automatic top load machine check-up',
    rating: 4.78,
    reviews: '333K',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    id: 7,
    name: 'Fan repair (ceiling/exhaust/wall)',
    rating: 4.81,
    reviews: '93K',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop',
  },
  {
    id: 8,
    name: 'Drill & hang (wall decor)',
    rating: 4.86,
    reviews: '100K',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
  },
  {
    id: 9,
    name: 'Flush tank repair (external PVC)',
    rating: 4.79,
    reviews: '69K',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop',
  },
  {
    id: 10,
    name: 'Intense cleaning (3 bathrooms)',
    rating: 4.79,
    reviews: '3.5M',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  },
]

export default function MostBooked() {
  const { openEnquiryModal } = useEnquiry();

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mostBookedServices.map((service, index) => (
            <AnimateOnScroll key={service.id} animation="scale-in" delay={index * 50}>
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1">
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
                        const icon = service.name.toLowerCase().includes('cleaning') ? '🧹' :
                                     service.name.toLowerCase().includes('ac') ? '❄️' :
                                     service.name.toLowerCase().includes('haircut') ? '💇‍♂️' :
                                     service.name.toLowerCase().includes('tap') ? '🚿' :
                                     service.name.toLowerCase().includes('fan') ? '🌀' :
                                     service.name.toLowerCase().includes('drill') ? '🔨' :
                                     service.name.toLowerCase().includes('flush') ? '🚽' :
                                     service.name.toLowerCase().includes('machine') ? '⚙️' : '🏠';
                        fallback.textContent = icon;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  {/* Rating Badge Overlay */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-bold text-gray-900">{service.rating}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#e56481] transition-colors min-h-[3rem] leading-snug">
                    {service.name}
                  </h3>
                  
                  {/* Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-gray-500">({service.reviews} reviews)</span>
                  </div>
                  
                  {/* Book Button */}
                  <button 
                    onClick={() => openEnquiryModal(service.name.toLowerCase().includes('cleaning') ? 'cleaning' : 
                      service.name.toLowerCase().includes('ac') ? 'ac-repair' :
                      service.name.toLowerCase().includes('haircut') ? 'beauty-salon' :
                      service.name.toLowerCase().includes('tap') ? 'plumbing' :
                      service.name.toLowerCase().includes('fan') ? 'electrician' :
                      service.name.toLowerCase().includes('drill') ? 'carpenter' :
                      service.name.toLowerCase().includes('flush') ? 'plumbing' :
                      service.name.toLowerCase().includes('machine') ? 'ac-repair' : 'other')}
                    className="w-full text-white px-6 py-3 rounded-xl transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-100" 
                    style={{ backgroundColor: '#e56481' }} 
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'} 
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

