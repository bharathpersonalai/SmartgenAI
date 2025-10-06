import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';
import './BrowserCard.css'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Tab = {
  title: string;
  content: React.ReactNode;
};

type BrowserCardProps = {
  tabs: Tab[];
  className?: string;
};

export const BrowserCard: React.FC<BrowserCardProps> = ({ tabs, className }) => {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  // This ref will hold a reference to each individual tab button element
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // This is the new "smart scroll" effect
  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      // When the active tab changes, we command the browser to smoothly scroll
      // that tab into the center of the scrollable area.
      activeTabElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeTab]); // This effect runs every time the 'activeTab' state changes

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  const goToNextTab = () => {
    const nextIndex = (activeTab + 1) % tabs.length;
    handleTabClick(nextIndex);
  };

  const goToPrevTab = () => {
    const prevIndex = (activeTab - 1 + tabs.length) % tabs.length;
    handleTabClick(prevIndex);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto rounded-lg shadow-2xl overflow-hidden flex flex-col bg-[#202124] border border-white/10", className)}>
      
      {/* Chrome Top Bar */}
      <div className="px-4 h-10 flex items-center justify-between bg-[#202124]">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex space-x-4 text-white/50 text-xs font-light">
          <div>—</div>
          <div>☐</div>
          <div>✕</div>
        </div>
      </div>

      {/* Chrome Tabs Bar */}
       <div className="bg-[#35363a] pt-2">
        <div
          ref={tabsContainerRef}
          className="flex items-end px-2 overflow-x-auto custom-horizontal-scrollbar"
          role="tablist"
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => handleTabClick(index)}
              className={cn(
                "flex-shrink-0 flex items-center gap-2 px-6 py-2 text-sm rounded-t-lg border-b-2 transition-colors duration-200 whitespace-nowrap",
                activeTab === index
                  ? "bg-[#202124] text-white border-blue-500"
                  : "text-gray-400 border-transparent hover:bg-white/5"
              )}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`tabpanel-${index}`}
              tabIndex={activeTab === index ? 0 : -1}
              id={`tab-${index}`}
            >
              <span>{tab.title}</span>
              <span className="text-gray-500 hover:text-white">✕</span>
            </button>
          ))}
        </div>
      </div> 
      
      {/* URL Bar */}
      <div className="p-2 bg-[#202124] flex items-center gap-2 border-b border-white/10">
        <button className="text-white/70 text-lg">←</button>
        <button className="text-white/40 text-lg" disabled>→</button>
        <div className="bg-[#35363a] flex-grow rounded-full px-4 py-1.5 text-white/80 text-sm truncate">
          {`smartgenai.co.in/${tabs[activeTab]?.title.toLowerCase().replace(/\s+/g, '-')}`}
        </div>
        <button className="text-white/70 text-lg">⋮</button>
      </div>

      {/* Main Content Area */}
       <div className="relative">
        <div 
          ref={contentRef}
          className="p-8 h-[450px] overflow-y-auto custom-scrollbar bg-[#202124]"
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {tabs[activeTab]?.content}
        </div> 
        
        {/* Mobile Navigation Arrows */}
        <div className="md:hidden">
          <button 
            onClick={goToPrevTab}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={goToNextTab}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

