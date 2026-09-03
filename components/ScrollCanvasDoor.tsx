"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  ShieldCheck, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp,
  Award
} from "lucide-react";

const TOTAL_FRAMES = 120;

export default function ScrollCanvasDoor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredPortal, setHoveredPortal] = useState<"left" | "right" | null>(null);

  // Framer motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics for ultra-smooth 60fps interpolation without jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001,
  });

  // Preload all 120 frames with progress reporting
  useEffect(() => {
    let isCancelled = false;
    const loadedImgs: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `/sequence/frame_${i}.webp`;
      img.onload = () => {
        if (isCancelled) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setImages(loadedImgs);
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setImages(loadedImgs);
          setIsLoaded(true);
        }
      };
      loadedImgs.push(img);
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw frame to canvas with responsive contain-fit
  const renderFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Calculate current frame index clamped to bounds
    const frameIndex = Math.min(
      images.length - 1,
      Math.max(0, Math.floor(progress * images.length))
    );

    const img = images[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Device Pixel Ratio for ultra-crisp Retina display
    const dpr = window.devicePixelRatio || 1;
    const clientWidth = canvas.clientWidth;
    const clientHeight = canvas.clientHeight;

    if (canvas.width !== clientWidth * dpr || canvas.height !== clientHeight * dpr) {
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, clientWidth, clientHeight);

    // Responsive contain / cover scaling
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = clientWidth / clientHeight;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    // Cover math with subtle aspect adjustment
    if (canvasRatio > imgRatio) {
      drawW = clientWidth;
      drawH = clientWidth / imgRatio;
      drawX = 0;
      drawY = (clientHeight - drawH) / 2;
    } else {
      drawH = clientHeight;
      drawW = clientHeight * imgRatio;
      drawX = (clientWidth - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Deep luxury navy ambient vignette blend
    const gradient = ctx.createRadialGradient(
      clientWidth / 2,
      clientHeight / 2,
      Math.min(clientWidth, clientHeight) * 0.35,
      clientWidth / 2,
      clientHeight / 2,
      Math.max(clientWidth, clientHeight) * 0.72
    );
    gradient.addColorStop(0, "rgba(4, 10, 26, 0)");
    gradient.addColorStop(0.68, "rgba(4, 10, 26, 0.45)");
    gradient.addColorStop(1, "rgba(4, 10, 26, 0.95)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, clientWidth, clientHeight);

    ctx.restore();
  }, [images]);

  // Hook render loop to smoothed scroll progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      renderFrame(latest);
    });

    if (isLoaded) {
      renderFrame(smoothProgress.get());
    }

    return () => unsubscribe();
  }, [smoothProgress, isLoaded, renderFrame]);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        renderFrame(smoothProgress.get());
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, smoothProgress, renderFrame]);

  // Scrollytelling Transformations
  // "Scroll to Explore" prompt (0% -> 10% fadeout)
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.07, 0.12], [1, 0.7, 0]);
  const scrollIndicatorY = useTransform(smoothProgress, [0, 0.12], [0, 15]);

  // Beat A: 0% -> 20% (Hero positioned higher up, elegant logo, white text with gold "Finans & Yönetim")
  const beatAOpacity = useTransform(smoothProgress, [0, 0.02, 0.16, 0.22], [1, 1, 0.9, 0]);
  const beatAY = useTransform(smoothProgress, [0, 0.2], [0, -35]);

  // Beat B: 24% -> 46% (Left aligned - Muhasebe Preview)
  const beatBOpacity = useTransform(smoothProgress, [0.24, 0.28, 0.42, 0.47], [0, 1, 1, 0]);
  const beatBY = useTransform(smoothProgress, [0.24, 0.28, 0.42, 0.47], [30, 0, 0, -30]);

  // Beat C: 49% -> 70% (Right aligned - Danışmanlık Preview)
  const beatCOpacity = useTransform(smoothProgress, [0.49, 0.53, 0.67, 0.72], [0, 1, 1, 0]);
  const beatCY = useTransform(smoothProgress, [0.49, 0.53, 0.67, 0.72], [30, 0, 0, -30]);

  // Beat D: 74% -> 100% (The Grand Opening - Split Portal Cards)
  const beatDOpacity = useTransform(smoothProgress, [0.73, 0.8, 1], [0, 1, 1]);
  const beatDY = useTransform(smoothProgress, [0.73, 0.82], [40, 0]);
  const portalScale = useTransform(smoothProgress, [0.73, 0.85], [0.94, 1]);

  return (
    <div ref={containerRef} className="relative h-[420vh] bg-[#040a1a]">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040a1a] text-white px-6">
          <div className="relative h-12 w-48 mb-8 animate-pulse">
            <Image
              src="/logobeyaz.png"
              alt="ROTAYD Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="w-64 max-w-xs h-1.5 bg-[#0b1938] rounded-full overflow-hidden mb-4 border border-[#d4af37]/20">
            <div
              className="h-full bg-gradient-to-r from-[#b89025] via-[#d4af37] to-[#faecc0] transition-all duration-150 rounded-full"
              style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
            />
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-[#d4af37]">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Deneyim Yükleniyor... {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%</span>
          </div>
        </div>
      )}

      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#040a1a]">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        {/* Ambient Top & Bottom Vignette Overlays */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#040a1a] via-[#040a1a]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#040a1a] via-[#040a1a]/80 to-transparent pointer-events-none" />

        {/* BEAT A: 0 - 20% (Hero positioned higher up, elegant logo, all white text with gold "Finans & Yönetim") */}
        <motion.div
          style={{ opacity: beatAOpacity, y: beatAY }}
          className="absolute inset-x-0 top-0 pt-20 sm:pt-24 md:pt-28 flex flex-col items-center text-center px-4 sm:px-6 pointer-events-none z-20"
        >
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
            {/* Elegant Minimal Logo */}
            <div className="relative h-10 sm:h-12 w-44 sm:w-56 mx-auto transition-transform">
              <Image
                src="/logobeyaz.png"
                alt="ROTAYD"
                fill
                className="object-contain filter drop-shadow-[0_2px_16px_rgba(212,175,55,0.25)]"
                priority
              />
            </div>

            {/* Headline: ALL crisp white, ONLY "Finans & Yönetim" in gold */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-tight">
              Geleceğin <span className="gold-gradient-text font-serif italic font-normal">Finans & Yönetim</span> Kapısı
            </h1>

            {/* Minimal Subtitle */}
            <p className="max-w-xl mx-auto text-xs sm:text-base text-white/75 font-light tracking-wide">
              Geleceğe yön verebilmek için ROTA&apos;nızı birlikte belirliyoruz.
            </p>
          </div>
        </motion.div>

        {/* Scroll To Explore Indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity, y: scrollIndicatorY }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none z-20"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#faecc0]/80 font-medium">
            Kapıyı Açmak İçin Aşağı Kaydırın
          </span>
          <div className="w-5 h-9 rounded-full border border-[#d4af37]/40 flex items-start justify-center p-1 backdrop-blur-sm bg-black/20">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1 h-2 bg-[#d4af37] rounded-full"
            />
          </div>
        </motion.div>

        {/* BEAT B: 25 - 45% (Left Aligned - Muhasebe Beat - Minimalist Copy) */}
        <motion.div
          style={{ opacity: beatBOpacity, y: beatBY }}
          className="absolute left-6 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 max-w-md z-20 pointer-events-none"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#d4af37]/30 shadow-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Mali Disiplin</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug">
              Stratejik <br />
              <span className="gold-gradient-text font-serif italic">Yönetim Muhasebesi</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Kusursuz vergi optimizasyonu, 360° mali analiz ve kârlılık denetimi.
            </p>

            <div className="pt-1 flex items-center space-x-3 text-xs text-[#faecc0]">
              <span className="px-2.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20">2.6M+ TL SGK Teşviki</span>
              <span className="px-2.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20">%99 Başarı</span>
            </div>
          </div>
        </motion.div>

        {/* BEAT C: 50 - 70% (Right Aligned - Danışmanlık Beat - Minimalist Copy) */}
        <motion.div
          style={{ opacity: beatCOpacity, y: beatCY }}
          className="absolute right-6 sm:right-12 lg:right-24 top-1/2 -translate-y-1/2 max-w-md z-20 pointer-events-none text-right"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#d4af37]/30 shadow-2xl space-y-3 inline-block text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>Kurumsal Büyüme</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug">
              Devlet Teşvikleri & <br />
              <span className="gold-gradient-text font-serif italic">Yönetim Danışmanlığı</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Yatırım teşvik belgeleri, KOSGEB hibeleri ve bakanlık destekleri rehberliği.
            </p>

            <div className="pt-1 flex items-center space-x-3 text-xs text-[#faecc0]">
              <span className="px-2.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20">1.162+ Proje</span>
              <span className="px-2.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20">Bakanlık Hibeleri</span>
            </div>
          </div>
        </motion.div>

        {/* BEAT D: 75 - 100% (THE GRAND OPENING - SPLIT PORTAL) */}
        <motion.div
          style={{ opacity: beatDOpacity, y: beatDY, scale: portalScale }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 sm:px-8 py-12"
        >
          {/* Header prompt */}
          <div className="text-center mb-6 sm:mb-8 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#d4af37]/40 bg-[#071128]/80 backdrop-blur-md mb-2.5">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span className="text-[10px] font-semibold tracking-widest text-[#faecc0] uppercase">
                Kapı Açıldı • Rotanızı Belirleyin
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              Hangi Kanatta <span className="gold-gradient-text font-serif italic">Rehberlik</span> Almak İstersiniz?
            </h2>
          </div>

          {/* DUAL SPLIT PORTAL CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl w-full">
            {/* SOL KAPI: MUHASEBECİLİK */}
            <Link
              href="/muhasebecilik"
              onMouseEnter={() => setHoveredPortal("left")}
              onMouseLeave={() => setHoveredPortal(null)}
              className={`group relative rounded-3xl p-7 transition-all duration-500 overflow-hidden border ${
                hoveredPortal === "left"
                  ? "border-[#d4af37] bg-[#07173e]/90 shadow-[0_0_40px_rgba(212,175,55,0.3)] -translate-y-2 scale-[1.02]"
                  : "border-[#d4af37]/30 bg-[#040f2a]/75 backdrop-blur-xl hover:border-[#d4af37]/70"
              }`}
            >
              <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#1d3b7d]/40 rounded-full blur-3xl pointer-events-none group-hover:bg-[#d4af37]/20 transition-colors" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#0e214d] border border-[#d4af37]/40 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                    <ShieldCheck className="w-5 h-5 text-[#d4af37] group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-2.5 py-0.5 rounded-full border border-[#d4af37]/20">
                    Sol Kanat
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#faecc0] transition-colors">
                    MUHASEBECİLİK
                  </h3>
                  <p className="text-xs text-[#d4af37]/90 font-medium mt-1">
                    Mali Müşavirlik, Vergi & Mali Denetim
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Yönetim Muhasebesi", "SGK Teşvikleri", "Bordrolama", "Vergi"].map((item) => (
                    <span
                      key={item}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold text-white group-hover:text-[#faecc0] transition-colors">
                    <span>Muhasebecilik Sayfasını Aç</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5 text-[#d4af37]" />
                  </div>
                </div>
              </div>
            </Link>

            {/* SAĞ KAPI: DANIŞMANLIK */}
            <Link
              href="/danismanlik"
              onMouseEnter={() => setHoveredPortal("right")}
              onMouseLeave={() => setHoveredPortal(null)}
              className={`group relative rounded-3xl p-7 transition-all duration-500 overflow-hidden border ${
                hoveredPortal === "right"
                  ? "border-[#d4af37] bg-[#07173e]/90 shadow-[0_0_40px_rgba(212,175,55,0.3)] -translate-y-2 scale-[1.02]"
                  : "border-[#d4af37]/30 bg-[#040f2a]/75 backdrop-blur-xl hover:border-[#d4af37]/70"
              }`}
            >
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#1d3b7d]/40 rounded-full blur-3xl pointer-events-none group-hover:bg-[#d4af37]/20 transition-colors" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#0e214d] border border-[#d4af37]/40 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                    <Briefcase className="w-5 h-5 text-[#d4af37] group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-2.5 py-0.5 rounded-full border border-[#d4af37]/20">
                    Sağ Kanat
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#faecc0] transition-colors">
                    DANIŞMANLIK
                  </h3>
                  <p className="text-xs text-[#d4af37]/90 font-medium mt-1">
                    Yönetim Danışmanlığı & Teşvik Destekleri
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Yatırım Teşvik", "KOSGEB", "Kurumsal Gelişim", "Bakanlık"].map((item) => (
                    <span
                      key={item}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold text-white group-hover:text-[#faecc0] transition-colors">
                    <span>Danışmanlık Sayfasını Aç</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5 text-[#d4af37]" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
