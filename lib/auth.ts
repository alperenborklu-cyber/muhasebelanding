import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ServerDb } from './server-db';
import { UserRole, UserStatus } from './portal-types';

const providers = [];

// 1. Google OAuth Provider (Canlı ve Yerel Google Girişi)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'select_account',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  );
}

// 2. Geliştirici / Test Modu Simülatörü (Google API anahtarları henüz girilmemişse veya yerel testler için)
// Bu sağlayıcı production ortamında tamamen devre dışıdır.
if (process.env.NODE_ENV !== 'production') {
  providers.push(
    CredentialsProvider({
      id: 'google-dev-mock',
      name: 'Google Geliştirici Simülasyonu',
      credentials: {
        email: { label: 'Google E-Posta', type: 'email' },
        name: { label: 'Google Ad Soyad', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const name = credentials.name || credentials.email.split('@')[0];
        const dbUser = ServerDb.upsertGoogleUser({
          email: credentials.email,
          name,
          image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=07173e&textColor=d4af37`
        });
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          image: dbUser.image,
          role: dbUser.role,
          status: dbUser.status
        };
      }
    })
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 gün
  },
  secret: process.env.NEXTAUTH_SECRET || 'rotayd_super_secure_nextauth_jwt_secret_key_2026_fallback',
  pages: {
    signIn: '/portal',
    error: '/portal'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;

      // Google OAuth sağlayıcısından gelen kullanıcıyı sunucu veritabanında kaydet veya güncelle
      if (account?.provider === 'google') {
        const dbUser = ServerDb.upsertGoogleUser({
          email: user.email,
          name: user.name || 'Mükellef',
          image: user.image
        });
        user.id = dbUser.id;
        user.role = dbUser.role;
        user.status = dbUser.status;
      }
      return true;
    },

    async jwt({ token, user }) {
      // İlk girişte token'a kullanıcı bilgilerini yaz
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }

      // Her token yenilendiğinde veritabanından güncel onay durumunu sorgula
      // Böylece admin onay verdiğinde kullanıcının oturumu anında "approved" olarak güncellenir!
      if (token.email) {
        const dbUser = ServerDb.getUserByEmail(token.email);
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.status = dbUser.status;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = (token.id as string) || '';
        session.user.role = (token.role as UserRole) || 'user';
        session.user.status = (token.status as UserStatus) || 'pending';
      }
      return session;
    }
  }
};
