import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FileText } from 'lucide-react';

const getRatingDescription = (rating: string) => {
  switch (rating) {
    case 'A+':
      return 'Excellent';
    case 'A-':
      return 'Very Optimized';
    case 'B+':
      return 'Very Good';
    case 'B-':
      return 'Good';
    case 'C':
      return 'Average';
    default:
      return 'Not Rated';
  }
};

const ArticleAnalysisCard = ({ 
  wordCount, 
  articleRating, 
  ratingComment 
}: { 
  wordCount: number;
  articleRating: string;
  ratingComment: string;
}) => {
  // Parse the ratings and comments
  const ratings = articleRating?.split(', ').map(r => {
    const [category, rating] = r.split(': ');
    return { category, rating };
  }) || [];

  const comments = ratingComment?.split('\n').map(c => {
    const [category, comment] = c.split(': ');
    return { category, comment };
  }) || [];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Article Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Word Count */}
        <div className="mb-4">
          <span className="text-sm text-muted-foreground">Word Count:</span>
          <span className="ml-2 font-medium">{wordCount}</span>
        </div>

        {/* Ratings Overview */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {ratings.map(({ category, rating }, index) => (
            <div key={index} className="flex flex-col items-center p-2 bg-secondary rounded-lg">
              <span className="text-xs text-muted-foreground mb-1">{category}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-sm font-medium px-3 py-1 bg-background rounded-full border hover:bg-accent transition-colors">
                      {rating}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">{getRatingDescription(rating)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>

        {/* Detailed Comments */}
        <Accordion type="single" collapsible className="w-full">
          {comments.map(({ category, comment }, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-sm">
                {category} Analysis
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {comment}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ArticleAnalysisCard;