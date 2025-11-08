'use client'

import AnimateOnScroll from './AnimateOnScroll'
import { useEnquiry } from '@/contexts/EnquiryContext'

const steps = [
  {
    id: 1,
    title: 'Choose a Service',
    description: 'Browse through our wide range of professional home services and select what you need.',
    icon: '📋',
    color: 'from-secondary-500 to-secondary-600',
    bgColor: 'from-secondary-50 to-secondary-100',
  },
  {
    id: 2,
    title: 'Book Instantly',
    description: 'Select your preferred date and time. Book in seconds with our easy-to-use platform.',
    icon: '📅',
    color: 'from-accent-500 to-accent-600',
    bgColor: 'from-accent-50 to-accent-100',
  },
  {
    id: 3,
    title: 'Expert Arrives',
    description: 'Our verified professional arrives at your doorstep at the scheduled time.',
    icon: '👨‍🔧',
    color: 'from-secondary-500 to-accent-500',
    bgColor: 'from-secondary-50 to-accent-50',
  },
  {
    id: 4,
    title: 'Enjoy Quality Service',
    description: 'Relax while our expert delivers premium quality service with complete satisfaction.',
    icon: '✨',
    color: 'from-accent-500 to-primary-500',
    bgColor: 'from-accent-50 to-primary-50',
  },
  {
    id: 5,
    title: 'Rate & Review',
    description: 'Share your experience and help others make informed decisions. Your feedback matters!',
    icon: '⭐',
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'from-yellow-50 to-amber-50',
  },
]

export default function HowItWorks() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse-slow"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <AnimateOnScroll animation="fade-in-down">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-secondary-100 to-accent-100 text-primary-700 px-6 py-2 rounded-full text-sm font-bold">
                Simple Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              How It <span className="bg-gradient-to-r from-secondary-600 to-accent-500 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get professional home services delivered to your doorstep in just 5 simple steps
            </p>
          </div>
        </AnimateOnScroll>

        {/* Steps - Horizontal Layout with Better Design */}
        <div className="relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-accent-200 to-primary-200 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <AnimateOnScroll key={step.id} animation="scale-in" delay={index * 150} className="relative">
                {/* Step Card */}
                <div className="relative bg-white rounded-3xl p-6 lg:p-5 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-gray-100 hover:border-primary-300 group">
                  {/* Step Number Badge */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-base shadow-xl z-10 group-hover:scale-110 transition-transform">
                    {step.id}
                  </div>

                  {/* Icon Container with Gradient Background */}
                  <div className={`relative h-32 lg:h-28 rounded-2xl bg-gradient-to-br ${step.bgColor} flex items-center justify-center mb-5 overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                    {/* Decorative elements */}
                    <div className="absolute top-2 right-2 w-16 h-16 bg-white/30 rounded-full blur-xl"></div>
                    <div className="absolute bottom-2 left-2 w-12 h-12 bg-white/30 rounded-full blur-xl"></div>
                    
                    {/* Icon */}
                    <div className={`relative z-10 w-20 h-20 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-4xl lg:text-3xl shadow-2xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg lg:text-base font-bold text-primary-700 mb-2 group-hover:text-secondary-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm lg:text-xs leading-relaxed line-clamp-3">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Arrow connector (Mobile/Tablet) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                )}
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <AnimateOnScroll animation="fade-in-up" delay={600}>
          <div className="mt-16 text-center">
            <button 
              onClick={() => openEnquiryModal()}
              className="text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300" 
              style={{ backgroundColor: '#e56481' }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'} 
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
            >
              Get Started Now
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

