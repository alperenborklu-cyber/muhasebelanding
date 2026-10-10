import fs from 'fs';
import path from 'path';
import { PortalUser, TuzelKisi, FaturaBelge, AuditLog, BelgeDurumu, UserRole, UserStatus } from './portal-types';
import { validateVergiKimlik, createAuditEntry } from './security';

interface PortalDataStore {
  users: PortalUser[];
  companies: TuzelKisi[];
  documents: FaturaBelge[];
  logs: AuditLog[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'portal-data.json');

// İlk başlangıç tohum verileri
const INITIAL_DATA: PortalDataStore = {
  users: [
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
  ],
  companies: [
    {
      id: 'comp_anadolu_tech',
      userId: 'usr_demo_approved',
      unvan: 'Anadolu Teknoloji ve Yazılım Hizmetleri A.Ş.',
      vkn: '1234567891',
      vergiDairesi: 'Boğaziçi Kurumlar Vergi Dairesi',
      ticaretSicilNo: '584920-5',
      sirketTuru: 'Anonim Şirket',
      adres: 'Levent Mah. Büyükdere Cad. No:192/4 Beşiktaş / İstanbul',
      telefon: '0212 988 44 20',
      yetkiliKisi: 'Ahmet Yılmaz (Genel Müdür)',
      createdAt: '2026-09-02T11:00:00.000Z'
    }
  ],
  documents: [
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
  ],
  logs: [
    createAuditEntry('SİSTEM_BAŞLATILDI', 'Sunucu güvenlik ve yetkilendirme katmanı hazırlandı.', 'system')
  ]
};

function getAdminEmails(): string[] {
  const envAdmins = process.env.ADMIN_EMAILS || '';
  const list = envAdmins.split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
  if (!list.includes('suleyman@rotayd.com')) {
    list.push('suleyman@rotayd.com');
  }
  return list;
}

export const ServerDb = {
  ensureStorage(): PortalDataStore {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
        return INITIAL_DATA;
      }
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw) as PortalDataStore;
    } catch (err) {
      console.error('ServerDb read error:', err);
      return INITIAL_DATA;
    }
  },

  saveData(data: PortalDataStore): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const tempPath = `${DATA_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempPath, DATA_FILE);
    } catch (err) {
      console.error('ServerDb save error:', err);
    }
  },

  // Kullanıcı Sorgulama
  getUserByEmail(email: string): PortalUser | null {
    const data = this.ensureStorage();
    const cleanEmail = email.trim().toLowerCase();
    return data.users.find(u => u.email.toLowerCase() === cleanEmail) || null;
  },

  getUserById(id: string): PortalUser | null {
    const data = this.ensureStorage();
    return data.users.find(u => u.id === id) || null;
  },

  getAllUsers(): PortalUser[] {
    const data = this.ensureStorage();
    return data.users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  // Mükellef Girişi / Kaydı (Google bağımsız doğrudan kayıt ve giriş)
  registerOrLoginUser(profile: { name: string; email: string; phone?: string; image?: string | null }): PortalUser {
    const data = this.ensureStorage();
    const cleanEmail = profile.email.trim().toLowerCase();
    const existing = data.users.find(u => u.email.toLowerCase() === cleanEmail);

    const adminEmails = getAdminEmails();
    const isSystemAdmin = adminEmails.includes(cleanEmail);

    if (existing) {
      if (isSystemAdmin && (existing.role !== 'admin' || existing.status !== 'approved')) {
        existing.role = 'admin';
        existing.status = 'approved';
        existing.updatedAt = new Date().toISOString();
        this.saveData(data);
      }
      this.addAuditLog('KULLANICI_GİRİŞİ', `Mükellef girişi yapıldı: ${cleanEmail}`, existing.id, existing.email);
      return existing;
    }

    // YENİ KULLANICI:
    // Admin e-postası ise otomatik 'approved' & 'admin', diğerleri ise KESİNLİKLE 'pending' (onay bekliyor)!
    const role: UserRole = isSystemAdmin ? 'admin' : 'user';
    const status: UserStatus = isSystemAdmin ? 'approved' : 'pending';

    const newUser: PortalUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: profile.name || 'Mükellef',
      email: cleanEmail,
      image: profile.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name || 'M')}&backgroundColor=07173e&textColor=d4af37`,
      role,
      status,
      kvkkConsentAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    data.users.push(newUser);
    this.saveData(data);

    this.addAuditLog(
      'YENİ_MÜKELLEF_BAŞVURUSU',
      `Yeni mükellef başvurusu kaydedildi (${newUser.status === 'pending' ? 'Mali Müşavir Onayı Bekliyor' : 'Doğrulanmış Admin'}): ${cleanEmail}`,
      newUser.id,
      newUser.email
    );

    return newUser;
  },

  // Admin Tarafından Doğrudan Ön Onaylı Mükellef Ekleme
  createPreApprovedUser(params: { name: string; email: string; phone?: string }): { success: boolean; error?: string; user?: PortalUser } {
    const data = this.ensureStorage();
    const cleanEmail = params.email.trim().toLowerCase();
    const existing = data.users.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      existing.status = 'approved';
      existing.updatedAt = new Date().toISOString();
      this.saveData(data);
      return { success: true, user: existing };
    }

    const newUser: PortalUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: params.name || 'Mükellef',
      email: cleanEmail,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(params.name || 'M')}&backgroundColor=07173e&textColor=d4af37`,
      role: 'user',
      status: 'approved', // Admin tarafından doğrudan onaylı oluşturuldu!
      kvkkConsentAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    data.users.push(newUser);
    this.saveData(data);

    this.addAuditLog(
      'MÜKELLEF_ÖN_ONAY_TANIMLANDI',
      `Mali Müşavir yeni onaylı mükellef tanımladı: ${cleanEmail} (${params.name})`,
      newUser.id,
      newUser.email
    );

    return { success: true, user: newUser };
  },

  // VKN & TCKN ile Mükellef Girişi (Şifre = VKN)
  loginWithVkn(params: { vkn: string; password?: string; unvan?: string }): { success: boolean; error?: string; user?: PortalUser } {
    const data = this.ensureStorage();
    const cleanVkn = params.vkn.trim();
    const password = (params.password?.trim()) || cleanVkn;

    if (!cleanVkn || cleanVkn.length < 10) {
      return { success: false, error: 'Lütfen geçerli 10 haneli VKN veya 11 haneli TCKN giriniz.' };
    }

    if (password !== cleanVkn) {
      return { success: false, error: 'Şifreniz Vergi Numaranız (VKN/TCKN) ile aynı olmalıdır.' };
    }

    // Bu VKN'ye sahip kayıtlı bir şirket var mı kontrol et
    const matchedCompany = data.companies.find(c => c.vkn === cleanVkn);
    const vknEmail = `vkn_${cleanVkn}@mukellef.rotayd.com`;

    let user: PortalUser | null = null;
    if (matchedCompany) {
      user = data.users.find(u => u.id === matchedCompany.userId) || null;
    }

    if (!user) {
      user = data.users.find(u => u.email.toLowerCase() === vknEmail.toLowerCase()) || null;
    }

    if (!user) {
      // Yeni kullanıcı oluştur
      const unvan = params.unvan?.trim() || (cleanVkn.length === 11 ? 'Mükellef ' + cleanVkn : 'Firma ' + cleanVkn);
      user = {
        id: `usr_vkn_${cleanVkn}`,
        name: unvan,
        email: vknEmail,
        role: 'user',
        status: 'approved', // VKN ile doğrudan erişim
        image: `https://api.dicebear.com/7.x/initials/svg?seed=${cleanVkn}&backgroundColor=07173e&textColor=d4af37`,
        kvkkConsentAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      data.users.push(user);

      // Şirket kaydı da ekle
      if (!matchedCompany) {
        const newComp: TuzelKisi = {
          id: `comp_${cleanVkn}`,
          userId: user.id,
          unvan: unvan,
          vkn: cleanVkn,
          vergiDairesi: 'Çankaya Vergi Dairesi',
          sirketTuru: cleanVkn.length === 11 ? 'Şahıs Şirketi' : 'Limited Şirket',
          adres: 'Ankara',
          telefon: '0553 622 11 22',
          yetkiliKisi: unvan,
          createdAt: new Date().toISOString()
        };
        data.companies.push(newComp);
      }
      this.saveData(data);
    }

    this.addAuditLog('VKN_GİRİŞİ', `Mükellef VKN ile giriş yaptı: ${cleanVkn}`, user.id, user.email);
    return { success: true, user };
  },

  upsertGoogleUser(profile: { name: string; email: string; image?: string | null }): PortalUser {
    return this.registerOrLoginUser(profile);
  },

  // Kullanıcı Durumu Güncelle (Admin Onay / Red)
  updateUserStatus(userId: string, newStatus: UserStatus): PortalUser | null {
    const data = this.ensureStorage();
    const index = data.users.findIndex(u => u.id === userId);
    if (index === -1) return null;

    data.users[index].status = newStatus;
    data.users[index].updatedAt = new Date().toISOString();
    this.saveData(data);

    this.addAuditLog(
      'KULLANICI_DURUM_GÜNCELLENDİ',
      `Mali Müşavir mükellef onay durumunu değiştirdi: ${data.users[index].email} -> ${newStatus.toUpperCase()}`,
      userId,
      data.users[index].email
    );

    return data.users[index];
  },

  // Tüzel Kişilik (Şirket) İşlemleri
  getCompanies(userId?: string): TuzelKisi[] {
    const data = this.ensureStorage();
    if (!userId) return data.companies;
    return data.companies.filter(c => c.userId === userId);
  },

  createCompany(companyData: Omit<TuzelKisi, 'id' | 'createdAt'>): { success: boolean; error?: string; company?: TuzelKisi } {
    const vknCheck = validateVergiKimlik(companyData.vkn);
    if (!vknCheck.isValid) {
      return { success: false, error: vknCheck.message };
    }

    const data = this.ensureStorage();
    const exists = data.companies.find(c => c.vkn === companyData.vkn.trim());
    if (exists) {
      return {
        success: false,
        error: `Bu Vergi / TC Kimlik Numarası (${companyData.vkn}) ile kayıtlı bir şirket zaten sistemde mevcut.`
      };
    }

    const newComp: TuzelKisi = {
      ...companyData,
      id: `comp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      vkn: companyData.vkn.trim(),
      createdAt: new Date().toISOString()
    };

    data.companies.push(newComp);
    this.saveData(data);

    this.addAuditLog('TÜZEL_KİŞİLİK_OLUŞTURULDU', `Yeni mükellef şirketi tanımlandı: ${newComp.unvan} (VKN: ${newComp.vkn})`, newComp.userId);
    return { success: true, company: newComp };
  },

  deleteCompany(companyId: string): boolean {
    const data = this.ensureStorage();
    data.companies = data.companies.filter(c => c.id !== companyId);
    data.documents = data.documents.filter(d => d.companyId !== companyId);
    this.saveData(data);
    this.addAuditLog('ŞİRKET_SİLİNDİ', `Tüzel kişilik ve evrakları sistemden silindi (ID: ${companyId})`);
    return true;
  },

  // Fiş / Fatura Belge Yönetimi
  getDocuments(userId?: string, companyId?: string): FaturaBelge[] {
    const data = this.ensureStorage();
    let res = data.documents;
    if (companyId) {
      res = res.filter(d => d.companyId === companyId);
    } else if (userId) {
      res = res.filter(d => d.userId === userId);
    }
    return res.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  uploadDocument(docData: Omit<FaturaBelge, 'id' | 'createdAt'>): FaturaBelge {
    const data = this.ensureStorage();
    const newDoc: FaturaBelge = {
      ...docData,
      id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString()
    };

    data.documents.unshift(newDoc);
    this.saveData(data);

    this.addAuditLog(
      'FATURA_YÜKLENDİ',
      `Belge arşive kaydedildi: ${newDoc.fileName} (${newDoc.belgeTuru}, Toplam: ₺${newDoc.toplamTutar})`,
      newDoc.userId,
      newDoc.userEmail
    );

    return newDoc;
  },

  updateDocumentStatus(docId: string, status: BelgeDurumu): boolean {
    const data = this.ensureStorage();
    const doc = data.documents.find(d => d.id === docId);
    if (!doc) return false;

    doc.durum = status;
    this.saveData(data);

    this.addAuditLog('FATURA_DURUM_GÜNCELLENDİ', `Belge durumu güncellendi: ${doc.fileName} -> ${status.toUpperCase()}`);
    return true;
  },

  deleteDocument(docId: string): boolean {
    const data = this.ensureStorage();
    const doc = data.documents.find(d => d.id === docId);
    if (!doc) return false;

    data.documents = data.documents.filter(d => d.id !== docId);
    this.saveData(data);
    this.addAuditLog('BELGE_SİLİNDİ', `Belge sistemden silindi: ${doc.fileName}`);
    return true;
  },

  // Güvenlik & Denetim Logları
  getAuditLogs(): AuditLog[] {
    const data = this.ensureStorage();
    return data.logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addAuditLog(action: string, details: string, userId?: string, userEmail?: string): void {
    const data = this.ensureStorage();
    const entry = createAuditEntry(action, details, userEmail, userId);
    data.logs.unshift(entry);
    if (data.logs.length > 300) {
      data.logs = data.logs.slice(0, 300);
    }
    this.saveData(data);
  }
};
