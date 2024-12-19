import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { z } from 'zod';

import db from '@/lib/db';
import { searchUnsplashImages } from '@/utils/upsplash';
import { generateDescription } from '@/utils/generate-description';
import { generateSlug } from '@/lib/services';
import { enhanceArticleWithImages, generateArticleContent } from '@/utils/openai';

const articleGenerationSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').max(100, 'Title is too long'),
  keywords: z.array(z.string()),
  tone: z.enum(['professional', 'casual', 'academic', 'conversational', 'humorous', 'persuasive']),
  targetAudience: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requestBody = await req.json();
    const validatedData = articleGenerationSchema.parse(requestBody);

    // Create slug from title
    const slug = generateSlug(validatedData.title);

    // Create initial article in database with 'GENERATING' state
    const newArticle = await db.article.create({
      data: {
        title: validatedData.title,
        slug,
        content: '',
        keywords: validatedData.keywords,
        authorId: session.user.id,
        generatingState: 'GENERATING',
        generationCost: 2, // Default cost, adjust as needed
      },
    });

    // Start the content generation process
    await generateArticleContentAndUpdate(newArticle.id, validatedData);

    return NextResponse.json({
      success: true,
      article: newArticle,
    }, { status: 201 });
  } catch (error) {
    console.error('Article generation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to generate article',
    }, { status: 500 });
  }
}

async function generateArticleContentAndUpdate(articleId: string, data: z.infer<typeof articleGenerationSchema>) {
  try {
    console.log('Starting article generation for article:', articleId);

    // Generate article content
    const generatedContent = await generateArticleContent(data);

    // Get cover image
    const coverImages = await searchUnsplashImages(`${data.keywords[0]}`, 1);

    const metaDescription = await generateDescription(data.title);

    // Enhance article with embedded images
    const enhancedContent = await enhanceArticleWithImages(data, generatedContent);
    console.log('Enhanced content:', enhancedContent);

    // Update the article with enhanced content
    await db.article.update({
      where: { id: articleId },
      data: {
        content: enhancedContent,
        metaDescription: metaDescription || '',
        coverImage: coverImages[0]?.url || '',
        generatingState: 'GENERATED',
      },
    });

    console.log('Article generation completed for article:', articleId);
  } catch (error) {
    console.error('Error generating article content:', error);
    // Update the article to indicate generation failure
    await db.article.update({
      where: { id: articleId },
      data: { generatingState: 'CANCELLED' },
    });
  }
}

