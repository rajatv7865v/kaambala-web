'use client'

import AnimateOnScroll from './AnimateOnScroll'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'Excellent service! The cleaning was thorough and the professional was very polite. Highly recommended!',
    service: 'Home Cleaning',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    comment: 'Best AC service I\'ve ever had. Quick, efficient, and reasonably priced. Will definitely book again!',
    service: 'AC Service',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Anita Patel',
    location: 'Bangalore',
    rating: 5,
    comment: 'The salon service was amazing! The stylist was professional and gave me exactly what I wanted. Love it!',
    service: 'Women Salon',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Pune',
    rating: 5,
    comment: 'Electrician came on time and fixed all the issues. Very professional and clean work. Great service!',
    service: 'Electrician',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Meera Reddy',
    location: 'Hyderabad',
    rating: 5,
    comment: 'Plumbing issue resolved quickly. The plumber was knowledgeable and explained everything clearly.',
    service: 'Plumber',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 6,
    name: 'Amit Verma',
    location: 'Chennai',
    rating: 5,
    comment: 'Carpenter did an excellent job with my furniture repair. Quality work and very reasonable pricing.',
    service: 'Carpenter',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimateOnScroll animation="fade-in-down">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full animate-pulse-slow"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-700">What Our Customers Say</h2>
              <div className="h-1 w-12 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full animate-pulse-slow"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real reviews from satisfied customers across India
            </p>
          </div>
        </AnimateOnScroll>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimateOnScroll key={testimonial.id} animation="fade-in-up" delay={index * 100}>
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-secondary-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                "{testimonial.comment}"
              </p>

              {/* Service Badge */}
              <div className="inline-block bg-secondary-50 text-secondary-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                {testimonial.service}
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-secondary-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                  <p className="text-gray-500 text-xs">{testimonial.location}</p>
                </div>
              </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

