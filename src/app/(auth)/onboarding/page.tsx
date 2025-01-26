import getSession from '@/auth/session';
import PageComponent from './page-component';
import React from 'react';
import { redirect } from 'next/navigation';

async function Page() {
  const session = await getSession();
  
  if (session?.user.onboardingCompleted) {
    return redirect('/articles');
  }

  return <PageComponent />;
}

export default Page;
