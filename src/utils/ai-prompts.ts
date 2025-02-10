export const generateSectionPrompts = (
  basePrompt: string,
  title: string,
  keyword: string,
  metaDescription: string,
  blogLinks: string[],
  siteUrl: string
) => {
  const maxSectionLength = {
    introduction: 200,
    bodySection1: 400,
    bodySection2: 400,
    conclusion: 200,
  };

  return [
    // Introduction Section
    `${basePrompt}
      
      Generate ONLY the Introduction section (${maxSectionLength.introduction} words max):
      
      Requirements:

      - Ensure the introduction is directly relevant to the title: "${title}"
      - Emphasize ${siteUrl}'s expertise in the first paragraph.
      - Use a brand-specific hook related to "${metaDescription?.split(" ")[0] || keyword}".
      1. Start with a compelling statistic, question, or surprising fact about "${keyword}" that ties back to "${title}".
      2. Include the primary keyword "${keyword}" naturally in the first 50 words.
      3. Clearly state the main problem or challenge readers face regarding "${title}".
      4. Outline 3 specific benefits readers will gain from this article.
      5. End with a transition sentence to the first body section.

      - Use bold, italic, underline, mark, and other text formatting to emphasize key points.

      DO NOT:
      - Include detailed explanations (save for body sections).
      - Use generic openings like "In today's world..." or "In recent years...".
      - Mention topics that won't be covered.
      - Include any conclusions or solutions yet.
     ` ,

    // Body Section 1
    `${basePrompt}
      
      Generate ONLY Body Section 1 (${maxSectionLength.bodySection1} words max):
      
      Requirements:
      - Directly relate all content to the title: "${title}"
      1. Start with a clear H2 heading containing a semantic variation of "${keyword}".
      2. Use ${siteUrl}'s preferred terminology.
      3. Break the section into 2-3 H3 subheadings exploring different aspects of "${title}".
      4. Include at least one of:
         - A recent industry statistic (2023 or later).
         - An expert quote with attribution.
         - A real-world example or case study related to "${title}".
      5. Use bullet points to break down complex concepts.

      - Include bold, italic, underline, mark, and other text formatting to emphasize key points.

      Focus on:
      - Current industry trends and challenges relevant to "${title}".
      - Fundamental concepts and definitions tied to "${keyword}".
      - Historical context or evolution of "${keyword}" and its impact on "${title}".

      DO NOT:
      - Overlap with Body Section 2 (which covers practical applications and solutions).
      - Include basic information already covered in the introduction.
      - Make conclusions or recommendations yet.
      `,

    // Body Section 2
    `${basePrompt}
      
      Generate ONLY Body Section 2 (${maxSectionLength.bodySection2} words max):
      
      Requirements:
      - Ensure all content relates back to the title: "${title}".
      1. Start with an H2 heading focused on solutions or implementations related to "${title}".
      2. Create 2-3 H3 subheadings covering practical applications of "${keyword}".
      3. Include at least:
         - A step-by-step process or methodology.
         - Practical tips or best practices.
         - Common pitfalls to avoid.
      4. Use numbered lists for sequential procedures.
      5. Mention relevant tools, technologies, or resources.

      - Format text with the appropriate HTML tags
      - Include bold, italic, underline, internal links, mark, and other text formatting with the appropriate HTML tags.
      - Ensure the content includes a call-to-action specific to ${siteUrl}.
      - Align content with the meta description's focus on "${metaDescription?.split(":")[0] || "key theme"}".

      Focus on:
      - Practical implementation strategies related to "${title}".
      - Future trends and predictions within "${keyword}".
      - Expert recommendations and insights.

      Previous sections covered:
      - Fundamental concepts and definitions.
      - Historical context and industry trends.

      DO NOT:
      - Repeat information from Body Section 1.
      - Introduce new fundamental concepts.
      - Include basic definitions or context already covered.
      `,

    // Conclusion Section
    `${basePrompt}
      
      Generate ONLY the Conclusion section (${maxSectionLength.conclusion} words max):
      
      Requirements:
      - The conclusion must relate back to the title: "${title}".
      1. Begin by addressing the main problem introduced in the introduction.
      2. Summarize the 3 most important takeaways from the article without introducing new information.
      3. Include a forward-looking statement about the future of "${keyword}" in the context of "${title}".
      4. End with one of the following:
         - A thought-provoking question for readers.
         - A clear call-to-action relevant to ${siteUrl}.
         - A memorable quote or statistic related to "${keyword}".

      - Format text with the appropriate HTML tags
      - Use bold, italic, underline, mark, and other text formatting for emphasis.

      Previous sections covered:
      - Introduction: Problem statement and benefits.
      - Body Section 1: Fundamental concepts and industry trends.
      - Body Section 2: Practical applications and solutions.

      DO NOT:
      - Introduce new concepts or information.
      - Repeat exact phrases from previous sections.
      - Use generic conclusions like "In conclusion..." or "To sum up...".
      - Include additional examples or case studies.
      `,
  ];
};
