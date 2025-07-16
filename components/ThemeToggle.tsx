"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-card hover:bg-accent/50 transition-all duration-300 hover:scale-110 group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative">
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        ) : (
          <Sun className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      </div>
    </button>
  );
}
