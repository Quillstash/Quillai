import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Adds relevant links to the generated article using GPT-3.5.
 * @param completeResponse The generated article without links.
 * @param blogLinks An array of blog links to reference.
 * @returns The enhanced article with relevant links.
 */
export async function addRelevantLinks(completeResponse: string, blogLinks: string[]): Promise<string> {
  // Construct the prompt for GPT-3.5
  const prompt = `
    You are a content optimization assistant. Your task is to enhance the following article by adding relevant CTAs and references using the provided blog links. Ensure the links are contextually relevant and fit naturally into the article.

    Article:
    ${completeResponse}

    Blog Links:
    ${blogLinks.map((link, index) => `${index + 1}. ${link}`).join("\n")}

    Instructions:
    1. Add 3-5 CTAs or references to the article using the provided blog links.
    - Include 3 Links in the introduction section
    - Include 3 Links in the body  section
    - Include 3 Links in the conclusion section
    2. Ensure the CTAs are natural and fit seamlessly into the article's flow.
    3. Use a tag formatting for links (href = "" target="_blank" rel="noopener noreferrer").
    4. Prioritize links that are most relevant to the article's content.
    5. include more bold, italic, uderline, mark and other text formatting texts, use the appropriate html tags where needed


    Return the content as clean HTML without any markdown or section markers.

  `;

  // Call GPT-3.5 to generate the enhanced article
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // Use GPT-3.5
    messages: [
      {
        role: "system",
        content: "You are a content optimization assistant. Your task is to enhance articles by adding relevant CTAs and references.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 2000, // Adjust based on the expected output length
    temperature: 0.7, // Balance creativity and relevance
  });

  // Extract the enhanced article from the response
  const enhancedArticle = response.choices[0].message.content;
  console.log(enhancedArticle)
  console.log(blogLinks)
  return enhancedArticle || completeResponse; // Fallback to the original article if no enhancement is made
}