"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AnimateOnScroll from "./AnimateOnScroll";

const placeholders = [
  "Haircut",
  "AC Service",
  "Home Cleaning",
  "Plumbing",
  "Electrician",
  "Carpenter",
  "Painting",
  "Salon Services",
];

interface Subcategory {
  name: string;
  icon: string;
}

interface Category {
  icon: string;
  title: string;
  color: string;
  subcategories: Subcategory[];
}

const categories: Category[] = [
  {
    icon: "💇‍♀️",
    title: "Women Salon",
    color: "from-pink-500 to-pink-600",
    subcategories: [
      { name: "Haircut & Styling", icon: "✂️" },
      { name: "Hair Color", icon: "🎨" },
      { name: "Hair Spa", icon: "💆‍♀️" },
      { name: "Waxing", icon: "🪶" },
      { name: "Facial & Cleanup", icon: "✨" },
      { name: "Threading", icon: "🧵" },
      { name: "Manicure & Pedicure", icon: "💅" },
      { name: "Bridal Makeup", icon: "👰" },
    ],
  },
  {
    icon: "🧹",
    title: "Cleaning",
    color: "from-green-500 to-green-600",
    subcategories: [
      { name: "Deep Cleaning", icon: "🧽" },
      { name: "Regular Cleaning", icon: "🧼" },
      { name: "Bathroom Cleaning", icon: "🚿" },
      { name: "Kitchen Cleaning", icon: "🍳" },
      { name: "Sofa & Carpet Cleaning", icon: "🛋️" },
      { name: "Window Cleaning", icon: "🪟" },
      { name: "Post-Party Cleaning", icon: "🎉" },
      { name: "Office Cleaning", icon: "🏢" },
    ],
  },
  {
    icon: "❄️",
    title: "AC Service",
    color: "from-blue-500 to-blue-600",
    subcategories: [
      { name: "AC Installation", icon: "🔧" },
      { name: "AC Repair", icon: "🔨" },
      { name: "AC Gas Filling", icon: "⛽" },
      { name: "AC Cleaning", icon: "🧹" },
      { name: "AC Maintenance", icon: "🛠️" },
      { name: "AC Uninstallation", icon: "📦" },
      { name: "AC Service & Repair", icon: "⚙️" },
      { name: "Split AC Service", icon: "❄️" },
    ],
  },
  {
    icon: "⚡",
    title: "Electrician",
    color: "from-yellow-500 to-yellow-600",
    subcategories: [
      { name: "Electrical Repairs", icon: "🔌" },
      { name: "Switch & Socket Installation", icon: "🔘" },
      { name: "Fan Installation", icon: "🌀" },
      { name: "Light Installation", icon: "💡" },
      { name: "MCB & Fuse Repair", icon: "⚡" },
      { name: "Wiring & Rewiring", icon: "🔗" },
      { name: "Switchboard Repair", icon: "📱" },
      { name: "Home Automation", icon: "🏠" },
    ],
  },
  {
    icon: "🚿",
    title: "Plumber",
    color: "from-cyan-500 to-cyan-600",
    subcategories: [
      { name: "Tap Repair", icon: "🚰" },
      { name: "Leak Fixing", icon: "💧" },
      { name: "Pipe Installation", icon: "🔩" },
      { name: "Bathroom Fitting", icon: "🚽" },
      { name: "Geyser Installation", icon: "🔥" },
      { name: "Water Tank Cleaning", icon: "💦" },
      { name: "Blockage Removal", icon: "🚫" },
      { name: "Flush Tank Repair", icon: "🪠" },
    ],
  },
  {
    icon: "🔧",
    title: "Appliance Repair",
    color: "from-indigo-500 to-indigo-600",
    subcategories: [
      { name: "Washing Machine Repair", icon: "🌀" },
      { name: "Refrigerator Repair", icon: "🧊" },
      { name: "Microwave Repair", icon: "📻" },
      { name: "Water Purifier Repair", icon: "💧" },
      { name: "RO Service", icon: "🚰" },
      { name: "Chimney Repair", icon: "💨" },
      { name: "Mixer Grinder Repair", icon: "🍽️" },
      { name: "TV Repair", icon: "📺" },
    ],
  },
  {
    icon: "💇‍♂️",
    title: "Men Salon",
    color: "from-blue-500 to-blue-600",
    subcategories: [
      { name: "Haircut & Styling", icon: "✂️" },
      { name: "Beard Styling", icon: "🧔" },
      { name: "Hair Spa", icon: "💆‍♂️" },
      { name: "Facial & Cleanup", icon: "✨" },
      { name: "Hair Color", icon: "🎨" },
      { name: "Hair Treatment", icon: "💇" },
      { name: "Manicure & Pedicure", icon: "💅" },
      { name: "Head Massage", icon: "💆" },
    ],
  },
  {
    icon: "🛠️",
    title: "Home Repair",
    color: "from-amber-500 to-amber-600",
    subcategories: [
      { name: "Carpentry Work", icon: "🪚" },
      { name: "Furniture Repair", icon: "🪑" },
      { name: "Drill & Hang", icon: "🔨" },
      { name: "Painting", icon: "🎨" },
      { name: "Wall Repair", icon: "🧱" },
      { name: "Door & Window Repair", icon: "🚪" },
      { name: "Custom Work", icon: "⚒️" },
      { name: "Installation Services", icon: "📦" },
    ],
  },
];

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSubcategoryClick = (
    subcategory: Subcategory,
    category: Category
  ) => {
    // Navigate to subcategory services page
    const categorySlug = category.title.toLowerCase().replace(/\s+/g, "-");
    const subcategorySlug = subcategory.name.toLowerCase().replace(/\s+/g, "-");
    router.push(
      `/services/${encodeURIComponent(categorySlug)}/${encodeURIComponent(
        subcategorySlug
      )}`
    );
  };

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

            {/* Main Heading */}
            <AnimateOnScroll animation="fade-in-up" delay={200}>
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                  Home services at your{" "}
                  <span className="bg-gradient-to-r from-pink-500 to-accent-500 bg-clip-text text-transparent animate-pulse-slow">
                    doorstep
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Professional beauty, salon, and home services delivered by
                  verified experts. Book in minutes, enjoy premium quality.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Category Cards */}
            <AnimateOnScroll animation="fade-in-up" delay={500}>
              <div>
                <h3 className="text-sm text-gray-600 font-medium mb-4">
                  Popular Categories:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                      className="group relative bg-white rounded-xl p-4 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden cursor-pointer"
                    >
                      {/* Gradient background on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      ></div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                        <div className="text-3xl mb-1 transform group-hover:scale-110 transition-transform duration-300">
                          {category.icon}
                        </div>
                        <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                          {category.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </AnimateOnScroll>

          {/* Right Image Collage - 1 Large + 3 Medium */}
          <AnimateOnScroll
            animation="fade-in-left"
            delay={300}
            className="relative lg:block hidden z-10"
          >
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
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.className =
                          "absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center border-4 border-white";
                        const icon = document.createElement("div");
                        icon.className = "text-8xl";
                        icon.textContent = "💇‍♀️";
                        parent.appendChild(icon);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold text-lg drop-shadow-lg">
                      Beauty & Salon
                    </p>
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
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.className =
                            "w-[280px] h-[180px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-success-200 to-success-300 flex items-center justify-center border-4 border-white";
                          const icon = document.createElement("div");
                          icon.className = "text-5xl";
                          icon.textContent = "🧹";
                          parent.appendChild(icon);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-bold text-sm drop-shadow-lg">
                        Home Cleaning
                      </p>
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
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.className =
                            "w-[280px] h-[180px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-secondary-200 to-secondary-300 flex items-center justify-center border-4 border-white";
                          const icon = document.createElement("div");
                          icon.className = "text-5xl";
                          icon.textContent = "❄️";
                          parent.appendChild(icon);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-bold text-sm drop-shadow-lg">
                        AC & Repair
                      </p>
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
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.className =
                            "w-[280px] h-[180px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-accent-200 to-accent-300 flex items-center justify-center border-4 border-white";
                          const icon = document.createElement("div");
                          icon.className = "text-5xl";
                          icon.textContent = "🔧";
                          parent.appendChild(icon);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-bold text-sm drop-shadow-lg">
                        Plumbing & Electric
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border-2 border-primary-100 animate-bounce-slow z-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Verified Experts
                    </p>
                    <p className="text-xs text-gray-500">
                      100% Background Checked
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-200/30 rounded-full blur-2xl animate-pulse-slow z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-200/30 rounded-full blur-2xl animate-pulse-slow z-0"></div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Stats Section */}
        <AnimateOnScroll animation="fade-in-up" delay={600}>
          <div className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ),
                value: "4.8",
                label: "Service Rating",
                color: "text-yellow-500",
                bgColor: "bg-yellow-50",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                value: "12M+",
                label: "Happy Customers",
                color: "text-primary-600",
                bgColor: "bg-primary-50",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                value: "20K+",
                label: "Verified Experts",
                color: "text-green-600",
                bgColor: "bg-green-50",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
                value: "50+",
                label: "Cities Served",
                color: "text-blue-600",
                bgColor: "bg-blue-50",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>

      {/* Subcategory Modal */}
      {isModalOpen && selectedCategory && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-scale-in flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={`bg-gradient-to-r ${selectedCategory.color} p-6 md:p-8 text-white relative`}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 active:scale-95 z-10 backdrop-blur-sm"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-4 md:gap-6 pr-12">
                <div className="text-5xl md:text-6xl bg-white/20 rounded-2xl p-4 md:p-5 backdrop-blur-sm shadow-lg">
                  {selectedCategory.icon}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                    {selectedCategory.title}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base">
                    Select a service to continue
                  </p>
                </div>
              </div>
            </div>

            {/* Subcategories Grid */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-200px)] flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {selectedCategory.subcategories.map((subcategory, index) => (
                  <button
                    key={index}
                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 md:p-6 border-2 border-gray-100 hover:border-[#e56481] hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-left overflow-hidden"
                    onClick={() => {
                      handleSubcategoryClick(subcategory, selectedCategory);
                      closeModal();
                    }}
                  >
                    {/* Hover gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${selectedCategory.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    ></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-start space-y-3">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-white group-hover:to-gray-50 transition-all duration-300 flex items-center justify-center shadow-sm group-hover:shadow-md mb-1">
                        <span className="text-3xl md:text-4xl transform group-hover:scale-110 transition-transform duration-300">
                          {subcategory.icon}
                        </span>
                      </div>
                      <span className="text-sm md:text-base font-bold text-gray-900 group-hover:text-[#e56481] transition-colors duration-300 leading-tight line-clamp-2">
                        {subcategory.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto pt-2">
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-semibold">4.8</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-[#e56481] font-medium group-hover:underline">
                          Book Now
                        </span>
                      </div>
                    </div>
                    
                    {/* Arrow indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="w-5 h-5 text-[#e56481] transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
