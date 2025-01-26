import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { z } from 'zod';
import db from '@/lib/db';
import { Session } from 'next-auth';

const articleUpdateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(100, 'Title is too long'),
  content: z.string(),
  coverImage: z.string().url().nullable(),
  keywords: z.array(z.string()),
  metaDescription: z.string().nullable(),
});

async function validateRequest(): Promise<Session['user'] | null> {
  const session = await auth();
  return session?.user || null;
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const user = await validateRequest();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const deletedArticle = await db.article.delete({
      where: { 
        id: id,
        authorId: user.id 
      },
    });

    if (!deletedArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, article: deletedArticle });
  } catch (error) {
    console.error('Delete article error:', error);
    
  

    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const user = await validateRequest();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    // console.log('Raw body:', body); // Log the raw body to see what's being received

    const validatedData = articleUpdateSchema.parse(body);
    // console.log('Validated data:', validatedData);
    
    const updatedArticle = await db.article.update({
      where: { id, authorId: user.id }, // Use user.id instead of id
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, article: updatedArticle });
  } catch (error) {
    console.error('Full error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}