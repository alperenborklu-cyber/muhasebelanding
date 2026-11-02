import fs from 'fs';
import path from 'path';
import { BlogPost, BLOG_POSTS as DEFAULT_POSTS } from './blogData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'blog-posts.json');

export class BlogStore {
  private static ensureDataFile(): BlogPost[] {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_POSTS, null, 2), 'utf-8');
        return DEFAULT_POSTS;
      }
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return DEFAULT_POSTS;
    } catch {
      return DEFAULT_POSTS;
    }
  }

  private static saveData(items: BlogPost[]): boolean {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error saving blog posts:', err);
      return false;
    }
  }

  public static getPosts(category?: string): BlogPost[] {
    const list = this.ensureDataFile();
    if (!category || category === 'all') return list;
    return list.filter(p => p.category === category);
  }

  public static getPostBySlug(slug: string): BlogPost | undefined {
    const list = this.ensureDataFile();
    return list.find(p => p.slug === slug);
  }

  public static addPost(data: Partial<BlogPost> & { title: string; category: any; excerpt: string }): BlogPost {
    const list = this.ensureDataFile();
    const slug = data.slug || data.title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug,
      instagramCode: `IG-${String(list.length + 1).padStart(2, '0')}`,
      title: data.title.trim(),
      excerpt: data.excerpt.trim(),
      category: data.category,
      date: data.date || new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: data.readTime || '4 dk okuma',
      image: data.image || '/images/sgk-istihdam-tesvikleri-2026-mali-musavirlik-rehberi.webp',
      author: data.author || (data.category === 'Mali Müşavirlik' ? 'ROTAYD Mali Müşavirlik Masası' : 'ROTAYD Teşvik Departmanı'),
      content: Array.isArray(data.content) && data.content.length > 0
        ? data.content
        : [data.excerpt],
      tags: Array.isArray(data.tags) ? data.tags : ['Rehber', 'Mevzuat', 'ROTAYD']
    };

    list.unshift(newPost);
    this.saveData(list);
    return newPost;
  }

  public static deletePost(id: string): boolean {
    const list = this.ensureDataFile();
    const filtered = list.filter(p => p.id !== id && p.slug !== id);
    if (filtered.length !== list.length) {
      this.saveData(filtered);
      return true;
    }
    return false;
  }

  public static updatePost(id: string, data: Partial<BlogPost>): boolean {
    const list = this.ensureDataFile();
    const post = list.find(p => p.id === id || p.slug === id);
    if (!post) return false;

    Object.assign(post, data);
    this.saveData(list);
    return true;
  }
}
