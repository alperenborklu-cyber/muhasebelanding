"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
    highlightTag: "Stratejik Çözüm",
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
    description: "150'den fazla firmaya aylık düzenli teşvik ve istihdam süreç takibi",
    icon: Users,
    isKeyHighlight: true,
    highlightTag: "Çözüm Ortaklığı",
    category: "Mevzuat & İstihdam",
  },
];

function StatCard({
  item,
  index,
  progress,
  isCompleted,
  hasStarted,
}: {
  item: StatItem;
  index: number;
  progress: number;
  isCompleted: boolean;
  hasStarted: boolean;
}) {
  const IconComponent = item.icon;

  // Akıcı, pürüzsüz ve asil easing eğrisi (Apple cubic-bezier standardı)
  const easeProgress = hasStarted ? 1 - Math.pow(1 - progress, 3) : 0;

  // KESİN KURAL: Hepsi 1'den başlar ve aynı anda targetNumber'a ulaşır
  const count = hasStarted
    ? isCompleted
      ? item.targetNumber
      : Math.max(
          1,
          Math.min(
            item.targetNumber,
            Math.round(1 + (item.targetNumber - 1) * easeProgress)
          )
        )
    : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      whileTap={{
        scale: 0.99,
        transition: { duration: 0.15 },
      }}
      className={`group relative rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden cursor-default transition-all duration-300 ${
        item.isKeyHighlight
          ? "bg-gradient-to-br from-[#0c1b3d]/90 via-[#07132e]/95 to-[#040a1a] border border-[#d4af37]/45 shadow-[0_10px_35px_-10px_rgba(212,175,55,0.2)] hover:border-[#d4af37] hover:shadow-[0_16px_45px_-10px_rgba(212,175,55,0.35)]"
          : "bg-[#071128]/70 border border-[#1d3b7d]/40 shadow-lg hover:border-[#2a4d9e]/70 hover:bg-[#0b1938]/80 hover:shadow-[0_12px_36px_-10px_rgba(37,99,235,0.2)]"
      } backdrop-blur-md`}
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
              ? "bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#040a1a]"
              : "bg-[#122654]/70 border border-[#1d3b7d]/60 text-[#93c5fd] group-hover:bg-[#1b3a80] group-hover:text-white"
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

      {/* Center: Hero Number + Suffix with Subtle Stretch & Squash upon completion */}
      <div className="relative space-y-2 my-auto py-2">
        <motion.div
          key={`num-container-${item.id}`}
          style={{ transformOrigin: "bottom center" }}
          animate={
            isCompleted
              ? {
                  scaleX: [1, 1.08, 0.94, 1.02, 1],
                  scaleY: [1, 0.92, 1.07, 0.98, 1],
                  y: [0, 1.5, -2.5, 0.5, 0],
                  transition: {
                    duration: 0.55,
                    times: [0, 0.25, 0.55, 0.8, 1],
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
              : {
                  scaleX: 1,
                  scaleY: 1,
                  y: 0,
                }
          }
          className="inline-flex items-baseline space-x-1"
        >
          <span
            className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight tabular-nums select-none ${
              item.isKeyHighlight
                ? "gold-gradient-text drop-shadow-[0_2px_16px_rgba(212,175,55,0.32)]"
                : "text-white drop-shadow-[0_2px_14px_rgba(59,130,246,0.25)]"
            }`}
          >
            {count}
          </span>

          <span
            className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold select-none ${
              item.isKeyHighlight ? "text-[#d4af37]" : "text-[#93c5fd]"
            }`}
          >
            {item.suffix}
          </span>
        </motion.div>

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
    </motion.div>
  );
}

export default function RotaydStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Bölüm ekranın %20'sine girdiğinde aynı anda tetiklensin
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Synchronized Master Clock: Tüm kartlar tam aynı milisaniyede 1'den başlar, aynı anda biter
  const startAnimation = useCallback(() => {
    setIsCompleted(false);
    setHasStarted(true);
    setProgress(0);

    // 1350ms (1.35 saniye): Ne hızlı ne yavaş, pürüzsüz ve asil bir akış
    const DURATION = 1350;
    let startTimestamp: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const currentProgress = Math.min(elapsed / DURATION, 1);

      setProgress(currentProgress);

      if (currentProgress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setProgress(1);
        setIsCompleted(true);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    if (isInView && !hasStarted) {
      // Kartların yumuşakça belirmesinin ardından (150ms) aynı anda başlasınlar
      const timer = setTimeout(() => {
        startAnimation();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasStarted, startAnimation]);

  return (
    <section
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

      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
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
            Deneyimimizle mali ve kurumsal süreçlerinizi destekliyoruz.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-white/50 max-w-2xl mx-auto">
            Yalnızca başvuru yapan bir danışmanlık firması değil; işletmelerin mali, hibe ve teşvik süreçlerini uçtan uca ve uzun vadeli yöneten güvenilir çözüm ortağınız.
          </p>
        </div>

        {/* Stats Grid: 3 columns on desktop, 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {statsData.map((item, index) => (
            <StatCard
              key={item.id}
              item={item}
              index={index}
              progress={progress}
              isCompleted={isCompleted}
              hasStarted={hasStarted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
