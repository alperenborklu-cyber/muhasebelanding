'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import JSZip from 'jszip';
import {
  ShieldCheck,
  UserCheck,
  Users,
  Building2,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  LogOut,
  Search,
  Filter,
  Eye,
  EyeOff,
  KeyRound,
  FileCheck,
  Download,
  ArrowLeft,
  Activity,
  Lock,
  RotateCw,
  Plus,
  Mail,
  User,
  Phone,
  Camera
} from 'lucide-react';
import { PortalUser, TuzelKisi, FaturaBelge, AuditLog, BelgeDurumu } from '@/lib/portal-types';

const ADMIN_PASSWORDS = ['Rotayd2026!', 'Suleyman2026!', 'rotayd123', 'admin2026'];
const SESSION_UNLOCKED_KEY = 'rotayd_admin_session_unlocked_v1';
const ADMIN_KEY_STORAGE = 'rotayd_admin_key_v1';

export default function AdminPortalPage() {
  const { data: session } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'companies' | 'documents' | 'logs'>('pending');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  // Doğrudan Onaylı Mükellef Ekleme Modalı State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [addUserError, setAddUserError] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);

  const [users, setUsers] = useState<PortalUser[]>([]);
  const [companies, setCompanies] = useState<TuzelKisi[]>([]);
  const [documents, setDocuments] = useState<FaturaBelge[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);

  // Filter & Search
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getAdminHeaders = () => {
    const key = typeof window !== 'undefined' ? sessionStorage.getItem(ADMIN_KEY_STORAGE) || 'Rotayd2026!' : 'Rotayd2026!';
    return {
      'Content-Type': 'application/json',
      'x-admin-key': key
    };
  };

  useEffect(() => {
    const sessionUnlocked = typeof window !== 'undefined' && sessionStorage.getItem(SESSION_UNLOCKED_KEY) === 'true';
    if (sessionUnlocked || session?.user?.role === 'admin') {
      setIsUnlocked(true);
      if (typeof window !== 'undefined' && !sessionStorage.getItem(ADMIN_KEY_STORAGE)) {
        sessionStorage.setItem(ADMIN_KEY_STORAGE, 'Rotayd2026!');
      }
    }
    refreshData();
    setIsLoaded(true);
  }, [session]);

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      const headers = getAdminHeaders();
      const [usersRes, compRes, docRes, logsRes] = await Promise.all([
        fetch('/api/portal/admin/users', { headers }),
        fetch('/api/portal/companies', { headers }),
        fetch('/api/portal/documents', { headers }),
        fetch('/api/portal/admin/logs', { headers })
      ]);

      if (usersRes.ok) {
        const uData = await usersRes.json();
        setUsers(uData.users || []);
      }
      if (compRes.ok) {
        const cData = await compRes.json();
        setCompanies(cData.companies || []);
      }
      if (docRes.ok) {
        const dData = await docRes.json();
        setDocuments(dData.documents || []);
      }
      if (logsRes.ok) {
        const lData = await logsRes.json();
        setLogs(lData.logs || []);
      }
    } catch (err) {
      console.error('Admin veri yenileme hatası:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Şifreli Giriş Kontrolü
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (ADMIN_PASSWORDS.includes(passwordInput.trim())) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(SESSION_UNLOCKED_KEY, 'true');
        sessionStorage.setItem(ADMIN_KEY_STORAGE, passwordInput.trim());
      }
      setIsUnlocked(true);
      setPasswordInput('');
      refreshData();
    } else {
      setPasswordError('Hatalı yönetici şifresi! Lütfen geçerli şifrenizi giriniz.');
    }
  };

  // Admin Güvenli Çıkış
  const handleAdminLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(SESSION_UNLOCKED_KEY);
      sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    }
    setIsUnlocked(false);
  };

  // Kullanıcı Onayla (API üzerinden kalıcı)
  const handleApproveUser = async (userId: string) => {
    try {
      const res = await fetch('/api/portal/admin/users/status', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: JSON.stringify({ userId, status: 'approved' })
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.error('Kullanıcı onaylama hatası:', err);
    }
  };

  // Kullanıcı Reddet (API üzerinden kalıcı)
  const handleRejectUser = async (userId: string) => {
    if (confirm('Bu mükellef başvurusunu reddetmek istediğinize emin misiniz?')) {
      try {
        const res = await fetch('/api/portal/admin/users/status', {
          method: 'POST',
          headers: getAdminHeaders(),
          body: JSON.stringify({ userId, status: 'rejected' })
        });
        if (res.ok) {
          await refreshData();
        }
      } catch (err) {
        console.error('Kullanıcı reddetme hatası:', err);
      }
    }
  };

  // Doğrudan Onaylı Mükellef Ekle
  const handleAddPreApprovedUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddUserError('');
    if (!newUserEmail) {
      setAddUserError('E-posta adresi zorunludur.');
      return;
    }

    setIsAddingUser(true);
    try {
      const res = await fetch('/api/portal/admin/users', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: JSON.stringify({
          name: newUserName || newUserEmail.split('@')[0],
          email: newUserEmail,
          phone: newUserPhone
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAddUserError(data.error || 'Mükellef eklenemedi.');
      } else {
        setIsAddUserModalOpen(false);
        setNewUserName('');
        setNewUserEmail('');
        setNewUserPhone('');
        await refreshData();
      }
    } catch (err) {
      setAddUserError('Bağlantı hatası oluştu.');
    } finally {
      setIsAddingUser(false);
    }
  };

  // Fatura Durumu Güncelle (API üzerinden kalıcı)
  const handleDocStatusChange = async (docId: string, status: BelgeDurumu) => {
    try {
      const res = await fetch(`/api/portal/admin/documents/${docId}`, {
        method: 'PATCH',
        headers: getAdminHeaders(),
        body: JSON.stringify({ durum: status })
      });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      console.error('Belge durumu güncelleme hatası:', err);
    }
  };

  // TEK TIKLA TÜM FİŞ & BELGELERİ ZIP İNDİRME
  const handleDownloadAdminZip = async () => {
    if (documents.length === 0) {
      alert('İndirilecek evrak bulunamadı.');
      return;
    }

    setIsZipping(true);
    try {
      const zip = new JSZip();
      const folderName = `ROTAYD_Admin_Fis_Arsivi_${new Date().toISOString().split('T')[0]}`;
      const folder = zip.folder(folderName) || zip;

      let summary = `ROTAYD MALİ MÜŞAVİRLİK - GENEL EVRAK VE SLİP DÖKÜMÜ\n`;
      summary += `Rapor Tarihi: ${new Date().toLocaleString('tr-TR')}\n`;
      summary += `Toplam Evrak Sayısı: ${filteredDocs.length} Adet\n\n`;
      summary += `SIRA | ŞİRKET | BELGE NO | TARİH | KATEGORİ | TUTAR (TL) | KDV | TOPLAM (TL) | DURUM\n`;
      summary += `----------------------------------------------------------------------------------------------------\n`;

      for (let i = 0; i < filteredDocs.length; i++) {
        const doc = filteredDocs[i];
        const fileName = `${doc.faturaNo || `BELGE_${i + 1}`}.jpg`;
        summary += `${i + 1} | ${doc.companyUnvan || '-'} | ${doc.faturaNo} | ${doc.faturaTarihi} | ${doc.kategori} | ${doc.tutar} TL | %${doc.kdvOrani} | ${doc.toplamTutar} TL | ${doc.durum}\n`;

        if (doc.fileDataUrl) {
          const base64Data = doc.fileDataUrl.split(',')[1] || doc.fileDataUrl;
          folder.file(fileName, base64Data, { base64: true });
        } else {
          folder.file(`${doc.faturaNo}_kayit.txt`, `Şirket: ${doc.companyUnvan}\nFatura No: ${doc.faturaNo}\nTarih: ${doc.faturaTarihi}\nTutar: ${doc.toplamTutar} TL\nNot: ${doc.notlar || '-'}`);
        }
      }

      folder.file('00_MUKELLEF_FIS_LISTESI.txt', summary);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${folderName}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Admin zip oluşturma hatası:', err);
      alert('Arşiv indirilirken bir hata oluştu.');
    } finally {
      setIsZipping(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#040a1a] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]" />
      </div>
    );
  }

  // ==========================================================================
  // ŞİFRELİ GİRİŞ EKRANI (LOCKED STATE)
  // ==========================================================================
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#040a1a] text-white flex flex-col justify-center items-center px-4 pt-20 pb-12 relative overflow-hidden">
        {/* Arka Plan Işık Efekti */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#1d4ed8]/10 via-[#d4af37]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full p-8 rounded-3xl bg-[#07173e]/95 border border-[#d4af37]/40 text-center shadow-[0_15px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl relative z-10">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#07173e] to-[#040a1a] border border-[#d4af37]/50 flex items-center justify-center text-[#faecc0] shadow-[0_0_25px_rgba(212,175,55,0.25)]">
            <Lock className="w-8 h-8 text-[#d4af37]" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Mali Müşavir Yönetici Girişi
          </h1>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Bu yönetim alanı yüksek güvenlik protokolü gereğince şifrelenmiştir. Lütfen yönetici şifrenizi giriniz.
          </p>

          {passwordError && (
            <div className="p-3 mb-5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2 text-left">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="relative text-left">
              <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Yönetici Güvenlik Şifresi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4 text-[#d4af37]" />
                </div>

                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Yönetici şifresi..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#040a1a] border border-white/10 text-white placeholder-slate-500 focus:border-[#d4af37] focus:outline-none text-sm tracking-wider font-mono transition-colors"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Şifreyi Gizle' : 'Şifreyi Göster'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:from-[#faecc0] hover:to-[#d4af37] text-[#040a1a] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Güvenli Giriş Yap</span>
            </button>
          </form>

          <Link
            href="/portal"
            className="inline-block mt-4 text-xs text-slate-400 hover:text-white transition-colors"
          >
            &larr; Mükellef Portalı&rsquo;na Dön
          </Link>
        </div>
      </div>
    );
  }

  const pendingUsers = users.filter((u) => u.status === 'pending');
  const approvedUsers = users.filter((u) => u.status === 'approved');

  // Filtrelenmiş Faturalar
  const filteredDocs = documents.filter((d) => {
    const matchSearch =
      !searchFilter ||
      d.fileName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.faturaNo.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.companyUnvan?.toLowerCase().includes(searchFilter.toLowerCase());
    const matchCompany = selectedCompanyFilter === 'all' || d.companyId === selectedCompanyFilter;
    const matchStatus = statusFilter === 'all' || d.durum === statusFilter;
    return matchSearch && matchCompany && matchStatus;
  });

  // Toplam Tutar İstatistiği
  const totalMatrah = documents.reduce((acc, curr) => acc + (curr.tutar || 0), 0);

  return (
    <div className="min-h-screen bg-[#040a1a] text-slate-100 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-8">
        {/* Header Bar */}
        <div className="p-6 rounded-2xl bg-[#07173e] border border-[#d4af37]/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#8a701e] p-0.5 shadow-md">
              <div className="w-full h-full rounded-2xl bg-[#040a1a] flex items-center justify-center text-[#d4af37]">
                <ShieldCheck className="w-7 h-7" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-white">Mali Müşavir Yönetim Paneli</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#faecc0] text-[10px] font-bold uppercase tracking-wider border border-[#d4af37]/40">
                  Yetkili: {session?.user?.name || 'Süleyman İlhan'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Mükellef onayları, tüzel kişilik denetimleri ve gelen fiş/fatura muhasebeleştirme havuzu
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Verileri Yenile"
            >
              <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#d4af37]' : ''}`} />
            </button>

            <Link
              href="/portal"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Mükellef Ekranına Geç</span>
            </Link>

            <button
              onClick={handleAdminLogout}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10 transition-colors cursor-pointer"
              title="Güvenli Çıkış ve Paneli Kilitle"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-[#07173e] border border-white/10">
            <span className="text-[11px] text-slate-400 block font-medium">Onay Bekleyen Başvurular</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-amber-400 font-mono">{pendingUsers.length}</span>
              <span className="text-[10px] text-slate-400">mükellef</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#07173e] border border-white/10">
            <span className="text-[11px] text-slate-400 block font-medium">Onaylı Aktif Mükellef</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400 font-mono">{approvedUsers.length}</span>
              <span className="text-[10px] text-slate-400">yetkili</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#07173e] border border-white/10">
            <span className="text-[11px] text-slate-400 block font-medium">Toplam Gelen Belge &amp; Fiş</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-white font-mono">{documents.length}</span>
              <span className="text-[10px] text-slate-400">evrak</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#07173e] border border-[#d4af37]/30">
            <span className="text-[11px] text-[#faecc0] block font-medium">Havuz Matrah Toplamı</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-xl font-bold text-[#d4af37] font-mono">
                ₺{totalMatrah.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        {/* Sekmeler */}
        <div className="flex items-center space-x-3 mt-6 border-b border-white/10 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Mükellef Onay Havuzu ({pendingUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'documents'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#b89025] text-[#040a1a] shadow-lg'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Fiş &amp; Fatura Havuzu ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('companies')}
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'companies'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#b89025] text-[#040a1a] shadow-lg'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Mükellef Şirketleri ({companies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-lg'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Güvenlik Logları ({logs.length})</span>
          </button>
        </div>
      </div>

      {/* İÇERİKLER */}
      <div className="max-w-7xl mx-auto">
        {/* ==================================================================
            SEKME 1: ONAY BEKLEYENLER VE ONAYLI MÜKELLEF LİSTESİ
            ================================================================== */}
        {activeTab === 'pending' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-base font-bold text-white">Onay Bekleyen Mükellef Başvuruları</h2>
                  <p className="text-xs text-slate-400">
                    Sadece sizin onay verdiğiniz mükellefler sisteme fotoğraf, fiş ve fatura yükleyebilir.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold font-mono">
                    {pendingUsers.length} Bekleyen
                  </span>
                  <button
                    onClick={() => setIsAddUserModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:from-[#faecc0] hover:to-[#d4af37] text-[#040a1a] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Yeni Mükellef Yetkilendir</span>
                  </button>
                </div>
              </div>

              {pendingUsers.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-white/10 rounded-xl">
                  <UserCheck className="w-10 h-10 mx-auto text-emerald-400 mb-2 opacity-80" />
                  <p className="text-sm font-bold text-white">Bekleyen Başvuru Bulunmuyor</p>
                  <p className="text-xs text-slate-400 mt-1">Giriş yapan tüm mükellefler incelenmiş ve onaylanmıştır.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingUsers.map((user) => (
                    <div
                      key={user.id}
                      className="p-4 rounded-xl bg-[#040a1a] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-11 h-11 rounded-xl object-cover border border-amber-500/40"
                        />
                        <div>
                          <h3 className="font-bold text-white text-sm">{user.name}</h3>
                          <p className="text-xs text-[#faecc0] font-mono">{user.email}</p>
                          <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-0.5">
                            <span>Kayıt: {new Date(user.createdAt).toLocaleDateString('tr-TR')}</span>
                            <span>•</span>
                            <span className="text-emerald-400">KVKK Onaylandı</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 self-end sm:self-center">
                        <button
                          onClick={() => handleRejectUser(user.id)}
                          className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reddet</span>
                        </button>

                        <button
                          onClick={() => handleApproveUser(user.id)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer active:scale-[0.98]"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Onayla ve Yetkilendir</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Yetkilendirilmiş (Onaylı) Mükellefler Listesi */}
            <div className="p-6 rounded-2xl bg-[#07173e] border border-white/10 shadow-xl">
              <h3 className="text-base font-bold text-white mb-2 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" />
                Yetkili Mükellefler (Fotoğraf &amp; Belge Yükleme İzni Olanlar - {approvedUsers.length})
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Aşağıdaki mükellefler onaylanmıştır ve sisteme diledikleri zaman fatura/fiş fotoğrafı yükleyebilirler.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {approvedUsers.map((u) => (
                  <div key={u.id} className="p-3.5 rounded-xl bg-[#040a1a] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <img src={u.image} alt={u.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                      <div className="overflow-hidden">
                        <span className="font-bold text-white text-xs block truncate">{u.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono block truncate">{u.email}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase flex-shrink-0">
                      Aktif
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            SEKME 2: FİŞ & FATURA HAVUZU
            ================================================================== */}
        {activeTab === 'documents' && (
          <div className="p-6 rounded-2xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white">Mükellef Fiş &amp; Fotoğraf Havuzu</h2>
                <p className="text-xs text-slate-400">
                  Onaylı mükelleflerden gelen fotoğraflı ve belgeli harcamaları inceleyebilir ve durumlarını değiştirebilirsiniz.
                </p>
              </div>

              {/* Filtreler ve ZIP İndirme */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadAdminZip}
                  disabled={isZipping || filteredDocs.length === 0}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:from-[#faecc0] hover:to-[#d4af37] text-[#040a1a] font-bold text-xs flex items-center space-x-1.5 shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                  title="Filtrelenen tüm fiş ve slipleri tek tıkla ZIP olarak indir"
                >
                  <Download className={`w-3.5 h-3.5 ${isZipping ? 'animate-bounce' : ''}`} />
                  <span>{isZipping ? 'Paketleniyor...' : 'Tüm Fişleri İndir (.ZIP)'}</span>
                </button>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Evrak no, şirket ara..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-[#040a1a] border border-white/10 text-xs text-white focus:border-[#d4af37] focus:outline-none w-48"
                  />
                </div>

                <select
                  value={selectedCompanyFilter}
                  onChange={(e) => setSelectedCompanyFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#040a1a] border border-white/10 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                >
                  <option value="all">Tüm Şirketler</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.unvan.slice(0, 25)}...
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#040a1a] border border-white/10 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="yuklendi">Yeni Yüklendi</option>
                  <option value="incelendi">İncelendi</option>
                  <option value="deftere_islendi">Deftere İşlendi</option>
                  <option value="reddedildi">Reddedildi</option>
                </select>
              </div>
            </div>

            {filteredDocs.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                <FileText className="w-10 h-10 mx-auto text-slate-500 mb-2" />
                <p className="text-xs text-slate-400">Kriterlere uygun belge bulunamadı.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-xl bg-[#040a1a] border border-white/10 hover:border-[#d4af37]/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center flex-shrink-0 text-[#d4af37]">
                        {doc.belgeTuru === 'fis' ? <Camera className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-xs">{doc.fileName}</span>
                          <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] uppercase font-semibold text-slate-300">
                            {doc.belgeTuru}
                          </span>
                          <span className="text-[11px] text-[#faecc0] font-semibold">
                            [{doc.companyUnvan}]
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 mt-1">
                          <span>No: <strong className="text-white">{doc.faturaNo}</strong></span>
                          <span>•</span>
                          <span>Tarih: {doc.faturaTarihi}</span>
                          <span>•</span>
                          <span>Matrah: ₺{doc.tutar.toFixed(2)}</span>
                          <span>•</span>
                          <span>KDV (%{doc.kdvOrani}): ₺{doc.kdvTutari.toFixed(2)}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-bold font-mono">
                            Toplam: ₺{doc.toplamTutar.toFixed(2)}
                          </span>
                        </div>

                        {doc.notlar && (
                          <p className="text-[10px] text-slate-400 italic mt-1">&ldquo;{doc.notlar}&rdquo;</p>
                        )}
                      </div>
                    </div>

                    {/* Durum Değiştirici */}
                    <div className="flex items-center space-x-3 self-end lg:self-center">
                      <label className="text-[11px] text-slate-400 font-medium">Durum:</label>
                      <select
                        value={doc.durum}
                        onChange={(e) => handleDocStatusChange(doc.id, e.target.value as BelgeDurumu)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none ${
                          doc.durum === 'deftere_islendi'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : doc.durum === 'incelendi'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            : doc.durum === 'reddedildi'
                            ? 'bg-red-500/20 text-red-300 border-red-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        <option value="yuklendi" className="bg-[#07173e] text-amber-300">Yeni Yüklendi</option>
                        <option value="incelendi" className="bg-[#07173e] text-blue-300">İncelendi</option>
                        <option value="deftere_islendi" className="bg-[#07173e] text-emerald-300">Deftere İşlendi</option>
                        <option value="reddedildi" className="bg-[#07173e] text-red-300">Reddedildi / Eksik</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================================================================
            SEKME 3: MÜKELLEF ŞİRKETLERİ
            ================================================================== */}
        {activeTab === 'companies' && (
          <div className="p-6 rounded-2xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white">Tanımlı Tüzel Kişiler &amp; Mükellefler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companies.map((comp) => {
                const compDocs = documents.filter((d) => d.companyId === comp.id);
                return (
                  <div
                    key={comp.id}
                    className="p-5 rounded-xl bg-[#040a1a] border border-white/10 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#faecc0] text-[10px] font-bold uppercase">
                          {comp.sirketTuru}
                        </span>
                        <h3 className="font-bold text-white text-sm mt-1">{comp.unvan}</h3>
                      </div>
                      <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">
                        {compDocs.length} Evrak
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1.5 border-t border-white/10 pt-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Doğrulanmış VKN:</span>
                        <span className="font-mono font-bold text-[#faecc0]">{comp.vkn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Vergi Dairesi:</span>
                        <span className="text-white">{comp.vergiDairesi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Yetkili / Telefon:</span>
                        <span className="text-white">{comp.yetkiliKisi} ({comp.telefon})</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================================
            SEKME 4: DENETİM İZİ (AUDIT LOGS)
            ================================================================== */}
        {activeTab === 'logs' && (
          <div className="p-6 rounded-2xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white">Siber Güvenlik &amp; Denetim İzi (Audit Log)</h2>
            <p className="text-xs text-slate-400 mb-4">
              5651 sayılı Kanun ve siber güvenlik standartları gereğince sistemdeki tüm olaylar sunucuda değişmez şekilde kaydedilmektedir.
            </p>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-[#040a1a] border border-white/5 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold text-[10px]">
                      {log.action}
                    </span>
                    <span className="text-slate-300 text-[11px]">{log.details}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 sm:text-right flex-shrink-0">
                    <span>{new Date(log.createdAt).toLocaleString('tr-TR')}</span>
                    <span className="ml-2 text-slate-400">({log.ipAddress})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ==================================================================
          DOĞRUDAN ÖN ONAYLI MÜKELLEF EKLEME MODALI
          ================================================================== */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsAddUserModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="relative w-full max-w-md bg-[#07173e] border border-[#d4af37]/40 rounded-2xl shadow-2xl p-6 z-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#faecc0]">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Yeni Mükellef Yetkilendir</h3>
                  <p className="text-[11px] text-slate-400">Doğrudan onaylı mükellef hesabı açın</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {addUserError && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{addUserError}</span>
              </div>
            )}

            <form onSubmit={handleAddPreApprovedUser} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Mükellef Adı Soyadı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Hasan Yılmaz"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">E-Posta Adresi *</label>
                <input
                  type="email"
                  required
                  placeholder="hasan@sirket.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Mükellef bu e-posta adresiyle /portal&apos;a girdiğinde beklemeden doğrudan sisteme dahil olur.
                </p>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Telefon Numarası</label>
                <input
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isAddingUser}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isAddingUser ? 'Ekleniyor...' : 'Yetkilendir & Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
