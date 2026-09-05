import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, ChevronRight, Scale, BookOpen, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Yasal Uyarı ve Mesleki Beyan | ROTAYD Mali Müşavirlik",
  description: "3568 Sayılı Kanun çerçevesinde yasal uyarı, mesleki sorumluluk sınırları ve fikri mülkiyet beyanı.",
};

export default function YasalUyariPage() {
  return (
    <div className="min-h-screen bg-[#040a1a] text-white pt-28 pb-20 page-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-xs text-white/50 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#d4af37]">Yasal Uyarı</span>
        </div>

        <div className="border-b border-[#d4af37]/20 pb-8 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#071128] text-xs font-semibold text-[#d4af37] uppercase mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Mevzuat ve Mesleki Çerçeve</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
            Yasal Uyarı ve <span className="gold-gradient-text font-serif italic">Kullanım Şartları</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-3 leading-relaxed">
            3568 Sayılı Serbest Muhasebeci Mali Müşavirlik ve Yeminli Mali Müşavirlik Kanunu Çerçevesinde Düzenlenmiştir.
          </p>
        </div>

        <div className="space-y-8 text-white/80 text-sm leading-relaxed">
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-[#d4af37]" />
              <span>1. Bilgilendirme Amacı ve Sorumluluk Reddi</span>
            </h2>
            <p>
              Bu web sitesinde (rotayd.com) yer alan tüm blog yazıları, mevzuat özetleri, teşvik hesaplama modelleri ve rehber içerikler genel bilgilendirme amacıyla hazırlanmıştır. Sitede yer alan hiçbir içerik, hukuki, mali veya vergisel anlamda tek başına bağlayıcı bir mütalaa veya resmî danışmanlık hizmeti teşkil etmez.
            </p>
            <p className="text-xs text-white/70">
              Mevzuat hükümleri ve devlet teşvikleri şartları dinamik olarak değişebileceğinden, somut şirket işlemleriniz için mali müşavirimiz ile doğrudan sözleşmeli danışmanlık yürütmeniz tavsiye edilir.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-[#d4af37]" />
              <span>2. Fikri Mülkiyet ve Telif Hakları</span>
            </h2>
            <p>
              Web sitemizde bulunan tüm metinler, grafikler, ROTAYD logoları ve özgün analizler 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile korunmaktadır. Yazılı izin alınmaksızın kopyalanamaz, çoğaltılamaz ve ticari amaçla kullanılamaz.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-[#d4af37]" />
              <span>3. Mesleki Bağımsızlık ve Etik İlkeler</span>
            </h2>
            <p>
              Ofisimiz, TÜRMOB ve ASMMMO meslek etiği kurallarına, sır saklama yükümlülüğüne ve bağımsız denetim standartlarına harfiyen bağlı olarak hizmet vermektedir.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
