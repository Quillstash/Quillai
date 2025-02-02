import getSession from '@/auth/session';
import { redirect } from 'next/navigation';
import  PageContent  from './page-content';

async function Page() {
  const session = await getSession();
  if (session) {
    redirect('/onboarding');
  }
  return (
    <div className='grid place-content-center h-screen'>
      <div className='space-y-8'>
        <PageContent/>
      </div>
    </div>
  );
}

export default Page;
