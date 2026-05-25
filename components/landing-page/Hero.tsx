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
  const [userId, setUserId] = useState(""); // State menangkap input User ID / Nomor tujuan
  const [currentPrice, setCurrentPrice] = useState("Rp 0");

  // Cari key asli di productsData yang cocok tanpa sensitif huruf besar/kecil
  const matchedKey = Object.keys(productsData).find(
    (k) => k.toLowerCase() === activeTab.toLowerCase() || activeTab.toLowerCase().includes(k.toLowerCase())
  ) || "Game";

  const currentConfig = productsData[matchedKey as keyof typeof productsData];

  // =========================================================================
  // 🔥 EFEK MENANGKAP KLIK DARI NAVBAR (SINKRONISASI NAVIGATION LINK)
  // =========================================================================
  useEffect(() => {
    const handleNavbarTabChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const targetTabName = customEvent.detail;

      if (!targetTabName) return;

      // Sinkronisasikan tab aktif jika kategorinya ada di dalam data produk
      const foundKey = Object.keys(productsData).find(
        (k) => k.toLowerCase() === targetTabName.toLowerCase() || targetTabName.toLowerCase().includes(k.toLowerCase())
      );

      if (foundKey) {
        setActiveTab(foundKey);

        // Menggulirkan layar otomatis menuju area form pengisian demi user experience
        const formElement = document.getElementById("transaction-form");
        if (formElement) {
          formElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    };

    window.addEventListener("changeTabFromNavbar", handleNavbarTabChange);
    return () => {
      window.removeEventListener("changeTabFromNavbar", handleNavbarTabChange);
    };
  }, []);

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
            (p) => p.toLowerCase() === clickedProductTitle.toLowerCase()
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

  // 🔥 SINKRONISASI & RESET SAAT TAB KATEGORI BERGANTI
  useEffect(() => {
    // 1. Kosongkan kembali input User ID / Nomor setiap kali pindah tab kategori
    setUserId("");

    // 2. Jika produk yang dipilih tidak ada di dalam tab saat ini, baru kita set ke indeks pertama [0]
    if (currentConfig?.products && !currentConfig.products.includes(selectedProduct)) {
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

    const availableItems = (currentConfig?.items as any)?.[selectedProduct] || [];
    if (Array.isArray(availableItems)) {
      const matched = availableItems.find((i: any) => i.label === itemName);
      if (matched) {
        setCurrentPrice(matched.price);
      }
    }
  };

  // Fungsi Generator Link Pemesanan Otomatis langsung mengarah ke WhatsApp
  const handleOrderWhatsApp = () => {
    if (!userId.trim()) {
      alert(`Silakan isi ${getDynamicPlaceholder()} Anda terlebih dahulu!`);
      return;
    }

    const nomorWA = "6281931194133"; 
    
    const pesanTeks = 
      `Halo MinEls, saya mau order top up:\n\n` +
      `• *Kategori* : ${activeTab}\n` +
      `• *Pilihan Produk* : ${selectedProduct}\n` +
      `• *Nominal Paket* : ${selectedItem}\n` +
      `• *User ID / No* : ${userId}\n` +
      `• *Total Harga* : ${currentPrice}\n\n` +
      `Mohon dibantu instruksi pembayarannya ya!`;

    const linkWhatsApp = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanTeks)}`;
    window.open(linkWhatsApp, "_blank", "noopener,noreferrer");
  };

  const currentItems = (currentConfig?.items as any)?.[selectedProduct] || [];

  // LOGIKA DINAMIS UNTUK TEXT INPUT ID & PLACEHOLDER
  const getDynamicPlaceholder = () => {
    const config = currentConfig as any;
    const tab = activeTab.toLowerCase();

    if (tab.includes("game")) {
      if (config?.placeholders) {
        return config.placeholders[selectedProduct] || "Masukkan ID Game";
      }
      return config?.inputPlaceholder || "Masukkan ID Game";
    }
    if (tab.includes("pulsa") || tab.includes("data") || tab.includes("internet")) {
      return "Masukkan No HP";
    }
    if (tab.includes("wallet") || tab.includes("dompet")) {
      return "Masukkan No Akun / HP";
    }
    if (tab.includes("premium")) {
      return "Masukkan Email Akun";
    }
    return config?.inputPlaceholder || "Masukkan ID";
  };

  return (
    <>
      {/* SECTION CONTAINER Utuh - Padding disesuaikan untuk Mobile & Desktop */}
      <section className="relative px-4 sm:px-6 xl:px-10 pt-6 sm:pt-10 pb-10 sm:pb-12 overflow-hidden text-white bg-[#050B18]">
        {/* 🦅 MASKOT ELANG RAKSASA - Disembunyikan di HP (hidden sm:block) agar layout form ringan & tidak tergeser */}
        <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none mix-blend-screen opacity-90 hidden sm:block">
          <img
            src="/hero-banner.png"
            alt="Elang Megah"
            className="w-[500px] md:w-[600px] lg:w-[650px] xl:w-[500px] h-auto object-contain max-w-none"
          />
        </div>

        {/* UTILITY LAYOUT GRID */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-7 pr-0 sm:pr-4 text-center lg:text-left">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <Zap size={12} className="text-blue-400 fill-blue-400/20 sm:w-[14px] sm:h-[14px]" />
              <span className="text-[10px] sm:text-[11px] font-bold text-blue-400 tracking-wider">
                TOP UP CEPAT & AMAN
              </span>
            </div>

            {/* TEXT MAIN */}
            <h1 className="text-[28px] sm:text-[43px] xl:text-[40px] leading-[1.1] sm:leading-[1.00] font-black tracking-tight drop-shadow-md">
              Top Up Cepat,
              <br />
              <span className="text-[#FACC15]">Harga Hemat,</span>
              <br />
              <span className="text-white">Transaksi Anti Ribet!</span>
            </h1>

            <p className="text-gray-400 text-[13px] sm:text-[15px] xl:text-[14px] leading-relaxed max-w-[480px] mx-auto lg:mx-0">
              Game, pulsa, e-wallet, dan aplikasi premium dengan pembayaran QRIS & proses instan.
            </p>

            {/* INFO BANNER HORIZONTAL - Layout flex wrap rapi di mobile */}
            <div className="pt-2 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-x-6 sm:gap-x-8 gap-y-3 text-white">
              {[
                { title: "Proses Instan", desc: "Dalam hitungan detik", icon: Zap },
                { title: "Harga Terbaik", desc: "Lebih hemat setiap saat", icon: Wallet },
                { title: "Aman & Terpercaya", desc: "100% transaksi aman", icon: ShieldCheck },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 text-left">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1A2438]/60 border border-white/5 flex items-center justify-center shrink-0">
                    <item.icon size={14} className="text-blue-400 sm:w-[16px] sm:h-[16px]" />
                  </div>
                  <div className="whitespace-nowrap">
                    <h3 className="font-bold text-[12px] sm:text-[13px] xl:text-[14px]">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: TRANSACTION FORM - Dioptimalkan untuk Mobile */}
          <div id="transaction-form" className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[540px] bg-[#0E1628]/85 border border-white/10 rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
              
              {/* TAB SELECTION - Ditambahkan flex-nowrap & overflow-x-auto agar di HP bisa di-swipe horizontal tanpa berantakan */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2 sm:pb-3 mb-4 sm:mb-6 gap-4 overflow-x-auto scrollbar-none flex-nowrap">
                {[
                  "Game",
                  "Pulsa",
                  "Paket Data",
                  "E-Wallet",
                  "Premium",
                ].map((item) => {
                  const isActive = activeTab.toLowerCase() === item.toLowerCase() || item.toLowerCase().includes(activeTab.toLowerCase());
                  return (
                    <button
                      key={item}
                      onClick={() => setActiveTab(item)}
                      className="relative pb-2 shrink-0"
                    >
                      <span
                        className={`text-[12px] sm:text-[11px] font-bold tracking-wide transition-colors whitespace-nowrap ${
                          isActive ? "text-[#FACC15]" : "text-gray-500 hover:text-gray-400"
                        }`}
                      >
                        {item}
                      </span>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FACC15] rounded-full shadow-[0_0_8px_#FACC15]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* INPUT FIELDS - Tinggi input diturunkan ke h-[46px] di mobile agar tidak memakan tempat */}
              <div className="space-y-3.5 sm:space-y-5">
                {/* BARIS 1: DROPDOWN NAMA PRODUK & NOMINAL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Dropdown 1: Nama Produk Utama */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[11px] sm:text-[12px] font-bold text-gray-400 tracking-wide block">
                      {(() => {
                        const tab = activeTab.toLowerCase();
                        if (tab.includes("premium")) return "Pilih Aplikasi";
                        if (tab.includes("pulsa") || tab.includes("data") || tab.includes("internet"))
                          return "Pilih Operator";
                        if (tab.includes("wallet") || tab.includes("dompet"))
                          return "Pilih E-Wallet";
                        return "Pilih Game";
                      })()}
                    </label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full h-[46px] sm:h-[52px] bg-[#111C33] border border-white/5 rounded-xl sm:rounded-2xl px-3 sm:px-4 text-[13px] font-semibold outline-none text-white focus:border-[#FACC15]/30 cursor-pointer"
                    >
                      {currentConfig?.products?.map((prod) => (
                        <option key={prod} value={prod} className="bg-[#0E1628]">
                          {prod}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown 2: Pilihan Nominal */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[11px] sm:text-[12px] font-bold text-gray-400 tracking-wide block">
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
                      className="w-full h-[46px] sm:h-[52px] bg-[#111C33] border border-white/5 rounded-xl sm:rounded-2xl px-3 sm:px-4 text-[13px] font-semibold outline-none text-white focus:border-[#FACC15]/30 cursor-pointer"
                    >
                      {Array.isArray(currentItems) &&
                        currentItems.map((item: any) => (
                          <option key={item.label} value={item.label} className="bg-[#0E1628]">
                            {item.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* BARIS 2: USER ID & HARGA HASIL SINKRONISASI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Input Text Field */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[11px] sm:text-[12px] font-bold text-gray-400 tracking-wide block">
                      {getDynamicPlaceholder()}
                    </label>
                    <input
                      type={currentConfig?.inputType || "text"}
                      placeholder={getDynamicPlaceholder()}
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)} 
                      className="w-full h-[46px] sm:h-[52px] bg-[#111C33] border border-white/5 rounded-xl sm:rounded-2xl px-3 sm:px-4 text-[13px] outline-none placeholder:text-gray-500 text-white focus:border-[#FACC15]/30"
                    />
                  </div>

                  {/* Harga Hasil Sinkronisasi */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[11px] sm:text-[12px] font-bold text-gray-400 tracking-wide block">
                      Harga
                    </label>
                    <div className="w-full h-[46px] sm:h-[52px] bg-[#111C33] border border-white/5 rounded-xl sm:rounded-2xl px-3 sm:px-4 flex items-center justify-end text-[13px]">
                      <span className="font-black text-base text-[#FACC15] tracking-wide">
                        {currentPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons Action - Presisi di HP tanpa terpotong screen */}
                <div className="flex gap-3 pt-1">
                  <button 
                    onClick={handleOrderWhatsApp} 
                    className="flex-1 h-[46px] sm:h-[52px] rounded-xl sm:rounded-2xl bg-[#FACC15] text-black font-black text-[13px] hover:bg-[#EAB308] transition shadow-lg shadow-[#FACC15]/10 active:scale-[0.99]"
                  >
                    Beli Sekarang
                  </button>
                  <button className="w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] rounded-xl sm:rounded-2xl bg-[#111C33] border border-white/5 flex items-center justify-center hover:border-[#FACC15]/20 transition group shrink-0">
                    <Zap
                      className="text-[#FACC15] group-hover:scale-110 transition"
                      size={15}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOWER SECTION: CATEGORY BOTTOM LIST - Full responsive grid untuk HP (2 kolom) */}
      <section className="px-4 sm:px-6 xl:px-16 pb-16 text-white bg-[#050B18]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
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
              className="bg-[#0E1628] border border-white/5 rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 hover:border-[#FACC15]/40 transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition">
                  <item.icon className="text-blue-400" size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-[13px] sm:text-[15px] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-gray-500 mt-1 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JANGKAR TARGET SCROLL PROMO */}
      <div id="promo-section" className="scroll-mt-28" />
    </>
  );
}