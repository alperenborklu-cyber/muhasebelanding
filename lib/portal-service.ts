/**
 * Rotayd Mükellef Portalı - Veri & Servis Katmanı
 * Mock & LocalStorage tabanlı tam işlevsel servis (PostgreSQL / Supabase hazır arayüzü ile)
 */

import { PortalUser, TuzelKisi, FaturaBelge, AuditLog, BelgeDurumu } from './portal-types';
import { validateVergiKimlik, createAuditEntry } from './security';

const STORAGE_KEY_USERS = 'rotayd_portal_users_v1';
const STORAGE_KEY_CURRENT_USER = 'rotayd_portal_current_user_v1';
const STORAGE_KEY_COMPANIES = 'rotayd_portal_companies_v1';
const STORAGE_KEY_DOCUMENTS = 'rotayd_portal_documents_v1';
const STORAGE_KEY_LOGS = 'rotayd_portal_audit_logs_v1';

// Başlangıç Mock Verileri (Süleyman İlhan Admin ve Örnek Mükellefler)
const INITIAL_USERS: PortalUser[] = [
  {
    id: 'usr_admin_suleyman',
    name: 'Süleyman İlhan',
    email: 'suleyman@rotayd.com',
    role: 'admin',
    status: 'approved',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=SI&backgroundColor=07173e&textColor=d4af37',
    kvkkConsentAt: '2026-09-01T09:00:00.000Z',
    createdAt: '2026-09-01T09:00:00.000Z'
  },
  {
    id: 'usr_demo_approved',
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@anadolutech.com',
    role: 'user',
    status: 'approved',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=AY&backgroundColor=0d2048&textColor=ffffff',
    kvkkConsentAt: '2026-09-02T10:30:00.000Z',
    createdAt: '2026-09-02T10:30:00.000Z'
  },
  {
    id: 'usr_demo_pending',
    name: 'Zeynep Kaya',
    email: 'zeynep@kayalojistik.com.tr',
    role: 'user',
    status: 'pending',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=ZK&backgroundColor=1d4ed8&textColor=ffffff',
    kvkkConsentAt: '2026-09-04T11:15:00.000Z',
    createdAt: '2026-09-04T11:15:00.000Z'
  }
];

const INITIAL_COMPANIES: TuzelKisi[] = [
  {
    id: 'comp_anadolu_tech',
    userId: 'usr_demo_approved',
    unvan: 'Anadolu Teknoloji ve Yazılım Hizmetleri A.Ş.',
    vkn: '1234567891', // Demo VKN
    vergiDairesi: 'Boğaziçi Kurumlar Vergi Dairesi',
    ticaretSicilNo: '584920-5',
    sirketTuru: 'Anonim Şirket',
    adres: 'Levent Mah. Büyükdere Cad. No:192/4 Beşiktaş / İstanbul',
    telefon: '0212 988 44 20',
    yetkiliKisi: 'Ahmet Yılmaz (Genel Müdür)',
    createdAt: '2026-09-02T11:00:00.000Z'
  }
];

const INITIAL_DOCUMENTS: FaturaBelge[] = [
  {
    id: 'doc_101',
    companyId: 'comp_anadolu_tech',
    companyUnvan: 'Anadolu Teknoloji ve Yazılım Hizmetleri A.Ş.',
    userId: 'usr_demo_approved',
    userEmail: 'ahmet.yilmaz@anadolutech.com',
    fileName: '2026_09_Ofis_Sunucu_Faturasi.pdf',
    fileSize: 342000,
    fileType: 'application/pdf',
    belgeTuru: 'e-fatura',
    kategori: 'danismanlik_hizmet',
    faturaTarihi: '2026-09-01',
    faturaNo: 'GIB202600001429',
    tutar: 45000,
    kdvOrani: 20,
    kdvTutari: 9000,
    toplamTutar: 54000,
    durum: 'deftere_islendi',
    notlar: 'Ağustos ayı bulut sunucu ve veri merkezi hizmet bedeli.',
    createdAt: '2026-09-02T12:00:00.000Z'
  },
  {
    id: 'doc_102',
    companyId: 'comp_anadolu_tech',
    companyUnvan: 'Anadolu Teknoloji ve Yazılım Hizmetleri A.Ş.',
    userId: 'usr_demo_approved',
    userEmail: 'ahmet.yilmaz@anadolutech.com',
    fileName: 'Akaryakit_Fisi_03092026.jpg',
    fileSize: 184500,
    fileType: 'image/jpeg',
    belgeTuru: 'fis',
    kategori: 'akaryakit',
    faturaTarihi: '2026-09-03',
    faturaNo: 'OPET_08492',
    tutar: 2150,
    kdvOrani: 20,
    kdvTutari: 430,
    toplamTutar: 2580,
    durum: 'incelendi',
    notlar: 'Saha müşteri ziyareti araç yakıt gideri.',
    createdAt: '2026-09-03T16:30:00.000Z'
  }
];

const INITIAL_LOGS: AuditLog[] = [
  createAuditEntry('SİSTEM_BAŞLATILDI', 'Güvenlik katmanı ve KVKK protokolü aktif edildi.', 'system')
];

// Güvenli LocalStorage Yardımcıları
function getStored<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setStored<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

export const PortalService = {
  // Verileri başlat
  init() {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEY_USERS)) {
      setStored(STORAGE_KEY_USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEY_COMPANIES)) {
      setStored(STORAGE_KEY_COMPANIES, INITIAL_COMPANIES);
    }
    if (!localStorage.getItem(STORAGE_KEY_DOCUMENTS)) {
      setStored(STORAGE_KEY_DOCUMENTS, INITIAL_DOCUMENTS);
    }
    if (!localStorage.getItem(STORAGE_KEY_LOGS)) {
      setStored(STORAGE_KEY_LOGS, INITIAL_LOGS);
    }
  },

  // Mevcut Oturumu Getir
  getCurrentUser(): PortalUser | null {
    return getStored<PortalUser | null>(STORAGE_KEY_CURRENT_USER, null);
  },

  // Google ile Giriş Simülasyonu / Entegrasyonu
  loginWithGoogle(email: string, name: string, image?: string): PortalUser {
    this.init();
    const users = getStored<PortalUser[]>(STORAGE_KEY_USERS, INITIAL_USERS);
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    const isAdmin = email.toLowerCase() === 'suleyman@rotayd.com' || email.toLowerCase().includes('admin');

    if (existing) {
      setStored(STORAGE_KEY_CURRENT_USER, existing);
      this.addAuditLog('KULLANICI_GİRİŞİ', `Google OAuth ile giriş yapıldı: ${email}`, existing.id, existing.email);
      return existing;
    }

    // Yeni kullanıcı kaydı
    const newUser: PortalUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name,
      email,
      image: image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=07173e&textColor=d4af37`,
      role: isAdmin ? 'admin' : 'user',
      // Admin direkt approved, normal kullanıcı pending approval!
      status: isAdmin ? 'approved' : 'pending',
      kvkkConsentAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const updated = [...users, newUser];
    setStored(STORAGE_KEY_USERS, updated);
    setStored(STORAGE_KEY_CURRENT_USER, newUser);

    this.addAuditLog(
      'YENİ_KULLANICI_KAYDI',
      `Google hesabı ile yeni kayıt açıldı (${newUser.status === 'pending' ? 'Admin Onayı Bekliyor' : 'Onaylı Admin'}): ${email}`,
      newUser.id,
      newUser.email
    );

    return newUser;
  },

  // Çıkış Yap
  logout() {
    const user = this.getCurrentUser();
    if (user) {
      this.addAuditLog('OTURUM_KAPATILDI', `Kullanıcı oturumu sonlandırdı: ${user.email}`, user.id, user.email);
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    }
  },

  // Tüm Kullanıcılar (Admin İçin)
  getAllUsers(): PortalUser[] {
    this.init();
    return getStored<PortalUser[]>(STORAGE_KEY_USERS, INITIAL_USERS);
  },

  // Kullanıcı Durumu Güncelle (Admin Onay / Red)
  updateUserStatus(userId: string, newStatus: 'approved' | 'rejected'): boolean {
    const users = getStored<PortalUser[]>(STORAGE_KEY_USERS, INITIAL_USERS);
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) return false;

    users[index].status = newStatus;
    users[index].updatedAt = new Date().toISOString();
    setStored(STORAGE_KEY_USERS, users);

    // Eğer şu an açık olan oturum bu kullanıcıysa onu da güncelle
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      currentUser.status = newStatus;
      setStored(STORAGE_KEY_CURRENT_USER, currentUser);
    }

    this.addAuditLog(
      'KULLANICI_DURUM_DEĞİŞİKLİĞİ',
      `Mali Müşavir kullanıcı durumunu güncelledi: ${users[index].email} -> ${newStatus.toUpperCase()}`,
      userId,
      users[index].email
    );

    return true;
  },

  // ==========================================================================
  // TÜZEL KİŞİLİK (ŞİRKET) İŞLEMLERİ
  // ==========================================================================
  getCompanies(userId?: string): TuzelKisi[] {
    this.init();
    const companies = getStored<TuzelKisi[]>(STORAGE_KEY_COMPANIES, INITIAL_COMPANIES);
    if (!userId) return companies;
    return companies.filter((c) => c.userId === userId);
  },

  createCompany(companyData: Omit<TuzelKisi, 'id' | 'createdAt'>): { success: boolean; error?: string; company?: TuzelKisi } {
    // VKN / TCKN Doğrulama
    const vknCheck = validateVergiKimlik(companyData.vkn);
    if (!vknCheck.isValid) {
      return {
        success: false,
        error: vknCheck.message
      };
    }

    const companies = getStored<TuzelKisi[]>(STORAGE_KEY_COMPANIES, INITIAL_COMPANIES);

    // Aynı VKN ile mükerrer kayıt kontrolü
    const exists = companies.find((c) => c.vkn === companyData.vkn.trim());
    if (exists) {
      return {
        success: false,
        error: `Bu Vergi/TC Kimlik Numarası (${companyData.vkn}) ile sistemde kayıtlı bir tüzel kişi zaten mevcut.`
      };
    }

    const newCompany: TuzelKisi = {
      ...companyData,
      id: `comp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      vkn: companyData.vkn.trim(),
      createdAt: new Date().toISOString()
    };

    const updated = [...companies, newCompany];
    setStored(STORAGE_KEY_COMPANIES, updated);

    this.addAuditLog(
      'TÜZEL_KİŞİLİK_OLUŞTURULDU',
      `Yeni şirket profili oluşturuldu: ${newCompany.unvan} (VKN: ${newCompany.vkn})`,
      newCompany.userId
    );

    return { success: true, company: newCompany };
  },

  deleteCompany(companyId: string): boolean {
    const companies = getStored<TuzelKisi[]>(STORAGE_KEY_COMPANIES, INITIAL_COMPANIES);
    const filtered = companies.filter((c) => c.id !== companyId);
    setStored(STORAGE_KEY_COMPANIES, filtered);

    // Şirkete ait faturaları da temizle
    const docs = getStored<FaturaBelge[]>(STORAGE_KEY_DOCUMENTS, INITIAL_DOCUMENTS);
    const remainingDocs = docs.filter((d) => d.companyId !== companyId);
    setStored(STORAGE_KEY_DOCUMENTS, remainingDocs);

    this.addAuditLog('ŞİRKET_SİLİNDİ', `Tüzel kişi kimliği sistemden silindi (ID: ${companyId})`);
    return true;
  },

  // ==========================================================================
  // FİŞ / FATURA BELGE YÖNETİMİ
  // ==========================================================================
  getDocuments(userId?: string, companyId?: string): FaturaBelge[] {
    this.init();
    const docs = getStored<FaturaBelge[]>(STORAGE_KEY_DOCUMENTS, INITIAL_DOCUMENTS);
    let result = docs;
    if (companyId) {
      result = result.filter((d) => d.companyId === companyId);
    } else if (userId) {
      result = result.filter((d) => d.userId === userId);
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  uploadDocument(docData: Omit<FaturaBelge, 'id' | 'createdAt'>): FaturaBelge {
    const docs = getStored<FaturaBelge[]>(STORAGE_KEY_DOCUMENTS, INITIAL_DOCUMENTS);

    const newDoc: FaturaBelge = {
      ...docData,
      id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString()
    };

    const updated = [newDoc, ...docs];
    setStored(STORAGE_KEY_DOCUMENTS, updated);

    this.addAuditLog(
      'FATURA_YÜKLENDİ',
      `Yeni belge yüklendi: ${newDoc.fileName} (${newDoc.belgeTuru.toUpperCase()}, Tutar: ₺${newDoc.toplamTutar})`,
      newDoc.userId,
      newDoc.userEmail
    );

    return newDoc;
  },

  updateDocumentStatus(docId: string, newStatus: BelgeDurumu): boolean {
    const docs = getStored<FaturaBelge[]>(STORAGE_KEY_DOCUMENTS, INITIAL_DOCUMENTS);
    const index = docs.findIndex((d) => d.id === docId);
    if (index === -1) return false;

    docs[index].durum = newStatus;
    setStored(STORAGE_KEY_DOCUMENTS, docs);

    this.addAuditLog(
      'FATURA_DURUM_GÜNCELLENDİ',
      `Belge durumu değiştirildi: ${docs[index].fileName} -> ${newStatus.toUpperCase()}`
    );

    return true;
  },

  deleteDocument(docId: string): boolean {
    const docs = getStored<FaturaBelge[]>(STORAGE_KEY_DOCUMENTS, INITIAL_DOCUMENTS);
    const doc = docs.find((d) => d.id === docId);
    const filtered = docs.filter((d) => d.id !== docId);
    setStored(STORAGE_KEY_DOCUMENTS, filtered);

    if (doc) {
      this.addAuditLog('BELGE_SİLİNDİ', `Belge sistemden silindi: ${doc.fileName}`);
    }

    return true;
  },

  // ==========================================================================
  // AUDIT LOGS
  // ==========================================================================
  getAuditLogs(): AuditLog[] {
    this.init();
    const logs = getStored<AuditLog[]>(STORAGE_KEY_LOGS, INITIAL_LOGS);
    return logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addAuditLog(action: string, details: string, userId?: string, userEmail?: string) {
    const logs = getStored<AuditLog[]>(STORAGE_KEY_LOGS, INITIAL_LOGS);
    const entry = createAuditEntry(action, details, userEmail, userId);
    const updated = [entry, ...logs].slice(0, 200); // Son 200 log
    setStored(STORAGE_KEY_LOGS, updated);
  }
};
