'use client';

import { Github, Google } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function PageContent() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignIn = async (provider: 'google' | 'github') => {
    const setLoadingState = provider === 'google' ? setIsGoogleLoading : setIsGithubLoading;
    setLoadingState(true);

    const signInResult = await signIn(provider, { redirect: false });

    setLoadingState(false);

    if (signInResult?.ok) {
      // Wait for session to be updated with user data
      if (session?.user) {
        const user = session.user as any; // pass onboardingCompleted to the user session nd check.

        if (user.onboardingCompleted) {
          router.push('/articles'); // Redirect to articles if onboarding is complete
        } else {
          router.push('/onboarding'); // Redirect to onboarding if not complete
        }
      }
    } else {
      console.error('Sign-in failed');
      // Optionally show a toast message here
    }
  };

  return (
    <div className="flex flex-col gap-6 min-w-96">
      <Button
        type="button"
        variant="outline"
        onClick={() => handleSignIn('google')}
        disabled={isGoogleLoading || isGithubLoading}
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => handleSignIn('github')}
        disabled={isGoogleLoading || isGithubLoading}
      >
        {isGithubLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}
        GitHub
      </Button>
    </div>
  );
}
