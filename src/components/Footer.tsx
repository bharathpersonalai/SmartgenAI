import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <span className="text-lg font-bold">SmartgenAI Innovations</span>
            </div>
            <p className="text-gray-400">Pioneering AI-driven web development for the future.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">Quick Links</h3>
            <div className="flex items-start justify-center gap-16">
              <div className="space-y-2">
                {/* Links for Home, Services, Pricing */}
                {["Home", "Services", "Pricing"].map((item) => (
                  <Link
                    key={item}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                {/* Links for Contact, About */}
                {["Contact", "About"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Made with ❤️ in India</h3>
            <p className="text-gray-400">
              Bringing AI innovation to businesses worldwide.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            Copyright © 2025 SmartgenAI Innovations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default footer;