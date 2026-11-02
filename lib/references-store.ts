import fs from 'fs';
import path from 'path';

export interface ReferenceItem {
  id: string;
  name: string;
  file?: string;
  imageUrl?: string;
  desc: string;
  active: boolean;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'references.json');

export const INITIAL_REFERENCES: ReferenceItem[] = [
  { id: "ref-1", name: "ÖZGÜR LEBLEBİ", file: "ozgurleblebi.webp", desc: "Gıda & Kuruyemiş İmalatı", active: true, createdAt: "2026-01-01" },
  { id: "ref-2", name: "ANAKAMP KÜÇÜK KAŞİFLER", file: "anakamp.webp", desc: "Okul Öncesi & Erken Çocukluk Eğitimi", active: true, createdAt: "2026-01-02" },
  { id: "ref-3", name: "TODO CROISSANT & COFFEE", file: "todocroissant.webp", desc: "Artizan Fırıncılık & Kahve", active: true, createdAt: "2026-01-03" },
  { id: "ref-4", name: "TODO CREATIVE", file: "todocreative.webp", desc: "Dijital Medya & Reklam Ajansı", active: true, createdAt: "2026-01-04" },
  { id: "ref-5", name: "LOFTEN BİLİŞİM", file: "loften.webp", desc: "Kurumsal Bilişim & Yazılım Teknolojileri", active: true, createdAt: "2026-01-05" },
  { id: "ref-6", name: "PINAR DEMİRBAŞ BÜTÜNSEL SAĞLIK", file: "pinardemirbas.webp", desc: "Fonksiyonel Wellbeing & Bütünsel Sağlık", active: true, createdAt: "2026-01-06" },
  { id: "ref-7", name: "UNIVERSAL KAUÇUK", file: "universalkaucuk.webp", desc: "Endüstriyel Kauçuk & İş Makinaları Yedek Parça", active: true, createdAt: "2026-01-07" },
  { id: "ref-8", name: "UMG PARTS", file: "umgparts.webp", desc: "Global Maden & Tünel Makinaları Yedek Parça", active: true, createdAt: "2026-01-08" },
  { id: "ref-9", name: "NANNEBEE", file: "nannebee.webp", desc: "Doğal Ahşap Çocuk & Bebek Ürünleri", active: true, createdAt: "2026-01-09" },
  { id: "ref-10", name: "BEBEK HOUSE", file: "bebekhouse.webp", desc: "Anne & Bebek E-Ticaret ve Mağazacılık", active: true, createdAt: "2026-01-10" },
  { id: "ref-11", name: "MISILLA HOME", file: "misillahome.webp", desc: "Premium Ev Tekstili & Tasarım", active: true, createdAt: "2026-01-11" },
  { id: "ref-12", name: "NAM PROMOSYON", file: "nampromosyon.webp", desc: "Kurumsal Promosyon & İmalat Grubu", active: true, createdAt: "2026-01-12" },
  { id: "ref-13", name: "YENİ NESİL PROMOSYON", file: "yeninesil.webp", desc: "Baskı Teknolojileri & Promosyon Ürünleri", active: true, createdAt: "2026-01-13" },
  { id: "ref-14", name: "MELEK PROMOSYON", file: "melekpromosyon.webp", desc: "Kurumsal Hediye & Matbaa Çözümleri", active: true, createdAt: "2026-01-14" },
  { id: "ref-15", name: "METAFORM TASARIM", file: "metaform.webp", desc: "Endüstriyel & Mimari Tasarım Çözümleri", active: true, createdAt: "2026-01-15" },
  { id: "ref-16", name: "PROKON", file: "prokon.webp", desc: "Mühendislik, Müşavirlik & İnşaat", active: true, createdAt: "2026-01-16" },
  { id: "ref-17", name: "EKONAS", file: "ekonas.webp", desc: "Madencilik & Mühendislik Hizmetleri", active: true, createdAt: "2026-01-17" },
  { id: "ref-18", name: "DENTİZMİT", file: "dentizmit.webp", desc: "Ağız ve Diş Sağlığı Polikliniği", active: true, createdAt: "2026-01-18" },
  { id: "ref-19", name: "HYDRA SONDAJ MAKİNE", file: "hydra.webp", desc: "Sondaj Makineleri & Ekipmanları Sanayi", active: true, createdAt: "2026-01-19" }
];

export class ReferencesStore {
  private static ensureDataFile(): ReferenceItem[] {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_REFERENCES, null, 2), 'utf-8');
        return INITIAL_REFERENCES;
      }
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return INITIAL_REFERENCES;
    } catch {
      return INITIAL_REFERENCES;
    }
  }

  private static saveData(items: ReferenceItem[]): boolean {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error saving references:', err);
      return false;
    }
  }

  public static getReferences(onlyActive = false): ReferenceItem[] {
    const list = this.ensureDataFile();
    if (onlyActive) {
      return list.filter(r => r.active !== false);
    }
    return list;
  }

  public static addReference(item: { name: string; desc: string; imageUrl?: string; file?: string; active?: boolean }): ReferenceItem {
    const list = this.ensureDataFile();
    const newRef: ReferenceItem = {
      id: `ref-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: item.name.trim().toUpperCase(),
      desc: item.desc.trim(),
      imageUrl: item.imageUrl || '',
      file: item.file || '',
      active: item.active !== false,
      createdAt: new Date().toISOString()
    };
    list.unshift(newRef);
    this.saveData(list);
    return newRef;
  }

  public static deleteReference(id: string): boolean {
    const list = this.ensureDataFile();
    const filtered = list.filter(r => r.id !== id);
    if (filtered.length !== list.length) {
      this.saveData(filtered);
      return true;
    }
    return false;
  }

  public static toggleActive(id: string): boolean {
    const list = this.ensureDataFile();
    const target = list.find(r => r.id === id);
    if (target) {
      target.active = !target.active;
      this.saveData(list);
      return true;
    }
    return false;
  }
}
