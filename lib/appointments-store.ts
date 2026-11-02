import fs from 'fs';
import path from 'path';
import os from 'os';
import { AppointmentData, generateGoogleCalendarUrl, generateGoogleCalendarAdminUrl } from './calendar-mailer';

export interface StoredAppointment extends AppointmentData {
  status: 'beklemede' | 'onaylandi' | 'tamamlandi' | 'iptal';
  googleCalendarUrl: string;
  googleCalendarAdminUrl?: string;
  notificationSent?: boolean;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'appointments.json');
const TMP_FILE = path.join(os.tmpdir(), 'rotayd-appointments.json');

export class AppointmentsStore {
  private static memoryCache: StoredAppointment[] | null = null;

  private static ensureDataFile(): StoredAppointment[] {
    try {
      // 1. /tmp dosyasını kontrol et (Vercel serverless ortamında en güncel yazılan yer)
      if (fs.existsSync(TMP_FILE)) {
        const raw = fs.readFileSync(TMP_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.memoryCache = parsed;
          return parsed;
        }
      }

      // 2. data/appointments.json dosyasını kontrol et
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.memoryCache = parsed;
          return parsed;
        }
      }

      // 3. Hafıza önbelleğini kontrol et
      if (this.memoryCache && Array.isArray(this.memoryCache)) {
        return this.memoryCache;
      }

      return [];
    } catch (err) {
      console.error('Error reading appointments.json:', err);
      return this.memoryCache || [];
    }
  }

  private static saveData(items: StoredAppointment[]): boolean {
    this.memoryCache = items;
    let saved = false;

    // Önce /tmp'ye yaz (Vercel'de %100 yazılabilir)
    try {
      fs.writeFileSync(TMP_FILE, JSON.stringify(items, null, 2), 'utf-8');
      saved = true;
    } catch (e) {
      console.warn('Could not write to TMP_FILE:', e);
    }

    // Mümkünse data/appointments.json'a da yaz (Lokal geliştirme ortamı için)
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
      saved = true;
    } catch {
      // Vercel EROFS beklenir, /tmp zaten kurtardı
    }

    return saved;
  }

  public static getAppointments(): StoredAppointment[] {
    const list = this.ensureDataFile();
    // En yeni randevular en üstte
    return [...list].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public static getBookedSlotsForDate(date: string): string[] {
    const list = this.ensureDataFile();
    return list
      .filter((a) => a.date === date && a.status !== 'iptal')
      .map((a) => a.timeSlot);
  }

  public static addAppointment(
    data: Omit<AppointmentData, 'id' | 'createdAt'> & { notificationSent?: boolean }
  ): StoredAppointment {
    const list = this.ensureDataFile();
    const id = `apt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const createdAt = new Date().toISOString();

    const fullAppointment: AppointmentData = {
      ...data,
      id,
      createdAt
    };

    const googleCalendarUrl = generateGoogleCalendarUrl(fullAppointment);
    const googleCalendarAdminUrl = generateGoogleCalendarAdminUrl(fullAppointment);

    const newRecord: StoredAppointment = {
      ...fullAppointment,
      status: 'beklemede',
      googleCalendarUrl,
      googleCalendarAdminUrl,
      notificationSent: data.notificationSent ?? false
    };

    list.unshift(newRecord);
    this.saveData(list);
    return newRecord;
  }

  public static updateStatus(
    id: string,
    status: 'beklemede' | 'onaylandi' | 'tamamlandi' | 'iptal'
  ): boolean {
    const list = this.ensureDataFile();
    const item = list.find((a) => a.id === id);
    if (!item) return false;
    item.status = status;
    return this.saveData(list);
  }

  public static deleteAppointment(id: string): boolean {
    const list = this.ensureDataFile();
    const filtered = list.filter((a) => a.id !== id);
    if (filtered.length === list.length) return false;
    return this.saveData(filtered);
  }
}
