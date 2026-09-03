"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ArrowRight, ShieldCheck, Briefcase, BookOpen } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#040a1a]/90 backdrop-blur-xl border-b border-[#d4af37]/20 py-3 shadow-2xl shadow-black/60"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-9 w-40 sm:h-10 sm:w-44 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/logobeyaz.png"
                alt="ROTAYD"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              href="/muhasebecilik"
              className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all flex items-center space-x-1.5 ${
                pathname.startsWith("/muhasebe")
                  ? "text-white bg-[#0f214a] border border-[#d4af37]/40 shadow-sm shadow-[#d4af37]/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Muhasebecilik</span>
            </Link>

            <Link
              href="/danismanlik"
              className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all flex items-center space-x-1.5 ${
                pathname === "/danismanlik"
                  ? "text-white bg-[#0f214a] border border-[#d4af37]/40 shadow-sm shadow-[#d4af37]/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Danışmanlık</span>
            </Link>

            <Link
              href="/blog"
              className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all flex items-center space-x-1.5 ${
                pathname.startsWith("/blog")
                  ? "text-white bg-[#0f214a] border border-[#d4af37]/40 shadow-sm shadow-[#d4af37]/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Blog & Rehber</span>
            </Link>

            <Link
              href="/#stats"
              className="px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              Rakamlar
            </Link>

            <Link
              href="/#contact"
              className="px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              İletişim
            </Link>
          </nav>

          {/* Quick Contact & Action */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="tel:02582120444"
              className="flex items-center space-x-1.5 text-xs text-white/80 hover:text-[#d4af37] transition-colors py-1.5 px-3 rounded-full border border-white/10 hover:border-[#d4af37]/40 bg-[#071128]/50"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-semibold tracking-wide">0(258) 212 0 444</span>
            </a>

            <a
              href="https://wa.me/905536221122"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-full p-px text-xs font-semibold"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#faecc0] to-[#b89025] transition-all duration-300 group-hover:opacity-90" />
              <span className="relative flex items-center space-x-1.5 rounded-full bg-[#040a1a] px-3.5 py-1.5 text-white transition-all duration-300 group-hover:bg-opacity-80">
                <span>Hızlı İletişim</span>
                <ArrowRight className="w-3 h-3 text-[#d4af37] transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden flex items-center">
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
          <div className="md:hidden mt-3 rounded-2xl bg-[#06112c]/95 border border-[#d4af37]/20 p-5 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col space-y-2.5">
              <Link
                href="/muhasebecilik"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium py-2 px-3 rounded-lg text-white/90 hover:bg-white/5 flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>Muhasebecilik & Mali Müşavirlik</span>
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
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium py-2 px-3 rounded-lg text-white/90 hover:bg-white/5 flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-[#d4af37]" />
                  <span>Mali & Teşvik Rehberi (Blog)</span>
                </span>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </Link>
              <Link
                href="/#stats"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium py-2 px-3 rounded-lg text-white/90 hover:bg-white/5"
              >
                Rakamlarla Rota
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium py-2 px-3 rounded-lg text-white/90 hover:bg-white/5"
              >
                İletişim & Lokasyon
              </Link>

              <div className="pt-3 border-t border-white/10 flex flex-col space-y-2">
                <a
                  href="tel:02582120444"
                  className="flex items-center justify-center space-x-2 py-2 rounded-xl bg-white/5 text-sm font-medium text-white"
                >
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  <span>0(258) 212 0 444</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
