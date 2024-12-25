import getSession from '@/auth/session';
import { PageContent } from './page-content';
import { redirect } from 'next/navigation';

async function Page() {
  const session = await getSession();
  if (session) {
    redirect('/articles');
  }
  return (
    <div className='grid place-content-center h-screen'>
      <div className='space-y-8'>
        <h1 className='text-2xl font-semibold'>Login</h1>
        <PageContent />
      </div>
    </div>
  );
}

export default Page;
