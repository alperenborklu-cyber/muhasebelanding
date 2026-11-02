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
  Sparkles, 
  HelpCircle, 
  Clock, 
  BookOpen, 
  FileText, 
  BadgeCheck, 
  CreditCard, 
  Calculator, 
  Mail, 
  MapPin, 
  Calendar,
  AlertCircle 
} from "lucide-react";
import AppointmentForm from "@/components/AppointmentForm";
import ReferencesMarquee from "@/components/ReferencesMarquee";
import { BLOG_POSTS } from "@/lib/blogData";
import LinkedInShareButton from "@/components/LinkedInShareButton";

export default function MuhasebecilikPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openGuideIndex, setOpenGuideIndex] = useState<number | null>(null);

  const maliBlogPosts = BLOG_POSTS.filter(
    (p) => p.category === "Mali Müşavirlik" || p.category === "Vergi Mevzuatı" || p.category === "Yönetim Muhasebesi"
  );

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
      desc: "Vergi mevzuatı çerçevesinde yasal yükümlülüklerin takibi, geçerli indirim ve istisnaların değerlendirilmesi, beyanname hazırlığı ve vergi denetimi rehberliği.",
      badge: "Mevzuat Danışmanlığı",
      points: ["KDV & Kurumlar Vergisi", "E-Defter / E-Fatura", "Vergi İnceleme Danışmanlığı", "Muafiyet Analizi"]
    },
    {
      title: "Vergi Denetimi, İnceleme & Uzlaşma",
      image: "/images/mali-musavirlik-finansal-tablolar-denetim-destegi.webp",
      desc: "Vergi Denetim Kurulu ve Gelir İdaresi incelemelerinde defter ve e-kayıtların mevzuata uygun sunumu, izahat hazırlığı ve tarhiyat öncesi/sonrası uzlaşma danışmanlığı.",
      badge: "Vergi Güvenliği",
      points: ["Vergi Denetimi Hazırlığı", "İzahat Dosyaları", "Uzlaşma Komisyonu Temsili", "Mevzuat Risk Analizi"]
    },
    {
      title: "Şirket Kuruluşu, Nevi & Tür Değişikliği",
      image: "/images/mali-musavirlik-sirket-kurulusu-nevi-degisikligi.webp",
      desc: "Anonim ve Limited şirket kuruluşu, A.Ş. nevi değişikliğiyle hisse satışında %0 gelir vergisi istisnası ve ana sözleşme tescili.",
      badge: "Kurumsal Yapılanma",
      points: ["Ana Sözleşme & Tescil", "LTD'den A.Ş.'ye Geçiş", "Sermaye Artırımı", "Vergisiz Hisse Devri"]
    },
    {
      title: "E-Dönüşüm ve Dijital Muhasebe Hizmetleri",
      image: "/images/e-defter-e-fatura-vergi-mevzuati-mali-musavirlik.webp",
      desc: "e-Fatura, e-Arşiv ve e-Defter süreçlerinizi mevzuata uygun şekilde yönetiyor; elektronik belge düzenleme, e-Defter beratlarının hazırlanması ve gönderilmesi ile dijital muhasebe uygulamalarında işletmenize destek oluyoruz. Muhasebe işlemlerinizin daha hızlı, düzenli ve güvenilir yürütülmesine katkı sağlıyoruz.",
      badge: "Dijital Muhasebe Çözümleri",
      points: [
        "e-Fatura ve e-Arşiv İşlemleri",
        "e-Defter ve Berat Gönderimi",
        "Dijital Belge Yönetimi",
        "Muhasebe Programı Entegrasyonu"
      ]
    },
    {
      title: "Mali Tablolar & Bağımsız Denetim",
      image: "/images/mali-musavirlik-finansal-tablolar-denetim-destegi.webp",
      desc: "TMS/TFRS ve VUK standartlarında bilanço ve gelir tablosu analizi, banka kredibilitesi optimizasyonu ve bağımsız denetime hazırlık.",
      badge: "Denetim & Bilanço",
      points: ["Mali Tablo Analizi", "Banka Kredi Rasyoları", "Bağımsız Denetim Hazırlığı", "Bilanço İyileştirme"]
    }
  ];

  // 2026 ŞİRKET KURULUŞ REHBERİ: TEMEL STRATEJİK KARARLAR
  const companySetupGuides: Array<{
    number: string;
    title: string;
    summary: string;
    paragraphs: string[];
    note?: string;
    expertTip?: string;
  }> = [
    {
      number: "01",
      title: "Şirket Türü Seçimi: Limited Şirket (LTD) mi, Anonim Şirket (A.Ş.) mi, Şahıs mı?",
      summary: "2026 yılı sabit %25 Kurumlar Vergisi, ortaklık sorumluluğu ve vergisiz hisse devri kıyaslaması.",
      paragraphs: [
        "Limited Şirket (LTD), sabit %25 Kurumlar Vergisi oranı ve taahhüt edilen sermaye payı kadar sınırlı sorumluluk ile kurumsal imaj için en dengeli modeldir (ihracatçılara 5 puan indirimle %20, sanayicilere %24 uygulanır).",
        "Anonim Şirket (A.Ş.), pay senetlerinin 2 yıl elde tutulması halinde hisse satışında %0 Gelir Vergisi istisnası ve kamu borçlarına karşı yönetim kalkanı sağlar.",
        "Şahıs Şirketi ise düşük ciroda hızlı açılış sunsa da, kâr arttıkça %15 ila %40 artan oranlı gelir vergisi ve şahsi malvarlığıyla sınırsız sorumluluk riski taşır."
      ],
      expertTip: "Yıllık ciro ve kâr projeksiyonunuza göre en verimli şirket türünü birlikte belirliyoruz."
    },
    {
      number: "02",
      title: "2026 Asgari Sermaye & Blokajsız Hızlı Tescil Şartları",
      summary: "Limited şirketlerde 50.000 TL, Anonim şirketlerde 250.000 TL asgari sermaye şartı.",
      paragraphs: [
        "2026 güncel TTK mevzuatına göre Limited Şirket asgari sermayesi 50.000 TL, Anonim Şirket asgari sermayesi 250.000 TL'dir.",
        "Kuruluş aşamasında bankaya bloke şartı bulunmamakta olup, sermayenin tescilden itibaren 24 ay içinde ödenmesi yeterlidir. MERSİS üzerinden ortalama 2 iş gününde anahtar teslim tescil tamamlanır."
      ],
      expertTip: "Doğru sermaye planlaması banka kredibilitesi ve ihale yeterliliklerinde doğrudan avantaj sağlar."
    },
    {
      number: "03",
      title: "2026 Genç Girişimci İstisnası & Sanal Ofis Stopaj Avantajı",
      summary: "400.000 TL kazanç istisnası ve %20 kira stopajını ortadan kaldıran sanal ofis modeli.",
      paragraphs: [
        "29 yaşını doldurmamış girişimciler için 3 takvim yılı boyunca yıllık 400.000 TL Gelir Vergisi kazanç istisnası uygulanır (Bağ-Kur prim desteği 2026'da kaldırılmıştır, kazanç istisnası ise sürmektedir).",
        "Şahıstan kiralanan işyerlerinde %20 kira stopajı doğarken; kurumsal sanal ofis tercihinde faturalı KDV indirimi sağlanır ve stopaj yükü oluşmaz."
      ],
      expertTip: "Kuruluş öncesi vergi ve adres planlamasıyla gereksiz operasyonel maliyetlerin önüne geçiyoruz."
    },
    {
      number: "04",
      title: "2026 Dijital E-Dönüşüm Zorunlulukları (e-Fatura & e-Defter)",
      summary: "3 Milyon TL brüt satış ve e-ticaret 500 Bin TL ciro hadleri ile güvenli arşivleme.",
      paragraphs: [
        "2026 e-Dönüşüm hadleri uyarınca yıllık cirosu 3 Milyon TL'yi aşan işletmeler (e-ticarette 500 Bin TL) e-Fatura ve e-Defter sistemine dahil olmak zorundadır.",
        "Zorunluluk beklemeden dijital faturaya geçmek operasyonel hız kazandırır; ROTAYD Mükellef Portalı ile belgeleriniz anlık arşivlenir."
      ],
      expertTip: "Entegratör seçimi ve berat takvimini mevzuata uygun şekilde güvenle yönetiyoruz."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Finansal Röntgen & Risk Analizi",
      desc: "Mevcut yasal defterleriniz, geçmiş beyannameleriniz ve hesap planınız taranarak olası vergi cezası riskleri haritalandırılır."
    },
    {
      step: "02",
      title: "Vergi & Gider Optimizasyonu",
      desc: "Faaliyet alanınıza göre kanunen hak kazandığınız vergi indirimleri, amortisman planları ve yasal muafiyetler kurgulanır."
    },
    {
      step: "03",
      title: "Dijital E-Dönüşüm & Portal",
      desc: "Mükellef portalımız üzerinden fiş, fatura ve belgeleriniz güvenli dijital arşive alınarak kaybolma riski asgariye indirilir."
    },
    {
      step: "04",
      title: "Aylık Yönetim Raporu & Güvence",
      desc: "Her ay sonu yöneticilere özel hazırlanan grafiksel bilanço, gelir tablosu ve nakit akışı raporlarıyla mali disiplin sağlanır."
    }
  ];

  const faqs = [
    {
      q: "Şirket kuruluşu ne kadar sürer?",
      a: "Şahıs şirketleri e-Devlet üzerinden aynı gün içinde faal hale getirilebilir. Limited ve Anonim şirketler ise ana sözleşmenin MERSİS üzerinden hazırlanması, Ticaret Odası randevusu ve noter onaylarıyla ortalama 2 ila 3 iş günü içinde resmen kurulur."
    },
    {
      q: "Limited Şirket'ten Anonim Şirket'e geçiş (Nevi Değişikliği) neden tercih edilir?",
      a: "Anonim Şirketlerde hisse senetleri 2 yıl elde tutulduktan sonra satıldığında elde edilen kazanç %0 Gelir Vergisi istisnasına tabidir. Ayrıca A.Ş. ortakları şirket kamu borçlarından şahsi mal varlığıyla sorumlu tutulmaz. Büyüyen LTD'ler için en kritik vergisiz çıkış stratejisidir."
    },
        {
      q: "2026 Yılında e-Fatura ve e-Defter Zorunluluğu Kapsamında Mıyım?",
      a: "İşletmenizin NACE faaliyet kodu, e-ticaret hacmi ve geçmiş yıl brüt satış hasılatını analiz ederek e-Dönüşüm zorunluluğunuzu belirliyoruz. Zorunluluk başlamadan önce başvurularınızı tamamlayarak cezai yaptırımların önüne geçiyoruz."
    },
    {
      q: "Olası bir Vergi İncelemesi sürecinde nasıl bir yol izleniyor?",
      a: "Vergi Denetim Kurulu veya Gelir İdaresi müfettişlerince talep edilen yasal defter, e-belge ve kayıtların mevzuata uygun sunumu, izahat toplantıları ve uzlaşma komisyonlarında şirketinizi resmî vekil olarak temsil ediyoruz."
    }
  ];

  return (
    <div className="min-h-screen bg-[#040a1a] text-white pb-20 transition-colors duration-300">
      {/* 1. Grand Standalone Homepage Hero Section (Always Dark Mode) */}
      <section className="subpage-hero relative w-full overflow-hidden min-h-screen lg:min-h-[100dvh] flex items-center justify-center pt-24 pb-16 lg:py-0">
        {/* Background Image capturing whole top of screen in 16:9 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-muhasebecilik.webp"
            alt="ROTAYD Mali Müşavirlik, Vergi Denetimi ve Muhasebecilik Hizmetleri Ankara Çankaya"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000"
            sizes="100vw"
            quality={90}
          />
          <div className="hero-overlay-base absolute inset-0 bg-[#040a1a]/75 transition-colors duration-500" />
          <div className="hero-overlay-horiz absolute inset-0 bg-gradient-to-r from-[#040a1a] via-[#040a1a]/85 to-transparent lg:via-[#040a1a]/75 transition-colors duration-500" />
          <div className="hero-overlay-vert absolute inset-0 bg-gradient-to-b from-[#040a1a]/80 via-transparent to-[#040a1a] transition-colors duration-500" />
          <div className="hero-overlay-radial absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none transition-colors duration-500" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="subpage-hero-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#071128]/90 backdrop-blur-md text-xs font-semibold text-[#d4af37] shadow-lg shadow-black/40">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>TÜRMOB &amp; ASMMMO RUHSATLI MALİ MÜŞAVİRLİK</span>
            </div>

            <h1 className="subpage-hero-title text-3xl sm:text-5xl xl:text-6xl font-light tracking-tight text-white leading-[1.15]">
              Mali Disiplin, Güvenli Süreçler &amp; <span className="gold-gradient-text font-serif italic">Stratejik Finans</span>
            </h1>

            <p className="subpage-hero-desc text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-2xl">
              Yalnızca geçmişi deftere işleyen değil; proaktif vergi planlaması, şirket kuruluş mimarisi ve yönetim raporlamasıyla şirketinizin finansal yapısını ve kârlılığını destekleyen mali müşavirlik ortaklığı.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b89025] text-black font-bold text-xs hover:opacity-95 transition-all flex items-center space-x-2 shadow-xl shadow-[#d4af37]/20 cursor-pointer"
              >
                <span>Mali Müşavirlik Teklifi Al</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:05426221132"
                className="phone-nav-btn px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-all flex items-center space-x-2 backdrop-blur-sm"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>0542 622 11 32</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container">
        {/* 2. Kesintisiz Dönen Türk Firmaları Referanslar Silsilesi */}
        <ReferencesMarquee />

      {/* 3. ŞİRKET KURULUŞ REHBERİ: İLK DEFA BİR ŞİRKET KURUYORUM: NELERE DİKKAT ETMELİYİM? ŞAHIS MI LİMİTED Mİ? */}
      <section id="sirket-kurulus-rehberi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#d4af37]/40 bg-[#071128] text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>2026 GİRİŞİMCİLER &amp; YATIRIMCILAR İÇİN ŞİRKET KURULUŞ REHBERİ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
            İlk Defa Bir Şirket Kuruyorum: <br className="hidden sm:inline" />
            <span className="gold-gradient-text font-serif italic">Nelere Dikkat Etmeliyim? Şahıs mı, Limited mi?</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-2xl mx-auto">
            2026 güncel mevzuatına göre şirket türü, asgari sermaye tutarları, vergi istisnaları ve dijital dönüşüm süreçlerinde bilmeniz gereken temel stratejik kararlar.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {companySetupGuides.map((guide, idx) => {
            const isOpen = openGuideIndex === idx;
            return (
              <div
                key={guide.number}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#071330]/90 border-[#d4af37]/60 shadow-xl shadow-[#d4af37]/5"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenGuideIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-base sm:text-lg font-mono font-bold text-[#d4af37] bg-[#071128] px-3 py-1.5 rounded-xl border border-[#d4af37]/30 shrink-0">
                      {guide.number}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#faecc0]">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-white/55 mt-1 leading-relaxed">
                        {guide.summary}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-[#d4af37] shrink-0 transition-transform duration-300 mt-1 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-white/10 text-xs sm:text-sm text-white/80 leading-relaxed space-y-3.5 bg-[#040d24]/60">
                    <div className="space-y-2.5">
                      {guide.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="leading-relaxed text-white/80">{p}</p>
                      ))}
                    </div>

                    {guide.note && (
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-xs sm:text-sm flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-amber-300">Önemli: </strong>
                          <span>{guide.note}</span>
                        </div>
                      </div>
                    )}

                    {guide.expertTip && (
                      <div className="p-3.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-white/90 text-xs sm:text-sm flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-[#d4af37]">ROTAYD Uzman Görüşü: </strong>
                          <span className="text-white/85">{guide.expertTip}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between text-xs text-[#d4af37]">
                      <span className="font-semibold flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>ROTAYD Danışmanlık Rehberliği</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" })}
                        className="hover:underline flex items-center space-x-1 cursor-pointer"
                      >
                        <span>Bu Konuda Danışın</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Callout box inside guide */}
        <div className="mt-12 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#071330] to-[#0a1e4a] border border-[#d4af37]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left max-w-2xl">
            <h4 className="text-base sm:text-lg font-bold text-white">Şirketinizi Kurmaya Hazır mısınız?</h4>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Doğru şirket türü ve faaliyet kodunun belirlenmesinden ticaret sicili, vergi dairesi ve e-belge işlemlerine kadar tüm kuruluş sürecinizi ROTAYD’ın deneyimiyle güvenle yönetin. Siz işinizi büyütmeye odaklanın, kuruluş işlemlerinizde biz yanınızda olalım.
            </p>
          </div>
          <button
            type="button"
            onClick={() => document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" })}
            className="whitespace-nowrap px-6 py-3.5 rounded-full bg-[#d4af37] text-black font-bold text-xs hover:bg-[#faecc0] transition-colors shadow-lg shrink-0 flex items-center space-x-1.5 cursor-pointer"
          >
            <span>Kuruluş Sürecini Başlat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4. Core Solutions Grid (Mali Müşavirlik Hizmetlerimiz) */}
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
                    alt={`ROTAYD Mali Müşavirlik ve Muhasebecilik Hizmetleri - ${srv.title}`}
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

      {/* 5. 4-Aşamalı Mali Yol Haritası */}
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
                <div className="px-5 pb-5 text-xs text-white/70 leading-relaxed border-t border-white/5 pt-3 whitespace-pre-line">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Mali Müşavirlik & Finans Blogu (Randevu Formunun Hemen Üstünde) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 border-t border-white/10 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Mali Müşavirlik &amp; Mevzuat Blogu</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              Mali Müşavirlik <span className="gold-gradient-text font-serif italic">Uzman Makaleleri</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 max-w-2xl">
              Şirketinizin finansal mimarisi, vergi tasarrufu ve mevzuat değişiklikleri hakkında en güncel uzman rehberleri.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {maliBlogPosts.map((post) => (
            <div
              key={post.id}
              className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Link href={`/blog/${post.slug}`} className="relative h-44 w-full overflow-hidden block">
                  <Image
                    src={post.image}
                    alt={`${post.title} - ROTAYD Mali Müşavirlik ve Vergi Mevzuatı Rehberi`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#071330]/90 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-semibold tracking-wide">
                      {post.category}
                    </span>
                  </div>
                </Link>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center space-x-3 text-[10px] text-white/50">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-[#d4af37]" />
                      <span>{post.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-[#d4af37]" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-sm font-bold text-white hover:text-[#d4af37] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-white/5 text-xs text-[#d4af37] font-medium">
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center space-x-1 hover:text-white transition-colors"
                >
                  <span>Rehberi İncele</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <LinkedInShareButton 
                  url={`/blog/${post.slug}`}
                  title={post.title}
                  variant="pill"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Özel Mali Müşavirlik CTA & Randevu Formu */}
      <section id="consultation" className="relative pt-6">
        <div className="max-w-4xl mx-auto px-4 mb-8 text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-light text-white">
            Şirketiniz İçin <span className="gold-gradient-text font-serif italic">Mali Müşavirlik Teklifi Alın</span>
          </h3>
          <p className="text-xs sm:text-sm text-white/60">
            Formu doldurun, şirket profilinizi analiz edip Çankaya Suit Tower ofisimizde veya online görüşmeyle yol haritanızı belirleyelim.
          </p>
        </div>
        <AppointmentForm />
      </section>
      </div>
    </div>
  );
}
