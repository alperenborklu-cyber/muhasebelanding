import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ServerDb } from '@/lib/server-db';

export async function GET() {
  const session = await getServerSession(authOptions);
  const hasGoogleConfig = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

  if (!session || !session.user?.email) {
    return NextResponse.json({
      authenticated: false,
      user: null,
      hasGoogleConfig
    });
  }

  // Veritabanından en güncel bilgiyi çek
  const dbUser = ServerDb.getUserByEmail(session.user.email);

  return NextResponse.json({
    authenticated: true,
    user: dbUser || session.user,
    hasGoogleConfig
  });
}
