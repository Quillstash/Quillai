import { type NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { z } from 'zod';
import db from '@/lib/db';

const onboardingSchema = z.object({
  preferredTone: z.enum(['professional', 'casual', 'academic', 'conversational', 'humorous', 'persuasive']),
  targetAudience: z.string().min(1, 'Target audience is required'),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requestBody = await req.json();
    const validatedData = onboardingSchema.parse(requestBody);

    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        preferredTone: validatedData.preferredTone,
        targetAudience: validatedData.targetAudience,
        onboardingCompleted: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        preferredTone: updatedUser.preferredTone,
        targetAudience: updatedUser.targetAudience,
        onboardingCompleted: updatedUser.onboardingCompleted,
      },
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

