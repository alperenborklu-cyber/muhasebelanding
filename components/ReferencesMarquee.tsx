"use client";

import Image from "next/image";

// 20 Verified Real Client Brands with Authentic Monochrome Logos
const REFERENCES = [
  { name: "ÖZGÜR LEBLEBİ", file: "ozgurleblebi.webp", desc: "Gıda & Kuruyemiş İmalatı" },
  { name: "ANAKAMP KÜÇÜK KAŞİFLER", file: "anakamp.webp", desc: "Okul Öncesi & Erken Çocukluk Eğitimi" },
  { name: "TODO CROISSANT & COFFEE", file: "todocroissant.webp", desc: "Artizan Fırıncılık & Kahve" },
  { name: "TODO CREATIVE", file: "todocreative.webp", desc: "Dijital Medya & Reklam Ajansı" },
  { name: "LOFTEN BİLİŞİM", file: "loften.webp", desc: "Kurumsal Bilişim & Yazılım Teknolojileri" },
  { name: "PINAR DEMİRBAŞ BÜTÜNSEL SAĞLIK", file: "pinardemirbas.webp", desc: "Fonksiyonel Wellbeing & Bütünsel Sağlık" },
  { name: "UNIVERSAL KAUÇUK", file: "universalkaucuk.webp", desc: "Endüstriyel Kauçuk & İş Makinaları Yedek Parça" },
  { name: "UMG PARTS", file: "umgparts.webp", desc: "Global Maden & Tünel Makinaları Yedek Parça" },
  { name: "NANNEBEE", file: "nannebee.webp", desc: "Doğal Ahşap Çocuk & Bebek Ürünleri" },
  { name: "BEBEK HOUSE", file: "bebekhouse.webp", desc: "Anne & Bebek E-Ticaret ve Mağazacılık" },
  { name: "MISILLA HOME", file: "misillahome.webp", desc: "Premium Ev Tekstili & Tasarım" },
  { name: "NAM PROMOSYON", file: "nampromosyon.webp", desc: "Kurumsal Promosyon & İmalat Grubu" },
  { name: "YENİ NESİL PROMOSYON", file: "yeninesil.webp", desc: "Baskı Teknolojileri & Promosyon Ürünleri" },
  { name: "MELEK PROMOSYON", file: "melekpromosyon.webp", desc: "Kurumsal Hediye & Matbaa Çözümleri" },
  { name: "METAFORM TASARIM", file: "metaform.webp", desc: "Endüstriyel & Mimari Tasarım Çözümleri" },
  { name: "PROKON", file: "prokon.webp", desc: "Mühendislik, Müşavirlik & İnşaat" },
  { name: "EKONAS", file: "ekonas.webp", desc: "Madencilik & Mühendislik Hizmetleri" },
  { name: "DENTİZMİT", file: "dentizmit.webp", desc: "Ağız ve Diş Sağlığı Polikliniği" },
  { name: "HYDRA SONDAJ MAKİNE", file: "hydra.webp", desc: "Sondaj Makineleri & Ekipmanları Sanayi" }
];

export default function ReferencesMarquee() {
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
        <div className="flex w-max group">
          {/* Track 1 */}
          <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8 py-4 animate-marquee group-hover:[animation-play-state:paused]">
            {REFERENCES.map((item, idx) => (
              <div
                key={`track1-${item.name}-${idx}`}
                className="group relative flex items-center justify-center px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#d4af37]/50 backdrop-blur-sm transition-all duration-300 shrink-0 w-44 sm:w-48 md:w-52 h-20 shadow-sm"
                title={`${item.name} | ${item.desc}`}
              >
                <div className="relative h-9 sm:h-10 md:h-11 w-full max-w-[135px] sm:max-w-[155px] flex items-center justify-center">
                  <Image
                    src={`/references/${item.file}`}
                    alt={`${item.name} - ROTAYD Danışmanlık ve Mali Müşavirlik Referansı`}
                    fill
                    className="object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    sizes="(max-width: 768px) 130px, 155px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Track 2 - Seamless Duplicate */}
          <div aria-hidden="true" className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8 py-4 animate-marquee group-hover:[animation-play-state:paused]">
            {REFERENCES.map((item, idx) => (
              <div
                key={`track2-${item.name}-${idx}`}
                className="group relative flex items-center justify-center px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#d4af37]/50 backdrop-blur-sm transition-all duration-300 shrink-0 w-44 sm:w-48 md:w-52 h-20 shadow-sm"
                title={`${item.name} | ${item.desc}`}
              >
                <div className="relative h-9 sm:h-10 md:h-11 w-full max-w-[135px] sm:max-w-[155px] flex items-center justify-center">
                  <Image
                    src={`/references/${item.file}`}
                    alt={`${item.name} - ROTAYD Danışmanlık ve Mali Müşavirlik Referansı`}
                    fill
                    className="object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    sizes="(max-width: 768px) 130px, 155px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
