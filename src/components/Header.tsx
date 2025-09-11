// src/components/Header.tsx
import React, { useState } from "react";
// CHANGED: We now import NavLink to handle active styles
import { NavLink, Link } from "react-router-dom"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  // This function determines the style based on whether the link is active
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-600 font-medium transition-colors duration-200" // Style for the active link
      : "text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"; // Style for inactive links

  // A separate style function for the mobile menu's active links
  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
    ? "block w-full text-left py-4 px-6 bg-blue-50 text-blue-600 border-b border-gray-100 font-medium text-lg transition-colors duration-200"
    : "block w-full text-left py-4 px-6 text-gray-700 hover:bg-gray-50 border-b border-gray-100 font-medium text-lg transition-colors duration-200"

  return (
    // Your exact header structure and styling is preserved
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="px-2 h-[4.5rem]">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            {/* The Logo Link now also handles scrolling to the top */}
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img
                src="/images/logo6.png"
                alt="SmartgenAI Innovations Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              // The <Link> is replaced with <NavLink>
              <NavLink
                key={item.name}
                to={item.path}
                className={getNavLinkClass} // The style is now dynamic
                onClick={() => window.scrollTo(0, 0)}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col">
            {navItems.map((item) => (
               <NavLink
                key={item.name}
                to={item.path}
                className={getMobileNavLinkClass}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

