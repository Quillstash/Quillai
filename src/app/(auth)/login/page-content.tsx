'use client';

import { Google } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function PageContent() {
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
      router.push('/onboarding');
    } else {
      console.error('Sign-in failed');
      toast.error('Loading Please wait.');
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
          Welcome Back
        </h1>
        <p className='text-center text-gray-600 mb-8'>
          Sign in to continue to your account
        </p>
      </motion.div>

      <motion.div
        className='flex flex-col gap-4'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Button
          type='button'
          variant='outline'
          onClick={() => handleSignIn('google')}
          disabled={isGoogleLoading || isGithubLoading}
          className='w-full flex items-center justify-center gap-2 py-3 border border-gray-200 hover:border-blue-500 transition-all'
        >
          {isGoogleLoading ? (
            <Loader2 className='h-5 w-5 animate-spin' />
          ) : (
            <>
              <Google className='h-5 w-5' />
              <span>Continue with Google</span>
            </>
          )}
        </Button>

        {/* Uncomment if you want to add GitHub login */}
        {/* <Button
          type='button'
          variant='outline'
          onClick={() => handleSignIn('github')}
          disabled={isGoogleLoading || isGithubLoading}
          className='w-full flex items-center justify-center gap-2 py-3 border border-gray-200 hover:border-gray-800 transition-all'
        >
          {isGithubLoading ? (
            <Loader2 className='h-5 w-5 animate-spin' />
          ) : (
            <>
              <Github className='h-5 w-5' />
              <span>Continue with GitHub</span>
            </>
          )}
        </Button> */}
      </motion.div>
    </div>
  );
}