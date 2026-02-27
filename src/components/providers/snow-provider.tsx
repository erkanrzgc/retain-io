"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { SnowEffect } from "@/components/ui/snow-effect";

interface SnowContextType {
  isSnowing: boolean;
  toggleSnow: () => void;
}

const SnowContext = createContext<SnowContextType | undefined>(undefined);

export function SnowProvider({ children }: { children: ReactNode }) {
  const [isSnowing, setIsSnowing] = useState(false);

  const toggleSnow = () => {
    setIsSnowing((prev) => !prev);
  };

  return (
    <SnowContext.Provider value={{ isSnowing, toggleSnow }}>
      {children}
      {isSnowing && <SnowEffect />}
    </SnowContext.Provider>
  );
}

export function useSnow() {
  const context = useContext(SnowContext);
  if (context === undefined) {
    throw new Error("useSnow must be used within a SnowProvider");
  }
  return context;
}
