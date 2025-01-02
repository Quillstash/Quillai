import { auth } from '@/auth';
import db from '@/lib/db'; 
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  // Get session and validate user
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  const { keyword } = await request.json();

  const prompt = `
    Generate a list of 20 longtail and semantic keywords related to "${keyword}". 
    For each keyword, provide the following information:
    - Keyword: The generated keyword
    - Difficulty: A difficulty score from 1-100
    - Volume: An estimated monthly search volume
    - Intent: The search intent (informational, transactional, navigational, or commercial)

    Format the response as a JSON array of objects, each containing the properties: 
    keyword, difficulty, volume, and intent. Do not include any additional text or formatting outside of the JSON array.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    // Remove any potential markdown formatting
    const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();

    let parsedResults;
    try {
      parsedResults = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      console.log('Raw content:', content);
      throw new Error('Failed to parse OpenAI response');
    }

    if (!Array.isArray(parsedResults)) {
      throw new Error('Parsed result is not an array');
    }

    // Update the user's creditsUsed field in the database
    await db.user.update({
      where: { id: userId },
      data: { creditsUsed: { increment: 1 } },
    });

    return NextResponse.json(parsedResults);
  } catch (error) {
    console.error('Error processing OpenAI API response:', error);
    return NextResponse.json({ error: 'Failed to generate keywords' }, { status: 500 });
  }
}
