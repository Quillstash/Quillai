"use client"

import * as React from "react"
import { Check, X } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "./pricingContainer"

const plans = [
  {
    name: "Basic Plan",
    overview: "Our Basic plan is perfect for individuals and small teams looking to get started with our platform.",
    monthlyPrice: 25,
    yearlyPrice: 240,
    originalYearlyPrice: 300,
    features: [
      { name: "25 Articles per month", available: true },
      { name: "$1.5 per extra article", available: true },
      { name: "1 free regeneration per article", available: true },
      { name: "24/7 Live discord support", available: true },
      { name: "250 linked pages", available: true },
      { name: "Custom integrations", available: false },
      { name: "Strategic support", available: false },
    ],
    feedback: "The Basic plan has been a game-changer for our small team. It's affordable and provides all the essential features we need for our content creation.",
  },
  {
    name: "Pro Plan",
    overview: "The Pro plan is ideal for growing businesses that need more advanced features and higher content volume.",
    monthlyPrice: 45,
    yearlyPrice: 360,
    originalYearlyPrice: 450,
    features: [
      { name: "75 Articles per month", available: true },
      { name: "$1 per extra article", available: true },
      { name: "1 free regeneration per article", available: true },
      { name: "24/7 Live discord support", available: true },
      { name: "1000 linked pages", available: true },
      { name: "Custom integrations", available: true },
      { name: "Strategic support", available: false },
    ],
    feedback: "Upgrading to Pro was the best decision we made. The increased article limit and reduced cost per extra article have significantly improved our content production capabilities.",
  },
  
]

export function PlanAccordions() {
  return (
    <Container className="py-10">
      {plans.map((plan, index) => (
        <Accordion type="single" collapsible className="mb-6" key={plan.name}>
          <AccordionItem value={`item-${index}-1`}>
            <AccordionTrigger>{plan.name} Overview</AccordionTrigger>
            <AccordionContent>{plan.overview}</AccordionContent>
          </AccordionItem>
          <AccordionItem value={`item-${index}-2`}>
            <AccordionTrigger>{plan.name} Pricing</AccordionTrigger>
            <AccordionContent>
              <p>Monthly: ${plan.monthlyPrice}</p>
              <p>Yearly: ${plan.yearlyPrice} {plan.originalYearlyPrice && `(Original: $${plan.originalYearlyPrice})`}</p>
              {plan.originalYearlyPrice && (
                <p className="text-green-600">
                  Save {Math.round((1 - plan.yearlyPrice / plan.originalYearlyPrice) * 100)}% with yearly billing
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value={`item-${index}-3`}>
            <AccordionTrigger>{plan.name} Features</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-center">
                    {feature.available ? (
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className={feature.available ? "" : "text-muted-foreground"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value={`item-${index}-4`}>
            <AccordionTrigger>{plan.name} Feedback</AccordionTrigger>
            <AccordionContent>{plan.feedback}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </Container>
  )
}

