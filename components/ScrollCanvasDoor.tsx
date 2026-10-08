"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  ArrowLeft,
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
  const [centerHovered, setCenterHovered] = useState(false);
  const [centerActiveSide, setCenterActiveSide] = useState<"left" | "right" | null>(null);
  const [openingDoor, setOpeningDoor] = useState<"left" | "right" | "center" | null>(null);
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
    (door: "left" | "right" | "center", e: React.MouseEvent) => {
      e.preventDefault();
      if (isOpeningAnimRef.current) return;
      isOpeningAnimRef.current = true;
      setOpeningDoor(door);
      setHoveredDoor(null);

      const destination =
        door === "left"
          ? "/danismanlik"
          : door === "right"
          ? "/muhasebecilik"
          : "/hakkimizda";
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
              {/* SOL KAPI LINK (HİBE TEŞVİK DANIŞMANLIĞI) */}
              <Link
                href="/danismanlik"
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
                className={`door-link-left group pointer-events-auto cursor-pointer block focus:outline-none no-underline border-0 ${
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
                      fill: hoveredDoor === "left" && !openingDoor ? "rgba(4, 10, 26, 0.35)" : "transparent",
                      stroke: "transparent",
                      strokeWidth: 0,
                    }}
                    className={`door-wing-left transition-all duration-300 ease-out fill-transparent stroke-transparent group-hover:!fill-[rgba(4,10,26,0.35)] ${
                      hoveredDoor === "left" && !openingDoor ? "is-hovered !fill-[rgba(4,10,26,0.35)]" : ""
                    }`}
                  />
                </svg>
              </Link>

              {/* SAĞ KAPI LINK (MALİ MÜŞAVİRLİK) */}
              <Link
                href="/muhasebecilik"
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
                className={`door-link-right group pointer-events-auto cursor-pointer block focus:outline-none no-underline border-0 ${
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
                      fill: hoveredDoor === "right" && !openingDoor ? "rgba(4, 10, 26, 0.35)" : "transparent",
                      stroke: "transparent",
                      strokeWidth: 0,
                    }}
                    className={`door-wing-right transition-all duration-300 ease-out fill-transparent stroke-transparent group-hover:!fill-[rgba(4,10,26,0.35)] ${
                      hoveredDoor === "right" && !openingDoor ? "is-hovered !fill-[rgba(4,10,26,0.35)]" : ""
                    }`}
                  />
                </svg>
              </Link>

              {/* ORTADA BOŞLUKLU & ARKAPLANLA BİRLEŞİK LOGOMUZ + GOLDEN OKLAR */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "48%",
                  transform: "translate(-50%, -50%)",
                }}
                className="z-50 pointer-events-auto transition-all duration-300"
                onMouseEnter={() => setCenterHovered(true)}
                onMouseLeave={() => {
                  setCenterHovered(false);
                  setCenterActiveSide(null);
                }}
              >
                <div className="relative group/hub">
                  {/* Dış altın ışıltı aurası */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#c59b27]/0 via-[#c59b27]/25 to-[#c59b27]/0 rounded-full blur-md opacity-70 group-hover/hub:opacity-100 transition-opacity" />

                  {/* Arka planla birleşik, nefes alan cam kapsül */}
                  <div className="relative flex items-center bg-[#040a1a]/85 hover:bg-[#040a1a]/95 backdrop-blur-xl border border-[#c59b27]/40 hover:border-[#c59b27] rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_0_35px_rgba(4,10,26,0.95)] hover:shadow-[0_0_30px_rgba(197,155,39,0.35)] transition-all duration-300">
                    {/* SOL TARAFA GOLDEN OK (TEŞVİK) */}
                    <Link
                      href="/danismanlik"
                      onClick={(e) => handleDoorSelect("left", e)}
                      onMouseEnter={() => {
                        setCenterActiveSide("left");
                      }}
                      onMouseLeave={() => {
                        setCenterActiveSide(null);
                      }}
                      className={`no-underline hover:no-underline focus:no-underline border-0 outline-none decoration-transparent flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                        centerActiveSide === "left"
                          ? "bg-[#dfa929]/25 text-white"
                          : "hover:bg-[#dfa929]/15 text-[#dfa929]"
                      }`}
                      aria-label="Hibe Teşvik Danışmanlığına Git"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#dfa929] group-hover/hub:animate-pulse transition-transform hover:-translate-x-1" />
                      <span className="no-underline hover:no-underline border-0 outline-none text-[11px] sm:text-xs font-bold tracking-wider uppercase select-none text-[#dfa929]">
                        TEŞVİK
                      </span>
                    </Link>

                    {/* ORTADA BOŞLUK & ARKAPLANLA BİRLEŞİK LOGOMUZ */}
                    <div className="flex items-center px-2 sm:px-3">
                      <span className="h-4 w-px bg-[#dfa929]/30 mr-2 sm:mr-3" />
                      <Link
                        href="/hakkimizda"
                        onClick={(e) => handleDoorSelect("center", e)}
                        className={`relative h-6 w-20 sm:h-7 sm:w-24 opacity-95 transition-transform duration-300 hover:scale-105 cursor-pointer block ${
                          openingDoor ? "pointer-events-none" : ""
                        }`}
                        aria-label="ROTAYD Hakkımızda Sayfasına Git"
                      >
                        <Image
                          src="/logobeyaz.webp"
                          alt="ROTAYD Mali Müşavirlik ve Yönetim Danışmanlığı"
                          fill
                          className="object-contain"
                          priority
                        />
                      </Link>
                      <span className="h-4 w-px bg-[#dfa929]/30 ml-2 sm:ml-3" />
                    </div>

                    {/* SAĞ TARAFA GOLDEN OK (MALİ) */}
                    <Link
                      href="/muhasebecilik"
                      onClick={(e) => handleDoorSelect("right", e)}
                      onMouseEnter={() => {
                        setCenterActiveSide("right");
                      }}
                      onMouseLeave={() => {
                        setCenterActiveSide(null);
                      }}
                      className={`no-underline hover:no-underline focus:no-underline border-0 outline-none decoration-transparent flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                        centerActiveSide === "right"
                          ? "bg-[#dfa929]/25 text-white"
                          : "hover:bg-[#dfa929]/15 text-[#dfa929]"
                      }`}
                      aria-label="Mali Müşavirliğe Git"
                    >
                      <span className="no-underline hover:no-underline border-0 outline-none text-[11px] sm:text-xs font-bold tracking-wider uppercase select-none text-[#dfa929]">
                        MALİ
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#dfa929] group-hover/hub:animate-pulse transition-transform hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* BEAT A: 0 - 20% (DOĞRU ROTA & GÜÇLÜ İŞLETME in Pure White) */}
        <motion.div
          style={{ opacity: beatAOpacity, y: beatAY }}
          className="absolute bottom-8 sm:bottom-12 md:bottom-14 left-6 sm:left-10 md:left-14 lg:left-16 pointer-events-none z-20"
        >
          <h1 id="canvas-hero-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight flex flex-col items-start gap-y-0.5 sm:gap-y-1 uppercase">
            <span className="font-extrabold text-white tracking-wide filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">DOĞRU ROTA</span>
            <span className="font-extrabold tracking-wide hero-gold-gradient">GÜÇLÜ İŞLETME</span>
          </h1>
        </motion.div>

        {/* BEAT B: 25 - 45% (Left Aligned - Mali Müşavirlik Beat) */}
        <motion.div
          style={{ opacity: beatBOpacity, y: beatBY }}
          className="absolute left-6 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 max-w-md z-20 pointer-events-none"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#d4af37]/30 shadow-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>Mali Disiplin</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug">
              Stratejik <br />
              <span className="gold-gradient-text font-bold tracking-wide">Mali Müşavirlik</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Kusursuz vergi optimizasyonu, 360° mali analiz ve kârlılık denetimi.
            </p>

            <div className="pt-1 flex items-center space-x-3 text-xs text-[#c59b27]">
              <span className="px-2.5 py-1 rounded-full bg-[#c59b27]/10 border border-[#c59b27]/20">2.6M+ TL SGK Teşviki</span>
              <span className="px-2.5 py-1 rounded-full bg-[#c59b27]/10 border border-[#c59b27]/20">%99 Başarı</span>
            </div>
          </div>
        </motion.div>

        {/* BEAT C: 50 - 70% (Right Aligned - Hibe Teşvik Beat) */}
        <motion.div
          style={{ opacity: beatCOpacity, y: beatCY }}
          className="absolute right-6 sm:right-12 lg:right-24 top-1/2 -translate-y-1/2 max-w-md z-20 pointer-events-none text-right"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#d4af37]/30 shadow-2xl space-y-3 inline-block text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-[#d4af37]" />
              <span>Devlet Destekleri</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug">
              Hibe Teşvik &amp; <br />
              <span className="gold-gradient-text font-bold tracking-wide">Yönetim Danışmanlığı</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Yatırım teşvik belgeleri, KOSGEB hibeleri ve bakanlık destekleri rehberliği.
            </p>

            <div className="pt-1 flex items-center space-x-3 text-xs text-[#c59b27]">
              <span className="px-2.5 py-1 rounded-full bg-[#c59b27]/10 border border-[#c59b27]/20">1.162+ Proje</span>
              <span className="px-2.5 py-1 rounded-full bg-[#c59b27]/10 border border-[#c59b27]/20">Bakanlık Hibeleri</span>
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
              Hangi Kanatta <span className="gold-gradient-text font-bold tracking-wide">Rehberlik</span> Almak İstersiniz?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl w-full">
            {/* SOL KAPI: HİBE TEŞVİK DANIŞMANLIĞI (SOL TARAF TEŞVİK) */}
            <Link
              href="/danismanlik"
              onMouseEnter={() => setHoveredPortal("left")}
              onMouseLeave={() => setHoveredPortal(null)}
              className={`group pointer-events-auto relative rounded-3xl p-7 transition-all duration-500 overflow-hidden border ${
                hoveredPortal === "left"
                  ? "border-[#d4af37] bg-[#07173e]/90 shadow-[0_0_40px_rgba(212,175,55,0.3)] -translate-y-2 scale-[1.02]"
                  : "border-[#d4af37]/30 bg-[#040f2a]/75 backdrop-blur-xl hover:border-[#d4af37]/70"
              }`}
            >
              <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#1d3b7d]/40 rounded-full blur-3xl pointer-events-none group-hover:bg-[#d4af37]/20 transition-colors" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#0e214d] border border-[#d4af37]/40 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                    <Briefcase className="w-5 h-5 text-[#d4af37] group-hover:text-black transition-colors" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#c59b27] transition-colors">
                    HİBE TEŞVİK DANIŞMANLIĞI
                  </h3>
                  <p className="text-xs text-[#d4af37]/90 font-medium mt-1">
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
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold text-white group-hover:text-[#c59b27] transition-colors">
                    <span>Hibe Teşvik Danışmanlığı Sayfasını Aç</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5 text-[#d4af37]" />
                  </div>
                </div>
              </div>
            </Link>

            {/* SAĞ KAPI: MALİ MÜŞAVİRLİK (SAĞ TARAF MALİ) */}
            <Link
              href="/muhasebecilik"
              onMouseEnter={() => setHoveredPortal("right")}
              onMouseLeave={() => setHoveredPortal(null)}
              className={`group pointer-events-auto relative rounded-3xl p-7 transition-all duration-500 overflow-hidden border ${
                hoveredPortal === "right"
                  ? "border-[#d4af37] bg-[#07173e]/90 shadow-[0_0_40px_rgba(212,175,55,0.3)] -translate-y-2 scale-[1.02]"
                  : "border-[#d4af37]/30 bg-[#040f2a]/75 backdrop-blur-xl hover:border-[#d4af37]/70"
              }`}
            >
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#1d3b7d]/40 rounded-full blur-3xl pointer-events-none group-hover:bg-[#d4af37]/20 transition-colors" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#0e214d] border border-[#d4af37]/40 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                    <ShieldCheck className="w-5 h-5 text-[#d4af37] group-hover:text-black transition-colors" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-[#c59b27] transition-colors">
                    MALİ MÜŞAVİRLİK
                  </h3>
                  <p className="text-xs text-[#d4af37]/90 font-medium mt-1">
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
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold text-white group-hover:text-[#c59b27] transition-colors">
                    <span>Mali Müşavirlik Sayfasını Aç</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5 text-[#d4af37]" />
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
                <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/20" />
                <div className="absolute inset-0 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin" />
              </div>
              <p className="text-sm font-medium tracking-widest text-[#c59b27] uppercase">
                {openingDoor === "left"
                  ? "Hibe Teşvik Danışmanlığı Kapısı Açılıyor..."
                  : openingDoor === "right"
                  ? "Mali Müşavirlik Kapısı Açılıyor..."
                  : "Kurumsal Vizyon & Hakkımızda Kapısı Açılıyor..."}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
