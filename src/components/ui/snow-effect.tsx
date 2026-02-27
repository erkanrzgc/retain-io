"use client";

import { useEffect, useState } from "react";

export function SnowEffect() {
  const [flakes, setFlakes] = useState<{ id: number; left: number; animationDuration: number; opacity: number; size: number }[]>([]);

  useEffect(() => {
    // Generate 50 snowflakes with random properties
    const newFlakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // random left position 0-100%
      animationDuration: Math.random() * 3 + 3, // random duration 3-6s
      opacity: Math.random() * 0.5 + 0.3, // random opacity 0.3-0.8
      size: Math.random() * 4 + 4, // random size 4-8px
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-[-10px] rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)]"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration}s linear infinite`,
            animationDelay: `-${Math.random() * 5}s`, // start at various points in animation
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) translateX(0);
          }
          100% {
            transform: translateY(100vh) translateX(20px);
          }
        }
      `}} />
    </div>
  );
}
