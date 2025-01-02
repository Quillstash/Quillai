"use client"
import React, { useEffect } from 'react';
import Container from '@/components/container';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { ArrowRight, Feather } from 'lucide-react';
import { useRouter } from 'next/navigation';

 function Header() {
  // const user = await getSession();
  const user = null;
  const router = useRouter();

  // Redirect if user has active session
 useEffect(() => {
    if (user) {
      router.push('/articles');
    }
  }, [user, router]);

  return (
    <nav className='sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <Container>
        <div className='flex h-16 items-center justify-between'>
          <Link 
            href='/' 
            className='flex items-center gap-2 z-40 font-semibold text-lg hover:opacity-90 transition-opacity'
          >
            <Feather className='w-6 h-6 text-purple-600' />
            <span className='bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
              QuillAI
            </span>
          </Link>

          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  className='hover:bg-purple-50'
                >
                  Logout
                </Button>
                <Link
                  href='/articles'
                  className={buttonVariants({
                    size: 'default',
                    className: 'hidden sm:flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity',
                  })}
                >
                  My Articles
                  <ArrowRight className='ml-1.5' />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/login'
                  className={buttonVariants({
                    size: 'default',
                    variant: 'ghost',
                    className: 'hover:bg-purple-50',
                  })}
                >
                  Sign In
                </Link>

                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

                <Link
                  href='/articles'
                  className={buttonVariants({
                    size: 'default',
                    className: 'hidden sm:flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity',
                  })}
                >
                  Try QuillAI Free
                  <ArrowRight className='ml-1.5' />
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Header;