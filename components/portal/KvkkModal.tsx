'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, FileText, CheckCircle2, Lock } from 'lucide-react';

interface KvkkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  showAcceptButton?: boolean;
}

export default function KvkkModal({
  isOpen,
  onClose,
  onAccept,
  showAcceptButton = false
}: KvkkModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-[#07173e] border border-[#d4af37]/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden text-slate-200 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#d4af37]/20 bg-[#040a1a]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#8a701e] flex items-center justify-center text-[#040a1a] shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-wide">
                  KVKK Aydınlatma Metni & Veri Güvenliği Protokolü
                </h2>
                <p className="text-xs text-[#faecc0]/70">
                  6698 Sayılı Kanun ve 213 Sayılı Vergi Usul Kanunu Kapsamında
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm leading-relaxed text-slate-300">
            {/* 1. Veri Sorumlusu */}
            <div className="p-4 rounded-xl bg-[#040a1a]/60 border border-[#d4af37]/20">
              <h3 className="text-sm font-bold text-[#faecc0] uppercase tracking-wider mb-1 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-[#d4af37]" />
                1. Veri Sorumlusu Sıfatı
              </h3>
              <p className="text-xs text-slate-300">
                6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca; verileriniz, veri sorumlusu sıfatıyla{' '}
                <strong className="text-white">Süleyman İlhan - Rotayd Mali Müşavirlik &amp; Yönetim Danışmanlığı</strong> tarafından aşağıda belirtilen kapsamda ve yasal çerçevede işlenmektedir.
              </p>
            </div>

            {/* 2. Toplanan Veri Kategorileri */}
            <div>
              <h3 className="text-base font-bold text-white mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-[#d4af37]" />
                2. Toplanan Kişisel, Ticari ve Finansal Veriler
              </h3>
              <p className="text-xs text-slate-300 mb-3">
                Mükellef portali ve müşavirlik hizmetleri kapsamında aşağıdaki veri kategorileri toplanmakta ve kriptografik olarak korunmaktadır:
              </p>
              <ul className="space-y-2 text-xs">
                <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <strong className="text-[#faecc0]">Kimlik Bilgileri:</strong> Ad-soyad, T.C. Kimlik Numarası (TCKN), Vergi Kimlik Numarası (VKN), yetkili imza sirküleri bilgileri.
                </li>
                <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <strong className="text-[#faecc0]">Tüzel Kişi ve Ticari Bilgiler:</strong> Şirket unvanı, vergi dairesi, ticaret sicil no, Mersis numarası, şirket sermaye ve ortaklık yapısı.
                </li>
                <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <strong className="text-[#faecc0]">Finansal ve Muhasebe Evrakı:</strong> Sisteme yüklenen e-Fatura, e-Arşiv, perakende satış fişleri, Serbest Meslek Makbuzları (SMM), gider pusulaları, KDV matrahları ve banka cari işlem kayıtları.
                </li>
                <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <strong className="text-[#faecc0]">İletişim Bilgileri:</strong> Kurumsal e-posta adresi, telefon/GSM numarası, şirket yasal tebligat adresi.
                </li>
                <li className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <strong className="text-[#faecc0]">İşlem Güvenliği ve Siber Loglar:</strong> 5651 sayılı Kanun ve siber güvenlik gereği; sisteme giriş IP adresleri, oturum zaman damgaları, yüklenen belgelerin SHA-256 hash imzaları.
                </li>
              </ul>
            </div>

            {/* 3. Veri İşleme Amaçları ve Hukuki Sebepler */}
            <div>
              <h3 className="text-base font-bold text-white mb-2">
                3. İşleme Amaçları ve Hukuki Dayanak
              </h3>
              <p className="text-xs text-slate-300 mb-2">
                Verileriniz; KVKK&rsquo;nın 5. ve 6. maddeleri ile 3568 sayılı Serbest Muhasebeci Mali Müşavirlik Kanunu, 213 sayılı Vergi Usul Kanunu (VUK) ve 6102 sayılı Türk Ticaret Kanunu (TTK) uyarınca aşağıdaki amaçlarla işlenir:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 ml-1">
                <li>Mali müşavirlik, defter tutma ve finansal raporlama hizmetlerinin eksiksiz yerine getirilmesi.</li>
                <li>Aylık/Dönemsel KDV, Muhtasar, Geçici Vergi ve Kurumlar Vergisi beyannamelerinin yasal süresinde GİB sistemine verilmesi.</li>
                <li>Vergi incelemeleri ve SGK denetimlerine esas teşkil edecek yasal defter ve belgelerin oluşturulması.</li>
                <li>Yetkisiz erişimlerin önlenmesi ve siber güvenlik denetim izlerinin (Audit Logs) tutulması.</li>
              </ul>
            </div>

            {/* 4. Yasal Saklama ve İmha Süresi */}
            <div className="p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30">
              <h3 className="text-sm font-bold text-[#faecc0] uppercase tracking-wider mb-1">
                4. Yasal Saklama Süresi (10 Yıl)
              </h3>
              <p className="text-xs text-slate-300">
                213 sayılı Vergi Usul Kanunu&rsquo;nun 253. maddesi ve 6102 sayılı Türk Ticaret Kanunu&rsquo;nun 82. maddesi uyarınca; muhasebe kayıtları, fişler ve faturalar ilgili takvim yılını takip eden yıldan başlamak üzere <strong className="text-white">10 (on) yıl süreyle</strong> kanuni zorunluluk olarak saklanmaktadır. Bu sürenin sonunda veriler güvenli bir şekilde anonimleştirilir veya imha edilir.
              </p>
            </div>

            {/* 5. Haklarınız (KVKK m. 11) */}
            <div>
              <h3 className="text-base font-bold text-white mb-2">
                5. İlgili Kişinin Hakları (KVKK Madde 11)
              </h3>
              <p className="text-xs text-slate-300">
                KVKK&rsquo;nın 11. maddesi uyarınca dilediğiniz zaman tarafımıza başvurarak verilerinizin işlenip işlenmediğini öğrenme, yanlış verilerin düzeltilmesini isteme, kanuni saklama süresi dolan verilerin silinmesini talep etme hakkına sahipsiniz. Başvurularınızı <strong className="text-[#faecc0]">iletisim@rotayd.com</strong> adresine güvenli elektronik imza veya yazılı dilekçe ile iletebilirsiniz.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#d4af37]/20 bg-[#040a1a] flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Son Güncelleme: 04.09.2026
            </div>

            <div className="flex items-center space-x-3">
              {showAcceptButton && onAccept ? (
                <button
                  onClick={() => {
                    onAccept();
                    onClose();
                  }}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:from-[#faecc0] hover:to-[#d4af37] text-[#040a1a] font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Aydınlatma Metnini Okudum &amp; Onaylıyorum</span>
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
                >
                  Kapat
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
