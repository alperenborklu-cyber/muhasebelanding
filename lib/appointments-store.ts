import fs from 'fs';
import path from 'path';
import { AppointmentData, generateGoogleCalendarUrl, generateGoogleCalendarAdminUrl } from './calendar-mailer';

export interface StoredAppointment extends AppointmentData {
  status: 'beklemede' | 'onaylandi' | 'tamamlandi' | 'iptal';
  googleCalendarUrl: string;
  googleCalendarAdminUrl?: string;
  notificationSent?: boolean;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'appointments.json');

export class AppointmentsStore {
  private static ensureDataFile(): StoredAppointment[] {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
        return [];
      }
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('Error reading appointments.json:', err);
      return [];
    }
  }

  private static saveData(items: StoredAppointment[]): boolean {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error saving appointments.json:', err);
      return false;
    }
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
