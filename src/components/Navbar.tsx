"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X as XIcon, ShoppingCart, Plus, Minus, Trash2, Banknote, QrCode } from "lucide-react";
import { menuItems, MenuItem } from "@/components/MenuList";

interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
  flavor: string;
  option?: string;
  addIceCream?: boolean;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("");
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [appliedPromoName, setAppliedPromoName] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [selectedFlavorsForGroup, setSelectedFlavorsForGroup] = useState<Record<string, string>>({});
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "details">("cart");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "QR">("COD");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    const handleAddToCart = (e: Event) => {
      const item = (e as CustomEvent).detail;
      setCartItems((prev) => {
        const existingIndex = prev.findIndex(
          (i) => i.id === item.id && i.flavor === item.flavor && i.option === item.option && !i.addIceCream
        );
        if (existingIndex > -1) {
          return prev.map((i, idx) =>
            idx === existingIndex ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { ...item, quantity: 1, addIceCream: false }];
      });
    };
    window.addEventListener("addToCart", handleAddToCart);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("addToCart", handleAddToCart);
    };
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const getNumericPrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, "")) || 0;
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (getNumericPrice(item.price) + (item.addIceCream ? 40 : 0)) * item.quantity,
    0
  );

  const deliveryCharge = cartItems.length > 0 ? 50 : 0;
  const discountAmount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = subtotal - discountAmount + deliveryCharge;

  const updateQuantity = (id: number, flavor: string, option: string | undefined, addIceCream: boolean | undefined, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.flavor === flavor && item.option === option && !!item.addIceCream === !!addIceCream) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: number, flavor: string, option: string | undefined, addIceCream: boolean | undefined) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.flavor === flavor && item.option === option && !!item.addIceCream === !!addIceCream)));
  };

  const toggleIceCream = (id: number, flavor: string, option: string | undefined, currentAddIceCream: boolean | undefined) => {
    setCartItems((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id && item.flavor === flavor && item.option === option && !!item.addIceCream === !!currentAddIceCream) {
          return { ...item, addIceCream: !currentAddIceCream };
        }
        return item;
      });

      // Consolidate duplicates if they have the same config
      const consolidated: CartItem[] = [];
      updated.forEach((item) => {
        const existing = consolidated.find(
          (c) => c.id === item.id && c.flavor === item.flavor && c.option === item.option && !!c.addIceCream === !!item.addIceCream
        );
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          consolidated.push({ ...item });
        }
      });
      return consolidated;
    });
  };

  const handleApplyPromo = (e: React.MouseEvent) => {
    e.preventDefault();
    if (promoCodeInput.trim().toUpperCase() === "WAFFY10") {
      setPromoApplied(true);
      setAppliedPromoName("WAFFY10");
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'WAFFY10'");
      setPromoApplied(false);
      setAppliedPromoName("");
    }
  };

  const handleRemovePromo = () => {
    setPromoApplied(false);
    setAppliedPromoName("");
    setPromoCodeInput("");
    setPromoError("");
  };

  const getFlavorPrice = (menuItem: MenuItem, flavorName: string, optionName?: string) => {
    if (menuItem.basePrice !== undefined) {
      return `₹${menuItem.basePrice}`;
    }
    if (menuItem.hasOptions && menuItem.options && optionName) {
      const opt = menuItem.options.find((o) => o.name === optionName);
      return `₹${opt ? opt.price : menuItem.options[0].price}`;
    }
    const flavor = menuItem.flavors.find((f) => f.name === flavorName);
    return `₹${flavor?.price !== undefined ? flavor.price : (menuItem.flavors[0].price || 0)}`;
  };

  const addFlavorToGroup = (itemId: number, optionName?: string) => {
    const groupKey = `${itemId}-${optionName || ""}`;
    const flavorToAdd = selectedFlavorsForGroup[groupKey];
    if (!flavorToAdd) return;

    const menuItem = menuItems.find((m) => m.id === itemId);
    if (!menuItem) return;

    const price = getFlavorPrice(menuItem, flavorToAdd, optionName);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === itemId && i.flavor === flavorToAdd && i.option === optionName && !i.addIceCream
      );
      if (existingIndex > -1) {
        return prev.map((i, idx) =>
          idx === existingIndex ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          title: menuItem.title,
          price,
          image: menuItem.image,
          quantity: 1,
          flavor: flavorToAdd,
          option: optionName,
          addIceCream: false,
        },
      ];
    });

    setSelectedFlavorsForGroup((prev) => ({
      ...prev,
      [groupKey]: "",
    }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^A-Za-z\s]/g, "");
    setName(filteredValue);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(filteredValue);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !deliverySlot) return;

    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Build WhatsApp order details message
    let message = `*New Order from Waffinity!* 🧇\n\n`;
    message += `*Customer Details:*\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `📍 *Address:* ${address}\n`;
    message += `⏰ *Delivery Slot:* ${deliverySlot}\n`;
    message += `💳 *Payment Method:* ${paymentMethod === "COD" ? "Cash on Delivery (COD)" : "UPI QR Code (Paid)"}\n\n`;

    message += `*Items Ordered:*\n`;
    
    // Group cart items for cleaner display
    const groupedForMsg: Record<string, {
      title: string;
      option?: string;
      flavors: { flavor: string; quantity: number; price: number }[];
    }> = {};

    cartItems.forEach((item) => {
      const key = `${item.id}-${item.option || ""}`;
      if (!groupedForMsg[key]) {
        groupedForMsg[key] = {
          title: item.title,
          option: item.option,
          flavors: [],
        };
      }
      groupedForMsg[key].flavors.push({
        flavor: item.flavor + (item.addIceCream ? " (+ Ice Cream)" : ""),
        quantity: item.quantity,
        price: (getNumericPrice(item.price) + (item.addIceCream ? 40 : 0)) * item.quantity,
      });
    });

    Object.values(groupedForMsg).forEach((item) => {
      const optionDetails = item.option ? ` [${item.option}]` : "";
      message += `• *${item.title}${optionDetails}*\n`;
      item.flavors.forEach((flv) => {
        message += `  - ${flv.flavor} x${flv.quantity} (₹${flv.price})\n`;
      });
    });

    message += `\n-------------------------\n`;
    message += `💵 *Subtotal:* ₹${subtotal}\n`;
    if (promoApplied) {
      message += `✨ *Discount (10% OFF):* -₹${discountAmount} (${appliedPromoName})\n`;
    }
    message += `🛵 *Delivery Charges:* ₹50\n`;
    message += `💰 *Total Amount (${paymentMethod === "COD" ? "COD" : "UPI QR"}):* ₹${finalTotal}\n\n`;
    message += `Thank you for ordering! Please prepare our order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919087798796&text=${encodedMessage}`;

    setOrderPlaced(true);
    window.location.href = whatsappUrl;
  };

  const handleCloseAndReset = () => {
    setCartItems([]);
    setOrderPlaced(false);
    setIsCartOpen(false);
    setName("");
    setPhone("");
    setAddress("");
    setDeliverySlot("");
    setPromoCodeInput("");
    setPromoApplied(false);
    setPromoError("");
    setAppliedPromoName("");
    setSelectedFlavorsForGroup({});
    setCheckoutStep("cart");
    setPaymentMethod("COD");
  };

  const handleOrderNowClick = () => {
    if (cartCount > 0) {
      setIsCartOpen(true);
    } else {
      const element = document.getElementById("menu");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Group cart items by id and option
  const groupedCartItems: {
    key: string;
    id: number;
    title: string;
    image: string;
    option?: string;
    slots: {
      flavor: string;
      quantity: number;
      price: string;
      addIceCream?: boolean;
    }[];
  }[] = [];

  cartItems.forEach((item) => {
    const key = `${item.id}-${item.option || ""}`;
    let group = groupedCartItems.find((g) => g.key === key);
    if (!group) {
      group = {
        key,
        id: item.id,
        title: item.title,
        image: item.image,
        option: item.option,
        slots: [],
      };
      groupedCartItems.push(group);
    }
    group.slots.push({
      flavor: item.flavor,
      quantity: item.quantity,
      price: item.price,
      addIceCream: item.addIceCream,
    });
  });

  const leftLinks = ["About", "Menu", "Reviews"];
  const rightLinks = ["Locations", "Contact"];
  const navLinks = [...leftLinks, ...rightLinks];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-[#1a110a]/90 border-b border-white/10 shadow-md py-3 md:py-4 backdrop-blur-md md:bg-transparent md:border-b-0 md:shadow-none md:backdrop-blur-none"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Mobile Layout Container */}
          <div className="flex md:hidden items-center justify-between">
            <Link href="/" className="flex items-center z-50">
              <Image 
                src="/waffinity-logo.png" 
                alt="Waffinity Logo" 
                width={50} 
                height={50} 
                className="object-contain"
              />
            </Link>

            <div className="flex items-center gap-2">
              {/* Cart Icon Toggle */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-stone-300 hover:text-amber-500 transition-colors cursor-pointer"
                aria-label="Open Cart"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-900 text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Hamburger Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-stone-300 hover:text-amber-500 transition-colors p-2 z-50 cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </div>

          {/* Desktop Layout Container (Pill-shaped Bar) */}
          <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center bg-[#22160d]/90 backdrop-blur-md border border-amber-500/20 rounded-full px-6 py-2.5 shadow-2xl max-w-5xl mx-auto">
            {/* Left Side Links */}
            <div className="flex items-center justify-end gap-6 lg:gap-8 font-medium">
              {leftLinks.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-stone-300 hover:text-amber-500 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Center Logo */}
            <div className="flex items-center justify-center px-6 lg:px-8 z-50 relative">
              <Link href="/" className="relative transition-transform hover:scale-105 duration-300 block">
                <div className="absolute inset-0 bg-amber-500/15 blur-xl rounded-full pointer-events-none"></div>
                <Image 
                  src="/waffinity-logo.png" 
                  alt="Waffinity Logo" 
                  width={65} 
                  height={65} 
                  className="object-contain relative z-10 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                />
              </Link>
            </div>

            {/* Right Side Links & Actions */}
            <div className="flex items-center justify-between w-full font-medium pl-2">
              <div className="flex items-center gap-6 lg:gap-8">
                {rightLinks.map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-stone-300 hover:text-amber-500 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {/* Divider */}
                <div className="h-6 w-px bg-white/10 hidden lg:block"></div>

                {/* Cart Icon Toggle */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-stone-300 hover:text-amber-500 transition-colors cursor-pointer"
                  aria-label="Open Cart"
                >
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-900 text-[9px] font-black rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-md animate-bounce">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Desktop CTA */}
                <motion.button
                  onClick={handleOrderNowClick}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-500 text-stone-900 px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Order Now</span>
                  {cartCount > 0 && (
                    <span className="bg-stone-900 text-amber-500 rounded-full px-1.5 py-0.5 text-[10px] font-black min-w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-[#1a110a] border-b border-white/10 md:hidden overflow-hidden shadow-2xl z-30"
            >
              <div className="flex flex-col px-6 py-8 gap-6 bg-[#1a110a]/95 backdrop-blur-xl">
                {navLinks.map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-stone-200 hover:text-amber-500 text-xl font-medium py-2 border-b border-white/5 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
                <div className="pt-4">
                  <button 
                    onClick={handleOrderNowClick}
                    className="w-full bg-amber-500 text-stone-900 py-3.5 rounded-full font-bold shadow-md hover:bg-amber-400 transition-colors text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Order Now</span>
                    {cartCount > 0 && (
                      <span className="bg-stone-900 text-amber-500 rounded-full px-2.5 py-0.5 text-xs font-black min-w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Cart Slider Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-full max-w-md bg-[#1a110a] border-l border-white/10 h-full flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cart Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="text-amber-500" size={24} />
                  <h2 className="font-heading text-2xl font-bold text-amber-50">
                    {orderPlaced ? "Order Confirmed" : checkoutStep === "details" ? "Delivery Details" : "Your Order"}
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-stone-400 hover:text-amber-500 transition-colors p-2"
                  aria-label="Close Cart"
                >
                  <XIcon size={24} />
                </button>
              </div>

              {/* Cart Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {orderPlaced ? (
                  <div className="h-full flex flex-col justify-between py-4 space-y-6">
                    <div className="space-y-6">
                      <div className="flex flex-col items-center justify-center text-center space-y-2 mt-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ duration: 0.6 }}
                          className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-500"
                        >
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                        <h3 className="font-heading text-2xl font-bold text-amber-50">Order Confirmed!</h3>
                        <p className="text-stone-400 text-sm max-w-xs">
                          Your waffles are being freshly prepared in our irons.
                        </p>
                      </div>

                      {/* Receipt Summary */}
                      <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4 shadow-inner text-sm">
                        <h4 className="font-heading font-bold text-amber-500 uppercase tracking-wider text-xs border-b border-white/10 pb-2">
                          Order Details
                        </h4>
                        <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
                          {cartItems.map((item) => (
                            <div key={`${item.id}-${item.flavor}-${item.option || ""}-${item.addIceCream ? "ice" : "no"}`} className="text-stone-300 border-b border-white/5 pb-2 last:border-b-0">
                              <div className="flex justify-between">
                                <span className="font-medium">
                                  {item.title} <span className="text-stone-500">x{item.quantity}</span>
                                </span>
                                <span className="font-semibold">₹{(getNumericPrice(item.price) + (item.addIceCream ? 40 : 0)) * item.quantity}</span>
                              </div>
                              <div className="text-[10px] text-stone-400 mt-0.5">
                                {item.flavor}{item.addIceCream ? " (+ Ice Cream)" : ""}{item.option ? ` | ${item.option}` : ""}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-white/10 pt-3 space-y-1.5">
                          <div className="flex justify-between text-stone-400">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                          </div>
                          {promoApplied && (
                            <div className="flex justify-between text-emerald-500">
                              <span>Discount (10% OFF - {appliedPromoName})</span>
                              <span>-₹{discountAmount}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-stone-400">
                            <span>Delivery Charges</span>
                            <span>₹50</span>
                          </div>
                          <div className="flex justify-between text-base font-black text-amber-500 pt-1.5 border-t border-white/5">
                            <span>Total ({paymentMethod === "COD" ? "COD" : "UPI"})</span>
                            <span>₹{finalTotal}</span>
                          </div>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-2.5 text-xs text-stone-400">
                        <h4 className="font-heading font-bold text-amber-500 uppercase tracking-wider border-b border-white/10 pb-2 mb-1">
                          Delivery Information
                        </h4>
                        <div>
                          <span className="text-stone-500">Customer Name:</span>{" "}
                          <span className="text-stone-200 font-medium">{name}</span>
                        </div>
                        <div>
                          <span className="text-stone-500">Phone Number:</span>{" "}
                          <span className="text-stone-200 font-medium">{phone}</span>
                        </div>
                        <div>
                          <span className="text-stone-500">Delivery Slot:</span>{" "}
                          <span className="text-stone-200 font-medium">{deliverySlot}</span>
                        </div>
                        <div>
                          <span className="text-stone-500">Payment Option:</span>{" "}
                          <span className="text-stone-200 font-medium">
                            {paymentMethod === "COD" ? "Cash on Delivery (COD)" : "Scan & Pay (UPI QR Code)"}
                          </span>
                        </div>
                        <div className="leading-relaxed font-sans">
                          <span className="text-stone-500">Delivery Address:</span>{" "}
                          <span className="text-stone-200 font-medium block mt-0.5">{address}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCloseAndReset}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold py-3.5 rounded-xl transition-colors cursor-pointer text-center shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>Got it, Close</span>
                    </button>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                    <span className="text-6xl">🧇</span>
                    <h3 className="font-heading text-xl font-bold text-amber-50">Your Cart is Empty</h3>
                    <p className="text-stone-400 max-w-xs text-sm">
                      Add some warm, crispy Belgian waffles or mini pancakes to get started!
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        const element = document.getElementById("menu");
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-amber-500 text-stone-900 font-bold px-6 py-2.5 rounded-full hover:bg-amber-400 transition-colors cursor-pointer text-sm shadow-md"
                    >
                      Browse Waffles
                    </button>
                  </div>
                ) : checkoutStep === "details" ? (
                  <div className="space-y-6">
                    <button
                      onClick={() => setCheckoutStep("cart")}
                      className="text-amber-500 hover:text-amber-400 font-bold text-sm flex items-center gap-2 mb-2 cursor-pointer bg-transparent border-none outline-none font-sans"
                    >
                      <span>← Back to Cart</span>
                    </button>
                    <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={handleNameChange}
                          placeholder="John Doe"
                          pattern="[A-Za-z\s]+"
                          title="Please enter only alphabets (letters and spaces)"
                          className="w-full bg-stone-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors text-amber-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder="9876543210"
                          maxLength={10}
                          minLength={10}
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit mobile number"
                          className="w-full bg-stone-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors text-amber-50"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider">
                            Delivery Address
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              if (!navigator.geolocation) {
                                alert("Geolocation is not supported by your browser");
                                return;
                              }
                              setIsLocating(true);
                              try {
                                navigator.geolocation.getCurrentPosition(
                                  (position) => {
                                    const { latitude, longitude } = position.coords;
                                    setAddress(`GPS Location: https://www.google.com/maps?q=${latitude},${longitude}`);
                                    setIsLocating(false);
                                  },
                                  (error) => {
                                    console.error(error ? (error.message || String(error)) : "Geolocation error");
                                    alert("Could not get location. Please allow location permissions or type address manually.");
                                    setIsLocating(false);
                                  }
                                );
                              } catch (err) {
                                console.error("Geolocation call failed:", err);
                                alert("Could not retrieve location. Please type your address manually.");
                                setIsLocating(false);
                              }
                            }}
                            className="text-xs text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none font-bold"
                            disabled={isLocating}
                          >
                            <span>📍 {isLocating ? "Locating..." : "Use Current Location"}</span>
                          </button>
                        </div>
                        <textarea
                          required
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter your street address, apartment number, and landmark"
                          className="w-full bg-stone-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none text-amber-50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                          Preferred Delivery Slot
                        </label>
                        <select
                          required
                          value={deliverySlot}
                          onChange={(e) => setDeliverySlot(e.target.value)}
                          className="w-full bg-stone-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors text-stone-200 font-sans"
                        >
                          <option value="" className="text-stone-400">Select delivery slot</option>
                          <option value="Immediate (30-45 mins)">Immediate (30-45 mins)</option>
                          <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                          <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                          <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                          <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                          <option value="08:00 PM - 10:00 PM">08:00 PM - 10:00 PM</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                          Payment Method
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("COD")}
                            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                              paymentMethod === "COD"
                                ? "bg-amber-500/10 border-amber-500 text-amber-400 font-bold"
                                : "bg-stone-900 border-white/10 text-stone-400 hover:text-stone-200"
                            }`}
                          >
                            <Banknote size={16} />
                            <span>Cash on Delivery</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("QR")}
                            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                              paymentMethod === "QR"
                                ? "bg-amber-500/10 border-amber-500 text-amber-400 font-bold"
                                : "bg-stone-900 border-white/10 text-stone-400 hover:text-stone-200"
                            }`}
                          >
                            <QrCode size={16} />
                            <span>QR Code</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {groupedCartItems.map((group) => {
                      const menuItem = menuItems.find((m) => m.id === group.id);
                      // Find flavors that are not yet added as slots in this group
                      const existingFlavors = group.slots.map((s) => s.flavor);
                      const availableFlavors = menuItem
                        ? menuItem.flavors.filter((f) => !existingFlavors.includes(f.name))
                        : [];
                      
                      const selectedFlavor = selectedFlavorsForGroup[group.key] || "";

                      return (
                        <div
                          key={group.key}
                          className="bg-white/5 border border-white/5 rounded-3xl p-5 space-y-4 shadow-inner"
                        >
                          {/* Item Header */}
                          <div className="flex gap-4 items-center">
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-black/20 shrink-0 border border-white/10">
                              <Image src={group.image} alt={group.title} fill className="object-cover" />
                            </div>
                            <div className="flex-grow min-w-0">
                              <h4 className="font-heading font-bold text-base text-amber-50 truncate">
                                {group.title}
                              </h4>
                              {group.option && (
                                <span className="inline-block bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/20 mt-1">
                                  Type: {group.option}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Flavor Slots */}
                          <div className="space-y-3 pl-2 border-l-2 border-amber-500/20">
                            {group.slots.map((slot) => (
                              <div
                                key={`${group.key}-${slot.flavor}-${slot.addIceCream ? "ice" : "no"}`}
                                className="border-b border-white/5 last:border-b-0 pb-3 last:pb-0"
                              >
                                <div className="flex items-center justify-between gap-4 py-1.5">
                                  <div className="flex-grow min-w-0">
                                    <span className="text-xs font-semibold text-stone-200 block truncate">
                                      {slot.flavor} {slot.addIceCream && <span className="text-amber-400 font-bold text-[10px] ml-1">(+ Ice Cream)</span>}
                                    </span>
                                    <span className="text-[11px] text-amber-500 font-bold">
                                      ₹{getNumericPrice(slot.price) + (slot.addIceCream ? 40 : 0)} each
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2.5 bg-stone-900 border border-white/10 rounded-full px-2 py-0.5 shrink-0">
                                    <button
                                      onClick={() => updateQuantity(group.id, slot.flavor, group.option, slot.addIceCream, -1)}
                                      className="p-1 hover:text-amber-500 transition-colors text-stone-400 cursor-pointer"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus size={12} />
                                    </button>
                                    <span className="text-xs font-bold text-amber-50 w-3 text-center">
                                      {slot.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(group.id, slot.flavor, group.option, slot.addIceCream, 1)}
                                      className="p-1 hover:text-amber-500 transition-colors text-stone-400 cursor-pointer"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus size={12} />
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => removeItem(group.id, slot.flavor, group.option, slot.addIceCream)}
                                    className="text-stone-500 hover:text-red-400 p-1.5 transition-colors shrink-0 cursor-pointer"
                                    aria-label="Remove flavor"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>

                                {group.option === "New Arrival" && (
                                  <div className="mt-1 flex items-center gap-2 pl-1 select-none">
                                    <input
                                      type="checkbox"
                                      id={`ice-cream-${group.key}-${slot.flavor}-${slot.addIceCream ? "ice" : "no"}`}
                                      checked={!!slot.addIceCream}
                                      onChange={() => toggleIceCream(group.id, slot.flavor, group.option, slot.addIceCream)}
                                      className="accent-amber-500 rounded border-white/10 bg-stone-900 cursor-pointer"
                                    />
                                    <label
                                      htmlFor={`ice-cream-${group.key}-${slot.flavor}-${slot.addIceCream ? "ice" : "no"}`}
                                      className="text-[10px] text-stone-400 cursor-pointer hover:text-stone-200"
                                    >
                                      Add Scoop of Ice Cream (+₹40)
                                    </label>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Add Flavor Row */}
                          {availableFlavors.length > 0 && (
                            <div className="pt-2 border-t border-white/5 flex gap-2 items-center">
                              <select
                                value={selectedFlavor}
                                onChange={(e) =>
                                  setSelectedFlavorsForGroup((prev) => ({
                                    ...prev,
                                    [group.key]: e.target.value,
                                  }))
                                }
                                className="flex-grow bg-stone-900 border border-white/10 text-amber-50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                              >
                                <option value="" className="bg-[#1a110a] text-stone-400">
                                  + Add another flavor
                                </option>
                                {availableFlavors.map((flv) => (
                                  <option
                                    key={flv.name}
                                    value={flv.name}
                                    className="bg-[#1a110a] text-stone-200"
                                  >
                                    {flv.name} {flv.price !== undefined ? `(₹${flv.price})` : ""}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => addFlavorToGroup(group.id, group.option)}
                                disabled={!selectedFlavor}
                                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                  selectedFlavor
                                    ? "bg-amber-500 hover:bg-amber-400 border-amber-500/20 text-stone-900"
                                    : "bg-stone-800 border-white/5 text-stone-500 cursor-not-allowed"
                                }`}
                              >
                                Add
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Cart Footer / Checkout Form */}
              {!orderPlaced && cartItems.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/20 space-y-6">
                  {/* Totals & Promo Code */}
                  <div className="space-y-3 border-b border-white/10 pb-4">
                    <div className="flex justify-between items-center text-sm text-stone-400">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>

                    {promoApplied ? (
                      <div className="flex justify-between items-center text-sm text-emerald-500">
                        <div className="flex items-center gap-1.5">
                          <span className="bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-500/20">
                            {appliedPromoName}
                          </span>
                          <span>10% Discount Applied</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemovePromo}
                          className="text-stone-500 hover:text-red-400 text-xs transition-colors underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Promo Code (e.g. WAFFY10)"
                            value={promoCodeInput}
                            onChange={(e) => {
                              setPromoCodeInput(e.target.value);
                              if (promoError) setPromoError("");
                            }}
                            className="flex-1 bg-stone-900 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 transition-colors uppercase text-amber-50"
                          />
                          <button
                            type="button"
                            onClick={handleApplyPromo}
                            className="bg-stone-800 hover:bg-stone-700 text-amber-500 hover:text-amber-400 text-xs font-bold px-4 py-2 rounded-xl border border-white/5 transition-colors cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                        {promoError && (
                          <p className="text-red-400 text-[11px] font-medium pl-1">
                            {promoError}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm text-stone-400">
                      <span>Delivery Charges</span>
                      <span>₹50</span>
                    </div>

                    <div className="flex justify-between items-center text-lg pt-2 border-t border-white/5">
                      <span className="text-stone-300 font-semibold">Total</span>
                      <span className="font-black text-amber-500 text-2xl">
                        ₹{finalTotal}
                      </span>
                    </div>
                  </div>

                  {checkoutStep === "cart" ? (
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("details")}
                      className="w-full bg-amber-500 text-stone-900 font-bold py-3.5 rounded-xl hover:bg-amber-400 transition-colors cursor-pointer text-center shadow-lg mt-2 flex items-center justify-center gap-2"
                    >
                      <span>Book Order</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      form="checkout-form"
                      className="w-full bg-amber-500 text-stone-900 font-bold py-3.5 rounded-xl hover:bg-amber-400 transition-colors cursor-pointer text-center shadow-lg mt-2 flex items-center justify-center gap-2"
                    >
                      <span>
                        {paymentMethod === "COD"
                          ? "Place Order (Cash on Delivery)"
                          : "Place Order (QR Code)"}
                      </span>
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
