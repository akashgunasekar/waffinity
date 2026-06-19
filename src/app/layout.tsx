import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
      className={`${inter.variable} ${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                      mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                          if (node.hasAttribute('bis_skin_checked')) node.removeAttribute('bis_skin_checked');
                          node.querySelectorAll('[bis_skin_checked]').forEach(function(el) { el.removeAttribute('bis_skin_checked'); });
                        }
                      });
                    } else if (mutation.type === 'attributes' && mutation.attributeName === 'bis_skin_checked') {
                      if (mutation.target.nodeType === 1 && mutation.target.hasAttribute('bis_skin_checked')) {
                        mutation.target.removeAttribute('bis_skin_checked');
                      }
                    }
                  });
                });
                observer.observe(document.documentElement, {
                  childList: true,
                  subtree: true,
                  attributes: true,
                  attributeFilter: ['bis_skin_checked']
                });
              })();
            `
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-[#1a110a] text-amber-50 selection:bg-amber-500 selection:text-[#1a110a]">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <ContactFooter />
        <Analytics />
      </body>
    </html>
  );
}
