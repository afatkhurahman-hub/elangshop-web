"use client";

import { useState } from "react";

const faqs = [
  "Metode pembayaran apa saja yang tersedia?",
  "Kenapa transaksi saya pending?",
  "Apakah ada refund jika top up gagal?",
  "Jam berapa customer service aktif?",
];

// Hubungkan jawaban sesuai urutan index faqs di atas
const faqAnswers = [
  "Kami menyediakan berbagai metode pembayaran lengkap mulai dari QRIS (Dana, OVO, GoPay, ShopeePay), Transfer Bank (BCA, Mandiri, BNI, BRI), hingga Virtual Account yang diproses otomatis 24 jam.",
  "Transaksi pending biasanya terjadi karena adanya antrean sistem pada provider game atau gangguan pada mutasi e-wallet/bank. Silakan tunggu 5-10 menit atau hubungi CS WhatsApp jika belum masuk.",
  "Tentu saja! Jika sistem kami gagal memproses pesanan Anda karena kesalahan teknis, saldo atau uang Anda akan dikembalikan 100% tanpa potongan.",
  "Customer Service ElangShop aktif dan siap membantu kamu setiap hari selama 24 jam non-stop (24/7)!",
];

const socials = [
  { name: "ig", link: "https://instagram.com/elang.shopku" },
  { name: "fb", link: "https://facebook.com/alif.fnk393" },
  { name: "tt", link: "https://tiktok.com/@alif.fnk" },
  { name: "ytb", link: "https://youtube.com/@alif.fatkhurahmannk" },
];

const payments = ["qrisz", "bca", "mandiri", "bni", "dana", "ovo", "gopay", "shoppepay"];

export default function FaqAndFooter() {
  // State untuk menyimpan index FAQ yang sedang terbuka (null berarti semua tertutup)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 🔥 Fungsi pembantu navigasi klik diperbarui agar meluncur presisi dengan kompensasi Navbar Fixed
  const handleScrollTo = (idElement: string) => {
    if (idElement === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(idElement);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 🔥 Fungsi perubah Tab Kategori Form Utama saat menu produk di footer diklik
  const handleProductMenuClick = (tabName: string) => {
    // Kirim sinyal event global agar Hero/Form menangkap perubahan Tab Kategori aktif
    const event = new CustomEvent("changeTabFromNavbar", { detail: tabName });
    window.dispatchEvent(event);

    // Gulirkan layar ke area Form Pengisian
    const formElement = document.getElementById("transaction-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    // Ditambahkan padding-top offset (scroll-mt-24) agar navigasi mendarat mulus di bawah Navbar
    <section id="faq" className="px-6 pt-10 pb-6 bg-[#050B18] border-t border-white/10 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto">
        {/* FAQ + HELP */}
        <div className="grid xl:grid-cols-[2fr_1fr] gap-6 mb-12">
          <div className="bg-[#091426] border border-[#17304F] rounded-[24px] p-6">
            <h2 className="text-[28px] font-black mb-6 text-white">Pertanyaan yang Sering Diajukan</h2>
            <div className="space-y-3">
              {faqs.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={index} 
                    className="bg-[#0B172B] border border-white/10 rounded-[16px] overflow-hidden transition-all duration-300"
                  >
                    {/* Baris Utama yang Bisa Diklik */}
                    <div 
                      onClick={() => toggleFaq(index)}
                      className={`px-5 h-[60px] flex items-center justify-between cursor-pointer select-none transition-colors ${
                        isOpen ? "bg-white/5" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className={`text-[14px] font-medium transition-colors ${isOpen ? "text-yellow-400" : "text-gray-200"}`}>
                        {item}
                      </span>
                      {/* Animasi rotasi panah v */}
                      <span className={`text-gray-400 text-xl font-bold transform transition-transform duration-300 ${isOpen ? "rotate-180 text-yellow-400" : ""}`}>
                        ⌄
                      </span>
                    </div>

                    {/* Area Jawaban dengan Efek Slide Mulus */}
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[200px] border-t border-white/5" : "max-h-0"
                      }`}
                    >
                      <div className="px-5 py-4 text-[13px] text-gray-400 leading-relaxed">
                        {faqAnswers[index]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-yellow-400/30 bg-gradient-to-br from-[#061530] via-[#0B1322] to-[#1B1B1B] p-7 min-h-[290px]">
            <div className="absolute right-[-60px] top-[-50px] w-[280px] h-[280px] rounded-full bg-yellow-400/20 blur-[120px]" />
            <div className="absolute right-0 top-0 h-full w-[45%] bg-gradient-to-l from-yellow-400/10 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full gap-2">
              <div className="max-w-[320px]">
                <h3 className="flex flex-col leading-[1.08] font-bold">
                  <span className="text-[26px] text-yellow-400 tracking-[-0.5px]">Butuh Bantuan?</span>
                  <span className="mt-2 text-[26px] text-yellow-400 tracking-[-0.5px]">Hubungi CS Kami</span>
                </h3>
                <p className="mt-4 max-w-[260px] text-[14px] leading-[1.8] text-gray-400">Kami siap membantu 24/7 kapanpun kamu butuh.</p>
                <a href="https://wa.me/6281931194133?text=Halo%20MinEls%2C%20saya%20butuh%20bantuan" target="_blank" rel="noopener noreferrer" className="mt-8 flex h-[50px] w-[210px] items-center justify-center gap-3 rounded-2xl border border-yellow-400/40 bg-[#0B1528]/80 backdrop-blur-xl font-semibold transition-all duration-300 hover:bg-yellow-400 hover:text-black active:scale-95 inline-flex text-white">
                  <img src="/waa.png" alt="wa" className="h-7 w-7 object-contain" /> Chat WhatsApp
                </a>
              </div>
              <div className="relative flex items-center justify-center pr-2">
                <img src="/cal.png" alt="cs" className="w-[190px] object-contain mix-blend-screen brightness-110" />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScrollTo("top")}>
                <img src="/logo.png" alt="logo" className="w-8" />
                <h1 className="text-[16px] font-black leading-none"><span className="text-white">ELANG</span><span className="text-yellow-400">SHOP</span></h1>
              </div>
              <p className="text-gray-400 text-[11px] leading-[2] mt-4 max-w-[190px]">Platform top up game, pulsa, e-wallet, data, dan aplikasi premium cepat, aman, dan terpercaya.</p>
              <div className="mt-4">
                <h3 className="text-white font-bold text-[15px] mb-2">Ikuti Kami</h3>
                <div className="flex flex-wrap justify-start gap-x-4 gap-y-3 items-center">
                  {socials.map((item, index) => (
                    <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="inline-block transition hover:opacity-80 active:scale-95">
                      <img src={`/${item.name}.png`} alt={item.name} className="h-6 object-contain brightness-110" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* KOLOM PRODUK: Otomatis ganti tab form transaksi di atas */}
            <div>
              <h3 className="text-white font-bold text-[13px] mb-4">Produk</h3>
              <div className="space-y-3 text-gray-400 text-[11px]">
                <p onClick={() => handleProductMenuClick("Top Up Game")} className="hover:text-yellow-400 transition cursor-pointer">Top Up Game</p>
                <p onClick={() => handleProductMenuClick("Pulsa")} className="hover:text-yellow-400 transition cursor-pointer">Pulsa & Data</p>
                <p onClick={() => handleProductMenuClick("E-Wallet")} className="hover:text-yellow-400 transition cursor-pointer">E-Wallet</p>
                <p onClick={() => handleProductMenuClick("Premium")} className="hover:text-yellow-400 transition cursor-pointer">Aplikasi Premium</p>
                <p onClick={() => handleProductMenuClick("PLN")} className="hover:text-yellow-400 transition cursor-pointer">Listrik PLN</p>
              </div>
            </div>

            {/* KOLOM INFORMASI */}
            <div>
              <h3 className="text-white font-bold text-[13px] mb-4">Informasi</h3>
              <div className="space-y-3 text-gray-400 text-[11px]">
                {/* Mengarah ke ID "why-choose-us" (Kenapa Memilih ElangShop) */}
                <p onClick={() => handleScrollTo("why-choose-us")} className="hover:text-yellow-400 transition cursor-pointer">Tentang Kami</p>
                <p onClick={() => handleScrollTo("how-to-topup")} className="hover:text-yellow-400 transition cursor-pointer">Cara Top Up</p>
                {/* Kosongkan rute sementara menggunakan #, link teks tidak rusak */}
                <a href="#" onClick={(e) => e.preventDefault()} className="block text-gray-600 cursor-not-allowed select-none">Syarat & Ketentuan</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="block text-gray-600 cursor-not-allowed select-none">Kebijakan Privasi</a>
              </div>
            </div>

            {/* KOLOM BANTUAN */}
            <div>
              <h3 className="text-white font-bold text-[13px] mb-4">Bantuan</h3>
              <div className="space-y-3 text-gray-400 text-[11px]">
                <p onClick={() => handleScrollTo("faq")} className="hover:text-yellow-400 transition cursor-pointer">FAQ</p>
                <a href="https://wa.me/6281931194133?text=Halo%20MinEls%2C%20saya%20butuh%20bantuan" target="_blank" rel="noopener noreferrer" className="block hover:text-yellow-400 transition">Hubungi Kami</a>
                {/* Kosongkan rute transaksi sementara */}
                <a href="#" onClick={(e) => e.preventDefault()} className="block text-gray-600 cursor-not-allowed select-none">Cek Transaksi</a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-[15px] mb-2 -ml-3">Metode Pembayaran</h3>
              <div className="flex flex-wrap justify-start gap-x-2 gap-y-5 items-center -ml-5">
                {payments.map((item, index) => <img key={index} src={`/${item}.png`} alt={item} className="h-5 object-contain brightness-110" />)}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/5 text-center">
            <p className="text-[11px] text-gray-500">© 2020 ElangShop. All rights reserved. Created By Lifskur</p>
          </div>
        </div>
      </div>
    </section>
  );
}