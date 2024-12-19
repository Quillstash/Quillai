import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import PageComponent from './pageComponent';
import db from '@/lib/db';

export const metadata: Metadata = {
  title: 'AI Generated Articles - Dashboard',
  description: 'View and manage your AI-generated articles',
};

export default async function AiArticlesPage() {
  const session = await auth();
  if (!session?.user) redirect('/sign-in');

  const aiArticles = await db.article.findMany({
    where: {
      authorId: session.user.id,
      generatingState: {
        not: 'CANCELLED'
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  // Transform the data to match the expected structure
  const transformedArticles = aiArticles.map(article => ({
    ...article,
    user: article.author,
  }));

  return <PageComponent initialArticles={transformedArticles} />;
}

