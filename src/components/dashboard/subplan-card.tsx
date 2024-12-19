"use client"

// import { PricingModal } from '@/components/pricing/pricing-plans'
import { CreditCard } from 'lucide-react'

interface SubscriptionPlanCardProps {
  currentArticles: number
  maxArticles: number
}

export function SubscriptionPlanCard({
  currentArticles,
  maxArticles,
}: SubscriptionPlanCardProps) {
  const progress = (currentArticles / maxArticles) * 100

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        <CreditCard className="w-5 h-5 mr-2 text-primary" />
        <h3 className="text-sm font-semibold">Free Plan</h3>
      </div>
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span>
            {currentArticles} / {maxArticles} Articles
          </span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {/* <PricingModal /> */}
    </div>
  )
}

