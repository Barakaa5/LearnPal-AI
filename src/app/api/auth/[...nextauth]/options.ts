import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { cert } from 'firebase-admin/app';
import { Adapter } from 'next-auth/adapters';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user: User = {
          id: '123',
          name: 'jsmith',
          email: 'name@email.com',
          image: '',
        };

        if (credentials?.email) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  }) as Adapter,
  session: { strategy: 'jwt' },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
  pages: {
    signIn: '/',
  },
};
