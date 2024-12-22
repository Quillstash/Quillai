"use client"

import * as React from "react"
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "./pricingContainer"

const plans = [
  {
    name: "Basic Plan",
    monthlyPrice: 25,
    yearlyPrice: 20,
    description: "Perfect for individuals and small teams",
    features: ["Up to 5 users", "Basic analytics", "24/7 support"],
  },
  {
    name: "Pro Plan",
    monthlyPrice: 45,
    yearlyPrice: 30,
    description: "Ideal for growing businesses",
    features: ["Up to 20 users", "Advanced analytics", "Priority support", "Custom integrations"],
  },
  {
    name: "Enterprise",
    monthlyPrice: 70,
    yearlyPrice: 60,
    description: "For large-scale operations",
    features: ["Unlimited users", "Enterprise-grade analytics", "Dedicated account manager", "24/7 phone support", "Custom solutions"],
  },
]

export function PricingCards() {
  const [isYearly, setIsYearly] = React.useState(false)

  return (
    <Container className="py-10">
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2 bg-muted p-1 rounded-full">
          <button
            className={`px-4 py-2 rounded-full ${
              !isYearly ? "bg-primary text-primary-foreground" : ""
            }`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              isYearly ? "bg-primary text-primary-foreground" : ""
            }`}
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-3xl font-bold">
                ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                <span className="text-sm font-normal text-muted-foreground">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>
              <p className="mt-4 text-muted-foreground">{plan.description}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Choose Plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  )
}

