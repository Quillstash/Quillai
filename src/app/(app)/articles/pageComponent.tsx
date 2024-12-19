"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from 'lucide-react'
import { ArticleGeneratorModal } from "@/components/article/articleGeneratorModal"
import { ArticlesTable } from "@/components/article/article-Table"

// Define types based on the Prisma schema
type Article = {
  id: string;
  title: string;
  description: string;
  metaDescription?: string | null;
  keywords: string[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  generationCost: number;
  generatingState: 'GENERATED' | 'GENERATING' | 'DRAFT' | 'CANCELLED';
  coverImage?: string | null;
  user: {
    name: string | null;
    image: string | null;
  };
}

export type ArticleGenerationStatus = {
  id?: string;
  title: string;
  status: 'generating' | 'success' | 'error';
}

export default function PageComponent({ initialArticles }: { initialArticles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [generationStatus, setGenerationStatus] = useState<ArticleGenerationStatus | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch the latest articles from the server
  const refreshArticles = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch('/api/articles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }

      const latestArticles = await response.json()
      setArticles(latestArticles)
    } catch (error) {
      console.error('Error refreshing articles:', error)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  // Effect to handle article refresh when generation is successful
  useEffect(() => {
    if (generationStatus?.status === 'success') {
      const refreshTimer = setTimeout(() => {
        refreshArticles()
      }, 1000) // Small delay to allow for backend processing

      return () => clearTimeout(refreshTimer)
    }
  }, [generationStatus, refreshArticles])

  const handleGenerationStart = useCallback((title: string) => {
    setGenerationStatus({
      title,
      status: 'generating'
    })
  }, [])

  const handleArticleGenerated = useCallback((newArticle: Article) => {
    setGenerationStatus({
      id: newArticle.id,
      title: newArticle.title,
      status: 'success'
    })

    refreshArticles()

    setTimeout(() => {
      setGenerationStatus(null)
    }, 2000)
  }, [refreshArticles])

  const handleGenerationError = useCallback(() => {
    setGenerationStatus(prevStatus => prevStatus 
      ? { ...prevStatus, status: 'error' }
      : null
    )

    setTimeout(() => {
      setGenerationStatus(null)
    }, 3000)
  }, [])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-semibold">AI Generated Articles</h1>
        <Button onClick={() => setIsModalOpen(true)} disabled={isRefreshing}>
          <Plus className="mr-2 h-4 w-4" />
          {isRefreshing ? 'Refreshing...' : 'New Article'}
        </Button>
      </div>
      
      {generationStatus && (
        <div className={`
          px-4 py-2 text-center 
          ${generationStatus.status === 'generating' && 'bg-purple-100 text-purple-800'}
          ${generationStatus.status === 'success' && 'bg-green-100 text-green-800'}
          ${generationStatus.status === 'error' && 'bg-red-100 text-red-800'}
        `}>
          {generationStatus.status === 'generating' && `Generating article: ${generationStatus.title}`}
          {generationStatus.status === 'success' && `Article generated successfully: ${generationStatus.title}`}
          {generationStatus.status === 'error' && `Failed to generate article: ${generationStatus.title}`}
        </div>
      )}

      <div className="flex-1 space-y-4 p-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({articles.length})</TabsTrigger>
            <TabsTrigger value="generated">Generated ({articles.filter(a => a.generatingState === 'GENERATED').length})</TabsTrigger>
            <TabsTrigger value="generating">Generating ({articles.filter(a => a.generatingState === 'GENERATING').length})</TabsTrigger>
            <TabsTrigger value="draft">Drafts ({articles.filter(a => a.generatingState === 'DRAFT').length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <ArticlesTable 
              articles={articles} 
              generationStatus={generationStatus}
              isRefreshing={isRefreshing}
              onRefresh={refreshArticles}
            />
          </TabsContent>
          <TabsContent value="generated" className="mt-4">
            <ArticlesTable 
              articles={articles.filter(a => a.generatingState === 'GENERATED')} 
              generationStatus={generationStatus}
              isRefreshing={isRefreshing}
              onRefresh={refreshArticles}
            />
          </TabsContent>
          <TabsContent value="generating" className="mt-4">
            <ArticlesTable 
              articles={articles.filter(a => a.generatingState === 'GENERATING')} 
              generationStatus={generationStatus}
              isRefreshing={isRefreshing}
              onRefresh={refreshArticles}
            />
          </TabsContent>
          <TabsContent value="draft" className="mt-4">
            <ArticlesTable 
              articles={articles.filter(a => a.generatingState === 'DRAFT')} 
              generationStatus={generationStatus}
              isRefreshing={isRefreshing}
              onRefresh={refreshArticles}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <ArticleGeneratorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerationStart={handleGenerationStart}
        onArticleGenerated={handleArticleGenerated}
        onGenerationError={handleGenerationError}
      />
    </div>
  )
}

