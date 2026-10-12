"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check, Shield } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("rotayd_cookie_consent");
      if (!consent) {
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const handleAccept = (type: "all" | "necessary") => {
    try {
      localStorage.setItem("rotayd_cookie_consent", type);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-full sm:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-[#d4af37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#040a1a]/95 backdrop-blur-xl relative text-center">
        <button
          onClick={() => handleAccept("necessary")}
          className="absolute top-3.5 right-3.5 text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#071330] border border-[#d4af37]/40 flex items-center justify-center mb-2.5 shadow-sm shadow-[#d4af37]/20">
            <Cookie className="w-5 h-5 text-[#d4af37]" />
          </div>
          <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight">
            Çerez ve Gizlilik Tercihleri
          </h4>
          <p className="text-xs text-white/70 mt-1.5 leading-relaxed max-w-md mx-auto">
            Deneyiminizi optimize etmek, site trafiğini analiz etmek ve güvenliğinizi sağlamak için çerezleri kullanıyoruz.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-[11px] text-[#d4af37] mb-4">
          <Link href="/cerez-politikasi" className="underline hover:text-white transition-colors">
            Çerez Politikası
          </Link>
          <span>•</span>
          <Link href="/kvkk" className="underline hover:text-white transition-colors">
            KVKK Aydınlatma Metni
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
          <button
            onClick={() => handleAccept("all")}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-semibold text-xs hover:opacity-95 transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-[#d4af37]/20 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Tümünü Kabul Et</span>
          </button>
          <button
            onClick={() => handleAccept("necessary")}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Sadece Zorunlular
          </button>
        </div>
      </div>
    </div>
  );
}
