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
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-[#d4af37]/40 shadow-2xl bg-[#040a1a]/95 backdrop-blur-xl relative">
        <button
          onClick={() => handleAccept("necessary")}
          className="absolute top-3 right-3 text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start space-x-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-[#071330] border border-[#d4af37]/40 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-[#d4af37]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Çerez ve Gizlilik Tercihleri</h4>
            <p className="text-xs text-white/70 mt-1 leading-relaxed">
              Deneyiminizi optimize etmek, site trafiğini analiz etmek ve güvenliğinizi sağlamak için çerezleri kullanıyoruz.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] text-[#d4af37] mb-4">
          <Link href="/cerez-politikasi" className="underline hover:text-white transition-colors">
            Çerez Politikası
          </Link>
          <span>•</span>
          <Link href="/kvkk" className="underline hover:text-white transition-colors">
            KVKK Aydınlatma Metni
          </Link>
        </div>

        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={() => handleAccept("all")}
            className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-semibold text-xs hover:opacity-95 transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-[#d4af37]/15"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Tümünü Kabul Et</span>
          </button>
          <button
            onClick={() => handleAccept("necessary")}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-xs font-medium transition-colors"
          >
            Sadece Zorunlular
          </button>
        </div>
      </div>
    </div>
  );
}
