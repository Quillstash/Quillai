"use client"

import { CreditCard } from 'lucide-react'
import { PricingModal } from '../pricing/pricing-plans'
import { Skeleton } from "@/components/ui/skeleton"
import { useSubscription } from '@/hooks/useSubscription'

export function SubscriptionPlanCard() {
  const { data, error, isLoading } = useSubscription()

  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Skeleton className="h-5 w-5 mr-2" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="mb-2">
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-2 w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="text-sm text-red-500">Failed to load subscription data</p>
      </div>
    )
  }

  const progress = (data.currentCredits / data.maxCredits) * 100

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        <CreditCard className="w-5 h-5 mr-2 text-primary" />
        <h3 className="text-sm font-semibold">{data.planName} Plan</h3>
      </div>
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span>
            {data.currentCredits} / {data.maxCredits} Credits
          </span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <PricingModal />
    </div>
  )
}