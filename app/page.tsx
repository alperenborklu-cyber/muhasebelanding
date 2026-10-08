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
  BookOpen,
  Calendar,
  Clock
} from "lucide-react";
import AppointmentForm from "@/components/AppointmentForm";
import FAQSection from "@/components/FAQSection";
import PerformanceLeadModal from "@/components/PerformanceLeadModal";
import { useState, useEffect } from "react";
import { BLOG_POSTS } from "@/lib/blogData";

export default function Home() {
  const latestPosts = BLOG_POSTS.slice(0, 3);

  // Clean any #hash from URL and handle smooth scroll query
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      const params = new URLSearchParams(window.location.search);
      const navTarget = params.get("nav");
      if (navTarget) {
        setTimeout(() => {
          document.getElementById(navTarget)?.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", window.location.pathname);
        }, 300);
      }
    }
  }, []);

  return (
    <div className="bg-[#040a1a] text-white transition-colors duration-300 page-container">
      {/* 1. Creative Scrollytelling Golden Door Canvas */}
      <ScrollCanvasDoor />

      {/* 2. Sürekli Dönen Türk Firmaları Referanslar Silsilesi */}
      <ReferencesMarquee />

      {/* 3. Animasyonlu Sayaçlar (Rakamlarla ROTAYD) */}
      <section id="performans-gostergeleri" className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#d4af37]/20 bg-[#040a1a] transition-colors duration-300">
        <PerformanceLeadModal targetSectionId="performans-gostergeleri" />
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
                  <AnimatedCounter from={1850000} to={2600000} duration={1.8} />
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
                  %<AnimatedCounter from={85} to={99} duration={1.5} separator={false} />
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
                  <AnimatedCounter from={880} to={1162} duration={1.8} />+
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
                  src="/images/rotayd-mali-musavirlik-guvenilirlik-bagimsiz-denetim.webp"
                  alt="ROTAYD Mali Müşavirlik, Bağımsız Denetim ve Muhasebecilik Hizmetleri"
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
                  src="/images/rotayd-yonetim-danismanligi-stratejik-analitik-yaklasim.webp"
                  alt="ROTAYD Yönetim Danışmanlığı, Mali Müşavirlik ve Stratejik Çözüm Ortaklığı"
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
                  src="/images/rotayd-kurumsal-yonetim-danismanligi-surdurulebilir-gelisim.webp"
                  alt="ROTAYD Kurumsal Yönetim Danışmanlığı, Mali Müşavirlik ve Sürdürülebilir Büyüme"
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



      {/* 6. Güncel Blog & Rehberler Vitrini */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#040a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Güncel Blog</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-light text-white">
                Mali & Yönetim <span className="gold-gradient-text font-serif italic">Blogu</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#d4af37] hover:text-white transition-colors"
            >
              <span>Tüm Yazıları İnceleyin</span>
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
                      alt={`${post.title} - ROTAYD Mali Müşavirlik ve Yönetim Danışmanlığı`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#071330]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] text-[#d4af37] font-semibold">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center space-x-3 text-[11px] text-white/40">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-[#d4af37]" />
                        <span>{post.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#d4af37]" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#c59b27] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-1 text-xs text-[#d4af37] font-medium flex items-center space-x-1">
                  <span>Devamını Oku</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Sıkça Sorulan Sorular (FAQ) */}
      <FAQSection />

      {/* 8. Stratejik Randevu Formu */}
      <AppointmentForm />
    </div>
  );
}
