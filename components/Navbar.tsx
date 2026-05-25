"use client";

import React from "react";
// Jika pakai Image dari Next.js, pastikan path gambarnya benar. 
// Folder public dibaca sebagai "/" jadi cukup tulis dari root.
import Image from "next/image"; 

export default function Navbar() {
  return (
    <nav className="w-full py-5 px-6 md:px-12 flex justify-between items-center relative z-50">
      <div className="flex items-center gap-2 cursor-pointer">
        {/* Contoh logo ElangShop */}
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-blue-500/30">
          E
        </div>
        <span className="text-xl font-black tracking-wider bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          ELANG<span className="text-white">SHOP</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
        <a href="#" className="hover:text-blue-400 transition-colors">Cek Transaksi</a>
        <a href="#" className="hover:text-blue-400 transition-colors">Hubungi Kami</a>
      </div>

      <button className="px-5 py-2 rounded-full bg-blue-600 text-sm font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
        Masuk
      </button>
    </nav>
  );
}