"use client";

import Logo from "./Logo";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left Side */}
          <Logo />

          {/* Desktop Navigation - Right Side */}
          <DesktopNavbar />

          {/* Mobile Navigation */}
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}
