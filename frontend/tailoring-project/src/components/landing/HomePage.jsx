import React from 'react';
import { useState } from 'react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', icon: '🏠' },
    { name: 'Repairing', icon: '🔧' },
    { name: 'Installation', icon: '⚙️' },
    { name: 'Electricians', icon: '💡' },
    { name: 'Plumbing', icon: '🚰' },
  ];

  const services = [
    { name: 'Custom Stitching', subtitle: 'Tailored to fit', image: 'https://images.unsplash.com/photo-1558769132-cb1aea1c8347?w=400' },
    { name: 'Alterations', subtitle: 'Perfect adjustments', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400' },
    { name: 'Bridal Wear', subtitle: 'Special occasions', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400' },
    { name: 'Fabric Design', subtitle: 'Custom patterns', image: 'https://images.unsplash.com/photo-1558769132-cb1aea1c8347?w=400' },
  ];

  const tailors = [
    { name: 'Master Tailor', experience: '5 years of experience', rating: 4.8, reviews: 1200, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { name: 'Expert Seamstress', experience: '10 years of experience', rating: 4.9, reviews: 850, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    { name: 'Professional Tailor', experience: '7 years of experience', rating: 4.7, reviews: 620, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Top Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-4 pt-6 pb-8 rounded-b-3xl">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Hello, Welcome! 👋</h1>
          <p className="text-slate-300 text-sm">What service do you need?</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-4 pr-12 rounded-2xl bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-teal-500 p-2.5 rounded-xl">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
                index === 0
                  ? 'bg-teal-500 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span>{cat.icon}</span>
              <span className="text-sm font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 max-w-7xl mx-auto">
        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl p-6 mb-8 shadow-xl overflow-hidden relative">
          <div className="relative z-10 max-w-xs">
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-3">
              Popular
            </span>
            <h2 className="text-2xl font-bold text-white mb-2">
              Hire a Service Man
            </h2>
            <p className="text-white/90 text-sm mb-4">
              Get expert tailoring at your doorstep
            </p>
            <button className="px-6 py-2.5 bg-white text-teal-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
              Book Now
            </button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-teal-600"></div>
          </div>
        </div>

        {/* Our Services */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-900">Our Services</h3>
            <button className="text-teal-600 text-sm font-semibold flex items-center gap-1">
              See All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="h-32 bg-slate-200 rounded-t-2xl overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{service.name}</h4>
                  <p className="text-slate-500 text-xs">{service.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Tailors */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-900">Featured Tailors</h3>
            <button className="text-teal-600 text-sm font-semibold flex items-center gap-1">
              See All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tailors.map((tailor, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden"
              >
                <div className="h-48 bg-slate-200 overflow-hidden">
                  <img src={tailor.image} alt={tailor.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-900 mb-1">{tailor.name}</h4>
                  <p className="text-slate-500 text-sm mb-3">{tailor.experience}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-sm font-bold text-slate-900">{tailor.rating}</span>
                      <span className="text-xs text-slate-500">({tailor.reviews})</span>
                    </div>
                    <button className="px-4 py-1.5 bg-teal-500 text-white text-sm font-semibold rounded-lg hover:bg-teal-600 transition-colors">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
