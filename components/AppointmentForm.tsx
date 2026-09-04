"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  CalendarCheck,
  RotateCcw,
  MessageCircle
} from "lucide-react";

export default function AppointmentForm() {
  const [service, setService] = useState("Genel Muhasebe & Defter Tutma");
  const [format, setFormat] = useState<"online" | "in_person">("online");
  const [date, setDate] = useState("2026-09-05");
  const [timeSlot, setTimeSlot] = useState("10:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = ["10:00", "11:30", "14:00", "15:30", "16:30", "17:30"];

  const serviceOptions = [
    {
      category: "Mali Müşavirlik & Finans",
      items: [
        "Genel Muhasebe & Defter Tutma",
        "Yönetim Muhasebesi & Finansal Raporlama",
        "Mali Müşavirlik & Vergi Mevzuatı Denetimi",
        "SGK & İstihdam Teşvikleri Analizi",
        "Bordrolama & Personel Özlük Yönetimi",
        "KDV İadesi ve Mahsup İşlemleri",
        "Şirket Kuruluşu & Nevi Değişikliği (LTD'den A.Ş.'ye)"
      ]
    },
    {
      category: "Yönetim Danışmanlığı & Teşvikler",
      items: [
        "Yatırım Teşvik Belgesi Danışmanlığı",
        "KOSGEB Destek & Hibe Programları",
        "Ticaret Bakanlığı İhracat Destekleri",
        "Kurumsal Gelişim & 360° Şirket Analizi",
        "TÜBİTAK & Ar-Ge / Tasarım Merkezi Teşvikleri",
        "Finansal Yönetim & Nakit Akışı Optimizasyonu"
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setEmail("");
    setCompany("");
    setNotes("");
  };

  const formatDisplayDate = (dStr: string) => {
    try {
      const parts = dStr.split("-");
      if (parts.length === 3) {
        return `${parts[2]}.${parts[1]}.${parts[0]}`;
      }
      return dStr;
    } catch {
      return dStr;
    }
  };

  return (
    <section id="consultation" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#1d3b7d]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold tracking-wider uppercase">
            <CalendarCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Online & Yüz Yüze Randevu</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Randevu <span className="gold-gradient-text font-serif italic">Formu</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
            Mali müşavirlerimiz ve yönetim danışmanlarımızla uygun tarih ve saati seçerek stratejik toplantınızı hemen planlayın.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#d4af37]/30 shadow-2xl relative">
          {submitted ? (
            /* Success State */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce-subtle">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Randevu Talebiniz Başarıyla Alındı!
                </h3>
                <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto">
                  Sayın <span className="font-semibold text-white">{name}</span>, talebiniz danışman ekibimize iletilmiştir. Toplantı davet linkiniz veya ofis ziyaret detayları tarafınıza iletilecektir.
                </p>
              </div>

              {/* Summary Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-white/5 border border-white/10 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/60">Hizmet Konusu:</span>
                  <span className="font-semibold text-white text-right">{service}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/60">Görüşme Formatı:</span>
                  <span className="font-semibold text-[#faecc0] flex items-center space-x-1">
                    {format === "online" ? (
                      <>
                        <Video className="w-3.5 h-3.5 text-[#38bdf8]" />
                        <span>Online Toplantı (Zoom/Meet)</span>
                      </>
                    ) : (
                      <>
                        <Building2 className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Yüz Yüze (ROTAYD Ofis)</span>
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/60">Tarih & Saat:</span>
                  <span className="font-bold text-[#d4af37] text-sm">
                    {formatDisplayDate(date)} • {timeSlot}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">İletişim:</span>
                  <span className="text-white">{phone} • {email}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/905536221122?text=${encodeURIComponent(
                    `Merhaba, ${formatDisplayDate(date)} ${timeSlot} için ${service} konulu randevu talebinde bulundum.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-900/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp ile Hızlı Teyit Alın</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium text-xs flex items-center justify-center space-x-2 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Yeni Randevu Oluştur</span>
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* ADIM 1: HİZMET VE FORMAT */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-2 border-b border-white/10">
                  <span className="w-6 h-6 rounded-full bg-[#d4af37] text-black font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                    Hizmet Konusu ve Görüşme Formatı
                  </h3>
                </div>

                {/* Hizmet Seçimi */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-white/90">
                    Görüşmek İstediğiniz Hizmet Konusu <span className="text-[#d4af37]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#071330] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition-all cursor-pointer font-medium appearance-none"
                    >
                      {serviceOptions.map((grp) => (
                        <optgroup key={grp.category} label={grp.category} className="bg-[#040a1a] text-[#faecc0] font-semibold">
                          {grp.items.map((item) => (
                            <option key={item} value={item} className="bg-[#071330] text-white font-normal py-1">
                              {item}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Görüşme Formatı */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-white/90">
                    Görüşme Formatını Seçiniz <span className="text-[#d4af37]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Online Toplantı */}
                    <button
                      type="button"
                      onClick={() => setFormat("online")}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-start space-x-3.5 ${
                        format === "online"
                          ? "border-[#38bdf8] bg-[#0c224a] shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${format === "online" ? "bg-[#38bdf8] text-black" : "bg-white/10 text-white"}`}>
                        <Video className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white">Online Toplantı</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 font-medium">
                            Önerilen
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5">Zoom veya Google Meet üzerinden hızlı bağlantı</p>
                      </div>
                    </button>

                    {/* Yüz Yüze Görüşme */}
                    <button
                      type="button"
                      onClick={() => setFormat("in_person")}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-start space-x-3.5 ${
                        format === "in_person"
                          ? "border-[#d4af37] bg-[#1a1c2e] shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${format === "in_person" ? "bg-[#d4af37] text-black" : "bg-white/10 text-white"}`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white">Yüz Yüze Görüşme</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 font-medium">
                            Suit Tower
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5">ROTAYD Merkez Ofisi (Çankaya / Ankara)</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* ADIM 2: TARİH VE SAAT */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-2 border-b border-white/10">
                  <span className="w-6 h-6 rounded-full bg-[#d4af37] text-black font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                    Randevu Tarihi ve Saati
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Tarih Seçici */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-white/90">
                      Tercih Edilen Tarih <span className="text-[#d4af37]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={date}
                        min="2026-09-04"
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-[#071330] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition-all cursor-pointer font-medium"
                      />
                    </div>
                    <p className="text-[11px] text-white/50">Hafta içi mesai saatleri içerisinde randevu oluşturulabilir.</p>
                  </div>

                  {/* Saat Dilimi */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-white/90">
                      Uygun Saat Dilimi Seçiniz <span className="text-[#d4af37]">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                            timeSlot === slot
                              ? "bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black shadow-md shadow-[#d4af37]/20 scale-[1.02]"
                              : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                          }`}
                        >
                          <Clock className="w-3 h-3 opacity-70" />
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ADIM 3: İLETİŞİM BİLGİLERİ */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-2 border-b border-white/10">
                  <span className="w-6 h-6 rounded-full bg-[#d4af37] text-black font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                    İletişim Bilgileriniz
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-white/90">
                      Adınız Soyadınız <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adınız Soyadınız"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-white/90">
                      Telefon Numaranız <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XX XXX XX XX"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-white/90">
                      E-Posta Adresiniz <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eposta@sirketiniz.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-white/90">
                      Firma / Şirket Ünvanı
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Varsa firma adınız"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-white/90">
                    Görüşme Öncesi Eklemek İstediğiniz Notlar
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Şirketinizin mevcut durumu veya özel talebiniz..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition-all resize-none"
                  />
                </div>
              </div>

              {/* GÖNDER BUTONU */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#faecc0] to-[#b89025] text-black font-extrabold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <span>{isSubmitting ? "Talebiniz Oluşturuluyor..." : "Randevu Talebini Oluştur ve Gönder"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-black" />
                </button>
                <p className="text-[11px] text-center text-white/50 mt-2.5">
                  🔒 Bilgileriniz KVKK kapsamında %100 gizlilik prensibiyle korunmaktadır.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
