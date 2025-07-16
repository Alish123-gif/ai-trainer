import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aithena - AI-Powered Fitness Companion",
  description:
    "Your AI-powered fitness companion. Get personalized workout programs, nutrition plans, and expert guidance to achieve your fitness goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider>
            <Navbar />
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>
              <div className="absolute inset-0 bg-[linear-gradient(var(--aithena-grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--aithena-grid-color)_1px,transparent_1px)] bg-[size:24px_24px] opacity-25"></div>
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/25"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scanline"></div>
            </div>
            <main className="pt-20 flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
