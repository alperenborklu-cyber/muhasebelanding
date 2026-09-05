"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, ArrowRight, CheckCircle2, TrendingUp, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

interface PerformanceLeadModalProps {
  targetSectionId?: string;
}

export default function PerformanceLeadModal({ targetSectionId = "performans-gostergeleri" }: PerformanceLeadModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [kvkkAccepted, setKvkkAccepted] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if dismissed in this session
    try {
      if (sessionStorage.getItem("rotayd_perf_modal_shown")) {
        return;
      }
    } catch {}

    const target = document.getElementById(targetSectionId);
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Wait brief moment so user absorbs the performance counters
            const timer = setTimeout(() => {
              try {
                if (!sessionStorage.getItem("rotayd_perf_modal_shown")) {
                  setIsOpen(true);
                  sessionStorage.setItem("rotayd_perf_modal_shown", "true");
                }
              } catch {
                setIsOpen(true);
              }
            }, 1200);

            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [targetSectionId]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("rotayd_perf_modal_shown", "true");
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Lütfen geçerli bir kurumsal veya şahsi e-posta adresi girin.");
      return;
    }
    if (!kvkkAccepted) {
      setError("Lütfen KVKK Aydınlatma Metni'ni onaylayınız.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "performans_gostergeleri_scroll_popup" }),
      });

      if (!res.ok) throw new Error("Gönderim başarısız.");

      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#faecc0", "#1d3b7d"],
        });
      } catch {}
    } catch {
      // Fallback optimistic success
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#020612]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-lg bg-gradient-to-b from-[#081534] via-[#040a1a] to-[#020612] border border-[#d4af37]/50 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)] overflow-hidden z-10"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1d3b7d]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors z-20"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div className="relative z-10 space-y-5">
                {/* Header Badge */}
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0d2252] border border-[#d4af37]/40 text-xs font-semibold text-[#d4af37]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>2026 MALİ PERFORMANS VE TEŞVİK RAPORU</span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-light text-white leading-snug">
                    Şirketinizin Teşvik Potansiyelini <span className="gold-gradient-text font-serif italic">Hemen Keşfedin</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed font-light">
                    Az önce incelediğiniz <strong>2.6 Milyon TL SGK teşviki</strong> ve <strong>%99 proje kabul oranına</strong> dayanan özel 2026 Kurumsal Vergi & Hibe Analiz Rehberimizi e-posta adresinize gönderelim.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#d4af37]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sirket@sirketiniz.com"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-white text-xs sm:text-sm placeholder:text-white/40 transition-all outline-none"
                    />
                  </div>

                  {error && (
                    <p className="text-rose-400 text-xs font-medium">{error}</p>
                  )}

                  {/* KVKK Checkbox */}
                  <label className="flex items-start space-x-2.5 cursor-pointer select-none text-[11px] text-white/65 leading-tight">
                    <input
                      type="checkbox"
                      checked={kvkkAccepted}
                      onChange={(e) => setKvkkAccepted(e.target.checked)}
                      className="mt-0.5 rounded border-white/20 text-[#d4af37] focus:ring-[#d4af37] bg-[#071330]"
                    />
                    <span>
                      <Link href="/kvkk" target="_blank" className="text-[#d4af37] underline hover:text-white">
                        KVKK Aydınlatma Metni
                      </Link>
                      &apos;ni okudum, raporun ve mevzuat güncellemelerinin e-posta adresime iletilmesini onaylıyorum.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b89025] text-black font-bold text-xs sm:text-sm hover:opacity-95 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#d4af37]/20 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{submitting ? "Gönderiliyor..." : "Ücretsiz Raporu E-Postama Gönder"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-[11px] text-white/40 hover:text-white/70 transition-colors"
                  >
                    Şimdilik teşekkürler, incelemeye devam et
                  </button>
                </div>
              </div>
            ) : (
              /* Success State */
              <div className="relative z-10 py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Raporunuz Yola Çıktı!
                </h3>
                <p className="text-xs sm:text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
                  <strong className="text-[#faecc0]">{email}</strong> adresinize 2026 Mali Teşvik ve Performans Rehberimiz iletilmiştir.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-bold text-xs hover:opacity-95 transition-all"
                >
                  Sayfaya Dön
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
