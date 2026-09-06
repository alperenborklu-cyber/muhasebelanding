"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  ChevronRight,
  TrendingUp,
  FileCheck,
  Building2,
  Users,
  Award,
  Sparkles,
  HelpCircle,
  Clock,
  Briefcase
} from "lucide-react";
import AppointmentForm from "@/components/AppointmentForm";

export default function MuhasebecilikPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const services = [
    {
      title: "Yönetim Muhasebesi & Raporlama",
      image: "/images/mali-musavirlik-yonetim-muhasebesi-raporlama.webp",
      desc: "Finansal röntgen, maliyet analizleri, nakit akışı simülasyonu ve aylık yönetim kurulu sunumlarıyla kârlılığı artıran stratejik finans yönetimi.",
      badge: "Finansal Mimari",
      points: ["Maliyet Analizi", "Bütçe Projeksiyonu", "Aylık Yönetim Raporu", "Kârlılık Rasyoları"]
    },
    {
      title: "Mali Müşavirlik & Vergi Mevzuatı",
      image: "/images/mali-musavirlik-vergi-mevzuati-denetim.webp",
      desc: "Vergi mevzuatına tam uyum, indirim ve istisnalardan maksimum faydalanma, beyanname hazırlığı ve vergi denetimi danışmanlığı.",
      badge: "Mevzuat Uyumu",
      points: ["KDV & Kurumlar Vergisi", "E-Defter / E-Fatura", "Vergi İnceleme Danışmanlığı", "Muafiyet Analizi"]
    },
    {
      title: "SGK ve İstihdam Teşvikleri",
      image: "/images/sgk-istihdam-tesvikleri-2026-mali-musavirlik-rehberi.webp",
      desc: "Geriye dönük ve cari dönem prim analizleriyle şirketinize milyonlarca liralık net nakit tasarruf ve sürdürülebilir bordro optimizasyonu.",
      badge: "Kanıtlanmış Tasarruf",
      points: ["6111 ve Güncel Teşvikler", "Geriye Dönük İadeler", "Aylık SGK Prim İndirimi", "Bordro Uyumu"]
    },
    {
      title: "Bordrolama & Personel Özlük (BPO)",
      image: "/images/mali-musavirlik-bordrolama-ozluk-yonetimi.webp",
      desc: "İş Kanunu'na tam uyumlu, %100 gizlilik esaslı dış kaynak bordrolama, kıdem-ihbar hesaplamaları ve personel özlük dosyası yönetimi.",
      badge: "%100 Gizlilik",
      points: ["Gizli Maaş Bordrosu", "Kıdem / İhbar Hesaplama", "Özlük Dosyası Uyumu", "İş Hukuku Danışmanlığı"]
    },
    {
      title: "Şirket Kuruluşu, Nevi & Tür Değişikliği",
      image: "/images/mali-musavirlik-sirket-kurulusu-nevi-degisikligi.webp",
      desc: "Anonim ve Limited şirket kuruluşu, A.Ş. nevi değişikliğiyle hisse satışında %0 gelir vergisi istisnası ve ana sözleşme tescili.",
      badge: "Kurumsal Yapılanma",
      points: ["Ana Sözleşme & Tescil", "LTD'den A.Ş.'ye Geçiş", "Sermaye Artırımı", "Vergisiz Hisse Devri"]
    },
    {
      title: "Mali Tablolar & Bağımsız Denetim",
      image: "/images/mali-musavirlik-finansal-tablolar-denetim-destegi.webp",
      desc: "TMS/TFRS ve VUK standartlarında bilanço ve gelir tablosu analizi, banka kredibilitesi optimizasyonu ve bağımsız denetime hazırlık.",
      badge: "Denetim & Bilanço",
      points: ["Mali Tablo Analizi", "Banka Kredi Rasyoları", "Bağımsız Denetim Hazırlığı", "Bilanço İyileştirme"]
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Finansal Röntgen & Risk Taraması",
      desc: "Mevcut muhasebe defterleriniz, geçmiş beyannameleriniz ve bordrolarınız taranarak olası vergi cezası riskleri ve kaçırılan teşvikler haritalandırılır."
    },
    {
      step: "02",
      title: "SGK & Vergi İstisnaları Tespiti",
      desc: "Şirketinizin çalışan profili ve faaliyet koduna göre hak kazandığı tüm yasal prim indirimleri ve vergi muafiyetleri kuruşu kuruşuna hesaplanır."
    },
    {
      step: "03",
      title: "Dijital E-Dönüşüm & Süreç Entegrasyonu",
      desc: "E-Fatura, E-Defter ve ERP entegrasyonlarınız sıfır hata prensibiyle modernize edilerek insan hatasından arındırılmış güvenli yapı kurulur."
    },
    {
      step: "04",
      title: "Aylık Yönetim Raporu & Proaktif Danışmanlık",
      desc: "Her ay sonu yöneticilere özel hazırlanan grafiksel bilanço ve nakit akışı raporlarıyla işletmenizin kârlılığı sürekli güvence altında tutulur."
    }
  ];

  const faqs = [
    {
      q: "SGK istihdam teşviklerinden geriye dönük faydalanabilir miyiz?",
      a: "Evet. Şirketinizin son dönem bordroları ve sigortalı çalışan geçmişi analitik yazılımlarımızla taranarak kaçırılan yasal teşvikler tespit edilir ve SGK nezdinde mahsup işlemleri eksiksiz tamamlanır."
    },
    {
      q: "Limited Şirket'ten Anonim Şirket'e geçiş (Nevi Değişikliği) ne kadar sürer?",
      a: "Özvarlık tespit raporunun hazırlanması, mahkeme veya SMMM bilirkişi onayı ve Ticaret Sicil tescili genellikle 2 ila 4 hafta arasında tamamlanmaktadır. Bu dönüşüm sayesinde 2 yıl elde tutulan A.Ş. pay senetlerinin satışında %0 gelir vergisi istisnası kazanılır."
    },
    {
      q: "Bordrolama hizmetini dış kaynağa (BPO) aktarmanın avantajı nedir?",
      a: "Şirket içi maaş dedikodularını ve gizlilik ihlallerini sıfırlar, bordro hazırlama yükünü üzerinizden alır ve SGK mevzuatındaki cezai yaptırımlara karşı profesyonel mali müşavir güvencesi sağlar."
    },
    {
      q: "Vergi incelemesi durumunda nasıl destek sağlıyorsunuz?",
      a: "Vergi müfettişleri tarafından talep edilen defter, belge ve e-kayıtların mevzuata uygun sunumu, izahat ve uzlaşma komisyonu süreçlerinde şirketinizi resmî vekil olarak temsil ediyoruz."
    }
  ];

  return (
    <div className="min-h-screen bg-[#040a1a] text-white pb-20 transition-colors duration-300 page-container">
      {/* 1. Grand Standalone Homepage Hero Section with ChatGPT Background */}
      <section className="relative w-full overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-20 lg:pb-28 min-h-[85vh] lg:min-h-[90vh] flex items-center">
        {/* Background Image capturing whole top of screen */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-muhasebecilik.png"
            alt="ROTAYD Mali Müşavirlik ve Stratejik Finans Yönetimi"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000"
            sizes="100vw"
            quality={95}
          />
          {/* Dark luxury gradient overlays for pristine readability and executive prestige */}
          <div className="absolute inset-0 bg-[#040a1a]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040a1a] via-[#040a1a]/85 to-transparent lg:via-[#040a1a]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040a1a]/80 via-transparent to-[#040a1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-xs text-white/60 mb-6 sm:mb-8">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 text-[#d4af37]" />
            <span className="text-[#d4af37]">Mali Müşavirlik Portalı</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#071128]/90 backdrop-blur-md text-xs font-semibold text-[#d4af37] shadow-lg shadow-black/40">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>TÜRMOB & ASMMMO RUHSATLI MALİ MÜŞAVİRLİK</span>
              </div>

              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-light tracking-tight text-white leading-[1.15]">
                Mali Disiplin, Sıfır Risk ve <span className="gold-gradient-text font-serif italic">Stratejik Finans</span>
              </h1>

              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl">
                Yalnızca geçmişi deftere işleyen değil; <strong>2.6 Milyon TL&apos;yi aşan SGK teşvik analizleri</strong>, proaktif vergi planlaması ve yönetim raporlamasıyla şirketinizin net kârlılığını artıran finansal mimarlık.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b89025] text-black font-bold text-xs hover:opacity-95 transition-all flex items-center space-x-2 shadow-xl shadow-[#d4af37]/20 cursor-pointer"
                >
                  <span>Ücretsiz Mali Röntgen Başlat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="tel:05536221122"
                  className="phone-nav-btn px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-all flex items-center space-x-2 backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  <span>0553 622 11 22</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-[11px] text-white/70">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>%100 Yasal Uyum</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>Gizli Bordrolama</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>Suit Tower Çankaya</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Luxury Glassmorphism Executive Highlights Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-[#040a1a]/60 border border-[#d4af37]/35 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0b1938] border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] shadow-inner">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">ASMMMO & TÜRMOB</div>
                      <div className="text-[11px] text-white/50 font-mono">Yetkili Mali Müşavirlik</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#d4af37]/15 text-[#d4af37] text-[10px] font-bold border border-[#d4af37]/30">
                    Resmî Ruhsatlı
                  </span>
                </div>

                {/* Metric Highlights */}
                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between hover:border-[#d4af37]/40 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-[#071128] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">Kazanılan SGK Teşviki</div>
                        <div className="text-[11px] text-white/50">İşletmeler adına net tasarruf</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold gold-gradient-text">2.600.000+ TL</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between hover:border-[#d4af37]/40 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-[#071128] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">Vergi Denetimi & Uzlaşma</div>
                        <div className="text-[11px] text-white/50">Maliye nezdinde yasal vekillik</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#faecc0]">Sıfır Hata</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between hover:border-[#d4af37]/40 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-[#071128] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">E-Defter & E-Fatura</div>
                        <div className="text-[11px] text-white/50">Zaman damgalı dijital arşiv</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">%100 Uyum</div>
                    </div>
                  </div>
                </div>

                {/* Quick Card Action */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/10 hover:from-[#d4af37]/30 hover:to-[#d4af37]/20 border border-[#d4af37]/50 text-white font-medium text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer group"
                  >
                    <span>Şirketiniz İçin Ön İnceleme İsteyin</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metric Indicators Bar */}
      <section className="border-y border-[#d4af37]/20 bg-[#020612]/70 py-10 px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-4 border-r border-white/10 last:border-r-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
              <span className="gold-gradient-text">2.6M+</span> <span className="text-lg text-[#d4af37]">TL</span>
            </div>
            <div className="text-xs text-white/60">Kazanılan SGK Prim Teşviki</div>
          </div>
          <div className="p-4 border-r border-white/10 last:border-r-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
              <span className="gold-gradient-text">15+</span> <span className="text-lg text-[#d4af37]">Yıl</span>
            </div>
            <div className="text-xs text-white/60">Kıdemli SMMM Deneyimi</div>
          </div>
          <div className="p-4 border-r border-white/10 last:border-r-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
              <span className="gold-gradient-text">350+</span>
            </div>
            <div className="text-xs text-white/60">Aylık Denetlenen Şirket & Bordro</div>
          </div>
          <div className="p-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
              <span className="gold-gradient-text">%100</span>
            </div>
            <div className="text-xs text-white/60">Mevzuat Uyumu & Güvence</div>
          </div>
        </div>
      </section>

      {/* 3. Core Solutions Grid (Text-free WebP Images) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase">KAPSAMLI MALİ ÇÖZÜMLER</span>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
            İşletmenizin İhtiyacına Özel <span className="gold-gradient-text font-serif italic">Mali Müşavirlik</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            Klasik defter tutmanın ötesine geçerek firmanızın kârlılığını, nakit akışını ve yasal bağışıklığını koruyan 6 temel uzmanlık alanı.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/60 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[#d4af37]/10"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={srv.image}
                    alt={`ROTAYD Mali Müşavirlik - ${srv.title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-[#040a1a]/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#071330]/90 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-semibold">
                    {srv.badge}
                  </span>
                </div>
                <div className="p-6 space-y-2.5">
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
                    <span key={i} className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                      {pt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 4-Aşamalı Mali Yol Haritası */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-white/10 mb-16">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase">NASIL ÇALIŞIYORUZ?</span>
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
            4 Aşamalı <span className="gold-gradient-text font-serif italic">Finansal Yol Haritası</span>
          </h2>
          <p className="text-xs text-white/60">
            Sistematik, şeffaf ve ölçülebilir mali danışmanlık metodolojimiz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <div key={i} className="glass-panel p-6 rounded-3xl border border-white/10 relative group hover:border-[#d4af37]/50 transition-all">
              <div className="text-3xl font-extrabold text-[#d4af37]/30 font-mono mb-3 group-hover:text-[#d4af37] transition-colors">
                {st.step}
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{st.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Geleneksel Muhasebe vs. ROTAYD Proaktif Mali Müşavirlik */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-20">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#d4af37]/30 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl font-light text-white">
              Geleneksel Muhasebe vs. <span className="gold-gradient-text font-serif italic">ROTAYD Mimarisi</span>
            </h2>
            <p className="text-xs text-white/60">
              Neden Türkiye&apos;nin öncü şirketleri ROTAYD ile çalışıyor?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 opacity-75">
              <h3 className="text-sm font-semibold text-rose-300">Geleneksel Muhasebecilik</h3>
              <ul className="space-y-2 text-white/60">
                <li>• Yalnızca geçmiş evrakları sisteme işler, geriye dönük bakar.</li>
                <li>• SGK teşviklerini taramaz, cari dönem prim tasarrufları kaçar.</li>
                <li>• Ay sonu yalnızca vergi tahakkuk fişini iletir, analiz yapmaz.</li>
                <li>• Şirket tür değişikliği ve hisse devri avantajlarını planlamaz.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#08183c] border border-[#d4af37]/50 space-y-3">
              <h3 className="text-sm font-semibold text-[#faecc0] flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>ROTAYD Proaktif Mali Müşavirlik</span>
              </h3>
              <ul className="space-y-2 text-white/85">
                <li>• 360° finansal projeksiyon ve aylık yönetim kurulu raporu sunar.</li>
                <li>• Geriye dönük ve cari tüm SGK prim teşviklerini kuruşu kuruşuna tahsil eder.</li>
                <li>• Nakit akışı simülasyonu ile sürpriz vergi yüklerinin önüne geçer.</li>
                <li>• A.Ş. nevi değişikliğiyle ortaklara %0 vergisiz hisse satışı altyapısı kurar.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sıkça Sorulan Sorular */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Merak Edilenler</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-white">
            Mali Müşavirlik <span className="gold-gradient-text font-serif italic">Sıkça Sorulan Sorular</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-[#d4af37] transition-colors"
              >
                <span>{f.q}</span>
                <ChevronRight className={`w-4 h-4 text-[#d4af37] transition-transform duration-300 ${openFaq === i ? "rotate-90" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-xs text-white/70 leading-relaxed border-t border-white/5 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Stratejik Randevu Formu */}
      <section id="consultation">
        <AppointmentForm />
      </section>
    </div>
  );
}
