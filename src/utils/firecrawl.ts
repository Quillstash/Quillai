// lib/firecrawl.ts
import FirecrawlApp from "@mendable/firecrawl-js";
import { z } from "zod";

const app = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY
});

// Update the regex in extractBlogLinksFromMarkdown
function extractBlogLinksFromMarkdown(markdown: string) {
    const blogEntries: string[] = [];
    // More robust regex pattern
    const regex = /\[[^\]]*\]\((https?:\/\/[^\s)]+)/g;
    
    let match: RegExpExecArray | null;
    match = regex.exec(markdown);
    while (match !== null) {
      if (match[1]) {
        blogEntries.push(match[1]);
      }
      match = regex.exec(markdown);
    }
    
    return blogEntries;
  }


// Simplified schema without format specifications
const extractSchema = z.object({
    title: z.preprocess(
      (val) => Array.isArray(val) ? val[0] : val, // Take first array element if array
      z.string().nullable().transform(val => val || null)
    ),
    metaDescription: z.string().nullable().transform(val => val || null),
    blogLinks: z.array(z.string().url()).nullable().transform(val => val || [])
  });

export async function crawlWebsite(url: string) {
  try {
    const scrapeResult = await app.scrapeUrl(url);

     // Process the result with our schema
     const processedData = extractSchema.parse({
        title: scrapeResult.success ? scrapeResult.metadata?.title : null,
        metaDescription: scrapeResult.success ? scrapeResult.metadata?.description : null,
        blogLinks: scrapeResult.success && scrapeResult.markdown ? extractBlogLinksFromMarkdown(scrapeResult.markdown) : []
      });

    console.log('Crawl Resultssss:');
    console.dir(processedData, { depth: null });  // <<-- This will show full objects


    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`);
    }
  
    return {
        success: true,
        data: {
          ...processedData,
          siteUrl: url // Add the original crawled URL here
        }
      };
  } catch (error) {
    console.error('Firecrawl error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}