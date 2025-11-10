'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useEnquiry } from '@/contexts/EnquiryContext';

const services = [
  {
    name: 'Beauty & Salon',
    icon: '💇',
    description: 'Haircut, styling, spa, and beauty treatments',
    category: 'beauty-salon',
    popular: true,
  },
  {
    name: 'Home Cleaning',
    icon: '🧹',
    description: 'Deep cleaning, regular cleaning, and maintenance',
    category: 'cleaning',
    popular: true,
  },
  {
    name: 'AC Repair & Service',
    icon: '❄️',
    description: 'AC installation, repair, and maintenance',
    category: 'ac-repair',
    popular: true,
  },
  {
    name: 'Plumbing',
    icon: '🔧',
    description: 'Pipe repair, installation, and maintenance',
    category: 'plumbing',
    popular: false,
  },
  {
    name: 'Electrician',
    icon: '⚡',
    description: 'Electrical repairs, installation, and wiring',
    category: 'electrician',
    popular: false,
  },
  {
    name: 'Carpenter',
    icon: '🪚',
    description: 'Furniture repair, installation, and custom work',
    category: 'carpenter',
    popular: false,
  },
  {
    name: 'Painting',
    icon: '🎨',
    description: 'Interior and exterior painting services',
    category: 'painting',
    popular: false,
  },
  {
    name: 'Other Services',
    icon: '🔨',
    description: 'Custom services as per your requirement',
    category: 'other',
    popular: false,
  },
];

export default function ServicesPage() {
  const { openEnquiryModal } = useEnquiry();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = selectedCategory
    ? services.filter(s => s.category === selectedCategory)
    : services;

  const categories = Array.from(new Set(services.map(s => s.category)));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Services</h1>
        <p className="text-gray-600">Browse and book from our wide range of home services</p>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
            selectedCategory === null
              ? 'text-white'
              : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
          }`}
          style={selectedCategory === null ? { backgroundColor: '#e56481' } : {}}
          onMouseEnter={(e) => selectedCategory !== null && (e.currentTarget.style.backgroundColor = '#f9fafb')}
          onMouseLeave={(e) => selectedCategory !== null && (e.currentTarget.style.backgroundColor = 'white')}
        >
          All Services
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 capitalize ${
              selectedCategory === category
                ? 'text-white'
                : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
            }`}
            style={selectedCategory === category ? { backgroundColor: '#e56481' } : {}}
            onMouseEnter={(e) => selectedCategory !== category && (e.currentTarget.style.backgroundColor = '#f9fafb')}
            onMouseLeave={(e) => selectedCategory !== category && (e.currentTarget.style.backgroundColor = 'white')}
          >
            {category.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.category}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{service.icon}</div>
              {service.popular && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                  Popular
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
            <button
              onClick={() => openEnquiryModal(service.category)}
              className="w-full px-4 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#e56481' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-[#e56481] to-[#d45471] rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Need Help Choosing a Service?</h2>
        <p className="mb-6 text-white/90">Our team is here to help you find the perfect service for your needs.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl font-semibold bg-white text-[#e56481] hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center"
          >
            Contact Support
          </Link>
          <button
            onClick={() => openEnquiryModal()}
            className="px-6 py-3 rounded-xl font-semibold bg-white/20 border-2 border-white text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </div>
  );
}

