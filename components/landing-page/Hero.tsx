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
  Tv, // Cadangan Netflix / Video
  Music, // Cadangan Spotify
  Palette, // Cadangan Canva
  Film, // Cadangan Disney+
} from "lucide-react";

// Import data dari file sebelah
import { productsData } from "./productsData";

// =========================================================================
// ⚡ DATA HARDCODE KHUSUS PLN (Dipindah ke luar komponen agar referensi statis)
// =========================================================================
const plnConfig = {
  products: ["PLN Token", "PLN Pascabayar"],
  inputPlaceholder: "Masukkan No Meter / ID Pel",
  inputType: "text",
  items: {
    "PLN Token": [
      { label: "Token PLN Rp 20.000", price: "Rp 21.500" },
      { label: "Token PLN Rp 50.000", price: "Rp 51.500" },
      { label: "Token PLN Rp 100.000", price: "Rp 101.500" },
      { label: "Token PLN Rp 200.000", price: "Rp 201.500" },
    ],
    "PLN Pascabayar": [
      { label: "Cek & Bayar Tagihan", price: "Sesuai Tagihan" },
    ],
  },
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState("Game");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [userId, setUserId] = useState(""); // State menangkap input User ID / Nomor tujuan
  const [currentPrice, setCurrentPrice] = useState("Rp 0");
  const [showNotice, setShowNotice] = useState(false); // 🔥 STATE UNTUK MODAL NOTICE

  // Cek apakah tab yang aktif adalah kategori PLN
  const isPLN =
    activeTab.toLowerCase() === "pln" ||
    activeTab.toLowerCase().includes("listrik");

  // Cari key asli di productsData yang cocok tanpa sensitif huruf besar/kecil
  const matchedKey =
    Object.keys(productsData).find(
      (k) =>
        k.toLowerCase() === activeTab.toLowerCase() ||
        activeTab.toLowerCase().includes(k.toLowerCase()),
    ) || "Game";

  // Gunakan data PLN jika tab aktif adalah PLN, selain itu pakai data produk normal
  const currentConfig = isPLN
    ? plnConfig
    : productsData[matchedKey as keyof typeof productsData];

  // =========================================================================
  // 🔥 FUNGSI AUTOMATIC SCROLL & UPDATE TAB UNTUK KARTU BAWAH
  // =========================================================================
  const scrollToForm = () => {
    const formElement = document.getElementById("transaction-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleCardClick = (targetTab: string) => {
    setActiveTab(targetTab);
    setTimeout(() => {
      scrollToForm();
    }, 50);
  };

  // =========================================================================
  // 🔥 EFEK MENANGKAP KLIK DARI NAVBAR (SINKRONISASI NAVIGATION LINK)
  // =========================================================================
  useEffect(() => {
    const handleNavbarTabChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const targetTabName = customEvent.detail;

      if (!targetTabName) return;

      const foundKey = Object.keys(productsData).find(
        (k) =>
          k.toLowerCase() === targetTabName.toLowerCase() ||
          targetTabName.toLowerCase().includes(k.toLowerCase()),
      );

      if (foundKey) {
        setActiveTab(foundKey);
      } else if (
        targetTabName.toLowerCase().includes("pln") ||
        targetTabName.toLowerCase().includes("listrik")
      ) {
        setActiveTab("PLN");
      }

      const formElement = document.getElementById("transaction-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "center" });
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
      const customEvent = event as CustomEvent;
      if (!customEvent.detail) return;

      const clickedProductTitle =
        typeof customEvent.detail === "object"
          ? customEvent.detail.title
          : customEvent.detail;
      const clickedProductSub =
        typeof customEvent.detail === "object" ? customEvent.detail.sub : "";

      let foundTab = "";
      let foundProduct = "";

      for (const tabKey of Object.keys(productsData)) {
        const config = productsData[tabKey as keyof typeof productsData];
        if (config && Array.isArray(config.products)) {
          const matched = config.products.find(
            (p) =>
              typeof p === "string" &&
              p.toLowerCase() === clickedProductTitle?.toLowerCase(),
          );

          if (matched) {
            foundTab = tabKey;
            foundProduct = matched;
            break;
          }
        }
      }

      if (foundTab && foundProduct) {
        setActiveTab(foundTab);
        setSelectedProduct(foundProduct);

        const config = productsData[foundTab as keyof typeof productsData];
        const availableItems = (config?.items as any)?.[foundProduct] || [];

        const matchedItem = availableItems.find((item: any) =>
          item.label
            .toLowerCase()
            .includes(clickedProductSub.toString().toLowerCase()),
        );

        if (matchedItem) {
          setSelectedItem(matchedItem.label);
          setCurrentPrice(matchedItem.price);
        } else if (availableItems.length > 0) {
          setSelectedItem(availableItems[0].label);
          setCurrentPrice(availableItems[0].price);
        }
      }
    };

    window.addEventListener("selectProduct", handleSelectProductGlobal);
    return () => {
      window.removeEventListener("selectProduct", handleSelectProductGlobal);
    };
  }, []);

  // 🔥 RESET INPUT HANYA KETIKA USER BENAR-BENAR PINDAH TAB UTAMA
  useEffect(() => {
    setUserId("");
  }, [activeTab]);

  // 🔥 SINKRONISASI PRODUK PERTAMA SAAT TAB BERGANTI SECARA MANUAL (URUT ABJAD A-Z)
  useEffect(() => {
    if (currentConfig?.products && currentConfig.products.length > 0) {
      const isProductInConfig = currentConfig.products.some(
        (p) => p.toLowerCase() === selectedProduct.toLowerCase(),
      );

      if (!isProductInConfig) {
        // Ambil array produk asli, urutkan alfabetis, lalu ambil indeks pertama [0]
        const sortedProducts = [...currentConfig.products].sort((a, b) =>
          a.localeCompare(b),
        );
        setSelectedProduct(sortedProducts[0]);
      }
    } else {
      setSelectedProduct("");
    }
  }, [activeTab, currentConfig, selectedProduct]);

  // 🔥 SINKRONISASI PRODUK PERTAMA SAAT TAB BERGANTI SECARA MANUAL (URUT ABJAD A-Z)
  useEffect(() => {
    if (currentConfig?.products && currentConfig.products.length > 0) {
      const isProductInConfig = currentConfig.products.some(
        (p) => p.toLowerCase() === selectedProduct.toLowerCase(),
      );

      if (!isProductInConfig) {
        // Ambil array produk asli, urutkan alfabetis, lalu ambil indeks pertama [0]
        const sortedProducts = [...currentConfig.products].sort((a, b) =>
          a.localeCompare(b),
        );
        setSelectedProduct(sortedProducts[0]);
      }
    } else {
      setSelectedProduct("");
    }
    // 🛠️ Hapus selectedProduct dari sini agar ukuran array dependency selalu konstan & stabil
  }, [activeTab, currentConfig]);

  // 🔥 SINKRONISASI PILIHAN ITEM NOMINAL DAN HARGA SAAT PRODUK BERGANTI
  useEffect(() => {
    if (currentConfig && selectedProduct) {
      const availableItems =
        (currentConfig.items as any)[selectedProduct] || [];
      if (Array.isArray(availableItems) && availableItems.length > 0) {
        const currentItemValid = availableItems.find(
          (i: any) => i.label === selectedItem,
        );

        if (currentItemValid) {
          setCurrentPrice(currentItemValid.price);
        } else {
          setSelectedItem(availableItems[0].label);
          setCurrentPrice(availableItems[0].price);
        }
      } else {
        setSelectedItem("");
        setCurrentPrice("Rp 0");
      }
    } else {
      setSelectedItem("");
      setCurrentPrice("Rp 0");
    }
    // 🛠️ Cukup amati selectedProduct & currentConfig, hapus selectedItem agar ukuran dependency tidak berubah
  }, [selectedProduct, currentConfig]);

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

  // 🔥 SEKARANG TOMBOL UTAMA MEMANGGIL INI TERLEBIH DAHULU UNTUK FILTER VALIDASI & POPUP MODAL
  const handleValidateAndOpenNotice = () => {
    if (!userId.trim()) {
      alert(`Silakan isi ${getDynamicPlaceholder()} Anda terlebih dahulu!`);
      return;
    }
    setShowNotice(true); // Buka modal notice konfirmasi jika input user id aman
  };

  const handleOrderWhatsApp = () => {
    setShowNotice(false); // Tutup modal notice

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

  const getDynamicPlaceholder = () => {
    const config = currentConfig as any;
    const tab = activeTab.toLowerCase();

    if (tab.includes("pln") || tab.includes("listrik")) {
      return "Masukkan No Meter / ID Pel";
    }
    if (tab.includes("game")) {
      if (config?.placeholders) {
        return config.placeholders[selectedProduct] || "Masukkan ID Game";
      }
      return config?.inputPlaceholder || "Masukkan ID Game";
    }
    if (
      tab.includes("pulsa") ||
      tab.includes("data") ||
      tab.includes("internet")
    ) {
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

  // Helper untuk mendapatkan icon gambar pendukung di dekat header form jika diperlukan
  const getProductImage = (productName: string) => {
    if (!productName) return "/logo.png";
    const name = productName.toLowerCase();

    // === GAME ===
    if (name.includes("mobile legends")) return "/ml.png";
    if (name.includes("free fire")) return "/ff.png";
    if (name.includes("pubg")) return "/pubgg.png";
    if (name.includes("call of duty") || name.includes("cod"))
      return "/cod.png";
    if (name.includes("valorant")) return "/valorantt.png";
    if (name.includes("aov")) return "/aov.png";
    if (name.includes("genshin")) return "/gi.png";

    // === E-WALLET ===
    if (name.includes("dana")) return "/dana1.png";
    if (name.includes("gopay")) return "/gopay1.png";
    if (name.includes("ovo")) return "/ovo.png";
    if (name.includes("shopee")) return "/shoppepay1.png";

    // === PREMIUM APP ===
    if (name.includes("netflix")) return "/netflix.png";
    if (name.includes("youtube") || name.includes("ytb")) return "/ytbprem.png";
    if (name.includes("spotify")) return "/spotifyy.png";
    if (name.includes("vidio")) return "/vidio.png";
    if (name.includes("we tv") || name.includes("wetv")) return "/wetv.png";
    if (name.includes("viu")) return "/viu.png";
    if (name.includes("disney")) return "/disney.png";
    if (name.includes("bstation")) return "/bstation.png";
    if (name.includes("canva")) return "/canva.png";
    if (name.includes("capcut")) return "/capcut.png";
    if (name.includes("picsart")) return "/picsart.png";
    if (name.includes("alight motion") || name.includes("am")) return "/am.png";
    if (name.includes("primevideo")) return "/primevideo.png";

    // === PULSA & DATA OPERATOR ===
    if (name.includes("telkomsel")) return "/telkomsel.png";
    if (name.includes("indosat")) return "/indosat.png";
    if (name.includes("xl")) return "/xl.png";
    if (name.includes("axis")) return "/axis.png";
    if (name.includes("smartfren")) return "/smartfren.png";
    if (name.includes("tri") || name.startsWith("3")) return "/3.png";
    if (name.includes("by.u") || name.includes("byu")) return "/byu.png";

    // Default fallback memakai logo toko utama jika tidak terdeteksi (seperti PLN)
    return "/logo.png";
  };

  const activeProductImg = getProductImage(selectedProduct);

  // =========================================================================
  // 🦅 SYSTEM KEAMANAN LOGO: RENDER FALLBACK SVG JIKA GAMBAR LOKAL = /logo.png
  // =========================================================================
  const renderSecureLogo = () => {
    // Jika gambar lokalnya custom (artinya file gambarmu lengkap & ketemu), langsung render tag <img>
    if (activeProductImg !== "/logo.png") {
      return (
        <img
          src={activeProductImg}
          alt={selectedProduct}
          className="absolute left-3 w-5 h-5 rounded-md object-cover z-10 pointer-events-none"
          onError={(e) => {
            // Jika misal gambar lokal corrupt/hilang secara tidak sengaja, sembunyikan img-nya
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      );
    }

    // --- JIKA TIDAK KETEMU ATAU KEMBALI KE /logo.png, KITA AMANKAN PAKAI SVG CAKEP ---
    const name = selectedProduct.toLowerCase();

    if (
      name.includes("pln") ||
      name.includes("token") ||
      name.includes("listrik")
    ) {
      return <Bolt className="absolute left-3 text-yellow-400 w-5 h-5 z-10" />;
    }
    if (activeTab.toLowerCase().includes("game")) {
      return (
        <Gamepad2 className="absolute left-3 text-blue-400 w-5 h-5 z-10" />
      );
    }
    if (activeTab.toLowerCase().includes("wallet")) {
      return (
        <Wallet className="absolute left-3 text-emerald-400 w-5 h-5 z-10" />
      );
    }
    if (
      activeTab.toLowerCase().includes("pulsa") ||
      activeTab.toLowerCase().includes("data")
    ) {
      return (
        <Smartphone className="absolute left-3 text-purple-400 w-5 h-5 z-10" />
      );
    }

    // Default ultimate fallback jika benar-benar tidak terdeteksi apa-apa
    return <Crown className="absolute left-3 text-[#FACC15] w-5 h-5 z-10" />;
  };

  return (
    <>
      {/* SECTION CONTAINER UTAMA */}
      <section className="relative px-6 xl:px-16 pt-12 pb-14 overflow-hidden text-white bg-[#050B18]">
        {/* 🦅 MASKOT ELANG BACKGROUND ABSOLUTE */}
        <div className="hidden lg:block absolute left-[32%] xl:left-[31%] top-1/2 -translate-y-1/2 w-[390px] h-auto pointer-events-none select-none mix-blend-screen opacity-90 z-0">
          <img
            src="/hero-banner.png"
            alt="Mankels Elang"
            className="w-full h-auto object-contain scale-110"
          />
        </div>

        {/* LAYOUT GRID UTAMA */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* SISI KIRI: TEKS UTAMA & BENEFIT HORIZONTAL */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-7 text-center lg:text-left z-10">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
              <Zap size={14} className="text-blue-400 fill-blue-400/20" />
              <span className="text-[11px] font-bold text-blue-400 tracking-wider">
                TOP UP CEPAT & AMAN
              </span>
            </div>

            {/* TEXT MAIN */}
            <h1 className="text-[35px] xl:text-[38px] leading-[1.1] font-black tracking-tight drop-shadow-md">
              Top Up Cepat,
              <br />
              <span className="text-[#FACC15]">Harga Hemat,</span>
              <br />
              <span className="text-white">Transaksi Anti Ribet!</span>
            </h1>

            <p className="text-gray-400 text-[15px] xl:text-[14px] leading-relaxed max-w-[460px] mx-auto lg:mx-0">
              Top-up game, pulsa, e-wallet, dan aplikasi premium murah dengan pembayaran QRIS serta proses instan 24 jam terpercaya
            </p>

            {/* ⚡ BARIS BENEFIT HORIZONTAL ⚡ */}
            <div className="pt-2 flex flex-row items-center justify-center lg:justify-start gap-x-8 gap-y-4 overflow-x-auto scrollbar-none snap-x w-full">
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
                  title: "Aman Terpercaya",
                  desc: "100% transaksi aman",
                  icon: ShieldCheck,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-left shrink-0 snap-numerator"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1A2438]/80 border border-white/5 flex items-center justify-center shrink-0 shadow-md">
                    <item.icon size={15} className="text-blue-400" />
                  </div>
                  <div className="leading-tight">
                    <h3 className="font-bold text-[13px] xl:text-[14px] text-white tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SISI KANAN: FORM TRANSAKSI */}
          <div
            id="transaction-form"
            className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end w-full z-10 scroll-mt-12"
          >
            <div className="w-full max-w-[500px] bg-[#0E1628]/85 border border-white/10 rounded-[22px] sm:rounded-[28px] p-5 sm:p-7 backdrop-blur-xl shadow-2xl relative">
              {/* TAB SELECTION */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2 sm:pb-3 mb-4 sm:mb-6 gap-2 overflow-x-auto scrollbar-none flex-nowrap">
                {[
                  "Game",
                  "Pulsa",
                  "Paket Data",
                  "E-Wallet",
                  "Premium",
                  "PLN",
                ].map((item) => {
                  const isActive =
                    activeTab.toLowerCase() === item.toLowerCase() ||
                    item.toLowerCase().includes(activeTab.toLowerCase());
                  return (
                    <button
                      key={item}
                      onClick={() => setActiveTab(item)}
                      className="relative pb-2 shrink-0"
                    >
                      <span
                        className={`text-[12px] sm:text-[11px] font-bold tracking-wide transition-colors whitespace-nowrap ${
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
                })}
              </div>

              {/* INPUT FIELDS */}
              <div className="space-y-3.5 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Dropdown 1 */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[11px] sm:text-[12px] font-bold text-gray-400 tracking-wide block">
                      {activeTab.toLowerCase().includes("premium")
                        ? "Pilih Aplikasi"
                        : activeTab.toLowerCase().includes("pulsa") ||
                            activeTab.toLowerCase().includes("data")
                          ? "Pilih Operator"
                          : activeTab.toLowerCase().includes("pln")
                            ? "Jenis Layanan"
                            : "Pilih Game"}
                    </label>
                    <div className="relative flex items-center">
                      {/* 🔥 RENDER LOGO AMAN & CERDAS DISINI */}
                      {renderSecureLogo()}

                      <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="w-full h-[46px] sm:h-[52px] bg-[#111C33] border border-white/5 rounded-xl sm:rounded-2xl text-[13px] font-semibold outline-none text-white focus:border-[#FACC15]/30 cursor-pointer pl-10 pr-4"
                      >
                        {/* 🔄 Mengurutkan nama produk dari A ke Z secara alfabetis */}
                        {[...(currentConfig?.products || [])]
                          .sort((a, b) => a.localeCompare(b))
                          .map((prod) => (
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
                  </div>

                  {/* Dropdown 2 */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[11px] sm:text-[12px] font-bold text-gray-400 tracking-wide block">
                      {activeTab.toLowerCase().includes("pulsa")
                        ? "Pilih Pulsa"
                        : activeTab.toLowerCase().includes("data")
                          ? "Pilih Paket"
                          : "Pilih Nominal"}
                    </label>
                    <select
                      value={selectedItem}
                      onChange={handleItemChange}
                      className="w-full h-[46px] sm:h-[52px] bg-[#111C33] border border-white/5 rounded-xl sm:rounded-2xl px-3 sm:px-4 text-[13px] font-semibold outline-none text-white focus:border-[#FACC15]/30 cursor-pointer"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Input ID */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[11px] sm:text-[12px] font-bold text-gray-400 tracking-wide block">
                      {getDynamicPlaceholder()}
                    </label>
                    <input
                      type="text"
                      placeholder={getDynamicPlaceholder()}
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full h-[46px] sm:h-[52px] bg-[#111C33] border border-white/5 rounded-xl sm:rounded-2xl px-3 sm:px-4 text-[13px] outline-none placeholder:text-gray-500 text-white focus:border-[#FACC15]/30"
                    />
                  </div>

                  {/* Harga */}
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

                {/* Buttons */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={handleValidateAndOpenNotice} // 🔥 SEKARANG MEMANGGIL VALIDASI POPUP MODAL NOTICE
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

      {/* 🔥 KODE MODAL POPUP DIALOG NOTICE BARU (Aman & Interaktif) */}
      {showNotice && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#091426] border border-[#FACC15]/30 w-full max-w-[400px] rounded-[24px] p-6 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] rounded-full flex items-center justify-center mb-4 mx-auto text-xl">
              ⚠️
            </div>

            <h3 className="text-white font-bold text-[16px] mb-2">Konfirmasi Pengisian Data</h3>
            <p className="text-gray-400 text-[12.5px] leading-relaxed mb-6">
              Pastikan pengisian data sudah benar. Kesalahan pengisian merupakan tanggung jawab anda.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowNotice(false)} 
                className="h-[46px] bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-[13px] rounded-xl transition"
              >
                Tidak, Edit Lagi
              </button>
              <button
                type="button"
                onClick={handleOrderWhatsApp} 
                className="h-[46px] bg-[#FACC15] hover:bg-[#EAB308] text-black font-bold text-[13px] rounded-xl transition shadow-md shadow-[#FACC15]/10"
              >
                Ya, Sudah Benar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOWER SECTION: KATEGORI KARTU BAWAH */}
      <section className="px-6 xl:px-16 pb-16 text-white bg-[#050B18]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {[
            {
              icon: Smartphone,
              title: "Top Up Pulsa",
              desc: "Semua Operator",
              targetTab: "Pulsa",
            },
            {
              icon: Wifi,
              title: "Top Up Data",
              desc: "Paket Internet",
              targetTab: "Paket Data",
            },
            {
              icon: Wallet,
              title: "Top Up E-Wallet",
              desc: "Dana, OVO, GoPay, Shopeepay",
              targetTab: "E-Wallet",
            },
            {
              icon: Crown,
              title: "Aplikasi Premium",
              desc: "Spotify, Netflix, YouTube, Video",
              targetTab: "Premium",
            },
            {
              icon: Gamepad2,
              title: "Top Up Game",
              desc: "MLBB, FF, PUBG, Valorant",
              targetTab: "Game",
            },
            {
              icon: Bolt,
              title: "Listrik PLN",
              desc: "Token & Pascabayar",
              targetTab: "PLN",
            },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(item.targetTab)}
              className="bg-[#0E1628] border border-white/5 rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 hover:border-[#FACC15]/40 transition-all cursor-pointer group active:scale-95 select-none"
            >
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition">
                  <item.icon className="text-blue-400" size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-[13px] sm:text-[15px] leading-tight group-hover:text-[#FACC15] transition-colors">
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
      <div id="promo-section" className="scroll-mt-28" />
    </>
  );
}