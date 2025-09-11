// src/pages/Pricing.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Star } from "lucide-react";

// The Plan 'type' now includes an optional 'description'
type Plan = {
  name: string;
  price: string;
  originalPrice: string | null;
  discountPercentage?: number;
  features: string[];
  popular?: boolean;
  description: string; // Added description field
  priceUnit?: string; // Added price unit field
};

// The redirect function remains the same
const handleWhatsAppRedirect = (plan: Plan) => {
  const planDetails = `
    I'm interested in the ${plan.name}.
    Price: ${plan.price}
  `;
  const encodedMessage = encodeURIComponent(planDetails);
  const whatsappLink = `https://wa.me/918332010304?text=${encodedMessage}`;
  window.open(whatsappLink, "_blank");
};

const PricingPage = () => {
  // The array of plans now includes the new description and priceUnit fields
  const plans: Plan[] = [
    {
      name: "Portfolio Website",
      price: "₹499",
      originalPrice: "₹1500",
      description: "Perfect for individuals and freelancers.",
      features: [
        "Up to 3 pages",
        "Fully responsive design",
        "Mobile friendly",
        "Social media links",
      ],
      discountPercentage: 65,
      priceUnit: "/one-time",
    },
    {
      name: "AI Standard",
      price: "Starts from ₹1999",
      originalPrice: null,
      description: "Ideal for small businesses and startups.",
      features: [
        "Up to 5 pages",
        "Responsive design",
        "Basic SEO Setup",
        "Contact Form",
        "Mobile friendly", 
      ],
    },
    {
      name: "AI Professional",
      price: "Starts from ₹4999",
      originalPrice: null,
      description: "For growing businesses ready to scale.",
      features: [
        "Everything in AI Standard",
        "Chatgpt/Gemini AI Integration",
        "6 months free web hosting",
        "Priority Support",
      ],
      popular: true,
    },
    {
      name: "AI Enterprise",
      price: "Coming Soon",
      originalPrice: null,
      description: "Custom solutions for large-scale applications.",
      features: [
        "Custom AI Web Application",
        "Advanced AI Features",
        "Database Integration",
        "1 Year AI Support",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/pricing.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <section id="pricing" className="py-24 px-6 lg:px-8">
            <div className="container mx-auto px-4">
              <div className="text-center mb-20">
                <h2 className="text-5xl sm:text-6xl font-light mb-6 text-white">
                  AI-Powered Pricing
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto font-semibold">
                  Revolutionary AI technology at unbeatable prices
                </p>
              </div>

              {/* Grid now renders the new card component */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {plans.map((plan, index) => (
                  <div key={index} className="group relative h-full">
                    <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-[1px] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/25">
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-blue-500 opacity-20"></div>
                      <div className="relative flex h-full flex-col rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-6">
                        <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"></div>
                        <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"></div>

                        {plan.popular && (
                          <div className="absolute -right-[1px] -top-[1px] overflow-hidden rounded-tr-2xl">
                            <div className="absolute h-20 w-20 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                            <div className="absolute h-20 w-20 bg-slate-950/90"></div>
                            <div className="absolute right-0 top-[22px] h-[2px] w-[56px] rotate-45 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                            <span className="absolute right-1 top-1 text-[10px] font-semibold text-white">
                              POPULAR
                            </span>
                          </div>
                        )}

                        <div className="relative">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500">
                            {plan.name}
                          </h3>
                          <div className="mt-2 flex items-baseline gap-2">
                            <span className={`font-bold text-white ${
                                plan.price.includes('Starts from') || plan.price === 'Contact Us' 
                                ? 'text-xl' 
                                : 'text-2xl'
                              }`}>
                              {plan.price}
                            </span>
                            {plan.priceUnit && <span className="text-sm text-slate-400">{plan.priceUnit}</span>}
                          </div>
                           {plan.originalPrice ? (
                            <div>
                               <span className="text-sm text-gray-400 line-through">{plan.originalPrice}</span>
                               {plan.discountPercentage && <span className="ml-2 text-green-400 text-sm font-semibold">{plan.discountPercentage}% OFF</span>}
                            </div>
                           ) : (
                             <div className="h-6"></div> 
                           )}
                          <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                        </div>

                        <div className="relative mt-6 flex-grow space-y-4">
                          {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start gap-3">
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                                <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-cyan-500">
                                  <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                                </svg>
                              </div>
                              <p className="text-sm font-medium text-white">{feature}</p>
                            </div>
                          ))}
                        </div>

                        <div className="relative mt-8">
                          <button
                            onClick={() => handleWhatsAppRedirect(plan)}
                            className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
                          >
                            <div className="relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors group-hover/btn:bg-transparent">
                              <span className="relative flex items-center justify-center gap-2">
                                Contact Now
                                <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1">
                                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                                </svg>
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default PricingPage;

