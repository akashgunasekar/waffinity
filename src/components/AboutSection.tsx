"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: -300, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", mass: 0.8, stiffness: 100, damping: 12 },
  },
};

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen py-32 overflow-hidden flex items-center">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Narrative Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col z-10"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-black text-amber-50 mb-6 leading-tight tracking-tight uppercase">
            CRAFTED FOR <span className="font-serif italic font-normal text-amber-500 lowercase">perfection</span>
          </h2>
          <p className="text-lg text-stone-300 mb-6 leading-relaxed font-sans">
            We believe great waffles are not made in a hurry. Every order is prepared with care, attention, and a passion for delivering something truly special.
          </p>
          <ul className="space-y-6 mt-4">
            <li className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/30">
                <span className="font-heading font-bold text-amber-500 text-xl">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-50 mb-1">Handcrafted Daily</h3>
                <p className="text-stone-400">Prepared fresh throughout the day to maintain exceptional quality and taste.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/30">
                <span className="font-heading font-bold text-amber-500 text-xl">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-50 mb-1">Golden & Crispy</h3>
                <p className="text-stone-400">Baked until perfectly golden, delivering the signature texture our customers love.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/30">
                <span className="font-heading font-bold text-amber-500 text-xl">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-50 mb-1">Made to Delight</h3>
                <p className="text-stone-400">Thoughtfully finished and beautifully served for an unforgettable waffle experience.</p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Right Column: Attractive Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative h-[600px] w-full flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-[500px] max-h-[500px] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
            <Image 
              src="/image/heroimg/ezgif-frame-150.png" 
              alt="Crafted for Perfection" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700" 
            />
            {/* Subtle overlay for the dark chocolate theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a110a]/60 to-transparent pointer-events-none"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
