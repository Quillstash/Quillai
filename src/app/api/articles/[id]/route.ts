import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { z } from 'zod';
import db from '@/lib/db';

const articleUpdateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(100, 'Title is too long'),
  description: z.string().nullable(),
  content: z.string(),
  coverImage: z.string().url().nullable(),
  keywords: z.array(z.string()),
  metaDescription: z.string().nullable(),
});

async function validateRequest() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return session.user;
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const user = await validateRequest();
    if (!user) return;

    const deletedArticle = await db.article.delete({
      where: { id: id, authorId: id },
    });

    if (!deletedArticle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
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
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const user = await validateRequest();
    if (!user) return;

    const body = await req.json();
    const validatedData = articleUpdateSchema.parse(body);

    const updatedArticle = await db.article.update({
      where: { id: id, authorId: id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    });

    if (!updatedArticle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, article: updatedArticle });
  } catch (error) {
    console.error('Update article error:', error);

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
