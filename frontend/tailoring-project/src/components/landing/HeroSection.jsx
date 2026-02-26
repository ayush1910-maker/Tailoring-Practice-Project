import React from 'react';
import heroVideo from '../../assets/Herobg.mp4';

const HeroSection = () => {
  const scrollToNext = () => {
    document.getElementById('next-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section 
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-teal-900/40"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Tailored to <span className="text-teal-400">Perfection</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8">
            Experience premium custom tailoring with expert craftsmanship
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#services" 
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
            >
              Explore Services
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white font-semibold rounded-lg transition duration-300"
            >
              Get Started
            </a>
          </div>
        </div>

{/*        
        <button 
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer"
          aria-label="Scroll to next section"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button> */}
      </section>

    
      {/* <section id="next-section" className="min-h-screen bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-8">Welcome to Our Services</h2>
          <p className="text-lg text-slate-600 text-center">Scroll down to explore more...</p>
        </div>
      </section> */}
    </>
  );
};

export default HeroSection;
