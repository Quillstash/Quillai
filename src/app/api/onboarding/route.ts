// app/api/onboarding/route.ts
import { type NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { z } from 'zod';
import db from '@/lib/db';
import { crawlWebsite } from '@/utils/firecrawl';

const onboardingSchema = z.object({
  preferredTone: z.enum(['professional', 'casual', 'academic', 'conversational', 'humorous', 'persuasive']),
  targetAudience: z.string().min(1, 'Target audience is required'),
  website: z.string().url('Please enter a valid website URL'),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requestBody = await req.json();
    const validatedData = onboardingSchema.parse(requestBody);
    
    // Crawl the website
    const crawlResult = await crawlWebsite(validatedData.website);
    console.log('Crawl Result:', crawlResult); // Log the crawl results

    // Even if crawling fails, we still want to update the user's preferences
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        preferredTone: validatedData.preferredTone,
        targetAudience: validatedData.targetAudience,
        siteUrl: validatedData.website,
        onboardingCompleted: true,
        // Only add these fields if crawl was successful and data exists
        ...(crawlResult.success && crawlResult.data && {
          metaDescription: crawlResult.data.metaDescription,
          blogLinks: crawlResult.data.blogLinks
        })
      },
    });

    console.log('Updated User:', updatedUser);
    
    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        preferredTone: updatedUser.preferredTone,
        targetAudience: updatedUser.targetAudience,
        // website: updatedUser.website,
        onboardingCompleted: updatedUser.onboardingCompleted,
      },
      crawlResult: crawlResult.success ? crawlResult.data : null,
    }, { status: 200 });
  } catch (error) {
    console.error('Onboarding error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to complete onboarding',
    }, { status: 500 });
  }
}