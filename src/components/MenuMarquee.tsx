"use client";

import { motion } from "framer-motion";

export default function MenuMarquee() {
  const categories = [
    "CLASSIC WAFFLE",
    "SIGNATURE WAFFLE",
    "RED VELVET WAFFLE",
    "MINI PANCAKES",
    "STICK WAFFLE",
    "CAKE WAFFLES",
    "BROWNIES",
    "CHOCOLATE STRAWBERRY"
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#fffbe6] py-5 my-6 shadow-xl z-10 transform rotate-2 scale-105 border-y border-[#2d1a12]/10">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", repeat: Infinity, duration: 30 }}
          className="flex whitespace-nowrap shrink-0"
        >
          {/* Block 1 */}
          <div className="flex items-center font-heading text-2xl md:text-4xl font-black text-[#2d1a12] uppercase tracking-widest px-4">
            {categories.map((cat, idx) => (
              <span key={`b1-${idx}`} className="flex items-center whitespace-nowrap">
                <span>{cat}</span>
                <span className="mx-6 text-xl select-none">🌼</span>
              </span>
            ))}
          </div>
          {/* Block 2 (identical for seamless looping) */}
          <div className="flex items-center font-heading text-2xl md:text-4xl font-black text-[#2d1a12] uppercase tracking-widest px-4">
            {categories.map((cat, idx) => (
              <span key={`b2-${idx}`} className="flex items-center whitespace-nowrap">
                <span>{cat}</span>
                <span className="mx-6 text-xl select-none">🌼</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
