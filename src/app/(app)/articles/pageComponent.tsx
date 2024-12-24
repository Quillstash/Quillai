"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from 'lucide-react'
import { ArticleGeneratorModal } from "@/components/article/articleGeneratorModal"
import { ArticlesTable } from "@/components/article/article-Table"
import { Article } from "@prisma/client"

export type ArticleGenerationStatus = {
  id?: string;
  status: 'generating' | 'success' | 'error';
  message?: string;
}

export default function PageComponent({ initialArticles }: { initialArticles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [generationStatus, setGenerationStatus] = useState<ArticleGenerationStatus | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

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
      console.log(latestArticles)
      setArticles(latestArticles)
    } catch (error) {
      console.error('Error refreshing articles:', error)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    if (generationStatus?.status === 'success') {
      console.log("if success", generationStatus)
      const refreshTimer = setTimeout(() => {
        refreshArticles()
      }, 1000) // Small delay to allow for backend processing

      return () => clearTimeout(refreshTimer)
    }
  }, [generationStatus, refreshArticles])

  const handleGenerationStart = useCallback(() => {
    setGenerationStatus({ 
      status: 'generating',
      message: 'Generating your article...' 
    })
  }, [])

  const handleArticleGenerated = useCallback(async (newArticle: Article) => {
    console.log(newArticle)
    setGenerationStatus({
      id: newArticle?.id ?? 'Unknown ID',
      status: 'success',
      message: newArticle?.title 
        ? `Article generated successfully: ${newArticle.title}`
        : 'Article generated successfully'
    });

    refreshArticles();

    setTimeout(() => {
      setGenerationStatus(null);
    }, 2000);
  }, [refreshArticles])

  const handleGenerationError = useCallback(() => {
    console.log("if failed", generationStatus)
    setGenerationStatus({ 
      status: 'error',
      message: 'Failed to generate article'
    })

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
          {generationStatus.message}
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