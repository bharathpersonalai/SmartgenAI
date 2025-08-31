import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast"; // <-- 1. IMPORT TOAST
import {
  Menu,
  X,
  Star,
  Bot,
  Cpu,
  BrainCircuit as Circuit,
  Sparkles,
} from "lucide-react";

// This 'type' is for your pricing cards and is correct.
type Plan = {
  name: string;
  price: string;
  originalPrice: string | null;
  discountPercentage?: number;
  features: string[];
  popular?: boolean;
};

// This function for the pricing cards is also correct.
const handleWhatsAppRedirect = (plan: Plan) => {
  const planDetails = `
    I'm interested in the ${plan.name}.
    Price: ${plan.price}
  `;
  const encodedMessage = encodeURIComponent(planDetails);
  const whatsappLink = `https://wa.me/918332010304?text=${encodedMessage}`; // Replace with your WhatsApp number
  window.open(whatsappLink, "_blank");
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stage, setStage] = useState("intro");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState("main");

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== "main") {
      setCurrentPage("main");
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Pricing", id: "pricing" },
    { name: "Contact", id: "contact" },
    { name: "About", id: "about" },
  ];

  const handleGiveAccess = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setStage("main");
    }
  };

  const handleButtonClick = (url: string, index: number) => {
    window.open(url, "_blank");
    setActiveButton(index);
    setTimeout(() => {
      setActiveButton(null);
    }, 300);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbw27zzbuovIlWSSx-yHDDceXH-BRBOXhHqN18HRQV57vBXKTZBay7IZcr4hnB9qj_Tpiw/exec"; // Make sure your URL is still here

    // This new part "packages" the data correctly
    const promise = fetch(scriptURL, {
      method: "POST",
      mode: "no-cors", // This can sometimes help with Google Scripts
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData as any).toString(),
    });

    toast.promise(
      promise,
      {
        loading: "Sending message...",
        success: <b>Message sent successfully!</b>,
        error: <b>Could not send message.</b>,
      },
      {
        position: "top-right",
        success: {
          style: {
            background: "#4ade80",
            color: "#ffffff",
          },
        },
      }
    );

    promise.then(() => {
      form.reset();
    });
  };

  useEffect(() => {
    if (stage === "main") {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [stage]);

  // This is the component for your new "About Founder" page.
  const AboutFounderPage = () => (
    <div className="min-h-screen bg-white animate-fade-in">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-2 h-[4.5rem] flex items-center justify-between">
          {/* The text has been replaced with your clickable logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            <img
              src="/images/logo5.png"
              alt="SmartgenAI Innovations Logo"
              className="w-[16rem] h-[16rem]" // You can adjust the size here
              style={{ marginTop: "12px", marginLeft: "-30px" }}
            />
          </a>

          <button
            onClick={() => setCurrentPage("main")}
            className="font-semibold text-blue-600 hover:text-blue-800"
          >
            &larr; Back to Main Site
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Founder Page under AI construction, Stay Tuned !</h1>
       <video width="100%" height="auto" controls autoPlay loop>
        <source src="/videos/into_video.mp4" type="video/mp4" />
      </video>
        {/* <p className="mb-8 text-gray-600">
          This is where you can add the founder's bio, portfolio, achievements,
          and other relevant info.
        </p> */}
        {/* You can add more sections here for Portfolio, Achievements, etc. */}
      </main>
    </div>
  );

  switch (currentPage) {
    case "about-founder":
      return <AboutFounderPage />;

    case "main":
    default:
      if (stage === "intro") {
        return (
          <div className="h-screen overflow-hidden relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
            >
              <source
                src="/videos/Robot_Animation_Request_Fulfilled.mp4" 
                type="video/mp4"
              />
            </video>
            <div className="relative z-10 flex justify-center h-screen">
              <div className="text-center mt-[30rem]">
                <button
                  onClick={handleGiveAccess}   
                  className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 text-white px-6 py-2 rounded-full text-lg font-bold hover:from-cyan-400 hover:via-blue-500 hover:to-purple-600 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 animate-fall-left-right"
                  style={{ animationDelay: "1s" }}
                >
                  Click Here
                </button>
              </div>
            </div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        );
      }

      return (
        <div className="min-h-screen bg-white animate-fade-in">
          {/* --- NEW CODE: TOASTER COMPONENT --- */}
          <Toaster />

          {/* Header */}
          <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
            <div className="px-2 h-[4.5rem]">
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center">
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("home");
                    }}
                  >
                    <img
                      src="/images/logo5.png"
                      alt="SmartgenAI Innovations Logo"
                      className="w-[16rem] h-[16rem]"
                      style={{ marginTop: "12px", marginLeft: "-30px" }}
                    />
                  </a>
                </div>
                <nav className="hidden md:flex space-x-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                    >
                      {item.name}
                    </button>
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
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left py-4 px-6 text-gray-700 hover:bg-gray-50 border-b border-gray-100 font-medium text-lg transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>
              )}
            </div>
          </header>

          {/* 1. Welcome Section (Hero) */}
          <section
            id="home"
            className="relative pt-20 pb-16 text-white overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/intro_video2.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="container mx-auto px-4 py-16 relative z-10">
              <div className="text-center max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Beyond Automation{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    True Innovation
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
                  From custom web applications to intelligent automation, we
                  provide the tools your business needs to lead the future
                </p>
              </div>
            </div>
          </section>

          {/* 2. Services Section */}
          <section id="services" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  AI-Driven Services
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Powered by artificial intelligence to deliver superior results
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "AI-Powered Custom Websites",
                    description:
                      "We build websites that are fast, modern, and can adjust to your customer’s needs. They give a personal touch, making every visitor feel connected to your business.",
                  },
                  {
                    title: "Smart Web Applications",
                    description:
                      "Not just websites, but powerful online platforms where people can interact like booking systems, dashboards, or customer portals. Built to make your business run smoother and serve customers better.",
                  },
                  {
                    title: "AI Automation Tools (Coming Soon 🚀)",
                    description:
                      "We are testing powerful AI tools that will soon help businesses automate daily tasks, reduce manual work, and increase productivity. Stay tuned for launch!",
                  },
                ].map((service, index) => (
                  <div key={index} className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <h3 className="text-2xl font-semibold text-gray-900">
                          {service.title}
                        </h3>
                        <p className="mt-4 text-gray-500">
                          Tap here to see more
                        </p>
                      </div>
                      <div className="flip-card-back">
                        <p className="text-white">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Pricing Section */}
          <section id="pricing" className="py-24 px-6 lg:px-8 bg-stone-50 dark:bg-slate-950">
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
          price: "₹999",
          originalPrice: "₹5,000",
          features: [
            "Up to 5 pages (Home, Services, Gallery, About, Contact)",
            "Responsive design (mobile + tablet + desktop)",
            "SEO Setup (meta tags, titles, alt text)",
            "Social Media Links Integration",
            "Basic Contact Form",
          ],
          discountPercentage: 80,
        },
        // CARD 3: AI PROFESSIONAL (FEATURED)
        {
          name: "AI Professional",
          price: "₹2,999",
          originalPrice: "₹8,000",
          discountPercentage: 63,
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
                <span className="text-gray-600 dark:text-stone-400">{feature}</span>
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

          {/* 4. Contact Section */}
          <section
            id="contact"
            className="py-16 bg-gradient-to-br from-blue-50 to-purple-50"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Get In Touch
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Ready to experience AI-powered web development? Let's create
                  something amazing together.
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                {/* The form tag is updated to remove Netlify attributes and use onSubmit */}
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-white p-8 rounded-2xl shadow-lg"
                >
                  {/* The hidden Netlify fields have been removed */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Name*
                      </label>
                      <input
                        type="text"
                        name="Name" // Capitalized to match Google Sheet header
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        name="Email" // Capitalized to match Google Sheet header
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Message*
                    </label>
                    <textarea
                      name="Message" // Capitalized to match Google Sheet header
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      placeholder="Got a query or innovative idea? Let's talk...  (Draft with AI button is coming soon !)"
                      required
                    ></textarea>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                    <button type="button" className="button-ai">
                      Draft with AI
                      <div className="star-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlSpace="preserve"
                          version="1.1"
                          viewBox="0 0 784.11 815.53"
                        >
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </svg>
                      </div>
                      <div className="star-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlSpace="preserve"
                          version="1.1"
                          viewBox="0 0 784.11 815.53"
                        >
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </svg>
                      </div>
                      <div className="star-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlSpace="preserve"
                          version="1.1"
                          viewBox="0 0 784.11 815.53"
                        >
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </svg>
                      </div>
                      <div className="star-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlSpace="preserve"
                          version="1.1"
                          viewBox="0 0 784.11 815.53"
                        >
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </svg>
                      </div>
                      <div className="star-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlSpace="preserve"
                          version="1.1"
                          viewBox="0 0 784.11 815.53"
                        >
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </svg>
                      </div>
                      <div className="star-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlSpace="preserve"
                          version="1.1"
                          viewBox="0 0 784.11 815.53"
                        >
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </svg>
                      </div>
                    </button>
                    <button type="submit" className="button-submit">
                      <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                              fill="currentColor"
                              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <span>Submit</span>
                    </button>
                  </div>
                </form>
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    className={`Btn whatsapp ${
                      activeButton === 0 ? "expanded" : ""
                    }`}
                    onClick={() =>
                      handleButtonClick(
                        "https://wa.me/918332010304?text=Hi%20I%20would%20like%20to%20know%20more",
                        0
                      )
                    }
                  >
                    <div className="sign">
                      <svg viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                      </svg>
                    </div>
                    <div className="text">Whatsapp</div>
                  </button>
                  <button
                    className={`Btn instagram ${
                      activeButton === 1 ? "expanded" : ""
                    }`}
                    onClick={() =>
                      handleButtonClick(
                        "https://www.instagram.com/smartgenaiinnovations?igsh=NTduNHRpaGcybHl1",
                        1
                      )
                    }
                  >
                    <div className="sign">
                      <svg viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                      </svg>
                    </div>
                    <div className="text">Instagram</div>
                  </button>
                  <button
                    className={`Btn linkedin ${
                      activeButton === 2 ? "expanded" : ""
                    }`}
                    onClick={() =>
                      handleButtonClick(
                        "https://www.linkedin.com/company/smartgenai-innovations/",
                        2
                      )
                    }
                  >
                    <div className="sign">
                      <svg viewBox="0 0 448 512">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                      </svg>
                    </div>
                    <div className="text">LinkedIn</div>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 5. About Section (Vision) with Video Background */}
          <section
            id="about"
            className="relative py-16 text-white overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/about3.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-8">
                  Why Choose Us?
                </h2>
                <p className="text-xl text-gray-200 leading-relaxed mb-8">
                  SmartgenAI Innovations combines AI-driven web development with top-tier security to deliver websites that exceed your business's needs. Our intelligent solutions ensure a seamless user experience, SEO and GEO  optimization, and high conversion rates, while robust security protects your data at every stage. Whether you’re a startup or an established brand, we create secure, scalable websites that grow with your business.
                </p>
                <button
                  onClick={() => setCurrentPage("about-founder")}
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors"
                >
                  About the Founder
                </button>
              </div>
            </div>
          </section>

          {/* 6. Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
                <div>
                  <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                    <span className="text-lg font-bold">
                      SmartgenAI Innovations
                    </span>
                  </div>
                  <p className="text-gray-400">
                    Pioneering AI-driven web development for the future.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">
                    Quick Links
                  </h3>
                  <div className="flex items-start justify-center gap-16">
                    <div className="space-y-2">
                      {["Home", "Services", "Pricing"].map((item) => (
                        <button
                          key={item}
                          onClick={() => scrollToSection(item.toLowerCase())}
                          className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {["Contact", "About"].map((item) => (
                        <button
                          key={item}
                          onClick={() => scrollToSection(item.toLowerCase())}
                          className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Made with ❤️ in India
                  </h3>
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
        </div>
      );
  }
}

export default App;
