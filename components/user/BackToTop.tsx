"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Muncul setelah scroll sejauh 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Tambahkan event listener saat scroll
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    // Bersihkan listener saat komponen di-unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-[70] md:bottom-8 md:right-8"
        >
          <button
            onClick={scrollToTop}
            aria-label="Kembali ke Atas"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B132B] text-white shadow-xl shadow-slate-400/30 outline-none transition-all duration-300 hover:-translate-y-1 hover:bg-brand-base hover:shadow-2xl active:scale-90 active:bg-brand-base md:h-14 md:w-14"
          >
            <ArrowUp className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
