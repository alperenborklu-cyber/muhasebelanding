"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-[#020612] text-white/80 border-t border-[#d4af37]/20 pt-16 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#1d3b7d]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 */}
          <div className="space-y-4">
            <Link href="/" className="footer-brand inline-block text-2xl font-black tracking-widest text-white hover:text-[#d4af37] transition-colors">
              ROTAYD
            </Link>
            <p className="text-xs text-white/60 leading-relaxed">
              Mali müşavirlik, stratejik yönetim muhasebesi ve devlet teşvikleri rehberliği.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm border-b border-white/10 pb-2 footer-col-title">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>Mali Müşavirlik</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/malimusavirlik" className="text-white/60 hover:text-[#d4af37] transition-colors">
                  Yönetim Muhasebesi & Raporlama
                </Link>
              </li>
              <li>
                <Link href="/malimusavirlik" className="text-white/60 hover:text-[#d4af37] transition-colors">
                  SGK & İstihdam Teşvikleri
                </Link>
              </li>
              <li>
                <Link href="/malimusavirlik" className="text-white/60 hover:text-[#d4af37] transition-colors">
                  Mali Müşavirlik & Vergi Mevzuatı
                </Link>
              </li>
              <li>
                <Link href="/malimusavirlik" className="text-white/60 hover:text-[#d4af37] transition-colors">
                  Bordrolama & Personel Özlük
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm border-b border-white/10 pb-2 footer-col-title">
              <Briefcase className="w-4 h-4 text-[#d4af37]" />
              <span>Yönetim Danışmanlığı</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/danismanlik" className="text-white/60 hover:text-[#d4af37] transition-colors">
                  Yatırım Teşvik Belgesi
                </Link>
              </li>
              <li>
                <Link href="/danismanlik" className="text-white/60 hover:text-[#d4af37] transition-colors">
                  KOSGEB Hibe Programları
                </Link>
              </li>
              <li>
                <Link href="/danismanlik" className="text-white/60 hover:text-[#d4af37] transition-colors">
                  Ticaret Bakanlığı İhracat Destekleri
                </Link>
              </li>
              <li>
                <Link href="/danismanlik" className="text-white/60 hover:text-[#d4af37] transition-colors">
                  Ar-Ge & Tasarım Merkezi Kurulumu
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm border-b border-white/10 pb-2 footer-col-title">
              İletişim & Randevu
            </h3>
            <div className="space-y-2.5 text-xs">

              <div className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href="tel:05536221122" className="hover:text-white">0553 622 11 22</a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href="mailto:info@rotayd.com" className="hover:text-white">info@rotayd.com</a>
              </div>
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Konutkent+Mahallesi+Diyap+A%C4%9Fa+Caddesi+No:74+Suit+Tower+B+Blok+Kat:6+No:39+%C3%87ankaya+Ankara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white leading-relaxed transition-colors"
                >
                  Konutkent Mahallesi Diyap Ağa Caddesi No:74 Suit Tower B Blok Kat:6 No:39 Çankaya / Ankara
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Policy Navigation Strip */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
          <span className="font-semibold text-white/80 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span>Yasal & Hukuki Bilgilendirmeler</span>
          </span>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs">
            <Link href="/kvkk" className="hover:text-[#d4af37] transition-colors">
              KVKK Aydınlatma Metni
            </Link>
            <Link href="/cerez-politikasi" className="hover:text-[#d4af37] transition-colors">
              Çerez Politikası
            </Link>
            <Link href="/gizlilik-politikasi" className="hover:text-[#d4af37] transition-colors">
              Gizlilik ve Veri Güvenliği
            </Link>
            <Link href="/yasal-uyari" className="hover:text-[#d4af37] transition-colors">
              Yasal Uyarı & Şartlar
            </Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 space-y-3 sm:space-y-0">
          <p>© 2026 ROTAYD Mali Müşavirlik ve Yönetim Danışmanlığı. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap gap-4 sm:gap-5">
            <Link href="/hakkimizda" className="hover:text-[#d4af37] transition-colors">Hakkımızda</Link>
            <Link href="/malimusavirlik" className="hover:text-[#d4af37] transition-colors">Mali Müşavirlik</Link>
            <Link href="/danismanlik" className="hover:text-[#d4af37] transition-colors">Danışmanlık</Link>
            <Link href="/blog" className="hover:text-[#d4af37] transition-colors">Blog</Link>
            <Link href="/portal" className="text-[#d4af37] hover:underline font-semibold">Mükellef Portalı</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
