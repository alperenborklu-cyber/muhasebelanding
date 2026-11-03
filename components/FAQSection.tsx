"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  Briefcase, 
  Lock, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Calendar
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "Mali Müşavirlik" | "Yönetim Danışmanlığı" | "Süreç & Gizlilik";
  tag: string;
  question: string;
  answer: string;
  highlights?: string[];
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Mali Müşavirlik",
    tag: "Devir & Mevzuat",
    question: "Mevcut mali müşavirimizden ROTAYD'a geçiş süreci nasıl yürütülür ve şirket operasyonlarımız aksar mı?",
    answer: "Geçiş süreci 3568 sayılı Meslek Kanunu ve TÜRMOB devir-teslim protokollerine uygun şekilde, operasyonel aksaklıkların önüne geçecek profesyonel bir planlamayla yürütülür. Önceki meslek mensubu ile resmi devir tutanağı hazırlanır; geçmiş mizanlar, e-defter beratları, SGK bildirgeleri ve beyannameler titizlikle teslim alınır. Şirketinizin günlük faturalandırma ve banka operasyonlarının aksamadan sürdürülmesi hedeflenir.",
    highlights: ["Güvenli operasyonel geçiş", "TÜRMOB resmi devir protokolü", "Düzenli fatura ve defter akışı"]
  },
  {
    id: "faq-2",
    category: "Yönetim Danışmanlığı",
    tag: "Yatırım Teşviki",
    question: "Yatırım Teşvik Belgesi kimler için uygundur ve işletmemize hangi somut maliyet avantajlarını sağlar?",
    answer: "Yeni bir üretim tesisi, kapasite artışı, otel/turizm yatırımı veya makine-ekipman modernizasyonu planlayan tüm tüzel ve gerçek kişi işletmeler Yatırım Teşvik Belgesi alabilir. Belge sayesinde: Yerli ve ithal makinelerde KDV istisnası, gümrük vergisi muafiyeti, Kurumlar Vergisinde indirim ve SGK işveren hissesi prim desteği gibi destek unsurları mevzuat çerçevesinde sunulur. ROTAYD fizibilite dosyasından teşvik kapama vizesine kadar tüm süreci mevzuata uygun şekilde yönetir.",
    highlights: ["KDV İstisnası & Gümrük Muafiyeti", "Vergi İndirimi & SGK Prim Desteği", "Bakanlık Onaylı Teşvik Süreci"]
  },
  {
    id: "faq-3",
    category: "Mali Müşavirlik",
    tag: "SGK Teşvikleri",
    question: "SGK İstihdam ve prim teşviklerinden geçmişe dönük (geriye dönük) yararlanabilir miyiz?",
    answer: "Evet. Mevzuat analiz altyapısıyla firmanızın geçmiş SGK bildirge ve prim dökümleri taranır. 5510 sayılı Kanun 5 puanlık prim indirimi, 6111 sayılı genç ve kadın istihdamı teşviki ile yürürlükteki diğer istihdam teşvikleri kapsamında işletmenizin koşullarına uygun haklar tespit edilir. SGK nezdinde gerekli yasal bildirim ve mahsup süreçleri mevzuat çerçevesinde yürütülür.",
    highlights: ["SGK prim ve istihdam analizi", "Yasal teşvik hak edişi", "SGK mahsup ve bildirge süreçleri"]
  },
  {
    id: "faq-4",
    category: "Yönetim Danışmanlığı",
    tag: "KOSGEB & İhracat Hibeleri",
    question: "KOSGEB ve Ticaret Bakanlığı hibe programlarına başvurularda kabul oranınız nedir?",
    answer: "ROTAYD olarak proje hazırlıklarında yüksek kabul başarısı hedefiyle çalışıyoruz. Başvuru öncesinde firmanızın mali yapısı, NACE kodu ve hedefleri uzman kadromuzca ön incelemeye tabi tutulur. Kriterleri yeterince karşılamayan dosyalar üzerinde gerekli revizyonlar ve bütçe planlaması tamamlandıktan sonra başvuru yapılarak kabul ihtimalinin en üst düzeye çıkarılması hedeflenir.",
    highlights: ["Yüksek dosya kabul hedefi", "Ön inceleme & uygunluk analizi", "Bütçe ve harcama süreç yönetimi"]
  },
  {
    id: "faq-5",
    category: "Mali Müşavirlik",
    tag: "Şirketler Hukuku",
    question: "Limited Şirketten Anonim Şirkete (A.Ş.) nevi değişikliği yapmanın vergisel ve hukuki avantajları nelerdir?",
    answer: "Anonim şirket yapılanması; kurumsal itibar, sermaye yapısı ve ortaklık sorumluluğu bakımından önemli avantajlar sunar. Ayrıca mevzuat çerçevesinde pay senetlerinin belirli süre elde tutulması halinde değer artış kazançlarına ilişkin vergisel avantajlar ve kamu borçlarına ilişkin sınırlı sorumluluk ilkeleri değerlendirilebilir.",
    highlights: ["Mevzuata uygun pay devri avantajları", "Ortaklık sorumluluk yapısı", "Yüksek kurumsal itibar ve kredi notu"]
  },
  {
    id: "faq-6",
    category: "Süreç & Gizlilik",
    tag: "İlk Randevu",
    question: "ROTAYD ile ilk keşif ve tanışma toplantısı nasıl işler?",
    answer: "İlk tanışma ve ihtiyaç belirleme toplantımız, çalışma şartlarımızın ve hizmet kapsamının belirlenmesi amacıyla gerçekleştirilmektedir. Hemen aşağıdaki online randevu formundan veya doğrudan iletişim hatlarımızdan (Mali Müşavirlik: 0542 622 11 32 / Danışmanlık: 0553 622 11 22) Zoom/Meet üzerinden online ya da ofisimizde yüz yüze görüşme oluşturabilirsiniz. Bu görüşmede firmanızın kurumsal ihtiyaçları değerlendirilerek yol haritası sunulur.",
    highlights: ["Ön değerlendirme toplantısı", "Online veya yüz yüze seçenek", "İhtiyaç analizi ve yol haritası"]
  },
  {
    id: "faq-7",
    category: "Süreç & Gizlilik",
    tag: "Veri Güvenliği",
    question: "Şirketimizin finansal ve ticari verilerinin gizliliği nasıl korunuyor?",
    answer: "Tüm kurumsal iş ortaklarımızla sürecin en başında iki taraflı cezai şart içeren Gizlilik ve Sır Saklama Sözleşmesi (NDA) akdedilir. Verileriniz KVKK standartlarına uygun yüksek güvenlikli sunucularda saklanır; yalnızca dosyanızla ilgilenen yetkili mali müşavir ve danışmanlarımızın erişimine açılır. Üçüncü taraflarla asla paylaşılmaz.",
    highlights: ["Resmi Gizlilik Sözleşmesi (NDA)", "KVKK uyumu & veri güvenliği", "Banka seviyesinde şifreli veri saklama"]
  },
  {
    id: "faq-8",
    category: "Yönetim Danışmanlığı",
    tag: "Ücretlendirme Modeli",
    question: "Danışmanlık ve teşvik projelerinde ücretlendirme modeliniz nasıldır?",
    answer: "Proje ve danışmanlık süreçlerinde hizmet türüne göre şeffaf ve sözleşmeye dayalı ücretlendirme modelleri uygulanır. Devlet teşvikleri ve hibe süreçlerinde dosya hazırlığı, başvuru takibi ve onay aşamalarını kapsayan aşamalı danışmanlık sözleşmeleri ile süreç baştan sona şeffaf ve mevzuata uygun şekilde yönetilir.",
    highlights: ["Şeffaf sözleşme yapısı", "Aşamalı hakediş takvimi", "Öngörülebilir danışmanlık bütçesi"]
  }
];

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>("faq-1");

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  // Schema.org FAQPage structured data for high SEO ranking
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#030816] relative overflow-hidden transition-colors duration-300">
      {/* JSON-LD for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#1d3b7d]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Sıkça Sorulan Sorular</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Aklınıza Takılanlar &amp;{" "}
            <span className="gold-gradient-text font-serif italic">Şeffaf Yanıtlar</span>
          </h2>

          <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto leading-relaxed">
            Mali müşavirlik, vergi yönetimi, yatırım teşvik belgeleri ve hibe danışmanlığı süreçlerimiz hakkında en çok merak edilen başlıklar.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openItem === item.id;
            return (
              <div
                key={item.id}
                className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#d4af37]/60 shadow-lg shadow-[#000000]/40 bg-[#071330]/90"
                    : "border-white/10 hover:border-white/20 bg-[#060e24]/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 sm:px-7 py-5 sm:py-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="pr-2">
                    <h3 className={`text-sm sm:text-base font-semibold transition-colors leading-snug ${
                      isOpen ? "text-[#c59b27]" : "text-white group-hover:text-[#c59b27]"
                    }`}>
                      {item.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen 
                      ? "bg-[#d4af37] border-[#d4af37] text-black rotate-180" 
                      : "bg-white/5 border-white/10 text-white/70 group-hover:border-[#d4af37]/40 group-hover:text-white"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-7 pb-6 pt-1 border-t border-white/5">
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                          {item.answer}
                        </p>

                        {item.highlights && item.highlights.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                            {item.highlights.map((hl, i) => (
                              <div
                                key={i}
                                className="faq-highlight inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#040a1a]/80 border border-[#d4af37]/20 text-[11px] text-[#c59b27]"
                              >
                                <CheckCircle2 className="w-3 h-3 text-[#d4af37]" />
                                <span>{hl}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Link to Appointment Form */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#07173e] via-[#091f52] to-[#07173e] border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center justify-center sm:justify-start space-x-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Sorunuzun cevabını listede bulamadınız mı?</span>
            </h4>
            <p className="text-xs sm:text-sm text-white/70">
              Şirketinizin özel durumunu birlikte değerlendirelim. Hemen aşağıdaki form ile randevunuzu oluşturun.
            </p>
          </div>

          <a
            href="#consultation"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#b89025] via-[#d4af37] to-[#e5c158] text-black text-xs sm:text-sm font-bold shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Randevu Formuna İn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
