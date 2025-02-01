// lib/firecrawl.ts
import FirecrawlApp from "@mendable/firecrawl-js";
import { z } from "zod";

const app = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

// Helper function to filter out irrelevant links
function isRelevantLink(link: string): boolean {
  // Exclude image links (common image extensions)
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  if (imageExtensions.some((ext) => link.toLowerCase().includes(ext))) {
    return false;
  }

  // Exclude links with query parameters that look like IDs (e.g., ?itemId=...)
  if (/\?.*id=/i.test(link)) {
    return false;
  }

  // Include only links that are part of the main domain and not external
  const mainDomain = new URL(link).hostname;
  if (!link.includes(mainDomain)) {
    return false;
  }

  return true;
}

// Update the regex in extractBlogLinksFromMarkdown
function extractBlogLinksFromMarkdown(markdown: string): string[] {
  const blogEntries: string[] = [];
  // More robust regex pattern
  const regex = /\[[^\]]*\]\((https?:\/\/[^\s)]+)/g;

  let match: RegExpExecArray | null;
  match = regex.exec(markdown);
  while (match !== null) {
    if (match[1] && isRelevantLink(match[1])) {
      blogEntries.push(match[1]);
    }
    match = regex.exec(markdown);
  }

  return blogEntries;
}

// Function to remove duplicate links
function removeDuplicateLinks(links: string[]): string[] {
  return Array.from(new Set(links)); // Convert to Set to remove duplicates, then back to array
}

// Simplified schema without format specifications
const extractSchema = z.object({
  title: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val), // Take first array element if array
    z
      .string()
      .nullable()
      .transform((val) => val || null)
  ),
  metaDescription: z.preprocess(
    (val) => {
      if (Array.isArray(val)) {
        // If metaDescription is an array, take the first element or join into a single string
        return val[0] || val.join(" ");
      }
      return val;
    },
    z
      .string()
      .nullable()
      .transform((val) => val || null)
  ),
  blogLinks: z
    .array(z.string().url())
    .nullable()
    .transform((val) => val || []),
});

export async function crawlWebsite(url: string) {
  try {
    const scrapeResult = await app.scrapeUrl(url);

    // Extract and filter blog links
    const blogLinks = scrapeResult.success && scrapeResult.markdown ? extractBlogLinksFromMarkdown(scrapeResult.markdown) : [];

    // Remove duplicate links
    const uniqueBlogLinks = removeDuplicateLinks(blogLinks);

    // Process the result with our schema
    const processedData = extractSchema.parse({
      title: scrapeResult.success ? scrapeResult.metadata?.title : null,
      metaDescription: scrapeResult.success ? scrapeResult.metadata?.description : null,
      blogLinks: uniqueBlogLinks, // Use the deduplicated links
    });

    console.log("Crawl Results:");
    console.dir(processedData, { depth: null }); // <<-- This will show full objects

    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`);
    }

    return {
      success: true,
      data: {
        ...processedData,
        siteUrl: url, // Add the original crawled URL here
      },
    };
  } catch (error) {
    console.error("Firecrawl error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}