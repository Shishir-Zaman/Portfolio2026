"use client";

import { ReactNode } from "react";

// Theme switching has been removed. Site is permanently dark mode.
export function useTheme() {
  return { theme: "dark" as const, toggleTheme: () => {} };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
