import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { BlogStore } from '@/lib/blog-store';

const ADMIN_PASSWORDS = ['Rotayd2026!', 'Suleyman2026!', 'rotayd123', 'admin2026'];

function isAuthorizedAdmin(session: any, authHeader?: string | null): boolean {
  if (session?.user?.role === 'admin') return true;
  if (authHeader && ADMIN_PASSWORDS.includes(authHeader)) return true;
  return false;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const posts = BlogStore.getPosts(category);
    return NextResponse.json({ posts });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Hata oluştu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const authHeader = request.headers.get('x-admin-key');

    if (!isAuthorizedAdmin(session, authHeader)) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 403 });
    }

    const body = await request.json();
    const { title, excerpt, category, content, tags, readTime, author, image } = body;

    if (!title || !category || !excerpt) {
      return NextResponse.json({ error: 'Başlık, kategori ve özet zorunludur.' }, { status: 400 });
    }

    const newPost = BlogStore.addPost({
      title,
      excerpt,
      category,
      content: Array.isArray(content) ? content : [content || excerpt],
      tags: Array.isArray(tags) ? tags : ['Rehber', category],
      readTime: readTime || '4 dk okuma',
      author: author || 'ROTAYD Masası',
      image: image || '/images/sgk-istihdam-tesvikleri-2026-mali-musavirlik-rehberi.webp'
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Kayıt başarısız.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const authHeader = request.headers.get('x-admin-key');

    if (!isAuthorizedAdmin(session, authHeader)) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 403 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID gereklidir.' }, { status: 400 });
    }

    const success = BlogStore.updatePost(id, updates);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Güncelleme hatası.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const authHeader = request.headers.get('x-admin-key');

    if (!isAuthorizedAdmin(session, authHeader)) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID gereklidir.' }, { status: 400 });
    }

    const success = BlogStore.deletePost(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Silme işlemi başarısız.' }, { status: 500 });
  }
}
