'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: 'How do I book a service?',
    answer: 'You can book a service by clicking on "New Order" in the Orders section, or browse services and click "Book Now" on any service card.',
  },
  {
    question: 'How do I track my order status?',
    answer: 'You can track your order status in the Orders section. Each order shows its current status (Pending, Confirmed, In Progress, Completed, or Cancelled).',
  },
  {
    question: 'Can I cancel an order?',
    answer: 'Yes, you can cancel an order if it hasn\'t been started yet. Go to your order details and click the cancel button.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept various payment methods including credit/debit cards, UPI, and cash on delivery for select services.',
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can contact our support team through the Contact page, or call us directly. We\'re available 24/7 to assist you.',
  },
  {
    question: 'Are service providers verified?',
    answer: 'Yes, all our service providers are thoroughly verified, background-checked, and certified professionals.',
  },
];

const supportOptions = [
  {
    title: 'Contact Support',
    description: 'Get in touch with our support team',
    icon: '📞',
    link: '/contact',
  },
  {
    title: 'Live Chat',
    description: 'Chat with us in real-time',
    icon: '💬',
    action: () => alert('Live chat coming soon!'),
  },
  {
    title: 'Email Us',
    description: 'Send us an email',
    icon: '✉️',
    link: 'mailto:support@kaambala.com',
  },
  {
    title: 'FAQ',
    description: 'Find answers to common questions',
    icon: '❓',
    scrollTo: 'faq',
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">We're here to help you with any questions or concerns</p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {supportOptions.map((option, index) => {
          const content = (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="text-4xl mb-4">{option.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          );

          if (option.link) {
            return (
              <Link key={index} href={option.link}>
                {content}
              </Link>
            );
          } else if (option.action) {
            return (
              <div key={index} onClick={option.action}>
                {content}
              </div>
            );
          } else {
            return (
              <div key={index} onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}>
                {content}
              </div>
            );
          }
        })}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/dashboard/orders/new"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6" style={{ color: '#e56481' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <div>
              <p className="font-semibold text-gray-900">Create New Order</p>
              <p className="text-sm text-gray-500">Book a service</p>
            </div>
          </Link>
          <Link
            href="/dashboard/orders"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6" style={{ color: '#e56481' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <div>
              <p className="font-semibold text-gray-900">View Orders</p>
              <p className="text-sm text-gray-500">Check your order status</p>
            </div>
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6" style={{ color: '#e56481' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div>
              <p className="font-semibold text-gray-900">Update Profile</p>
              <p className="text-sm text-gray-500">Manage your account</p>
            </div>
          </Link>
          <Link
            href="/dashboard/services"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6" style={{ color: '#e56481' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="font-semibold text-gray-900">Browse Services</p>
              <p className="text-sm text-gray-500">Explore available services</p>
            </div>
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === index && (
                <div className="p-4 pt-0 text-gray-600 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

