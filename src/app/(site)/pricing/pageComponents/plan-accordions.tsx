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
    name: "Basic",
    overview: "Our Basic plan is perfect for individuals and small teams looking to get started with our platform.",
    features: [
      { name: "Up to 5 users", available: true },
      { name: "Basic analytics", available: true },
      { name: "24/7 support", available: true },
      { name: "Custom integrations", available: false },
      { name: "Advanced security", available: false },
    ],
    feedback: "The Basic plan has been a game-changer for our small team. It's affordable and has all the essential features we need.",
  },
  {
    name: "Pro",
    overview: "The Pro plan is ideal for growing businesses that need more advanced features and support.",
    features: [
      { name: "Up to 20 users", available: true },
      { name: "Advanced analytics", available: true },
      { name: "Priority support", available: true },
      { name: "Custom integrations", available: true },
      { name: "Advanced security", available: false },
    ],
    feedback: "Upgrading to Pro was the best decision we made. The advanced analytics and custom integrations have significantly improved our workflow.",
  },
  {
    name: "Enterprise",
    overview: "Our Enterprise plan is designed for large-scale operations that require unlimited access and customized solutions.",
    features: [
      { name: "Unlimited users", available: true },
      { name: "Enterprise-grade analytics", available: true },
      { name: "Dedicated account manager", available: true },
      { name: "24/7 phone support", available: true },
      { name: "Custom solutions", available: true },
    ],
    feedback: "The Enterprise plan has transformed how we operate. The dedicated account manager and custom solutions have been invaluable to our business.",
  },
]

export function PlanAccordions() {
  return (
    <Container className="py-10">
      {plans.map((plan, index) => (
        <Accordion type="single" collapsible className="mb-6" key={plan.name}>
          <AccordionItem value={`item-${index}-1`}>
            <AccordionTrigger>{plan.name} Plan Overview</AccordionTrigger>
            <AccordionContent>{plan.overview}</AccordionContent>
          </AccordionItem>
          <AccordionItem value={`item-${index}-2`}>
            <AccordionTrigger>{plan.name} Plan Features</AccordionTrigger>
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
          <AccordionItem value={`item-${index}-3`}>
            <AccordionTrigger>{plan.name} Plan Feedback</AccordionTrigger>
            <AccordionContent>{plan.feedback}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </Container>
  )
}

