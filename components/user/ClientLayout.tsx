"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import TopBar from "@/components/user/TopBar";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
// 1. Tambahkan import LanguageProvider di sini
import { LanguageProvider } from "@/context/LanguageContext";
import BackToTop from "@/components/user/BackToTop";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // Matikan fitur browser mengingat posisi scroll terakhir (scrollRestoration) saat halaman direfresh/reload
    if (typeof window !== "undefined") {
      if ("history" in window && "scrollRestoration" in window) {
        window.history.scrollRestoration = "manual";
      }
      
      // Paksa scroll ke paling atas (0,0) saat pertama kali masuk atau refresh
      window.scrollTo({ top: 0 });

      // Backup scroll-to-top setelah delay sangat singkat untuk memastikan layout ter-render
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  if (isAdmin) return <>{children}</>;

  return (
    // 2. Bungkus seluruh konten dengan LanguageProvider agar useLanguage() bisa diakses
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        {/* HEADER WRAPPER (FIXED) */}
        <header className="fixed top-0 right-0 left-0 z-50 flex w-full flex-col">
          {/* BAGIAN 1: TopBar */}
          <div className="relative z-60">
            <TopBar />
          </div>

          {/* BAGIAN 2: Navbar */}
          <div className="relative z-50 w-full">
            <Navbar />
          </div>
        </header>

        {/* KONTEN UTAMA */}
        <main className="grow">{children}</main>

        <Footer />
        <BackToTop />
      </div>
    </LanguageProvider>
  );
}
