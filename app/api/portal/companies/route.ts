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

  const user = session?.user?.email ? ServerDb.getUserByEmail(session.user.email) : null;
  const isAdmin = user?.role === 'admin' || !!authHeader;

  // Admin tüm şirketleri, mükellef sadece kendisininkileri görür
  const companies = ServerDb.getCompanies(isAdmin ? undefined : user?.id);
  return NextResponse.json({ companies });
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

  // Güvenlik kontrolü: Kullanıcı onaylı değilse şirket oluşturamaz!
  if (user.status !== 'approved' && user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Şirket tanımlayabilmek için hesabınızın Mali Müşavir tarafından onaylanmış olması gerekmektedir.' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const result = ServerDb.createCompany({
      ...body,
      userId: user.id
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, company: result.company });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'İşlem başarısız.' }, { status: 500 });
  }
}
