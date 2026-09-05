import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ChevronRight, Lock, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | ROTAYD Mali Müşavirlik & Yönetim Danışmanlığı",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca kişisel verilerinizin işlenmesi, saklanması ve haklarınıza dair aydınlatma metni.",
};

export default function KvkkPage() {
  return (
    <div className="min-h-screen bg-[#040a1a] text-white pt-28 pb-20 page-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-white/50 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#d4af37]">KVKK Aydınlatma Metni</span>
        </div>

        {/* Header */}
        <div className="border-b border-[#d4af37]/20 pb-8 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#071128] text-xs font-semibold text-[#d4af37] uppercase mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Yasal Bilgilendirme</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
            6698 Sayılı KVKK Uyarınca <span className="gold-gradient-text font-serif italic">Aydınlatma Metni</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-3 leading-relaxed">
            Son Güncelleme: 05 Ocak 2026 | ROTAYD Mali Müşavirlik ve Yönetim Danışmanlığı
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-white/80 text-sm leading-relaxed">
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
              <span>1. Veri Sorumlusunun Kimliği</span>
            </h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla <strong>ROTAYD Mali Müşavirlik ve Yönetim Danışmanlığı</strong> (Süleyman İlhan - SMMM) tarafından aşağıda açıklanan kapsamda işlenmektedir.
            </p>
            <div className="bg-[#071330]/80 p-4 rounded-xl border border-white/5 space-y-1.5 text-xs text-white/70">
              <p><strong>Adres:</strong> Konutkent Mahallesi Diyap Ağa Caddesi No:74 Suit Tower B Blok Kat:6 No:39 Çankaya / Ankara</p>
              <p><strong>Telefon:</strong> 0553 622 11 22</p>
              <p><strong>E-Posta:</strong> info@rotayd.com</p>
            </div>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-[#d4af37]" />
              <span>2. İşlenen Kişisel Veriler ve Elde Edilme Yöntemleri</span>
            </h2>
            <p>
              Web sitemizi ziyaretiniz, randevu ve iletişim formlarını doldurmanız, teşvik uygunluk analizi talep etmeniz veya bülten kaydı oluşturmanız esnasında aşağıdaki kişisel verileriniz elektronik ortamda toplanmaktadır:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-white/70 text-xs sm:text-sm">
              <li><strong>Kimlik Bilgileri:</strong> Adınız, soyadınız, unvanınız.</li>
              <li><strong>İletişim Bilgileri:</strong> E-posta adresiniz, telefon numaranız, şirketinizin posta adresi.</li>
              <li><strong>Müşteri İşlem & Finansal Bilgiler:</strong> Talep ettiğiniz danışmanlık türü (Mali Müşavirlik, SGK Teşvikleri, Yatırım Teşvik, KOSGEB vb.), çalışan sayısı aralığı, randevu notları.</li>
              <li><strong>İşlem Güvenliği Bilgileri:</strong> IP adresi, internet sitesi giriş-çıkış kayıtları, çerez kayıtları ve tarayıcı bilgileri.</li>
            </ul>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-[#d4af37]" />
              <span>3. Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepleri</span>
            </h2>
            <p>
              Kişisel verileriniz, KVKK&apos;nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları dahilinde aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-white/70 text-xs sm:text-sm">
              <li>Mali müşavirlik, vergi denetimi, yönetim muhasebesi ve teşvik danışmanlığı hizmet taleplerinizin karşılanması ve sözleşme öncesi süreçlerin yürütülmesi,</li>
              <li>Stratejik randevu ve toplantı planlamalarının organize edilmesi,</li>
              <li>İşletmenize özel SGK prim teşviki, yatırım teşvik belgesi ve KOSGEB hibe uygunluk analizlerinin hazırlanması,</li>
              <li>Talep ettiğiniz bilgilendirme bültenleri, mali mevzuat duyuruları ve performans raporlarının e-posta adresinize iletilmesi,</li>
              <li>Yetkili kamu kurum ve kuruluşları ile meslek örgütleri (ASMMMO, TÜRMOB, Gelir İdaresi Başkanlığı vb.) nezdindeki yasal yükümlülüklerin yerine getirilmesi.</li>
            </ul>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white">4. Kişisel Verilerin Aktarımı</h2>
            <p>
              Toplanan kişisel verileriniz; kanunen yetkili kılınmış kamu kurum ve kuruluşları ile yargı mercileri dışında, açık rızanız olmaksızın üçüncü şahıslara ticari amaçla satılmaz, kiralanmaz ve aktarılmaz. Yalnızca bilişim altyapısı (bulut sunucu ve e-posta servis sağlayıcıları) çerçevesinde güvenli veri saklama standartlarına tabi olarak muhafaza edilir.
            </p>
          </section>

          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold text-white">5. KVKK&apos;nın 11. Maddesi Uyarınca Haklarınız</h2>
            <p>
              Kişisel veri sahibi olarak KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/70">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                • Verilerinizin işlenip işlenmediğini öğrenme
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                • Verileriniz işlenmişse buna ilişkin bilgi talep etme
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                • İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                • Eksik veya yanlış işlenmişse düzeltilmesini isteme
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                • Kanun&apos;un 7. maddesindeki şartlar çerçevesinde silinmesini / yok edilmesini isteme
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                • Kanuna aykırı işleme sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme
              </div>
            </div>
            <p className="pt-2 text-xs text-white/60">
              Haklarınızı kullanmak için kimliğinizi tevsik edici belgeler ile birlikte <a href="mailto:info@rotayd.com" className="text-[#d4af37] underline">info@rotayd.com</a> adresine e-posta gönderebilir veya şirket merkezimize yazılı olarak başvurabilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
