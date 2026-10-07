"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredPortal, setHoveredPortal] = useState<"left" | "right" | null>(null);
  const [hoveredDoor, setHoveredDoor] = useState<"left" | "right" | null>(null);
  const [openingDoor, setOpeningDoor] = useState<"left" | "right" | null>(null);
  const isOpeningAnimRef = useRef(false);
  const [scrollProgressVal, setScrollProgressVal] = useState(0);
  const [doorLayout, setDoorLayout] = useState<{
    drawX: number;
    drawY: number;
    drawW: number;
    drawH: number;
  } | null>(null);

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

  // Preload frames with immediate initial readiness
  useEffect(() => {
    let isCancelled = false;
    const loadedImgs: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `/sequence/frame_${i}.webp`;
      img.onload = () => {
        if (isCancelled) return;
        setLoadedCount((prev) => prev + 1);
        if (i === 0) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        setLoadedCount((prev) => prev + 1);
      };
      loadedImgs.push(img);
    }

    setImages(loadedImgs);

    // If frame 0 is already cached
    if (loadedImgs[0]?.complete && loadedImgs[0].naturalWidth > 0) {
      setIsLoaded(true);
    }

    // Safety fallback - activate canvas within 200ms
    const fallbackTimer = setTimeout(() => {
      if (!isCancelled) {
        setIsLoaded(true);
      }
    }, 200);

    return () => {
      isCancelled = true;
      clearTimeout(fallbackTimer);
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

    let img = images[frameIndex];
    // If target frame hasn't finished loading yet, pick the nearest available frame so canvas never flickers
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < images.length; offset++) {
        const lower = frameIndex - offset;
        if (lower >= 0 && images[lower]?.complete && images[lower].naturalWidth > 0) {
          img = images[lower];
          break;
        }
        const higher = frameIndex + offset;
        if (higher < images.length && images[higher]?.complete && images[higher].naturalWidth > 0) {
          img = images[higher];
          break;
        }
      }
    }
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

    // Responsive contain / cover scaling with natural proportions
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = clientWidth / clientHeight;

    const baseScale = 1.0;
    const downwardOffset = 0;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (canvasRatio > imgRatio) {
      drawW = clientWidth * baseScale;
      drawH = drawW / imgRatio;
      drawX = (clientWidth - drawW) / 2;
      drawY = (clientHeight - drawH) / 2 + downwardOffset;
    } else {
      drawH = clientHeight * baseScale;
      drawW = drawH * imgRatio;
      drawX = (clientWidth - drawW) / 2;
      drawY = (clientHeight - drawH) / 2 + downwardOffset;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Deep luxury navy ambient vignette blend centered on the shifted door
    const vignetteCenterY = clientHeight / 2;
    const gradient = ctx.createRadialGradient(
      clientWidth / 2,
      vignetteCenterY,
      Math.min(clientWidth, clientHeight) * 0.35,
      clientWidth / 2,
      vignetteCenterY,
      Math.max(clientWidth, clientHeight) * 0.72
    );
    gradient.addColorStop(0, "rgba(4, 10, 26, 0)");
    gradient.addColorStop(0.68, "rgba(4, 10, 26, 0.45)");
    gradient.addColorStop(1, "rgba(4, 10, 26, 0.95)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, clientWidth, clientHeight);

    ctx.restore();
  }, [images]);

  // Measure canvas and calculate image draw bounds for overlay positioning
  const updateLayout = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const clientWidth = canvas.clientWidth;
    const clientHeight = canvas.clientHeight;
    if (!clientWidth || !clientHeight) return;

    const imgRatio = 1920 / 1080;
    const canvasRatio = clientWidth / clientHeight;
    const baseScale = 1.0;
    const downwardOffset = 0;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (canvasRatio > imgRatio) {
      drawW = clientWidth * baseScale;
      drawH = drawW / imgRatio;
      drawX = (clientWidth - drawW) / 2;
      drawY = (clientHeight - drawH) / 2 + downwardOffset;
    } else {
      drawH = clientHeight * baseScale;
      drawW = drawH * imgRatio;
      drawX = (clientWidth - drawW) / 2;
      drawY = (clientHeight - drawH) / 2 + downwardOffset;
    }

    setDoorLayout({ drawX, drawY, drawW, drawH });
  }, []);

  // Hook render loop to smoothed scroll progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (!isOpeningAnimRef.current) {
        setScrollProgressVal(latest);
        renderFrame(latest);
      }
    });

    if (isLoaded && !isOpeningAnimRef.current) {
      renderFrame(smoothProgress.get());
      updateLayout();
    }

    return () => unsubscribe();
  }, [smoothProgress, isLoaded, renderFrame, updateLayout]);

  // Handle interactive door selection & cinematic door opening animation
  const handleDoorSelect = useCallback(
    (door: "left" | "right", e: React.MouseEvent) => {
      e.preventDefault();
      if (isOpeningAnimRef.current) return;
      isOpeningAnimRef.current = true;
      setOpeningDoor(door);
      setHoveredDoor(null);

      const destination = door === "left" ? "/muhasebecilik" : "/danismanlik";
      const startProgress = smoothProgress.get();
      const targetProgress = 0.65; // Frame ~78: doors wide open, traveling forward into dark portal
      const duration = 1200; // ms
      const startTime = performance.now();

      const animateStep = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        // Smooth cubic ease out curve
        const ease = 1 - Math.pow(1 - t, 3);
        const currentProgress = startProgress + (targetProgress - startProgress) * ease;

        renderFrame(currentProgress);

        if (t < 1) {
          requestAnimationFrame(animateStep);
        } else {
          router.push(destination);
        }
      };

      requestAnimationFrame(animateStep);
    },
    [smoothProgress, renderFrame, router]
  );

  // Resize listener & observer
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        renderFrame(smoothProgress.get());
        updateLayout();
      }
    };
    window.addEventListener("resize", handleResize);

    const canvas = canvasRef.current;
    let ro: ResizeObserver | null = null;
    if (canvas && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        handleResize();
      });
      ro.observe(canvas);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (ro) ro.disconnect();
    };
  }, [isLoaded, smoothProgress, renderFrame, updateLayout]);

  // Beat A: 0% -> 20% (Pure White Typography in Bottom-Left corner)
  const beatAOpacity = useTransform(smoothProgress, [0, 0.02, 0.16, 0.22], [1, 1, 0.9, 0]);
  const beatAY = useTransform(smoothProgress, [0, 0.2], [0, -20]);

  // Beat B: 24% -> 46% (Left aligned)
  const beatBOpacity = useTransform(smoothProgress, [0.24, 0.28, 0.42, 0.47], [0, 1, 1, 0]);
  const beatBY = useTransform(smoothProgress, [0.24, 0.28, 0.42, 0.47], [30, 0, 0, -30]);

  // Beat C: 49% -> 70% (Right aligned)
  const beatCOpacity = useTransform(smoothProgress, [0.49, 0.53, 0.67, 0.72], [0, 1, 1, 0]);
  const beatCY = useTransform(smoothProgress, [0.49, 0.53, 0.67, 0.72], [30, 0, 0, -30]);

  // Beat D: 74% -> 100% (The Grand Opening - Split Portal Cards)
  const beatDOpacity = useTransform(smoothProgress, [0.73, 0.8, 1], [0, 1, 1]);
  const beatDY = useTransform(smoothProgress, [0.73, 0.82], [40, 0]);
  const portalScale = useTransform(smoothProgress, [0.73, 0.85], [0.94, 1]);

  // Interactive Door Hover Opacity (active during Beat A, fades as door opens)
  const doorHoverOpacity = useTransform(smoothProgress, [0, 0.02, 0.16, 0.22], [1, 1, 0.9, 0]);
  const beatDPointerEvents = useTransform(smoothProgress, (v) => (v > 0.73 ? "auto" : "none"));
  const isDoorInteractive = isLoaded && scrollProgressVal < 0.20;

  return (
    <div id="canvas-door-section" ref={containerRef} className="relative h-[420vh] bg-[#040a1a]">
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#040a1a]">
        {/* Instant Hero First Frame Poster so the door renders with zero delay */}
        <div 
          className="absolute inset-0 bg-[#040a1a] bg-cover bg-center -z-10 opacity-60 pointer-events-none"
          style={{ backgroundImage: "url('/sequence/frame_0.webp')" }}
        />

        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: isLoaded ? 1 : 0.8 }}
        />

        {/* Ambient Top & Bottom Vignette Overlays */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#040a1a] via-[#040a1a]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#040a1a] via-[#040a1a]/80 to-transparent pointer-events-none" />

        {/* Interactive Door Wings Overlay (Beat A: Mouse Hover Effect) */}
        {doorLayout && isLoaded && (
          <motion.div
            style={{
              opacity: openingDoor ? 0 : doorHoverOpacity,
              pointerEvents: openingDoor ? "none" : (isDoorInteractive ? "auto" : "none"),
              display: scrollProgressVal < 0.22 ? "block" : "none",
            }}
            className="absolute inset-0 z-40 transition-opacity duration-300"
          >
            <div
              style={{
                position: "absolute",
                left: `${doorLayout.drawX}px`,
                top: `${doorLayout.drawY}px`,
                width: `${doorLayout.drawW}px`,
                height: `${doorLayout.drawH}px`,
              }}
              className="pointer-events-none relative"
            >
              {/* SOL KAPI LINK (MALİ MÜŞAVİRLİK) */}
              <Link
                href="/muhasebecilik"
                onClick={(e) => handleDoorSelect("left", e)}
                onMouseEnter={() => !openingDoor && setHoveredDoor("left")}
                onMouseLeave={() => !openingDoor && setHoveredDoor(null)}
                style={{
                  position: "absolute",
                  left: `${(596 / 1920) * 100}%`,
                  top: `${(70 / 1080) * 100}%`,
                  width: `${(364 / 1920) * 100}%`,
                  height: `${(875 / 1080) * 100}%`,
                }}
                className={`door-link-left group pointer-events-auto cursor-pointer block focus:outline-none ${
                  openingDoor ? "pointer-events-none" : ""
                }`}
                aria-label="Mali Müşavirlik Kapısı"
              >
                {/* SVG for Rectangular Door Shape */}
                <svg
                  viewBox="0 0 364 875"
                  className="w-full h-full overflow-visible pointer-events-none"
                >
                  <rect
                    x="0"
                    y="0"
                    width="364"
                    height="875"
                    rx="4"
                    style={{
                      fill: hoveredDoor === "left" && !openingDoor ? "rgba(0, 0, 0, 0.50)" : "transparent",
                      stroke: hoveredDoor === "left" && !openingDoor ? "rgba(0, 0, 0, 0.80)" : "transparent",
                      strokeWidth: hoveredDoor === "left" && !openingDoor ? 2 : 0,
                    }}
                    className={`door-wing-left transition-all duration-300 ease-out fill-transparent stroke-transparent group-hover:!fill-[rgba(0,0,0,0.50)] group-hover:!stroke-[rgba(0,0,0,0.80)] group-hover:!stroke-[2px] [filter:drop-shadow(0_0_16px_rgba(0,0,0,0.75))] ${
                      hoveredDoor === "left" && !openingDoor ? "is-hovered !fill-[rgba(0,0,0,0.50)] !stroke-[rgba(0,0,0,0.80)] !stroke-[2px]" : ""
                    }`}
                  />
                </svg>

                {/* Sol Kapı Çubuğu (Mali Müşavirlik Bar) */}
                <div
                  className={`door-bar-left absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 ${
                    hoveredDoor === "left" && !openingDoor ? "is-hovered !opacity-100" : ""
                  }`}
                >
                  <div className="flex items-center space-x-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#040a1a]/95 backdrop-blur-md border border-white/30 shadow-[0_0_25px_rgba(0,0,0,0.9)] whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
                    <span className="text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase select-none">
                      MALİ MÜŞAVİRLİK
                    </span>
                  </div>
                </div>
              </Link>

              {/* SAĞ KAPI LINK (HİBE TEŞVİK DANIŞMANLIĞI) */}
              <Link
                href="/danismanlik"
                onClick={(e) => handleDoorSelect("right", e)}
                onMouseEnter={() => !openingDoor && setHoveredDoor("right")}
                onMouseLeave={() => !openingDoor && setHoveredDoor(null)}
                style={{
                  position: "absolute",
                  left: `${(960 / 1920) * 100}%`,
                  top: `${(70 / 1080) * 100}%`,
                  width: `${(364 / 1920) * 100}%`,
                  height: `${(875 / 1080) * 100}%`,
                }}
                className={`door-link-right group pointer-events-auto cursor-pointer block focus:outline-none ${
                  openingDoor ? "pointer-events-none" : ""
                }`}
                aria-label="Hibe Teşvik Danışmanlığı Kapısı"
              >
                {/* SVG for Rectangular Door Shape */}
                <svg
                  viewBox="0 0 364 875"
                  className="w-full h-full overflow-visible pointer-events-none"
                >
                  <rect
                    x="0"
                    y="0"
                    width="364"
                    height="875"
                    rx="4"
                    style={{
                      fill: hoveredDoor === "right" && !openingDoor ? "rgba(0, 0, 0, 0.50)" : "transparent",
                      stroke: hoveredDoor === "right" && !openingDoor ? "rgba(0, 0, 0, 0.80)" : "transparent",
                      strokeWidth: hoveredDoor === "right" && !openingDoor ? 2 : 0,
                    }}
                    className={`door-wing-right transition-all duration-300 ease-out fill-transparent stroke-transparent group-hover:!fill-[rgba(0,0,0,0.50)] group-hover:!stroke-[rgba(0,0,0,0.80)] group-hover:!stroke-[2px] [filter:drop-shadow(0_0_16px_rgba(0,0,0,0.75))] ${
                      hoveredDoor === "right" && !openingDoor ? "is-hovered !fill-[rgba(0,0,0,0.50)] !stroke-[rgba(0,0,0,0.80)] !stroke-[2px]" : ""
                    }`}
                  />
                </svg>

                {/* Sağ Kapı Çubuğu (Hibe Teşvik Danışmanlığı Bar) */}
                <div
                  className={`door-bar-right absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 ${
                    hoveredDoor === "right" && !openingDoor ? "is-hovered !opacity-100" : ""
                  }`}
                >
                  <div className="flex items-center space-x-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#040a1a]/95 backdrop-blur-md border border-white/30 shadow-[0_0_25px_rgba(0,0,0,0.9)] whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
                    <span className="text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase select-none">
                      HİBE TEŞVİK DANIŞMANLIĞI
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        )}

        {/* BEAT A: 0 - 20% (Pure White Typography in Bottom-Left corner, Exactly Like Reference Image) */}
        <motion.div
          style={{ opacity: beatAOpacity, y: beatAY }}
          className="absolute bottom-8 sm:bottom-12 md:bottom-14 left-6 sm:left-10 md:left-14 lg:left-16 pointer-events-none z-20"
        >
          <h1 id="canvas-hero-title" className="text-2xl sm:text-3xl md:text-4xl tracking-tight text-white filter drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] flex flex-wrap items-baseline gap-x-2.5 gap-y-1 uppercase">
            <span className="font-extrabold text-white tracking-wide">DOĞRU ROTA</span>
            <span className="font-light text-white/90 tracking-wide">GÜÇLÜ İŞLETME</span>
          </h1>
        </motion.div>

        {/* BEAT B: 25 - 45% (Left Aligned - Mali Müşavirlik Beat) */}
        <motion.div
          style={{ opacity: beatBOpacity, y: beatBY }}
          className="absolute left-6 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 max-w-md z-20 pointer-events-none"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-white/90 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Mali Disiplin</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug">
              Stratejik <br />
              <span className="font-bold text-white tracking-wide">Mali Müşavirlik</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Kusursuz vergi optimizasyonu, 360° mali analiz ve kârlılık denetimi.
            </p>

            <div className="pt-1 flex items-center space-x-3 text-xs text-white/80">
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20">2.6M+ TL SGK Teşviki</span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20">%99 Başarı</span>
            </div>
          </div>
        </motion.div>

        {/* BEAT C: 50 - 70% (Right Aligned - Hibe Teşvik Beat) */}
        <motion.div
          style={{ opacity: beatCOpacity, y: beatCY }}
          className="absolute right-6 sm:right-12 lg:right-24 top-1/2 -translate-y-1/2 max-w-md z-20 pointer-events-none text-right"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl space-y-3 inline-block text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-white/90 uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-white" />
              <span>Devlet Destekleri</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug">
              Hibe Teşvik &amp; <br />
              <span className="font-bold text-white tracking-wide">Yönetim Danışmanlığı</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Yatırım teşvik belgeleri, KOSGEB hibeleri ve bakanlık destekleri rehberliği.
            </p>

            <div className="pt-1 flex items-center space-x-3 text-xs text-white/80">
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20">1.162+ Proje</span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20">Bakanlık Hibeleri</span>
            </div>
          </div>
        </motion.div>

        {/* BEAT D: 75 - 100% (THE GRAND OPENING - SPLIT PORTAL) */}
        <motion.div
          style={{
            opacity: beatDOpacity,
            y: beatDY,
            scale: portalScale,
            display: scrollProgressVal > 0.70 ? "flex" : "none",
            pointerEvents: scrollProgressVal > 0.73 ? "auto" : "none",
          }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 sm:px-8 py-12 pointer-events-none"
        >
          <div className="text-center mb-6 sm:mb-8 max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              Hangi Kanatta <span className="font-bold text-white tracking-wide">Rehberlik</span> Almak İstersiniz?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl w-full">
            {/* SOL KAPI: MALİ MÜŞAVİRLİK */}
            <Link
              href="/muhasebecilik"
              onMouseEnter={() => setHoveredPortal("left")}
              onMouseLeave={() => setHoveredPortal(null)}
              className={`group pointer-events-auto relative rounded-3xl p-7 transition-all duration-500 overflow-hidden border ${
                hoveredPortal === "left"
                  ? "border-white/60 bg-[#07173e]/90 shadow-[0_0_40px_rgba(255,255,255,0.15)] -translate-y-2 scale-[1.02]"
                  : "border-white/20 bg-[#040f2a]/75 backdrop-blur-xl hover:border-white/50"
              }`}
            >
              <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#1d3b7d]/40 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#0e214d] border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ShieldCheck className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-white transition-colors">
                    MALİ MÜŞAVİRLİK
                  </h3>
                  <p className="text-xs text-white/70 font-medium mt-1">
                    Stratejik Yönetim Muhasebesi, Vergi &amp; Mali Denetim
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
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold text-white group-hover:text-white transition-colors">
                    <span>Mali Müşavirlik Sayfasını Aç</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5 text-white" />
                  </div>
                </div>
              </div>
            </Link>

            {/* SAĞ KAPI: HİBE TEŞVİK DANIŞMANLIĞI */}
            <Link
              href="/danismanlik"
              onMouseEnter={() => setHoveredPortal("right")}
              onMouseLeave={() => setHoveredPortal(null)}
              className={`group pointer-events-auto relative rounded-3xl p-7 transition-all duration-500 overflow-hidden border ${
                hoveredPortal === "right"
                  ? "border-white/60 bg-[#07173e]/90 shadow-[0_0_40px_rgba(255,255,255,0.15)] -translate-y-2 scale-[1.02]"
                  : "border-white/20 bg-[#040f2a]/75 backdrop-blur-xl hover:border-white/50"
              }`}
            >
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#1d3b7d]/40 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#0e214d] border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Briefcase className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-white transition-colors">
                    HİBE TEŞVİK DANIŞMANLIĞI
                  </h3>
                  <p className="text-xs text-white/70 font-medium mt-1">
                    Devlet Destekleri, Yatırım Teşvikleri &amp; Hibe Programları
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
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold text-white group-hover:text-white transition-colors">
                    <span>Hibe Teşvik Danışmanlığı Sayfasını Aç</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Cinematic Door Opening Transition Screen */}
        {openingDoor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.35 }}
            className="fixed inset-0 z-50 bg-[#040a1a]/95 flex flex-col items-center justify-center pointer-events-none backdrop-blur-sm"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-white/20" />
                <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin" />
              </div>
              <p className="text-sm font-medium tracking-widest text-white/90 uppercase">
                {openingDoor === "left" ? "Mali Müşavirlik Kapısı Açılıyor..." : "Hibe Teşvik Danışmanlığı Kapısı Açılıyor..."}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
