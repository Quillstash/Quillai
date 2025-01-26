"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
    preferredTone: z.enum(['professional', 'casual', 'academic', 'conversational', 'humorous', 'persuasive']),
    targetAudience: z.string().min(1, 'Target audience is required'),
  })
  type FormValues = z.infer<typeof formSchema>

export default function PreferencesEditDialog({ 
    currentTone, 
    currentAudience 
  }: { 
    currentTone: string, 
    currentAudience: string 
  }) {
    const [isOpen, setIsOpen] = useState(false)
  
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        preferredTone: currentTone as FormValues['preferredTone'],
        targetAudience: currentAudience,
      },
    })
  
    const onSubmit = async (data: FormValues) => {
      try {
        const response = await fetch('/api/onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
  
        if (!response.ok) {
          throw new Error('Failed to update preferences')
        }
  
        setIsOpen(false)
        // Consider adding a toast or refresh mechanism
      } catch (error) {
        console.error('Preferences update error:', error)
      }
    }
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Writing Preferences</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Tone</label>
              <Select 
                defaultValue={currentTone}
                onValueChange={(value) => setValue('preferredTone', value as FormValues['preferredTone'])}
              >
                <SelectTrigger>
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
              {errors.preferredTone && <p className="text-red-500 text-sm mt-1">{errors.preferredTone.message}</p>}
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-1">Target Audience</label>
              <Textarea
                {...register('targetAudience')}
                placeholder="Describe your target audience"
                defaultValue={currentAudience}
              />
              {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience.message}</p>}
            </div>
  
            <Button type="submit" className="w-full">Save Preferences</Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }