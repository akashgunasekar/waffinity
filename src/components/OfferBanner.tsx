"use client";

import { motion } from "framer-motion";

export default function OfferBanner() {
  const text = "CRISPY WAFFLES 10% OFF TILL MIDNIGHT • USE CODE: WAFFY10 • ";
  
  // We repeat the text enough times to span across ultra-wide monitors
  const textGroup = Array(6).fill(text).join(" ");

  return (
    <section className="relative w-full overflow-hidden bg-amber-500 py-5 my-16 shadow-xl z-20 transform -rotate-2 scale-105">
      <div className="flex whitespace-nowrap">
        {/* 
          We animate from 0% to -50%. 
          Because we have two identical child blocks taking up 50% width each,
          when it hits -50% it looks identical to 0%, creating a seamless infinite loop.
        */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", repeat: Infinity, duration: 40 }}
          className="flex whitespace-nowrap shrink-0"
        >
          <div className="font-heading text-3xl md:text-5xl font-black text-stone-900 uppercase tracking-widest px-4">
            {textGroup}
          </div>
          <div className="font-heading text-3xl md:text-5xl font-black text-stone-900 uppercase tracking-widest px-4">
            {textGroup}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
