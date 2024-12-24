'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import Confetti from 'react-confetti'
import { Dialog } from '@headlessui/react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { auth } from '@/auth'

const formSchema = z.object({
  preferredTone: z.enum(['professional', 'casual', 'academic', 'conversational', 'humorous', 'persuasive']),
  targetAudience: z.string().min(1, 'Target audience is required'),
})

type FormValues = z.infer<typeof formSchema>

export default function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  // useEffect(() => {
  //   const CheckOnboardingStatus = async () => {
  //     const session = await auth();

  //     if (session?.user?.onboardingCompleted ) { // pls pass the onboarding to the session so it can check if the user has completed it, 
  //       router.replace('/articles'); // if the user has compelted it nd he comes to this page redirect him to articles. else allow him
  //     }
  //   };

  //   CheckOnboardingStatus();
  // }, [router]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredTone: 'professional',
      targetAudience: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to complete onboarding')
      }

      // Show the confetti and modal
      setShowModal(true)
    } catch (error) {
      console.error('Onboarding error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      {/* Confetti */}
      {showModal && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Main Content */}
      <div className="flex flex-grow justify-center items-center">
        <div className="container mx-auto px-4 py-8 max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Welcome! Let&apos;s set up your preferences</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Tone</label>
              <Select onValueChange={(value) => register('preferredTone').onChange({ target: { value } })}>
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
              {errors.preferredTone && <p className="text-red-500 text-sm mt-1">{errors.preferredTone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Target Audience</label>
              <Textarea
                {...register('targetAudience')}
                placeholder="Describe your target audience"
                className="w-full"
              />
              {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Saving...' : 'Complete Onboarding'}
            </Button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Dialog open={showModal} onClose={() => setShowModal(false)} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 fixed inset-0" />
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto relative z-10">
            <Dialog.Title className="text-xl font-bold mb-4">Thank You!</Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600 mb-6">
              Your preferences have been saved. Let&apos;s get started!
            </Dialog.Description>
            <Button
              onClick={() => router.push('/articles')}
              className="w-full"
            >
              OK
            </Button>
          </div>
        </Dialog>
      )}

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-4 text-center">
        <p className="text-sm text-gray-500">© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  )
}
