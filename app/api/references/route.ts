import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ReferencesStore } from '@/lib/references-store';

const ADMIN_PASSWORDS = ['Rotayd2026!', 'Suleyman2026!', 'rotayd123', 'admin2026'];

function isAuthorizedAdmin(session: any, authHeader?: string | null): boolean {
  if (session?.user?.role === 'admin') return true;
  if (authHeader && ADMIN_PASSWORDS.includes(authHeader)) return true;
  return false;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';
    const references = ReferencesStore.getReferences(!all);
    return NextResponse.json({ references });
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
    const { name, desc, imageUrl, file } = body;

    if (!name || (!imageUrl && !file)) {
      return NextResponse.json({ error: 'Firma adı ve logo/fotoğraf zorunludur.' }, { status: 400 });
    }

    const newRef = ReferencesStore.addReference({
      name,
      desc: desc || 'Kurumsal Referans',
      imageUrl: imageUrl || '',
      file: file || '',
      active: true
    });

    return NextResponse.json({ success: true, reference: newRef });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Kayıt başarısız.' }, { status: 500 });
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
      return NextResponse.json({ error: 'ID parametresi zorunludur.' }, { status: 400 });
    }

    const success = ReferencesStore.deleteReference(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Silme işlemi başarısız.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const authHeader = request.headers.get('x-admin-key');

    if (!isAuthorizedAdmin(session, authHeader)) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 403 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'ID gereklidir.' }, { status: 400 });
    }

    const success = ReferencesStore.toggleActive(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Güncelleme başarısız.' }, { status: 500 });
  }
}
