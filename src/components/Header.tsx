import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Logic for scroll effects can be added here
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/about' },
  ];

  const navClasses = "mx-auto px-4 py-2 bg-gradient-to-r from-slate-900/70 to-purple-900/60 backdrop-blur-xl rounded-full shadow-2xl border border-white/10";

  return (
    <header className="relative z-50"> 
      
      {/* Top-left logo, visible on all screen sizes */}
      <a href="/home" className="fixed top-4 left-4 transition-transform duration-300 hover:scale-105">
        <img className="h-14 w-auto" src="/images/logo.png" alt="SmartgenAI Innovations Logo" />
      </a>

      {/* This is the navigation bar container. It changes position based on screen size. */}
      <div className={`fixed top-4 right-4 md:left-1/2 md:-translate-x-1/2 transition-all duration-300`}>
        <nav className={navClasses}>
          <div className="flex items-center justify-between">
            
            {/* Small AI Icon - HIDDEN on mobile, visible on desktop */}
            <a href="/home" className="flex-shrink-0 hidden md:block"> 
              <img className="h-8 w-8 rounded-full object-cover" src="/images/AI.png" alt="SmartgenAI Innovations Logo" />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 ml-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-200 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Hamburger Menu Button - VISIBLE on mobile, hidden on desktop */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-200 hover:text-white focus:outline-none p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown - now appears from the right */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 rounded-xl shadow-lg ${navClasses}`}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 text-center"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
