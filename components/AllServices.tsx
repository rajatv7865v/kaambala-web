'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AnimateOnScroll from './AnimateOnScroll'

// Helper function to get local image based on service name
const getServiceImage = (serviceName: string, fallbackImage: string): string => {
  const imageMap: { [key: string]: string } = {
    'Haircut': '/assets/images/Haircut.jpeg',
    'Haircut & Styling': '/assets/images/Haircut.jpeg',
    'Haircut & Beard Styling': '/assets/images/Haircut.jpeg',
    'Facial Treatment': '/assets/images/Facial.jpeg',
    'Facial & Cleanup': '/assets/images/Facial.jpeg',
    'AC Service and Repair': '/assets/images/AC Repair (1).jpeg',
    'AC Installation': '/assets/images/AC Repair (1).jpeg',
    'AC Repair': '/assets/images/AC Repair (1).jpeg',
    'AC Maintenance': '/assets/images/AC Repair (1).jpeg',
    'AC Gas Filling': '/assets/images/AC Repair (1).jpeg',
    'Plumbing Repairs': '/assets/images/Plumbing.jpeg',
    'Installations': '/assets/images/Plumbing.jpeg',
    'Leak Fixing': '/assets/images/Plumbing.jpeg',
    'Pipe Replacement': '/assets/images/Plumbing.jpeg',
    'Tap repair': '/assets/images/Plumbing.jpeg',
    'Flush Tank Repair': '/assets/images/Plumbing.jpeg',
    'Interior Painting': '/assets/images/Home Painting.jpeg',
    'Exterior Painting': '/assets/images/Home Painting.jpeg',
    'Wall Repair': '/assets/images/Home Painting.jpeg',
    'Wall Texture': '/assets/images/Home Painting.jpeg',
    'Furniture Repair': '/assets/images/SOFA Repair.jpeg',
    'Sofa & Carpet Cleaning': '/assets/images/SOFA Repair.jpeg',
    'Cabinet Repair': '/assets/images/SOFA Repair.jpeg',
  }
  
  // Try to find exact match first
  if (imageMap[serviceName]) {
    return imageMap[serviceName]
  }
  
  // Try partial match (case-insensitive)
  const serviceNameLower = serviceName.toLowerCase()
  for (const [key, value] of Object.entries(imageMap)) {
    if (serviceNameLower.includes(key.toLowerCase()) || key.toLowerCase().includes(serviceNameLower)) {
      return value
    }
  }
  
  // Check for keywords
  if (serviceNameLower.includes('haircut') || serviceNameLower.includes('hair cut')) {
    return '/assets/images/Haircut.jpeg'
  }
  if (serviceNameLower.includes('facial')) {
    return '/assets/images/Facial.jpeg'
  }
  if (serviceNameLower.includes('ac') || serviceNameLower.includes('air condition')) {
    return '/assets/images/AC Repair (1).jpeg'
  }
  if (serviceNameLower.includes('plumb') || serviceNameLower.includes('tap') || serviceNameLower.includes('pipe') || serviceNameLower.includes('leak')) {
    return '/assets/images/Plumbing.jpeg'
  }
  if (serviceNameLower.includes('paint') || serviceNameLower.includes('wall')) {
    return '/assets/images/Home Painting.jpeg'
  }
  if (serviceNameLower.includes('sofa') || serviceNameLower.includes('furniture') || serviceNameLower.includes('cabinet')) {
    return '/assets/images/SOFA Repair.jpeg'
  }
  if (serviceNameLower.includes('door') || serviceNameLower.includes('lock')) {
    return '/assets/images/Doorlock repair.jpeg'
  }
  if (serviceNameLower.includes('cctv') || serviceNameLower.includes('camera') || serviceNameLower.includes('security')) {
    return '/assets/images/CCTV Install.jpeg'
  }
  if (serviceNameLower.includes('mehandi') || serviceNameLower.includes('henna')) {
    return '/assets/images/Mehandi .jpeg'
  }
  
  return fallbackImage
}

const serviceCategories = [
  {
    id: 1,
    title: 'Salon for Women',
    icon: '💇‍♀️',
    services: [
      { name: 'Waxing', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=200&fit=crop', rating: 4.8, reviews: '12K+' },
      { name: 'Cleanup', image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=200&fit=crop', rating: 4.7, reviews: '8K+' },
      { name: 'Hair care', image: 'https://images.unsplash.com/photo-1560869713-7d563b1e4e79?w=300&h=200&fit=crop', rating: 4.9, reviews: '15K+' },
      { name: 'Haircut & Styling', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop', rating: 4.8, reviews: '10K+' },
      { name: 'Hair Color', image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=200&fit=crop&q=75', rating: 4.7, reviews: '6K+' },
    ],
  },
  {
    id: 2,
    title: 'Spa for Women',
    icon: '🧘‍♀️',
    services: [
      { name: 'Stress relief', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop', rating: 4.9, reviews: '5K+' },
      { name: 'Pain relief', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&h=200&fit=crop', rating: 4.8, reviews: '4K+' },
      { name: 'Full Body Massage', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=300&h=200&fit=crop', rating: 4.9, reviews: '7K+' },
      { name: 'Facial Treatment', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=200&fit=crop', rating: 4.8, reviews: '6K+' },
    ],
  },
  {
    id: 3,
    title: 'Cleaning & Pest Control',
    icon: '🧹',
    services: [
      { name: 'Bathroom & Kitchen Cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop', rating: 4.7, reviews: '25K+' },
      { name: 'Sofa & Carpet Cleaning', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=200&fit=crop', rating: 4.8, reviews: '18K+' },
      { name: 'Deep Cleaning', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=300&h=200&fit=crop', rating: 4.7, reviews: '20K+' },
      { name: 'Pest Control', image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop', rating: 4.6, reviews: '12K+' },
      { name: 'Window Cleaning', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=300&h=200&fit=crop&q=75', rating: 4.7, reviews: '9K+' },
    ],
  },
  {
    id: 4,
    title: 'Appliance Repair & Service',
    icon: '🔧',
    services: [
      { name: 'AC Service and Repair', image: 'https://images.unsplash.com/photo-1631542771833-cff2a0e0c0a0?w=300&h=200&fit=crop', rating: 4.8, reviews: '15K+' },
      { name: 'Washing Machine Repair', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop', rating: 4.7, reviews: '10K+' },
      { name: 'Refrigerator Repair', image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=300&h=200&fit=crop', rating: 4.8, reviews: '8K+' },
      { name: 'Water Purifier Repair', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop', rating: 4.7, reviews: '6K+' },
      { name: 'Microwave Repair', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&h=200&fit=crop', rating: 4.6, reviews: '5K+' },
    ],
  },
  {
    id: 5,
    title: 'Home Repair & Installation',
    icon: '🛠️',
    services: [
      { name: 'Tap repair', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=300&h=200&fit=crop', rating: 4.8, reviews: '12K+' },
      { name: 'Fan repair', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop', rating: 4.7, reviews: '9K+' },
      { name: 'Drill & Hang', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=200&fit=crop', rating: 4.8, reviews: '7K+' },
      { name: 'Flush Tank Repair', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=300&h=200&fit=crop', rating: 4.7, reviews: '6K+' },
      { name: 'Switch/Socket Replacement', image: 'https://images.unsplash.com/photo-1621905252472-6af5193e3b43?w=300&h=200&fit=crop', rating: 4.8, reviews: '8K+' },
    ],
  },
  {
    id: 6,
    title: 'Salon for Men',
    icon: '💇‍♂️',
    services: [
      { name: 'Haircut & Beard Styling', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop&q=75', rating: 4.8, reviews: '9K+' },
      { name: 'Facial & Cleanup', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=200&fit=crop', rating: 4.7, reviews: '7K+' },
      { name: 'Pedicure & Manicure', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=200&fit=crop', rating: 4.6, reviews: '5K+' },
      { name: 'Hair Color & Spa', image: 'https://images.unsplash.com/photo-1560869713-7d563b1e4e79?w=300&h=200&fit=crop&q=75', rating: 4.8, reviews: '6K+' },
    ],
  },
  {
    id: 7,
    title: 'Carpenter',
    icon: '🔨',
    services: [
      { name: 'Furniture Repair', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=200&fit=crop', rating: 4.7, reviews: '7K+' },
      { name: 'Custom Work', image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=300&h=200&fit=crop', rating: 4.8, reviews: '5K+' },
      { name: 'Installation', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop', rating: 4.7, reviews: '8K+' },
      { name: 'Cabinet Repair', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=200&fit=crop&q=75', rating: 4.6, reviews: '4K+' },
    ],
  },
  {
    id: 8,
    title: 'Electrician',
    icon: '⚡',
    services: [
      { name: 'Electrical Repairs', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop', rating: 4.9, reviews: '18K+' },
      { name: 'Installations', image: 'https://images.unsplash.com/photo-1621905252472-6af5193e3b43?w=300&h=200&fit=crop', rating: 4.8, reviews: '15K+' },
      { name: 'Switchboard Repair', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop', rating: 4.7, reviews: '10K+' },
      { name: 'Wiring Services', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop&q=75', rating: 4.8, reviews: '12K+' },
    ],
  },
  {
    id: 9,
    title: 'Plumber',
    icon: '🚿',
    services: [
      { name: 'Plumbing Repairs', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=300&h=200&fit=crop', rating: 4.8, reviews: '20K+' },
      { name: 'Installations', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=300&h=200&fit=crop', rating: 4.7, reviews: '16K+' },
      { name: 'Leak Fixing', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=200&fit=crop', rating: 4.8, reviews: '18K+' },
      { name: 'Pipe Replacement', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=300&h=200&fit=crop&q=75', rating: 4.7, reviews: '11K+' },
    ],
  },
  {
    id: 10,
    title: 'Painting',
    icon: '🎨',
    services: [
      { name: 'Interior Painting', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&h=200&fit=crop', rating: 4.7, reviews: '6K+' },
      { name: 'Exterior Painting', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop', rating: 4.6, reviews: '5K+' },
      { name: 'Wall Repair', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=300&h=200&fit=crop', rating: 4.7, reviews: '4K+' },
      { name: 'Wall Texture', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&h=200&fit=crop&q=75', rating: 4.6, reviews: '3K+' },
    ],
  },
  {
    id: 11,
    title: 'AC Services',
    icon: '❄️',
    services: [
      { name: 'AC Installation', image: 'https://images.unsplash.com/photo-1631542771833-cff2a0e0c0a0?w=300&h=200&fit=crop', rating: 4.8, reviews: '14K+' },
      { name: 'AC Repair', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&h=200&fit=crop', rating: 4.7, reviews: '16K+' },
      { name: 'AC Maintenance', image: 'https://images.unsplash.com/photo-1631542771833-cff2a0e0c0a0?w=300&h=200&fit=crop&q=75', rating: 4.8, reviews: '12K+' },
      { name: 'AC Gas Filling', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop', rating: 4.7, reviews: '10K+' },
    ],
  },
]

export default function AllServices() {
  const router = useRouter()

  // Price mapping based on service category and type
  const getServicePrice = (categoryTitle: string, serviceName: string): number => {
    const priceMap: { [key: string]: { [key: string]: number } } = {
      'Salon for Women': {
        'Waxing': 299,
        'Cleanup': 199,
        'Hair care': 499,
        'Haircut & Styling': 399,
        'Hair Color': 1299,
      },
      'Spa for Women': {
        'Stress relief': 999,
        'Pain relief': 1199,
        'Full Body Massage': 1499,
        'Facial Treatment': 799,
      },
      'Cleaning & Pest Control': {
        'Bathroom & Kitchen Cleaning': 999,
        'Sofa & Carpet Cleaning': 1299,
        'Deep Cleaning': 1999,
        'Pest Control': 1499,
        'Window Cleaning': 599,
      },
      'Appliance Repair & Service': {
        'AC Service and Repair': 799,
        'Washing Machine Repair': 599,
        'Refrigerator Repair': 699,
        'Water Purifier Repair': 499,
        'Microwave Repair': 399,
      },
      'Home Repair & Installation': {
        'Tap repair': 299,
        'Fan repair': 399,
        'Drill & Hang': 499,
        'Flush Tank Repair': 599,
        'Switch/Socket Replacement': 399,
      },
      'Salon for Men': {
        'Haircut & Beard Styling': 299,
        'Facial & Cleanup': 399,
        'Pedicure & Manicure': 499,
        'Hair Color & Spa': 899,
      },
      'Carpenter': {
        'Furniture Repair': 699,
        'Custom Work': 999,
        'Installation': 799,
        'Cabinet Repair': 599,
      },
      'Electrician': {
        'Electrical Repairs': 499,
        'Installations': 699,
        'Switchboard Repair': 899,
        'Wiring Services': 1299,
      },
      'Plumber': {
        'Plumbing Repairs': 499,
        'Installations': 799,
        'Leak Fixing': 599,
        'Pipe Replacement': 899,
      },
      'Painting': {
        'Interior Painting': 2999,
        'Exterior Painting': 3999,
        'Wall Repair': 999,
        'Wall Texture': 1499,
      },
      'AC Services': {
        'AC Installation': 2999,
        'AC Repair': 799,
        'AC Maintenance': 599,
        'AC Gas Filling': 1299,
      },
    }
    
    return priceMap[categoryTitle]?.[serviceName] || 499 // Default price
  }

  const handleServiceClick = (categoryTitle: string, serviceName: string, serviceImage: string, serviceRating: number, serviceReviews: string) => {
    // Map category title to category slug
    const categoryMap: { [key: string]: string } = {
      'Salon for Women': 'beauty-salon',
      'Spa for Women': 'beauty-salon',
      'Cleaning & Pest Control': 'cleaning',
      'Appliance Repair & Service': 'ac-repair',
      'Home Repair & Installation': 'carpenter',
      'Salon for Men': 'beauty-salon',
      'Carpenter': 'carpenter',
      'Electrician': 'electrician',
      'Plumber': 'plumbing',
      'Painting': 'painting',
      'AC Services': 'ac-repair',
    }

    const servicePrice = getServicePrice(categoryTitle, serviceName)
    const finalImage = getServiceImage(serviceName, serviceImage)

    const serviceData = {
      id: Date.now(),
      name: serviceName,
      category: categoryMap[categoryTitle] || 'other',
      icon: serviceCategories.find(cat => cat.title === categoryTitle)?.icon || '🏠',
      image: finalImage,
      rating: serviceRating,
      reviews: serviceReviews,
      price: servicePrice,
    }
    const encoded = encodeURIComponent(JSON.stringify(serviceData))
    router.push(`/checkout?data=${encoded}`)
  }

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll animation="fade-in-down">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-16 bg-gradient-to-r from-[#e56481] to-[#d45471] rounded-full"></div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
                All Services
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[#d45471] to-[#e56481] rounded-full"></div>
            </div>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Explore our complete range of professional home services
            </p>
          </div>
        </AnimateOnScroll>

        {/* Service Categories */}
        <div className="space-y-16">
          {serviceCategories.map((category, categoryIndex) => (
            <AnimateOnScroll key={category.id} animation="fade-in-up" delay={categoryIndex * 100}>
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-8 px-2">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center text-3xl md:text-4xl shadow-lg border-2 border-primary-100">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 font-medium">
                        {category.services.length} premium services available
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push('/services')}
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-[#e56481] font-bold hover:bg-[#e56481] hover:text-white transition-all duration-300 border-2 border-[#e56481] transform hover:scale-105 active:scale-95"
                  >
                    View All
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Horizontal Scrollable Service Cards */}
                <div className="relative">
                  <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 -mx-4 px-4 scroll-smooth">
                    {category.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        onClick={() => handleServiceClick(category.title, service.name, service.image, service.rating, service.reviews)}
                        className="flex-shrink-0 w-80 md:w-96 cursor-pointer group"
                      >
                        <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-[#e56481] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                          {/* Service Image */}
                          <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                            <img
                              src={getServiceImage(service.name, service.image)}
                              alt={service.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                // Try fallback to original image
                                if (target.src !== service.image) {
                                  target.src = service.image
                                  return
                                }
                                target.style.display = 'none'
                                const parent = target.parentElement
                                if (parent) {
                                  parent.className = 'relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 flex items-center justify-center'
                                  const fallback = document.createElement('div')
                                  fallback.className = 'text-6xl opacity-30'
                                  fallback.textContent = category.icon
                                  parent.appendChild(fallback)
                                }
                              }}
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Rating Badge - Top Right */}
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 shadow-xl flex items-center gap-1.5 border border-white/50">
                              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-sm font-bold text-gray-900">{service.rating}</span>
                            </div>

                            {/* Icon Badge - Top Left */}
                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-white/50 group-hover:scale-110 transition-transform duration-300">
                              <span className="text-2xl">{category.icon}</span>
                            </div>
                            
                            {/* Price Badge - Bottom Left */}
                            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-xl border border-white/50">
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-medium">From</span>
                                <span className="text-xl font-extrabold text-[#e56481]">
                                  ₹{getServicePrice(category.title, service.name).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            
                            {/* Service Name Overlay on Hover */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
                              <h4 className="text-white font-bold text-lg md:text-xl drop-shadow-lg line-clamp-2">
                                {service.name}
                              </h4>
                            </div>
                          </div>

                          {/* Service Info */}
                          <div className="p-6 flex flex-col flex-1">
                            <h4 className="font-bold text-gray-900 mb-3 group-hover:text-[#e56481] transition-colors text-lg md:text-xl line-clamp-2 leading-tight">
                              {service.name}
                            </h4>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg">
                                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm font-bold text-gray-900">{service.rating}</span>
                              </div>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-600 font-medium">{service.reviews} reviews</span>
                            </div>
                            
                            {/* Price Display */}
                            <div className="mb-4 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xs text-gray-500 font-medium">Starting from</span>
                                <span className="text-2xl font-extrabold text-[#e56481]">
                                  ₹{getServicePrice(category.title, service.name).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            
                            {/* Order Button */}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleServiceClick(category.title, service.name, service.image, service.rating, service.reviews)
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
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* View All Services Link */}
        <AnimateOnScroll animation="fade-in-up" delay={1200}>
          <div className="text-center mt-16">
            <button
              onClick={() => router.push('/services')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 border-2 border-[#e56481] text-[#e56481] hover:bg-[#e56481] hover:text-white transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              View All Services
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </AnimateOnScroll>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
