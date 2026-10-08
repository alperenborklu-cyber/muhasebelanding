"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Phone, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Briefcase, 
  BookOpen,
  Sun,
  Moon,
  Building2,
  MessageSquare,
  Users
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/?nav=${sectionId}`;
    }
  };
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/") {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#040a1a]/90 backdrop-blur-xl border-b border-[#d4af37]/20 py-3 shadow-2xl shadow-black/60"
          : "bg-transparent py-5"
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Links to Home */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <div className="relative h-9 w-[106px] sm:h-10 sm:w-[118px] transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src={theme === "light" ? "/logo.webp" : "/logobeyaz.webp"}
                alt="ROTAYD Mali Müşavirlik ve Yönetim Danışmanlığı"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1.5 2xl:space-x-2.5">
            <Link
              href="/muhasebecilik"
              className={`whitespace-nowrap flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all flex items-center space-x-1.5 ${
                pathname.startsWith("/muhasebe")
                  ? "text-white bg-[#0f214a] border border-[#d4af37]/40 shadow-sm shadow-[#d4af37]/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
              <span className="whitespace-nowrap">Mali Müşavirlik</span>
            </Link>

            <Link
              href="/danismanlik"
              className={`whitespace-nowrap flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all flex items-center space-x-1.5 ${
                pathname === "/danismanlik"
                  ? "text-white bg-[#0f214a] border border-[#d4af37]/40 shadow-sm shadow-[#d4af37]/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
              <span className="whitespace-nowrap">Danışmanlık</span>
            </Link>

            <Link
              href="/hakkimizda"
              className={`whitespace-nowrap flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all flex items-center space-x-1.5 ${
                pathname === "/hakkimizda"
                  ? "text-white bg-[#0f214a] border border-[#d4af37]/40 shadow-sm shadow-[#d4af37]/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
              <span className="whitespace-nowrap">Hakkımızda</span>
            </Link>

            <button
              type="button"
              onClick={() => scrollToSection("referanslar")}
              className="whitespace-nowrap flex-shrink-0 px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
              <span className="whitespace-nowrap">Referanslar</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="whitespace-nowrap flex-shrink-0 px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
              <span className="whitespace-nowrap">İletişim</span>
            </button>

            <Link
              href="/portal"
              className={`whitespace-nowrap flex-shrink-0 px-4 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                pathname.startsWith("/portal")
                  ? "text-black bg-gradient-to-r from-[#e5c158] to-[#c59b27] shadow-md shadow-[#c59b27]/30"
                  : "text-[#c59b27] hover:text-white bg-[#c59b27]/15 hover:bg-[#c59b27]/25 border border-[#c59b27]/40"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c59b27] flex-shrink-0" />
              <span className="whitespace-nowrap">Mükellef Portalı</span>
            </Link>
          </nav>

          {/* Quick Contact & Theme Toggle */}
          <div className="hidden sm:flex items-center space-x-3 flex-shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-white/10 hover:border-[#d4af37]/50 bg-white/5 hover:bg-white/10 text-white transition-all shadow-sm flex items-center justify-center flex-shrink-0"
              aria-label="Temayı Değiştir"
              title={theme === "dark" ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#d4af37] animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-[#07173e]" />
              )}
            </button>

            <a
              href="tel:05536221122"
              className="phone-nav-btn whitespace-nowrap flex-shrink-0 flex items-center space-x-1.5 text-xs xl:text-sm text-white/80 hover:text-[#d4af37] transition-colors py-1.5 px-3.5 rounded-full border border-white/10 hover:border-[#d4af37]/40 bg-[#071128]/50"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
              <span className="font-semibold tracking-wide whitespace-nowrap">0553 622 11 22</span>
            </a>

            <a
              href="https://wa.me/905536221122"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-full p-px text-xs xl:text-sm font-semibold whitespace-nowrap flex-shrink-0"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#b89025] transition-all duration-300 group-hover:opacity-90" />
              <span className="relative flex items-center space-x-1.5 rounded-full bg-[#040a1a] px-3.5 py-1.5 text-white transition-all duration-300 group-hover:bg-opacity-80 whitespace-nowrap">
                <span className="whitespace-nowrap">Hızlı İletişim</span>
                <ArrowRight className="w-3 h-3 text-[#d4af37] transition-transform group-hover:translate-x-0.5 flex-shrink-0" />
              </span>
            </a>
          </div>

          {/* Mobile menu toggle & Theme toggle on mobile */}
          <div className="xl:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-white/10 bg-white/5 text-white transition-all"
              aria-label="Temayı Değiştir"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-[#d4af37]" /> : <Moon className="w-4 h-4 text-[#07173e]" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-white/80 hover:text-white focus:outline-none"
              aria-label="Menüyü Aç"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 rounded-2xl bg-[#06112c]/95 border border-[#d4af37]/20 p-5 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col space-y-2.5">
              <Link
                href="/muhasebecilik"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium py-2 px-3 rounded-lg text-white/90 hover:bg-white/5 flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>Mali Müşavirlik</span>
                </span>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </Link>
              <Link
                href="/danismanlik"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium py-2 px-3 rounded-lg text-white/90 hover:bg-white/5 flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-[#d4af37]" />
                  <span>Yönetim Danışmanlığı & Teşvikler</span>
                </span>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </Link>
              <Link
                href="/hakkimizda"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium py-2 px-3 rounded-lg text-white/90 hover:bg-white/5 flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#d4af37]" />
                  <span>Hakkımızda (Süleyman İlhan)</span>
                </span>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection("referanslar")}
                className="w-full text-left text-sm font-medium py-2 px-3 rounded-lg text-white/90 hover:bg-white/5 flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Referanslar</span>
                </span>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="w-full text-left text-sm font-medium py-2 px-3 rounded-lg text-white/90 hover:bg-white/5 flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-[#d4af37]" />
                  <span>İletişim & Lokasyon</span>
                </span>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </button>

              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold py-2.5 px-3 rounded-lg text-[#c59b27] bg-[#c59b27]/15 border border-[#c59b27]/30 hover:bg-[#c59b27]/25 flex items-center justify-between transition-colors"
              >
                <span className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>Mükellef Portalı (Fiş &amp; Fatura)</span>
                </span>
                <ArrowRight className="w-4 h-4 text-[#d4af37]" />
              </Link>

              <div className="pt-3 border-t border-white/10 flex flex-col space-y-2">
                <a
                  href="tel:05536221122"
                  className="phone-nav-btn flex items-center justify-center space-x-2 py-2 rounded-xl bg-white/5 text-sm font-medium text-white"
                >
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  <span>0553 622 11 22</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
