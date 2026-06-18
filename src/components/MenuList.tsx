"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";

export interface FlavorOption {
  name: string;
  price?: number;
}

export interface MenuItem {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice?: number;
  flavors: FlavorOption[];
  hasOptions?: boolean;
  options?: { name: string; price: number }[];
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Classic Waffle",
    description: "Our timeless golden Belgian waffle baked to crispy perfection with your choice of sweet flavors.",
    image: "/image/menu/menu_classic_waffle.png",
    basePrice: 100,
    flavors: [
      { name: "Dark chocolate" },
      { name: "Belgium chocolate" },
      { name: "White chocolate" },
      { name: "Honey" }
    ]
  },
  {
    id: 2,
    title: "Signature Waffle",
    description: "Decadent and loaded waffles featuring premium chocolate sauces, biscuits, and confectionery.",
    image: "/image/menu/menu_signature_waffle.png",
    basePrice: 150,
    flavors: [
      { name: "Triple chocolate overload" },
      { name: "Naked Nutella" },
      { name: "Oreo heaven" },
      { name: "kitkat heaven" },
      { name: "Perk punch" },
      { name: "Belgium chocolate" },
      { name: "Dark chocolate" },
      { name: "White chocolate" },
      { name: "Strawberry waffle" },
      { name: "Blueberry waffle" },
      { name: "Butterscotch balls" },
      { name: "Lotus biscoff" },
      { name: "Double chocolate" },
      { name: "Cookies & cream" },
      { name: "Dark night fantasy" },
      { name: "Cadbury chocolate" },
      { name: "Delight chocolate" },
      { name: "White & black fantasy" }
    ]
  },
  {
    id: 3,
    title: "Red Velvet Waffle",
    description: "Vibrant crimson waffles topped with rich, velvet flavors, custom made in stick or round shapes.",
    image: "/image/menu/menu_red_velvet.png",
    hasOptions: true,
    options: [
      { name: "Stick", price: 80 },
      { name: "Round", price: 140 }
    ],
    flavors: [
      { name: "Red velvet overload" },
      { name: "Red velvet Nutella" }
    ]
  },
  {
    id: 4,
    title: "Mini Pancakes",
    description: "A platter of fluffy, bite-sized mini pancakes smothered in delicious toppings of your choice.",
    image: "/image/menu/menu_mini_pancake.png",
    basePrice: 100,
    flavors: [
      { name: "Triple chocolate overload" },
      { name: "Red velvet overload" },
      { name: "Naked Nutella" },
      { name: "Oreo heaven" },
      { name: "kitkat heaven" },
      { name: "Perk punch" },
      { name: "Belgium chocolate" },
      { name: "Dark chocolate" },
      { name: "White chocolate" },
      { name: "Strawberry waffle" },
      { name: "Blueberry waffle" },
      { name: "Butterscotch balls" },
      { name: "Lotus biscoff" },
      { name: "Double chocolate" },
      { name: "Cookies & cream" },
      { name: "Dark night fantasy" },
      { name: "Cadbury chocolate" },
      { name: "Delight chocolate" },
      { name: "Red velvet Nutella" },
      { name: "White & black fantasy" }
    ]
  },
  {
    id: 5,
    title: "Stick Waffle",
    description: "Fun and delicious fresh waffle on a stick, half-dipped in melted premium chocolates.",
    image: "/image/menu/menu_stick_waffle.png",
    basePrice: 100,
    flavors: [
      { name: "Triple chocolate overload" },
      { name: "Naked Nutella" },
      { name: "Oreo heaven" },
      { name: "kitkat heaven" },
      { name: "Perk punch" },
      { name: "Belgium chocolate" },
      { name: "Dark chocolate" },
      { name: "White chocolate" },
      { name: "Strawberry waffle" },
      { name: "Blueberry waffle" },
      { name: "Butterscotch balls" },
      { name: "Lotus biscoff" },
      { name: "Double chocolate" },
      { name: "Cookies & cream" },
      { name: "Dark night fantasy" },
      { name: "Cadbury chocolate" },
      { name: "Delight chocolate" },
      { name: "White & black fantasy" }
    ]
  },
  {
    id: 6,
    title: "Cake Waffles",
    description: "Specially prepared waffle cakes for extreme chocolate and indulgence lovers.",
    image: "/image/menu/menu_cake_brownie.png",
    basePrice: 350,
    flavors: [
      { name: "Tripy Triple chocolate" },
      { name: "Kitkat cake" },
      { name: "Oreo heaven" },
      { name: "Kinder Joy cake" },
      { name: "Nutella cake" },
      { name: "Red velvet cake" },
      { name: "Ferrero rocher cake" }
    ]
  },
  {
    id: 7,
    title: "Brownies",
    description: "Fudgy, dense chocolate brownie slices baked to perfection with gourmet topping sauces.",
    image: "/image/menu/menu_brownie.png",
    flavors: [
      { name: "Triple chocolate", price: 140 },
      { name: "Biscoff brownie", price: 140 },
      { name: "Nutella brownie", price: 140 },
      { name: "White chocolate", price: 100 },
      { name: "Milk chocolate", price: 100 },
      { name: "Dark chocolate", price: 100 }
    ]
  },
  {
    id: 8,
    title: "Chocolate Strawberry",
    description: "Fresh, juicy strawberries drenched in warm, melted premium chocolate sauces.",
    image: "/image/menu/menu_chocolate_strawberry.png",
    flavors: [
      { name: "Triple chocolate", price: 150 },
      { name: "Nutella", price: 150 },
      { name: "Milk chocolate", price: 120 },
      { name: "White chocolate", price: 120 },
      { name: "Dark chocolate", price: 120 }
    ]
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

function MenuCard({ 
  item, 
  addedItemIds, 
  setAddedItemIds, 
  setActiveToast 
}: { 
  item: MenuItem;
  addedItemIds: Record<number, boolean>;
  setAddedItemIds: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  setActiveToast: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    const handleAddedToCart = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      // If this specific card's item was added, reset its dropdowns to the placeholder
      if (detail.id === item.id) {
        setSelectedFlavor("");
        setSelectedOption("");
      }
    };
    window.addEventListener("addToCart", handleAddedToCart);
    return () => {
      window.removeEventListener("addToCart", handleAddedToCart);
    };
  }, [item.id]);

  const getItemPrice = () => {
    if (item.basePrice !== undefined) {
      return item.basePrice;
    }
    if (item.hasOptions && item.options) {
      const opt = item.options.find(o => o.name === selectedOption);
      return opt ? opt.price : item.options[0].price;
    }
    const flavor = item.flavors.find(f => f.name === selectedFlavor);
    return flavor?.price !== undefined ? flavor.price : item.flavors[0].price || 0;
  };

  const getPriceDisplay = () => {
    if (item.basePrice !== undefined) {
      return `₹${item.basePrice}`;
    }
    if (item.hasOptions && item.options) {
      if (!selectedOption) {
        const prices = item.options.map(o => o.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        return min === max ? `₹${min}` : `₹${min} - ₹${max}`;
      }
      const opt = item.options.find(o => o.name === selectedOption);
      return opt ? `₹${opt.price}` : `₹${item.options[0].price}`;
    }
    // Flavors have individual prices (like Brownies / Chocolate Strawberry)
    if (!selectedFlavor) {
      const prices = item.flavors.map(f => f.price || 0);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? `₹${min}` : `₹${min} - ₹${max}`;
    }
    const flavor = item.flavors.find(f => f.name === selectedFlavor);
    return flavor?.price !== undefined ? `₹${flavor.price}` : `₹${item.flavors[0].price || 0}`;
  };

  const handleAdd = () => {
    if (!selectedFlavor) {
      setActiveToast(`Please select a flavor for ${item.title}!`);
      setTimeout(() => {
        setActiveToast((current) => 
          current?.includes("Please select a flavor") ? null : current
        );
      }, 2500);
      return;
    }
    if (item.hasOptions && item.options && !selectedOption) {
      setActiveToast(`Please select a type (Stick or Round) for ${item.title}!`);
      setTimeout(() => {
        setActiveToast((current) => 
          current?.includes("Please select a type") ? null : current
        );
      }, 2500);
      return;
    }

    const finalPrice = getItemPrice();

    const cartPayload = {
      id: item.id,
      title: item.title,
      price: `₹${finalPrice}`,
      image: item.image,
      flavor: selectedFlavor,
      option: item.hasOptions ? selectedOption : undefined,
    };

    window.dispatchEvent(new CustomEvent("addToCart", { detail: cartPayload }));

    const toastMsg = item.hasOptions 
      ? `Added "${item.title} (${selectedFlavor} - ${selectedOption})" to order!`
      : `Added "${item.title} (${selectedFlavor})" to order!`;

    setActiveToast(toastMsg);
    
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
    
    setTimeout(() => {
      setActiveToast((current) => 
        current === toastMsg ? null : current
      );
    }, 2500);
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10 hover:shadow-amber-900/20 hover:border-amber-500/30 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative w-48 h-48 mx-auto mb-6 bg-black/20 rounded-full overflow-hidden border-4 border-white/10 flex items-center justify-center shadow-inner">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover scale-110"
        />
      </div>
      
      <div className="flex-grow text-center flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center justify-center mb-3">
            <h3 className="font-heading text-2xl font-bold text-amber-50 mb-2">
              {item.title}
            </h3>
            <span className="font-black text-xl text-amber-500">
              {getPriceDisplay()}
            </span>
          </div>
          <p className="text-stone-300 leading-relaxed text-sm mb-6">
            {item.description}
          </p>
        </div>

        {/* Dropdowns */}
        <div className="space-y-3.5 mb-2 mt-auto">
          <div>
            <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1 text-left">
              Select Flavor
            </label>
            <select
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              className="w-full bg-[#2a1b10] border border-white/10 text-amber-50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="" className="bg-[#1a110a] text-stone-400">Select Flavor</option>
              {item.flavors.map((flv) => (
                <option key={flv.name} value={flv.name} className="bg-[#1a110a] text-stone-200">
                  {flv.name} {flv.price !== undefined ? `(₹${flv.price})` : ""}
                </option>
              ))}
            </select>
          </div>

          {item.hasOptions && item.options && (
            <div>
              <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1 text-left">
                Select Type
              </label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full bg-[#2a1b10] border border-white/10 text-amber-50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="" className="bg-[#1a110a] text-stone-400">Select Type</option>
                {item.options.map((opt) => (
                  <option key={opt.name} value={opt.name} className="bg-[#1a110a] text-stone-200">
                    {opt.name} (₹{opt.price})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <button 
          onClick={handleAdd}
          className={`w-full py-3 rounded-xl font-bold transition-all duration-300 shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
            addedItemIds[item.id]
              ? "bg-emerald-500 text-stone-900 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              : "bg-amber-500 hover:bg-amber-400 text-stone-900"
          }`}
        >
          {addedItemIds[item.id] ? (
            <span>✓ Added!</span>
          ) : (
            <span>+ Add to Order</span>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default function MenuList() {
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<number, boolean>>({});

  return (
    <section id="menu" className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-amber-50 mb-4">
            Our Menu
          </h2>
          <p className="text-stone-400 text-lg max-w-xl mx-auto">
            Choose your favorites, select your flavor, and customize your orders today.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {menuItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              addedItemIds={addedItemIds}
              setAddedItemIds={setAddedItemIds}
              setActiveToast={setActiveToast}
            />
          ))}
        </motion.div>
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
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span className="font-semibold text-xs leading-normal">{activeToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

