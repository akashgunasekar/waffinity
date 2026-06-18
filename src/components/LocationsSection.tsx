"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

export default function LocationsSection() {
  const branches = [
    {
      name: "Ayanavaram Branch",
      address: "New No. 231, Konnur High Rd, Ayanavaram, Chennai, Tamil Nadu 600023",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=231+Konnur+High+Rd+Ayanavaram+Chennai+600023",
      phone: "+91 90877 98796"
    },
    {
      name: "Perambur Branch",
      address: "No. 45, Madhavaram High Rd, Perambur, Chennai, Tamil Nadu 600011",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=45+Madhavaram+High+Rd+Perambur+Chennai+600011",
      phone: "+91 90877 98796"
    }
  ];

  return (
    <section id="locations" className="relative bg-[#fffdf0] py-24 md:py-32 overflow-hidden scroll-mt-16">
      {/* Curved top edge decoration (subtle transition from review section) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] fill-[#22160d]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-20 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Title & Branch Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-[#2d1a12] mb-6 leading-none tracking-tight">
                AROUND <span className="text-amber-500 italic font-serif font-normal lowercase block sm:inline">the corner</span>
              </h2>
              <p className="text-[#3e2b20]/80 text-lg md:text-xl mb-12 max-w-xl leading-relaxed">
                Thinking about waffles? Or maybe a sundae... or a shake? Good news—there's a Waffinity store nearby with options.
              </p>
            </motion.div>

            {/* Branch Cards */}
            <div className="flex flex-col gap-6 max-w-xl">
              {branches.map((branch, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="bg-[#2d1a12]/5 border border-[#2d1a12]/10 rounded-2xl p-6 md:p-8 hover:bg-[#2d1a12]/10 transition-colors duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group"
                >
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-[#2d1a12] mb-2 flex items-center gap-2">
                      <MapPin size={20} className="text-amber-500 shrink-0" />
                      {branch.name}
                    </h3>
                    <p className="text-[#3e2b20]/80 text-sm leading-relaxed mb-1">
                      {branch.address}
                    </p>
                    <span className="text-[#3e2b20]/60 text-xs font-medium">
                      Call: {branch.phone}
                    </span>
                  </div>

                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 text-stone-900 px-5 py-3 rounded-full font-bold text-sm shadow-md hover:bg-amber-400 hover:shadow-lg transition-all flex items-center gap-2 shrink-0 group-hover:scale-105 cursor-pointer"
                  >
                    <span>Get Directions</span>
                    <ArrowRight size={16} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Stylized 3D Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[350px] sm:h-[450px] lg:h-[500px] w-full">
            {/* Background Glow */}
            <div className="absolute w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Floating Image Wrapper */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] rounded-3xl overflow-hidden filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)]"
            >
              <Image
                src="/image/waffle_location_pin.png"
                alt="Waffle Location 3D Pin"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
