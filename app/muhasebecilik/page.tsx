"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  ChevronRight,
  Sparkles
} from "lucide-react";

export default function MuhasebecilikPage() {
  const [formSent, setFormSent] = useState(false);

  const services = [
    {
      title: "Yönetim Muhasebesi",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      desc: "Finansal röntgen, maliyet analizleri ve aylık yönetim raporlamasıyla kârlılığı artıran stratejik finans yönetimi.",
      points: ["Maliyet Analizi", "Bütçe Projeksiyonu", "Aylık Yönetim Raporu"]
    },
    {
      title: "Mali Müşavirlik & Vergi Mevzuatı",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
      desc: "Mevzuata tam uyum, vergi indirimlerinden maksimum faydalanma, beyanname hazırlama ve defter tutma.",
      points: ["KDV, Kurumlar Vergisi", "E-Defter / E-Fatura", "Vergi İnceleme Danışmanlığı"]
    },
    {
      title: "SGK ve İstihdam Teşvikleri",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      desc: "Geriye dönük ve cari dönem prim analizleriyle şirketinize milyonlarca liralık net nakit tasarruf.",
      points: ["6111 ve Güncel Teşvikler", "Geriye Dönük İadeler", "Aylık SGK Prim İndirimi"]
    },
    {
      title: "Bordrolama & Personel Özlük",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
      desc: "İş Kanunu'na tam uyumlu, %100 gizlilik esaslı bordro hazırlama ve personel özlük yönetimi.",
      points: ["Gizli Maaş Bordrosu", "Kıdem / İhbar Hesaplama", "Özlük Dosyası Uyumu"]
    },
    {
      title: "Şirket Kuruluşu & Tür Değişikliği",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      desc: "Anonim ve Limited şirket kuruluşu, A.Ş. nevi değişikliğiyle hisse satışında %0 vergi avantajı.",
      points: ["Ana Sözleşme & Tescil", "LTD'den A.Ş.'ye Geçiş", "Sermaye Artırımı & Birleşme"]
    },
    {
      title: "Mali Tablolar & Denetim Desteği",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
      desc: "TMS/TFRS ve VUK standartlarında bilanço ve gelir tablosu analizi, banka kredibilitesi optimizasyonu.",
      points: ["Mali Tablo Analizi", "Banka Kredi Rasyoları", "Bağımsız Denetim Hazırlığı"]
    }
  ];

  return (
    <div className="bg-[#040a1a] text-white pt-28 pb-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="flex items-center space-x-2 text-xs text-white/50 mb-6">
          <Link href="/" className="hover:text-white">Ana Sayfa</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#d4af37]">Muhasebecilik & Mali Müşavirlik</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#071128] text-xs font-semibold text-[#d4af37] uppercase">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>ROTAYD Mali Müşavirlik</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Mali Disiplin ve <span className="gold-gradient-text font-serif italic">Stratejik Muhasebe</span>
            </h1>

            <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl leading-relaxed">
              Yalnızca geçmişi kaydeden değil, 2.6 Milyon TL&apos;yi aşan SGK teşvik analizleriyle şirketinize somut kârlılık kazandıran proaktif mali müşavirlik ortaklığı.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#consultation"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-semibold text-xs hover:opacity-90 transition-all flex items-center space-x-2"
              >
                <span>Mali Analiz & Teklif Alın</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:02582120444"
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-all flex items-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>0(258) 212 0 444</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-[#d4af37]/30 text-center space-y-3">
            <div className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold">
              Kanıtlanmış Tasarruf
            </div>
            <div className="text-4xl font-extrabold text-white">
              <span className="gold-gradient-text">2.6M+</span> <span className="text-xl text-[#d4af37]">TL</span>
            </div>
            <p className="text-xs text-white/60">
              Şirketlere kazandırılan toplam SGK prim teşviki.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid with Visual Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={srv.image}
                    alt={srv.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-[#040a1a]/40 to-transparent" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#faecc0] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-white/65 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {srv.points.map((pt, i) => (
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
              Mali Süreçlerinizi <span className="gold-gradient-text font-serif italic">Planlayalım</span>
            </h2>
            <p className="text-xs text-white/60">
              Formu doldurun, mali müşavirlerimiz durum analiziyle size dönüş yapsın.
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
                Mali Teklif İsteyin
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
