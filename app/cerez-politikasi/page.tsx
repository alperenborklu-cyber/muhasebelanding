import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, ChevronRight, CheckCircle2, Shield, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Çerez Politikası | ROTAYD Mali Müşavirlik & Yönetim Danışmanlığı",
  description: "Web sitemizde kullanılan çerezler, kullanım amaçları ve çerez tercihlerinizi yönetme rehberi.",
};

export default function CerezPolitikasiPage() {
  return (
    <div className="min-h-screen bg-[#040a1a] text-white pt-28 pb-20 page-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-white/50 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#d4af37]">Çerez Politikası</span>
        </div>

        {/* Header */}
        <div className="border-b border-[#d4af37]/20 pb-8 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#071128] text-xs font-semibold text-[#d4af37] uppercase mb-3">
            <Cookie className="w-3.5 h-3.5" />
            <span>Çerez ve Gizlilik Bildirimi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
            ROTAYD <span className="gold-gradient-text font-serif italic">Çerez Politikası</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-3 leading-relaxed">
            Son Güncelleme: 05 Ocak 2026 | rotayd.com
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-white/80 text-sm leading-relaxed">
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#d4af37]" />
              <span>1. Çerez (Cookie) Nedir?</span>
            </h2>
            <p>
              Çerezler, bir web sitesini ziyaret ettiğinizde bilgisayarınız veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler web sitesinin verimli çalışmasını, kullanıcı deneyiminizin kişiselleştirilmesini ve tercihlerinizi hatırlayarak sonraki ziyaretlerinizin daha hızlı ve sorunsuz gerçekleşmesini sağlar.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Settings className="w-5 h-5 text-[#d4af37]" />
              <span>2. Sitemizde Kullanılan Çerez Türleri</span>
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                <h3 className="font-semibold text-white text-sm text-[#faecc0]">A. Zorunlu Çerezler (Strictly Necessary Cookies)</h3>
                <p className="text-xs text-white/70">
                  Web sitemizin güvenliğinin sağlanması, sayfalar arası geçişlerin çalışması, form güvenliği ve temel işlevlerin yerine getirilmesi için kesinlikle gereklidir. Bu çerezler kapatılamaz.
                </p>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                <h3 className="font-semibold text-white text-sm text-[#faecc0]">B. Performans ve Analitik Çerezler</h3>
                <p className="text-xs text-white/70">
                  Ziyaretçilerin web sitemizi nasıl kullandığını, hangi sayfaların daha çok ilgi gördüğünü ve hata sayfalarının tespitini anonim olarak analiz etmemizi sağlar. Bu veriler yalnızca site hızını ve kullanıcı deneyimini iyileştirmek için kullanılır.
                </p>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                <h3 className="font-semibold text-white text-sm text-[#faecc0]">C. İşlevsellik Çerezleri</h3>
                <p className="text-xs text-white/70">
                  Kullanıcının dil tercihi, tema seçimi veya daha önce kapatılan bilgilendirme pencerelerini hatırlayarak zenginleştirilmiş bir deneyim sunar.
                </p>
              </div>
            </div>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-[#d4af37]" />
              <span>3. Çerez Tercihlerini Nasıl Yönetebilirsiniz?</span>
            </h2>
            <p>
              İnternet tarayıcınızın ayarlarını değiştirerek çerez tercihlerinizi dilediğiniz an kişiselleştirebilir veya tüm çerezleri engelleyebilirsiniz. Çerezleri devre dışı bırakmanız halinde web sitemizin bazı özellikleri tam performansla çalışmayabilir:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-white/70">
              <li><strong>Google Chrome:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve diğer site verileri</li>
              <li><strong>Mozilla Firefox:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Site Verileri</li>
              <li><strong>Apple Safari:</strong> Tercihler &gt; Gizlilik &gt; Tüm Çerezleri Engelle</li>
              <li><strong>Microsoft Edge:</strong> Ayarlar &gt; Çerezler ve Site İzinleri</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
