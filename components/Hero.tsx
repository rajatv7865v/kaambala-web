'use client'

import { useState, useEffect } from 'react'
import AnimateOnScroll from './AnimateOnScroll'

const placeholders = [
  'Haircut',
  'AC Service',
  'Home Cleaning',
  'Plumbing',
  'Electrician',
  'Carpenter',
  'Painting',
  'Salon Services'
]

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-200/30 to-primary-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse-slow"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <AnimateOnScroll animation="fade-in-right" className="space-y-8 z-10">
            {/* Location */}
            <AnimateOnScroll animation="fade-in-down" delay={100}>
              <div className="flex items-center gap-2 text-sm text-primary-700 font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Your Location</span>
              </div>
            </AnimateOnScroll>

            {/* Main Heading */}
            <AnimateOnScroll animation="fade-in-up" delay={200}>
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                  Home services at your{' '}
                  <span className="bg-gradient-to-r from-pink-500 to-accent-500 bg-clip-text text-transparent animate-pulse-slow">
                    doorstep
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Professional beauty, salon, and home services delivered by verified experts. Book in minutes, enjoy premium quality.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Stats */}
            <AnimateOnScroll animation="fade-in-up" delay={300}>
              <div className="flex flex-wrap items-center gap-6">
                <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-primary-100 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl font-bold text-primary-600">4.8</span>
                    <div className="flex text-yellow-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Service Rating*</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-primary-100 hover:scale-105 transition-transform duration-300">
                  <span className="text-3xl font-bold text-primary-600 block mb-1">12M+</span>
                  <span className="text-sm text-gray-600 font-medium">Customers Globally*</span>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Search Bar */}
            <AnimateOnScroll animation="fade-in-up" delay={400}>
              <div className="relative">
                <input
                  type="text"
                  placeholder={`What are you looking for? ${placeholders[placeholderIndex]}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-5 pr-20 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-secondary-500 focus:ring-4 focus:ring-secondary-100 transition-all shadow-lg hover:shadow-xl bg-white placeholder:transition-all placeholder:duration-500"
                  key={placeholderIndex} // Force re-render for smooth transition
                />
                <button 
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 z-10 flex items-center justify-center"
                  style={{ backgroundColor: '#e56481' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
                  aria-label="Search"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </AnimateOnScroll>

            {/* Quick Service Buttons */}
            <AnimateOnScroll animation="fade-in-up" delay={500}>
              <div className="flex flex-wrap gap-3">
                <span className="text-sm text-gray-600 font-medium self-center">Popular:</span>
                <button className="px-5 py-2.5 rounded-xl transition-all duration-300 text-sm font-semibold text-white shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95" style={{ backgroundColor: '#e56481' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}>
                  💇‍♀️ Women Salon
                </button>
                <button className="px-5 py-2.5 rounded-xl transition-all duration-300 text-sm font-semibold text-white shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95" style={{ backgroundColor: '#e56481' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}>
                  🧹 Cleaning
                </button>
                <button className="px-5 py-2.5 rounded-xl transition-all duration-300 text-sm font-semibold text-white shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95" style={{ backgroundColor: '#e56481' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}>
                  ❄️ AC Service
                </button>
              </div>
            </AnimateOnScroll>
          </AnimateOnScroll>

          {/* Right Image Collage - 1 Large + 3 Medium */}
          <AnimateOnScroll animation="fade-in-left" delay={300} className="relative lg:block hidden z-10">
            <div className="relative w-full h-[600px]">
              {/* Image Collage Layout */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Large Main Image - Center/Left */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[500px] rounded-3xl overflow-hidden shadow-2xl group hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 transform hover:scale-105 z-20 border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=600&fit=crop" 
                    alt="Beauty & Salon Services"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.className = 'absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center border-4 border-white';
                        const icon = document.createElement('div');
                        icon.className = 'text-8xl';
                        icon.textContent = '💇‍♀️';
                        parent.appendChild(icon);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold text-lg drop-shadow-lg">Beauty & Salon</p>
                  </div>
                </div>

                {/* Right Side - Stack of 3 Medium Images */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
                  {/* Medium Image 1 - Cleaning (Top) */}
                  <div className="w-[280px] h-[180px] rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-x-2 border-4 border-white">
                    <img 
                      src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop" 
                      alt="Cleaning Services"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.className = 'w-[280px] h-[180px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-success-200 to-success-300 flex items-center justify-center border-4 border-white';
                          const icon = document.createElement('div');
                          icon.className = 'text-5xl';
                          icon.textContent = '🧹';
                          parent.appendChild(icon);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-bold text-sm drop-shadow-lg">Home Cleaning</p>
                    </div>
                  </div>

                  {/* Medium Image 2 - AC/Repair (Middle) */}
                  <div className="w-[280px] h-[180px] rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-x-2 border-4 border-white">
                    <img 
                      src="https://images.unsplash.com/photo-1631542771833-cff2a0e0c0a0?w=400&h=300&fit=crop" 
                      alt="AC & Repair Services"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.className = 'w-[280px] h-[180px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-secondary-200 to-secondary-300 flex items-center justify-center border-4 border-white';
                          const icon = document.createElement('div');
                          icon.className = 'text-5xl';
                          icon.textContent = '❄️';
                          parent.appendChild(icon);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-bold text-sm drop-shadow-lg">AC & Repair</p>
                    </div>
                  </div>

                  {/* Medium Image 3 - Plumbing/Electrician (Bottom) */}
                  <div className="w-[280px] h-[180px] rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-x-2 border-4 border-white">
                    <img 
                      src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop" 
                      alt="Plumbing & Electrician Services"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.className = 'w-[280px] h-[180px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-accent-200 to-accent-300 flex items-center justify-center border-4 border-white';
                          const icon = document.createElement('div');
                          icon.className = 'text-5xl';
                          icon.textContent = '🔧';
                          parent.appendChild(icon);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-bold text-sm drop-shadow-lg">Plumbing & Electric</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border-2 border-primary-100 animate-bounce-slow z-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Verified Experts</p>
                    <p className="text-xs text-gray-500">100% Background Checked</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-200/30 rounded-full blur-2xl animate-pulse-slow z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-200/30 rounded-full blur-2xl animate-pulse-slow z-0"></div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}

