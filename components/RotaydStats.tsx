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
  ShieldCheck,
  Award,
  RotateCcw,
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
  progress,
  isRunning,
  isCompleted,
  hasStarted,
}: {
  item: StatItem;
  index: number;
  progress: number;
  isRunning: boolean;
  isCompleted: boolean;
  hasStarted: boolean;
}) {
  const IconComponent = item.icon;

  // Akıcı ve enerjik cubic easing: Başta hızlı hızlanır, sona doğru tatlı bir süzülüşle basamağa oturur
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
      initial={{ opacity: 0, y: 35, scaleX: 1.04, scaleY: 0.88 }}
      animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -7,
        scaleX: 0.985,
        scaleY: 1.025,
        transition: { type: "spring", stiffness: 450, damping: 18 },
      }}
      whileTap={{
        scaleX: 1.05,
        scaleY: 0.94,
        y: 0,
        transition: { duration: 0.1 },
      }}
      className={`group relative rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden cursor-default transition-colors duration-300 ${
        item.isKeyHighlight
          ? "bg-gradient-to-br from-[#0c1b3d]/90 via-[#07132e]/95 to-[#040a1a] border border-[#d4af37]/45 shadow-[0_10px_35px_-10px_rgba(212,175,55,0.2)] hover:border-[#d4af37] hover:shadow-[0_18px_50px_-10px_rgba(212,175,55,0.38)]"
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
        <motion.div
          animate={
            isCompleted
              ? {
                  scale: [1, 1.22, 0.95, 1],
                  rotate: [0, -8, 6, 0],
                  transition: { duration: 0.5, ease: "easeOut" },
                }
              : {}
          }
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            item.isKeyHighlight
              ? "bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#040a1a]"
              : "bg-[#122654]/70 border border-[#1d3b7d]/60 text-[#93c5fd] group-hover:bg-[#1b3a80] group-hover:text-white"
          }`}
        >
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" />
        </motion.div>

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

      {/* Center: AWWWARDS-LEVEL STRETCH & SQUASH NUMBER */}
      <div className="relative space-y-2 my-auto py-2">
        {/* Synchronized Climax Shockwave Ripple on completion */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.9 }}
            animate={{ scale: [0.5, 1.5, 1.9], opacity: [0.9, 0.35, 0] }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className={`absolute -inset-3 rounded-2xl pointer-events-none ${
              item.isKeyHighlight
                ? "border border-[#d4af37]/60 shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                : "border border-[#38bdf8]/60 shadow-[0_0_25px_rgba(56,189,248,0.3)]"
            }`}
          />
        )}

        {/* Stretch & Squash Number Container:
            - Rolling: Dikey esneme (Stretch: scaleY: 1.10, scaleX: 0.92) ile yukarı ivmelenme
            - Bitiş anında (Impact): Basma (Squash: scaleY: 0.78, scaleX: 1.25, y: +5)
            - Rebound (Spring Stretch): Geri yaylanma (scaleY: 1.18, scaleX: 0.88, y: -8)
            - Sönümlenme ve Denge: (scaleY: 0.94 -> 1.02 -> 1.00)
        */}
        <motion.div
          key={`num-container-${item.id}`}
          style={{ transformOrigin: "bottom left" }}
          animate={
            isCompleted
              ? {
                  scaleX: [0.92, 1.25, 0.88, 1.05, 0.98, 1],
                  scaleY: [1.1, 0.78, 1.18, 0.94, 1.02, 1],
                  y: [-3, 5, -8, 2, -1, 0],
                  transition: {
                    duration: 0.65,
                    times: [0, 0.22, 0.48, 0.72, 0.88, 1],
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
              : isRunning
              ? {
                  scaleX: 0.92,
                  scaleY: 1.1,
                  y: -3,
                  transition: { duration: 0.2, ease: "easeOut" },
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
                ? "gold-gradient-text drop-shadow-[0_2px_16px_rgba(212,175,55,0.35)]"
                : "text-white drop-shadow-[0_2px_14px_rgba(59,130,246,0.3)]"
            }`}
          >
            {count}
          </span>

          <motion.span
            animate={
              isCompleted
                ? {
                    scale: [0.75, 1.45, 0.9, 1.1, 1],
                    rotate: [-18, 14, -5, 2, 0],
                    opacity: [0.8, 1, 1, 1, 1],
                    transition: {
                      duration: 0.65,
                      times: [0, 0.25, 0.5, 0.75, 1],
                      ease: [0.175, 0.885, 0.32, 1.275],
                    },
                  }
                : isRunning
                ? { scale: 0.85, rotate: -6, opacity: 0.75 }
                : { scale: 1, rotate: 0, opacity: 0.9 }
            }
            className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold select-none ${
              item.isKeyHighlight ? "text-[#d4af37]" : "text-[#93c5fd]"
            }`}
          >
            {item.suffix}
          </motion.span>
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

      {/* Synchronized Energy Charging Beam at the bottom of the card */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/5 overflow-hidden pointer-events-none">
        <motion.div
          className={`h-full ${
            item.isKeyHighlight
              ? "bg-gradient-to-r from-[#d4af37] via-[#fce28b] to-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.8)]"
              : "bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          }`}
          style={{
            width: `${Math.round(progress * 100)}%`,
          }}
          animate={
            isCompleted
              ? {
                  opacity: [1, 0.7, 1],
                }
              : {}
          }
        />
      </div>
    </motion.div>
  );
}

export default function RotaydStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Bölüm ekranın %20'sine girdiğinde aynı anda tetiklensin
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Synchronized Master Clock: Tüm kartlar tam aynı milisaniyede 1'den başlar, aynı anda biter
  const startAnimation = useCallback(() => {
    setIsCompleted(false);
    setIsRunning(true);
    setHasStarted(true);
    setProgress(0);

    // 1400ms (1.4 saniye): Enerjik, ödül seviyesinde tempo, sıkmayan dinamik ritim
    const DURATION = 1400;
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
        setIsRunning(false);
        setIsCompleted(true);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    if (isInView && !hasStarted) {
      // Kartların ekrana inişinin ardından (180ms) aynı anda başlasınlar
      const timer = setTimeout(() => {
        startAnimation();
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasStarted, startAnimation]);

  const handleReplay = () => {
    startAnimation();
  };

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
            Deneyimimiz rakamlara, çalışmalarımız başarıya dönüşüyor.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-white/50 max-w-2xl mx-auto">
            Yalnızca başvuru yapan bir danışmanlık firması değil; işletmelerin mali, hibe ve teşvik süreçlerini uçtan uca ve uzun vadeli yöneten güvenilir çözüm ortağınız.
          </p>

          {/* Replay Micro-Interaction: Awwwards-style interactive test/preview control */}
          <div className="mt-5 flex justify-center">
            <button
              onClick={handleReplay}
              type="button"
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-medium text-white/75 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
              aria-label="Animasyonu Yeniden Oynat"
            >
              <RotateCcw
                className={`w-3.5 h-3.5 text-[#d4af37] transition-transform duration-500 ${
                  isRunning ? "animate-spin" : ""
                }`}
              />
              <span>Animasyonu Yeniden Oynat</span>
            </button>
          </div>
        </div>

        {/* Stats Grid: 3 columns on desktop, 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {statsData.map((item, index) => (
            <StatCard
              key={item.id}
              item={item}
              index={index}
              progress={progress}
              isRunning={isRunning}
              isCompleted={isCompleted}
              hasStarted={hasStarted}
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
