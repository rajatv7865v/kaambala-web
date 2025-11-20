"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEnquiry } from "@/contexts/EnquiryContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const { getTotalItems } = useCart();
  const [showCursor, setShowCursor] = useState(true);
  const { isEnquiryModalOpen, openEnquiryModal, closeEnquiryModal, prefillService } = useEnquiry();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
  const [enquirySubmitStatus, setEnquirySubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedLocation, setSelectedLocation] = useState("Gomti Nagar");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const pathname = usePathname();

  // Popular locations list
  const popularLocations = [
    "Shahajahanpur",
    "Khutar",
    "Banda",
    "Bareilly",
    "Pilibhit",
    "Puranpur",
    "Gomti Nagar",
    "Hazratganj",
    "Alambagh",
    "Indira Nagar",
    "Aminabad",
    "Chowk",
    "Rajajipuram",
    "Mahanagar",
    "Vibhuti Khand",
    "Sitapur Road",
  ];

  // Detect user location using browser geolocation
  const detectUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsDetectingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log('Got coordinates:', latitude, longitude);
          
          // Use a reverse geocoding service (using OpenStreetMap Nominatim)
          // Note: Nominatim requires a User-Agent header
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'Kaambala-WebApp/1.0',
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Geocoding API error: ${response.status}`);
          }

          const data = await response.json();
          console.log('Geocoding response:', data);
          
          if (data && data.address) {
            const address = data.address;
            let locationName = "";
            
            // Try to get a meaningful location name (without city suffix)
            if (address.suburb || address.neighbourhood) {
              locationName = address.suburb || address.neighbourhood;
            } else if (address.village || address.town) {
              locationName = address.village || address.town;
            } else if (address.city) {
              locationName = address.city;
            } else if (address.state_district) {
              locationName = address.state_district;
            } else if (data.display_name) {
              // Fallback to display name and extract first part
              const parts = data.display_name.split(',');
              locationName = parts[0].trim();
            } else {
              locationName = "Gomti Nagar"; // Default fallback
            }
            
            console.log('Detected location:', locationName);
            setSelectedLocation(locationName);
            setLocationError(null);
          } else {
            throw new Error('No address data in response');
          }
        } catch (error: any) {
          console.error('Error detecting location:', error);
          setLocationError(error.message || 'Failed to detect location. Please select manually.');
          // Keep default location on error
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Failed to get your location. ';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Location access denied. Please enable location permissions and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        
        setLocationError(errorMessage);
        setIsDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // Increased timeout
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  };

  // Load location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('selectedLocation');
    if (savedLocation) {
      setSelectedLocation(savedLocation);
    } else {
      // Try to detect location using geolocation API
      detectUserLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save location to localStorage whenever it changes
  useEffect(() => {
    if (selectedLocation) {
      localStorage.setItem('selectedLocation', selectedLocation);
    }
  }, [selectedLocation]);

  // Filter locations based on search
  const filteredLocations = popularLocations.filter((location) =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // Placeholder options for typing animation
  const placeholderOptions = [
    "What are you looking for?",
    "Search for salon services...",
    "Find electrician, plumber...",
    "Book cleaning services...",
  ];

  // Prefill service when modal opens with a service name
  useEffect(() => {
    if (isEnquiryModalOpen && prefillService) {
      setEnquiryForm(prev => ({ ...prev, service: prefillService }));
    }
  }, [isEnquiryModalOpen, prefillService]);

  // Typing animation for placeholder
  useEffect(() => {
    // Don't animate if input is focused or has value
    if (isSearchFocused || searchQuery) {
      setAnimatedPlaceholder("");
      return;
    }

    const currentPlaceholder = placeholderOptions[placeholderIndex];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      // Typing effect
      if (animatedPlaceholder.length < currentPlaceholder.length) {
        timeoutId = setTimeout(() => {
          setAnimatedPlaceholder(currentPlaceholder.slice(0, animatedPlaceholder.length + 1));
        }, 100); // Typing speed
      } else {
        // Wait before deleting
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Wait 2 seconds before deleting
      }
    } else {
      // Deleting effect
      if (animatedPlaceholder.length > 0) {
        timeoutId = setTimeout(() => {
          setAnimatedPlaceholder(animatedPlaceholder.slice(0, -1));
        }, 50); // Deleting speed (faster)
      } else {
        // Move to next placeholder
        setIsTyping(true);
        setPlaceholderIndex((prev) => (prev + 1) % placeholderOptions.length);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [animatedPlaceholder, isTyping, placeholderIndex, isSearchFocused, searchQuery, placeholderOptions]);

  // Blinking cursor effect
  useEffect(() => {
    if (isSearchFocused || searchQuery) {
      setShowCursor(false);
      return;
    }

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530); // Blink speed

    return () => clearInterval(cursorInterval);
  }, [isSearchFocused, searchQuery]);


  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 md:relative">
        {/* Top Bar with Location */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-9 md:h-10 text-xs md:text-sm">
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-1.5 md:gap-2 hover:text-gray-900 transition-colors group"
              >
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600 group-hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600 font-medium group-hover:text-gray-900 truncate max-w-[140px] md:max-w-none">
                  {isDetectingLocation ? "Detecting..." : selectedLocation}
                </span>
                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-500 group-hover:text-gray-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="hidden md:flex items-center gap-4 text-gray-600">
                <a href="/about" className="hover:text-gray-900 transition-colors">About us</a>
                <a href="/contact" className="hover:text-gray-900 transition-colors">Contact us</a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="/" className="flex items-center">
                  <img
                    src="/logo.jpeg"
                    alt="Kaambala"
                    width={120}
                    height={120}
                    className="rounded-full w-12 h-12 md:w-16 md:h-16 object-cover"
                  />
                </a>
              </div>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                <form onSubmit={handleSearch} className="w-full">
                  <div className={`relative flex items-center bg-gray-50 rounded-lg border-2 transition-all ${
                    isSearchFocused ? 'border-primary-500 bg-white shadow-md' : 'border-transparent'
                  }`}>
                    <svg className="w-5 h-5 text-gray-400 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      placeholder={isSearchFocused || searchQuery ? "What are you looking for?" : animatedPlaceholder + (showCursor ? "|" : "")}
                      className="flex-1 px-4 py-3 bg-transparent border-0 focus:outline-none text-gray-900 placeholder-gray-400"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="mr-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3">
                  {/* Cart Icon */}
                  <button
                    onClick={() => router.push('/cart')}
                    className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                    aria-label="Shopping Cart"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {/* Cart Badge */}
                    {getTotalItems() > 0 && (
                      <span className="absolute top-0 right-0 w-5 h-5 bg-[#e56481] text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {getTotalItems() > 99 ? '99+' : getTotalItems()}
                      </span>
                    )}
                  </button>

                  {user ? (
                    <>
                      <button
                        onClick={() => {
                          const role = user.role || 'user';
                          if (role === 'service-provider') {
                            router.push('/provider/dashboard');
                          } else {
                            router.push('/dashboard');
                          }
                        }}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all font-medium flex items-center gap-2"
                        aria-label="Dashboard"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Dashboard</span>
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          router.push('/');
                        }}
                        className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                        aria-label="Logout"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => router.push('/login')}
                      className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all font-medium flex items-center gap-2"
                      aria-label="Login"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Login</span>
                    </button>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Toggle menu"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="md:hidden pb-3">
              <form onSubmit={handleSearch}>
                <div className={`relative flex items-center bg-gray-50 rounded-lg border-2 transition-all ${
                  isSearchFocused ? 'border-primary-500 bg-white shadow-md' : 'border-transparent'
                }`}>
                  <svg className="w-5 h-5 text-gray-400 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder={isSearchFocused || searchQuery ? "What are you looking for?" : animatedPlaceholder + "|"}
                    className="flex-1 px-3 py-2.5 bg-transparent border-0 focus:outline-none text-gray-900 placeholder-gray-400 text-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="mr-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 space-y-2 border-t border-gray-200">
                <a
                  href="/services"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive("/services")
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Services
                </a>
                <a
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive("/about")
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  About
                </a>
                <a
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive("/contact")
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Contact
                </a>
                {/* Cart Icon - Mobile */}
                <button
                  onClick={() => {
                    router.push('/cart');
                    setIsMenuOpen(false);
                  }}
                  className="relative flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Shopping Cart</span>
                  {getTotalItems() > 0 && (
                    <span className="absolute top-2 right-2 w-5 h-5 bg-[#e56481] text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {getTotalItems() > 99 ? '99+' : getTotalItems()}
                    </span>
                  )}
                </button>

                {user ? (
                  <>
                    <button
                      onClick={() => {
                        const role = user.role || 'user';
                        if (role === 'service-provider') {
                          router.push('/provider/dashboard');
                        } else {
                          router.push('/dashboard');
                        }
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        router.push('/');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      router.push('/login');
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Login</span>
                  </button>
                )}
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

      {/* Location Selection Modal */}
      {isLocationModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => {
            setIsLocationModalOpen(false);
            setLocationError(null);
          }}
        >
            <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setIsLocationModalOpen(false);
                setLocationError(null);
              }}
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
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Select Your Location
                </h2>
                <p className="text-sm text-gray-600">
                  Choose your location to see services available in your area
                </p>
              </div>

              {/* Search Input */}
              <div className="mb-4">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="Search for your location..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#e56481] focus:ring-2 focus:ring-[#e56481]/20 transition-all"
                  />
                </div>
              </div>

              {/* Detect Location Button */}
              <button
                onClick={detectUserLocation}
                disabled={isDetectingLocation}
                className="w-full mb-4 px-4 py-3 rounded-xl font-semibold transition-all duration-300 border-2 border-[#e56481] text-[#e56481] hover:bg-[#e56481] hover:text-white transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isDetectingLocation ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Detecting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Use Current Location
                  </>
                )}
              </button>

              {/* Error Message */}
              {locationError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-800 font-medium">{locationError}</p>
                  </div>
                  <p className="text-xs text-red-600 mt-2 ml-7">
                    Tip: Make sure location permissions are enabled in your browser settings.
                  </p>
                </div>
              )}

              {/* Popular Locations List */}
              <div className="max-h-64 overflow-y-auto">
                <p className="text-sm font-semibold text-gray-700 mb-3 px-2">
                  Popular Locations
                </p>
                <div className="space-y-2">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setSelectedLocation(location);
                          setIsLocationModalOpen(false);
                          setLocationSearch("");
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-50 border-2 ${
                          selectedLocation === location
                            ? "border-[#e56481] bg-[#e56481]/5"
                            : "border-transparent hover:border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{location}</span>
                          {selectedLocation === location && (
                            <svg
                              className="w-5 h-5 text-[#e56481]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No locations found</p>
                      <p className="text-sm mt-1">Try a different search term</p>
                    </div>
                  )}
                </div>
              </div>
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

      {/* Mobile Bottom Navigation Bar - App Style */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {/* Home */}
          <a
            href="/"
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              pathname === '/' ? 'text-[#e56481]' : 'text-gray-600'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              className={`w-6 h-6 mb-1 ${pathname === '/' ? 'text-[#e56481]' : 'text-gray-600'}`}
              fill={pathname === '/' ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={pathname === '/' ? 0 : 2}
            >
              {pathname === '/' ? (
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              )}
            </svg>
            <span className="text-xs font-medium">Home</span>
          </a>

          {/* Services */}
          <a
            href="/services"
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive('/services') ? 'text-[#e56481]' : 'text-gray-600'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              className={`w-6 h-6 mb-1 ${isActive('/services') ? 'text-[#e56481]' : 'text-gray-600'}`}
              fill={isActive('/services') ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={isActive('/services') ? 0 : 2}
            >
              {isActive('/services') ? (
                <path d="M5 3a2 2 0 100 4h14a2 2 0 100-4H5zM5 11a2 2 0 100 4h14a2 2 0 100-4H5zM5 19a2 2 0 100 4h14a2 2 0 100-4H5z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              )}
            </svg>
            <span className="text-xs font-medium">Services</span>
          </a>

          {/* Cart */}
          <button
            onClick={() => {
              router.push('/cart');
              setIsMenuOpen(false);
            }}
            className="relative flex flex-col items-center justify-center flex-1 h-full text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs font-medium">Cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute top-1 right-4 md:right-2 w-5 h-5 bg-[#e56481] text-white text-xs rounded-full flex items-center justify-center font-bold border-2 border-white">
                {getTotalItems() > 99 ? '99+' : getTotalItems()}
              </span>
            )}
          </button>

          {/* Dashboard/Login */}
          {user ? (
            <button
              onClick={() => {
                const role = user.role || 'user';
                if (role === 'service-provider') {
                  router.push('/provider/dashboard');
                } else {
                  router.push('/dashboard');
                }
                setIsMenuOpen(false);
              }}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive('/dashboard') || isActive('/provider/dashboard') ? 'text-[#e56481]' : 'text-gray-600'
              }`}
            >
              <svg
                className={`w-6 h-6 mb-1 ${isActive('/dashboard') || isActive('/provider/dashboard') ? 'text-[#e56481]' : 'text-gray-600'}`}
                fill={isActive('/dashboard') || isActive('/provider/dashboard') ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={isActive('/dashboard') || isActive('/provider/dashboard') ? 0 : 2}
              >
                {isActive('/dashboard') || isActive('/provider/dashboard') ? (
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                )}
              </svg>
              <span className="text-xs font-medium">Dashboard</span>
            </button>
          ) : (
            <button
              onClick={() => {
                router.push('/login');
                setIsMenuOpen(false);
              }}
              className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-medium">Login</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
