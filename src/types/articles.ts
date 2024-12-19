export interface ArticleGenerationParams {
    title: string;
    keywords: string[];
    tone: 'professional' | 'casual' | 'academic' | 'conversational';
    targetAudience: string;
    // length: string;
  }
  
  export interface GenerationQuota {
    userId: string;
    tokensRemaining: number;
    resetDate: Date;
    plan: 'free' | 'basic' | 'premium';
  }