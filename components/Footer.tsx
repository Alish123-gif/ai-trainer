import Link from "next/link";
import { Dumbbell, Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-purple-600 to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent leading-tight">
                  Aithena
                </span>
                <span className="text-sm text-muted-foreground font-medium -mt-1">
                  AI Trainer
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your AI-powered fitness companion. Get personalized workout
              programs, nutrition plans, and expert guidance to achieve your
              fitness goals.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-card hover:bg-accent/50 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-card hover:bg-accent/50 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-card hover:bg-accent/50 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </a>
              <a
                href="mailto:contact@aithena.com"
                className="group relative p-3 bg-card hover:bg-accent/50 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/generate-program"
                  className="group relative inline-block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <span className="relative z-10">Generate Program</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="group relative inline-block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <span className="relative z-10">Profile</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="group relative inline-block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <span className="relative z-10">Dashboard</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="group relative inline-block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <span className="relative z-10">About</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="group relative inline-block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <span className="relative z-10">Privacy Policy</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="group relative inline-block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <span className="relative z-10">Terms of Service</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group relative inline-block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <span className="relative z-10">Contact</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Aithena. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
