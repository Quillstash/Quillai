"use client";
import {
  Card,
 
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Search, Type, Sparkles, LineChart, Key } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      title: "Login & Get Started",
      description: "Create your account to access powerful SEO tools and article generation features.",
      icon: <LineChart className="w-6 h-6 text-blue-500" />,
      credits: null,
    },
    {
      title: "SEO Keyword Generator",
      description: "Generate a comprehensive list of relevant SEO keywords based on your target keyword to enhance your content strategy.",
      icon: <Key className="w-6 h-6 text-yellow-500" />,
      credits: "1 credit per generation",
    },
    {
      title: "Enter Your Keyword",
      description: "Input your target keyword on the articles page to begin the optimization process.",
      icon: <Search className="w-6 h-6 text-green-500" />,
      credits: null,
    },
    {
      title: "AI-Powered Generation",
      description: "Our AI automatically creates SEO-optimized content tailored to your business needs.",
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      credits: "2 credits per article",
    },
    {
      title: "Complete Content Solution",
      description: "Get fully optimized articles with relevant images and SEO enhancements automatically included.",
      icon: <Type className="w-6 h-6 text-orange-500" />,
      credits: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature) => (
        <Card key={feature.title.toLowerCase().replace(/\s+/g, '-')} className="border-2">
          <CardHeader className="flex flex-row items-center gap-4">
            {feature.icon}
            <div className="flex-1">
              <CardTitle className="text-lg">
                {feature.title}
              </CardTitle>
              <CardDescription>
                {feature.description}
              </CardDescription>
            </div>
          </CardHeader>
          {feature.credits && (
            <CardFooter className="pt-0">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {feature.credits}
              </p>
            </CardFooter>
          )}
        </Card>
      ))}
      
      <Card className="border-2 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg text-center">Credit System</CardTitle>
          <CardDescription className="text-center space-y-2">
            <p>• Article Generation: 2 credits per article</p>
            <p>• Keyword Generation: 1 credit per generation</p>
            <p className="mt-2">Start creating SEO-optimized content in minutes with QuillAi!</p>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};