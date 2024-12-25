import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from '@/lib/db';
import { User } from '@prisma/client';
import { redirect } from 'next/navigation';


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Google],
  events: {
    signIn: async (message) => {
      const hasNotOnboardedBefore = message.isNewUser;
      if (hasNotOnboardedBefore) {
        redirect("/onboarding")
      }
    },
  },
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          onboardingCompleted: (user as User).onboardingCompleted,
        },
      };
    },
  },
});
