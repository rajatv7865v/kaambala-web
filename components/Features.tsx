'use client'

import AnimateOnScroll from './AnimateOnScroll'

const features = [
  {
    id: 1,
    title: 'Verified Professionals',
    description: 'All our service providers are background verified and trained professionals.',
    icon: '✅',
    color: 'from-success-500 to-success-600',
  },
  {
    id: 2,
    title: '100% Satisfaction',
    description: 'We guarantee complete satisfaction or your money back. Quality assured!',
    icon: '💯',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    id: 3,
    title: 'Transparent Pricing',
    description: 'No hidden charges. See the exact price before booking. Pay only for what you need.',
    icon: '💰',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    id: 4,
    title: 'On-Time Service',
    description: 'Our professionals arrive on time, every time. We value your time as much as ours.',
    icon: '⏰',
    color: 'from-secondary-500 to-secondary-400',
  },
  {
    id: 5,
    title: 'Easy Booking',
    description: 'Book services in minutes with our simple and intuitive booking system.',
    icon: '📱',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 6,
    title: '24/7 Support',
    description: 'Round-the-clock customer support to help you with any queries or issues.',
    icon: '🛟',
    color: 'from-accent-500 to-accent-600',
  },
]

export default function Features() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimateOnScroll animation="fade-in-down">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full animate-pulse-slow"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-700">Why Choose Kaambala?</h2>
              <div className="h-1 w-12 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full animate-pulse-slow"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the best in home services with our premium features
            </p>
          </div>
        </AnimateOnScroll>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimateOnScroll key={feature.id} animation="scale-in" delay={index * 100}>
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-100 hover:border-secondary-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-2 group-hover:text-secondary-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
