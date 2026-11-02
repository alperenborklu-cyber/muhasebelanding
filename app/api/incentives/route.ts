import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { IncentivesStore } from '@/lib/incentives-store';

const ADMIN_PASSWORDS = ['Rotayd2026!', 'Suleyman2026!', 'rotayd123', 'admin2026'];

function isAuthorizedAdmin(session: any, authHeader?: string | null): boolean {
  if (session?.user?.role === 'admin') return true;
  if (authHeader && ADMIN_PASSWORDS.includes(authHeader)) return true;
  return false;
}

export async function GET() {
  try {
    const programs = IncentivesStore.getPrograms();
    return NextResponse.json({ programs });
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
    const { name, institution, category, supportLimit, supportRate, status, description, requirements } = body;

    if (!name || !institution || !category) {
      return NextResponse.json({ error: 'Program adı, kurum ve kategori zorunludur.' }, { status: 400 });
    }

    const newProg = IncentivesStore.addProgram({
      name,
      institution,
      category,
      supportLimit: supportLimit || 'Mevzuata Göre Belirlenir',
      supportRate: supportRate || '%50 - %70 Destek',
      status: status || 'Aktif Başvuru',
      description: description || '',
      requirements: Array.isArray(requirements) ? requirements : [requirements || 'KOBİ / Sanayi vasfı'],
      year: 2026
    });

    return NextResponse.json({ success: true, program: newProg });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Kayıt hatası' }, { status: 500 });
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
      return NextResponse.json({ error: 'ID zorunludur.' }, { status: 400 });
    }

    const success = IncentivesStore.updateProgram(id, updates);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Güncelleme hatası' }, { status: 500 });
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
      return NextResponse.json({ error: 'ID zorunludur.' }, { status: 400 });
    }

    const success = IncentivesStore.deleteProgram(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Silme hatası' }, { status: 500 });
  }
}
