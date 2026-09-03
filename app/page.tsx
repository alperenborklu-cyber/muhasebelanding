"use client";

import ScrollCanvasDoor from "@/components/ScrollCanvasDoor";
import ReferencesMarquee from "@/components/ReferencesMarquee";
import AnimatedCounter from "@/components/AnimatedCounter";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Briefcase, 
  ArrowRight, 
  Phone, 
  TrendingUp, 
  Target, 
  Award, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  BookOpen
} from "lucide-react";
import { useState } from "react";
import { BLOG_POSTS } from "@/lib/blogData";

export default function Home() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Genel Danışmanlık",
  });

  const latestPosts = BLOG_POSTS.slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 6000);
  };

  return (
    <div className="bg-[#040a1a] text-white transition-colors duration-300 page-container">
      {/* 1. Creative Scrollytelling Golden Door Canvas */}
      <ScrollCanvasDoor />

      {/* 2. Sürekli Dönen Türk Firmaları Referanslar Silsilesi */}
      <ReferencesMarquee />

      {/* 3. Animasyonlu Sayaçlar (Rakamlarla ROTAYD) */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#d4af37]/20 bg-[#040a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">

            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
              Performans <span className="gold-gradient-text font-serif italic">Göstergelerimiz</span>
            </h2>
            <p className="text-white/60 text-xs sm:text-sm">
              Mali disiplin ve devlet teşviklerinde denetimden geçmiş somut kazanımlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat 1 - 2.600.000 TL Animated Counter */}
            <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/25 text-center group hover:border-[#d4af37] transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#0b1938] border border-[#d4af37]/30 flex items-center justify-center mx-auto mb-5">
                <TrendingUp className="w-7 h-7 text-[#d4af37]" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                <span className="gold-gradient-text">
                  <AnimatedCounter to={2600000} duration={2.2} />
                </span>{" "}
                <span className="text-xl text-[#d4af37]">TL</span>
              </div>
              <h3 className="text-sm font-semibold text-white/90">
                Kazanılan SGK İstihdam Teşviki
              </h3>
              <p className="text-xs text-white/50 mt-1">
                İşletmeler adına tahsil edilen net prim tasarrufu.
              </p>
            </div>

            {/* Stat 2 - %99 Animated Counter */}
            <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/25 text-center group hover:border-[#d4af37] transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#0b1938] border border-[#d4af37]/30 flex items-center justify-center mx-auto mb-5">
                <Target className="w-7 h-7 text-[#d4af37]" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                <span className="gold-gradient-text">
                  %<AnimatedCounter to={99} duration={1.8} separator={false} />
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white/90">
                Proje ve Teşvik Başarı Oranı
              </h3>
              <p className="text-xs text-white/50 mt-1">
                KOSGEB ve Bakanlık dosya kabul oranı.
              </p>
            </div>

            {/* Stat 3 - 1.162+ Animated Counter */}
            <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/25 text-center group hover:border-[#d4af37] transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#0b1938] border border-[#d4af37]/30 flex items-center justify-center mx-auto mb-5">
                <Award className="w-7 h-7 text-[#d4af37]" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                <span className="gold-gradient-text">
                  <AnimatedCounter to={1162} duration={2.2} />+
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white/90">
                Tamamlanan Kurumsal Proje
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Danışmanlık sunulan aktif şirket adedi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Türk İş Dünyası Görsel Kartları (Zero Duplicate Images) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#040a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/40 transition-all">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="/images/photo-1.webp"
                  alt="Kurumsal Hizmet Mimarisi"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-[#040a1a]/40 to-transparent" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-[#faecc0] transition-colors">
                  Kalite Anlayışımız
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  İşletmenizi 360° analiz eder, katma değer odaklı butik finansal çalışma ortamı oluştururuz.
                </p>
              </div>
            </div>

            <div className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/40 transition-all">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="/images/photo-2.webp"
                  alt="Stratejik Çözüm Ortakları"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-[#040a1a]/40 to-transparent" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-[#faecc0] transition-colors">
                  Çözüm Ortaklarımız
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Yetkin çözüm ortaklarımızla en etkin ve sürdürülebilir büyüme altyapısını kuruyoruz.
                </p>
              </div>
            </div>

            <div className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/40 transition-all">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="/images/photo-3.webp"
                  alt="Kurumsal Sosyal Sorumluluk"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-[#040a1a]/40 to-transparent" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-[#faecc0] transition-colors">
                  Sosyal Sorumluluk
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Toplumsal kalkınmaya öncülük etme bilinciyle sürdürülebilir kurumsal projeleri destekliyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Split Portal Görsel Kartları */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#040a1a] via-[#071330] to-[#040a1a] border-t border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              İki Ana <span className="gold-gradient-text font-serif italic">Uzmanlık Kanalımız</span>
            </h2>
            <p className="text-xs text-white/60">
              İhtiyacınıza uygun kapıyı seçerek detayları inceleyin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Muhasebecilik Card */}
            <div className="group glass-panel rounded-3xl overflow-hidden border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300 flex flex-col justify-between">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src="/images/photo-4.webp"
                  alt="Mali Müşavirlik & Muhasebe"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071128] via-[#071128]/40 to-transparent" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#040a1a]/80 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                </div>
              </div>

              <div className="p-7 space-y-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">01 / Finansal Mimari</span>
                  <h3 className="text-2xl font-bold text-white mt-1">Muhasebecilik & Mali Müşavirlik</h3>
                  <p className="text-xs text-white/65 mt-2 leading-relaxed">
                    Yönetim muhasebesi, SGK istihdam teşvikleri, bordrolama ve vergi denetimi.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {["Yönetim Muhasebesi", "SGK Teşviki", "Bordrolama", "Vergi"].map((item) => (
                    <span key={item} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/muhasebecilik"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-semibold text-xs hover:opacity-95 transition-all"
                  >
                    <span>Muhasebecilik Sayfasını Aç</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Danışmanlık Card */}
            <div className="group glass-panel rounded-3xl overflow-hidden border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300 flex flex-col justify-between">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src="/images/photo-5.webp"
                  alt="Yönetim Danışmanlığı & Teşvikler"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071128] via-[#071128]/40 to-transparent" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#040a1a]/80 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-[#d4af37]" />
                </div>
              </div>

              <div className="p-7 space-y-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">02 / Stratejik Büyüme</span>
                  <h3 className="text-2xl font-bold text-white mt-1">Yönetim Danışmanlığı</h3>
                  <p className="text-xs text-white/65 mt-2 leading-relaxed">
                    Yatırım teşvik belgeleri, KOSGEB hibeleri, ihracat destekleri ve 360° firma analizi.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {["Yatırım Teşviki", "KOSGEB", "Kurumsal Gelişim", "Bakanlık"].map((item) => (
                    <span key={item} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/danismanlik"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-semibold text-xs hover:opacity-95 transition-all"
                  >
                    <span>Danışmanlık Sayfasını Aç</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Güncel Blog & Rehberler Vitrini */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#040a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Güncel Rehberler</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-light text-white">
                Mali & Yönetim <span className="gold-gradient-text font-serif italic">Blogu</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#d4af37] hover:text-white transition-colors"
            >
              <span>Tüm 10 Rehberi İnceleyin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#071330]/90 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center space-x-2 text-[11px] text-white/40">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#faecc0] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-1 text-xs text-[#d4af37] font-medium flex items-center space-x-1">
                  <span>Rehberi Oku</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. İletişim Formu */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#020612] border-t border-white/10 transition-colors duration-300">
        <div className="max-w-3xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-[#d4af37]/30 shadow-2xl">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Hızlı <span className="gold-gradient-text font-serif italic">Ön Görüşme</span>
            </h2>
            <p className="text-xs text-white/60">
              Formu iletin, uzman ekibimiz aynı gün içinde size ulaşsın.
            </p>
          </div>

          {formSent ? (
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-1">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-white">Talebiniz Alındı</h3>
              <p className="text-xs text-emerald-200">ROTAYD danışmanlarımız kısa sürede sizinle iletişime geçecektir.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ad Soyad / Firma Ünvanı"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#d4af37]"
                />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Telefon (05XX XXX XX XX)"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="E-Posta Adresi"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#d4af37]"
                />
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#071330] border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Yönetim Muhasebesi">Yönetim Muhasebesi & Mali Müşavirlik</option>
                  <option value="SGK Teşvik Danışmanlığı">SGK İstihdam Teşvikleri</option>
                  <option value="Yatırım Teşvik Belgesi">Yatırım Teşvik Belgesi Destekleri</option>
                  <option value="KOSGEB & Bakanlık Destekleri">KOSGEB & Bakanlık Destekleri</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
              >
                Danışmanlık Talebini Gönder
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
