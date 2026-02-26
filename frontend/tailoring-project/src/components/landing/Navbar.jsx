import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { 
      name: 'Services', 
      href: '#services',
      dropdown: [
        { name: 'Find Tailor Nearby', href: '#find-tailor' },
        { name: 'Simplified Booking Process', href: '#booking' },
        { name: 'Support Local Tailor', href: '#support-local' },
        { name: 'Enhance Customer Experience', href: '#customer-experience' },
        { name: 'Encourage Sustainable Fashion', href: '#sustainable' },
        { name: 'Hassle Free Tracking', href: '#tracking' },
      ]
    },
    { 
      name: 'How it Works', 
      href: '#how-it-works',
      dropdown: [
        { name: 'Place Order', href: '#place-order' },
        { name: 'Fabric Pickup', href: '#fabric-pickup' },
        { name: 'Stitching', href: '#stitching' },
        { name: 'Delivery', href: '#delivery' },
      ]
    },
    { name: 'Delivery Plans', href: '#delivery-plans' },
    { name: 'About', href: '#about' },
    { 
      name: 'Contact', 
      href: '#contact',
      dropdown: [
        { name: 'Login', href: '/login', isRoute: true },
        { name: 'Register', href: '/register', isRoute: true },
      ]
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-700 to-slate-900 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="TailorPro" className="h-10 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  className="text-white hover:text-teal-400 transition duration-300 font-medium"
                >
                  {item.name}
                </a>
                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-72 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-teal-500/20 overflow-hidden">
                    <div className="p-2">
                      {item.dropdown.map((subItem, index) => (
                        subItem.isRoute ? (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-3 text-gray-200 hover:bg-teal-600/20 hover:text-teal-400 transition duration-200 rounded-lg border-l-2 border-transparent hover:border-teal-400 mb-1 last:mb-0"
                          >
                            <span className="flex items-center gap-3">
                              <span className="text-teal-400 text-sm">0{index + 1}</span>
                              <span>{subItem.name}</span>
                            </span>
                          </Link>
                        ) : (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-gray-200 hover:bg-teal-600/20 hover:text-teal-400 transition duration-200 rounded-lg border-l-2 border-transparent hover:border-teal-400 mb-1 last:mb-0"
                          >
                            <span className="flex items-center gap-3">
                              <span className="text-teal-400 text-sm">0{index + 1}</span>
                              <span>{subItem.name}</span>
                            </span>
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-white hover:bg-slate-700 rounded-md transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
