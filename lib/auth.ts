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
        vkn: { label: 'Vergi Kimlik Numarası (VKN)', type: 'text' },
        password: { label: 'Şifre', type: 'password' },
        unvan: { label: 'Unvan / İsim', type: 'text' }
      },
      async authorize(credentials) {
        // 1. Sadece 10 Haneli VKN ile Giriş
        if (credentials?.vkn) {
          const res = ServerDb.loginWithVkn({
            vkn: credentials.vkn,
            password: credentials.password,
            unvan: credentials.unvan
          });

          if (!res.success || !res.user) {
            throw new Error(res.error || 'Geçersiz Vergi Numarası veya Şifre.');
          }

          return {
            id: res.user.id,
            name: res.user.name,
            email: res.user.email,
            image: res.user.image,
            role: res.user.role,
            status: res.user.status
          };
        }

        return null;
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
