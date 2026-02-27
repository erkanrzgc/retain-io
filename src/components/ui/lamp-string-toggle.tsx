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
    <div className="fixed top-0 right-10 md:right-32 z-50 flex flex-col items-center">
      {/* The string */}
      <div 
        className="w-[2px] bg-slate-400 dark:bg-slate-600 transition-all duration-300 ease-out"
        style={{ height: isPulling ? '150px' : '100px' }}
      ></div>
      
      {/* The handle */}
      <button
        onMouseDown={handlePull}
        onTouchStart={handlePull}
        className="w-4 h-8 rounded-full bg-amber-500 hover:bg-amber-400 dark:bg-slate-700 dark:hover:bg-slate-600 shadow-md cursor-grab active:cursor-grabbing transition-transform"
        aria-label="Toggle Dark Mode"
      />
      
      {/* Optional: Add a subtle glow when dark mode is on to simulate a lamp higher up */}
      {theme === 'light' && (
        <div className="absolute top-0 w-32 h-32 bg-amber-200/20 blur-3xl rounded-full pointer-events-none -translate-y-1/2"></div>
      )}
    </div>
  );
}
