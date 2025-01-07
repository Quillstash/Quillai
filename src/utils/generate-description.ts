import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";


export async function generateDescription(articleTitle: string): Promise<string | null> {
  const prompt = `Generate a concise, SEO-friendly summary of an article based only on the title '${articleTitle}'. The summary should be between 150-160 characters. remove any "" from the response`;
  let description = '';
  try {
      const openaiResponse = await generateText({
        model: openai("gpt-3.5-turbo"),
        messages: [
          {
            role: "system",
            content: "You are an AI assistant that generates concise, SEO-friendly article descriptions."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      });

      description = openaiResponse.text.trim();
    

    // Ensure the description is within the desired character range
    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }

    return description;
  } catch (error) {
    console.error('Error generating description:', error);
    return null; // Fallback description
  }
}

