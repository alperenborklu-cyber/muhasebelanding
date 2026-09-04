import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ServerDb } from '@/lib/server-db';

const ADMIN_PASSWORDS = ['Rotayd2026!', 'Suleyman2026!', 'rotayd123', 'admin2026'];

function isAuthorizedAdmin(session: any, authHeader?: string | null): boolean {
  if (session?.user?.role === 'admin') return true;
  if (authHeader && ADMIN_PASSWORDS.includes(authHeader)) return true;
  return false;
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const authHeader = request.headers.get('x-admin-key');

  if (!isAuthorizedAdmin(session, authHeader)) {
    return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 403 });
  }

  const users = ServerDb.getAllUsers();
  return NextResponse.json({ users });
}
