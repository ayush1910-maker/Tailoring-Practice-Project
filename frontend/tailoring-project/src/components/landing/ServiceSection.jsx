import React from 'react';
import Location from '../../assets/Location.Jpg';
import Booking from '../../assets/Booking.jpg';
import Support from "../../assets/Support.jpg";
import CustomerExp from "../../assets/CustomerExp.jpg";
import Fashion from "../../assets/Fashion.jpg";
import Traking from "../../assets/Traking.jpg";

const ServiceSection = () => {
  const services = [
    {
      title: 'Find Tailor Nearby',
      description: 'Discover skilled tailors in your area with our location-based search feature.',
      image: Location,
    },
    {
      title: 'Simplified Booking Process',
      description: 'Easy and quick booking system to schedule your tailoring appointments hassle-free.',
      image: Booking,
    },
    {
      title: 'Support Local Tailor',
      description: 'Empower local artisans and craftsmen by connecting directly with them.',
      image: Support,
    },
    {
      title: 'Enhance Customer Experience',
      description: 'Seamless platform designed to provide exceptional service and satisfaction.',
      image: CustomerExp,
    },
    {
      title: 'Encourage Sustainable Fashion',
      description: 'Promote eco-friendly practices by repairing and customizing existing garments.',
      image: Fashion,
    },
    {
      title: 'Hassle Free Tracking',
      description: 'Track your order status in real-time from booking to delivery.',
      image: Traking,
    },
  ];

  return (
    <section id="services" className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-800/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our <span className="text-teal-500">Services</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our comprehensive tailoring solutions designed to bring your vision to life
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-teal-400 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-slate-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Number Badge */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center text-teal-400 font-bold text-lg">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Content */}
              <div className="relative">
                <img src={service.image} alt={service.title} className="w-20 h-20 mb-4 object-contain" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center text-teal-600 font-semibold group-hover:text-teal-700 transition-colors duration-300"
                >
                  Learn More
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block px-10 py-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Book Your Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
