import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ServerDb } from './server-db';
import { UserRole, UserStatus } from './portal-types';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'mukellef-auth',
      name: 'Mükellef Girişi',
      credentials: {
        email: { label: 'E-Posta Adresi', type: 'email' },
        name: { label: 'Ad Soyad', type: 'text' },
        phone: { label: 'Telefon Numarası', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const email = credentials.email.trim().toLowerCase();
        const name = credentials.name?.trim() || email.split('@')[0];
        const phone = credentials.phone?.trim();

        // Kullanıcıyı veritabanında ara veya yeni başvuru olarak 'pending' statüsüyle kaydet
        const user = ServerDb.registerOrLoginUser({
          email,
          name,
          phone
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          status: user.status
        };
      }
    })
  ],
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }

      // Veritabanından her zaman anlık onay durumunu sorgula (Admin onay verince anında güncellenir)
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
