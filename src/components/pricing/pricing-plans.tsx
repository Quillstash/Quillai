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
import PaymentSupportModal from "./payment-support-modal"

interface PricingPlan {
  id: string
  name: string
  price: number
  credits: number
  articleGenerations: number
  regenerationsPerArticle: number
  features: string[]
  isPopular?: boolean
}

const plans: PricingPlan[] = [
  {
    id: 'one-time-basic',
    name: "Complete Package",
    price: 15,
    credits: 80,
    articleGenerations: 30,
    regenerationsPerArticle: 5,
    features: [
      "60 Credits",
      "30 Article Generations",
      "5 Free Regenerations per Article",
      "24/7 Support Access"
    ],
    isPopular: true
  }
  // Add more plans here in the future if needed
]

export function PricingModal() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isPricingOpen, setIsPricingOpen] = React.useState(false)
  const [showPaymentSupport, setShowPaymentSupport] = React.useState(false)

  const handleSubscribe = async () => {
    setIsLoading(true)
    try {
      setIsPricingOpen(false)
      setShowPaymentSupport(true)
      setIsLoading(false)
    } catch (error) {
      console.error('Payment error:', error)
      toast.error("Failed to process payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dialog open={isPricingOpen} onOpenChange={setIsPricingOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">Get Started</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Choose your plan</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center  ">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="border rounded-lg p-6 space-y-6 hover:border-primary transition-colors relative "
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-tr-lg rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-xl">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    One-time payment
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl font-bold">
                    ${plan.price}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Lifetime access
                  </p>
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
                  onClick={handleSubscribe}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    "Purchase Now"
                  )}
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-start gap-4 mt-4">
            <Button variant="ghost" size="sm">
              Chat to us
            </Button>
            <Button variant="ghost" size="sm">
              <Link href="/pricing">Learn more</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentSupportModal 
        open={showPaymentSupport} 
        onOpenChange={setShowPaymentSupport}
      />
    </>
  )
}