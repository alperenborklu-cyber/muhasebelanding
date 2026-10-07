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
  BookOpen,
  FileText,
  Scale,
  BadgeCheck,
  CreditCard,
  Building,
  Calculator,
  Mail,
  MapPin,
  Calendar
} from "lucide-react";
import AppointmentForm from "@/components/AppointmentForm";
import { BLOG_POSTS } from "@/lib/blogData";
import LinkedInShareButton from "@/components/LinkedInShareButton";

export default function MuhasebecilikPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openGuideIndex, setOpenGuideIndex] = useState<number | null>(0);

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
      desc: "Vergi mevzuatına tam uyum, indirim ve istisnalardan maksimum faydalanma, beyanname hazırlığı ve vergi denetimi danışmanlığı.",
      badge: "Mevzuat Uyumu",
      points: ["KDV & Kurumlar Vergisi", "E-Defter / E-Fatura", "Vergi İnceleme Danışmanlığı", "Muafiyet Analizi"]
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
      title: "E-Dönüşüm & Dijital Defter Yönetimi",
      image: "/images/mali-musavirlik-guvenilirlik-bagimsiz-denetim.webp",
      desc: "E-Fatura, E-Arşiv, E-Defter ve zaman damgalı bulut yedekleme altyapısıyla hata payı sıfıra indirilmiş dijital muhasebe mimarisi.",
      badge: "Dijital Entegrasyon",
      points: ["E-Fatura Entegrasyonu", "E-Defter Berat Gönderimi", "Dijital Arşiv Güvencesi", "ERP Muhasebe Uyumu"]
    },
    {
      title: "Mali Tablolar & Bağımsız Denetim",
      image: "/images/mali-musavirlik-finansal-tablolar-denetim-destegi.webp",
      desc: "TMS/TFRS ve VUK standartlarında bilanço ve gelir tablosu analizi, banka kredibilitesi optimizasyonu ve bağımsız denetime hazırlık.",
      badge: "Denetim & Bilanço",
      points: ["Mali Tablo Analizi", "Banka Kredi Rasyoları", "Bağımsız Denetim Hazırlığı", "Bilanço İyileştirme"]
    }
  ];

  // 10 BAŞLIK: İLK DEFA ŞİRKET KURUYORUM NELERE DİKKAT ETMELİYİM, ŞAHIS ŞİRKETİ Mİ LİMİTED ŞİRKET Mİ?
  const companySetupGuides = [
    {
      number: "01",
      title: "Şirket Türü Seçimi: Şahıs Şirketi mi, Limited Şirket mi?",
      summary: "Gelir vergisi dilimi vs. sabit kurumlar vergisi oranı, itibar ve ciro beklentisi karşılaştırması.",
      content: `Şahıs Şirketi kuruluş maliyeti düşük, aynı gün açılabilen ve masrafı az bir modeldir; ancak kârınız arttıkça %15'ten başlayıp %40'a varan artan oranlı Gelir Vergisi dilimine girersiniz. Limited Şirket (LTD) ise sabit %25 Kurumlar Vergisi oranına tabidir. Yıllık net kâr beklentiniz belli bir eşiğin üzerindeyse, kurumsal müşterilerle çalışacaksanız ve marka imajı ön plandaysa Limited Şirket çok daha avantajlıdır.`
    },
    {
      number: "02",
      title: "Sermaye Şartları ve Kuruluş Maliyeti Farkı",
      summary: "Şahıs şirketinde asgari sermaye yoktur; Limited şirkette asgari 50.000 TL sermaye şartı bulunur.",
      content: `Şahıs şirketinde Ticaret Sicil'e sermaye taahhüdü zorunlu değildir. Limited şirket kurarken ise Türk Ticaret Kanunu uyarınca en az 50.000 TL esas sermaye taahhüt edilir (kuruluş aşamasında bloke şartı kalkmış olup 24 ay içinde şirket hesabına yatırılması yeterlidir). Kuruluş harçları ve noter masrafları şahıs şirketinde minimum düzeydeyken, limited şirkette ticaret odası tescil ve ilan giderleri bulunur.`
    },
    {
      number: "03",
      title: "Borç ve Kamu Yükümlülüklerinde Şahsi Sorumluluk Riski",
      summary: "Şahıs şirketinde tüm mal varlığınız risk altındayken, limited şirkette sorumluluk sınırlandırılmıştır.",
      content: `Şahıs şirketi tüzel kişilik değildir; ticari ve kamu borçlarından şahsi mal varlığınızla (ev, araç, kişisel hesaplar) sınırsız sorumlu olursunuz. Limited şirkette ise ticari borçlarda sorumluluk şirkete koyduğunuz taahhüt edilen sermaye ile sınırlıdır (kamu borçlarında ortaklar hisseleri oranında sorumludur). Yüksek riskli sektörlerde LTD seçimi şahsi varlıklarınızı korur.`
    },
    {
      number: "04",
      title: "Doğru NACE Faaliyet Kodunun Belirlenmesi",
      summary: "Yanlış NACE kodu ileride fatura kesme kısıtları ve ruhsat iptallerine yol açabilir.",
      content: `Şirket açılışında ana sözleşmeye veya vergi dairesi kaydına girilen 6 haneli NACE kodu, faaliyet alanınızı resmen belirler. E-ticaret, yazılım, danışmanlık veya imalat gibi farklı alanların defter hadleri ve tabi olduğu mevzuat değişir. Mali müşavirinizle birlikte şirketin ileride yapacağı yan faaliyetleri de kapsayacak geniş bir NACE kodu seçilmelidir.`
    },
    {
      number: "05",
      title: "Ofis Adresi: Sanal Ofis mi, Ev (Home-Ofis) mi, Fiziksel Kiralama mı?",
      summary: "Kira stopajı (%20) yükü vs. faturalı sanal ofis kiralama avantajı.",
      content: `Fiziksel veya ev adresi gösterildiğinde, mülk sahibi gerçek kişi ise her ay net kira üzerinden %20 stopaj (gelir vergisi kesintisi) doğar. Kurumsal sanal ofis tercih ettiğinizde ise adres sağlayıcı firma size KDV'li fatura keser; stopaj ödemezsiniz ve KDV'yi gider olarak mahsup edebilirsiniz. Prestijli bir plazada (örneğin Ankara Suit Tower) sanal ofis adresi göstermek maliyeti düşürür.`
    },
    {
      number: "06",
      title: "e-Fatura, e-Arşiv ve Dijital Dönüşüm Zorunlulukları",
      summary: "İlk günden itibaren e-fatura sistemine dahil olmanın maliyet ve zaman avantajları.",
      content: `Artık kâğıt fatura dönemi neredeyse bitti. Ciro sınırınız zorunlu olmasa dahi şirket kuruluşuyla birlikte e-Arşiv / e-Fatura entegrasyonu yapmak; kargo maliyetini sıfırlar, tahsilat hızını artırır ve muhasebenize anında dijital entegre olur. Mali müşaviriniz aracılığıyla mali mühür temini veya e-İmza ile sistem bir saatte aktif edilir.`
    },
    {
      number: "07",
      title: "Bağ-Kur ve SGK Yükümlülükleri & Genç Girişimci İstisnası",
      summary: "29 yaş altı genç girişimciler için 1 yıl Bağ-Kur prim muafiyeti ve vergi avantajı.",
      content: `Şirket kurduğunuz gün otomatik olarak 4B (Bağ-Kur) sigortalısı olursunuz. Ancak başka bir iş yerinde 4A sigortalı çalışıyorsanız Bağ-Kur primi ödemeniz gerekmez. Ayrıca ilk defa şirket kuran 29 yaş altı gençler için 'Genç Girişimci Desteği' kapsamında 1 yıl boyunca Bağ-Kur primi devlet tarafından ödenir ve 3 yıl boyunca yıllık gelir vergisinden belirli bir tutar muaf tutulur.`
    },
    {
      number: "08",
      title: "Vergi Takvimi ve Düzenli Yasal Gider Yönetimi",
      summary: "Hangi harcamalar şirket gideri yazılabilir? Vergi cezalarından nasıl korunulur?",
      content: `Şirketinize ait yakıt, yemek, ofis kırtasiyesi, bilgisayar, internet ve temsil giderleri yasal fatura karşılığında kurum kârından düşülebilir. Ancak şahsi harcamalar şirket gideri gösterilemez. Her ay KDV-1, Muhtasar ve Prim Hizmet Beyannamesi (SGK), üç ayda bir Geçici Vergi ve yıllık Kurumlar/Gelir Vergisi beyanları gecikmeksizin mali müşavirinizce verilmeli, sürpriz cezalara mahal verilmemelidir.`
    },
    {
      number: "09",
      title: "Şirket Banka Hesabı, Ticari Kredi Kartı ve Kasa Disiplini",
      summary: "Şirket parası ile şahsi paranın birbirine karıştırılmaması kuralı.",
      content: `Şirket adına açılan ticari vadesiz hesap ve şirket kredi kartı ile tüm tahsilat ve ödemeler yapılmalıdır. Ortakların şirket kasasından kontrolsüz para çekmesi 'örtülü kazanç' veya 'adat faizi' gibi ağır vergi cezalarına neden olabilir. Sağlıklı bir şirket, banka ekstreleri ile fatura defterlerinin her ay sonu kuruşu kuruşuna örtüştüğü şirkettir.`
    },
    {
      number: "10",
      title: "Doğru Mali Müşavir Seçimi: Sadece Defter Tutan Değil, Proaktif Danışman",
      summary: "Ayda bir evrak alan değil; finansal yön gösteren, dijital portalla çalışan SMMM farkı.",
      content: `Mali müşavir şirketinizin en kritik iş ortağıdır. Yalnızca ay sonu vergi tahakkuk fişini gönderen değil; vergi indirimlerini vaktinde hatırlatan, dijital fiş/fatura yükleme portalı sunan, nakit akışınızı ve kârlılığınızı grafiklerle özetleyen yetkili bir SMMM ile çalışmak şirketinize yüz binlerce liralık kâr ve sıfır denetim riski kazandırır.`
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
      desc: "Mükellef portalımız üzerinden fiş, fatura ve belgeleriniz anlık dijital arşive alınarak kaybolma riski sıfırlanır."
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
      q: "Bordrolama hizmetini dış kaynağa (BPO) aktarmanın faydası nedir?",
      a: "Şirket içi maaş gizliliğini %100 korur, bordro hesaplama yükünü idari kadronuzdan alır ve İş Kanunu ile SGK mevzuatındaki ağır cezai yaptırımlara karşı yetkili mali müşavir güvencesi sağlar."
    },
    {
      q: "Olası bir Vergi İncelemesi sürecinde nasıl bir yol izleniyor?",
      a: "Vergi Denetim Kurulu veya Gelir İdaresi müfettişlerince talep edilen yasal defter, e-belge ve kayıtların mevzuata uygun sunumu, izahat toplantıları ve uzlaşma komisyonlarında şirketinizi resmî vekil olarak temsil ediyoruz."
    }
  ];

  return (
    <div className="min-h-screen bg-[#040a1a] text-white pb-20 transition-colors duration-300 page-container">
      {/* 1. Grand Standalone Homepage Hero Section */}
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
          <div className="absolute inset-0 bg-[#040a1a]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040a1a] via-[#040a1a]/85 to-transparent lg:via-[#040a1a]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040a1a]/80 via-transparent to-[#040a1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-xs text-white/60 mb-6 sm:mb-8">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 text-[#d4af37]" />
            <span className="text-[#d4af37]">Mali Müşavirlik</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#071128]/90 backdrop-blur-md text-xs font-semibold text-[#d4af37] shadow-lg shadow-black/40">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>TÜRMOB &amp; ASMMMO RUHSATLI MALİ MÜŞAVİRLİK</span>
              </div>

              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-light tracking-tight text-white leading-[1.15]">
                Mali Disiplin, Sıfır Risk ve <span className="gold-gradient-text font-serif italic">Stratejik Finans</span>
              </h1>

              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl">
                Yalnızca geçmişi deftere işleyen değil; proaktif vergi planlaması, şirket kuruluş mimarisi, gizli bordrolama ve yönetim raporlamasıyla şirketinizin net kârlılığını güvence altına alan mali müşavirlik ortaklığı.
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
                      <div className="text-xs font-semibold text-white">ASMMMO &amp; TÜRMOB</div>
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
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">Şirket Kuruluşu &amp; Tescil</div>
                        <div className="text-[11px] text-white/50">LTD, A.Ş. ve Şahıs Firmaları</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold gold-gradient-text">Hızlı Tescil</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between hover:border-[#d4af37]/40 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-[#071128] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">Vergi Denetimi &amp; Uzlaşma</div>
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
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">E-Defter &amp; E-Fatura</div>
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

      {/* 2. Biz Kimiz & Mali Müşavirlik Yaklaşımımız (Hakkımızda) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-[#d4af37]/20 bg-[#020612]/70">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative h-96 sm:h-[460px] w-full rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-2xl">
                <Image
                  src="/images/suleyman-ilhan-rotayd-mali-musavirlik-kurucu.webp"
                  alt="SMMM Süleyman İlhan - ROTAYD Mali Müşavirlik"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-[#040a1a]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#040a1a]/85 backdrop-blur-md border border-[#d4af37]/30">
                  <div className="text-base font-bold text-white">Süleyman İlhan</div>
                  <div className="text-xs text-[#d4af37]">Serbest Muhasebeci Mali Müşavir (SMMM)</div>
                  <div className="text-[11px] text-white/50 mt-1">TÜRMOB &amp; ASMMMO Yetkili Üyesi</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>BİZ KİMİZ?</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
                Ruhsatlı Yetki, Dijital Altyapı ve <span className="gold-gradient-text font-serif italic">Güven Odaklı Yaklaşım</span>
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                ROTAYD Mali Müşavirlik, Ankara Çankaya Suit Tower merkezli olarak; Türkiye&apos;nin önde gelen sanayi, teknoloji ve hizmet şirketlerine butik mali müşavirlik ve vergi yönetimi hizmeti sunmaktadır.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center space-x-2 text-[#d4af37] font-semibold text-xs">
                    <Scale className="w-4 h-4" />
                    <span>Yasal Mevzuat ve Etik İlkeler</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Vergi Usul Kanunu, Türk Ticaret Kanunu ve İş Kanunu çerçevesinde şirketinizin haklarını kuruşu kuruşuna savunan şeffaf temsil.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center space-x-2 text-[#d4af37] font-semibold text-xs">
                    <Building className="w-4 h-4" />
                    <span>Suit Tower Çankaya Ofisi</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Başkentin prestijli iş merkezinde yüz yüze ve dijital toplantılarla kesintisiz yönetici iletişimi.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-white/70">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>350+ Denetlenen Şirket Defteri</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>15+ Yıllık Kıdemli SMMM Deneyimi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Zaman Damgalı Mükellef Portalı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 10 BAŞLIK: İLK DEFA BİR ŞİRKET KURUYORUM: NELERE DİKKAT ETMELİYİM? ŞAHIS MI LİMİTED Mİ? */}
      <section id="sirket-kurulus-rehberi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#d4af37]/40 bg-[#071128] text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>GİRİŞİMCİLER &amp; YATIRIMCILAR İÇİN 10 KRİTİK BAŞLIK</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
            İlk Defa Bir Şirket Kuruyorum: <br className="hidden sm:inline" />
            <span className="gold-gradient-text font-serif italic">Nelere Dikkat Etmeliyim? Şahıs mı, Limited mi?</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-2xl mx-auto">
            Hatalı şirket türü seçimi ve eksik vergi planlaması yılda yüz binlerce liralık gereksiz vergiye yol açabilir. İşte bilmeniz gereken 10 temel ilke:
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
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 text-xs sm:text-sm text-white/80 leading-relaxed space-y-3 bg-[#040d24]/60">
                    <p>{guide.content}</p>
                    <div className="pt-2 flex items-center justify-between text-xs text-[#d4af37]">
                      <span className="font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>SMMM Süleyman İlhan Tavsiyesi</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" })}
                        className="hover:underline flex items-center space-x-1"
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
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">Şirketinizi Kurmaya Hazır mısınız?</h4>
            <p className="text-xs text-white/60">
              Ticaret sicil ana sözleşmesi, vergi dairesi yoklaması ve e-fatura açılışınızı 48 saatte tamamlayalım.
            </p>
          </div>
          <button
            type="button"
            onClick={() => document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" })}
            className="whitespace-nowrap px-6 py-3 rounded-full bg-[#d4af37] text-black font-bold text-xs hover:bg-[#faecc0] transition-colors shadow-lg"
          >
            Kuruluş Sürecini Başlat
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
                <div className="px-5 pb-5 text-xs text-white/70 leading-relaxed border-t border-white/5 pt-3">
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
                    alt={post.title}
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
          <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest">RESMÎ MALİ DANIŞMANLIK</span>
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
  );
}
