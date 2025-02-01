import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { searchUnsplashImages } from './upsplash';


export function cleanContent(content: string): string {
  const withoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '');
  const withoutUnwantedTags = withoutCodeBlocks.replace(
    /<(?!\/?(p|h[1-6]|b|i|ul|ol|li|a|blockquote|span|strong|em|br|hr)(?=>|\s.*>))\/?.*?>/g,
    ''
  );
  return withoutUnwantedTags.trim();
}

export async function generateTitle(keyword: string): Promise<string> {
  const { text } = await generateText({
    model: openai('gpt-3.5-turbo'),
    messages: [
      {
        role: 'system',
        content: 'You are an expert SEO copywriter specializing in creating engaging titles.',
      },
      {
        role: 'user',
        content: `Generate a compelling, SEO-optimized article title about "${keyword}". The title should be engaging, 40-60 characters, include the keyword naturally, promise value to the reader, and have high volume and low keyword difficulty. Return only the title text, without quotes or any other content.`,
      },
    ],
  });

  return text.trim().replace(/^"|"$/g, '');
}

export async function generateImagePrompts(title: string, keyword: string): Promise<string[]> {
  const { text } = await generateText({
    model: openai('gpt-3.5-turbo'),
    messages: [
      {
        role: 'system',
        content: 'Generate concise, descriptive image prompts for Unsplash searches based on article headings. Focus on tech-related, professional imagery.',
      },
      {
        role: 'user',
        content: `Generate 3 simple, single-word image search prompts for Unsplash based on the article keyword: ${keyword}`,
      },
    ],
  });

  return text.split('\n').filter((prompt) => prompt.trim()).slice(0, 2);
}



export async function enhanceArticleWithImages(
  content: string,
  imagePrompts: string[]
): Promise<string> {
  console.log(content,imagePrompts)
  if (!content || imagePrompts.length < 2) {
    console.error('Insufficient content or image prompts');
    return '';
  }

  let enhancedHtml = content;
  try {
    const [titleImages, middleImages] = await Promise.all([
      searchUnsplashImages(imagePrompts[0], 1),
      searchUnsplashImages(imagePrompts[1], 1),
    ]);

    if (titleImages.length > 0) {
      const titleImage = titleImages[0];
      const titleImageHtml = `
        <figure class="my-8">
          <img src="${titleImage.url}" alt="${titleImage.alt}" class="rounded-lg shadow-md w-full" />
          <figcaption class="text-sm text-gray-500 mt-2 mx-auto">
            Photo by <a href="${titleImage.credit.link}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${titleImage.credit.name}</a> on Unsplash
          </figcaption>
        </figure>`;
      enhancedHtml = titleImageHtml + enhancedHtml;
    }

    if (middleImages.length > 0) {
      const middleImage = middleImages[0];
      const middleImageHtml = `
        <figure class="my-8">
          <img src="${middleImage.url}" alt="${middleImage.alt}" class="rounded-lg shadow-md w-full" />
          <figcaption class="text-sm text-gray-500 mt-2 mx-auto">
            Photo by <a href="${middleImage.credit.link}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${middleImage.credit.name}</a> on Unsplash
          </figcaption>
        </figure>`;

      const paragraphs = enhancedHtml.split('</p>');
      const middleIndex = Math.floor(paragraphs.length / 2);
      paragraphs.splice(middleIndex, 0, middleImageHtml);
      enhancedHtml = paragraphs.join('</p>');
    }

    return enhancedHtml;
  } catch (error) {
    console.error('Error enhancing article with images:', error);
    throw new Error('Failed to enhance article with images.');
  }
}




