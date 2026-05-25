"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState("Beranda");

  const menuList = [
    "Beranda",
    "Top Up Game",
    "Pulsa & Data",
    "E-Wallet",
    "Aplikasi Premium",
    "Promo",
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050B18]/95 backdrop-blur-xl h-[78px] w-full">
      {/* Menggunakan max-w-7xl (1280px) agar muat di semua resolusi layar laptop */}
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-2">
        {/* LOGO */}
        <div className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="logo" className="w-8" />
          <h1 className="text-[18px] font-black leading-none whitespace-nowrap">
            <span className="text-white">ELANG</span>
            <span className="text-yellow-400">SHOP</span>
          </h1>
        </div>

        {/* BARISAN MENU (Jarak antar menu dikecilkan dari gap-6 jadi gap-4, font diturunkan ke 13px) */}
        <div className="hidden xl:flex items-center gap-4 text-[13px] font-semibold whitespace-nowrap h-full pt-1">
          {menuList.map((menu) => {
            const isActive = activeMenu === menu;
            return (
              <button
                key={menu}
                onClick={() => setActiveMenu(menu)}
                className={`relative h-full flex items-center justify-center transition-colors pb-1 ${
                  isActive
                    ? "text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                <span>{menu}</span>
                {/* Garis Kuning Figma Style */}
                {isActive && (
                  <span className="absolute bottom-[18px] left-1/2 -translate-x-1/2 w-6 h-[3px] bg-yellow-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* SEARCH BAR (Lebar dikecilkan dari 200px menjadi 160px biar hemat space) */}
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

        {/* TOMBOL AKSI (Padding px dikecilkan biar ramping dan muat semua) */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="hidden xl:flex h-[40px] px-3 items-center justify-center rounded-xl border border-white/10 hover:border-yellow-400 transition text-xs font-semibold text-white whitespace-nowrap">
            Cek Transaksi
          </button>
          <button className="h-[40px] px-4 rounded-xl border border-white/10 hover:border-yellow-400 transition text-xs font-semibold text-white whitespace-nowrap">
            Login
          </button>
          <button className="h-[40px] px-4 rounded-xl bg-yellow-400 text-black font-black hover:opacity-90 transition text-xs whitespace-nowrap">
            Daftar
          </button>
        </div>
      </div>
    </nav>
  );
}
