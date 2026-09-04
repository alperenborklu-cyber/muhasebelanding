'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  FileCheck,
  Download,
  ArrowLeft,
  Activity,
  Lock
} from 'lucide-react';
import { PortalUser, TuzelKisi, FaturaBelge, AuditLog, BelgeDurumu } from '@/lib/portal-types';
import { PortalService } from '@/lib/portal-service';

export default function AdminPortalPage() {
  const [currentUser, setCurrentUser] = useState<PortalUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'companies' | 'documents' | 'logs'>('pending');

  const [users, setUsers] = useState<PortalUser[]>([]);
  const [companies, setCompanies] = useState<TuzelKisi[]>([]);
  const [documents, setDocuments] = useState<FaturaBelge[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);

  // Filter & Search
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    PortalService.init();
    refreshData();
    setIsLoaded(true);
  }, []);

  const refreshData = () => {
    const user = PortalService.getCurrentUser();
    setCurrentUser(user);
    setUsers(PortalService.getAllUsers());
    setCompanies(PortalService.getCompanies());
    setDocuments(PortalService.getDocuments());
    setLogs(PortalService.getAuditLogs());
  };

  // Kullanıcı Onayla
  const handleApproveUser = (userId: string) => {
    PortalService.updateUserStatus(userId, 'approved');
    refreshData();
  };

  // Kullanıcı Reddet
  const handleRejectUser = (userId: string) => {
    if (confirm('Bu mükellef başvurusunu reddetmek istediğinize emin misiniz?')) {
      PortalService.updateUserStatus(userId, 'rejected');
      refreshData();
    }
  };

  // Fatura Durumu Güncelle
  const handleDocStatusChange = (docId: string, status: BelgeDurumu) => {
    PortalService.updateDocumentStatus(docId, status);
    refreshData();
  };

  // Admin olarak oturum aç (Demo kolaylığı)
  const handleLoginAsAdmin = () => {
    PortalService.loginWithGoogle('suleyman@rotayd.com', 'Süleyman İlhan');
    refreshData();
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#040a1a] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]" />
      </div>
    );
  }

  // Admin Girişi Kontrolü
  const isAdmin = currentUser && currentUser.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#040a1a] text-white flex flex-col justify-center items-center px-4 pt-20">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#07173e] border border-[#d4af37]/30 text-center shadow-2xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#faecc0]">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold mb-2">Mali Müşavir Yetkisi Gerekli</h1>
          <p className="text-xs text-slate-400 mb-6">
            Bu yönetim paneline sadece yetkili Mali Müşavir (Süleyman İlhan) erişebilir.
          </p>
          <button
            onClick={handleLoginAsAdmin}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:from-[#faecc0] hover:to-[#d4af37] text-[#040a1a] font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
          >
            Süleyman İlhan (Admin) Olarak Giriş Yap
          </button>
          <Link
            href="/portal"
            className="block mt-4 text-xs text-slate-400 hover:text-white"
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
  const totalMatrah = documents.reduce((acc, curr) => acc + curr.tutar, 0);
  const totalKdv = documents.reduce((acc, curr) => acc + curr.kdvTutari, 0);

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
                  Yetkili: {currentUser.name}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Mükellef onayları, tüzel kişilik denetimleri ve gelen fiş/fatura muhasebeleştirme havuzu
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/portal"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Mükellef Ekranına Geç</span>
            </Link>

            <button
              onClick={() => {
                PortalService.logout();
                setCurrentUser(null);
              }}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10"
              title="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-[#07173e] border border-white/10">
            <span className="text-[11px] text-slate-400 block font-medium">Onay Bekleyenler</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-amber-400 font-mono">{pendingUsers.length}</span>
              <span className="text-[10px] text-slate-400">kullanıcı</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#07173e] border border-white/10">
            <span className="text-[11px] text-slate-400 block font-medium">Aktif Mükellef Şirket</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400 font-mono">{companies.length}</span>
              <span className="text-[10px] text-slate-400">tüzel kişi</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#07173e] border border-white/10">
            <span className="text-[11px] text-slate-400 block font-medium">Toplam Yüklenen Belge</span>
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
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'pending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Onay Bekleyenler ({pendingUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap ${
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
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap ${
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
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap ${
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
            SEKME 1: ONAY BEKLEYEN KULLANICILAR
            ================================================================== */}
        {activeTab === 'pending' && (
          <div className="p-6 rounded-2xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl">
            <h2 className="text-base font-bold text-white mb-2">Onay Bekleyen Google Kullanıcıları</h2>
            <p className="text-xs text-slate-400 mb-6">
              Mükellefleriniz Google ile giriş yaptıklarında buraya düşer. Onay vermeniz durumunda tüzel kişilik oluşturup fatura yükleyebilirler.
            </p>

            {pendingUsers.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                <UserCheck className="w-12 h-12 mx-auto text-emerald-400 mb-3 opacity-80" />
                <p className="text-sm font-bold text-white">Bekleyen Başvuru Bulunmuyor</p>
                <p className="text-xs text-slate-400 mt-1">Tüm kullanıcılar incelenmiş ve onaylanmıştır.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-5 rounded-xl bg-[#040a1a] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">{user.name}</h3>
                        <p className="text-xs text-slate-400">{user.email}</p>
                        <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-1">
                          <span>Kayıt: {new Date(user.createdAt).toLocaleDateString('tr-TR')}</span>
                          <span>•</span>
                          <span className="text-emerald-400">KVKK Onaylandı</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 self-end sm:self-center">
                      <button
                        onClick={() => handleRejectUser(user.id)}
                        className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reddet</span>
                      </button>

                      <button
                        onClick={() => handleApproveUser(user.id)}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
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
        )}

        {/* ==================================================================
            SEKME 2: FİŞ & FATURA HAVUZU
            ================================================================== */}
        {activeTab === 'documents' && (
          <div className="p-6 rounded-2xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white">Mükellef Fiş &amp; Fatura Havuzu</h2>
                <p className="text-xs text-slate-400">
                  Tüm mükelleflerden gelen belgeleri inceleyebilir, deftere işleyebilir ve onaylayabilirsiniz.
                </p>
              </div>

              {/* Filtreler */}
              <div className="flex flex-wrap items-center gap-3">
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
                        <FileText className="w-5 h-5" />
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
                          <span>Fatura No: <strong className="text-white">{doc.faturaNo}</strong></span>
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
              5651 sayılı Kanun ve siber güvenlik standartları gereğince sistemdeki tüm olaylar değişmez şekilde kaydedilmektedir.
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
    </div>
  );
}
