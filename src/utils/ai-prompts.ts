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
      
      Generate ONLY the Introduction section (${
        maxSectionLength.introduction
      } words max):
      
      Requirements:

      - Ensure the title is engaging and relevant to "${keyword}"
      - Mention ${siteUrl} expertise in first paragraph
    - Link 1 internal resource from: ${blogLinks.slice(0, 2).join(" or ")}
    - Include brand-specific hook related to ${
      metaDescription?.split(" ")[0] || keyword
    }
      1. Start with a compelling statistic, question, or surprising fact about "${keyword}"
      2. Include the primary keyword "${keyword}" naturally in the first 50 words
      3. State the main problem or challenge readers face regarding "${title}"
      4. Outline 3 specific benefits readers will gain from this article
      5. End with a transition sentence to the first body section
        - include more bold, italic, uderline, mark and other text formatting tags to emphasize key points

      DO NOT:
      - Include detailed explanations (save for body sections)
      - Use generic openings like "In today's world..." or "In recent years..."
      - Mention topics that won't be covered
      - Include any conclusions or solutions yet`,

    // Body Section 1
    `${basePrompt}
      
      Generate ONLY Body Section 1 (${maxSectionLength.bodySection1} words max):
      
      Requirements:
      1. Start with a clear H2 heading containing a semantic variation of "${keyword}"
      - Every 300 words include internal link from: ${
        blogLinks.join(", ") || "generated suggestions"
      }
    - Use ${siteUrl} preferred terminology
    - Add "As we mentioned in [linked article]" references
      2. Break down into 2-3 H3 subheadings that explore different aspects
      3. Include at least one of:
         - Recent industry statistics (2023 or later)
         - Expert quote with attribution
         - Real-world example or case study
      4. Use bullet points to break down complex concepts
      5. Include LSI keywords related to "${keyword}"
          - include more bold, italic, uderline, mark and other text formatting tags to emphasize key points

      Focus on:
      - Current industry trends and challenges
      - Fundamental concepts and definitions
      - Historical context or evolution of "${keyword}"
      
      DO NOT:
      - Overlap with the planned content for Body Section 2 (which will cover practical applications and solutions)
      - Include basic or introductory information already covered
      - Make conclusions or recommendations yet`,

    // Body Section 2
    `${basePrompt}
      
      Generate ONLY Body Section 2 (${maxSectionLength.bodySection2} words max):
      
      Requirements:
      1. Start with a H2 heading focused on solutions or implementations
      2. Create 2-3 H3 subheadings covering practical applications
      3. Include at least:
         - Step-by-step process or methodology
         - Practical tips or best practices
         - Common pitfalls to avoid
      4. Use numbered lists for sequential procedures
      5. Include relevant tools, technologies, or resources
          - include more bold, italic, internal Link, mark and others to emphasize key points make sure to use the appropriate html tags
      - Include ${siteUrl} specific call-to-action
       - Link to most relevant resource: ${blogLinks[0] || "generated suggestion"}
        - Mirror ${metaDescription?.split(":")[0] || "key theme"} focus
    
      Focus on:
      - Practical implementation strategies
      - Future trends and predictions
      - Expert recommendations and insights
      
      Previous sections covered:
      - Basic concepts and definitions
      - Historical context and evolution
      - Industry trends and challenges
      
      DO NOT:
      - Repeat information from Body Section 1
      - Introduce new fundamental concepts
      - Include basic definitions or context already covered`,

    // Conclusion Section
    `${basePrompt}
      
      Generate ONLY the Conclusion section (${maxSectionLength.conclusion} words max):
      
      Requirements:
      1. Begin by addressing the main problem introduced in the introduction
      2. Summarize the 3 most important takeaways (without introducing new information)
      3. Include a forward-looking statement about "${keyword}"
      4. End with either:
         - A thought-provoking question
         - A clear call-to-action
         - A memorable quote or statistic
          - include more bold, italic, uderline, mark and other text formatting texts, use the appropriate html tags

      Previous sections covered:
      - Introduction: Problem statement and benefits
      - Body 1: Fundamental concepts and industry trends
      - Body 2: Practical applications and solutions
      
      DO NOT:
      - Introduce new concepts or information
      - Repeat exact phrases from previous sections
      - Use generic conclusions like "In conclusion..." or "To sum up..."
      - Include additional examples or case studies`,
  ];
};
