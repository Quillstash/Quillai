import {  NextResponse } from 'next/server';
import { auth } from '@/auth';
import db from '@/lib/db';


export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    return NextResponse.json(transformedArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

