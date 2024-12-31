import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { z } from 'zod';

import db from '@/lib/db';
// import { searchUnsplashImages } from '@/utils/upsplash';
// import { generateDescription } from '@/utils/generate-description';
// import { generateSlug } from '@/lib/services';
// import {  generateArticleContent } from '@/utils/openai';

const articleGenerationSchema = z.object({
  keyword: z.string().min(1, 'Keyword cannot be empty').max(50, 'Keyword is too long'),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has enough credits
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true }
    });

    if (!user || user.credits < 2) {
      return NextResponse.json({ 
        error: 'Insufficient credits to generate article' 
      }, { status: 403 });
    }

    const requestBody = await req.json();
    const validatedData = articleGenerationSchema.parse(requestBody);

    // Create initial article in database with 'GENERATING' state and empty title/slug
    const newArticle = await db.article.create({
      data: {
        title: '',
        slug: '',
        content: '',
        keywords: [validatedData.keyword],
        authorId: session.user.id!,
        generatingState: 'GENERATING',
        generationCost: 2,
      },
    });
    console.log('Initial article created');

    // Start the content generation process
    // await generateArticleContentAndUpdate(newArticle.id, validatedData.keyword);
    // console.log("Article data updated");

    const updatedArticle = await db.article.findUnique({
      where: { id: newArticle.id },
    });
    console.log('Updated article fetched', updatedArticle);

    return NextResponse.json({
      success: true,
      article: updatedArticle,
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

// export async function generateArticleContentAndUpdate(articleId: string, keyword: string) {
//   try {
//     console.log('Starting article generation for article:', articleId);

//     // Get user preferences from database
//     const article = await db.article.findUnique({
//       where: { id: articleId },
//       include: { author: true },
//     });

//     if (!article || !article.author) {
//       throw new Error('Article or author not found');
//     }

//     // Generate article content with our refactored function
//     const generatedContent = await generateArticleContent(
//       { 
//         keyword,
//         userId: article.author.id 
//       },
   
//     );

//     // Generate slug from the AI-generated title
//     const slug = generateSlug(generatedContent.title);

//     // Get cover image using the keyword
//     const coverImages = await searchUnsplashImages(keyword, 1);

//     // Generate meta description using the AI-generated title
//     const metaDescription = await generateDescription(generatedContent.title);

//     // Enhance article with embedded images
//     // const enhancedContent = await enhanceArticleWithImages(generatedContent);
//     // console.log('Enhanced content:', enhancedContent);

//     // Use a transaction to update both the article and user credits atomically
//     await db.$transaction(async (tx) => {
//       // Update the article with all generated content
//       await tx.article.update({
//         where: { id: articleId },
//         data: {
//           title: generatedContent.title,
//           slug: slug,
//           // content: enhancedContent,
//           metaDescription: metaDescription || '',
//           coverImage: coverImages[0]?.url || '',
//           generatingState: 'GENERATED',
//         },
//       });

//       // Deduct credits and update creditsUsed for the user
//       await tx.user.update({
//         where: { id: article.author.id },
//         data: {
        
//           creditsUsed: { increment: 2 },
//         },
//       });
//     });

//     console.log('Article generation and credit update completed for article:', articleId);
//   } catch (error) {
//     console.error('Error generating article content:', error);
//     // Update the article to indicate generation failure
//     await db.article.update({
//       where: { id: articleId },
//       data: { generatingState: 'CANCELLED' },
//     });
//     throw error;
//   }
// }