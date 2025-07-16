"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-foreground hover:text-primary transition-colors duration-200"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card/50 backdrop-blur-sm rounded-xl mt-2 border border-border/50">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                pathname === "/"
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-foreground hover:text-primary hover:bg-accent/50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/generate-program"
              className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                pathname === "/generate-program"
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-foreground hover:text-primary hover:bg-accent/50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Generate Program
            </Link>
            <Link
              href="/profile"
              className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                pathname === "/profile"
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-foreground hover:text-primary hover:bg-accent/50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <div className="px-3 py-2 flex items-center justify-between">
              <ThemeToggle />
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "bg-card border border-border",
                      userButtonPopoverActionButton: "hover:bg-accent",
                    },
                  }}
                />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors duration-200">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
