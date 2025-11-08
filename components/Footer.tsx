'use client'

import Logo from './Logo'
import AnimateOnScroll from './AnimateOnScroll'

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Top Section with Logo and CTA */}
      <div className="border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Logo and Description */}
            <AnimateOnScroll animation="fade-in-right">
              <div>
                <div className="mb-4">
                  {/* <Logo size="lg" showText={false} className="text-white" /> */}
                  <img src="/logo.jpeg" alt="Kaambala" width={100} height={100}  className='rounded-full w-28 h-28'/>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                  Professional home services at your doorstep. Trusted by millions of customers worldwide.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Download App Section */}
            <AnimateOnScroll animation="fade-in-left">
              <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-3 font-medium">Download our app</p>
                <div className="flex gap-3">
                  <a href="#" className="flex-1 bg-black/40 hover:bg-black/60 border border-gray-700 rounded-xl px-4 py-3 flex items-center gap-3 transition-all hover:scale-105">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.49-2.08-.48-3.24 0-1.44.63-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </a>
                  <a href="#" className="flex-1 bg-black/40 hover:bg-black/60 border border-gray-700 rounded-xl px-4 py-3 flex items-center gap-3 transition-all hover:scale-105">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Get it on</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company */}
          <AnimateOnScroll animation="fade-in-up" delay={100}>
            <div>
              <h4 className="font-bold text-white mb-5 text-base">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/about" className="text-gray-400 hover:text-secondary-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-secondary-400 transition-colors"></span>
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                  Terms & conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                  Blog
                </a>
              </li>
            </ul>
            </div>
          </AnimateOnScroll>
          
          {/* For Customers */}
          <AnimateOnScroll animation="fade-in-up" delay={200}>
            <div>
              <h4 className="font-bold text-white mb-5 text-base">For customers</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                  Contact us
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                  All services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                  Help & Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                  FAQs
                </a>
              </li>
            </ul>
            </div>
          </AnimateOnScroll>
          
          {/* For Professionals */}
          <AnimateOnScroll animation="fade-in-up" delay={300}>
            <div>
              <h4 className="font-bold text-white mb-5 text-base">For professionals</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                  Register as professional
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                  Partner login
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                  Training programs
                </a>
              </li>
            </ul>
            </div>
          </AnimateOnScroll>
          
          {/* Social & Contact */}
          <AnimateOnScroll animation="fade-in-up" delay={400}>
            <div>
              <h4 className="font-bold text-white mb-5 text-base">Connect with us</h4>
            <div className="flex gap-3 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-secondary-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary-500/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-secondary-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary-500/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-secondary-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary-500/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-secondary-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary-500/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">Email: info@kaambala.com</p>
              <p className="text-gray-400">Phone: +91 8005212520</p>
            </div>
            </div>
          </AnimateOnScroll>
        </div>
        
        {/* Bottom Bar */}
        <AnimateOnScroll animation="fade-in-up" delay={500}>
          <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <p>* As on December 31, 2025</p>
              <span className="hidden md:block">•</span>
              <p>Trusted by 12K+ customers worldwide</p>
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Kaambala. All rights reserved.
            </p>
          </div>
          </div>
        </AnimateOnScroll>
      </div>
    </footer>
  )
}

