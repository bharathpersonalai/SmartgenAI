// src/pages/Pricing.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Star } from "lucide-react";

// This 'type' is for your pricing cards and is correct.
type Plan = {
  name: string;
  price: string;
  originalPrice: string | null;
  discountPercentage?: number;
  features: string[];
  popular?: boolean;
};

// This function for the pricing cards is now in this component.
const handleWhatsAppRedirect = (plan: Plan) => {
  const planDetails = `
    I'm interested in the ${plan.name}.
    Price: ${plan.price}
  `;
  const encodedMessage = encodeURIComponent(planDetails);
  const whatsappLink = `https://wa.me/918332010304?text=${encodedMessage}`; // Replace with your WhatsApp number
  window.open(whatsappLink, "_blank");
};

const Pricing = () => {
  return (
    <div>
      <Header />
      {/* 3. Pricing Section */}
      <section
        id="pricing"
        className="py-24 px-6 lg:px-8 bg-stone-50 dark:bg-slate-950"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-light mb-6 text-stone-800 dark:text-stone-200">
              AI-Powered Pricing
            </h2>
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto font-light">
              Revolutionary AI technology at unbeatable prices
            </p>
          </div>
          {/* Updated grid for 4 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              // CARD 1: PERSONAL PORTFOLIO (NEW)
              {
                name: "Professional Portfolio Website",
                price: "₹499",
                originalPrice: "₹1500",
                features: [
                  "Up to 3 pages",
                  "Fully responsive design",
                  "Mobile friendly",
                  "Social media links",
                  "Contact us for more details",
                ],
                discountPercentage: 65,
              },
              // CARD 2: AI STANDARD
              {
                name: "AI Standard",
                price: "₹1999",
                originalPrice: "₹5,000",
                features: [
                  "Up to 5 pages (Home, Services, Gallery, About, Contact)",
                  "Responsive design (mobile + tablet + desktop)",
                  "SEO Setup (meta tags, titles, alt text)",
                  "Social Media Links Integration",
                  "Basic Contact Form",
                ],
                discountPercentage: 60,
              },
              // CARD 3: AI PROFESSIONAL (FEATURED)
              {
                name: "AI Professional",
                price: "₹3,999",
                originalPrice: "₹8,000",
                discountPercentage: 50,
                features: [
                  "Everything in AI Standard",
                  "Extra Gallery Images",
                  "2 months free web hosting",
                  "Chatgpt/Gemini AI Integration",
                  "Priority Support",
                ],
                popular: true,
              },
              // CARD 4: AI ENTERPRISE
              {
                name: "AI Enterprise",
                price: "Contact Us",
                originalPrice: null,
                features: [
                  "Custom AI Web Application",
                  "Advanced AI Features",
                  "AI Database Integration",
                  "1 Year AI Support",
                  "AI Admin Dashboard",
                  "AI Payment Gateway",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex flex-col border ${
                  plan.popular
                    ? "border-cyan-500"
                    : "border-stone-200 dark:border-slate-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      AI Powered
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-stone-200 mb-4">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-cyan-500">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="ml-2 text-lg text-gray-400 dark:text-gray-500 line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  {plan.discountPercentage && (
                    <span className="text-green-600 text-sm font-semibold">
                      {plan.discountPercentage}% OFF
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-stone-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleWhatsAppRedirect(plan)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? "bg-stone-800 hover:bg-stone-700 text-stone-100 dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:text-white"
                      : "bg-stone-100 text-stone-800 hover:bg-stone-200 dark:bg-slate-800 dark:text-stone-300 dark:hover:bg-slate-700"
                  }`}
                >
                  Contact now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Pricing;