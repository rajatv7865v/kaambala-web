'use client'

import AnimateOnScroll from './AnimateOnScroll'

const stats = [
  {
    id: 1,
    number: '12K+',
    label: 'Happy Customers',
    icon: '👥',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    id: 2,
    number: '20K+',
    label: 'Verified Professionals',
    icon: '✅',
    color: 'from-success-500 to-success-600',
  },
  {
    id: 3,
    number: '50+',
    label: 'Cities Served',
    icon: '🏙️',
    color: 'from-secondary-500 to-secondary-400',
  },
  {
    id: 4,
    number: '4.8',
    label: 'Average Rating',
    icon: '⭐',
    color: 'from-yellow-500 to-amber-500',
  },
]

export default function Stats() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse-slow"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <AnimateOnScroll animation="fade-in-down">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Trusted by millions across India
            </p>
          </div>
        </AnimateOnScroll>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <AnimateOnScroll key={stat.id} animation="scale-in" delay={index * 150}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-center">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className={`text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.number}
              </div>
              <p className="text-white/90 text-sm font-medium">{stat.label}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

