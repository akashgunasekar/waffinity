"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadedBowlMenu {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  flavors: string[];
}

const newArrivalMenus: LoadedBowlMenu[] = [
  {
    id: 201,
    title: "Salankatia",
    price: 300,
    description: "Indulge in our premium cocoa-hazelnut and cookie butter combinations.",
    image: "/image/menu/combo_salankatia.png",
    flavors: ["Nutella", "Pistachio Lotus", "Nutella Lotus"],
  },
  {
    id: 202,
    title: "Pistachio & Lotus",
    price: 300,
    description: "Premium dessert bowls covered with pistachio cream and authentic Biscoff cookie spread.",
    image: "/image/menu/combo_pistachiolotus.png",
    flavors: ["Nutella Pistachio", "Pistachio", "Lotus"],
  },
  {
    id: 203,
    title: "Koushiri",
    price: 300,
    description: "A rich chocolatey and nutty fusion of hazelnuts, cookie butter, and pistachios.",
    image: "/image/menu/combo_koushiri.png",
    flavors: ["Lotus", "Nutella hazelnut", "Pistachio"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } as any,
  },
};

export default function NewArrivals() {
  const [selectedFlavors, setSelectedFlavors] = useState<Record<number, string>>({});
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const handleAddClick = (menu: LoadedBowlMenu) => {
    const selectedFlavor = selectedFlavors[menu.id];
    if (!selectedFlavor) {
      const errorMsg = `Please select a flavor for ${menu.title}!`;
      setActiveToast(errorMsg);
      setTimeout(() => {
        setActiveToast((current) => (current === errorMsg ? null : current));
      }, 2500);
      return;
    }

    const cartPayload = {
      id: menu.id,
      title: `${menu.title} Loaded Bowl`,
      price: `₹${menu.price}`,
      image: menu.image,
      flavor: selectedFlavor,
      option: "New Arrival",
    };

    window.dispatchEvent(new CustomEvent("addToCart", { detail: cartPayload }));

    const toastMsg = `Added "${menu.title} (${selectedFlavor})" to order!`;
    setActiveToast(toastMsg);

    setTimeout(() => {
      setActiveToast((current) => (current === toastMsg ? null : current));
    }, 2500);
  };

  return (
    <section className="py-28 bg-[#fffbe6] relative overflow-hidden">
      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[80px] fill-[#1a110a]">
          <path d="M0,0 L0,60 C300,120 900,0 1200,60 L1200,0 Z"></path>
        </svg>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#2d1a12_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />

      <div className="container mx-auto px-6 relative z-10 my-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-black text-amber-600 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 select-none">
            Fresh Arrivals
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-[#2d1a12] mt-4 mb-4 tracking-tight uppercase">
            NEW ARRIVAL <span className="font-serif italic font-normal text-amber-600 lowercase">menus</span>
          </h2>
          <p className="text-stone-600 text-lg max-w-xl mx-auto font-sans">
            Choose your preferred flavor and order our new premium loaded bowl arrivals.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {newArrivalMenus.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="bg-[#fcf8f2] rounded-3xl p-6 shadow-xl border border-amber-900/5 hover:shadow-2xl hover:shadow-amber-900/10 hover:border-amber-500/30 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full text-center"
            >
              {/* Product Image */}
              <div className="relative w-48 h-48 mx-auto mb-6 bg-[#1a110a]/5 rounded-full overflow-hidden border-4 border-[#2d1a12]/5 flex items-center justify-center shadow-inner">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover scale-110"
                />
              </div>

              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-[#2d1a12] mb-1">
                    {item.title}
                  </h3>
                  <span className="font-black text-xl text-amber-600 block mb-3">
                    ₹{item.price}
                  </span>
                  <p className="text-stone-600 leading-relaxed text-sm mb-6 font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="mt-auto space-y-4">
                  {/* Select Flavor Dropdown */}
                  <div className="text-left">
                    <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                      Select Flavor
                    </label>
                    <select
                      value={selectedFlavors[item.id] || ""}
                      onChange={(e) =>
                        setSelectedFlavors((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }))
                      }
                      className="w-full bg-white border border-[#2d1a12]/10 text-[#2d1a12] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="" className="text-stone-400">
                        Select Flavor
                      </option>
                      {item.flavors.map((flv) => (
                        <option key={flv} value={flv} className="text-[#2d1a12]">
                          {flv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Add to Order Button */}
                  <button
                    onClick={() => handleAddClick(item)}
                    className="w-full bg-[#2d1a12] hover:bg-amber-500 hover:text-[#2d1a12] text-amber-50 font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[80px] fill-[#1a110a]">
          <path d="M0,120 L0,60 C300,0 900,120 1200,60 L1200,120 Z"></path>
        </svg>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 bg-[#1a110a] border border-amber-500/30 text-amber-50 px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-3 backdrop-blur-xl bg-opacity-95 max-w-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-sm font-semibold">{activeToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
