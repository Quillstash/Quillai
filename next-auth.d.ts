import { DefaultSession } from "next-auth";

declare module 'next-auth' {
 export interface Session {
    user: {
      /** The user's onboarding status. */
      onboardingCompleted: boolean;
      id: string;
    } & DefaultSession['user'];
  }
}