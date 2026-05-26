"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuList = [
    "Beranda",
    "Game",
    "Pulsa & Data",
    "E-Wallet",
    "Aplikasi Premium",
    "Promo",
  ];

  useEffect(() => {
    const handleGlobalTabSync = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const currentHeroTab = customEvent.detail;

      if (currentHeroTab === "Game") setActiveMenu("Game");
      else if (currentHeroTab === "Pulsa") setActiveMenu("Pulsa & Data");
      else if (currentHeroTab === "E-Wallet") setActiveMenu("E-Wallet");
      else if (currentHeroTab === "Premium") setActiveMenu("Aplikasi Premium");
    };

    window.addEventListener("changeTabFromNavbar", handleGlobalTabSync);
    window.addEventListener("selectProduct", () => setActiveMenu("Game"));
    return () => {
      window.removeEventListener("changeTabFromNavbar", handleGlobalTabSync);
    };
  }, []);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    setIsMobileMenuOpen(false);

    if (menu === "Beranda") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (menu === "Promo") {
      const promoElement = document.getElementById("promo-section");
      if (promoElement) {
        promoElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    let targetTab = menu;
    if (menu === "Pulsa & Data") {
      targetTab = "Pulsa";
    } else if (menu === "Aplikasi Premium") {
      targetTab = "Premium";
    }

    const event = new CustomEvent("changeTabFromNavbar", { detail: targetTab });
    window.dispatchEvent(event);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050B18]/95 backdrop-blur-xl w-full">
      {/* Container Utama - Menyesuaikan tinggi sedikit di HP agar proporsional */}
      <div className="max-w-7xl mx-auto px-4 h-[70px] xl:h-[78px] flex items-center justify-between gap-3">
        {/* ========================== LOGO (BISA DIKLIK BALIK BERANDA) ========================== */}
        <button
          onClick={() => handleMenuClick("Beranda")}
          className="flex items-center gap-1.5 sm:gap-2 shrink-0 group outline-none text-left active:scale-95 transition-transform"
        >
          {/* Di HP ukuran logo disesuaikan jadi w-7 h-7, dan diberi shrink-0 agar tidak gepeng/hilang */}
          <img
            src="/logo.png"
            alt="ELANGSHOP Logo"
            className="w-7 h-7 xl:w-8 xl:h-8 object-contain shrink-0 group-hover:brightness-110 transition-all"
          />
          {/* Ukuran teks diturunkan sedikit di HP agar muat berdampingan dengan tombol login/daftar */}
          <h1 className="text-[15px] sm:text-[16px] xl:text-[18px] font-black leading-none whitespace-nowrap tracking-wide select-none">
            <span className="text-white group-hover:text-gray-200 transition-colors">
              ELANG
            </span>
            <span className="text-yellow-400 group-hover:text-yellow-300 transition-colors">
              SHOP
            </span>
          </h1>
        </button>

        {/* BARISAN MENU (Hanya muncul di Desktop / xl) */}
        <div className="hidden xl:flex items-center gap-4 text-[13px] font-semibold whitespace-nowrap h-full pt-1">
          {menuList.map((menu) => {
            const isActive = activeMenu === menu;
            return (
              <button
                key={menu}
                onClick={() => handleMenuClick(menu)}
                className={`relative h-full flex items-center justify-center transition-colors pb-1 ${
                  isActive
                    ? "text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                <span>{menu}</span>
                {isActive && (
                  <span className="absolute bottom-[0px] left-1/2 -translate-x-1/2 w-6 h-[3px] bg-yellow-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* SEARCH BAR (Hanya muncul di Desktop / xl) */}
        <div className="hidden xl:flex items-center justify-between w-[160px] h-[40px] bg-[#0E1628] border border-white/10 rounded-xl px-3 group focus-within:border-yellow-400/50 transition-all shrink-0">
          <input
            type="text"
            placeholder="Cari produk..."
            className="bg-transparent outline-none text-xs w-full placeholder:text-gray-500 text-white pr-1"
          />
          <Search
            size={14}
            className="text-gray-500 group-focus-within:text-yellow-400 transition-colors shrink-0"
          />
        </div>

        {/* TOMBOL AKSI */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button className="hidden xl:flex h-[40px] px-3 items-center justify-center rounded-xl border border-white/10 hover:border-yellow-400 transition text-xs font-semibold text-white whitespace-nowrap">
            Cek Transaksi
          </button>
          {/* Ukuran padding tombol login & daftar disesuaikan di layar super kecil (HP jadul) */}
          <button className="h-[36px] xl:h-[40px] px-3 sm:px-4 rounded-xl border border-white/10 hover:border-yellow-400 transition text-xs font-semibold text-white whitespace-nowrap">
            Login
          </button>
          <button className="h-[36px] xl:h-[40px] px-3 sm:px-4 rounded-xl bg-yellow-400 text-black font-black hover:opacity-90 transition text-xs whitespace-nowrap">
            Daftar
          </button>

          {/* TOGGLE BUTTON FOR MOBILE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden flex h-[36px] w-[36px] sm:h-[40px] sm:w-[40px] items-center justify-center rounded-xl border border-white/10 text-white hover:border-yellow-400 transition"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* TAMPILAN MENU MOBILE DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#050B18] border-b border-white/10 px-4 py-4 space-y-3 animate-fade-in">
          {/* Search Bar Mobile */}
          <div className="flex items-center justify-between w-full h-[40px] bg-[#0E1628] border border-white/10 rounded-xl px-3">
            <input
              type="text"
              placeholder="Cari produk..."
              className="bg-transparent outline-none text-xs w-full placeholder:text-gray-500 text-white pr-1"
            />
            <Search size={14} className="text-gray-500" />
          </div>

          <hr className="border-white/5" />

          {/* List Menu Mobile */}
          <div className="flex flex-col gap-1">
            {menuList.map((menu) => {
              const isActive = activeMenu === menu;
              return (
                <button
                  key={menu}
                  onClick={() => handleMenuClick(menu)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-yellow-400/10 text-yellow-400"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  {menu}
                </button>
              );
            })}
          </div>

          <hr className="border-white/5" />

          {/* Tombol Cek Transaksi Mobile */}
          <button className="w-full h-[40px] flex items-center justify-center rounded-xl border border-white/10 text-xs font-semibold text-white">
            Cek Transaksi
          </button>
        </div>
      )}
    </nav>
  );
}
