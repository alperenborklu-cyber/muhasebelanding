import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Briefcase,
  Award,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Building,
  Landmark,
  Scale,
  FileText,
  Sparkles,
  ChevronRight,
  Phone,
  MessageSquare
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | Süleyman İlhan & Canan İlhan | ROTAYD Danışmanlık",
  description:
    "ROTAYD Mali Müşavirlik ve Yönetim Danışmanlığı kurucu ortakları SMMM Süleyman İlhan ve Yönetim Danışmanı Canan İlhan liderliğinde; yönetim muhasebesi, vergi denetimi, yatırım teşvikleri, belgelendirme ve KOSGEB hibe danışmanlığında 15+ yıllık tecrübe.",
  keywords:
    "Süleyman İlhan, Canan İlhan, SMMM Süleyman İlhan, Canan İlhan LinkedIn, Rotayd Hakkımızda, Mali Müşavir Ankara, Yönetim Danışmanı, Belgelendirme Danışmanı, PROYAD, ASMMMO, TÜRMOB, Çankaya Mali Müşavirlik",
  openGraph: {
    title: "Hakkımızda | Süleyman İlhan & Canan İlhan | ROTAYD Danışmanlık",
    description:
      "Stratejik yönetim muhasebesi, devlet teşvikleri, belgelendirme ve kurumsal danışmanlıkta 15+ yıllık uzmanlık ve güvence.",
    images: ["/images/suleyman-ilhan-mali-musavir-yonetim-danismani.webp"],
  },
};

export default function HakkimizdaPage() {
  const stats = [
    { value: "15+", label: "Yıllık Sektör Tecrübesi", desc: "Vergi, muhasebe ve teşvik mevzuatında kıdem" },
    { value: "450+", label: "Aktif Kurumsal Portföy", desc: "Sanayi, ticaret ve teknoloji şirketleri" },
    { value: "50M+ TL", label: "Sağlanan Teşvik & Tasarruf", desc: "SGK, yatırım teşvik ve vergi optimizasyonu" },
    { value: "%99", label: "Proje ve Hibe Başarısı", desc: "Bakanlık ve KOSGEB onay performansı" },
  ];

  const corePillars = [
    {
      icon: ShieldCheck,
      title: "Sıfır Hata & Yasal Güven",
      desc: "GİB, SGK ve ilgili bakanlıkların en güncel mevzuatlarına tam entegre, denetim standartlarında kusursuz defter ve beyan yönetimi.",
    },
    {
      icon: TrendingUp,
      title: "Proaktif Teşvik & Hibe Yönetimi",
      desc: "İşletmenizin hak kazandığı SGK prim indirimlerini, yatırım teşviklerini ve devlet hibelerini gecikmeksizin nakit avantaja dönüştürürüz.",
    },
    {
      icon: Scale,
      title: "Analitik Karar Desteği",
      desc: "Klasik muhasebenin ötesine geçerek; kârlılık, nakit akışı ve birim maliyet analizleriyle şirket yöneticilerine stratejik pusula sunarız.",
    },
    {
      icon: Landmark,
      title: "Kurumsal Gizlilik & Sadakat",
      desc: "Müşterilerimizin tüm mali ve ticari verilerini KVKK ve meslek ahlakının en yüksek etik standartlarında titizlikle koruruz.",
    },
  ];

  const memberships = [
    { name: "TÜRMOB", desc: "Türkiye Serbest Muhasebeci Mali Müşavirler ve YMM Odaları Birliği" },
    { name: "ASMMMO", desc: "Ankara Serbest Muhasebeci Mali Müşavirler Odası" },
    { name: "PROYAD", desc: "Proje ve Yatırım Destekleri Danışmanları Derneği" },
    { name: "T.C. Sanayi ve Teknoloji Bakanlığı", desc: "Yatırım Teşvik ve Ar-Ge Uygulama Rehberliği" },
  ];

  return (
    <div className="bg-[#040a1a] text-white transition-colors duration-300 page-container min-h-screen pt-24 pb-20">
      {/* 1. Hero & Breadcrumbs */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1d3b7d]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-[#d4af37] transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#faecc0] font-medium">Hakkımızda</span>
          </nav>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kurumsal Profil & Yönetim</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight max-w-4xl">
            Finansal Disiplin ve Stratejik Rehberlikle,{" "}
            <span className="gold-gradient-text font-serif italic block sm:inline">
              Geleceğe Doğru Güvenli Rota.
            </span>
          </h1>

          <p className="mt-6 text-sm sm:text-base text-white/70 max-w-3xl leading-relaxed">
            ROTAYD Mali Müşavirlik ve Yönetim Danışmanlığı, Türkiye&apos;nin rekabetçi iş dünyasında işletmelerin
            yasal defter, vergi ve bordrolama süreçlerini sıfır hata prensibiyle yönetirken; devlet teşvikleri,
            hibeler ve yönetim muhasebesiyle sürdürülebilir kurumsal kârlılığı inşa etmektedir.
          </p>
        </div>
      </section>

      {/* 2. Kurumsal Liderlik & Kurucu Ortaklar (Süleyman İlhan & Canan İlhan) */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Kurumsal Liderlik &amp; Yönetici Kadro</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              Stratejik Vizyonu Şekillendiren{" "}
              <span className="gold-gradient-text font-serif italic">Kurucu Ortaklarımız</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 max-w-2xl mx-auto leading-relaxed">
              Mali müşavirlik ve vergi mevzuatı disiplini ile yönetim danışmanlığı, belgelendirme ve devlet teşvikleri uzmanlığını tek bir kurumsal yapıda birleştiren güçlü lider kadromuz.
            </p>
          </div>

          <div className="space-y-10">
            {/* Süleyman İlhan Profil Kartı */}
            <div className="glass-panel p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#d4af37]/30 shadow-2xl relative overflow-hidden">
              {/* Ambient Background Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Profile Photo Column */}
                <div className="lg:col-span-4 flex flex-col items-center text-center">
                  <div className="relative group">
                    {/* Golden Rotating Ring */}
                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#b89025] via-[#d4af37] to-[#faecc0] opacity-40 blur-md group-hover:opacity-75 transition-all duration-500" />

                    <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-2xl bg-[#0b1938]">
                      <Image
                        src="/images/suleyman-ilhan-mali-musavir-yonetim-danismani.webp"
                        alt="Süleyman İlhan - SMMM & Kıdemli Yönetim Danışmanı"
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                    </div>

                    {/* Status Badge */}
                    <div className="absolute -bottom-3 inset-x-0 flex justify-center">
                      <span className="px-3.5 py-1 rounded-full bg-[#05112e] border border-[#d4af37] text-[11px] font-bold text-[#faecc0] shadow-lg flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>TÜRMOB &amp; ASMMMO Ruhsatlı</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-1">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Süleyman İlhan</h3>
                    <p className="text-xs sm:text-sm text-[#faecc0] font-semibold">
                      Kurucu Ortak &amp; Kıdemli Yönetim Danışmanı
                    </p>
                    <p className="text-[11px] text-white/60">Serbest Muhasebeci Mali Müşavir (SMMM)</p>
                  </div>

                  {/* LinkedIn Button */}
                  <div className="mt-5 w-full max-w-xs">
                    <a
                      href="https://www.linkedin.com/in/s%C3%BCleyman-ilhan-48298445/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0a66c2]/20 hover:bg-[#0a66c2]/30 border border-[#0a66c2]/40 text-white transition-all text-xs font-semibold flex items-center justify-center space-x-2 group/btn shadow-md"
                    >
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span>LinkedIn Profilini Görüntüle</span>
                      <ExternalLink className="w-3 h-3 text-white/70 group-hover/btn:text-white" />
                    </a>
                  </div>
                </div>

                {/* Biography & Vision Column */}
                <div className="lg:col-span-8 space-y-5 text-left">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      Mali Müşavirlik &amp; Vergi Stratejisi
                    </span>
                    <h4 className="text-xl sm:text-2xl font-light text-white mt-1">
                      Mali Disiplin ve Kurumsal Büyümenin Kesişiminde 15+ Yıl
                    </h4>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    <p>
                      <strong className="text-white font-semibold">Süleyman İlhan</strong>, 15 yılı aşkın mesleki ve
                      yönetim kariyeri boyunca sanayi, imalat, teknoloji, perakende ve hizmet sektörlerinde faaliyet
                      gösteren yüzlerce yerli ve yabancı ortaklı şirkete stratejik mali danışmanlık sağlamıştır.
                    </p>
                    <p>
                      Klasik defter tutma ve beyan hizmetlerinin ötesine geçen bir yaklaşımla; işletmelerin vergi
                      yüklerini yasal sınırlar dahilinde optimize eden, nakit akışını güçlendiren ve kurumların devlet
                      tarafından sağlanan tüm finansal hibelerden en üst düzeyde yararlanmasını sağlayan bütünleşik bir
                      danışmanlık modeli tesis etmiştir.
                    </p>
                    <p>
                      <strong className="text-white font-semibold">Ankara SMMM Odası (ASMMMO)</strong>,{" "}
                      <strong className="text-white font-semibold">TÜRMOB</strong> ve{" "}
                      <strong className="text-white font-semibold">PROYAD (Proje ve Yatırım Destekleri Danışmanları Derneği)</strong>{" "}
                      üyesi olan İlhan; Sanayi ve Teknoloji Bakanlığı Yatırım Teşvik Belgesi süreçleri, KOSGEB hibe
                      programları, SGK istihdam destekleri, Ar-Ge ve Tasarım Merkezi vergi muafiyetleri konularında
                      Türkiye genelinde uzmanlaşmış bir otorite olarak projeler yönetmektedir.
                    </p>
                  </div>

                  {/* Founder Quote */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border-l-4 border-[#d4af37] border-y border-r border-white/10 italic text-xs sm:text-sm text-white/90">
                    &ldquo;Muhasebe yalnızca dünün verilerini deftere işlemek değil; geleceğin doğru kararlarını bugünden
                    şekillendirmektir. ROTAYD&apos;da biz, şirketlerimizin hem mali kalkanı hem de büyüme pusulasıyız.&rdquo;
                    <span className="block mt-2 not-italic font-bold text-[#faecc0] text-xs">
                      — Süleyman İlhan
                    </span>
                  </div>

                  {/* Credential Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-lg bg-[#0b1b3d] border border-[#d4af37]/30 text-[11px] font-medium text-[#faecc0]">
                      ✓ SMMM &amp; Vergi Mevzuatı
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0b1b3d] border border-[#d4af37]/30 text-[11px] font-medium text-[#faecc0]">
                      ✓ Yatırım Teşvik Belgesi Uzmanı
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0b1b3d] border border-[#d4af37]/30 text-[11px] font-medium text-[#faecc0]">
                      ✓ SGK İstihdam Teşvikleri
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0b1b3d] border border-[#d4af37]/30 text-[11px] font-medium text-[#faecc0]">
                      ✓ KOSGEB &amp; Bakanlık Hibeleri
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0b1b3d] border border-[#d4af37]/30 text-[11px] font-medium text-[#faecc0]">
                      ✓ Şirket Nevi Değişiklikleri &amp; Birleşmeler
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Canan İlhan Profil Kartı */}
            <div className="glass-panel p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#d4af37]/30 shadow-2xl relative overflow-hidden">
              {/* Ambient Background Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#1d3b7d]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Profile Photo Column */}
                <div className="lg:col-span-4 flex flex-col items-center text-center">
                  <div className="relative group">
                    {/* Golden Rotating Ring */}
                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#b89025] via-[#d4af37] to-[#faecc0] opacity-40 blur-md group-hover:opacity-75 transition-all duration-500" />

                    <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-2xl bg-[#0b1938]">
                      <Image
                        src="/images/canan-ilhan-yonetim-danismani.webp"
                        alt="Canan İlhan - Kurucu Ortak & Yönetim Danışmanı"
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Status Badge */}
                    <div className="absolute -bottom-3 inset-x-0 flex justify-center">
                      <span className="px-3.5 py-1 rounded-full bg-[#05112e] border border-[#d4af37] text-[11px] font-bold text-[#faecc0] shadow-lg flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Yönetim &amp; Teşvik Danışmanı</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-1">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Canan İlhan</h3>
                    <p className="text-xs sm:text-sm text-[#faecc0] font-semibold">
                      Kurucu Ortak &amp; Yönetim Danışmanı
                    </p>
                    <p className="text-[11px] text-white/60">Belgelendirme &amp; Devlet Destekleri Uzmanı</p>
                  </div>

                  {/* LinkedIn Button */}
                  <div className="mt-5 w-full max-w-xs">
                    <a
                      href="https://www.linkedin.com/in/canan-ilhan-1b7050a4/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0a66c2]/20 hover:bg-[#0a66c2]/30 border border-[#0a66c2]/40 text-white transition-all text-xs font-semibold flex items-center justify-center space-x-2 group/btn shadow-md"
                    >
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span>LinkedIn Profilini Görüntüle</span>
                      <ExternalLink className="w-3 h-3 text-white/70 group-hover/btn:text-white" />
                    </a>
                  </div>
                </div>

                {/* Biography & Vision Column */}
                <div className="lg:col-span-8 space-y-5 text-left">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      Yönetim Danışmanlığı &amp; Akreditasyon
                    </span>
                    <h4 className="text-xl sm:text-2xl font-light text-white mt-1">
                      Stratejik Yönetim, Devlet Destekleri ve Süreç İyileştirme Uzmanlığı
                    </h4>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    <p>
                      <strong className="text-white font-semibold">Canan İlhan</strong>, Rota Yönetim Danışmanlığı bünyesinde kurucu ortak ve yönetim danışmanı olarak; sanayi, ihracat, üretim ve teknoloji alanlarında faaliyet gösteren işletmelerin kurumsal gelişim, belgelendirme ve devlet hibeleri yolculuğuna rehberlik etmektedir.
                    </p>
                    <p>
                      İşletmelerin küresel rekabet standartlarına uyum sağlaması için gerekli olan kalite yönetim sistemleri, uluslararası standart belgelendirmeleri (ISO süreçleri, CE, uygunluk değerlendirme) ve kurumsal akreditasyon mekanizmalarının tesisinde geniş bir portföy yönetmektedir.
                    </p>
                    <p>
                      KOSGEB destek programları, Ticaret Bakanlığı mal ve hizmet ihracatı destekleri, e-ihracat teşvikleri ve yatırım fizibilite çalışmaları konusunda saha tecrübesine sahip olan İlhan; işletmelerin kamu hibe mekanizmalarından zamanında ve eksiksiz biçimde faydalanmasını sağlayarak sürdürülebilir kurumsal katma değer üretmektedir.
                    </p>
                  </div>

                  {/* Founder Quote */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border-l-4 border-[#d4af37] border-y border-r border-white/10 italic text-xs sm:text-sm text-white/90">
                    &ldquo;Kurumsal büyüme yalnızca finansal kaynaklarla değil; doğru teşviklerin, etkin iş süreçlerinin ve uluslararası kalite standartlarının birleşimiyle sürdürülebilir kılınır.&rdquo;
                    <span className="block mt-2 not-italic font-bold text-[#faecc0] text-xs">
                      — Canan İlhan
                    </span>
                  </div>

                  {/* Credential Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-lg bg-[#0b1b3d] border border-[#d4af37]/30 text-[11px] font-medium text-[#faecc0]">
                      ✓ Kurumsal Yönetim Danışmanlığı
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0b1b3d] border border-[#d4af37]/30 text-[11px] font-medium text-[#faecc0]">
                      ✓ Belgelendirme &amp; Kalite Sistemleri (ISO / CE)
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0b1b3d] border border-[#d4af37]/30 text-[11px] font-medium text-[#faecc0]">
                      ✓ KOSGEB Destek &amp; Hibe Danışmanlığı
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0b1b3d] border border-[#d4af37]/30 text-[11px] font-medium text-[#faecc0]">
                      ✓ Ticaret Bakanlığı İhracat Destekleri
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0b1b3d] border border-[#d4af37]/30 text-[11px] font-medium text-[#faecc0]">
                      ✓ Proje Yönetimi &amp; Süreç İyileştirme
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. İstatistikler & Rakamlarla ROTAYD */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-2xl border border-[#d4af37]/20 text-center space-y-2 hover:border-[#d4af37]/50 transition-all"
              >
                <div className="text-3xl sm:text-4xl font-black gold-gradient-text">{stat.value}</div>
                <div className="text-xs sm:text-sm font-semibold text-white">{stat.label}</div>
                <p className="text-[11px] text-white/60 leading-snug">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Misyonumuz ve Vizyonumuz */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Misyon */}
            <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/30 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-light text-white">
                Kurumsal <span className="gold-gradient-text font-serif italic">Misyonumuz</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                İş ortaklarımızın finansal risklerini sıfıra indirmek, mevzuat uyumunu proaktif bir zırh gibi kurgulamak
                ve devletin sunduğu her teşvik imkânından zamanında ve eksiksiz yararlanmalarını sağlayarak öz kaynak
                verimliliklerini en üst düzeye taşımak.
              </p>
            </div>

            {/* Vizyon */}
            <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/30 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-light text-white">
                Stratejik <span className="gold-gradient-text font-serif italic">Vizyonumuz</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Mali müşavirlik disiplini ile yönetim danışmanlığı vizyonunu tek bir çatı altında mükemmel bir kurumsal
                harmoniyle buluşturan; Ankara merkezli olarak tüm Türkiye&apos;de güvenilirlik ve yüksek katma değerin simgesi
                olan lider danışmanlık markası konumunu sürdürmek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Temel İlkelerimiz & Değerlerimiz */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Temel İlkelerimiz
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              Bizi Farklı Kılan <span className="gold-gradient-text font-serif italic">Değerlerimiz</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Her adımda güven, şeffaflık ve somut finansal getiri odaklı çalışma prensiplerimiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corePillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-[#d4af37]/40 transition-all space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed pl-13">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Mesleki Üyelikler & Akreditasyonlar */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Resmi Güvence &amp; Tesciller
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-white">
                Mesleki Kuruluş ve Çözüm Ortaklıklarımız
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {memberships.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 text-center space-y-1 hover:border-[#d4af37]/40 transition-all"
                >
                  <Building className="w-5 h-5 text-[#d4af37] mx-auto mb-2" />
                  <div className="text-sm font-bold text-white">{m.name}</div>
                  <p className="text-[11px] text-white/60 leading-snug">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA / İletişim Çağrısı */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#d4af37]/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                Şirketinizin Geleceğine Doğru{" "}
                <span className="gold-gradient-text font-serif italic">Rotayı Birlikte Çizelim.</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto">
                Süleyman İlhan, Canan İlhan ve ROTAYD uzman ekibiyle tanışarak işletmenizin mali denetim, vergi ve teşvik check-up&apos;ını
                hemen başlatabilirsiniz.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/?nav=consultation#consultation"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Hemen Randevu Talebi Oluştur</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/905536221122?text=Merhaba%2C%20ROTAYD%20Mali%20M%C3%BC%C5%9favirlik%20ve%20Dan%C4%B1%C5%9Fmanl%C4%B1k%20hakk%C4%B1nda%20S%C3%BCleyman%20%C4%B0lhan%20ile%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp ile Hızlı Danışın</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
