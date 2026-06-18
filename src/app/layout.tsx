import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Waffinity | Premium Waffles",
  description: "A premium Waffle Shop landing page experience.",
  icons: {
    icon: "/waffinity-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-[#1a110a] text-amber-50 selection:bg-amber-500 selection:text-[#1a110a]">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <ContactFooter />
      </body>
    </html>
  );
}
