"use client"

import * as React from "react"
import { Check, Loader2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import Link from "next/link"

interface PricingPlan {
  monthlyId: string
  yearlyId: string
  name: string
  monthlyPrice: number
  yearlyPrice: number
  originalYearlyPrice: number
  features: string[]
  articles: number
  extraArticlePrice: number
  linkedPages: number
  regenerations: number
  support: string
}

const plans: PricingPlan[] = [
  {
    monthlyId: '638793',
    yearlyId: '638802',
    name: "Basic Plan",
    monthlyPrice: 25,
    yearlyPrice: 240,
    originalYearlyPrice: 300,
    articles: 10,
    extraArticlePrice: 8.5,
    linkedPages: 250,
    regenerations: 1,
    support: "Live chat support",
    features: [
      "25 Articles per month",
      "$1.5 per extra article",
      "1 free regeneration per article",
      "24/7 Live discord support"
    ]
  },
  {
    monthlyId: '638800',
    yearlyId: '638803',
    name: "Pro Plan",
    monthlyPrice: 45,
    yearlyPrice: 360,
    originalYearlyPrice: 450,
    articles: 40,
    extraArticlePrice: 7,
    linkedPages: 1000,
    regenerations: 1,
    support: "Live chat support",
    features: [
      "75 Articles per month",
      "$1 per extra article",
      "1 free regenerations per article",
      "24/7 Live discord support"
    ]
  }
]

export function PricingModal() {
  const [isYearly, setIsYearly] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubscribe = async (plan: PricingPlan) => {
    setIsLoading(true)
    try {
      const planId = isYearly ? plan.yearlyId : plan.monthlyId;
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      })

      if (!response.ok) {
        throw new Error('Failed to initiate subscription')
      }

      const { checkoutUrl } = await response.json()
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      console.error('Subscription error:', error)
      toast.error("Failed to initiate subscription. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Upgrade plan</Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Select plan</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-4 border rounded-lg p-1">
            <button
              onClick={() => setIsYearly(true)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500/20 text-green-600 rounded px-1.5 py-0.5">
                Save up to {Math.round((1 - plans[1].yearlyPrice / plans[1].originalYearlyPrice) * 100)}%
              </span>
            </button>
            <button
              onClick={() => setIsYearly(false)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                !isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="border rounded-lg p-6 space-y-6 hover:border-primary transition-colors relative"
            >
              {plan.name === "Pro Plan" && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-tr-lg rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="font-semibold text-xl">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Billed {isYearly ? "yearly" : "monthly"}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-4xl font-bold">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </h4>
                {isYearly && (
                  <p className="text-sm text-muted-foreground">
                    <span className="line-through">${plan.originalYearlyPrice}</span>
                    <span className="ml-2 text-green-600">
                      {Math.round((1 - plan.yearlyPrice / plan.originalYearlyPrice) * 100)}% off
                    </span>
                  </p>
                )}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                onClick={() => handleSubscribe(plan)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Select plan"
                )}
              </Button>
            </div>
          ))}
          <div className="border rounded-lg p-6 space-y-6 bg-muted/50">
            <div>
              <h3 className="font-semibold text-xl">Enterprise Plan</h3>
              <p className="text-sm text-muted-foreground">
                Custom pricing
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-4xl font-bold">Coming Soon</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm">Custom article limit</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm">Unlimited linked pages</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm">Strategic support</span>
              </li>
            </ul>
            <Button className="w-full" disabled>Contact Sales</Button>
          </div>
        </div>
        <div className="flex justify-start gap-4 mt-4">
          <Button variant="ghost" size="sm">
            Chat to us
          </Button>
          <Button variant="ghost" size="sm">
            <Link href="/pricing"> 
            View full pricing
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

