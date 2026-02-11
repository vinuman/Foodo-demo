import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

import { Navbar } from "@/components/ui/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Foodo — Food Discovery",
    template: "%s | Foodo",
  },
  description:
    "Discover meals from around the world with interactive 3D food visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-neutral-950 font-sans text-neutral-100 antialiased">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
