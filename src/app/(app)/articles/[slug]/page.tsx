import { notFound, redirect } from 'next/navigation';
import ArticleComponent from './pageComponent';
import db from '@/lib/db';
import getSession from '@/auth/session';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
  }

  const article = await db.article.findFirst({
    where: {
      slug,
      authorId: session.user.id,
    },
  });

  if (!article) {
    notFound();
  }

  return (
    <>
      <ArticleComponent article={article} />
    </>
  );
}
