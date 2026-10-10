"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  ChevronRight,
  Sparkles,
  HelpCircle,
  Building2,
  Factory,
  Globe2,
  Cpu,
  Users,
  Rocket,
  HeartHandshake,
  Lightbulb,
  Building,
  ShieldCheck,
  FileCheck,
  BookOpen,
  Calendar,
  Clock
} from "lucide-react";
import AppointmentForm from "@/components/AppointmentForm";
import ReferencesMarquee from "@/components/ReferencesMarquee";
import { BLOG_POSTS } from "@/lib/blogData";
import LinkedInShareButton from "@/components/LinkedInShareButton";

export default function DanismanlikPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const tesvikBlogPosts = BLOG_POSTS.filter(
    (p) => p.category === "Devlet Teşvikleri" || p.category === "KOSGEB"
  );

  // 1. Hero Altı Stratejik Destek ve Teşvik Odakları
  const strategicPillars = [
    {
      title: "Kadın Girişimci Destekleri",
      badge: "Pozitif Ayrımcılık",
      icon: HeartHandshake,
      desc: "KOSGEB Girişimcilik Destek Programı kapsamında kadın kuruculara sağlanan +%20 ek hibe puanı, faizsiz finansman ve kadın kooperatifleri hibe projeleri.",
      points: ["+%20 Ek Hibe Puanı", "Faizsiz Kredi Desteği", "KOSGEB İleri Girişimci", "Kooperatif Hibeleri"]
    },
    {
      title: "Genç Girişimci Teşvikleri",
      badge: "29 Yaş Altı Teşvikler",
      icon: Rocket,
      desc: "29 yaşını doldurmamış girişimcilere 3 vergilendirme dönemi boyunca yıllık 230.000 TL kazanç istisnası, 1 tam yıl Bağ-Kur prim muafiyeti ve KOSGEB başlangıç sermayesi.",
      points: ["1 Yıl Bağ-Kur Hibesi", "3 Yıl Gelir Vergisi Muafiyeti", "KOSGEB Kuruluş Desteği", "Sıfır Faizli Finansman"]
    },
    {
      title: "Fabrika Yatırımları & Teşvikleri",
      badge: "Sanayi & OSB",
      icon: Factory,
      desc: "Sıfırdan fabrika ve üretim tesisi kurulumunda OSB arsa tahsisi, bina inşaat harcamalarında KDV muafiyeti ve bölgesel yatırım teşvik belgesi avantajları.",
      points: ["OSB Bedelsiz Arsa Tahsisi", "İnşaat KDV İstisnası", "Bölgesel Vergi İndirimi", "Altyapı Destekleri"]
    },
    {
      title: "İmalat Sanayi Destekleri",
      badge: "Üretim Mimarisi",
      icon: Building2,
      desc: "İmalat sektörüne yönelik CNC, tezgah ve üretim hatlarında sıfır gümrük vergisi, KDV istisnası, faiz/kâr payı desteği ve %90'a varan kurumlar vergisi indirimi.",
      points: ["Makine KDV İstisnası", "Gümrük Vergisi Muafiyeti", "Faiz / Kâr Payı Desteği", "Yüksek Vergi İndirimi"]
    },
    {
      title: "İhracat Destekleri",
      badge: "Küresel Pazarlar",
      icon: Globe2,
      desc: "Ticaret Bakanlığı onaylı yurt dışı ofis/mağaza/depo kiralarında %50-%70 nakit hibesi, uluslararası yetkili fuar katılımı ve küresel marka tescil geri ödemeleri.",
      points: ["Yurt Dışı Kira Hibesi", "Yetkili Fuar Katılımı", "Pazara Giriş Belgeleri", "E-İhracat Konsorsiyumu"]
    },
    {
      title: "Ar-Ge & Teknokent Teşvikleri",
      badge: "Yüksek Teknoloji",
      icon: Cpu,
      desc: "5746 Sayılı Kanun Ar-Ge Merkezi kurulumu ve Teknoloji Geliştirme Bölgeleri (TGB) kapsamında %100 kurumlar vergisi muafiyeti ile personel gelir vergisi ve damga istisnası.",
      points: ["Kurumlar Vergisi %100 Muaf", "Personel Stopaj Terkini", "%50 SGK İşveren Desteği", "TÜBİTAK TEYDEB Hibesi"]
    }
  ];

  // 2. İşletmenizi Büyütecek Teşvik Programları (İnsan Kaynakları çıkartıldı)
  const programs = [
    {
      title: "Yatırım Teşvik Belgesi",
      image: "/images/yonetim-danismanligi-yatirim-tesvik-belgesi.webp",
      desc: "Sanayi ve Teknoloji Bakanlığı onaylı makine ve teçhizat alımlarında %20 KDV istisnası, gümrük vergisi muafiyeti ve %90'a varan kurumlar vergisi indirimi.",
      badge: "Sanayi Bakanlığı",
      points: ["KDV & Gümrük İstisnası", "Kurumlar Vergisi İndirimi", "Faiz / Kâr Payı Desteği", "SGK İşveren Primi Desteği"]
    },
    {
      title: "KOSGEB Hibe & Yeşil Sanayi",
      image: "/images/yonetim-danismanligi-kosgeb-destek-hibe-programlari.webp",
      desc: "Yeşil Sanayi GES hibeleri, KOBİGEL dijitalleşme ve AR-GE projelerinde milyonlarca liralık geri ödemesiz devlet kaynağı ve proje yazımı.",
      badge: "KOBİ Hibeleri",
      points: ["Yeşil Sanayi GES Hibesi", "KOBİGEL Dijitalleşme", "Geri Ödemesiz Kaynak", "Makine Teçhizat Desteği"]
    },
    {
      title: "Ticaret Bakanlığı İhracat Destekleri",
      image: "/images/yonetim-danismanligi-ticaret-bakanligi-ihracat-destekleri.webp",
      desc: "Yurt dışı yetkili fuar harcamaları, hedef ülkelerde ofis/mağaza kira teşviki ve küresel marka tescilde %50 ila %70 oranında devlet nakit hibesi.",
      badge: "Küresel Pazarlar",
      points: ["Fuar Katılım Hibesi", "Yurt Dışı Ofis Kirası", "Pazara Giriş Belgeleri", "E-İhracat Konsorsiyumu"]
    },
    {
      title: "Kurumsal Gelişim & Süreç Optimizasyonu",
      image: "/images/yonetim-danismanligi-kurumsal-gelisim-surec-optimizasyonu.webp",
      desc: "360° kurumsal analiz, şirket organizasyon şeması, iç kontrol mekanizmaları ve yönetim kurulu stratejik büyüme projeksiyonu.",
      badge: "Stratejik Yönetim",
      points: ["Süreç İyileştirme", "İç Kontrol & Risk", "Stratejik Yönetim", "Finansal Göstergeler"]
    },
    {
      title: "Ar-Ge ve Tasarım Merkezi Kurulumu",
      image: "/images/yonetim-danismanligi-arge-tasarim-merkezi-kurulumu.webp",
      desc: "5746 Sayılı Kanun kapsamında personel gelir vergisi stopaj terkini, damga vergisi muafiyeti ve %100 Ar-Ge kurumlar vergisi indirimi.",
      badge: "Yüksek Teknoloji",
      points: ["Stopaj & Damga Muafiyeti", "%50 SGK İşveren Desteği", "TÜBİTAK TEYDEB", "Anahtar Teslim Merkez"]
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Teşvik Uygunluk & Lokasyon Analizi",
      desc: "Yatırım planınız, NACE faaliyet kodunuz ve il/ilçe teşvik bölgesi (1. ila 6. Bölge) taranarak en yüksek devlet desteği oranı belirlenir."
    },
    {
      step: "02",
      title: "Bakanlık & KOSGEB Proje Yazımı",
      desc: "Fizibilite raporları, makine listeleri ve finansal tablolar uzman danışmanlarımızca resmî formatlara uygun olarak sıfır hata ile hazırlanır."
    },
    {
      step: "03",
      title: "Resmî Tescil & Hibe Onayı",
      desc: "E-TUYS ve KOSGEB portalları üzerinden başvurular takip edilir, bakanlık uzman görüşmeleri yürütülerek belge ve hibe hak edişi sağlanır."
    },
    {
      step: "04",
      title: "Tamamlama Vizesi & Kapanış",
      desc: "Yatırım süresi boyunca makine revizyonları yönetilir ve nihai aşamada tamamlama vizesi alınarak teşvik süreci başarıyla kapatılır."
    }
  ];

  const faqs = [
    {
      q: "Yatırım Teşvik Belgesi almak için asgari yatırım tutarı nedir?",
      a: "Asgari sabit yatırım tutarı yatırımın yapılacağı il ve yatırım türüne göre değişiklik gösterir. 1. ve 2. bölgelerde 3 Milyon TL, 3., 4., 5. ve 6. bölgelerde ise 1.5 Milyon TL asgari yatırım şartı bulunmaktadır."
    },
    {
      q: "Kadın ve genç girişimciler için sağlanan özel KOSGEB destekleri nelerdir?",
      a: "Kadın girişimcilere KOSGEB Girişimcilik Destek Programı kapsamında hibe üst limitlerinde +%20 pozitif ayrımcılık sağlanır. 29 yaş altı genç girişimciler ise 3 yıl gelir vergisi muafiyeti ve 1 yıl boyunca tüm Bağ-Kur primlerinin devlet tarafından ödenmesi avantajından faydalanır."
    },
    {
      q: "KOSGEB Yeşil Sanayi Destek Programı kimleri kapsar?",
      a: "KOBİ ölçeğindeki sanayi işletmelerinin çatı ve arazi güneş enerjisi (GES) yatırımları ile enerji verimliliği sağlayan modern makine yenilemeleri için faizsiz geri ödemeli ve geri ödemesiz hibeler sunulmaktadır."
    },
    {
      q: "Ticaret Bakanlığı fuar ve kira destekleri süreci nasıl yürütülür?",
      a: "Yurt dışı fuar katılımı ve mağaza/ofis kiralamalarında mevzuatla belirlenen resmî takvim çerçevesinde başvuru dosyası hazırlanır, onaylanan harcamaların %50 ila %70'i doğrudan şirket banka hesabına nakit hibe olarak aktarılır."
    }
  ];

  return (
    <div className="min-h-screen bg-[#040a1a] text-white pb-20 transition-colors duration-300 page-container">
      {/* 1. Grand Standalone Homepage Hero Section (16:9 Full Screen Viewport Cover) */}
      <section className="subpage-hero relative w-full overflow-hidden min-h-screen lg:min-h-[100dvh] flex items-center justify-center pt-24 pb-16 lg:py-0">
        {/* Background Image capturing whole top of screen in 16:9 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-danismanlik.webp"
            alt="ROTAYD Yönetim Danışmanlığı, Devlet Teşvikleri ve Büyüme Müşavirliği Ankara"
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
              <Briefcase className="w-4 h-4 text-[#d4af37]" />
              <span>SANAYİ, TİCARET BAKANLIĞI VE KOSGEB REHBERLİĞİ</span>
            </div>

            <h1 className="subpage-hero-title text-3xl sm:text-5xl xl:text-6xl font-light tracking-tight text-white leading-[1.15]">
              Devlet Teşvikleri &amp; <br />
              <span className="gold-gradient-text font-serif italic">Büyüme Mimarisi</span>
            </h1>

            <p className="subpage-hero-desc text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-2xl">
              Yatırım Teşvik Belgesi, KOSGEB hibeleri, fabrika yatırımları, imalat ve ihracat destekleriyle firmanızı geleceğin küresel pazarlarına hazırlayan stratejik büyüme ortaklığı.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b89025] text-black font-bold text-xs hover:opacity-95 transition-all flex items-center space-x-2 shadow-xl shadow-[#d4af37]/20 cursor-pointer"
              >
                <span>Teşvik Uygunluk Analizi Başlat</span>
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
            <div className="subpage-hero-trust grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-[11px] text-white/70 max-w-lg">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Bakanlık Akredite</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Geri Ödemesiz Hibe</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Uçtan Uca Takip</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Kesintisiz Dönen Türk Firmaları Referanslar Silsilesi */}
      <ReferencesMarquee />

      {/* 2. BİZ KİMİZ & HAKKIMIZDA (YÖNETİM DANIŞMANLIĞI YAKLAŞIMIMIZ) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-[#d4af37]/20 bg-[#020612]/70">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative h-96 sm:h-[440px] w-full rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-2xl">
                <Image
                  src="/images/rotayd-yonetim-danismanligi-stratejik-analitik-yaklasim.webp"
                  alt="ROTAYD Yönetim Danışmanlığı, KOSGEB ve Devlet Teşvik Müşavirliği Ekibi"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-[#040a1a]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#040a1a]/85 backdrop-blur-md border border-[#d4af37]/30">
                  <div className="text-base font-bold text-white">ROTAYD Danışmanlık Masası</div>
                  <div className="text-xs text-[#d4af37]">Sanayi, Ticaret Bakanlığı ve KOSGEB Akredite Ekibi</div>
                  <div className="text-[11px] text-white/50 mt-1">Suit Tower Çankaya / Ankara</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>BİZ KİMİZ?</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
                Devlet Teşviklerinde Stratejik Akıl ve <span className="gold-gradient-text font-serif italic">Uçtan Uca Proje Yönetimi</span>
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                ROTAYD Danışmanlık; sanayi tesislerinden yüksek teknoloji girişimlerine, kadın ve genç girişimcilerden ihracatçı KOBİ&apos;lere kadar işletmelerin devlet teşviklerinden en üst düzeyde faydalanmasını sağlayan kurumsal bir yönetim danışmanlığı merkezidir.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center space-x-2 text-[#d4af37] font-semibold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Ön Eleme &amp; Sıfır Hata Prensibi</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Bakanlık onay şartlarını sağlamayan hiçbir dosyayı sürece dahil etmeyiz; hazırladığımız projelerde en yüksek kabul standartlarını koruruz.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center space-x-2 text-[#d4af37] font-semibold text-xs">
                    <Building className="w-4 h-4" />
                    <span>Fizibiliteden Kapanışa Tam Destek</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Sadece belge almakla kalmaz; yatırım revizyonları, hak ediş ödemeleri ve tamamlama vizesi alınıncaya kadar tüm takvim boyunca yanınızdayız.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-white/70">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Sanayi &amp; Teknoloji Bakanlığı E-TUYS Uzmanlığı</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>KOSGEB &amp; TÜBİTAK Proje Yazım Altyapısı</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Ticaret Bakanlığı Kolay İhracat Portalı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HERO'NUN HEMEN ALTINDA: KADIN GİRİŞİMCİ, GENÇ GİRİŞİMCİ, FABRİKA, İMALAT, İHRACAT, AR-GE TEKNOKENT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#d4af37]/40 bg-[#071128] text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ÖZEL TEŞVİK VE BÜYÜME ALANLARIMIZ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
            Girişimcilikten Sanayiye: <br className="hidden sm:inline" />
            <span className="gold-gradient-text font-serif italic">6 Temel Stratejik Destek Alanı</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-2xl mx-auto">
            İşletmenizin ölçeğine ve hedefine özel; kadın ve genç girişimci avantajlarından fabrika kurulumuna, imalattan Ar-Ge ve ihracat fonlarına uzanan rehberlik programlarımız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategicPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group glass-panel rounded-3xl p-7 border border-white/10 hover:border-[#d4af37]/60 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-[#d4af37]/10 relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#0b1938] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#faecc0] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/65 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {item.points.map((pt, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                        {pt}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#d4af37] hover:text-black text-xs font-semibold text-[#d4af37] border border-[#d4af37]/30 flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <span>Bu Destekten Yararlanın</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. İŞLETMENİZİ BÜYÜTECEK TEŞVİK PROGRAMLARI (BU BUNUN ALTINDA KALSIN) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase">STRATEJİK HİBE VE DESTEKLER</span>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
            İşletmenizi Büyütecek <span className="gold-gradient-text font-serif italic">Teşvik Programları</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            Sanayi ve Teknoloji Bakanlığı, Ticaret Bakanlığı ve KOSGEB nezdinde firmanız için en yüksek devlet hibesini temin eden 5 ana danışmanlık alanı.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((item, idx) => (
            <div
              key={idx}
              className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/60 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[#d4af37]/10"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`ROTAYD Yönetim Danışmanlığı ve Teşvik Müşavirliği - ${item.title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-[#040a1a]/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#071330]/90 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-semibold">
                    {item.badge}
                  </span>
                </div>
                <div className="p-6 space-y-2.5">
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

      {/* 5. 4 Aşamalı Büyüme Metodolojisi */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 border-t border-white/10 mb-16">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase">ADIM ADIM YOL HARİTASI</span>
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
            4 Aşamalı <span className="gold-gradient-text font-serif italic">Teşvik Süreci</span>
          </h2>
          <p className="text-xs text-white/60">
            Fizibiliteden tamamlama vizesine kadar uçtan uca dosya yönetimi.
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
            Teşvik &amp; Danışmanlık <span className="gold-gradient-text font-serif italic">Sıkça Sorulan Sorular</span>
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

      {/* 7. Hibe & Teşvik Danışmanlığı Blogu (Randevu Formunun Hemen Üstünde) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 border-t border-white/10 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Hibe &amp; Teşvik Danışmanlığı Blogu</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              Devlet Destekleri <span className="gold-gradient-text font-serif italic">Uzman Makaleleri</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 max-w-2xl">
              Yatırım teşvik belgeleri, KOSGEB hibeleri, Ticaret Bakanlığı destekleri ve Ar-Ge teşvikleri rehberleri.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tesvikBlogPosts.map((post) => (
            <div
              key={post.id}
              className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Link href={`/blog/${post.slug}`} className="relative h-44 w-full overflow-hidden block">
                  <Image
                    src={post.image}
                    alt={`${post.title} - ROTAYD Yönetim Danışmanlığı ve Teşvik Rehberi`}
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
                    <h3 className="text-sm font-bold text-white hover:text-[#dfa929] transition-colors line-clamp-2 leading-snug">
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

      {/* 8. Stratejik Danışmanlık Randevu Formu */}
      <section id="consultation">
        <div className="max-w-4xl mx-auto px-4 mb-8 text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-light text-white">
            Şirketiniz İçin <span className="gold-gradient-text font-serif italic">Teşvik Uygunluk Analizi Başlatın</span>
          </h3>
          <p className="text-xs sm:text-sm text-white/60">
            Formu iletin; Sanayi, Ticaret Bakanlığı ve KOSGEB hibe veri tabanlarını tarayarak şirketinize özel teşvik raporu hazırlayalım.
          </p>
        </div>
        <AppointmentForm />
      </section>
    </div>
  );
}
