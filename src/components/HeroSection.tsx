"use client";

import { motion, Variants } from "framer-motion";

export default function HeroSection() {
  // Heavy spring physics for a high-impact "gravity drop" effect
  const gravityDropVariant: Variants = {
    hidden: { y: -800, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 90, 
        damping: 14, 
        mass: 1.2 
      } 
    }
  };

  // Lighter spring physics for the subtext
  const floatUpVariant: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 70, 
        damping: 20, 
        delay: 0.4
      } 
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a110a] pt-20">
      
      {/* Cinematic Auto-Playing Video Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <video 
          src="/image/hero-video/Waffle_with_chocolate_splashes_202606091712.mp4"
          className="w-full h-full object-cover opacity-80"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark vignette overlay to ensure text is perfectly readable against the video */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a110a] via-transparent to-transparent"></div>
      </div>

      {/* High-Energy Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Gravity Drop Main Heading */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={gravityDropVariant}
          className="mb-6"
        >
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-500 font-bold text-sm tracking-widest uppercase mb-6 shadow-xl">
            Authentic Belgian Recipe
          </span>
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black text-amber-50 leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            Fluffy <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Perfection
            </span>
          </h1>
        </motion.div>

        {/* Float Up Subtext */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={floatUpVariant}
          className="text-xl md:text-2xl text-stone-200 max-w-2xl font-medium drop-shadow-xl mb-12"
        >
          Experience the satisfying crunch of imported pearl sugar, smothered in rich, dark chocolate.
        </motion.p>

        {/* Floating Glassmorphism Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.a 
            href="#menu"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="inline-block bg-white/10 backdrop-blur-xl border border-white/20 text-amber-50 px-10 py-5 rounded-full font-bold text-xl shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:bg-amber-500 hover:text-stone-900 hover:scale-105 transition-all duration-300"
          >
            Order Now
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
