// app/api/chat/route.ts
import { streamText } from "ai";
import db from "@/lib/db";
import { generateSlug } from "@/lib/services";

import { openai } from "@ai-sdk/openai";
import { searchUnsplashImages } from "@/utils/upsplash";
import { generateDescription } from "@/utils/generate-description";
import {
  enhanceArticleWithImages,
  generateImagePrompts,
  generateTitle,
} from "@/utils/openai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { keyword, userId } = await req.json();
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { preferredTone: true, targetAudience: true, credits: true, creditsUsed: true },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

    // Check if user has enough credits
    if (user.creditsUsed >= user.credits) {
      return new Response(JSON.stringify({ error: 'INSUFFICIENT_CREDITS' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  const title = await generateTitle(keyword);
  const slug = generateSlug(title);

  const article = await db.article.create({
    data: {
      title,
      slug,
      keywords: [keyword],
      generatingState: "GENERATING",
      content: "",
      authorId: userId,
    },
  });
  console.log(article)
  // const basePrompt = `
  //   Generate a high-quality, SEO-optimized, and human-like article using the following guidelines:

  //   Topic: ${title}
  //   Target audience: ${user.targetAudience || 'general readers'}
  //   Article length: 1000 - 1200 words
  //   Tone: ${user.preferredTone || 'professional'}
  //   Keyword to optimize for: ${keyword}

  //   Article structure:
  //   - Engaging introduction with a hook
  //   - Clear and informative headings and subheadings (use H2, H3, H4, bold tags appropriately)
  //   - Short, easy-to-read paragraphs (3-4 sentences each)
  //   - Bullet points or numbered lists where appropriate
  //   - Include quotes from notable sites or people
  //   - Conclusion with a thought-provoking question

  //   SEO optimization:
  //   - Include keyword in the first paragraph and headings
  //   - Use keyword variations naturally throughout
  //   - Include internal and external link placeholders
  //   - Offer a unique perspective or angle on the topic
  //   - Include up-to-date information and recent developments
  //   - Use transitional phrases between paragraphs

  //   Content guidelines:
  //   - Write in a ${user.preferredTone || 'professional'} tone
  //   - Use active voice and present tense
  //   - Include current statistics and studies
  //   - Provide actionable insights
  //   - Address reader questions proactively

  //   Format output in clean, renderable HTML.
  // `;

  // const sectionPrompts = [
  //   `${basePrompt}\n\nGenerate only the "Introduction" section. Create an engaging hook to draw the reader in, provide a brief overview of the topic "${title}", and highlight the article's value to the reader. Avoid detailed explanations or content that overlaps with body sections.`,
  //   `${basePrompt}\n\nGenerate only the "Body Section 1". Focus on the first major aspect of the topic "${title}". Provide clear explanations, relevant examples, and actionable insights. Ensure this section introduces fresh content without overlapping with the Introduction or other sections.`,
  //   `${basePrompt}\n\nGenerate only the "Body Section 2". Explore a new angle or subtopic related to "${title}" that complements but doesn't repeat Body Section 1. Include data, practical applications, or insights, and maintain a logical flow from the first body section.`,
  //   `${basePrompt}\n\nGenerate only the "Conclusion" section. Summarize the key points of the article, provide a thought-provoking question or call to action, and leave the reader with a memorable takeaway. Avoid repeating content from the Introduction or Body Sections.`,
  // ];

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages: [
      {
        role: "system",
        content:
          "You are an expert tech content writer specializing in SEO-optimized articles.",
      },
      {
        role: "user",
        content: `
        Generate a high-quality, SEO-optimized, and human-like article using the following guidelines:
    
    Topic: ${title}
    Target audience: ${user.targetAudience || "general readers"}
    Article length: 1000 - 1200 words
    Tone: ${user.preferredTone || "professional"}
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
    - Write in a ${user.preferredTone || "professional"} tone
    - Use active voice and present tense
    - Include current statistics and studies
    - Provide actionable insights
    - Address reader questions proactively
    
    Format output in clean, renderable HTML.
        `,
      },
    ],
    onFinish: async ({ response }) => {
      try {
        const messages = Array.isArray(response.messages)
          ? response.messages
          : [];

        const contentArray = messages
          .filter((msg) => msg.role === "assistant")
          .map((msg) => {
            try {
              // Parse the JSON content if it's a string
              const parsed =
                typeof msg.content === "string"
                  ? JSON.parse(msg.content)
                  : msg.content;

              // Extract the text content from the parsed object
              if (Array.isArray(parsed)) {
                return parsed
                  .filter((item) => item.type === "text")
                  .map((item) => {
                    // Remove the HTML code block markers if present
                    return item.text
                      .replace(/```html\n/, "")
                      .replace(/\n```/, "");
                  })
                  .join("\n");
              }
              return typeof parsed === "string"
                ? parsed
                : JSON.stringify(parsed);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
              // If parsing fails, return the original content
              return typeof msg.content === "string"
                ? msg.content
                : JSON.stringify(msg.content);
            }
          });

        const completeResponse = contentArray.join("\n\n");
        console.log("Complete article content:", completeResponse);

        // Generate image prompts
        const imagePrompts = await generateImagePrompts(title, keyword);
        console.log("Generated image prompts:", imagePrompts);

        // Get cover image
        const coverImages = await searchUnsplashImages(keyword, 1);

        // Generate meta description
        const metaDescription = await generateDescription(title);

        // Enhance article with embedded images
        const enhancedContent = await enhanceArticleWithImages(
          completeResponse,
          imagePrompts
        );

        await db.$transaction(async (tx) => {
          // Update the article
          await tx.article.update({
            where: { id: article.id },
            data: {
              content: enhancedContent,
              metaDescription,
              coverImage: coverImages[0]?.url || "",
              generatingState: "GENERATED",
            },
          });
  
          // Deduct credits and update creditsUsed for the user
          await tx.user.update({
            where: { id: userId },
            data: {
              creditsUsed: { increment: 2 },
            },
          });
        });
  
      } catch (error) {
        console.error("Failed to process completed article:", error);
  
        // Update article status to error within a transaction
        await db.$transaction(async (tx) => {
          await tx.article.update({
            where: { id: article.id },
            data: {
              generatingState: "CANCELLED",
            },
          });
  
          // Refund the credits if an error occurred
          await tx.user.update({
            where: { id: userId },
            data: {
              creditsUsed: { decrement: 2 },
            },
          });
        });
      }
    },
  });

  return result.toDataStreamResponse();
}
