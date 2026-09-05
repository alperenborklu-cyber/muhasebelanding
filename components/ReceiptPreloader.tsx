"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Scissors, CheckCircle2 } from "lucide-react";

export default function ReceiptPreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCut, setIsCut] = useState(false);

  useEffect(() => {
    // Check if user has already seen preloader in this session (optional: allow fresh look)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate smoothly
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 85 && !isCut) {
      setIsCut(true);
    }
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [progress, isCut]);

  const getStatusText = () => {
    if (progress < 30) return "Mali Kayıtlar & Sistemler Başlatılıyor...";
    if (progress < 60) return "E-Fatura & SGK Teşvik Verileri Hesaplanıyor...";
    if (progress < 90) return "Fatura Düzenleniyor & Fiş Kesiliyor...";
    return "Mali Mimarınız Hazır. Hoş Geldiniz.";
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020612] text-white select-none overflow-hidden"
        >
          {/* Ambient Golden Radial Glow Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1d3b7d]/20 rounded-full blur-[100px] pointer-events-none" />

          {/* Machine Dispenser Frame (Navy & Metallic Gold) */}
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
            {/* Top Dispenser Header Slot */}
            <div className="w-64 sm:w-72 h-7 bg-gradient-to-r from-[#0a1838] via-[#142858] to-[#0a1838] rounded-t-xl border-t border-x border-[#d4af37]/60 shadow-xl flex items-center justify-between px-4">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
                <span className="text-[9px] font-mono tracking-widest text-[#d4af37] uppercase font-bold">ROTAYD POS</span>
              </div>
              <div className="flex items-center space-x-1 text-[8px] font-mono text-[#faecc0]/80">
                <span>E-FATURA</span>
              </div>
            </div>

            {/* Golden Slot Edge */}
            <div className="w-64 sm:w-72 h-2.5 bg-gradient-to-b from-[#03091a] to-[#020612] border-b border-[#d4af37]/80 shadow-[0_4px_15px_rgba(212,175,55,0.3)] relative z-20 overflow-hidden flex items-center justify-center">
              <motion.div
                className="w-full h-full bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
            </div>

            {/* Receipt / Invoice Paper Dispensing */}
            <div className="relative w-56 sm:w-64 overflow-visible -mt-0.5">
              {/* Animated Guillotine Cutting Blade */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={isCut ? { x: ["-10%", "110%"], opacity: [0, 1, 1, 0] } : {}}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                className="absolute -top-1 left-0 right-0 z-30 pointer-events-none flex items-center space-x-1"
              >
                <div className="h-0.5 w-full bg-gradient-to-r from-[#d4af37] via-[#fff] to-[#d4af37] shadow-[0_0_12px_#d4af37]" />
                <Scissors className="w-4 h-4 text-[#faecc0] -rotate-90 filter drop-shadow-[0_0_8px_#d4af37]" />
              </motion.div>

              {/* Receipt Body */}
              <motion.div
                initial={{ y: -160, opacity: 0.2 }}
                animate={{
                  y: isCut ? 8 : 0,
                  opacity: 1,
                  rotate: isCut ? [0, -1, 1, 0] : 0,
                }}
                transition={{
                  y: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                  rotate: { duration: 0.5, delay: 1 },
                }}
                className="bg-gradient-to-b from-[#071330] via-[#091b42] to-[#05112e] text-white p-5 rounded-b-xl border border-[#d4af37]/50 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)] relative"
              >
                {/* Sawtooth / Perforated Edge Top */}
                <div className="absolute -top-1.5 inset-x-0 h-1.5 flex justify-between overflow-hidden opacity-80">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 bg-[#020612] rotate-45 transform -translate-y-1 inline-block border-b border-r border-[#d4af37]/30"
                    />
                  ))}
                </div>

                {/* Receipt Content */}
                <div className="text-center pt-2 pb-3 border-b border-dashed border-[#d4af37]/40 space-y-1">
                  <div className="inline-flex items-center justify-center space-x-1 text-[#d4af37]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="font-serif tracking-[0.2em] font-bold text-sm text-white">ROTAYD</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[9px] font-mono text-[#faecc0]/80 tracking-wider">
                    MALİ MÜŞAVİRLİK & YÖNETİM DANIŞMANLIĞI
                  </p>
                  <p className="text-[8px] text-white/50 font-mono">
                    SMMM SÜLEYMAN İLHAN • ANKARA
                  </p>
                </div>

                {/* Line Items */}
                <div className="py-3 space-y-1.5 text-[10px] font-mono border-b border-dashed border-[#d4af37]/40">
                  <div className="flex justify-between text-white/80">
                    <span>HİZMET:</span>
                    <span className="text-white font-semibold">Mali Müşavirlik</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>SGK TEŞVİK KAZANIM:</span>
                    <span className="text-[#d4af37] font-bold">2.600.000 TL</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>PROJE BAŞARI:</span>
                    <span className="text-[#d4af37] font-bold">%99</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>DURUM:</span>
                    <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-2.5 h-2.5 inline" />
                      <span>ONAYLANDI</span>
                    </span>
                  </div>
                </div>

                {/* Barcode & Perforation Simulation */}
                <div className="pt-3 flex flex-col items-center space-y-1.5">
                  <div className="flex items-center justify-center space-x-[2px] h-6 w-full opacity-70">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 1, 4, 3, 1, 2, 4, 2, 1, 3, 2, 4, 1].map((w, idx) => (
                      <span
                        key={idx}
                        className="bg-[#d4af37] h-full inline-block"
                        style={{ width: `${w}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono tracking-widest text-white/50">
                    TR-2026-ROTAYD-06
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Progress Bar & Typography */}
            <div className="w-full max-w-[280px] mt-8 text-center space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/60 text-[11px] truncate pr-2">{getStatusText()}</span>
                <span className="text-[#d4af37] font-bold shrink-0">{progress}%</span>
              </div>

              {/* Gold Progress Track */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#b89025] via-[#d4af37] to-[#faecc0] rounded-full shadow-[0_0_8px_#d4af37]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              <div className="flex items-center justify-center space-x-2 pt-1 text-[10px] tracking-widest text-[#faecc0]/60 uppercase font-mono">
                <span>Konutkent Suit Tower</span>
                <span>•</span>
                <span>Ankara</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
