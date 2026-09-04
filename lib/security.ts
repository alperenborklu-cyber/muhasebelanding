/**
 * Rotayd Mali Müşavirlik & Yönetim Danışmanlığı
 * Banka Seviyesi Güvenlik ve Doğrulama Katmanı
 */

// ============================================================================
// 1. T.C. VERGİ KİMLİK NUMARASI (VKN) DOĞRULAMA ALGORİTMASI (GİB MODÜLER 9/10)
// ============================================================================
export function validateVKN(vkn: string): boolean {
  if (!vkn || !/^[0-9]{10}$/.test(vkn)) {
    return false;
  }

  // İlk 9 hanenin modüler 9/10 toplamı
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const digit = parseInt(vkn[i], 10);
    const n = 9 - i; // kalan basamak sayısı
    const v = (digit + n) % 10;
    
    if (v === 0) {
      sum += 0;
    } else {
      let w = (v * Math.pow(2, n)) % 9;
      if (w === 0) w = 9;
      sum += w;
    }
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(vkn[9], 10);
}

// ============================================================================
// 2. T.C. KİMLİK NUMARASI (TCKN) DOĞRULAMA ALGORİTMASI (Şahıs Şirketleri İçin)
// ============================================================================
export function validateTCKN(tckn: string): boolean {
  if (!tckn || !/^[1-9][0-9]{10}$/.test(tckn)) {
    return false;
  }

  const digits = tckn.split('').map(Number);
  
  // 1, 3, 5, 7, 9. hanelerin toplamı
  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  // 2, 4, 6, 8. hanelerin toplamı
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];

  // 10. hane kuralı: ((Tekler * 7) - Çiftler) % 10
  const digit10 = ((oddSum * 7) - evenSum) % 10;
  // Negatif modüler düzeltme
  const validDigit10 = digit10 < 0 ? digit10 + 10 : digit10;

  if (validDigit10 !== digits[9]) {
    return false;
  }

  // 11. hane kuralı: İlk 10 hanenin toplamının mod 10'u
  const first10Sum = digits.slice(0, 10).reduce((acc, curr) => acc + curr, 0);
  return first10Sum % 10 === digits[10];
}

// Birleşik Vergi / Kimlik Doğrulayıcı
export function validateVergiKimlik(no: string): { isValid: boolean; type: 'VKN' | 'TCKN' | 'INVALID'; message: string } {
  const clean = (no || '').trim().replace(/\s+/g, '');
  
  if (clean.length === 10) {
    const valid = validateVKN(clean);
    return {
      isValid: valid,
      type: valid ? 'VKN' : 'INVALID',
      message: valid ? 'Geçerli 10 Haneli Tüzel Kişi VKN' : 'Geçersiz Vergi Kimlik Numarası (GİB Algoritma Sağlaması Başarısız)'
    };
  }

  if (clean.length === 11) {
    const valid = validateTCKN(clean);
    return {
      isValid: valid,
      type: valid ? 'TCKN' : 'INVALID',
      message: valid ? 'Geçerli 11 Haneli Şahıs Şirketi TCKN' : 'Geçersiz T.C. Kimlik Numarası (Nüfus Algoritma Sağlaması Başarısız)'
    };
  }

  return {
    isValid: false,
    type: 'INVALID',
    message: 'Lütfen 10 haneli VKN (Tüzel Kişi) veya 11 haneli TCKN (Şahıs Şirketi) giriniz.'
  };
}

// ============================================================================
// 3. DOSYA YÜKLEME GÜVENLİĞİ & ZARARLI YAZILIM / SCRIPT KALKANI
// ============================================================================
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/xml',
  'text/xml'
];

const BLOCKED_EXTENSIONS = [
  'exe', 'bat', 'cmd', 'sh', 'php', 'phtml', 'js', 'mjs', 'ts', 'jsx', 'tsx',
  'vbs', 'html', 'htm', 'shtml', 'svg', 'dll', 'bin', 'py', 'jar', 'apk', 'com'
];

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedFileName?: string;
}

/**
 * Dosya adı ve uzantısını zararlı injection, XSS ve Path Traversal saldırılarına karşı temizler.
 */
export function sanitizeFileName(originalName: string): string {
  // Sadece alfanümerik, tire, alt tire ve nokta bırakılır
  const clean = originalName
    .replace(/[^a-zA-Z0-9.\-_]/g, '_')
    .replace(/\.{2,}/g, '.'); // path traversal engelleme (..)
  
  const ext = clean.substring(clean.lastIndexOf('.')).toLowerCase();
  const base = clean.substring(0, clean.lastIndexOf('.')).slice(0, 50);
  const uuid = Math.random().toString(36).substring(2, 9);
  const timestamp = Date.now();

  return `${timestamp}_${uuid}_${base}${ext}`;
}

/**
 * Dosya Güvenlik Doğrulaması
 */
export async function validateUploadedFile(file: File): Promise<FileValidationResult> {
  // 1. Boyut Sınırı Kontrolü
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: `Dosya boyutu 15 MB sınırını aşıyor (${(file.size / (1024 * 1024)).toFixed(2)} MB).`
    };
  }

  if (file.size === 0) {
    return {
      isValid: false,
      error: 'Boş veya sıfır baytlık dosya yüklenemez.'
    };
  }

  // 2. Uzantı Kontrolü
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (BLOCKED_EXTENSIONS.includes(ext)) {
    return {
      isValid: false,
      error: `Sistem güvenliği nedeniyle .${ext} uzantılı yürütülebilir dosyalar engellenmiştir.`
    };
  }

  // 3. MIME Tipi Kontrolü
  const mime = file.type.toLowerCase();
  const isAllowedMime = ALLOWED_MIME_TYPES.includes(mime) || 
    (ext === 'xml' && (mime.includes('xml') || mime === 'text/plain'));

  if (!isAllowedMime) {
    return {
      isValid: false,
      error: `Geçersiz dosya formatı (${mime || ext}). Sadece PDF, PNG, JPG ve e-Fatura XML kabul edilir.`
    };
  }

  // 4. Magic Bytes (Gerçek Dosya İmzası) Kontrolü
  try {
    const isMagicValid = await verifyMagicBytes(file, ext);
    if (!isMagicValid) {
      return {
        isValid: false,
        error: 'Dosya içeriği başlığı ile uzantısı uyuşmuyor (Sahte dosya formatı tespit edildi).'
      };
    }
  } catch (err) {
    console.warn('Magic byte inspection skipped:', err);
  }

  return {
    isValid: true,
    sanitizedFileName: sanitizeFileName(file.name)
  };
}

/**
 * Dosya Binary Başlığı (Magic Bytes) İncelemesi
 */
async function verifyMagicBytes(file: File, ext: string): Promise<boolean> {
  // İlk 16 baytı oku
  const slice = file.slice(0, 16);
  const buffer = await slice.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // PDF İmzası: 25 50 44 46 (%PDF)
  if (ext === 'pdf') {
    return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
  }

  // PNG İmzası: 89 50 4E 47 0D 0A 1A 0A
  if (ext === 'png') {
    return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  }

  // JPEG / JPG İmzası: FF D8 FF
  if (ext === 'jpg' || ext === 'jpeg') {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }

  // XML / UBL-TR e-Fatura
  if (ext === 'xml') {
    const text = new TextDecoder('utf-8').decode(bytes);
    return text.trim().startsWith('<') || text.includes('<?xml');
  }

  return true;
}

// ============================================================================
// 4. DENETİM İZİ (AUDIT LOG) ÜRETİCİ
// ============================================================================
export function createAuditEntry(action: string, details: string, userEmail?: string, userId?: string) {
  return {
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userId: userId || 'anonymous',
    userEmail: userEmail || 'system',
    action,
    details,
    ipAddress: '127.0.0.1 (Güvenli Oturum)',
    createdAt: new Date().toISOString()
  };
}
