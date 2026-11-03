'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Camera,
  BookOpen,
  Sparkles,
  Trash2,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Layers,
  Award,
  TrendingUp,
  Tag,
  Calendar,
  Check,
  MessageCircle,
  Video
} from 'lucide-react';
import { PortalUser, TuzelKisi, FaturaBelge, AuditLog, BelgeDurumu } from '@/lib/portal-types';
import { ReferenceItem } from '@/lib/references-store';
import { BlogPost } from '@/lib/blogData';
import { IncentiveProgram } from '@/lib/incentives-store';

const ADMIN_PASSWORDS = ['Rotayd2026!', 'Alideniz2020', 'Suleyman2026!', 'rotayd123', 'admin2026'];
const SESSION_UNLOCKED_KEY = 'rotayd_admin_session_unlocked_v1';
const ADMIN_KEY_STORAGE = 'rotayd_admin_key_v1';

export default function AdminPortalPage() {
  const { data: session } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  // Active Tab: references, blog, incentives, appointments, pending, documents, companies, logs
  const [activeTab, setActiveTab] = useState<'references' | 'blog' | 'incentives' | 'appointments' | 'pending' | 'documents' | 'companies' | 'logs'>('references');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  // Core Data
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [companies, setCompanies] = useState<TuzelKisi[]>([]);
  const [documents, setDocuments] = useState<FaturaBelge[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);

  // Modules Data
  const [references, setReferences] = useState<ReferenceItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [incentives, setIncentives] = useState<IncentiveProgram[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  // Search & Filter
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');

  // Modal States
  // 1. Yeni Mükellef Modalı
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [addUserError, setAddUserError] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);

  // 2. Yeni Referans Modalı
  const [isAddRefModalOpen, setIsAddRefModalOpen] = useState(false);
  const [newRefName, setNewRefName] = useState('');
  const [newRefDesc, setNewRefDesc] = useState('');
  const [newRefImage, setNewRefImage] = useState('');
  const [isSavingRef, setIsSavingRef] = useState(false);
  const [refError, setRefError] = useState('');

  // 3. Yeni Blog Yazısı Modalı
  const [isAddBlogModalOpen, setIsAddBlogModalOpen] = useState(false);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState<any>('Mali Müşavirlik');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogTags, setNewBlogTags] = useState('Rehber, Mevzuat, 2026');
  const [newBlogAuthor, setNewBlogAuthor] = useState('ROTAYD Mali Müşavirlik');
  const [isSavingBlog, setIsSavingBlog] = useState(false);
  const [blogError, setBlogError] = useState('');

  // 4. Yeni Teşvik Programı Modalı
  const [isAddIncentiveModalOpen, setIsAddIncentiveModalOpen] = useState(false);
  const [newIncName, setNewIncName] = useState('');
  const [newIncInstitution, setNewIncInstitution] = useState('');
  const [newIncCategory, setNewIncCategory] = useState<any>('Yatırım Teşvik');
  const [newIncLimit, setNewIncLimit] = useState('');
  const [newIncRate, setNewIncRate] = useState('');
  const [newIncDesc, setNewIncDesc] = useState('');
  const [newIncReq, setNewIncReq] = useState('');
  const [isSavingInc, setIsSavingInc] = useState(false);
  const [incError, setIncError] = useState('');

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
      const [usersRes, compRes, docRes, logsRes, refRes, blogRes, incRes, aptRes] = await Promise.all([
        fetch('/api/portal/admin/users', { headers }).catch(() => null),
        fetch('/api/portal/companies', { headers }).catch(() => null),
        fetch('/api/portal/documents', { headers }).catch(() => null),
        fetch('/api/portal/admin/logs', { headers }).catch(() => null),
        fetch('/api/references?all=true').catch(() => null),
        fetch('/api/blog').catch(() => null),
        fetch('/api/incentives').catch(() => null),
        fetch('/api/appointments').catch(() => null)
      ]);

      if (usersRes?.ok) {
        const d = await usersRes.json();
        setUsers(d.users || []);
      }
      if (compRes?.ok) {
        const d = await compRes.json();
        setCompanies(d.companies || []);
      }
      if (docRes?.ok) {
        const d = await docRes.json();
        setDocuments(d.documents || []);
      }
      if (logsRes?.ok) {
        const d = await logsRes.json();
        setLogs(d.logs || []);
      }
      if (refRes?.ok) {
        const d = await refRes.json();
        setReferences(d.references || []);
      }
      if (blogRes?.ok) {
        const d = await blogRes.json();
        setBlogPosts(d.posts || []);
      }
      if (incRes?.ok) {
        const d = await incRes.json();
        setIncentives(d.programs || []);
      }
      if (aptRes?.ok) {
        const d = await aptRes.json();
        setAppointments(d.appointments || []);
      }
    } catch (err) {
      console.error('Error refreshing admin data:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (ADMIN_PASSWORDS.includes(passwordInput.trim())) {
      setIsUnlocked(true);
      setPasswordError('');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(SESSION_UNLOCKED_KEY, 'true');
        sessionStorage.setItem(ADMIN_KEY_STORAGE, passwordInput.trim());
      }
      refreshData();
    } else {
      setPasswordError('Geçersiz yönetici parolası. Lütfen kontrol ediniz.');
    }
  };

  const handleAdminLogout = () => {
    setIsUnlocked(false);
    setPasswordInput('');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(SESSION_UNLOCKED_KEY);
      sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    }
  };

  // ==========================================
  // REFERENCE HANDLERS
  // ==========================================
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setRefError('Logo boyutu en fazla 3MB olabilir.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      setNewRefImage(dataUrl);
      setRefError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveReference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRefName.trim()) {
      setRefError('Firma adı zorunludur.');
      return;
    }
    if (!newRefImage) {
      setRefError('Lütfen bir logo görseli yükleyin veya URL girin.');
      return;
    }

    setIsSavingRef(true);
    setRefError('');
    try {
      const res = await fetch('/api/references', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: JSON.stringify({
          name: newRefName.trim(),
          desc: newRefDesc.trim() || 'Kurumsal Referans',
          imageUrl: newRefImage
        })
      });

      if (res.ok) {
        setIsAddRefModalOpen(false);
        setNewRefName('');
        setNewRefDesc('');
        setNewRefImage('');
        refreshData();
      } else {
        const d = await res.json();
        setRefError(d.error || 'Kaydedilemedi.');
      }
    } catch {
      setRefError('Bağlantı hatası.');
    } finally {
      setIsSavingRef(false);
    }
  };

  const handleDeleteReference = async (id: string, name: string) => {
    if (!confirm(`"${name}" referansını silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/references?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: getAdminHeaders()
      });
      if (res.ok) {
        setReferences(prev => prev.filter(r => r.id !== id));
      } else {
        alert('Silinemedi.');
      }
    } catch {
      alert('İşlem başarısız.');
    }
  };

  const handleToggleReference = async (id: string) => {
    try {
      const res = await fetch('/api/references', {
        method: 'PATCH',
        headers: getAdminHeaders(),
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setReferences(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
      }
    } catch {
      // ignore
    }
  };

  // ==========================================
  // BLOG HANDLERS
  // ==========================================
  const handleSaveBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle.trim() || !newBlogExcerpt.trim()) {
      setBlogError('Başlık ve özet zorunludur.');
      return;
    }

    setIsSavingBlog(true);
    setBlogError('');
    try {
      const paragraphs = newBlogContent.trim()
        ? newBlogContent.split('\n').filter(p => p.trim().length > 0)
        : [newBlogExcerpt.trim()];

      const tagsArray = newBlogTags.split(',').map(t => t.trim()).filter(Boolean);

      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: JSON.stringify({
          title: newBlogTitle.trim(),
          category: newBlogCategory,
          excerpt: newBlogExcerpt.trim(),
          content: paragraphs,
          tags: tagsArray,
          author: newBlogAuthor.trim() || 'ROTAYD Masası'
        })
      });

      if (res.ok) {
        setIsAddBlogModalOpen(false);
        setNewBlogTitle('');
        setNewBlogExcerpt('');
        setNewBlogContent('');
        refreshData();
      } else {
        const d = await res.json();
        setBlogError(d.error || 'Kaydedilemedi.');
      }
    } catch {
      setBlogError('Bağlantı hatası.');
    } finally {
      setIsSavingBlog(false);
    }
  };

  const handleDeleteBlogPost = async (id: string, title: string) => {
    if (!confirm(`"${title}" başlıklı makaleyi silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/blog?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: getAdminHeaders()
      });
      if (res.ok) {
        setBlogPosts(prev => prev.filter(p => p.id !== id && p.slug !== id));
      } else {
        alert('Silinemedi.');
      }
    } catch {
      alert('İşlem başarısız.');
    }
  };

  // ==========================================
  // INCENTIVE HANDLERS
  // ==========================================
  const handleSaveIncentive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncName.trim() || !newIncInstitution.trim()) {
      setIncError('Program adı ve kurum zorunludur.');
      return;
    }

    setIsSavingInc(true);
    setIncError('');
    try {
      const reqList = newIncReq.split('\n').map(r => r.trim()).filter(Boolean);
      const res = await fetch('/api/incentives', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: JSON.stringify({
          name: newIncName.trim(),
          institution: newIncInstitution.trim(),
          category: newIncCategory,
          supportLimit: newIncLimit.trim() || '2026 Hadlerine Göre',
          supportRate: newIncRate.trim() || '%50 - %70 Hibe',
          description: newIncDesc.trim() || '',
          requirements: reqList.length > 0 ? reqList : ['KOBİ / Sanayi vasfı']
        })
      });

      if (res.ok) {
        setIsAddIncentiveModalOpen(false);
        setNewIncName('');
        setNewIncInstitution('');
        setNewIncLimit('');
        setNewIncRate('');
        setNewIncDesc('');
        setNewIncReq('');
        refreshData();
      } else {
        const d = await res.json();
        setIncError(d.error || 'Kaydedilemedi.');
      }
    } catch {
      setIncError('Bağlantı hatası.');
    } finally {
      setIsSavingInc(false);
    }
  };

  const handleDeleteIncentive = async (id: string, name: string) => {
    if (!confirm(`"${name}" programını silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/incentives?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: getAdminHeaders()
      });
      if (res.ok) {
        setIncentives(prev => prev.filter(p => p.id !== id));
      }
    } catch {
      alert('İşlem başarısız.');
    }
  };

  // ==========================================
  // APPOINTMENTS (GOOGLE CALENDAR) HANDLERS
  // ==========================================
  const handleUpdateAppointmentStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      }
    } catch (err) {
      console.error('Randevu durumu güncelleme hatası:', err);
    }
  };

  const handleDeleteAppointment = async (id: string, name: string) => {
    if (!confirm(`"${name}" adlı danışanın randevusunu silmek istediğinize emin misiniz?`)) return;
    try {
      const res = await fetch(`/api/appointments?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setAppointments(prev => prev.filter(a => a.id !== id));
      }
    } catch {
      alert('Randevu silinemedi.');
    }
  };

  // ==========================================
  // PORTAL USER / DOCUMENT HANDLERS
  // ==========================================
  const handleUpdateUserStatus = async (userId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const res = await fetch('/api/portal/admin/users/status', {
        method: 'PATCH',
        headers: getAdminHeaders(),
        body: JSON.stringify({ userId, status: newStatus })
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateDocumentStatus = async (docId: string, durum: BelgeDurumu) => {
    try {
      const res = await fetch(`/api/portal/admin/documents/${docId}`, {
        method: 'PATCH',
        headers: getAdminHeaders(),
        body: JSON.stringify({ durum })
      });
      if (res.ok) {
        setDocuments(prev => prev.map(d => d.id === docId ? { ...d, durum } : d));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm('Bu belgeyi sistemden kalıcı olarak silmek istiyor musunuz?')) return;
    try {
      const res = await fetch(`/api/portal/admin/documents/${docId}`, {
        method: 'DELETE',
        headers: getAdminHeaders()
      });
      if (res.ok) {
        setDocuments(prev => prev.filter(d => d.id !== docId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddDirectUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      setAddUserError('Lütfen ad soyad ve e-posta alanlarını eksiksiz doldurunuz.');
      return;
    }

    setIsAddingUser(true);
    setAddUserError('');
    try {
      const res = await fetch('/api/portal/admin/users', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: JSON.stringify({
          name: newUserName.trim(),
          email: newUserEmail.trim().toLowerCase(),
          phone: newUserPhone.trim()
        })
      });

      if (res.ok) {
        setIsAddUserModalOpen(false);
        setNewUserName('');
        setNewUserEmail('');
        setNewUserPhone('');
        refreshData();
      } else {
        const d = await res.json();
        setAddUserError(d.error || 'Mükellef eklenemedi.');
      }
    } catch {
      setAddUserError('Bağlantı hatası oluştu.');
    } finally {
      setIsAddingUser(false);
    }
  };

  // ZIP Download for accounting
  const handleDownloadZip = async () => {
    const validDocs = documents.filter(d => (d.fileDataUrl || (d as any).fileUrl)?.startsWith('data:'));
    if (validDocs.length === 0) {
      alert('İndirilecek base64 formatında belge bulunamadı.');
      return;
    }

    setIsZipping(true);
    try {
      const zip = new JSZip();
      validDocs.forEach((doc, idx) => {
        const fileUrl = doc.fileDataUrl || (doc as any).fileUrl;
        const base64Data = fileUrl ? fileUrl.split(',')[1] : null;
        if (base64Data) {
          const ext = doc.fileType === 'application/pdf' || doc.fileType === 'pdf' ? 'pdf' : 'jpg';
          const compName = (doc.companyUnvan || (doc as any).sirketUnvani || 'Firma').replace(/[^a-zA-Z0-9]/g, '_');
          const docDate = doc.faturaTarihi || (doc as any).tarih || 'Tarih';
          const docNum = doc.faturaNo || (doc as any).belgeNo || idx + 1;
          const filename = `${compName}_${docDate}_${docNum}.${ext}`;
          zip.file(filename, base64Data, { base64: true });
        }
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ROTAYD_Muhasebe_Evraklar_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Zip oluşturulurken hata meydana geldi.');
    } finally {
      setIsZipping(false);
    }
  };

  // Helpers
  const pendingUsers = users.filter(u => u.status === 'pending');
  const approvedUsers = users.filter(u => u.status === 'approved');
  const totalMatrah = documents.reduce((sum, d) => sum + (d.tutar || (d as any).tutarKdvHaric || 0), 0);

  const filteredBlogPosts = blogCategoryFilter === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === blogCategoryFilter);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#040a1a] flex items-center justify-center text-white">
        <RotateCw className="w-8 h-8 animate-spin text-[#d4af37]" />
      </div>
    );
  }

  // ==========================================
  // LOCK SCREEN
  // ==========================================
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#040a1a] text-white flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#07173e]/95 border border-[#d4af37]/40 shadow-2xl relative z-10 backdrop-blur-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#d4af37] to-[#faecc0] text-black mx-auto flex items-center justify-center shadow-lg shadow-[#d4af37]/20">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase">ROTAYD YÖNETİM PORTALI</span>
            <h1 className="text-2xl font-bold text-white mt-1">Yönetici Paneli Girişi</h1>
            <p className="text-xs text-slate-400 mt-2">
              Referanslar, blog makaleleri, hibe teşvik danışmanlığı ve mükellef evrak yönetimi için şifrenizi giriniz.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Yönetici Şifresi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Yönetici şifreniz..."
                  className="w-full px-4 py-3 rounded-xl bg-[#040a1a] border border-white/10 text-white placeholder-slate-500 focus:border-[#d4af37] focus:outline-none text-sm pr-11"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {passwordError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:opacity-95 text-[#040a1a] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Yönetim Panelini Aç</span>
            </button>
          </form>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Siteye Dön</span>
            </Link>
            <Link href="/portal" className="text-[#d4af37] hover:underline">
              Mükellef Girişi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // UNLOCKED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#040a1a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="p-6 rounded-3xl bg-[#07173e]/90 border border-[#d4af37]/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-md">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#faecc0] text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>ROTAYD MERKEZİ YÖNETİM PLATFORMU</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
              Yönetici Paneli &amp; <span className="gold-gradient-text font-serif italic">CMS Yönetimi</span>
            </h1>
            <p className="text-xs text-slate-400">
              Referanslar, blog içerikleri, 2026 teşvik rehberleri ve mükellef evrak havuzu tek ekranda.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
              title="Verileri Yenile"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#d4af37]' : ''}`} />
              <span>Yenile</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center space-x-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Siteyi Gör</span>
            </Link>

            <button
              onClick={handleAdminLogout}
              className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
              title="Paneli Kilitle"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
          <div className="p-3.5 rounded-2xl bg-[#07173e]/80 border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Aktif Referanslar</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-xl font-bold text-[#d4af37] font-mono">{references.filter(r => r.active).length}</span>
              <span className="text-[10px] text-slate-500">/ {references.length} logo</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#07173e]/80 border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Yayınlanan Blog</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-xl font-bold text-white font-mono">{blogPosts.length}</span>
              <span className="text-[10px] text-slate-500">makale</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#07173e]/80 border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Teşvik Programı</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-xl font-bold text-emerald-400 font-mono">{incentives.length}</span>
              <span className="text-[10px] text-slate-500">alan</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#07173e]/80 border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Onay Bekleyen</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-xl font-bold text-amber-400 font-mono">{pendingUsers.length}</span>
              <span className="text-[10px] text-slate-500">mükellef</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#07173e]/80 border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Evrak &amp; Fiş Havuzu</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-xl font-bold text-white font-mono">{documents.length}</span>
              <span className="text-[10px] text-slate-500">belge</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#07173e]/80 border border-[#d4af37]/30">
            <span className="text-[10px] text-[#faecc0] uppercase tracking-wider block font-semibold">Toplam Matrah</span>
            <div className="flex items-baseline space-x-1 mt-1">
              <span className="text-lg font-bold text-[#d4af37] font-mono">
                ₺{totalMatrah.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        {/* TAB BUTTONS */}
        <div className="flex items-center space-x-2 mt-6 border-b border-white/10 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('references')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'references'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black shadow-lg shadow-[#d4af37]/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Referanslar Yönetimi ({references.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'blog'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black shadow-lg shadow-[#d4af37]/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog Yönetim Paneli ({blogPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('incentives')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'incentives'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black shadow-lg shadow-[#d4af37]/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Hibe &amp; Teşvik Danışmanlık ({incentives.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'appointments'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/30'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Google Takvim &amp; Randevular ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Mükellef Onayları ({pendingUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'documents'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-lg'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Fiş &amp; Faturalar ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('companies')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'companies'
                ? 'bg-white/20 text-white shadow-lg'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Şirketler ({companies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-white/20 text-white shadow-lg'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Loglar</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          TAB 1: REFERANSLAR YÖNETİMİ
          ===================================================================== */}
      {activeTab === 'references' && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-[#d4af37]" />
                  <span>Referans Firmalar &amp; Logo Vitrini</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Anasayfada ve hizmet sayfalarında kesintisiz dönen kurumsal referans logolarını ekleyin, kaldırın veya gizleyin.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  href="/#referanslar"
                  target="_blank"
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Canlı Vitrini İncele</span>
                </Link>

                <button
                  onClick={() => {
                    setIsAddRefModalOpen(true);
                    setRefError('');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:opacity-95 text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg shadow-[#d4af37]/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Referans Ekle</span>
                </button>
              </div>
            </div>

            {/* References Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {references.map((ref) => {
                const logoSrc = ref.imageUrl || (ref.file ? `/references/${ref.file}` : '/apple-icon.png');
                return (
                  <div
                    key={ref.id}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                      ref.active
                        ? 'bg-[#040a1a] border-white/10 hover:border-[#d4af37]/50 shadow-md'
                        : 'bg-white/[0.02] border-white/5 opacity-50'
                    }`}
                  >
                    <div>
                      {/* Logo Display Box */}
                      <div className="relative h-20 w-full rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center p-3 mb-3 overflow-hidden group">
                        <Image
                          src={logoSrc}
                          alt={ref.name}
                          fill
                          unoptimized={logoSrc.startsWith('data:')}
                          className="object-contain filter brightness-0 invert opacity-90 p-2"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            ref.active ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-500/20 text-slate-400'
                          }`}>
                            {ref.active ? 'Aktif' : 'Gizli'}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-white tracking-wide truncate">{ref.name}</h3>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{ref.desc}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleToggleReference(ref.id)}
                        className="text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {ref.active ? 'Yayından Kaldır' : 'Yayınla'}
                      </button>

                      <button
                        onClick={() => handleDeleteReference(ref.id, ref.name)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                        title="Referansı Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: BLOG YÖNETİM PANELİ
          ===================================================================== */}
      {activeTab === 'blog' && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-[#d4af37]" />
                  <span>Blog &amp; Mevzuat Yazıları Yönetimi</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mali Müşavirlik ve Hibe Teşvik Danışmanlığı sayfalarının uzman rehberlerini oluşturun, düzenleyin ve silin.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  href="/blog"
                  target="_blank"
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Blog Sayfasını Aç</span>
                </Link>

                <button
                  onClick={() => {
                    setIsAddBlogModalOpen(true);
                    setBlogError('');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:opacity-95 text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg shadow-[#d4af37]/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Makale Yaz</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {['all', 'Mali Müşavirlik', 'Devlet Teşvikleri', 'Yönetim Muhasebesi', 'KOSGEB', 'Vergi Mevzuatı'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setBlogCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    blogCategoryFilter === cat
                      ? 'bg-[#d4af37] text-black font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'Tüm Kategoriler' : cat}
                </button>
              ))}
            </div>

            {/* Blog Post Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBlogPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-5 rounded-2xl bg-[#040a1a] border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-slate-400">{post.date}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-slate-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-xs text-[#d4af37] hover:underline flex items-center space-x-1"
                    >
                      <span>Görüntüle</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <button
                      onClick={() => handleDeleteBlogPost(post.id, post.title)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                      title="Makaleyi Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: HİBE & TEŞVİK DANIŞMANLIK YÖNETİMİ
          ===================================================================== */}
      {activeTab === 'incentives' && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Award className="w-5 h-5 text-[#d4af37]" />
                  <span>2026 Hibe &amp; Teşvik Destek Programları</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sanayi ve Teknoloji Bakanlığı, KOSGEB, TÜBİTAK ve Ticaret Bakanlığı güncel 2026 destek programlarını yönetin.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  href="/danismanlik"
                  target="_blank"
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Teşvik Sayfasını Gör</span>
                </Link>

                <button
                  onClick={() => {
                    setIsAddIncentiveModalOpen(true);
                    setIncError('');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:opacity-95 text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg shadow-[#d4af37]/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Teşvik Ekle</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {incentives.map((prog) => (
                <div
                  key={prog.id}
                  className="p-5 rounded-2xl bg-[#040a1a] border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold">
                        {prog.category}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                        {prog.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">{prog.institution}</span>
                      <h3 className="text-base font-bold text-white mt-0.5">{prog.name}</h3>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{prog.description}</p>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Destek Limiti:</span>
                        <span className="font-bold text-[#faecc0]">{prog.supportLimit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Destek Oranı:</span>
                        <span className="font-semibold text-emerald-400">{prog.supportRate}</span>
                      </div>
                    </div>

                    {prog.requirements && prog.requirements.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Kritik Başvuru Şartları:</span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {prog.requirements.map((req, i) => (
                            <li key={i} className="flex items-center space-x-1.5">
                              <Check className="w-3 h-3 text-[#d4af37] shrink-0" />
                              <span className="truncate">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-500">{prog.year} Yılı Mevzuatına Uygun</span>
                    <button
                      onClick={() => handleDeleteIncentive(prog.id, prog.name)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                      title="Teşviki Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB: GOOGLE CALENDAR & RANDEVULAR
          ===================================================================== */}
      {activeTab === 'appointments' && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-[#07173e] border border-blue-500/30 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span>Google Calendar &amp; Alınan Randevular ({appointments.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Web sitesinden alınan randevular Google Calendar hesabına (<strong>rotaydmm@gmail.com</strong>) ve <strong>info@rotayd.com</strong> bildirim merkezine iletilir.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href="https://calendar.google.com/calendar/u/0/r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-blue-900/30 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Google Takvimi Aç</span>
                </a>
              </div>
            </div>

            {/* Bilgi Kutusu & Canlı Takvim Senkronizasyonu */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#040a1a] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Google Calendar Hesabı</span>
                <p className="text-sm font-bold text-blue-300 font-mono">rotaydmm@gmail.com</p>
                <p className="text-[11px] text-slate-400">Takvim etkinlikleri bu hesapta toplanır.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#040a1a] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Bildirim E-postası</span>
                <p className="text-sm font-bold text-emerald-300 font-mono">info@rotayd.com</p>
                <p className="text-[11px] text-slate-400">Yeni randevu anında e-posta daveti düşer.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#040a1a] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Toplam Randevu</span>
                <p className="text-sm font-bold text-[#faecc0] font-mono">{appointments.length} Randevu Kaydı</p>
                <p className="text-[11px] text-slate-400">Web sitesi üzerinden oluşturulan tüm talepler.</p>
              </div>
            </div>

            {/* Google Calendar Canlı Abone Olma & Uygulama Şifresi Kartı */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/20 border border-blue-500/30 mb-6 text-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span className="font-bold text-white text-sm">Google Calendar Otomatik Senkronizasyon (Canlı Besleme)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Google Calendar&apos;da <strong>Diğer takvimler (+) → URL&apos;den ekle</strong> alanına aşağıdaki adresi yapıştırarak tüm randevuların <strong>rotaydmm@gmail.com</strong> takvimine otomatik düşmesini sağlayabilirsiniz:
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href="https://calendar.google.com/calendar/r?cid=https%3A%2F%2Frotayd.com%2Fapi%2Fcalendar.ics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-lg shadow-blue-900/40"
                    title="Google Calendar'da 1-Tıkla Abone Olma Penceresini Açar"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>1-Tıkla Google Takvime Ekle</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      const feedUrl = `${window.location.origin}/api/calendar.ics`;
                      navigator.clipboard.writeText(feedUrl);
                      alert(`Canlı Takvim URL'si panoya kopyalandı:\n${feedUrl}\n\nGoogle Takvim > Diğer takvimler (+) > URL'den ekle alanına yapıştırabilirsiniz.`);
                    }}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center space-x-1.5 border border-white/15 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>URL Kopyala</span>
                  </button>
                  <a
                    href="https://calendar.google.com/calendar/u/0/r/settings/addbyurl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-xs flex items-center space-x-1.5 border border-white/10 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Manuel Ekleme Sayfası</span>
                  </a>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                <code className="text-blue-300 font-mono text-[11px] truncate">
                  /api/appointments/calendar.ics
                </code>
                <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  iCalendar RFC-5545
                </span>
              </div>
            </div>

            {/* Randevu Tablosu */}
            {appointments.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-[#040a1a]">
                <Calendar className="w-10 h-10 mx-auto text-slate-500 mb-2" />
                <p className="text-sm text-slate-300 font-medium">Henüz kayıtlı randevu bulunmuyor.</p>
                <p className="text-xs text-slate-500 mt-1">Web sitesindeki randevu formundan gönderilen talepler anında burada listelenecektir.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#040a1a] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Tarih &amp; Saat</th>
                      <th className="py-3 px-4">Danışan &amp; Şirket</th>
                      <th className="py-3 px-4">İletişim</th>
                      <th className="py-3 px-4">Hizmet Konusu</th>
                      <th className="py-3 px-4">Format</th>
                      <th className="py-3 px-4">Durum</th>
                      <th className="py-3 px-4 text-right">Aksiyonlar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {appointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-mono">
                          <span className="font-bold text-white block">{apt.date}</span>
                          <span className="text-[11px] text-[#d4af37]">{apt.timeSlot}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-white text-sm">{apt.name}</p>
                          {apt.company && <p className="text-[11px] text-slate-400">{apt.company}</p>}
                        </td>
                        <td className="py-3.5 px-4 space-y-0.5">
                          <p><a href={`tel:${apt.phone}`} className="text-blue-400 hover:underline">{apt.phone}</a></p>
                          {apt.email && <p className="text-[11px] text-slate-400">{apt.email}</p>}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-200">
                          {apt.service}
                          {apt.notes && (
                            <p className="text-[10px] text-slate-400 italic mt-0.5 max-w-xs truncate" title={apt.notes}>
                              &quot;{apt.notes}&quot;
                            </p>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            apt.format === 'online'
                              ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                              : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {apt.format === 'online' ? '📹 Online Meet' : '🏢 Yüz Yüze'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={apt.status || 'beklemede'}
                            onChange={(e) => handleUpdateAppointmentStatus(apt.id, e.target.value)}
                            className="px-2 py-1 rounded bg-[#040a1a] border border-white/10 text-[11px] font-semibold text-white focus:outline-none"
                          >
                            <option value="beklemede">Beklemede</option>
                            <option value="onaylandi">Onaylandı</option>
                            <option value="tamamlandi">Tamamlandı</option>
                            <option value="iptal">İptal</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                          {(apt.googleCalendarAdminUrl || apt.googleCalendarUrl) && (
                            <a
                              href={apt.googleCalendarAdminUrl || `${apt.googleCalendarUrl}&authuser=rotaydmm@gmail.com`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-all text-xs font-semibold"
                              title="rotaydmm@gmail.com Takvimine 1-Tıkla Ekle"
                            >
                              <Calendar className="w-3.5 h-3.5 text-blue-400" />
                              <span>Takvime Ekle</span>
                              <ExternalLink className="w-3 h-3 opacity-60" />
                            </a>
                          )}
                          <a
                            href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Merhaba ${apt.name}, ROTAYD Danışmanlık randevunuz için iletişime geçiyoruz.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-colors"
                            title="WhatsApp'tan Yaz"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDeleteAppointment(apt.id, apt.name)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                            title="Randevuyu Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 4: MÜKELLEF ONAYLARI
          ===================================================================== */}
      {activeTab === 'pending' && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-[#07173e] border border-[#d4af37]/30 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>Onay Bekleyen Mükellef Başvuruları</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Finansal veri gizliliği gereği sadece onayladığınız mükellefler sisteme fiş/fatura yükleyebilir.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold font-mono">
                  {pendingUsers.length} Bekleyen
                </span>
                <button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:opacity-95 text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Mükellef Yetkilendir</span>
                </button>
              </div>
            </div>

            {pendingUsers.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-[#040a1a]">
                <UserCheck className="w-10 h-10 mx-auto text-emerald-400 mb-2 opacity-80" />
                <p className="text-sm font-bold text-white">Bekleyen Başvuru Bulunmuyor</p>
                <p className="text-xs text-slate-400 mt-1">Giriş yapan tüm mükellefler incelenmiş ve onaylanmıştır.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-4 rounded-2xl bg-[#040a1a] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{user.name}</h4>
                        <p className="text-xs text-slate-400">{user.email}</p>
                        <span className="text-[10px] text-slate-500">
                          Kayıt: {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateUserStatus(user.id, 'approved')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Onayla &amp; Yetki Ver</span>
                      </button>
                      <button
                        onClick={() => handleUpdateUserStatus(user.id, 'rejected')}
                        className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reddet</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 5: FİŞ & FATURA BELGELERİ
          ===================================================================== */}
      {activeTab === 'documents' && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-[#07173e] border border-white/10 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-[#d4af37]" />
                  <span>Mükellef Fiş &amp; Fatura Havuzu</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mükelleflerin yüklediği belgeleri inceleyin, durumlarını güncelleyin ve muhasebe programına aktarmak için ZIP olarak indirin.
                </p>
              </div>

              <button
                onClick={handleDownloadZip}
                disabled={isZipping || documents.length === 0}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isZipping ? 'Paketleniyor...' : 'Tüm Evrakları ZIP İndir'}</span>
              </button>
            </div>

            {/* Document Table / List */}
            {documents.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-[#040a1a]">
                <FileText className="w-10 h-10 mx-auto text-slate-500 mb-2" />
                <p className="text-sm font-semibold text-white">Henüz Yüklenen Belge Yok</p>
                <p className="text-xs text-slate-400 mt-1">Mükellefleriniz sisteme fiş/fatura yüklediğinde burada listelenir.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#040a1a] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Tarih</th>
                      <th className="py-3 px-4">Şirket</th>
                      <th className="py-3 px-4">Belge Türü</th>
                      <th className="py-3 px-4">Belge No</th>
                      <th className="py-3 px-4">Tutar (KDV Dâhil)</th>
                      <th className="py-3 px-4">Durum</th>
                      <th className="py-3 px-4 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {documents.map((doc) => {
                      const fileUrl = doc.fileDataUrl || (doc as any).fileUrl;
                      const company = doc.companyUnvan || (doc as any).sirketUnvani || 'Tanımsız Firma';
                      const tarih = doc.faturaTarihi || (doc as any).tarih || '-';
                      const belgeNo = doc.faturaNo || (doc as any).belgeNo || '-';
                      const tutar = doc.toplamTutar || doc.tutar || 0;
                      return (
                        <tr key={doc.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-mono">{tarih}</td>
                          <td className="py-3.5 px-4 font-semibold text-white">{company}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                              {doc.belgeTuru}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono">{belgeNo}</td>
                          <td className="py-3.5 px-4 font-bold text-[#faecc0] font-mono">
                            ₺{tutar.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={doc.durum}
                              onChange={(e) => handleUpdateDocumentStatus(doc.id, e.target.value as BelgeDurumu)}
                              className="px-2 py-1 rounded bg-[#040a1a] border border-white/10 text-[11px] font-semibold text-white focus:outline-none"
                            >
                              <option value="yuklendi">Yüklendi</option>
                              <option value="incelendi">İncelendi</option>
                              <option value="deftere_islendi">Deftere İşlendi</option>
                              <option value="reddedildi">Reddedildi</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            {fileUrl && (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                                title="Görüntüle"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 6: ŞİRKETLER & TAB 7: LOGLAR
          ===================================================================== */}
      {activeTab === 'companies' && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-[#07173e] border border-white/10 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-[#d4af37]" />
              <span>Kayıtlı Mükellef Şirketleri ({companies.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-[#040a1a] border border-white/10 space-y-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#d4af37]/15 text-[#d4af37] font-bold">
                    {c.sirketTuru}
                  </span>
                  <h3 className="text-sm font-bold text-white">{c.unvan}</h3>
                  <div className="space-y-1 text-xs text-slate-400">
                    <p>VKN/TCKN: <strong className="text-slate-200">{c.vkn}</strong></p>
                    <p>Vergi Dairesi: <strong className="text-slate-200">{c.vergiDairesi}</strong></p>
                    <p className="truncate">Adres: {c.adres}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-[#07173e] border border-white/10 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <span>Güvenlik &amp; İşlem Denetim Kayıtları</span>
            </h2>

            <div className="space-y-2 text-xs">
              {logs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-[#040a1a] border border-white/5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-white">{log.action}</p>
                    <p className="text-[11px] text-slate-400">{log.details}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(log.createdAt || (log as any).timestamp).toLocaleString('tr-TR')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 1: YENİ REFERANS EKLE
          ===================================================================== */}
      {isAddRefModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-[#07173e] border border-[#d4af37]/40 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-[#d4af37]" />
                <span>Yeni Referans Firma Ekle</span>
              </h3>
              <button
                onClick={() => setIsAddRefModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {refError && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                {refError}
              </div>
            )}

            <form onSubmit={handleSaveReference} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Firma / Marka Adı *</label>
                <input
                  type="text"
                  placeholder="Ör: ANADOLU SAVUNMA TEKNOLOJİLERİ"
                  value={newRefName}
                  onChange={(e) => setNewRefName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Faaliyet Alanı / Sektör</label>
                <input
                  type="text"
                  placeholder="Ör: Savunma Sanayi & İmalat Grubu"
                  value={newRefDesc}
                  onChange={(e) => setNewRefDesc(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Logo / Fotoğraf Seçiniz *</label>
                <div className="flex items-center space-x-3">
                  <label className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 cursor-pointer flex items-center space-x-1.5 transition-colors">
                    <Upload className="w-4 h-4 text-[#d4af37]" />
                    <span>Bilgisayardan Logo Yükle (PNG/JPG/WEBP)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {newRefImage && (
                  <div className="mt-3 p-3 rounded-xl bg-[#040a1a] border border-white/10 flex items-center space-x-4">
                    <div className="relative w-28 h-14 bg-white/[0.04] rounded-lg overflow-hidden flex items-center justify-center p-2">
                      <Image
                        src={newRefImage}
                        alt="Önizleme"
                        fill
                        unoptimized
                        className="object-contain filter brightness-0 invert p-1"
                      />
                    </div>
                    <span className="text-[11px] text-emerald-400 font-semibold">Logo başarıyla yüklendi (Vitrindeki filtre önizlemesi)</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddRefModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSavingRef}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:opacity-95 text-black font-bold uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 cursor-pointer disabled:opacity-50"
                >
                  {isSavingRef ? 'Kaydediliyor...' : 'Vitrinde Yayınla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: YENİ BLOG YAZISI
          ===================================================================== */}
      {isAddBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl p-6 rounded-3xl bg-[#07173e] border border-[#d4af37]/40 shadow-2xl relative text-left my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#d4af37]" />
                <span>Yeni Blog &amp; Mevzuat Rehberi Yaz</span>
              </h3>
              <button
                onClick={() => setIsAddBlogModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {blogError && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                {blogError}
              </div>
            )}

            <form onSubmit={handleSaveBlogPost} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Makale Başlığı *</label>
                <input
                  type="text"
                  placeholder="Ör: 2026 Yılında Şirketlerin Yararlanabileceği Yatırım Teşvikleri"
                  value={newBlogTitle}
                  onChange={(e) => setNewBlogTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kategori *</label>
                  <select
                    value={newBlogCategory}
                    onChange={(e) => setNewBlogCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  >
                    <option value="Mali Müşavirlik">Mali Müşavirlik</option>
                    <option value="Devlet Teşvikleri">Devlet Teşvikleri</option>
                    <option value="Yönetim Muhasebesi">Yönetim Muhasebesi</option>
                    <option value="KOSGEB">KOSGEB</option>
                    <option value="Vergi Mevzuatı">Vergi Mevzuatı</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Yazar</label>
                  <input
                    type="text"
                    value={newBlogAuthor}
                    onChange={(e) => setNewBlogAuthor(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Kısa Özet (Excerpt) *</label>
                <textarea
                  rows={2}
                  placeholder="Makalenin anasayfa ve listelerde görünecek çarpıcı 1-2 cümlelik özeti..."
                  value={newBlogExcerpt}
                  onChange={(e) => setNewBlogExcerpt(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">İçerik Paragrafları (Her paragraf için bir alt satıra geçiniz)</label>
                <textarea
                  rows={6}
                  placeholder="Makalenin detaylı içeriğini buraya yazınız..."
                  value={newBlogContent}
                  onChange={(e) => setNewBlogContent(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Etiketler (Virgülle ayırınız)</label>
                <input
                  type="text"
                  placeholder="Vergi, Teşvik, 2026, KOSGEB"
                  value={newBlogTags}
                  onChange={(e) => setNewBlogTags(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddBlogModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSavingBlog}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:opacity-95 text-black font-bold uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 cursor-pointer disabled:opacity-50"
                >
                  {isSavingBlog ? 'Yayınlanıyor...' : 'Makaleyi Yayınla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: YENİ TEŞVİK PROGRAMI
          ===================================================================== */}
      {isAddIncentiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-[#07173e] border border-[#d4af37]/40 shadow-2xl relative text-left my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#d4af37]" />
                <span>Yeni Hibe &amp; Teşvik Programı Ekle</span>
              </h3>
              <button
                onClick={() => setIsAddIncentiveModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {incError && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                {incError}
              </div>
            )}

            <form onSubmit={handleSaveIncentive} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Destek / Teşvik Adı *</label>
                <input
                  type="text"
                  placeholder="Ör: KOSGEB İleri Girişimci Destek Programı"
                  value={newIncName}
                  onChange={(e) => setNewIncName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kurum *</label>
                  <input
                    type="text"
                    placeholder="Ör: KOSGEB / Sanayi Bakanlığı"
                    value={newIncInstitution}
                    onChange={(e) => setNewIncInstitution(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kategori *</label>
                  <select
                    value={newIncCategory}
                    onChange={(e) => setNewIncCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  >
                    <option value="Yatırım Teşvik">Yatırım Teşvik</option>
                    <option value="KOSGEB Hibeleri">KOSGEB Hibeleri</option>
                    <option value="Ar-Ge & Tasarım">Ar-Ge & Tasarım</option>
                    <option value="İhracat Destekleri">İhracat Destekleri</option>
                    <option value="KOBİ & Girişimcilik">KOBİ & Girişimcilik</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Destek Limiti</label>
                  <input
                    type="text"
                    placeholder="Ör: 2.000.000 TL Hibe"
                    value={newIncLimit}
                    onChange={(e) => setNewIncLimit(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Destek Oranı</label>
                  <input
                    type="text"
                    placeholder="Ör: %70 Hibe + Vergi Muafiyeti"
                    value={newIncRate}
                    onChange={(e) => setNewIncRate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Açıklama</label>
                <textarea
                  rows={2}
                  placeholder="Programın amacı ve kimlerin yararlanabileceği..."
                  value={newIncDesc}
                  onChange={(e) => setNewIncDesc(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Başvuru Şartları (Her satıra bir şart)</label>
                <textarea
                  rows={3}
                  placeholder="KOBİ vasfı&#10;İmalat veya yazılım faaliyeti&#10;Son 1 yıl içinde kurulmuş olmak"
                  value={newIncReq}
                  onChange={(e) => setNewIncReq(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddIncentiveModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSavingInc}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] hover:opacity-95 text-black font-bold uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 cursor-pointer disabled:opacity-50"
                >
                  {isSavingInc ? 'Kaydediliyor...' : 'Programa Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: YENİ MÜKELLEF YETKİLENDİRME
          ===================================================================== */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#07173e] border border-[#d4af37]/40 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Yeni Mükellefi Doğrudan Yetkilendir</span>
              </h3>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {addUserError && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                {addUserError}
              </div>
            )}

            <form onSubmit={handleAddDirectUser} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Mükellef Adı &amp; Soyadı *</label>
                <input
                  type="text"
                  placeholder="Ör: Mehmet Özdemir"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">E-Posta Adresi *</label>
                <input
                  type="email"
                  placeholder="ornek@sirketiniz.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#040a1a] border border-white/10 text-white focus:border-[#d4af37] focus:outline-none"
                  required
                />
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
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isAddingUser}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold uppercase tracking-wider shadow-md cursor-pointer disabled:opacity-50"
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
