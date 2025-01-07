"use client"

import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "./pricingContainer";
import Link from "next/link";
import PaymentSupportModal from "@/components/pricing/payment-support-modal";

interface PricingPlan {
  monthlyId: string;
  yearlyId: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  originalYearlyPrice: number;
  features: string[];
  articles: number;
  extraArticlePrice: number;
  linkedPages: number;
  regenerations: number;
  support: string;
}

const plans: PricingPlan[] = [
  {
    monthlyId: "638793",
    yearlyId: "638802",
    name: "Basic Plan",
    monthlyPrice: 25,
    yearlyPrice: 240,
    originalYearlyPrice: 300,
    articles: 25,
    extraArticlePrice: 1.5,
    linkedPages: 250,
    regenerations: 1,
    support: "24/7 Live discord support",
    features: [
      "25 Articles per month",
      "$1.5 per extra article",
      "1 free regeneration per article",
      "24/7 Live discord support",
    ],
  },
  {
    monthlyId: "638800",
    yearlyId: "638803",
    name: "Pro Plan",
    monthlyPrice: 45,
    yearlyPrice: 360,
    originalYearlyPrice: 450,
    articles: 75,
    extraArticlePrice: 1,
    linkedPages: 1000,
    regenerations: 1,
    support: "24/7 Live discord support",
    features: [
      "75 Articles per month",
      "$1 per extra article",
      "1 free regenerations per article",
      "24/7 Live discord support",
    ],
  },
];

export function PricingCards() {
  const [isYearly, setIsYearly] = React.useState(false);
  const [showPaymentSupport, setShowPaymentSupport] = React.useState(false);

  const handleSubscribe = () => {
    setShowPaymentSupport(true);
  };

  return (
    <>
      <Container className="py-10">
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
            <Card key={plan.name} className="flex flex-col hover:border-primary transition-colors relative">
              {plan.name === "Pro Plan" && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-tr-lg rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Billed {isYearly ? "yearly" : "monthly"}
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
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
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleSubscribe}
                >
                  Select plan
                </Button>
              </CardFooter>
            </Card>
          ))}
          <Card className="flex flex-col bg-muted/50">
            <CardHeader>
              <CardTitle>Enterprise Plan</CardTitle>
              <p className="text-sm text-muted-foreground">
                Custom pricing
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <h4 className="text-4xl font-bold">Coming Soon</h4>
              </div>
              <ul className="mt-4 space-y-2">
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
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubscribe}>Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="flex justify-start gap-4 mt-4">
          <Button variant="ghost" size="sm" onClick={handleSubscribe}>
            Chat to us
          </Button>
          <Button variant="ghost" size="sm">
            <Link href="/pricing">
              View full pricing
            </Link>
          </Button>
        </div>
      </Container>

      <PaymentSupportModal 
        open={showPaymentSupport} 
        onOpenChange={setShowPaymentSupport}
      />
    </>
  );
}




// const handleSubscribe = async (plan: PricingPlan) => {
//   setIsLoading(true)
//   try {
//     const planId = isYearly ? plan.yearlyId : plan.monthlyId;
//     const response = await fetch('/api/subscription', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ planId }),
//     })

//     if (!response.ok) {
//       throw new Error('Failed to initiate subscription')
//     }

//     const { checkoutUrl } = await response.json()
//     window.open(checkoutUrl, '_blank');
//   } catch (error) {
//     console.error('Subscription error:', error)
//     toast.error("Failed to initiate subscription. Please try again.")
//   } finally {
//     setIsLoading(false)
//   }
// }


