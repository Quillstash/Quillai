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
  });
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: PageProps) {
  // Validate params first
  const { slug } = params;
  if (!slug) notFound();

  // Get session
  const session = await auth();
  if (!session?.user) redirect('/login');

  try {
    const article = await db.article.findFirst({
      where: {
        slug,
        authorId: session.user.id,
      },
    });

    if (!article) notFound();

    return <ArticleComponent article={article} />;
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = params;
  if (!slug) return { title: 'Article Not Found' };

  try {
    const article = await db.article.findFirst({
      where: {
        slug,
      },
    });

    if (!article) return { title: 'Article Not Found' };

    return {
      title: article.title,
      description: article.content,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'Article Not Found' };
  }
}