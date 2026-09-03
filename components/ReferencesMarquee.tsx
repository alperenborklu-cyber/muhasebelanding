"use client";

import Image from "next/image";

// 18 Verified Real Turkish Corporate & Client Brands with Authentic White Logos
const REFERENCES = [
  { name: "TÜRK HAVA YOLLARI", file: "thy.png", desc: "Havacılık & Global Taşımacılık" },
  { name: "TRENDYOL", file: "trendyol.png", desc: "E-Ticaret Lideri" },
  { name: "GETİR", file: "getir.png", desc: "Teknoloji & Lojistik" },
  { name: "PARİBU", file: "paribu.png", desc: "Kripto Varlık Platformu" },
  { name: "TÜRKİYE İŞ BANKASI", file: "isbank.png", desc: "Bankacılık & Finans" },
  { name: "AKBANK", file: "akbank.png", desc: "Özel Bankacılık & Finans" },
  { name: "VESTEL", file: "vestel.png", desc: "Tüketici Elektroniği & Üretim" },
  { name: "BEKO", file: "beko.png", desc: "Dayanıklı Tüketim & İhracat" },
  { name: "PEGASUS HAVA YOLLARI", file: "pegasus.png", desc: "Havacılık Taşımacılığı" },
  { name: "T.C. TİCARET BAKANLIĞI", file: "ticaret.png", desc: "İhracat Destekleri" },
  { name: "TRT", file: "trt.png", desc: "Yayıncılık & Medya" },
  { name: "LİVA PASTANELERİ", file: "liva.png", desc: "Gıda & Mağazacılık" },
  { name: "140JOURNOS", file: "140journos.png", desc: "Dijital Yayıncılık" },
  { name: "FOODCOIN", file: "foodcoin.png", desc: "Finansal Teknoloji" },
  { name: "GOETHE INSTITUT", file: "goethe.png", desc: "Kültür & Eğitim Kurumu" },
  { name: "EUREKO SİGORTA", file: "eureko.png", desc: "Kurumsal Sigortacılık" },
  { name: "HEPİYİ SİGORTA", file: "hepiyi.png", desc: "Dijital Sigorta" },
  { name: "NEOVA KATILIM", file: "neova.png", desc: "Katılım Sigortacılığı" }
];

export default function ReferencesMarquee() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...REFERENCES, ...REFERENCES];

  return (
    <section id="referanslar" className="relative py-20 overflow-hidden border-y border-[#d4af37]/20 bg-[#030816] transition-colors duration-300">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-[#1d3b7d]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center relative z-10">
        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
          <span className="gold-gradient-text font-serif italic">Referanslarımız</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-xl mx-auto">
          Sanayi, teknoloji ve ticarete yön veren öncü kurumlara sunduğumuz stratejik mali ve yönetim danışmanlığı.
        </p>
      </div>

      {/* Infinite Horizontal Logo Marquee */}
      <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex w-max animate-marquee space-x-6 sm:space-x-8 py-4 hover:[animation-play-state:paused]">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="group relative flex items-center justify-center px-8 py-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#d4af37]/50 backdrop-blur-sm transition-all duration-300 shrink-0 w-64 sm:w-72 md:w-80 h-28 sm:h-32 shadow-md"
              title={item.name}
            >
              <div className="relative h-14 sm:h-16 md:h-18 w-full max-w-[210px] sm:max-w-[240px] flex items-center justify-center">
                <Image
                  src={`/references/${item.file}`}
                  alt={item.name}
                  fill
                  className="object-contain filter brightness-0 invert opacity-95 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  sizes="(max-width: 768px) 200px, 240px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
