import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Wand2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Article } from '@prisma/client'

// Updated schema for single keyword
const formSchema = z.object({
  keyword: z.string().min(1, 'Keyword is required').max(50, 'Keyword is too long'),
})

type FormValues = z.infer<typeof formSchema>

interface ArticleGeneratorModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerationStart: () => void
  onArticleGenerated: (article: Article) => void
  onGenerationError: () => void
}

export function ArticleGeneratorModal({ 
  isOpen, 
  onClose, 
  onGenerationStart,
  onArticleGenerated, 
  onGenerationError 
}: ArticleGeneratorModalProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: '',
    },
  })

  const handleGenerate = async (data: FormValues) => {
    setIsGenerating(true)
    onClose()
    onGenerationStart()

    try {
      const response = await fetch('/api/generate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: data.keyword }), // Send single keyword
      })
      
      const result = await response.json()
      if (result.success || result.article) {
        onArticleGenerated(result.article)
        reset()
      } else {
        throw new Error('Failed to generate article')
      }
    } catch (error) {
      console.error('Failed to generate article:', error)
      onGenerationError()
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate New Article</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleGenerate)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="keyword" className="text-sm font-medium">
              Keyword
            </label>
            <Input
              id="keyword"
              placeholder="Enter a keyword..."
              {...register('keyword')}
              className={errors.keyword ? 'border-red-500' : ''}
            />
            {errors.keyword && (
              <p className="text-sm text-red-500">{errors.keyword.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isGenerating} 
            className="w-full"
          >
            {isGenerating ? (
              'Generating...'
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" /> Generate Article
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}