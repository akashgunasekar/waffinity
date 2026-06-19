"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Suray Cj",
      role: "Local Guide",
      comment: "Such a great waffle spot! The waffles were cooked perfectly—crispy on the outside and fluffy inside. Toppings were generous and delicious, and the staff was really friendly. Highly recommend if you’re craving something sweet.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Venkatesh",
      role: "Local Guide",
      comment: "Such a amazing taste of waffle in affordable price and they have lot of verities in waffles/brownies/milk shakes/ice creams etc....❤️🍻",
      rating: 5,
      avatar: "VE"
    },
    {
      name: "Swathy Gopi",
      role: "Local Guide",
      comment: "Good and delicious taste.. Very clean and good ambience..",
      rating: 5,
      avatar: "SG"
    },
    {
      name: "Abdul Basith",
      role: "Regular Customer",
      comment: "Waffles quality super and kindly staffs, Im Regular customer in waffinity",
      rating: 5,
      avatar: "AB"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="relative bg-[#22160d] py-32 overflow-hidden">
      {/* Premium Top Border and Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[600px] h-[120px] bg-amber-500/5 blur-[80px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10 mt-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-amber-50 mb-4 tracking-tight uppercase">
            WHAT OUR <span className="font-serif italic font-normal text-amber-500 lowercase">waffinityfans say</span>
          </h2>
          <p className="text-stone-400 text-lg max-w-xl mx-auto">
            Don't take our word for it here is what our sweet toothed community has to say about their Waffinity favorites.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-3xl mx-auto flex items-center justify-between">
          
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 md:-left-16 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 text-stone-300 hover:text-amber-500 flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-sm"
            aria-label="Previous Review"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Review Card Slider Viewport */}
          <div className="w-full overflow-hidden px-2 py-4 min-h-[300px] flex items-center justify-center relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col justify-between hover:border-amber-500/30 transition-colors duration-500 group relative overflow-hidden"
              >
                {/* Decorative Quote Mark */}
                <span className="absolute right-8 top-6 text-9xl font-serif text-white/5 select-none pointer-events-none">
                  “
                </span>

                <div className="relative z-10">
                  <div className="flex gap-1.5 mb-6 text-amber-500 text-xl">
                    {Array.from({ length: reviews[currentIndex].rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-stone-200 leading-relaxed text-base md:text-lg italic font-sans mb-8">
                    "{reviews[currentIndex].comment}"
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-white/10 pt-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-500 text-base group-hover:bg-amber-500 group-hover:text-stone-900 transition-colors duration-300">
                    {reviews[currentIndex].avatar}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-amber-50 text-base">{reviews[currentIndex].name}</h4>
                    <span className="text-stone-500 text-xs font-semibold">{reviews[currentIndex].role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute -right-4 md:-right-16 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 text-stone-300 hover:text-amber-500 flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-sm"
            aria-label="Next Review"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2.5 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "bg-amber-500 scale-125"
                  : "bg-white/10 hover:bg-white/30"
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
