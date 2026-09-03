"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  ChevronRight
} from "lucide-react";

export default function DanismanlikPage() {
  const [formSent, setFormSent] = useState(false);

  const programs = [
    {
      title: "Yatırım Teşvik Belgesi",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      desc: "Makine alımlarında KDV istisnası, gümrük muafiyeti ve %90'a varan kurumlar vergisi indirimi.",
      badge: "Sanayi Bakanlığı",
      points: ["KDV & Gümrük İstisnası", "Vergi İndirimi", "Faiz / Kâr Payı Desteği"]
    },
    {
      title: "KOSGEB Hibe Programları",
      image: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=800&q=80",
      desc: "AR-GE, ÜR-GE, KOBİGEL ve Yeşil Sanayi desteklerinde geri ödemesiz hibe proje yazımı.",
      badge: "KOBİ Destekleri",
      points: ["Yeşil Sanayi GES Hibesi", "KOBİGEL Dijitalleşme", "Geri Ödemesiz Kaynak"]
    },
    {
      title: "Ticaret Bakanlığı İhracat Destekleri",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
      desc: "Yurt dışı fuar katılımları, ofis/mağaza kira desteği ve marka tescilde %50-%70 devlet hibesi.",
      badge: "İhracat",
      points: ["Fuar Katılım Hibesi", "Yurt Dışı Ofis Kirası", "Pazara Giriş Belgeleri"]
    },
    {
      title: "Kurumsal Gelişim Danışmanlığı",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
      desc: "Organizasyonel yapılanma, süreç optimizasyonu ve 360° şirket projeksiyon raporlaması.",
      badge: "Strateji",
      points: ["Süreç İyileştirme", "İç Kontrol & Risk", "Stratejik Yönetim"]
    },
    {
      title: "Ar-Ge ve Tasarım Merkezi Kurulumu",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
      desc: "Personel gelir vergisi stopaj terkini, damga vergisi muafiyeti ve %100 Ar-Ge vergi indirimi.",
      badge: "İnovasyon",
      points: ["Stopaj & SGK Muafiyeti", "TÜBİTAK TEYDEB", "Gümrük İstisnası"]
    },
    {
      title: "İnsan Kaynakları Danışmanlığı",
      image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=800&q=80",
      desc: "Yetkin personel seçme-yerleştirme, performans sistemi ve İK süreçlerinin yeniden yapılandırılması.",
      badge: "Yetenek Yönetimi",
      points: ["Seçme & Yerleştirme", "Performans Kriterleri", "Görev Tanımları"]
    }
  ];

  return (
    <div className="bg-[#040a1a] text-white pt-28 pb-20 transition-colors duration-300">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="flex items-center space-x-2 text-xs text-white/50 mb-6">
          <Link href="/" className="hover:text-white">Ana Sayfa</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#d4af37]">Yönetim Danışmanlığı & Teşvikler</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#071128] text-xs font-semibold text-[#d4af37] uppercase">
              <Briefcase className="w-4 h-4 text-[#d4af37]" />
              <span>ROTAYD Yönetim Danışmanlığı</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Devlet Teşvikleri & <span className="gold-gradient-text font-serif italic">Büyüme Mimarisi</span>
            </h1>

            <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl leading-relaxed">
              Yatırım teşvik belgesi, KOSGEB hibeleri ve bakanlık desteklerini bir arada haritalandırarak firmanızın gelecekteki rotasını çiziyoruz.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#consultation"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-semibold text-xs hover:opacity-90 transition-all flex items-center space-x-2"
              >
                <span>Teşvik Uygunluk Analizi Yapın</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:05536221122"
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-all flex items-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>0553 622 11 22</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-[#d4af37]/30 text-center space-y-3">
            <div className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold">
              Destek Başarısı
            </div>
            <div className="text-4xl font-extrabold text-white">
              <span className="gold-gradient-text">%99</span>
            </div>
            <p className="text-xs text-white/60">
              1.162+ onaylanan yatırım ve hibe projesi.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid with Visual Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((item, idx) => (
            <div
              key={idx}
              className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-[#040a1a]/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#071330]/90 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-semibold">
                    {item.badge}
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#faecc0] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/65 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {item.points.map((pt, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#d4af37]">
                      {pt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Minimal Consultation Form */}
      <section id="consultation" className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto py-12">
        <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/30 shadow-2xl">
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-2xl font-light text-white">
              Teşvik Uygunluk <span className="gold-gradient-text font-serif italic">Analizi</span>
            </h2>
            <p className="text-xs text-white/60">
              Formu gönderin, yönetim danışmanlarımız firmanız için uygun hibeleri belirlesin.
            </p>
          </div>

          {formSent ? (
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-1">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-white">Talebiniz Alındı</h3>
              <p className="text-xs text-emerald-200">En kısa sürede iletişime geçeceğiz.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Firma Adı & Yetkili"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#d4af37]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Telefon (05XX XXX XX XX)"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <input
                type="email"
                required
                placeholder="E-Posta Adresi"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#d4af37]"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg"
              >
                Teşvik Raporu İsteyin
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
