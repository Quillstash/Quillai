'use client';

import { Github, Google } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function PageContent() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const searchParams = useSearchParams();

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);

    const signInResult = await signIn('google', {
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/dashboard',
    });

    setIsGoogleLoading(false);

    if (!signInResult?.ok) {
      // return toast('Your sign in request failed. Please try again.');
    }
  };

  const handleGithubSignIn = async () => {
    setIsGithubLoading(true);

    const signInResult = await signIn('apple', {
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/dashboard',
    });

    setIsGithubLoading(false);

    if (!signInResult?.ok) {
      // return toast('Your sign in request failed. Please try again.');
    }
  };

  return (
    <div className='flex flex-col gap-6 min-w-96'>
      <Button
        type='button'
        variant='outline'
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading || isGithubLoading}
      >
        {isGoogleLoading ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Google className='mr-2 h-4 w-4' />
        )}{' '}
        Google
      </Button>
      <Button
        type='button'
        variant='outline'
        onClick={handleGithubSignIn}
        disabled={isGoogleLoading || isGithubLoading}
      >
        {isGithubLoading ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Github className='mr-2 h-4 w-4' />
        )}{' '}
        GitHub
      </Button>
    </div>
  );
}
