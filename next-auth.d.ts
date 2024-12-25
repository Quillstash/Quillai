import { DefaultSession } from "next-auth";

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's onboarding status. */
      onboardingCompleted: boolean;
    } & DefaultSession['user'];
  }
}