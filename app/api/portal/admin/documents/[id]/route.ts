import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ServerDb } from '@/lib/server-db';
import { BelgeDurumu } from '@/lib/portal-types';

const ADMIN_PASSWORDS = ['Rotayd2026!', 'Suleyman2026!', 'rotayd123', 'admin2026'];

function isAuthorizedAdmin(session: any, authHeader?: string | null): boolean {
  if (session?.user?.role === 'admin') return true;
  if (authHeader && ADMIN_PASSWORDS.includes(authHeader)) return true;
  return false;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const authHeader = request.headers.get('x-admin-key');

  if (!isAuthorizedAdmin(session, authHeader)) {
    return NextResponse.json({ error: 'Yetkisiz işlem.' }, { status: 403 });
  }

  try {
    const { durum } = await request.json() as { durum: BelgeDurumu };
    const success = ServerDb.updateDocumentStatus(params.id, durum);
    if (!success) {
      return NextResponse.json({ error: 'Belge bulunamadı.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Güncelleme hatası.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const authHeader = request.headers.get('x-admin-key');

  if (!isAuthorizedAdmin(session, authHeader)) {
    return NextResponse.json({ error: 'Yetkisiz işlem.' }, { status: 403 });
  }

  const success = ServerDb.deleteDocument(params.id);
  return NextResponse.json({ success });
}
