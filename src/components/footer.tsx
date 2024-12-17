import Container from '@/components/container';
import { PencilLine } from 'lucide-react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className='relative h-20 bg-background'>
      <Container className='border-t'>
        <div className='flex flex-col justify-between gap-10 pb-16 lg:pb-24 pt-10 lg:flex-row'>
          <div className='sm:col-span-3'>
            <Link href='/' className='mb-2 flex w-fit items-center gap-2'>
              <PencilLine className='text-primary' />
              <p>Quillai</p>
            </Link>
            <p className='mb-1 text-sm text-muted-foreground'>
              Your writing buddy
            </p>
            <p className='max-w-prose text-sm text-muted-foreground'>
              &copy; {new Date().getFullYear()} all rights reserved
            </p>
            <ul className='mt-4 flex gap-2 text-sm text-muted-foreground'>
              <li>
                <Link
                  href='https://x.com/ibrahimdoba'
                  target='_blank'
                  className='underline-offset-2 hover:underline'
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href='https://github.com/ibrahimdoba'
                  target='_blank'
                  className='underline-offset-2 hover:underline'
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  href='https://'
                  target='_blank'
                  className='underline-offset-2 hover:underline'
                >
                  Discord
                </Link>
              </li>
            </ul>
          </div>

          <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20'>
            <div className='flex flex-col gap-2 text-sm'>
              <p className='font-medium mb-4'>Legal</p>
              <Link
                href='/terms'
                className='text-muted-foreground underline-offset-2 hover:underline'
              >
                Terms
              </Link>
              <Link
                href='/privacy'
                className='text-muted-foreground underline-offset-2 hover:underline'
              >
                Privacy
              </Link>
            </div>

            <div className='flex flex-col gap-2 text-sm'>
              <p className='font-medium mb-4'>Resources</p>
              <Link
                href='https://quillstash.com'
                target='_blank'
                className='text-muted-foreground underline-offset-2 hover:underline'
              >
                Quillstash
              </Link>
              <Link
                href='/rss.xml'
                target='_blank'
                className='text-muted-foreground underline-offset-2 hover:underline'
              >
                RSS Feed
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
