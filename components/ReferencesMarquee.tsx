"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

const REFERENCES = [
  { name: "ŞİŞECAM", file: "sisecam.png", desc: "Cam & Kimyasal Sanayi" },
  { name: "VESTEL", file: "vestel.png", desc: "Tüketici Elektroniği & Üretim" },
  { name: "AYDEM ENERJİ", file: "aydem.png", desc: "Enerji & Dağıtım Holding" },
  { name: "ERBAKIR", file: "erbakir.png", desc: "Elektrolitik Bakır Sanayi" },
  { name: "ZORLU HOLDİNG", file: "zorlu.png", desc: "Sanayi & Teknoloji" },
  { name: "ECZACIBAŞI", file: "eczacibasi.png", desc: "Yapı Ürünleri & Sağlık" },
  { name: "SABANCI", file: "sabanci.png", desc: "Sanayi & Finans Holding" },
  { name: "KOÇ HOLDİNG", file: "koc.png", desc: "Enerji & Otomotiv Grubu" },
  { name: "ASELSAN", file: "aselsan.png", desc: "Savunma & İleri Teknoloji" },
  { name: "TÜRK TELEKOM", file: "turktelekom.png", desc: "Telekomünikasyon Altyapı" },
  { name: "MENDERES TEKSTİL", file: "menderes.png", desc: "Entegre Tekstil İhracatı" },
  { name: "BORUSAN", file: "borusan.png", desc: "Boru & Çelik Sanayi" },
];

export default function ReferencesMarquee() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...REFERENCES, ...REFERENCES];

  return (
    <section id="referanslar" className="relative py-20 overflow-hidden border-y border-[#d4af37]/20 bg-[#030816] transition-colors duration-300">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-[#1d3b7d]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#d4af37]/30 bg-[#071128] text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kurumsal Güven Ağımız</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
          Sürekli Dönen <span className="gold-gradient-text font-serif italic">Referanslar Silsilesi</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-xl mx-auto">
          Sanayi ve ihracata yön veren öncü Türk firmalarına sunulan stratejik mali ve yönetim danışmanlığı.
        </p>
      </div>

      {/* Infinite Horizontal Logo Marquee */}
      <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex w-max animate-marquee space-x-6 sm:space-x-10 py-4 hover:[animation-play-state:paused]">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="group relative flex items-center justify-center px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#d4af37]/40 backdrop-blur-sm transition-all duration-300 shrink-0 w-64 sm:w-72 shadow-lg"
            >
              <div className="relative h-14 w-full">
                <Image
                  src={`/references/${item.file}`}
                  alt={item.name}
                  fill
                  className="object-contain filter transition-all group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
