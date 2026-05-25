"use client";

import { useState, useEffect } from "react";
import {
  Zap,
  Wallet,
  ShieldCheck,
  Smartphone,
  Wifi,
  Crown,
  Gamepad2,
  Bolt,
} from "lucide-react";
// Import data dari file sebelah
import { productsData } from "./productsData";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("Game");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [currentPrice, setCurrentPrice] = useState("Rp 0");

  // Cari key asli di productsData yang cocok tanpa sensitif huruf besar/kecil
  const matchedKey =
    Object.keys(productsData).find(
      (k) => k.toLowerCase() === activeTab.toLowerCase(),
    ) || "Game";

  const currentConfig = productsData[matchedKey as keyof typeof productsData];

  // =========================================================================
  // 🔥 EFEK MENANGKAP KLIK PRODUK POPULER (CUSTOM EVENT GLOBAL)
  // =========================================================================
  useEffect(() => {
    const handleSelectProductGlobal = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const clickedProductTitle = customEvent.detail;

      if (!clickedProductTitle) return;

      // Cari produk ini ada di bawah kategori tab mana di productsData
      let foundTab = "";
      let foundProduct = "";

      for (const tabKey in productsData) {
        const config = productsData[tabKey as keyof typeof productsData];
        if (config && Array.isArray(config.products)) {
          const matched = config.products.find(
            (p) => p.toLowerCase() === clickedProductTitle.toLowerCase(),
          );
          if (matched) {
            foundTab = tabKey;
            foundProduct = matched;
            break;
          }
        }
      }

      // Jika kecocokan data ditemukan, langsung set semua state form
      if (foundTab && foundProduct) {
        setActiveTab(foundTab);
        setSelectedProduct(foundProduct);
      }
    };

    window.addEventListener("selectProduct", handleSelectProductGlobal);
    return () => {
      window.removeEventListener("selectProduct", handleSelectProductGlobal);
    };
  }, []);
  // =========================================================================

  // Reset otomatis pilihan produk saat Tab Kategori berganti
  useEffect(() => {
    if (
      currentConfig?.products &&
      !currentConfig.products.includes(selectedProduct)
    ) {
      if (currentConfig.products.length > 0) {
        setSelectedProduct(currentConfig.products[0]);
      }
    } else if (!currentConfig?.products) {
      setSelectedProduct("");
    }
  }, [activeTab, currentConfig, selectedProduct]);

  // Sinkronisasi pilihan item nominal dan harga pas produk utama berganti
  useEffect(() => {
    if (currentConfig && selectedProduct) {
      const availableItems =
        (currentConfig.items as any)[selectedProduct] || [];
      if (Array.isArray(availableItems) && availableItems.length > 0) {
        setSelectedItem(availableItems[0].label);
        setCurrentPrice(availableItems[0].price);
      } else {
        setSelectedItem("");
        setCurrentPrice("Rp 0");
      }
    } else {
      setSelectedItem("");
      setCurrentPrice("Rp 0");
    }
  }, [selectedProduct, activeTab, currentConfig]);

  // Handler saat user mengubah pilihan nominal di dropdown kedua secara manual
  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const itemName = e.target.value;
    setSelectedItem(itemName);

    const availableItems =
      (currentConfig?.items as any)?.[selectedProduct] || [];
    if (Array.isArray(availableItems)) {
      const matched = availableItems.find((i: any) => i.label === itemName);
      if (matched) {
        setCurrentPrice(matched.price);
      }
    }
  };

  const currentItems = (currentConfig?.items as any)?.[selectedProduct] || [];

  // LOGIKA DINAMIS UNTUK TEMPAT TEXT INPUT ID (SINKRON DATA BARU & SEMUA TAB)
  const getDynamicPlaceholder = () => {
    const config = currentConfig as any;
    const tab = activeTab.toLowerCase();

    // 1. Kondisi khusus untuk Tab Game
    if (tab.includes("game")) {
      if (config?.placeholders) {
        return config.placeholders[selectedProduct] || "Masukkan ID";
      }
      return config?.inputPlaceholder || "Masukkan ID";
    }

    // 2. Kondisi otomatis untuk Tab Pulsa & Paket Data
    if (
      tab.includes("pulsa") ||
      tab.includes("data") ||
      tab.includes("internet")
    ) {
      return "Masukkan No HP";
    }

    // 3. Kondisi otomatis untuk Tab E-Wallet
    if (tab.includes("wallet") || tab.includes("dompet")) {
      return "Masukkan No Akun / HP";
    }

    // 4. Kondisi otomatis untuk Tab Premium
    if (tab.includes("premium")) {
      return "Masukkan Email Akun";
    }

    // Cadangan jika tidak ada yang cocok
    return config?.inputPlaceholder || "Masukkan ID";
  };

  return (
    <>
      {/* SECTION CONTAINER Utuh - Ditambahkan responsive padding untuk kenyamanan HP */}
      <section className="relative px-4 sm:px-6 xl:px-10 pt-24 pb-12 overflow-hidden text-white bg-[#050B18]">
        {/* 🦅 MASKOT ELANG RAKSASA (POSISI DIOPTIMALKAN AGAR TIDAK NABRAK TEKS) 🦅 */}
        <div className="absolute top-1/2 left-1/2 md:left-[55%] lg:left-[60%] xl:left-[55%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none mix-blend-screen opacity-30 lg:opacity-75 hidden sm:block">
          <img
            src="/hero-banner.png"
            alt="Elang Megah"
            className="w-[450px] md:w-[550px] lg:w-[650px] xl:w-[600px] h-auto object-contain max-w-none"
          />
        </div>

        {/* UTILITY LAYOUT GRID (Bungkus Konten Utama di Atas Elang) */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* LEFT CONTENT - Perubahan teks agar center saat di HP dan rata kiri saat desktop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
              <Zap size={14} className="text-blue-400 fill-blue-400/20" />
              <span className="text-[11px] font-bold text-blue-400 tracking-wider">
                TOP UP CEPAT & AMAN
              </span>
            </div>

            {/* TEXT MAIN */}
            <h1 className="text-[32px] sm:text-[40px] xl:text-[40px] leading-[1.1] lg:leading-[1.00] font-black tracking-tight drop-shadow-md">
              Top Up Cepat,
              <br />
              <span className="text-[#FACC15]">Harga Hemat,</span>
              <br />
              <span className="text-white">Transaksi Anti Ribet!</span>
            </h1>

            <p className="text-gray-400 text-[14px] leading-relaxed max-w-[480px] mx-auto lg:mx-0">
              Top up game, pulsa, e-wallet, dan aplikasi premium dengan
              pembayaran QRIS & proses instan.
            </p>

            {/* INFO BANNER HORIZONTAL */}
            <div className="pt-3 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4 text-white">
              {[
                {
                  title: "Proses Instan",
                  desc: "Dalam hitungan detik",
                  icon: Zap,
                },
                {
                  title: "Harga Terbaik",
                  desc: "Lebih hemat setiap saat",
                  icon: Wallet,
                },
                {
                  title: "Aman & Terpercaya",
                  desc: "100% transaksi aman",
                  icon: ShieldCheck,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-[#1A2438]/60 border border-white/5 flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-blue-400" />
                  </div>
                  <div className="whitespace-nowrap">
                    <h3 className="font-bold text-[13px]">{item.title}</h3>
                    <p className="text-[11px] text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: TRANSACTION FORM */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[540px] bg-[#0E1628]/90 border border-white/10 rounded-[28px] p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
              {/* TAB SELECTION */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-6 gap-2 overflow-x-auto scrollbar-none">
                {["Game", "Pulsa", "Paket Data", "E-Wallet", "Premium"].map(
                  (item) => {
                    const isActive =
                      activeTab.toLowerCase() === item.toLowerCase();
                    return (
                      <button
                        key={item}
                        onClick={() => setActiveTab(item)}
                        className="relative pb-2 shrink-0"
                      >
                        <span
                          className={`text-[11px] font-bold tracking-wide transition-colors ${
                            isActive
                              ? "text-[#FACC15]"
                              : "text-gray-500 hover:text-gray-400"
                          }`}
                        >
                          {item}
                        </span>
                        {isActive && (
                          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FACC15] rounded-full shadow-[0_0_8px_#FACC15]" />
                        )}
                      </button>
                    );
                  },
                )}
              </div>

              {/* INPUT FIELDS - DINAMIS */}
              <div className="space-y-5">
                {/* BARIS 1: DROPDOWN NAMA PRODUK & NOMINAL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Dropdown 1: Nama Produk Utama */}
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-400 tracking-wide block">
                      {(() => {
                        const tab = activeTab.toLowerCase();
                        if (tab.includes("premium")) return "Pilih Aplikasi";
                        if (
                          tab.includes("pulsa") ||
                          tab.includes("data") ||
                          tab.includes("internet")
                        )
                          return "Pilih Operator";
                        if (tab.includes("wallet") || tab.includes("dompet"))
                          return "Pilih E-Wallet";
                        return "Pilih Game";
                      })()}
                    </label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full h-[52px] bg-[#111C33] border border-white/5 rounded-2xl px-4 text-[13px] font-semibold outline-none text-white focus:border-[#FACC15]/30 cursor-pointer"
                    >
                      {currentConfig?.products?.map((prod) => (
                        <option
                          key={prod}
                          value={prod}
                          className="bg-[#0E1628]"
                        >
                          {prod}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown 2: Pilihan Nominal Dinamis */}
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-400 tracking-wide block">
                      {(() => {
                        const tab = activeTab.toLowerCase();
                        if (tab.includes("pulsa")) return "Pilih Pulsa";
                        if (tab.includes("data") || tab.includes("internet"))
                          return "Pilih Paket";
                        return "Pilih Nominal";
                      })()}
                    </label>
                    <select
                      value={selectedItem}
                      onChange={handleItemChange}
                      className="w-full h-[52px] bg-[#111C33] border border-white/5 rounded-2xl px-4 text-[13px] font-semibold outline-none text-white focus:border-[#FACC15]/30 cursor-pointer"
                    >
                      {Array.isArray(currentItems) &&
                        currentItems.map((item: any) => (
                          <option
                            key={item.label}
                            value={item.label}
                            className="bg-[#0E1628]"
                          >
                            {item.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* BARIS 2: USER ID / NO HP & HARGA HASIL SINKRONISASI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Input Text Field Dinamis */}
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-400 tracking-wide block">
                      {getDynamicPlaceholder()}
                    </label>
                    <input
                      type={currentConfig?.inputType || "text"}
                      placeholder={getDynamicPlaceholder()}
                      className="w-full h-[52px] bg-[#111C33] border border-white/5 rounded-2xl px-4 text-[13px] outline-none placeholder:text-gray-500 text-white focus:border-[#FACC15]/30"
                    />
                  </div>

                  {/* Harga Hasil Sinkronisasi */}
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-400 tracking-wide block">
                      Harga
                    </label>
                    <div className="w-full h-[52px] bg-[#111C33] border border-white/5 rounded-2xl px-4 flex items-center justify-end text-[13px]">
                      <span className="font-black text-base text-[#FACC15] tracking-wide">
                        {currentPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons Action */}
                <div className="flex gap-3 pt-1">
                  <button className="flex-1 h-[52px] rounded-2xl bg-[#FACC15] text-black font-black text-[13px] hover:bg-[#EAB308] transition shadow-lg shadow-[#FACC15]/10">
                    Beli Sekarang
                  </button>
                  <button className="w-[52px] h-[52px] rounded-2xl bg-[#111C33] border border-white/5 flex items-center justify-center hover:border-[#FACC15]/20 transition group">
                    <Zap
                      className="text-[#FACC15] group-hover:scale-110 transition"
                      size={16}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOWER SECTION: CATEGORY BOTTOM LIST */}
      <section className="px-6 xl:px-16 pb-16 text-white bg-[#050B18]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {[
            { icon: Smartphone, title: "Top Up Pulsa", desc: "Semua Operator" },
            { icon: Wifi, title: "Top Up Data", desc: "Paket Internet" },
            {
              icon: Wallet,
              title: "Top Up E-Wallet",
              desc: "Dana, OVO, GoPay, Shoppepay",
            },
            {
              icon: Crown,
              title: "Aplikasi Premium",
              desc: "Spotify, Netflix, YouTube, Video",
            },
            {
              icon: Gamepad2,
              title: "Top Up Game",
              desc: "MLBB, FF, PUBG, Valorant",
            },
            { icon: Bolt, title: "Listrik PLN", desc: "Token & Pascabayar" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#0E1628] border border-white/5 rounded-[22px] p-5 hover:border-[#FACC15]/40 transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition">
                  <item.icon className="text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-1 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
