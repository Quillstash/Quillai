import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Post } from '@/db/schema'
import KeywordInput from '../keyword/KeywordInput'

const formSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').max(100, 'Title is too long'),
  keywords: z.array(z.string()).min(1, 'At least one keyword is required'),
  tone: z.enum(['professional', 'casual', 'academic', 'conversational', 'humorous', 'persuasive']),
  targetAudience: z.string().min(1, 'Target audience is required'),
})

type FormValues = z.infer<typeof formSchema>

interface ArticleGeneratorModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerationStart: (title: string) => void
  onArticleGenerated: (article: Post) => void
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

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      keywords: [],
      tone: 'professional',
      targetAudience: '',
    },
  })

  const handleGenerate = async (data: FormValues) => {
    setIsGenerating(true)
    onClose()
    
    // Notify parent component about generation start
    onGenerationStart(data.title)

    try {
      const response = await fetch('/api/generate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate article')
      }

      const result = await response.json()
      if (result.success && result.post) {
        onArticleGenerated(result.post)
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
          <div>
            <label className="block text-sm font-medium mb-1">Article Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter article title"
                  className="w-full"
                />
              )}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Keywords</label>
            <KeywordInput
              control={control}
              error={errors.keywords?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Target Audience</label>
            <Controller
              name="targetAudience"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Describe your target audience"
                  className="w-full"
                />
              )}
            />
            {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tone</label>
            <Controller
              name="tone"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tone && <p className="text-red-500 text-sm mt-1">{errors.tone.message}</p>}
          </div>

          <Button type="submit" disabled={isGenerating} className="w-full">
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