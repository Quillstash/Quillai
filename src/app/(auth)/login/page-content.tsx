'use client';

import {  Google } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function PageContent() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const router = useRouter();

  
  const handleSignIn = async (provider: 'google' | 'github') => {
    const setLoadingState =
      provider === 'google' ? setIsGoogleLoading : setIsGithubLoading;
    setLoadingState(true);

    const signInResult = await signIn(provider, { redirect: false });

    setLoadingState(false);

    if (signInResult?.ok) {
      router.push('/articles');
    } else {
      console.error('Sign-in failed');
      toast.error("Loading Please Wait")
    }
  };

  return (
    <div className='flex flex-col gap-6 min-w-96'>
      <Button
        type='button'
        variant='outline'
        onClick={() => handleSignIn('google')}
        disabled={isGoogleLoading || isGithubLoading}
      >
        {isGoogleLoading ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Google className='mr-2 h-4 w-4' />
        )}
        Google
      </Button>
      {/* <Button
        type='button'
        variant='outline'
        onClick={() => handleSignIn('github')}
        disabled={isGoogleLoading || isGithubLoading}
      >
        {isGithubLoading ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Github className='mr-2 h-4 w-4' />
        )}
        GitHub
      </Button> */}
    </div>
  );
}
