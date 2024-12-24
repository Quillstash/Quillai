import { Metadata } from 'next';
import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import ArticleComponent from './pageComponent';
import db from '@/lib/db';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for SSG
export async function generateStaticParams() {
  const articles = await db.article.findMany({
    select: { slug: true },
  });

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  // Await the params
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  if (!slug) {
    return { title: 'Article Not Found' };
  }

  try {
    const article = await db.article.findFirst({
      where: { slug },
    });

    if (!article) {
      return { title: 'Article Not Found' };
    }

    return {
      title: article.title,
      description: article.content,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'Article Not Found' };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  // Await the params
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // If no slug is provided, render a 404 page
  if (!slug) {
    notFound();
  }

  // Fetch the authenticated user
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  try {
    const article = await db.article.findFirst({
      where: {
        slug,
        authorId: session.user.id,
      },
    });

    // If no article is found for the given slug and user, render a 404 page
    if (!article) {
      notFound();
    }

    return <ArticleComponent article={article} />;
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
}