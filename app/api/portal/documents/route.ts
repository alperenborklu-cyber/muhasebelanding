import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ServerDb } from '@/lib/server-db';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const authHeader = request.headers.get('x-admin-key');

  if (!session && !authHeader) {
    return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId') || undefined;

  const user = session?.user?.email ? ServerDb.getUserByEmail(session.user.email) : null;
  const isAdmin = user?.role === 'admin' || !!authHeader;

  const documents = ServerDb.getDocuments(isAdmin ? undefined : user?.id, companyId);
  return NextResponse.json({ documents });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Oturum açmanız gerekmektedir.' }, { status: 401 });
  }

  const user = ServerDb.getUserByEmail(session.user.email);
  if (!user) {
    return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
  }

  // Güvenlik kontrolü: Onay bekleyen kullanıcı fatura yükleyemez!
  if (user.status !== 'approved' && user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Belge yükleyebilmek için hesabınızın Mali Müşavir tarafından onaylanmış olması gerekmektedir.' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const newDoc = ServerDb.uploadDocument({
      ...body,
      userId: user.id,
      userEmail: user.email
    });

    return NextResponse.json({ success: true, document: newDoc });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Belge kaydedilemedi.' }, { status: 500 });
  }
}
