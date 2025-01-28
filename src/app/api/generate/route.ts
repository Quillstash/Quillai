// app/api/chat/route.ts
import { streamText, type StreamTextResult } from "ai";
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
import { analyzeArticle } from "@/utils/article-eval";
import { generateSectionPrompts } from "@/utils/ai-prompts";

export const maxDuration = 30;

export async function POST(req: Request): Promise<Response> {
  const { keyword, userId } = await req.json();
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      preferredTone: true,
      targetAudience: true,
      credits: true,
      creditsUsed: true,
      siteUrl: true,
      metaDescription: true,
      blogLinks: true,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Check if user has enough credits
  if (user.creditsUsed >= user.credits) {
    return new Response(JSON.stringify({ error: "INSUFFICIENT_CREDITS" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
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
  console.log(user.siteUrl, user.blogLinks,user.metaDescription);
  const basePrompt = `
    Generate a high-quality, SEO-optimized, and human-like article using the following guidelines:

    Topic: ${title}
    Target audience: ${user.targetAudience || "general readers"}
    Article length: 1000 - 1200 words
    Tone: ${user.preferredTone || "professional"}
    Keyword to optimize for: ${keyword}

    Personalization Requirements:
      - Brand URL: ${user.siteUrl} (use for absolute internal links)
      - Preferred Internal Links: ${
        user.blogLinks.length > 0
          ? user.blogLinks.join(", ")
          : "Generate relevant internal links"
      }
      - Meta Direction: ${
        user.metaDescription || "Focus on comprehensive coverage"
      }


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
      - Create 2-3 internal links using absolute URLs (${user.siteUrl}/[slug])
      ${
        user.blogLinks.length > 0
          ? `- Prioritize linking to: ${ user.blogLinks.slice(0, 3).join(", ")}`
          : ""
      }
      - Align content structure with ${user.siteUrl}'s existing content strategy


    Content guidelines:
    - Write in a ${user.preferredTone || "professional"} tone
    - Use active voice and present tense
    - Include current statistics and studies
    - Provide actionable insights
    - Address reader questions proactively
    - Mirror ${user.siteUrl}'s brand voice in tone and examples
    - Reference ${user.siteUrl} as an authority where appropriate
    - Use real examples from ${user.siteUrl}'s existing content when possible

 Formatting requirements:
    - Do not include section labels like "Body Section 1" or "Introduction" but ensure the content is structured accordingly
    - Remove any markdown code block indicators 
    - Ensure proper nesting of HTML tags 
    - Use semantic HTML for structure
    - Include appropriate spacing between sections and paragraphs
    - include more bold, italic, uderline, mark and other text formatting tags to emphasize key points

    Return the content as clean HTML without any markdown or section markers.
  `;

  const sectionPrompts = generateSectionPrompts(basePrompt, title, keyword, user.siteUrl ?? '' ,user.blogLinks, user.metaDescription ?? '');

  let articleSections: string[] = [];

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const streamResults: StreamTextResult<any>[] = await Promise.all(
      sectionPrompts.map((prompt, index) =>
        streamText({
          model: openai("gpt-3.5-turbo"),
          messages: [
            {
              role: "system",
              content:
                "You are an expert tech content writer specializing in SEO-optimized articles.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          onChunk: ({ chunk }) => {
            if (chunk.type === "text-delta") {
              process.stdout.write(`Section ${index + 1}: ${chunk.textDelta}`);
            }
          },
        })
      )
    );

    for (const result of streamResults) {
      let sectionContent = "";
      for await (const chunk of result.textStream) {
        sectionContent += chunk;
      }
      articleSections.push(sectionContent);
    }

    // Process the generated content
    articleSections = articleSections
      .map((section) => {
        try {
          const cleaned = section
            .replace(/```\s*html\n?/g, "")
            .replace(/```/g, "")
            .replace(/Body Section \d+:/g, "")
            .replace(/Introduction:/g, "")
            .replace(/Conclusion:/g, "")
            .trim();

          return cleaned;
        } catch (error) {
          console.error("Failed to process completed article:", error);
          return "";
        }
      })
      .filter((section): section is string => section !== undefined);

    const completeResponse = articleSections.join("\n\n");
    console.log("Complete article content:", completeResponse);

    // Generate image prompts
    const imagePrompts = await generateImagePrompts(title, keyword);
    console.log("Generated image prompts:", imagePrompts);

    // Get cover image
    const coverImages = await searchUnsplashImages(keyword, 1);

    // Analyze the article
    const analysis = await analyzeArticle(completeResponse);

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
          wordCount: analysis?.wordCount || 0,
          articleRating: `SEO: ${analysis?.seo.rating || "N/A"}, Structure: ${
            analysis?.structure.rating || "N/A"
          }, Tone: ${analysis?.tone.rating || "N/A"}`,
          RatingComment: `SEO: ${analysis?.seo.comment || "N/A"}\nStructure: ${
            analysis?.structure.comment || "N/A"
          }\nTone: ${analysis?.tone.comment || "N/A"}`,
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
    return new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(
            JSON.stringify({ success: true, article: enhancedContent })
          );
          controller.close();
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
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

    return new Response(
      JSON.stringify({ success: false, message: "Failed to generate article" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
