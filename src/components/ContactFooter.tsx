"use client";

import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

export default function ContactFooter() {
  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="bg-stone-900 text-stone-100 py-20 px-6 border-t-4 border-amber-500 scroll-mt-20"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand & Socials */}
        <div className="flex flex-col">
          <h2 className="font-heading font-bold text-3xl text-amber-500 mb-6 tracking-tight">
            Waffinity
          </h2>
          <p className="text-stone-400 mb-8 leading-relaxed">
            Authentic Belgian waffles, crafted with love and imported pearl sugar. The perfect start to your morning or a late-night treat.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://www.instagram.com/waffinity"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-500 hover:text-stone-900 transition-colors text-stone-300"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* Location & Contact */}
        <div id="locations" className="flex flex-col scroll-mt-24">
          <h3 className="font-heading font-semibold text-xl mb-6 text-white">Visit Us</h3>
          <ul className="space-y-6 text-stone-400">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-amber-500 shrink-0 mt-1" />
              <div>
                <span className="text-stone-200 font-medium block">Ayanavaram Branch</span>
                <span className="text-sm">
                  New No. 231, Konnur High Rd, <br />
                  Ayanavaram, Chennai - 600023
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-amber-500 shrink-0 mt-1" />
              <div>
                <span className="text-stone-200 font-medium block">Perambur Branch</span>
                <span className="text-sm">
                  No. 45, Madhavaram High Rd, <br />
                  Perambur, Chennai - 600011
                </span>
              </div>
            </li>
          
          </ul>
        </div>

        {/* Hours */}
        <div className="flex flex-col">
          <h3 className="font-heading font-semibold text-xl mb-6 text-white">Hours</h3>
          <ul className="space-y-4 text-stone-400">
            <li className="flex items-start gap-3">
              <Clock size={20} className="text-amber-500 shrink-0 mt-1" />
              <div className="flex flex-col">
                <span className="text-white font-medium">All Day</span>
                <span>10:00 AM - 11:30 PM</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col">
          <h3 className="font-heading font-semibold text-xl mb-6 text-white">Stay Sweet</h3>
          <p className="text-stone-400 mb-4">
            Join our newsletter for secret flavors and exclusive discounts.
          </p>
          <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              suppressHydrationWarning
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-stone-800 text-white px-4 py-3 rounded-lg border border-stone-700 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button className="w-full bg-amber-500 text-stone-900 font-bold px-4 py-3 rounded-lg hover:bg-amber-400 transition-colors">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="container mx-auto mt-16 pt-8 border-t border-stone-800 text-center text-stone-500 text-sm">
        <p>© {new Date().getFullYear()} Waffinity. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}
