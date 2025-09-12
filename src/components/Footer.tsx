import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // This new function handles the platform-specific redirect
  const handleSocialRedirect = (event: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    event.preventDefault(); // Prevent the link's default behavior
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    if (isIOS) {
      // For iOS, open in the same tab to avoid the "ghost tab" issue
      window.location.href = url;
    } else {
      // For all other devices, open in a new tab as expected
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // The array for social media links remains the same
  const socialLinks = [
    {
      name: "Whatsapp",
      url: "https://wa.me/918332010304?text=Hi%20I%20would%20like%20to%20know%20more",
      cssClass: "whatsapp",
      icon: (
        <svg viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/smartgenaiinnovations?igsh=NTduNHRpaGcybHl1",
      cssClass: "instagram",
      icon: (
        <svg viewBox="0 0 16 16">
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
        </svg>
      ),
    },
  ];
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          {/* Column 1: Info and Social Icons */}
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <span className="text-lg font-bold">SmartgenAI Innovations</span>
            </div>
            <p className="text-gray-400">
              Pioneering AI-driven web development for the future.
            </p>
            {/* START: Updated Social Icons Section */}
            <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  onClick={(e) => handleSocialRedirect(e, link.url)}
                  aria-label={`Follow us on ${link.name}`}
                >
                  <button className={`social-expand-btn ${link.cssClass}`}>
                    <div className="social-expand-btn__sign">{link.icon}</div>
                    <div className="social-expand-btn__text">{link.name}</div>
                  </button>
                </a>
              ))}
            </div>
            {/* END: Updated Social Icons Section */}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">Quick Links</h3>
            <div className="flex items-start justify-center gap-16">
              <div className="space-y-2">
                {["Home", "Services", "Pricing"].map((item) => (
                  <Link
                    key={item}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                {["Contact", "About"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Made in India */}
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

export default Footer;

