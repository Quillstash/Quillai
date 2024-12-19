import { Metadata } from 'next';
import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import ArticleComponent from './pageComponent';
import db from '@/lib/db';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = await db.article.findMany({
    select: { slug: true },
  })
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user) redirect('/sign-in');

  if (!params?.slug) notFound();

  const article = await db.article.findFirst({
    where: {
      slug: params.slug,
      authorId: session.user.id
    },
  });

  if (!article) notFound();

  return <ArticleComponent article={article} />;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!params?.slug) return { title: 'Article Not Found' };

  const article = await db.article.findFirst({  // Changed from findUnique to findFirst
    where: { 
      slug: params.slug 
    },
  });

  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.title,
    description: article.content,
  };
}