"use client";

export default function Featrues() {
  return (
    <section className="px-6 pb-6">
      <div className="max-w-[1400px] mx-auto grid xl:grid-cols-[2.5fr_1fr] gap-4 items-stretch">
        {/* LEFT PROMO */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-r from-[#102768] via-[#091a45] to-[#081120] h-[170px] px-8 flex items-center">
          <div className="relative z-10">
            <div className="inline-flex px-2 py-0 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 font-bold text-[11px] mb-3">
              PROMO SPESIAL
            </div>
            <h2 className="text-[24px] xl:text-[28px] font-black leading-none">
              DISKON UP TO
            </h2>
            <div className="text-[30px] xl:text-[20px] font-black text-yellow-400 leading-none mt-1">
              20%
            </div>
            <p className="text-gray-300 text-[14px] mt-2">
              Top Up Game, Pulsa, Data & Aplikasi Premium
            </p>
            <button className="mt-1 bg-yellow-400 text-black px-5 py-2.5 rounded-xl font-black text-sm hover:opacity-90 transition relative z-20">
              Top Up Sekarang
            </button>
          </div>
          <img
            src="/promo-baner.png"
            alt="promo"
            className="absolute right-0 top-0 h-full w-[42%] object-cover opacity-90"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="grid grid-cols-3 gap-4 h-[170px]">
          {/* QRIS */}
          <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-[#2157FF] to-[#081B5E] p-4">
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl" />
            <p className="text-[13px] font-semibold text-white/90">
              Cashback QRIS
            </p>
            <h3 className="mt-5 text-[16px] leading-tight font-black text-white">
              s/d 10Rb
            </h3>
            <p className="mt-5 text-[12px] leading-relaxed text-white/70">
              Min. Transaksi 50Rb
            </p>
            <img
              src="/qriss.png"
              alt="qris"
              className="absolute bottom-4 right-4 w-[42px] object-contain"
            />
          </div>

          {/* PULSA */}
          <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-[#008D43] to-[#003D1E] p-4">
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-green-400/20 blur-2xl" />
            <p className="text-[13px] font-semibold text-white/90">
              Diskon Pulsa
            </p>
            <h3 className="mt-5 text-[16px] leading-tight font-black text-white">
              s/d 15%
            </h3>
            <p className="mt-4 text-[12px] leading-relaxed text-white/70">
              All Operator
            </p>
            <img
              src="/pulsaa.png"
              alt="pulsa"
              className="absolute bottom-0.25 right-4 w-[42px] object-contain"
            />
          </div>

          {/* MEMBER */}
          <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-[#7B1FFF] to-[#2B005C] p-4">
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-purple-400/20 blur-2xl" />
            <p className="text-[13px] font-semibold text-white/90">
              Member Baru
            </p>
            <h3 className="mt-1 text-[16px] leading-tight font-black text-white">
              Cashback 5Rb
            </h3>
            <p className="mt-1 text-[12px] leading-relaxed text-white/70">
              Min. Transaksi 25Rb
            </p>
            <img
              src="/giftt.png"
              alt="gift"
              className="absolute bottom-1 right-4 w-[42px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
