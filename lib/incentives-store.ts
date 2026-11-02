import fs from 'fs';
import path from 'path';

export interface IncentiveProgram {
  id: string;
  name: string;
  institution: string; // T.C. Sanayi ve Teknoloji Bakanlığı, KOSGEB, Ticaret Bakanlığı, TÜBİTAK vb.
  category: "Yatırım Teşvik" | "KOSGEB Hibeleri" | "Ar-Ge & Tasarım" | "İhracat Destekleri" | "KOBİ & Girişimcilik";
  supportLimit: string; // e.g. "12 Milyon TL - Sınırsız", "2.000.000 TL Hibe"
  supportRate: string; // e.g. "%70 Hibe", "%100 Vergi Muafiyeti"
  status: "Aktif Başvuru" | "Sürekli Açık" | "Dönemsel Çağrı";
  description: string;
  requirements: string[];
  year: number;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'incentives.json');

export const INITIAL_INCENTIVES: IncentiveProgram[] = [
  {
    id: "inc-1",
    name: "Sanayi & İmalat Yatırım Teşvik Belgesi",
    institution: "T.C. Sanayi ve Teknoloji Bakanlığı",
    category: "Yatırım Teşvik",
    supportLimit: "1. ve 2. Bölge: 12M TL / 3-6. Bölge: 6M TL",
    supportRate: "%20 KDV İstisnası + Sıfır Gümrük + %80 Kurumlar Vergisi İndirimi",
    status: "Sürekli Açık",
    description: "Yeni fabrika kurulumu, kapasite artışı ve makine parkuru modernizasyonunda KDV muafiyeti, gümrük vergisi istisnası ve SGK prim desteği.",
    requirements: ["Asgari 6M-12M TL sabit yatırım", "Sanayi Sicil Belgesi veya kapasite raporu", "E-TUYS sistemi yetkilendirmesi"],
    year: 2026
  },
  {
    id: "inc-2",
    name: "KOSGEB KOBİGEL ve Kapasite Geliştirme Destekleri",
    institution: "T.C. KOSGEB",
    category: "KOSGEB Hibeleri",
    supportLimit: "5.000.000 TL Üst Limit",
    supportRate: "%70 - %85 Geri Ödemesiz & Uygun Vadeli Destek",
    status: "Aktif Başvuru",
    description: "İmalatçı KOBİ'lerin dijitalleşme, modern otomasyon sistemleri, yerli yazılım entegrasyonu ve rekabet gücünü artırıcı makine yatırımlarına doğrudan kaynak.",
    requirements: ["KOBİ vasfını taşımak", "İmalat veya bilişim sektöründe faaliyet göstermek", "KOSGEB Veri Tabanına kayıtlı olmak"],
    year: 2026
  },
  {
    id: "inc-3",
    name: "Ticaret Bakanlığı E-İhracat ve Fuar Destekleri",
    institution: "T.C. Ticaret Bakanlığı",
    category: "İhracat Destekleri",
    supportLimit: "Yıllık 10.000.000 TL'ye Varan Destek",
    supportRate: "%50 - %70 Geri Ödemesiz Nakit Hibe",
    status: "Sürekli Açık",
    description: "Yurt dışı pazar yeri komisyonları, dijital reklamlar, yurt dışı ofis/depo kiraları ve uluslararası ihtisas fuarı katılımlarında nakit hibe.",
    requirements: ["İhracatçı Birliği üyeliği", "Şirket adına faturalandırılmış harcamalar", "DYS sistemi yetkilendirmesi"],
    year: 2026
  },
  {
    id: "inc-4",
    name: "5746 Sayılı Ar-Ge ve Tasarım Merkezi Kurulumu",
    institution: "T.C. Sanayi ve Teknoloji Bakanlığı",
    category: "Ar-Ge & Tasarım",
    supportLimit: "Sınırsız (Harcama ve Personel Başına)",
    supportRate: "%100 Kurumlar Vergisi İndirimi + Personel Stopaj & SGK Terkini",
    status: "Sürekli Açık",
    description: "Bünyesinde en az 15 Ar-Ge veya 10 Tasarım personeli istihdam eden şirketlere sağlanan kurumlar vergisi, stopaj ve damga vergisi muafiyetleri.",
    requirements: ["En az 10-15 tam zamanlı lisans mezunu personel", "Ayrı fiziki Ar-Ge alanı", "Yenilikçi proje portföyü"],
    year: 2026
  },
  {
    id: "inc-5",
    name: "KOSGEB Girişimci Destek Programı (Kadın & Genç Öncelikli)",
    institution: "KOSGEB",
    category: "KOSGEB Hibeleri",
    supportLimit: "2.000.000 TL Hibe & Düşük Faiz",
    supportRate: "%80'e Varan Hibe Oranı",
    status: "Aktif Başvuru",
    description: "İmalat, bilişim ve teknoloji alanlarında yeni kurulan işletmelere makine, teçhizat, yazılım ve personel giderleri için karşılıksız destek.",
    requirements: ["KOSGEB Girişimcilik Sertifikası", "Son 1 yıl içinde kurulmuş şirket", "İmalat veya ileri teknoloji NACE kodu"],
    year: 2026
  }
];

export class IncentivesStore {
  private static ensureDataFile(): IncentiveProgram[] {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_INCENTIVES, null, 2), 'utf-8');
        return INITIAL_INCENTIVES;
      }
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return INITIAL_INCENTIVES;
    } catch {
      return INITIAL_INCENTIVES;
    }
  }

  private static saveData(items: IncentiveProgram[]): boolean {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error saving incentives:', err);
      return false;
    }
  }

  public static getPrograms(): IncentiveProgram[] {
    return this.ensureDataFile();
  }

  public static addProgram(data: Omit<IncentiveProgram, 'id'>): IncentiveProgram {
    const list = this.ensureDataFile();
    const newProg: IncentiveProgram = {
      ...data,
      id: `inc-${Date.now()}`
    };
    list.unshift(newProg);
    this.saveData(list);
    return newProg;
  }

  public static updateProgram(id: string, updates: Partial<IncentiveProgram>): boolean {
    const list = this.ensureDataFile();
    const prog = list.find(p => p.id === id);
    if (!prog) return false;
    Object.assign(prog, updates);
    this.saveData(list);
    return true;
  }

  public static deleteProgram(id: string): boolean {
    const list = this.ensureDataFile();
    const filtered = list.filter(p => p.id !== id);
    if (filtered.length !== list.length) {
      this.saveData(filtered);
      return true;
    }
    return false;
  }
}
