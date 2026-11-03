"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface RefItem {
  id?: string;
  name: string;
  file?: string;
  imageUrl?: string;
  desc: string;
}

const DEFAULT_REFERENCES: RefItem[] = [
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
  const [items, setItems] = useState<RefItem[]>(DEFAULT_REFERENCES);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/references')
      .then(res => res.json())
      .then(data => {
        if (isMounted && data?.references && Array.isArray(data.references) && data.references.length > 0) {
          // Her firma yalnızca bir kez gösterilmeli (Tekrar eden referanslar filtrelenir)
          const seen = new Set<string>();
          const uniqueList: RefItem[] = [];
          for (const ref of data.references) {
            const key = ref.name.trim().toUpperCase();
            if (!seen.has(key)) {
              seen.add(key);
              uniqueList.push(ref);
            }
          }
          setItems(uniqueList);
        }
      })
      .catch(() => {
        // Fallback to default smoothly
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const getImageSrc = (item: RefItem) => {
    if (item.imageUrl) return item.imageUrl;
    if (item.file) return `/references/${item.file}`;
    return "/apple-icon.png";
  };

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

      {/* Her firma tek ve benzersiz olarak listelenir (Tekrar eden track kaldırıldı) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {items.map((item, idx) => (
            <div
              key={`ref-${item.name}-${idx}`}
              className="group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#d4af37]/60 backdrop-blur-sm transition-all duration-300 h-24 sm:h-28 shadow-sm hover:shadow-[#d4af37]/10"
              title={`${item.name} | ${item.desc}`}
            >
              <div className="relative h-9 sm:h-10 w-full flex items-center justify-center">
                <Image
                  src={getImageSrc(item)}
                  alt={`${item.name} - ROTAYD Danışmanlık ve Mali Müşavirlik Referansı`}
                  fill
                  unoptimized={!!item.imageUrl && item.imageUrl.startsWith('data:')}
                  className="object-contain filter brightness-0 invert opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  sizes="(max-width: 768px) 130px, 160px"
                />
              </div>
              <span className="text-[10px] text-white/50 group-hover:text-[#faecc0] transition-colors truncate max-w-full text-center mt-2 font-medium">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
