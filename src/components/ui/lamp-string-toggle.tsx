"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function LampStringToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handlePull = () => {
    setIsPulling(true);
    // Play a tiny click sound or just use visual feedback
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setIsPulling(false);
    }, 300); // Wait for the "pull" animation to finish before toggling
  };

  return (
    <div className="fixed top-0 left-10 md:left-32 z-[100] flex flex-col items-center group pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-center">
        {/* Lamp Wire/Base */}
      <div className="w-1.5 bg-slate-800 dark:bg-slate-950 h-16 shadow-inner"></div>
      
      {/* Lamp Shade & Bulb Container */}
      <div className="relative flex flex-col items-center">
        {/* Lamp Shade */}
        <div className="w-20 h-10 bg-slate-700 dark:bg-slate-800 rounded-t-full border-b-4 border-slate-900 dark:border-slate-950 z-10 shadow-lg relative">
          {/* Subtle reflection on the shade */}
          <div className="absolute top-2 right-4 w-4 h-2 bg-white/10 rounded-full blur-[1px]"></div>
        </div>
        
        {/* Bulb */}
        <div 
          className={`w-10 h-10 rounded-full -mt-4 transition-all duration-500 flex flex-col items-center justify-end pb-1
            ${theme === 'light' 
              ? 'bg-yellow-100 shadow-[0_10px_40px_rgba(253,224,71,0.8)] border border-yellow-200/50' 
              : 'bg-slate-500 border border-slate-600 shadow-transparent'}`}
        >
          {/* Filament glow if light is on */}
          {theme === 'light' && <div className="w-4 h-2 bg-yellow-300 rounded-full blur-[2px]"></div>}
        </div>
        
        {/* Pull String */}
        <div className="absolute top-10 right-3 flex flex-col items-center z-20">
          <div 
            className="w-[2px] bg-slate-400 dark:bg-slate-600 transition-all duration-300 ease-out"
            style={{ height: isPulling ? '80px' : '50px' }}
          ></div>
          <button
            onMouseDown={handlePull}
            onTouchStart={handlePull}
            className={`w-3 h-6 rounded-full shadow-md cursor-grab active:cursor-grabbing transition-colors ${
              theme === 'light' 
                ? 'bg-amber-600 hover:bg-amber-500' 
                : 'bg-slate-500 hover:bg-slate-400'
            }`}
            aria-label="Toggle Dark Mode"
          />
        </div>
      </div>
      
      </div>
      
      {/* Large Glow Effect (Illuminating the room) */}
      {theme === 'light' && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none z-[-1]"></div>
      )}
    </div>
  );
}
