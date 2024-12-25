import OpenAI from 'openai';
import { searchUnsplashImages } from './upsplash';
import DOMPurify from 'isomorphic-dompurify';
import { PrismaClient } from '@prisma/client';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ArticleGenerationInput {
  keyword: string;
  userId: string;
}

interface GeneratedContent {
  html: string;
  imagePrompts: string[];
  title: string;
}

// Helper function to clean unwanted tags or text
function cleanContent(content: string): string {
  // Remove triple backticks and code block markers
  const withoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '');

  // Remove extra HTML tags if necessary
  const withoutUnwantedTags = withoutCodeBlocks.replace(
    /<(?!\/?(p|h[1-6]|b|i|ul|ol|li|a|blockquote|span|strong|em|br|hr)(?=>|\s.*>))\/?.*?>/g,
    ''
  );

  // Optionally trim or normalize white spaces
  return withoutUnwantedTags.trim();
}

async function generateTitle(keyword: string): Promise<string> {
  const titlePrompt = `
    Generate a compelling, SEO-optimized article title about "${keyword}".
    The title should be:
    - Engaging and click-worthy
    - Between 40-60 characters
    - Include the keyword naturally
    - Promise value to the reader
    - High volume Low keyword difficulty
    
    Return only the title text, output without "", nothing else.
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert SEO copywriter specializing in creating engaging titles.',
      },
      { role: 'user', content: titlePrompt },
    ],
    temperature: 0.7,
    max_tokens: 50,
  });
  console.log(completion.choices[0].message);
  const rawTitle = completion.choices[0].message?.content?.trim() || '';

  // Remove unnecessary punctuation or quotes
  const cleanedTitle = rawTitle.replace(/^"|"$/g, ''); // Remove surrounding double quotes if present
  return cleanedTitle;
}

async function generateImagePrompts(
  title: string,
  keyword: string
): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Generate concise, descriptive image prompts for Unsplash searches based on article headings. Focus on tech-related, professional imagery.',
        },
        {
          role: 'user',
          content: `Generate 3, simple, single word image search prompt for upsplash based of the article title: ${title} and keyword: ${keyword}`,
        },
      ],
      temperature: 0.7,
    });

    const promptsText = completion.choices[0].message.content || '';
    console.log('Generated image prompts:', promptsText);
    return promptsText
      .split('\n')
      .filter((prompt) => prompt.trim())
      .slice(0, 2);
  } catch (error) {
    console.error('Error generating image prompts:', error);
    throw new Error('Failed to generate image prompts');
  }
}

export async function generateArticleContent(
  { keyword, userId }: ArticleGenerationInput,
  prisma: PrismaClient
): Promise<GeneratedContent> {
  // Fetch user preferences
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      preferredTone: true,
      targetAudience: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const title = await generateTitle(keyword);

  const basePrompt = `
    Generate a high-quality, SEO-optimized, and human-like article using the following guidelines:
    
    Topic: ${title}
    Target audience: ${user.targetAudience || 'general readers'}
    Article length: 1000 - 1200 words
    Tone: ${user.preferredTone || 'professional'}
    
    Keyword to optimize for: ${keyword}
    
    Article structure:
    - Engaging introduction with a hook
    - Clear and informative headings and subheadings (use H2, H3, H4, bold tags appropriately)
    - Short, easy-to-read paragraphs (3-4 sentences each)
    - Bullet points or numbered lists where appropriate
    - Include quotes from notable sites or people
    - Conclusion with a thought-provoking question
    
    SEO optimization:
    - Include keyword in the first paragraph and headings
    - Use keyword variations naturally throughout
    - Include internal and external link placeholders
    - Offer a unique perspective or angle on the topic
    - Include up-to-date information and recent developments
    - Use transitional phrases between paragraphs
    
    Content guidelines:
    - Write in a ${user.preferredTone || 'professional'} tone
    - Use active voice and present tense
    - Include current statistics and studies
    - Provide actionable insights
    - Address reader questions proactively
    
    Format output in clean, renderable HTML.
  `;

  const sectionPrompts: Record<string, string> = {
    Introduction: `${basePrompt}\n\nGenerate only the "Introduction" section. Create an engaging hook to draw the reader in, provide a brief overview of the topic "${title}", and highlight the article's value to the reader. Avoid detailed explanations or content that overlaps with body sections.`,
    'Body Section 1': `${basePrompt}\n\nGenerate only the "Body Section 1". Focus on the first major aspect of the topic "${title}". Provide clear explanations, relevant examples, and actionable insights. Ensure this section introduces fresh content without overlapping with the Introduction or other sections.`,
    'Body Section 2': `${basePrompt}\n\nGenerate only the "Body Section 2". Explore a new angle or subtopic related to "${title}" that complements but doesn't repeat Body Section 1. Include data, practical applications, or insights, and maintain a logical flow from the first body section.`,
    Conclusion: `${basePrompt}\n\nGenerate only the "Conclusion" section. Summarize the key points of the article, provide a thought-provoking question or call to action, and leave the reader with a memorable takeaway. Avoid repeating content from the Introduction or Body Sections.`,
  };

  const generatedSections: string[] = [];

  try {
    for (const section in sectionPrompts) {
      const sectionPrompt = sectionPrompts[section];
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert tech content writer specializing in SEO-optimized articles.',
          },
          { role: 'user', content: sectionPrompt },
        ],
        temperature: 0.6,
        max_tokens: 1500,
        top_p: 0.8,
        frequency_penalty: 0.5,
        presence_penalty: 0.7,
      });

      const sectionContent = completion?.choices?.[0]?.message?.content || '';
      generatedSections.push(sectionContent);
    }

    const fullContent = generatedSections.join('\n');
    const sanitizedContent = DOMPurify.sanitize(fullContent);
    const cleanedContent = cleanContent(sanitizedContent);

    const imagePrompts = await generateImagePrompts(title, keyword);

    return {
      html: cleanedContent,
      imagePrompts,
      title,
    };
  } catch (error) {
    console.error('Error generating article:', error);
    throw new Error('Failed to generate article content.');
  }
}

export async function enhanceArticleWithImages(
  content: GeneratedContent
): Promise<string> {
  if (!content || !content.html || content.imagePrompts.length < 2) {
    console.error('Insufficient content or image prompts');
    return '';
  }

  let enhancedHtml = content.html;

  try {
    // Fetch and use the first prompt for the title image
    const titleImages = await searchUnsplashImages(content.imagePrompts[0], 1);
    if (titleImages.length > 0) {
      const titleImage = titleImages[0];
      const titleImageHtml = `
        <figure class="my-8">
          <img src="${titleImage.url}" alt="${titleImage.alt}" class="rounded-lg shadow-md w-full" />
          <figcaption class="text-sm text-gray-500 mt-2">
            Photo by <a href="${titleImage.credit.link}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${titleImage.credit.name}</a> on Unsplash
          </figcaption>
        </figure>`;
      enhancedHtml = titleImageHtml + enhancedHtml;
    }

    // Fetch and use the second prompt for the middle image
    const paragraphs = enhancedHtml.split('</p>');
    const middleIndex = Math.floor(paragraphs.length / 2);
    const middleImages = await searchUnsplashImages(content.imagePrompts[1], 1);

    if (middleImages.length > 0) {
      const middleImage = middleImages[0];
      const middleImageHtml = `
        <figure class="my-8">
          <img src="${middleImage.url}" alt="${middleImage.alt}" class="rounded-lg shadow-md w-full" />
          <figcaption class="text-sm text-gray-500 mt-2">
            Photo by <a href="${middleImage.credit.link}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${middleImage.credit.name}</a> on Unsplash
          </figcaption>
        </figure>`;

      paragraphs.splice(middleIndex, 0, middleImageHtml);
    }

    enhancedHtml = paragraphs.join('</p>');
    console.log('Enhanced content with images:', enhancedHtml);

    return enhancedHtml;
  } catch (error) {
    console.error('Error enhancing article with images:', error);
    throw new Error('Failed to enhance article with images.');
  }
}
