"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function SnowEffect() {
  const [flakes, setFlakes] = useState<{ id: number; left: number; animationDuration: number; opacity: number; size: number }[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    // Generate 150 tiny snowflakes with random properties for a dense blur
    const newFlakes = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // random left position 0-100%
      animationDuration: Math.random() * 5 + 4, // slower random duration 4-9s
      opacity: Math.random() * 0.4 + 0.1, // very low opacity 0.1-0.5
      size: Math.random() * 6 + 6, // very small random font size 6-12px
    }));
    setFlakes(newFlakes);
  }, []);

  if (theme !== "dark") return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-[-20px] text-white"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration}s linear infinite`,
            animationDelay: `-${Math.random() * 10}s`, // start at various points in animation
          }}
        >
          ❄
        </div>
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
