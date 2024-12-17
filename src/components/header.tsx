import React from 'react';
import Container from '@/components/container';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
// import getSession from '@/auth/get-session';
import { ArrowRight } from 'lucide-react';

async function Header() {
  // const user = await getSession();
  const user = null;

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <Container>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex z-40 font-semibold'>
            blog<span className='text-blue-600'>bear</span>
          </Link>

          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <Button>Logout</Button>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                >
                  Dashboard
                  <ArrowRight className='ml-1.5' />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/login'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Login
                </Link>

                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

                <Link
                  href='/playground'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                >
                  Try for free
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
