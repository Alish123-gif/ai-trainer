"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";

export default function DesktopNavbar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center space-x-6">
      {/* Desktop Navigation */}
      <div className="flex items-center space-x-1">
        <Link
          href="/"
          className={`relative px-4 py-2 rounded-lg transition-all duration-200 group ${
            pathname === "/"
              ? "text-primary bg-primary/10"
              : "text-foreground hover:text-primary"
          }`}
        >
          <span className="relative z-10 font-medium">Home</span>
          {pathname === "/" && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </Link>
        <Link
          href="/generate-program"
          className={`relative px-4 py-2 rounded-lg transition-all duration-200 group ${
            pathname === "/generate-program"
              ? "text-primary bg-primary/10"
              : "text-foreground hover:text-primary"
          }`}
        >
          <span className="relative z-10 font-medium">Generate Program</span>
          {pathname === "/generate-program" && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </Link>
        <Link
          href="/profile"
          className={`relative px-4 py-2 rounded-lg transition-all duration-200 group ${
            pathname === "/profile"
              ? "text-primary bg-primary/10"
              : "text-foreground hover:text-primary"
          }`}
        >
          <span className="relative z-10 font-medium">Profile</span>
          {pathname === "/profile" && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
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
            <button className="relative bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 group">
              <span className="relative z-10 font-medium">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}
