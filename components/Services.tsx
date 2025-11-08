'use client'

import { useEnquiry } from '@/contexts/EnquiryContext'

const serviceCategories = [
  {
    id: 1,
    title: 'Salon for Women',
    services: ['Waxing', 'Cleanup', 'Hair care'],
    icon: '💇‍♀️',
    color: 'pink',
  },
  {
    id: 2,
    title: 'Spa for women',
    services: ['Stress relief', 'Pain relief'],
    icon: '🧘‍♀️',
    color: 'purple',
  },
  {
    id: 3,
    title: 'Cleaning & pest control',
    services: ['Bathroom & kitchen cleaning', 'Sofa & Carpet Cleaning'],
    icon: '🧹',
    color: 'green',
  },
  {
    id: 4,
    title: 'Appliance repair & service',
    services: ['AC Service and Repair', 'Washing Machine Repair', 'Water Purifier Repair', 'Refrigerator Repair', 'Microwave Repair'],
    icon: '🔧',
    color: 'blue',
  },
  {
    id: 5,
    title: 'Home repair & installation',
    services: ['Tap repair', 'Fan repair', 'Drill & hang', 'Flush tank repair', 'Switch/socket replacement'],
    icon: '🛠️',
    color: 'amber',
  },
  {
    id: 6,
    title: 'Salon for men',
    services: ['Haircut & beard styling', 'Facial & cleanup', 'Pedicure & Manicure', 'Hair color & Hair spa'],
    icon: '💇‍♂️',
    color: 'blue',
  },
  {
    id: 7,
    title: 'Carpenter',
    services: ['Furniture repair', 'Custom work', 'Installation'],
    icon: '🔨',
    color: 'amber',
  },
  {
    id: 8,
    title: 'Electrician',
    services: ['Electrical repairs', 'Installations', 'Switchboard repair'],
    icon: '⚡',
    color: 'yellow',
  },
  {
    id: 9,
    title: 'Plumber',
    services: ['Plumbing repairs', 'Installations', 'Leak fixing'],
    icon: '🚿',
    color: 'cyan',
  },
  {
    id: 10,
    title: 'Painting',
    services: ['Interior painting', 'Exterior painting', 'Wall repair'],
    icon: '🎨',
    color: 'purple',
  },
  {
    id: 11,
    title: 'AC Services',
    services: ['AC installation', 'AC repair', 'AC maintenance'],
    icon: '❄️',
    color: 'indigo',
  },
]

export default function Services() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section id="services" className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {serviceCategories.map((category) => (
          <div key={category.id} className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {category.title}
                </h2>
              </div>
              <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1 group/btn transition-all duration-300 transform hover:scale-105 active:scale-95">
                See all
                <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => {
                    // Map service to enquiry form service type
                    const serviceMap: { [key: string]: string } = {
                      'Waxing': 'beauty-salon',
                      'Cleanup': 'beauty-salon',
                      'Hair care': 'beauty-salon',
                      'Stress relief': 'beauty-salon',
                      'Pain relief': 'beauty-salon',
                      'Bathroom & kitchen cleaning': 'cleaning',
                      'Sofa & Carpet Cleaning': 'cleaning',
                      'AC Service and Repair': 'ac-repair',
                      'Washing Machine Repair': 'ac-repair',
                      'Water Purifier Repair': 'ac-repair',
                      'Refrigerator Repair': 'ac-repair',
                      'Microwave Repair': 'ac-repair',
                      'Tap repair': 'plumbing',
                      'Fan repair': 'electrician',
                      'Drill & hang': 'carpenter',
                      'Flush tank repair': 'plumbing',
                      'Switch/socket replacement': 'electrician',
                      'Haircut & beard styling': 'beauty-salon',
                      'Facial & cleanup': 'beauty-salon',
                      'Pedicure & Manicure': 'beauty-salon',
                      'Hair color & Hair spa': 'beauty-salon',
                      'Furniture repair': 'carpenter',
                      'Custom work': 'carpenter',
                      'Installation': 'carpenter',
                      'Electrical repairs': 'electrician',
                      'Installations': 'electrician',
                      'Switchboard repair': 'electrician',
                      'Plumbing repairs': 'plumbing',
                      'Leak fixing': 'plumbing',
                      'Interior painting': 'painting',
                      'Exterior painting': 'painting',
                      'Wall repair': 'painting',
                      'AC installation': 'ac-repair',
                      'AC repair': 'ac-repair',
                      'AC maintenance': 'ac-repair',
                    };
                    const serviceType = serviceMap[service] || 'other';
                    openEnquiryModal(serviceType);
                  }}
                  className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
                >
                  {/* Icon/Image Section */}
                  <div className="relative h-32 bg-gradient-to-br from-primary-50 via-primary-100/50 to-accent-50 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-200/20 to-accent-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="text-5xl transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-300 relative z-10">
                      {category.icon}
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-primary-200/30 rounded-full blur-sm group-hover:bg-primary-300/50 transition-colors"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 bg-accent-200/30 rounded-full blur-sm group-hover:bg-accent-300/50 transition-colors"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-gray-900 text-center group-hover:text-primary-600 transition-colors leading-tight line-clamp-2 min-h-[2.5rem]">
                      {service}
                    </h3>
                    
                    {/* Quick Info */}
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-semibold text-gray-600">4.8</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">Book Now</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

