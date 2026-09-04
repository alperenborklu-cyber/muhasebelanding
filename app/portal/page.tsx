'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  Shield,
  ShieldCheck,
  Building2,
  FileUp,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  LogOut,
  UserCheck,
  Lock,
  Download,
  Trash2,
  Plus,
  Search,
  Filter,
  Eye,
  FileCheck,
  ChevronRight,
  ExternalLink,
  Info,
  RotateCw,
  XCircle,
  Mail,
  Camera,
  UploadCloud,
  User,
  Phone,
  ArrowRight
} from 'lucide-react';
import { PortalUser, TuzelKisi, FaturaBelge, BelgeTuru, HarcamaKategorisi, SirketTuru } from '@/lib/portal-types';
import { validateVergiKimlik, validateUploadedFile } from '@/lib/security';
import KvkkModal from '@/components/portal/KvkkModal';

export default function PortalPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [currentUser, setCurrentUser] = useState<PortalUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRefreshingStatus, setIsRefreshingStatus] = useState(false);
  const [activeTab, setActiveTab] = useState<'documents' | 'companies'>('documents');

  // Giriş / Başvuru Formu State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [loginError, setLoginError] = useState('');

  // KVKK Modal State
  const [isKvkkOpen, setIsKvkkOpen] = useState(false);
  const [kvkkAccepted, setKvkkAccepted] = useState(true);

  // Data States
  const [companies, setCompanies] = useState<TuzelKisi[]>([]);
  const [documents, setDocuments] = useState<FaturaBelge[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');

  // Upload Form State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string>('');
  const [belgeTuru, setBelgeTuru] = useState<BelgeTuru>('e-fatura');
  const [kategori, setKategori] = useState<HarcamaKategorisi>('genel_gider');
  const [faturaNo, setFaturaNo] = useState('');
  const [faturaTarihi, setFaturaTarihi] = useState(new Date().toISOString().split('T')[0]);
  const [tutar, setTutar] = useState<number>(0);
  const [kdvOrani, setKdvOrani] = useState<number>(20);
  const [notlar, setNotlar] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // New Company Modal State
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [newUnvan, setNewUnvan] = useState('');
  const [newVkn, setNewVkn] = useState('');
  const [newVergiDairesi, setNewVergiDairesi] = useState('');
  const [newTicaretSicil, setNewTicaretSicil] = useState('');
  const [newSirketTuru, setNewSirketTuru] = useState<SirketTuru>('Limited Şirket');
  const [newAdres, setNewAdres] = useState('');
  const [newTelefon, setNewTelefon] = useState('');
  const [newYetkili, setNewYetkili] = useState('');
  const [vknValidation, setVknValidation] = useState<{ isValid: boolean; message: string; type: string }>({
    isValid: false,
    message: '',
    type: ''
  });
  const [companyModalError, setCompanyModalError] = useState('');

  // Search & Filter
  const [docFilterCategory, setDocFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sunucu üzerinden kullanıcı ve onay durumunu çek
  const fetchPortalStatus = async () => {
    try {
      const res = await fetch('/api/portal/me');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
          if (data.user.status === 'approved' || data.user.role === 'admin') {
            loadUserData(data.user.id);
          }
        } else {
          setCurrentUser(null);
        }
      }
    } catch (err) {
      console.error('Portal durumu sorgulama hatası:', err);
    } finally {
      setIsLoaded(true);
      setIsRefreshingStatus(false);
    }
  };

  useEffect(() => {
    if (sessionStatus !== 'loading') {
      fetchPortalStatus();
    }
  }, [sessionStatus]);

  // Şirket ve Fatura Verilerini Sunucudan Yükle
  const loadUserData = async (userId: string) => {
    try {
      const [compRes, docRes] = await Promise.all([
        fetch('/api/portal/companies'),
        fetch('/api/portal/documents')
      ]);

      if (compRes.ok) {
        const { companies } = await compRes.json();
        setCompanies(companies || []);
        if (companies && companies.length > 0 && !selectedCompanyId) {
          setSelectedCompanyId(companies[0].id);
        }
      }

      if (docRes.ok) {
        const { documents } = await docRes.json();
        setDocuments(documents || []);
      }
    } catch (err) {
      console.error('Kullanıcı verileri yüklenirken hata:', err);
    }
  };

  // Mükellef Girişi / Kaydı Başlatma
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail) {
      setLoginError('Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }

    if (!kvkkAccepted) {
      setIsKvkkOpen(true);
      return;
    }

    setIsSubmittingLogin(true);

    try {
      const res = await signIn('mukellef-auth', {
        email: loginEmail.trim(),
        name: loginName.trim() || loginEmail.split('@')[0],
        phone: loginPhone.trim(),
        redirect: false
      });

      if (res?.error) {
        setLoginError('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyiniz.');
      } else {
        await fetchPortalStatus();
      }
    } catch (err) {
      setLoginError('Bağlantı hatası oluştu.');
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  // Hızlı Test / Doldurma
  const prefillUser = (email: string, name: string) => {
    setLoginEmail(email);
    setLoginName(name);
  };

  // Çıkış
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/portal' });
    setCurrentUser(null);
    setCompanies([]);
    setDocuments([]);
  };

  // VKN Anlık Doğrulama
  const handleVknChange = (val: string) => {
    setNewVkn(val);
    if (val.length >= 10) {
      const res = validateVergiKimlik(val);
      setVknValidation(res);
    } else {
      setVknValidation({ isValid: false, message: '10 haneli VKN veya 11 haneli TCKN giriniz.', type: '' });
    }
  };

  // Şirket Oluştur (API üzerinden)
  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyModalError('');

    if (!currentUser) return;

    try {
      const res = await fetch('/api/portal/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unvan: newUnvan,
          vkn: newVkn,
          vergiDairesi: newVergiDairesi,
          ticaretSicilNo: newTicaretSicil,
          sirketTuru: newSirketTuru,
          adres: newAdres,
          telefon: newTelefon,
          yetkiliKisi: newYetkili || currentUser.name
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setCompanyModalError(data.error || 'Şirket oluşturulamadı.');
        return;
      }

      setIsCompanyModalOpen(false);
      setNewUnvan('');
      setNewVkn('');
      setNewVergiDairesi('');
      setNewTicaretSicil('');
      setNewAdres('');
      setNewTelefon('');
      setNewYetkili('');
      loadUserData(currentUser.id);
      if (data.company) {
        setSelectedCompanyId(data.company.id);
      }
    } catch (err) {
      setCompanyModalError('Sunucu bağlantı hatası oluştu.');
    }
  };

  // Fotoğraf / Dosya Seçimi ve Güvenlik Taraması
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = await validateUploadedFile(file);
      if (!validation.isValid) {
        setUploadError(validation.error || 'Dosya güvenlik kontrolünden geçemedi.');
        setUploadFile(null);
        setFilePreviewUrl(null);
      } else {
        setUploadFile(file);
        if (file.type.startsWith('image/')) {
          setFilePreviewUrl(URL.createObjectURL(file));
        } else {
          setFilePreviewUrl(null);
        }
      }
    }
  };

  // Fiş / Fatura / Fotoğraf Kaydet (API üzerinden)
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !uploadFile) {
      setUploadError('Lütfen yüklenecek fotoğraf veya belgeyi seçiniz.');
      return;
    }

    if (!selectedCompanyId) {
      setUploadError('Lütfen belgenin ait olduğu tüzel kişiliği (şirketi) seçiniz.');
      return;
    }

    setIsUploading(true);

    const activeCompany = companies.find((c) => c.id === selectedCompanyId);
    const kdvTutari = (tutar * kdvOrani) / 100;
    const toplamTutar = tutar + kdvTutari;

    try {
      const res = await fetch('/api/portal/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: selectedCompanyId,
          companyUnvan: activeCompany?.unvan || 'Tanımsız Şirket',
          fileName: uploadFile.name,
          fileSize: uploadFile.size,
          fileType: uploadFile.type,
          belgeTuru,
          kategori,
          faturaTarihi,
          faturaNo: faturaNo || `BELGE-${Date.now().toString().slice(-6)}`,
          tutar,
          kdvOrani,
          kdvTutari,
          toplamTutar,
          durum: 'yuklendi',
          notlar
        })
      });

      if (!res.ok) {
        const data = await res.json();
        setUploadError(data.error || 'Fotoğraf/belge yüklenemedi.');
        setIsUploading(false);
        return;
      }

      setIsUploading(false);
      setUploadSuccess(true);
      setUploadFile(null);
      setFilePreviewUrl(null);
      setFaturaNo('');
      setTutar(0);
      setNotlar('');
      loadUserData(currentUser.id);

      setTimeout(() => setUploadSuccess(false), 4000);
    } catch (err) {
      setIsUploading(false);
      setUploadError('Belge yüklenirken bağlantı hatası oluştu.');
    }
  };

  // Belge Sil
  const handleDeleteDoc = async (docId: string) => {
    if (confirm('Bu belgeyi arşivden silmek istediğinize emin misiniz?')) {
      try {
        await fetch(`/api/portal/admin/documents/${docId}`, { method: 'DELETE' });
        if (currentUser) loadUserData(currentUser.id);
      } catch (err) {
        console.error('Silme hatası:', err);
      }
    }
  };

  // Yenileme işlemi (Pending iken durumu kontrol et)
  const handleRefreshStatus = () => {
    setIsRefreshingStatus(true);
    fetchPortalStatus();
  };

  if (!isLoaded || sessionStatus === 'loading') {
    return (
      <div className="min-h-screen bg-[#040a1a] flex flex-col items-center justify-center text-white space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]" />
        <span className="text-xs text-slate-400 font-mono tracking-wider">Güvenli Oturum Doğrulanıyor...</span>
      </div>
    );
  }

  // ==========================================================================
  // DURUM 1: OTURUM AÇILMAMIŞ (MÜKELLEF GİRİŞ & BAŞVURU EKRANI)
  // ==========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#040a1a] text-slate-100 flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 relative overflow-hidden">
        {/* Arka Plan Işık Efektleri */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#1d4ed8]/10 via-[#d4af37]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full mx-auto my-auto relative z-10">
          {/* Logo & Başlık */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3 mb-4 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#07173e] to-[#040a1a] border border-[#d4af37]/40 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.25)] group-hover:border-[#d4af37] transition-all">
                <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
              </div>
              <div className="text-left">
                <span className="block text-xl font-bold tracking-wider text-white">
                  ROTAYD
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#d4af37]">
                  Mükellef Portalı
                </span>
              </div>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Mükellef Girişi &amp; Kayıt
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Sisteme kaydolarak mali müşavir onayından sonra fiş ve faturalarınızı doğrudan yükleyebilirsiniz.
            </p>
          </div>

          {/* Giriş Kartı */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#07173e]/90 border border-[#d4af37]/30 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            {loginError && (
              <div className="p-3.5 mb-5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  E-Posta Adresiniz *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="ornek@sirket.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#040a1a] border border-white/10 text-white placeholder-slate-500 focus:border-[#d4af37] focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Adınız ve Soyadınız *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Adınız Soyadınız"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#040a1a] border border-white/10 text-white placeholder-slate-500 focus:border-[#d4af37] focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Telefon Numaranız <span className="text-slate-500 font-normal">(İsteğe Bağlı)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <input
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#040a1a] border border-white/10 text-white placeholder-slate-500 focus:border-[#d4af37] focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              {/* KVKK Onay Kutusu */}
              <div className="p-3.5 rounded-xl bg-[#040a1a]/70 border border-[#d4af37]/20 my-4 flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="kvkk-check"
                  checked={kvkkAccepted}
                  onChange={(e) => setKvkkAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-700 bg-[#07173e] text-[#d4af37] focus:ring-[#d4af37] cursor-pointer"
                />
                <label htmlFor="kvkk-check" className="text-xs text-slate-300 cursor-pointer leading-relaxed">
                  <button
                    type="button"
                    onClick={() => setIsKvkkOpen(true)}
                    className="text-[#faecc0] underline font-semibold hover:text-[#d4af37] inline"
                  >
                    KVKK Aydınlatma Metni
                  </button>
                  &rsquo;ni okudum, ticari ve finansal belgelerimin müşavirlik hizmeti gereğince işlenmesini onaylıyorum.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmittingLogin || !kvkkAccepted}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2 ${
                  kvkkAccepted && !isSubmittingLogin
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:from-[#faecc0] hover:to-[#d4af37] text-[#040a1a] shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer active:scale-[0.99]'
                    : 'bg-white/20 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isSubmittingLogin ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
                    <span>Kontrol Ediliyor...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Güvenli Giriş Yap / Başvur</span>
                  </>
                )}
              </button>
            </form>

            {/* Test Kullanıcıları / Hızlı Seçim */}
            <div className="mt-8 pt-5 border-t border-white/10 text-xs">
              <span className="block text-[11px] font-semibold text-[#faecc0] uppercase tracking-wider mb-2.5 text-center">
                Hızlı Test İçin Örnek Profiller:
              </span>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => prefillUser('suleyman@rotayd.com', 'Süleyman İlhan')}
                  className="px-3 py-2 rounded-lg bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#faecc0] border border-[#d4af37]/30 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="font-semibold">Mali Müşavir (Admin)</span>
                  <span className="text-[10px] bg-[#d4af37] text-black px-1.5 py-0.5 rounded font-bold">Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => prefillUser('ahmet.yilmaz@anadolutech.com', 'Ahmet Yılmaz')}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center justify-between text-left cursor-pointer"
                >
                  <span>Onaylı Mükellef (Ahmet Yılmaz)</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">Onaylı</span>
                </button>
                <button
                  type="button"
                  onClick={() => prefillUser('yeni.kayit@sirket.com', 'Yeni Başvuran Mükellef')}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center justify-between text-left cursor-pointer"
                >
                  <span>Yeni Kayıt (Onay Bekleyen)</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">Bekliyor</span>
                </button>
              </div>
            </div>
          </div>

          {/* Güvenlik Rozetleri */}
          <div className="mt-6 flex items-center justify-center space-x-4 text-[11px] text-slate-400">
            <span className="flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>TLS 1.3 Korumalı</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>VUK m. 253 Arşivi</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>KVKK Uyumlu</span>
            </span>
          </div>
        </div>

        {/* KVKK Modalı */}
        <KvkkModal
          isOpen={isKvkkOpen}
          onClose={() => setIsKvkkOpen(false)}
          onAccept={() => setKvkkAccepted(true)}
          showAcceptButton={true}
        />
      </div>
    );
  }

  // ==========================================================================
  // DURUM 2: KULLANICI GİRİŞ YAPTI AMA DURUMU "ONAY BEKLİYOR" (PENDING)
  // SADECE ADMİN ONAYLADIĞINDA SİSTEME FOTOĞRAF / BELGE ATABİLİR!
  // ==========================================================================
  if (currentUser.status === 'pending') {
    return (
      <div className="min-h-screen bg-[#040a1a] text-white flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 relative">
        <div className="max-w-xl w-full mx-auto my-auto relative z-10">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#07173e] border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.15)] text-center">
            {/* Profil Resmi & Bekleme İkonu */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <img
                src={currentUser.image}
                alt={currentUser.name}
                className="w-full h-full rounded-2xl object-cover border-2 border-amber-500/50 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-amber-500 border-2 border-[#07173e] flex items-center justify-center text-black">
                <Clock className="w-4 h-4 animate-spin" />
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-4 border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Mali Müşavir Onayı Bekleniyor</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Hesabınız Güvenlik Onayındadır
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Sayın <strong className="text-white">{currentUser.name}</strong>,{' '}
              <strong className="text-[#faecc0]">{currentUser.email}</strong> hesabınızla oluşturduğunuz mükellef kaydı, finansal veri gizliliği gereğince <strong>Mali Müşavir Süleyman İlhan</strong> onayına sunulmuştur.
            </p>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs mb-6 text-left flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Fotoğraf &amp; Belge Yükleme Kısıtlaması:</strong> Yasal defter güvenliği gereğince yalnızca Mali Müşavir tarafından onaylanan mükellefler sisteme fotoğraf, fiş ve fatura yükleyebilir. Başvurunuz onaylandığı anda sistem otomatik olarak açılacaktır.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#040a1a]/80 border border-white/10 text-left text-xs space-y-2 text-slate-400 mb-6">
              <div className="flex justify-between">
                <span>Kayıtlı E-Posta:</span>
                <span className="text-[#faecc0] font-medium font-mono">{currentUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Başvuru Tarihi:</span>
                <span className="text-white font-medium">{new Date(currentUser.createdAt).toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex justify-between">
                <span>KVKK Onay Damgası:</span>
                <span className="text-emerald-400 font-medium">Doğrulandı &amp; Kaydedildi</span>
              </div>
              <div className="flex justify-between">
                <span>Mevcut Durum:</span>
                <span className="text-amber-400 font-medium">İnceleme Havuzunda</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleRefreshStatus}
                disabled={isRefreshingStatus}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:from-[#faecc0] hover:to-[#d4af37] text-[#040a1a] text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                <RotateCw className={`w-4 h-4 ${isRefreshingStatus ? 'animate-spin' : ''}`} />
                <span>{isRefreshingStatus ? 'Kontrol Ediliyor...' : 'Onay Durumunu Yenile'}</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Çıkış Yap / Farklı Hesap</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // DURUM 2.5: KULLANICI DURUMU "REDDEDİLDİ" (REJECTED)
  // ==========================================================================
  if (currentUser.status === 'rejected') {
    return (
      <div className="min-h-screen bg-[#040a1a] text-white flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 relative">
        <div className="max-w-md w-full mx-auto my-auto relative z-10">
          <div className="p-8 rounded-3xl bg-[#07173e] border border-red-500/40 shadow-xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <XCircle className="w-8 h-8" />
            </div>

            <h1 className="text-xl font-bold text-white mb-2">Başvuru Onaylanmadı</h1>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Sayın <strong className="text-white">{currentUser.name}</strong>, ({currentUser.email}) mükellef başvurunuz onaylanamamıştır. Detaylı bilgi ve kimlik doğrulaması için lütfen müşavirliğimiz ile iletişime geçiniz.
            </p>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Farklı Bir Hesapla Giriş Yap
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // DURUM 3: KULLANICI ONAYLI (APPROVED) - MÜKELLEF TAM PANELİ
  // ARTIK FOTOĞRAF, FİŞ VE FATURA YÜKLEYEBİLİR!
  // ==========================================================================
  const activeCompany = companies.find((c) => c.id === selectedCompanyId);

  // Filtrelenmiş belgeler
  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory = docFilterCategory === 'all' || doc.kategori === docFilterCategory;
    const matchesCompany = !selectedCompanyId || doc.companyId === selectedCompanyId;
    const matchesSearch =
      !searchQuery ||
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.faturaNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.notlar?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCompany && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#040a1a] text-slate-100 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Üst Bar / Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="p-4 sm:p-6 rounded-2xl bg-[#07173e] border border-[#d4af37]/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#8a701e] p-0.5 shadow-md">
              <img
                src={currentUser.image}
                alt={currentUser.name}
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-white">{currentUser.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 mr-1 inline" />
                  Onaylı Mükellef
                </span>
                {currentUser.role === 'admin' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#faecc0] text-[10px] font-bold uppercase tracking-wider border border-[#d4af37]/40">
                    Mali Müşavir (Admin)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{currentUser.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {currentUser.role === 'admin' && (
              <Link
                href="/portal/admin"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:from-[#faecc0] hover:to-[#d4af37] text-[#040a1a] font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center space-x-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>Admin Yönetim Paneli</span>
              </Link>
            )}

            <button
              onClick={() => setIsKvkkOpen(true)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10 cursor-pointer"
              title="KVKK Protokolü"
            >
              <Shield className="w-4 h-4 text-[#d4af37]" />
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors border border-white/10 cursor-pointer"
              title="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sekmeler */}
        <div className="flex items-center space-x-3 mt-6 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'documents'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#b89025] text-[#040a1a] shadow-lg shadow-[#d4af37]/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Fiş, Fotoğraf &amp; Fatura Portalı ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('companies')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'companies'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#b89025] text-[#040a1a] shadow-lg shadow-[#d4af37]/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Tüzel Kişiliklerim ({companies.length})</span>
          </button>
        </div>
      </div>

      {/* İÇERİK BÖLÜMÜ */}
      <div className="max-w-7xl mx-auto">
        {/* ==================================================================
            SEKME 1: FİŞ & FOTOĞRAF & FATURA YÜKLEME VE LİSTELEME
            ================================================================== */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* SOL SÜTUN: Dosya & Fotoğraf Yükleme Formu */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl">
                <h2 className="text-base font-bold text-white mb-1 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-[#d4af37]" />
                  Yeni Fiş / Fotoğraf / Fatura Yükle
                </h2>
                <p className="text-xs text-slate-400 mb-5">
                  Çektiğiniz fiş fotoğrafını veya e-fatura dosyasını doğrudan mali müşavirinize iletin.
                </p>

                {/* Eğer şirket yoksa uyarı */}
                {companies.length === 0 ? (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                    <p className="font-semibold mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1.5" />
                      Kayıtlı Tüzel Kişi Bulunamadı
                    </p>
                    <p className="mb-3 text-slate-300">
                      Fiş ve fatura yükleyebilmek için lütfen önce şirketinizi (tüzel kişi kimliğinizi) sisteme tanımlayınız.
                    </p>
                    <button
                      onClick={() => setIsCompanyModalOpen(true)}
                      className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#040a1a] font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      + Şirket Kimliği Oluştur
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
                    {/* Şirket Seçici */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Ait Olduğu Şirket *
                      </label>
                      <select
                        value={selectedCompanyId}
                        onChange={(e) => setSelectedCompanyId(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-[#d4af37]/30 text-white focus:border-[#d4af37] focus:outline-none"
                      >
                        {companies.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.unvan} (VKN: {c.vkn})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sürükle Bırak / Fotoğraf Çek / Dosya Seç */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Fiş Fotoğrafı veya Belge Dosyası *
                      </label>
                      <div className="relative border-2 border-dashed border-[#d4af37]/40 hover:border-[#d4af37] rounded-xl p-5 text-center bg-[#040a1a]/50 transition-colors">
                        <input
                          type="file"
                          accept="image/*,.pdf,.xml"
                          onChange={handleFileSelect}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center">
                          {filePreviewUrl ? (
                            <div className="relative mb-2">
                              <img
                                src={filePreviewUrl}
                                alt="Fiş Önizleme"
                                className="w-24 h-24 object-cover rounded-lg border border-[#d4af37]/50 shadow-md"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mb-2">
                              <Camera className="w-6 h-6" />
                            </div>
                          )}

                          {uploadFile ? (
                            <div>
                              <span className="font-bold text-white block text-sm">{uploadFile.name}</span>
                              <span className="text-[11px] text-emerald-400">
                                {(uploadFile.size / 1024).toFixed(1)} KB • Güvenlik Kontrolünden Geçti
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-slate-200 font-semibold block text-sm">
                                Fotoğraf Çekin veya Dosya Seçin
                              </span>
                              <span className="text-[10px] text-slate-400 mt-1 block">
                                Kamera Fotoğrafı, JPG, PNG, PDF (Maks. 15 MB)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {uploadError && (
                        <p className="text-red-400 text-[11px] mt-1.5 flex items-center">
                          <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                          {uploadError}
                        </p>
                      )}
                    </div>

                    {/* Belge Türü & Kategori */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Belge Türü</label>
                        <select
                          value={belgeTuru}
                          onChange={(e) => setBelgeTuru(e.target.value as BelgeTuru)}
                          className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                        >
                          <option value="fis">Yazar Kasa Fişi / Fotoğraf</option>
                          <option value="e-fatura">e-Fatura</option>
                          <option value="e-arsiv">e-Arşiv Fatura</option>
                          <option value="smm">Serbest Meslek (SMM)</option>
                          <option value="gider_pusulasi">Gider Pusulası</option>
                          <option value="diger">Diğer Belge / Dekont</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Kategori</label>
                        <select
                          value={kategori}
                          onChange={(e) => setKategori(e.target.value as HarcamaKategorisi)}
                          className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                        >
                          <option value="yemek_temsil">Yemek &amp; Temsil</option>
                          <option value="akaryakit">Akaryakıt &amp; Taşıt</option>
                          <option value="genel_gider">Genel Gider</option>
                          <option value="kira">Kira &amp; Aidat</option>
                          <option value="danismanlik_hizmet">Hizmet &amp; Yazılım</option>
                          <option value="demirbas">Demirbaş Alımı</option>
                          <option value="mal_alisi">Ticari Mal Alışı</option>
                          <option value="kirtasiye_ofis">Kırtasiye &amp; Ofis</option>
                          <option value="diger">Diğer</option>
                        </select>
                      </div>
                    </div>

                    {/* Fatura No & Tarih */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Fiş / Belge No</label>
                        <input
                          type="text"
                          placeholder="Örn: 0012 veya GIB..."
                          value={faturaNo}
                          onChange={(e) => setFaturaNo(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Belge Tarihi</label>
                        <input
                          type="date"
                          value={faturaTarihi}
                          onChange={(e) => setFaturaTarihi(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Tutar & KDV */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="block text-slate-300 font-semibold mb-1">Matrah Tutarı (₺)</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={tutar || ''}
                          onChange={(e) => setTutar(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">KDV Oranı</label>
                        <select
                          value={kdvOrani}
                          onChange={(e) => setKdvOrani(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                        >
                          <option value="20">%20</option>
                          <option value="10">%10</option>
                          <option value="1">%1</option>
                          <option value="0">%0</option>
                        </select>
                      </div>
                    </div>

                    {/* Otomatik Toplam Hesaplama */}
                    <div className="p-3 rounded-xl bg-[#040a1a] border border-white/10 flex justify-between items-center text-xs">
                      <div>
                        <span className="text-slate-400 block">Hesaplanan KDV:</span>
                        <span className="font-mono text-white">₺{((tutar * kdvOrani) / 100).toFixed(2)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block">KDV Dahil Toplam:</span>
                        <span className="font-mono text-[#faecc0] font-bold text-sm">
                          ₺{(tutar + (tutar * kdvOrani) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Notlar */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Mali Müşavir İçin Not</label>
                      <textarea
                        rows={2}
                        placeholder="Harcamanın gerekçesi..."
                        value={notlar}
                        onChange={(e) => setNotlar(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none resize-none"
                      />
                    </div>

                    {/* Gönder Butonu */}
                    <button
                      type="submit"
                      disabled={isUploading || !uploadFile}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                        uploadFile && !isUploading
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:from-[#faecc0] hover:to-[#d4af37] text-[#040a1a] shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer'
                          : 'bg-white/10 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
                          <span>Şifreleniyor &amp; Yükleniyor...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Güvenli Olarak Müşavir Havuzuna Gönder</span>
                        </>
                      )}
                    </button>

                    {uploadSuccess && (
                      <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span>Belge başarıyla yüklendi ve mali müşavir inceleme havuzuna eklendi!</span>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* SAĞ SÜTUN: Yüklenen Belgeler Tablosu */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-2xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl">
                {/* Arama & Filtreleme Başlığı */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-base font-bold text-white">Yüklenen Belgelerim</h2>
                    <p className="text-xs text-slate-400">
                      {activeCompany ? `${activeCompany.unvan} arşiv kayıtları` : 'Tüm şirket evrakları'}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Belge ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 pr-3 py-1.5 rounded-xl bg-[#040a1a] border border-white/10 text-xs text-white focus:border-[#d4af37] focus:outline-none w-44"
                      />
                    </div>

                    <select
                      value={docFilterCategory}
                      onChange={(e) => setDocFilterCategory(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl bg-[#040a1a] border border-white/10 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    >
                      <option value="all">Tüm Kategoriler</option>
                      <option value="yemek_temsil">Yemek</option>
                      <option value="akaryakit">Akaryakıt</option>
                      <option value="genel_gider">Genel Gider</option>
                      <option value="danismanlik_hizmet">Hizmet/Yazılım</option>
                      <option value="kira">Kira</option>
                      <option value="demirbas">Demirbaş</option>
                    </select>
                  </div>
                </div>

                {/* Belge Listesi */}
                {filteredDocuments.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                    <FileText className="w-10 h-10 mx-auto text-slate-500 mb-2 opacity-60" />
                    <p className="text-xs text-slate-400">Henüz bu kategoride kayıtlı fiş veya fotoğraf bulunmuyor.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-4 rounded-xl bg-[#040a1a]/70 border border-white/5 hover:border-[#d4af37]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0 text-[#d4af37]">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-white text-xs">{doc.fileName}</span>
                              <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] uppercase font-semibold text-slate-300">
                                {doc.belgeTuru}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 mt-1">
                              <span>No: {doc.faturaNo}</span>
                              <span>•</span>
                              <span>Tarih: {doc.faturaTarihi}</span>
                              <span>•</span>
                              <span className="text-[#faecc0] font-mono font-semibold">
                                ₺{doc.toplamTutar.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            {doc.notlar && (
                              <p className="text-[10px] text-slate-400 italic mt-1">&ldquo;{doc.notlar}&rdquo;</p>
                            )}
                          </div>
                        </div>

                        {/* Durum Rozeti ve Aksiyonlar */}
                        <div className="flex items-center space-x-3 self-end sm:self-center">
                          {doc.durum === 'deftere_islendi' && (
                            <span className="px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center border border-emerald-500/30">
                              <FileCheck className="w-3 h-3 mr-1" />
                              Deftere İşlendi
                            </span>
                          )}
                          {doc.durum === 'incelendi' && (
                            <span className="px-2 py-1 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center border border-blue-500/30">
                              <Eye className="w-3 h-3 mr-1" />
                              İncelendi
                            </span>
                          )}
                          {doc.durum === 'yuklendi' && (
                            <span className="px-2 py-1 rounded-md bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center border border-amber-500/30">
                              <Clock className="w-3 h-3 mr-1" />
                              Müşavir Havuzunda
                            </span>
                          )}
                          {doc.durum === 'reddedildi' && (
                            <span className="px-2 py-1 rounded-md bg-red-500/20 text-red-400 text-[10px] font-bold flex items-center border border-red-500/30">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Eksik/Red
                            </span>
                          )}

                          <button
                            onClick={() => handleDeleteDoc(doc.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="Belgeyi Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            SEKME 2: TÜZEL KİŞİLİK (ŞİRKET) PROFİLLERİ
            ================================================================== */}
        {activeTab === 'companies' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Kayıtlı Tüzel Kişi Profillerim</h2>
                <p className="text-xs text-slate-400">
                  Fiş ve faturaların yasal defter kaydında kullanılacak resmi şirket kimlikleriniz.
                </p>
              </div>

              <button
                onClick={() => setIsCompanyModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:from-[#faecc0] hover:to-[#d4af37] text-[#040a1a] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 self-start sm:self-auto shadow-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Tüzel Kişi Tanımla</span>
              </button>
            </div>

            {companies.length === 0 ? (
              <div className="p-12 rounded-2xl bg-[#07173e] border border-dashed border-white/20 text-center">
                <Building2 className="w-12 h-12 mx-auto text-slate-500 mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Henüz Kayıtlı Şirket Yok</h3>
                <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                  Mali müşavirlik hizmeti alabilmek ve fatura yüklemek için ilk şirket profilinizi oluşturun.
                </p>
                <button
                  onClick={() => setIsCompanyModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-[#040a1a] font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  + Şirket Ekle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {companies.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-6 rounded-2xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-[#040a1a] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#faecc0] text-[10px] font-bold uppercase tracking-wider">
                            {comp.sirketTuru}
                          </span>
                          <h3 className="text-base font-bold text-white mt-1 leading-tight">{comp.unvan}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Detay Bilgileri */}
                    <div className="space-y-2 text-xs text-slate-300 border-t border-white/10 pt-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">VKN / TCKN:</span>
                        <span className="font-mono font-bold text-[#faecc0] flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                          {comp.vkn}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Vergi Dairesi:</span>
                        <span className="text-white font-medium">{comp.vergiDairesi}</span>
                      </div>
                      {comp.ticaretSicilNo && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Ticaret Sicil No:</span>
                          <span className="text-white font-medium">{comp.ticaretSicilNo}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-400">İmza Yetkilisi:</span>
                        <span className="text-white font-medium">{comp.yetkiliKisi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Telefon:</span>
                        <span className="text-white font-medium">{comp.telefon}</span>
                      </div>
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-slate-400 block text-[11px]">Tebligat Adresi:</span>
                        <span className="text-slate-300 text-[11px]">{comp.adres}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ==================================================================
          YENİ TÜZEL KİŞİ (ŞİRKET) OLUŞTURMA MODALI (VKN DOĞRULAMALI)
          ================================================================== */}
      {isCompanyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsCompanyModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="relative w-full max-w-xl max-h-[90vh] bg-[#07173e] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-y-auto p-6 sm:p-8 z-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#faecc0]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Yeni Tüzel Kişilik Oluştur</h3>
                  <p className="text-xs text-slate-400">Resmi vergi ve şirket bilgilerinizi giriniz</p>
                </div>
              </div>
              <button
                onClick={() => setIsCompanyModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {companyModalError && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{companyModalError}</span>
              </div>
            )}

            <form onSubmit={handleCreateCompany} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Şirket Resmi Unvanı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Örnek Danışmanlık ve Ticaret Ltd. Şti."
                  value={newUnvan}
                  onChange={(e) => setNewUnvan(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              {/* VKN / TCKN Doğrulama Alanı */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-semibold">
                    Vergi Kimlik No (VKN) veya TCKN *
                  </label>
                  {vknValidation.message && (
                    <span
                      className={`text-[11px] font-bold ${
                        vknValidation.isValid ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {vknValidation.isValid ? '✓ ' : '⚠ '}
                      {vknValidation.message}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  required
                  maxLength={11}
                  placeholder="10 Haneli VKN veya 11 Haneli TCKN"
                  value={newVkn}
                  onChange={(e) => handleVknChange(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl bg-[#040a1a] font-mono text-sm text-white focus:outline-none border ${
                    vknValidation.isValid
                      ? 'border-emerald-500 focus:border-emerald-400'
                      : newVkn.length >= 10
                      ? 'border-amber-500 focus:border-amber-400'
                      : 'border-white/10 focus:border-[#d4af37]'
                  }`}
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Gelir İdaresi Başkanlığı (GİB) modüler sağlama algoritması anlık olarak denetlenmektedir.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Şirket Türü</label>
                  <select
                    value={newSirketTuru}
                    onChange={(e) => setNewSirketTuru(e.target.value as SirketTuru)}
                    className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  >
                    <option value="Limited Şirket">Limited Şirket (Ltd.)</option>
                    <option value="Anonim Şirket">Anonim Şirket (A.Ş.)</option>
                    <option value="Şahıs Şirketi">Şahıs Şirketi</option>
                    <option value="Kollektif Şirket">Kollektif Şirket</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Vergi Dairesi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Bakırköy V.D."
                    value={newVergiDairesi}
                    onChange={(e) => setNewVergiDairesi(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Ticaret Sicil No</label>
                  <input
                    type="text"
                    placeholder="Örn: 123456"
                    value={newTicaretSicil}
                    onChange={(e) => setNewTicaretSicil(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Şirket Telefonu *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0212 XXX XX XX"
                    value={newTelefon}
                    onChange={(e) => setNewTelefon(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">İmza Yetkilisi / Müdür</label>
                <input
                  type="text"
                  placeholder={currentUser.name}
                  value={newYetkili}
                  onChange={(e) => setNewYetkili(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Yasal Tebligat Adresi *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Şirketin yasal merkez adresi..."
                  value={newAdres}
                  onChange={(e) => setNewAdres(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCompanyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={!vknValidation.isValid}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                    vknValidation.isValid
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:from-[#faecc0] hover:to-[#d4af37] text-[#040a1a] shadow-lg cursor-pointer'
                      : 'bg-white/10 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Tüzel Kişiliği Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* KVKK Modalı */}
      <KvkkModal
        isOpen={isKvkkOpen}
        onClose={() => setIsKvkkOpen(false)}
      />
    </div>
  );
}
