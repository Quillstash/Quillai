import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

interface ArticleRating {
  rating: string;
  comment: string;
}

interface ArticleAnalysis {
  wordCount: number;
  seo: ArticleRating;
  structure: ArticleRating;
  tone: ArticleRating;
}

interface UIMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Helper function to validate rating
function validateRating(rating: string): string {
  const validRatings = ['A+', 'A-', 'B+', 'B-', 'C'];
  return validRatings.includes(rating) ? rating : 'B-';
}

// Helper function to ensure comment is not empty
function validateComment(comment: string): string {
  return comment?.trim() || 'Analysis not available.';
}

// Helper function to extract rating and comment with better error handling
function extractAnalysisSection(text: string, section: string): ArticleRating {
  const sectionRegex = new RegExp(`${section}:\\s*\\n?Rating:\\s*(A\\+|A-|B\\+|B-|C)\\s*\\n?Comment:\\s*([^\\n]+)`, 'i');
  const match = text.match(sectionRegex);

  if (match) {
    return {
      rating: validateRating(match[1]),
      comment: validateComment(match[2])
    };
  }

  // Fallback to simpler regex patterns if the first attempt fails
  const ratingMatch = text.match(new RegExp(`${section}[^\\n]*Rating:\\s*(A\\+|A-|B\\+|B-|C)`, 'i'));
  const commentMatch = text.match(new RegExp(`${section}[^\\n]*Comment:\\s*([^\\n]+)`, 'i'));

  return {
    rating: validateRating(ratingMatch?.[1] || ''),
    comment: validateComment(commentMatch?.[1] || '')
  };
}

export async function analyzeArticle(article: string): Promise<ArticleAnalysis> {
  // Calculate word count more accurately by handling multiple spaces and special characters
  const wordCount = article
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim()
    .split(' ')
    .filter(word => word.length > 0)
    .length;

  const systemMessage: UIMessage = {
    role: 'assistant',
    content: `You are an expert content analyst. Analyze the given article and provide a detailed assessment in exactly this format:

SEO:
Rating: [RATE A+, A-, B+, B-, or C]
Comment: [1-2 sentence specific feedback]

Structure:
Rating: [RATE A+, A-, B+, B-, or C]
Comment: [1-2 sentence specific feedback]

Tone:
Rating: [RATE A+, A-, B+, B-, or C]
Comment: [1-2 sentence specific feedback]

Base your analysis on:
- SEO: keyword usage, meta elements, heading structure, link opportunities
- Structure: organization, paragraph flow, heading hierarchy, content balance
- Tone: readability, engagement, consistency, target audience alignment`
  };

  const userMessage: UIMessage = {
    role: 'user',
    content: `Analyze this ${wordCount}-word article. Provide ratings and specific comments for SEO, structure, and tone:\n\n${article}`
  };

  try {
    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      messages: [systemMessage, userMessage],
      temperature: 0.7,
      maxTokens: 500, // Increased token limit for more detailed analysis
      // stop: ['\n\n\n'] // Prevent unnecessary spacing
    });

    // Extract analysis sections with better error handling
    const seo = extractAnalysisSection(text, 'SEO');
    const structure = extractAnalysisSection(text, 'Structure');
    const tone = extractAnalysisSection(text, 'Tone');

    // Validate the analysis before returning
    const analysis: ArticleAnalysis = {
      wordCount,
      seo,
      structure,
      tone
    };

    // Log analysis for debugging
    console.log('Article Analysis:', JSON.stringify(analysis, null, 2));

    return analysis;

  } catch (error) {
    console.error('Error analyzing article:', error);
    // Return a default analysis instead of null
    return {
      wordCount,
      seo: { rating: 'B-', comment: 'Analysis failed: Please try again.' },
      structure: { rating: 'B-', comment: 'Analysis failed: Please try again.' },
      tone: { rating: 'B-', comment: 'Analysis failed: Please try again.' }
    };
  }
}