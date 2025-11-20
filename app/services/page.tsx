'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEnquiry } from '@/contexts/EnquiryContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Helper function to get local image based on service name
const getServiceImage = (serviceName: string, fallbackImage: string = ''): string => {
  const serviceNameLower = serviceName.toLowerCase()
  
  // Check for keywords
  if (serviceNameLower.includes('haircut') || serviceNameLower.includes('hair cut') || serviceNameLower.includes('haircut &')) {
    return '/assets/images/Haircut.jpeg'
  }
  if (serviceNameLower.includes('facial') || serviceNameLower.includes('cleanup')) {
    return '/assets/images/Facial.jpeg'
  }
  if (serviceNameLower.includes('ac') || serviceNameLower.includes('air condition')) {
    return '/assets/images/AC Repair (1).jpeg'
  }
  if (serviceNameLower.includes('plumb') || serviceNameLower.includes('tap') || serviceNameLower.includes('pipe') || serviceNameLower.includes('leak') || serviceNameLower.includes('flush')) {
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
  if (serviceNameLower.includes('cleaning') || serviceNameLower.includes('pest')) {
    return '/assets/images/SOFA Repair.jpeg'
  }
  
  return fallbackImage || '/assets/images/Haircut.jpeg'
}

const serviceCategories = [
  {
    id: 1,
    title: 'Salon for Women',
    services: ['Waxing', 'Cleanup', 'Hair care', 'Haircut & Styling', 'Hair Color'],
    icon: '💇‍♀️',
    color: 'pink',
    popular: true,
    categorySlug: 'beauty-salon',
  },
  {
    id: 2,
    title: 'Spa for Women',
    services: ['Stress relief', 'Pain relief', 'Full Body Massage', 'Facial Treatment'],
    icon: '🧘‍♀️',
    color: 'purple',
    popular: false,
    categorySlug: 'beauty-salon',
  },
  {
    id: 3,
    title: 'Cleaning & Pest Control',
    services: ['Bathroom & Kitchen Cleaning', 'Sofa & Carpet Cleaning', 'Deep Cleaning', 'Pest Control', 'Window Cleaning'],
    icon: '🧹',
    color: 'green',
    popular: true,
    categorySlug: 'cleaning',
  },
  {
    id: 4,
    title: 'Appliance Repair & Service',
    services: ['AC Service and Repair', 'Washing Machine Repair', 'Refrigerator Repair', 'Water Purifier Repair', 'Microwave Repair'],
    icon: '🔧',
    color: 'blue',
    popular: true,
    categorySlug: 'ac-repair',
  },
  {
    id: 5,
    title: 'Home Repair & Installation',
    services: ['Tap repair', 'Fan repair', 'Drill & Hang', 'Flush Tank Repair', 'Switch/Socket Replacement'],
    icon: '🛠️',
    color: 'amber',
    popular: false,
    categorySlug: 'carpenter',
  },
  {
    id: 6,
    title: 'Salon for Men',
    services: ['Haircut & Beard Styling', 'Facial & Cleanup', 'Pedicure & Manicure', 'Hair Color & Spa'],
    icon: '💇‍♂️',
    color: 'blue',
    popular: false,
    categorySlug: 'beauty-salon',
  },
  {
    id: 7,
    title: 'Carpenter',
    services: ['Furniture Repair', 'Custom Work', 'Installation', 'Cabinet Repair'],
    icon: '🔨',
    color: 'amber',
    popular: false,
    categorySlug: 'carpenter',
  },
  {
    id: 8,
    title: 'Electrician',
    services: ['Electrical Repairs', 'Installations', 'Switchboard Repair', 'Wiring Services'],
    icon: '⚡',
    color: 'yellow',
    popular: true,
    categorySlug: 'electrician',
  },
  {
    id: 9,
    title: 'Plumber',
    services: ['Plumbing Repairs', 'Installations', 'Leak Fixing', 'Pipe Replacement'],
    icon: '🚿',
    color: 'cyan',
    popular: true,
    categorySlug: 'plumbing',
  },
  {
    id: 10,
    title: 'Painting',
    services: ['Interior Painting', 'Exterior Painting', 'Wall Repair', 'Wall Texture'],
    icon: '🎨',
    color: 'purple',
    popular: false,
    categorySlug: 'painting',
  },
  {
    id: 11,
    title: 'AC Services',
    services: ['AC Installation', 'AC Repair', 'AC Maintenance', 'AC Gas Filling'],
    icon: '❄️',
    color: 'indigo',
    popular: true,
    categorySlug: 'ac-repair',
  },
]

const features = [
  {
    id: 1,
    title: 'Verified Professionals',
    description: 'All our service providers are background verified and trained professionals.',
    icon: '✅',
  },
  {
    id: 2,
    title: '100% Satisfaction',
    description: 'We guarantee complete satisfaction or your money back. Quality assured!',
    icon: '💯',
  },
  {
    id: 3,
    title: 'Transparent Pricing',
    description: 'No hidden charges. See the exact price before booking. Pay only for what you need.',
    icon: '💰',
  },
  {
    id: 4,
    title: 'On-Time Service',
    description: 'Our professionals arrive on time, every time. We value your time as much as ours.',
    icon: '⏰',
  },
  {
    id: 5,
    title: 'Easy Booking',
    description: 'Book services in minutes with our simple and intuitive booking system.',
    icon: '📱',
  },
  {
    id: 6,
    title: '24/7 Support',
    description: 'Round-the-clock customer support to help you with any queries or issues.',
    icon: '🛟',
  },
]

const stats = [
  { number: '12K+', label: 'Happy Customers', icon: '👥' },
  { number: '20K+', label: 'Verified Professionals', icon: '✅' },
  { number: '50+', label: 'Cities Served', icon: '🏙️' },
  { number: '4.8', label: 'Average Rating', icon: '⭐' },
]

function ServicesContent() {
  const { openEnquiryModal } = useEnquiry();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Read search query from URL params on mount and when params change
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }
  }, [searchParams]);

  // Handle search input change (local state only)
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Handle search form submission - update URL
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('search', encodeURIComponent(searchQuery.trim()));
      router.push(`/services?${params.toString()}`);
    } else {
      router.push('/services');
    }
  };

  // Handle service click - navigate to checkout with service data
  const handleServiceClick = (serviceName: string, categorySlug: string) => {
    const serviceImage = getServiceImage(serviceName)
    const category = serviceCategories.find(cat => cat.categorySlug === categorySlug)
    
    const serviceData = {
      id: Date.now(),
      name: serviceName,
      category: categorySlug,
      icon: category?.icon || '🏠',
      image: serviceImage,
      rating: 4.8,
      reviews: '1K+',
      price: 499, // Default price
    }
    const encoded = encodeURIComponent(JSON.stringify(serviceData))
    router.push(`/checkout?data=${encoded}`)
  }

  // Filter services
  const filteredCategories = serviceCategories.filter(category => {
    const matchesSearch = searchQuery === '' || 
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === null || category.id.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularCategories = serviceCategories.filter(cat => cat.popular);

  return (
    <div className="min-h-screen bg-white">
           <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#e56481] via-[#d45471] to-[#e56481] text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Professional home services at your doorstep. Book now and experience quality service.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-2xl border-0 text-gray-900 text-lg focus:ring-4 focus:ring-white/50 outline-none shadow-2xl"
                />
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      {popularCategories.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-[#e56481] to-[#d45471] rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Popular Services</h2>
                <div className="h-1 w-12 bg-gradient-to-r from-[#d45471] to-[#e56481] rounded-full"></div>
              </div>
              <p className="text-lg text-gray-600">Most booked services by our customers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCategories.map((category) => {
                const firstServiceImage = getServiceImage(category.services[0] || '')
                return (
                  <div
                    key={category.id}
                    onClick={() => router.push(`/services/${category.categorySlug}`)}
                    className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#e56481] hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
                  >
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        src={firstServiceImage}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.className = 'relative h-64 bg-gradient-to-br from-primary-50 via-primary-100/50 to-accent-50 flex items-center justify-center overflow-hidden'
                            const fallback = document.createElement('div')
                            fallback.className = 'text-7xl transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-300 relative z-10'
                            fallback.textContent = category.icon
                            parent.appendChild(fallback)
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-[#e56481] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                        Popular
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white font-semibold text-lg drop-shadow-lg">
                          {category.services.length} services available
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{category.icon}</span>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#e56481] transition-colors">
                          {category.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.services.slice(0, 3).map((service, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium">
                            {service}
                          </span>
                        ))}
                        {category.services.length > 3 && (
                          <span className="text-xs bg-[#e56481]/10 text-[#e56481] px-3 py-1.5 rounded-full font-semibold">
                            +{category.services.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                selectedCategory === null
                  ? 'text-white shadow-lg'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
              style={selectedCategory === null ? { backgroundColor: '#e56481' } : {}}
              onMouseEnter={(e) => selectedCategory !== null && (e.currentTarget.style.backgroundColor = '#e5e7eb')}
              onMouseLeave={(e) => selectedCategory !== null && (e.currentTarget.style.backgroundColor = '#f3f4f6')}
            >
              All Categories
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id.toString() ? null : category.id.toString())}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  selectedCategory === category.id.toString()
                    ? 'text-white shadow-lg'
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
                style={selectedCategory === category.id.toString() ? { backgroundColor: '#e56481' } : {}}
                onMouseEnter={(e) => selectedCategory !== category.id.toString() && (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                onMouseLeave={(e) => selectedCategory !== category.id.toString() && (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category.id} className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1 w-16 bg-gradient-to-r from-[#e56481] to-[#d45471] rounded-full"></div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {category.title}
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {category.services.map((service, index) => {
                    const serviceImage = getServiceImage(service)
                    return (
                      <div
                        key={index}
                        onClick={() => handleServiceClick(service, category.categorySlug)}
                        className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-[#e56481] hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
                      >
                        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                          <img
                            src={serviceImage}
                            alt={service}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              const parent = target.parentElement
                              if (parent) {
                                parent.className = 'relative h-40 bg-gradient-to-br from-primary-50 via-primary-100/50 to-accent-50 flex items-center justify-center overflow-hidden'
                                const fallback = document.createElement('div')
                                fallback.className = 'text-5xl transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-300 relative z-10'
                                fallback.textContent = category.icon
                                parent.appendChild(fallback)
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-xs font-bold text-gray-900">4.8</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-bold text-gray-900 text-center group-hover:text-[#e56481] transition-colors leading-tight line-clamp-2 min-h-[2.5rem] mb-2">
                            {service}
                          </h3>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-xs text-[#e56481] font-semibold">Book Now</span>
                            <svg className="w-4 h-4 text-[#e56481] transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No services found. Try a different search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-[#e56481] to-[#d45471] rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Kaambala?</h2>
              <div className="h-1 w-12 bg-gradient-to-r from-[#d45471] to-[#e56481] rounded-full"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the best in home services with our premium features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#e56481] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#e56481] to-[#d45471] flex items-center justify-center text-3xl mb-4 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#e56481] via-[#d45471] to-[#e56481] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Trusted by millions across India
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <p className="text-white/90 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Contact us and we'll help you find the right service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openEnquiryModal()}
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-white"
              style={{ backgroundColor: '#e56481' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
            >
              Book a Service
            </button>
            <a
              href="/contact"
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 bg-white border-2 border-[#e56481] text-[#e56481] hover:bg-[#e56481] hover:text-white"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Loading services...</p>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <ServicesContent />
    </Suspense>
  )
}
