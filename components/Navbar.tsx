"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useEnquiry } from "@/contexts/EnquiryContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { isEnquiryModalOpen, openEnquiryModal, closeEnquiryModal, prefillService } = useEnquiry();
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
  const [enquirySubmitStatus, setEnquirySubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const pathname = usePathname();

  // Prefill service when modal opens with a service name
  useEffect(() => {
    if (isEnquiryModalOpen && prefillService) {
      setEnquiryForm(prev => ({ ...prev, service: prefillService }));
    }
  }, [isEnquiryModalOpen, prefillService]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-50 animate-fade-in-down">
        <nav
          className={`relative shadow-lg border-b transition-all duration-300 ${
            scrolled
              ? "bg-accent-500 border-gray-200"
              : "bg-white border-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-24">
              <img
                src="/logo.jpeg"
                alt="Kaambala"
                width={100}
                height={100}
                className="rounded-full w-20 h-20"
              />

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                <a
                  href="/"
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 relative group ${
                    isActive("/")
                      ? scrolled
                        ? "text-white bg-white/30"
                        : "text-secondary-600 bg-secondary-100"
                      : scrolled
                      ? "text-primary-700 hover:text-primary-500 hover:bg-white/20"
                      : "text-gray-700 hover:text-secondary-600 hover:bg-gray-100"
                  }`}
                >
                  Home
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                      isActive("/") ? "w-3/4" : "w-0 group-hover:w-3/4"
                    } h-0.5 rounded-full ${
                      scrolled ? "bg-white" : "bg-secondary-500"
                    }`}
                  ></span>
                </a>
                <a
                  href="#services"
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 relative group ${
                    pathname === "/" &&
                    typeof window !== "undefined" &&
                    window.location.hash === "#services"
                      ? scrolled
                        ? "text-white bg-white/30"
                        : "text-secondary-600 bg-secondary-100"
                      : scrolled
                      ? "text-primary-700 hover:text-primary-500 hover:bg-white/20"
                      : "text-gray-700 hover:text-secondary-600 hover:bg-gray-100"
                  }`}
                >
                  Services
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                      pathname === "/" &&
                      typeof window !== "undefined" &&
                      window.location.hash === "#services"
                        ? "w-3/4"
                        : "w-0 group-hover:w-3/4"
                    } h-0.5 rounded-full ${
                      scrolled ? "bg-white" : "bg-secondary-500"
                    }`}
                  ></span>
                </a>
                <a
                  href="/about"
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 relative group ${
                    isActive("/about")
                      ? scrolled
                        ? "text-white bg-white/30"
                        : "text-secondary-600 bg-secondary-100"
                      : scrolled
                      ? "text-primary-700 hover:text-primary-500 hover:bg-white/20"
                      : "text-gray-700 hover:text-secondary-600 hover:bg-gray-100"
                  }`}
                >
                  About
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                      isActive("/about") ? "w-3/4" : "w-0 group-hover:w-3/4"
                    } h-0.5 rounded-full ${
                      scrolled ? "bg-white" : "bg-secondary-500"
                    }`}
                  ></span>
                </a>
                <a
                  href="/contact"
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 relative group ${
                    isActive("/contact")
                      ? scrolled
                        ? "text-white bg-white/30"
                        : "text-secondary-600 bg-secondary-100"
                      : scrolled
                      ? "text-primary-700 hover:text-primary-500 hover:bg-white/20"
                      : "text-gray-700 hover:text-secondary-600 hover:bg-gray-100"
                  }`}
                >
                  Contact
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                      isActive("/contact") ? "w-3/4" : "w-0 group-hover:w-3/4"
                    } h-0.5 rounded-full ${
                      scrolled ? "bg-white" : "bg-secondary-500"
                    }`}
                  ></span>
                </a>
                <div
                  className={`ml-4 pl-4 border-l flex items-center gap-3 ${
                    scrolled ? "border-gray-200" : "border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 text-white ${
                      scrolled ? "border border-white/30" : ""
                    }`}
                    style={{ backgroundColor: scrolled ? 'rgba(229, 100, 129, 0.9)' : '#e56481' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = scrolled ? 'rgba(229, 100, 129, 0.9)' : '#e56481'}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openEnquiryModal()}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 text-white ${
                      scrolled ? "border border-white/30" : ""
                    }`}
                    style={{ backgroundColor: scrolled ? 'rgba(229, 100, 129, 0.9)' : '#e56481' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = scrolled ? 'rgba(229, 100, 129, 0.9)' : '#e56481'}
                  >
                    Enquiry Now
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    scrolled
                      ? "text-primary-700 hover:bg-white/20"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-label="Toggle menu"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden py-6 space-y-2 animate-fade-in border-t border-gray-200 bg-white">
                <a
                  href="#services"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    pathname === "/" &&
                    typeof window !== "undefined" &&
                    window.location.hash === "#services"
                      ? "text-secondary-600 bg-secondary-100"
                      : "text-primary-700 hover:text-primary-500 hover:bg-primary-50"
                  }`}
                >
                  Services
                </a>
                <a
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive("/about")
                      ? "text-secondary-600 bg-secondary-100"
                      : "text-primary-700 hover:text-primary-500 hover:bg-primary-50"
                  }`}
                >
                  About
                </a>
                <a
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive("/contact")
                      ? "text-secondary-600 bg-secondary-100"
                      : "text-primary-700 hover:text-primary-500 hover:bg-primary-50"
                  }`}
                >
                  Contact
                </a>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-white transform hover:scale-105 active:scale-95"
                  style={{ backgroundColor: '#e56481' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    openEnquiryModal();
                    setIsMenuOpen(false);
                  }}
                  className="w-full mt-4 px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-white transform hover:scale-105 active:scale-95"
                  style={{ backgroundColor: '#e56481' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
                >
                  Enquiry Now
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Modals rendered outside header for proper z-index stacking */}
      {/* Enquiry Form Modal */}
      {isEnquiryModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => closeEnquiryModal()}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => closeEnquiryModal()}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 active:scale-95 z-10"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div>
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Service Enquiry
                </h2>
                <p className="text-sm text-gray-600">
                  Fill out the form below and we'll get back to you soon!
                </p>
              </div>

              {/* Status Messages */}
              {enquirySubmitStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium text-sm">
                    Thank you! Your enquiry has been sent successfully.
                  </p>
                </div>
              )}

              {enquirySubmitStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium text-sm">
                    Sorry, there was an error sending your enquiry. Please try again later.
                  </p>
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmittingEnquiry(true);
                  setEnquirySubmitStatus('idle');

                  try {
                    const response = await fetch('/api/send-email', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        type: 'enquiry',
                        ...enquiryForm,
                      }),
                    });

                    const data = await response.json();

                    if (data.success) {
                      setEnquirySubmitStatus('success');
                      setEnquiryForm({
                        name: "",
                        phone: "",
                        email: "",
                        service: "",
                        message: "",
                      });
                      // Close modal after 2 seconds
                      setTimeout(() => {
                        closeEnquiryModal();
                        setEnquirySubmitStatus('idle');
                      }, 2000);
                    } else {
                      setEnquirySubmitStatus('error');
                    }
                  } catch (error) {
                    console.error('Error submitting enquiry:', error);
                    setEnquirySubmitStatus('error');
                  } finally {
                    setIsSubmittingEnquiry(false);
                  }
                }}
                className="space-y-3"
              >
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={enquiryForm.name}
                    onChange={(e) =>
                      setEnquiryForm({ ...enquiryForm, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-100 transition-all text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={enquiryForm.phone}
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-100 transition-all text-sm"
                      placeholder="+91 1234567890"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={enquiryForm.email}
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-100 transition-all text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    required
                    value={enquiryForm.service}
                    onChange={(e) =>
                      setEnquiryForm({
                        ...enquiryForm,
                        service: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-100 transition-all bg-white text-sm"
                  >
                    <option value="">Select a service</option>
                    <option value="beauty-salon">Beauty & Salon</option>
                    <option value="cleaning">Home Cleaning</option>
                    <option value="ac-repair">AC & Repair</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrician">Electrician</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="painting">Painting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={3}
                    value={enquiryForm.message}
                    onChange={(e) =>
                      setEnquiryForm({
                        ...enquiryForm,
                        message: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-100 transition-all resize-none text-sm"
                    placeholder="Tell us about your service requirements..."
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      closeEnquiryModal();
                      setEnquiryForm({
                        name: "",
                        phone: "",
                        email: "",
                        service: "",
                        message: "",
                      });
                    }}
                    className="flex-1 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm transform hover:scale-105 active:scale-95 text-white"
                    style={{ backgroundColor: '#e56481' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingEnquiry}
                    className="flex-1 px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                    style={{ backgroundColor: isSubmittingEnquiry ? '#d45471' : '#e56481' }}
                    onMouseEnter={(e) => !isSubmittingEnquiry && (e.currentTarget.style.backgroundColor = '#d45471')}
                    onMouseLeave={(e) => !isSubmittingEnquiry && (e.currentTarget.style.backgroundColor = '#e56481')}
                  >
                    {isSubmittingEnquiry ? 'Sending...' : 'Submit Enquiry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsLoginModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform scale-in animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 active:scale-95"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="text-center">
           
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                We're working hard to bring you an amazing login experience.
                Stay tuned!
              </p>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: '#e56481' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 transform scale-in animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 active:scale-95"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Contact Us
              </h2>
              <p className="text-gray-600 mb-6">
                Get in touch with us to book your service. We're here to help!
              </p>

              {/* Contact Information */}
              <div className="space-y-4 mb-6 text-left">
                <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
                  <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-900">
                      +91 800 521 2520
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
                  <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">
                      info@kaambala.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 text-white"
                  style={{ backgroundColor: '#e56481' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
                >
                  Close
                </button>
                <a
                  href="https://wa.me/918005212520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-center"
                  style={{ backgroundColor: '#e56481' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
