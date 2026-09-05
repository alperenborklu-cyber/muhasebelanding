import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ChevronRight, Lock, KeyRound, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "Gizlilik ve Veri Güvenliği Politikası | ROTAYD",
  description: "ROTAYD Mali Müşavirlik veri gizliliği, SSL şifreleme ve kurumsal bilgi güvenliği taahhüdü.",
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-[#040a1a] text-white pt-28 pb-20 page-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-xs text-white/50 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#d4af37]">Gizlilik ve Veri Güvenliği</span>
        </div>

        <div className="border-b border-[#d4af37]/20 pb-8 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#071128] text-xs font-semibold text-[#d4af37] uppercase mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Güvenlik Taahhüdü</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
            Gizlilik ve <span className="gold-gradient-text font-serif italic">Veri Güvenliği Politikası</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-3 leading-relaxed">
            Son Güncelleme: 05 Ocak 2026 | ROTAYD Bilgi Güvenliği Yönetimi
          </p>
        </div>

        <div className="space-y-8 text-white/80 text-sm leading-relaxed">
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
              <span>1. Gizlilik İlkemiz</span>
            </h2>
            <p>
              ROTAYD Mali Müşavirlik ve Yönetim Danışmanlığı olarak, müvekkillerimizin ve web sitemizi ziyaret eden tüm kullanıcılarımızın ticari, kurumsal ve şahsi verilerinin gizliliğine azami hassasiyet gösteriyoruz. Meslek sırrının korunması ve güvenliğin sağlanması kurumsal kültürümüzün temel taşıdır.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <KeyRound className="w-5 h-5 text-[#d4af37]" />
              <span>2. Teknik ve İdari Güvenlik Önlemleri</span>
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-white/70">
              <li><strong>256-Bit SSL/TLS Şifreleme:</strong> Web sitemiz üzerinden iletilen tüm randevu talepleri ve iletişim formları uçtan uca şifrelenir.</li>
              <li><strong>Güvenli Sunucu Altyapısı:</strong> Sunucularımız düzenli güvenlik taramalarından geçirilmekte, yetkisiz erişimlere karşı güvenlik duvarları (WAF) ile korunmaktadır.</li>
              <li><strong>Sınırlı Erişim:</strong> Form verilerine yalnızca yetkili mali müşavir ve danışmanlarımız görev tanımları kapsamında erişebilmektedir.</li>
            </ul>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Server className="w-5 h-5 text-[#d4af37]" />
              <span>3. İletişim ve Destek</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              Gizlilik politikamızla ilgili soru ve önerileriniz için dilediğiniz zaman <a href="mailto:info@rotayd.com" className="text-[#d4af37] underline">info@rotayd.com</a> üzerinden ekibimizle iletişime geçebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
