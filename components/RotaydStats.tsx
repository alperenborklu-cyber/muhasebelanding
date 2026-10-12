"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileCheck2,
  Atom,
  Building2,
  Globe2,
  Calculator,
  Users,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Award,
} from "lucide-react";

interface StatItem {
  id: string;
  targetNumber: number;
  suffix?: string;
  title: string;
  description: string;
  icon: React.ElementType;
  isKeyHighlight?: boolean;
  highlightTag?: string;
  category: string;
}

const statsData: StatItem[] = [
  {
    id: "yatirim-tesvik",
    targetNumber: 100,
    suffix: "+",
    title: "Yatırım Teşvik Belgesi",
    description: "100'den fazla resmi başvuru ve tamamlanan teşvik süreci",
    icon: FileCheck2,
    isKeyHighlight: true,
    highlightTag: "Stratejik Başarı",
    category: "Yatırım & Teşvik",
  },
  {
    id: "tubitak",
    targetNumber: 10,
    suffix: "+",
    title: "TÜBİTAK Projesi",
    description: "10'dan fazla Ar-Ge başvuru, onay ve yürütme süreci",
    icon: Atom,
    isKeyHighlight: false,
    category: "Ar-Ge & İnovasyon",
  },
  {
    id: "arge-tasarim",
    targetNumber: 5,
    suffix: "+",
    title: "Ar-Ge & Tasarım Merkezi",
    description: "5'ten fazla resmi merkez başvuru ve süreç yönetimi",
    icon: Building2,
    isKeyHighlight: false,
    category: "Teknoloji & Tescil",
  },
  {
    id: "ticaret-bakanligi",
    targetNumber: 20,
    suffix: "+",
    title: "Ticaret Bakanlığı Destekleri",
    description: "20'den fazla firma için aylık düzenli ihracat destek takibi",
    icon: Globe2,
    isKeyHighlight: false,
    category: "İhracat & Destek",
  },
  {
    id: "mali-danismanlik",
    targetNumber: 50,
    suffix: "+",
    title: "Aylık Mali Danışmanlık",
    description: "50'den fazla kurumsal işletmeye sürekli ve güvenilir hizmet",
    icon: Calculator,
    isKeyHighlight: true,
    highlightTag: "Sürekli Güven",
    category: "Yönetim Muhasebesi",
  },
  {
    id: "sgk-tesvik",
    targetNumber: 150,
    suffix: "+",
    title: "Aylık SGK Teşvik Takibi",
    description: "150'den fazla firmaya aylık düzenli prim ve istihdam kazancı",
    icon: Users,
    isKeyHighlight: true,
    highlightTag: "Çözüm Ortaklığı",
    category: "Bordro & İstihdam",
  },
];

function StatCard({
  item,
  index,
  sectionInView,
}: {
  item: StatItem;
  index: number;
  sectionInView: boolean;
}) {
  const [count, setCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const lastValRef = useRef<number>(0);
  const IconComponent = item.icon;

  useEffect(() => {
    if (!sectionInView) return;

    // Senkronize ve yumuşak kademeli başlangıç (50ms stagger)
    const startDelay = index * 50;
    let animationFrameId: number;
    let startTimestamp: number | null = null;

    // Rakamın büyüklüğüne göre dengeli, akıcı süre hesabı (asla takılma / donma yapmaz)
    const duration = Math.min(1450, Math.max(850, 700 + item.targetNumber * 5));

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);

        // Standart akıcı Ease-Out Cubic eğrisi: yumuşak kalkış ve zarif yavaşlama
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(ease * item.targetNumber);

        // Yalnızca tam sayı değiştiğinde render tetikle (aşırı CPU ve re-render sıçramalarını önler)
        if (currentVal !== lastValRef.current) {
          lastValRef.current = currentVal;
          setCount(currentVal);
        }

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setCount(item.targetNumber);
          setIsCompleted(true);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [sectionInView, item.targetNumber, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className={`group relative rounded-2xl p-5 sm:p-6 lg:p-7 transition-all duration-500 flex flex-col justify-between overflow-hidden ${
        item.isKeyHighlight
          ? "bg-gradient-to-br from-[#0c1b3d]/90 via-[#07132e]/95 to-[#040a1a] border border-[#d4af37]/45 shadow-[0_10px_35px_-10px_rgba(212,175,55,0.2)] hover:border-[#d4af37] hover:shadow-[0_15px_45px_-10px_rgba(212,175,55,0.35)]"
          : "bg-[#071128]/70 border border-[#1d3b7d]/40 shadow-lg hover:border-[#2a4d9e]/70 hover:bg-[#0b1938]/80 hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.15)]"
      } backdrop-blur-md hover:-translate-y-1`}
    >
      {/* Background ambient glow on hover */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-40 ${
          item.isKeyHighlight ? "bg-[#d4af37]" : "bg-[#2563eb]"
        }`}
      />

      {/* Top row: Icon + Badge / Category */}
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            item.isKeyHighlight
              ? "bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#040a1a] group-hover:scale-105"
              : "bg-[#122654]/70 border border-[#1d3b7d]/60 text-[#93c5fd] group-hover:bg-[#1b3a80] group-hover:text-white group-hover:scale-105"
          }`}
        >
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" />
        </div>

        {item.isKeyHighlight && item.highlightTag ? (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3d47c] tracking-wide">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>{item.highlightTag}</span>
          </span>
        ) : (
          <span className="text-[11px] sm:text-xs font-medium text-white/45 tracking-wider uppercase">
            {item.category}
          </span>
        )}
      </div>

      {/* Center: Hero Animated Number + Clean Title */}
      <div className="space-y-2 my-auto">
        <div className="flex items-baseline space-x-0.5">
          <span
            className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight tabular-nums transition-colors duration-300 ${
              item.isKeyHighlight
                ? "gold-gradient-text drop-shadow-[0_2px_14px_rgba(212,175,55,0.28)]"
                : "text-white"
            }`}
          >
            {count}
          </span>
          <span
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${
              item.isKeyHighlight ? "text-[#d4af37]" : "text-[#93c5fd]"
            }`}
          >
            {item.suffix}
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug pt-1">
          {item.title}
        </h3>
      </div>

      {/* Bottom: Clear Description */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-xs sm:text-[13px] text-white/70 group-hover:text-white/90 transition-colors leading-relaxed font-normal">
          {item.description}
        </p>
      </div>

      {/* Subtle indicator bar at the bottom */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500 ${
          item.isKeyHighlight
            ? "bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60 group-hover:opacity-100"
            : "bg-gradient-to-r from-transparent via-[#2563eb]/60 to-transparent opacity-0 group-hover:opacity-100"
        }`}
      />
    </motion.div>
  );
}

export default function RotaydStats() {
  const sectionRef = useRef<HTMLElement>(null);
  // Bölüm ekrana girerken tek noktadan senkron tetikleme
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="rakamlarla-rotayd"
      aria-label="Rakamlarla ROTAYD İstatistikleri"
      className="relative py-16 sm:py-24 bg-gradient-to-b from-[#040a1a] via-[#071128] to-[#040a1a] text-white overflow-hidden"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#1d3b7d]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle grid mesh overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <TrendingUp className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Kurumsal Güven &amp; Performans</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
            Rakamlarla{" "}
            <span className="font-serif italic gold-gradient-text font-normal">
              ROTAYD
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/75 font-light leading-relaxed">
            Deneyimimiz rakamlara, çalışmalarımız başarıya dönüşüyor.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-white/50 max-w-2xl mx-auto">
            Yalnızca başvuru yapan bir danışmanlık firması değil; işletmelerin mali, hibe ve teşvik süreçlerini uçtan uca ve uzun vadeli yöneten güvenilir çözüm ortağınız.
          </p>
        </div>

        {/* Stats Grid: 3 columns on desktop (lg:grid-cols-3), 2 columns on mobile (grid-cols-2) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {statsData.map((item, index) => (
            <StatCard
              key={item.id}
              item={item}
              index={index}
              sectionInView={isSectionInView}
            />
          ))}
        </div>

        {/* Bottom Trust Note */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/60 bg-[#071128]/80 border border-[#1d3b7d]/40 rounded-full px-5 py-2.5 backdrop-blur-md">
            <span className="inline-flex items-center space-x-1.5 text-white/80">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>%100 Mevzuat &amp; Süreç Güvencesi</span>
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="inline-flex items-center space-x-1.5 text-white/80">
              <Award className="w-4 h-4 text-[#d4af37]" />
              <span>15+ Yıllık Sektör Kıdemi</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
