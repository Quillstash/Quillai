"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Filter, Search, RefreshCw } from 'lucide-react'
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ArticleGenerationStatus } from "@/app/(app)/articles/pageComponent"
import { Article } from "@prisma/client"

interface ExtendedArticle extends Article {
  author: {
    name: string | null;
    image: string | null;
  };
}

interface ArticlesTableProps {
  articles: ExtendedArticle[]
  generationStatus: ArticleGenerationStatus | null
  isRefreshing: boolean
  onRefresh: () => void
}

export function ArticlesTable({ 
  articles: initialArticles, 
  generationStatus,
  isRefreshing,
  onRefresh
}: ArticlesTableProps) {
  const [view, setView] = useState<"simple" | "full">("simple")

  // Modify the rendering logic to handle temporary generation status
  const displayArticles = generationStatus && generationStatus.status === 'generating'
    ? [
        {
          id: 'temp-generating',
          title: generationStatus.title,
          generatingState: 'GENERATING',
          keywords: [],
          author: { 
            name: 'AI Generator', 
            image: '',
          },
          createdAt: new Date(),
          slug: '' // Add a placeholder slug
        } as ExtendedArticle,
        ...initialArticles
      ]
    : initialArticles

  // Status rendering function
  const renderStatus = (generatingState: string) => {
    switch (generatingState) {
      case 'GENERATING':
        return (
          <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
            Generating
            <span className="ml-1 text-purple-500">•</span>
          </span>
        )
      case 'DRAFT':
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
            Draft
          </span>
        )
      case 'GENERATED':
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Generated
          </span>
        )
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            Cancelled
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search articles" className="pl-8" />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            disabled={isRefreshing}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <div className="space-x-2 flex items-center">
          <Button
            variant={view === "simple" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setView("simple")}
          >
            Simple Table
          </Button>
          <Button
            variant={view === "full" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setView("full")}
          >
            Full Table
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Article title</TableHead>
              <TableHead>Keywords</TableHead>
              <TableHead>Created by</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayArticles.map((article) => (
              <TableRow 
                key={article.id}
                className={`
                  ${article.id === 'temp-generating' ? 'bg-purple-50' : ''}
                  ${isRefreshing ? 'opacity-50' : ''}
                `}
              >
                <TableCell>
                  <Checkbox disabled={isRefreshing} />
                </TableCell>
                <TableCell className="font-medium">
                  {article.id === 'temp-generating' ? (
                    <span className="text-gray-500">{article.title}</span>
                  ) : (
                    <Link 
                      href={`articles/${article.slug}`} 
                      className={`hover:underline ${isRefreshing ? 'pointer-events-none' : ''}`}
                    >
                      {article.title}
                    </Link>
                  )}
                </TableCell>
                <TableCell>{article.keywords.join(", ")}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={article.author.image || undefined} alt={article.author.name || undefined} />
                      <AvatarFallback>{article.author.name ? article.author.name.charAt(0) : 'U'}</AvatarFallback>
                    </Avatar>
                    <span>{article.author.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {renderStatus(article.generatingState)}
                </TableCell>
                <TableCell>
                  {article.id === 'temp-generating' 
                    ? 'Generating now...' 
                    : formatDistanceToNow(article.createdAt, { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
            
            {displayArticles.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No articles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

