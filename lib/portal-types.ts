export type UserRole = 'admin' | 'user';
export type UserStatus = 'pending' | 'approved' | 'rejected';

export interface PortalUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  status: UserStatus;
  kvkkConsentAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export type SirketTuru = 
  | 'Limited Şirket'
  | 'Anonim Şirket'
  | 'Şahıs Şirketi'
  | 'Kollektif Şirket'
  | 'Komandit Şirket'
  | 'Kooperatif'
  | 'Diğer';

export interface TuzelKisi {
  id: string;
  userId: string;
  unvan: string;
  vkn: string; // 10 haneli VKN veya 11 haneli TCKN
  vergiDairesi: string;
  ticaretSicilNo?: string;
  sirketTuru: SirketTuru;
  adres: string;
  telefon: string;
  yetkiliKisi: string;
  createdAt: string;
  updatedAt?: string;
}

export type BelgeTuru = 
  | 'e-fatura'
  | 'e-arsiv'
  | 'fis'
  | 'smm' // Serbest Meslek Makbuzu
  | 'gider_pusulasi'
  | 'diger';

export type HarcamaKategorisi = 
  | 'genel_gider'
  | 'akaryakit'
  | 'yemek_temsil'
  | 'kira'
  | 'demirbas'
  | 'mal_alisi'
  | 'danismanlik_hizmet'
  | 'kirtasiye_ofis'
  | 'diger';

export type BelgeDurumu = 
  | 'yuklendi'
  | 'incelendi'
  | 'deftere_islendi'
  | 'reddedildi';

export interface FaturaBelge {
  id: string;
  companyId: string;
  companyUnvan?: string;
  userId: string;
  userEmail?: string;
  fileName: string;
  fileSize: number; // bytes
  fileType: string; // mime
  fileDataUrl?: string; // base64 or preview url
  belgeTuru: BelgeTuru;
  kategori: HarcamaKategorisi;
  faturaTarihi: string;
  faturaNo: string;
  tutar: number; // Matrah
  kdvOrani: number; // %0, %1, %10, %20
  kdvTutari: number;
  toplamTutar: number;
  durum: BelgeDurumu;
  notlar?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  userEmail?: string;
  action: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}
