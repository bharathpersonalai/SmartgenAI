import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="px-2 h-[4.5rem]">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            {/* Logo Link: Now uses React Router's Link */}
            <Link to="/">
              <img
                src="/images/logo6.png"
                alt="SmartgenAI Innovations Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              // Navigation buttons changed to Link components
              <Link
                key={item.name}
                to={item.path}
                onClick={() => window.scrollTo(0, 0)} // Scroll to top on click
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: "#000" }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" style={{ color: "#000" }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: "#000" }} />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 py-4">
            {menuItems.map((item) => (
              // Mobile navigation buttons also changed to Link components
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  setIsMenuOpen(false); // First, close the menu
                  window.scrollTo(0, 0); // Then, scroll to the top
                }}
                className="block w-full text-left py-4 px-6 text-gray-700 hover:bg-gray-50 border-b border-gray-100 font-medium text-lg transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
