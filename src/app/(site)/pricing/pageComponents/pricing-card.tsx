"use client"

import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "./pricingContainer";
import PaymentSupportModal from "@/components/pricing/payment-support-modal";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  credits: number;
  articleGenerations: number;
  regenerationsPerArticle: number;
  features: string[];
  isPopular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: "one-time-basic",
    name: "Complete Package",
    price: 15,
    credits: 80,
    articleGenerations: 30,
    regenerationsPerArticle: 5,
    features: [
      "60 Credits",
      "30 Article Generations",
      "5 Free Regenerations per Article",
      "24/7 Support Access",
    ],
    isPopular: true
  }
];

export function PricingCards() {
  const [showPaymentSupport, setShowPaymentSupport] = React.useState(false);

  const handleSubscribe = () => {
    setShowPaymentSupport(true);
  };

  return (
    <>
      <Container className="py-10">
        <div className="flex justify-center items-center">
          {plans.map((plan) => (
            <Card key={plan.id} className="flex flex-col hover:border-primary transition-colors relative">
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-tr-lg rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  One-time payment
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <h4 className="text-4xl font-bold">
                    ${plan.price}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Lifetime access
                  </p>
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
                  Purchase Now
                </Button>
              </CardFooter>
            </Card>
          ))}
          {/* <Card className="flex flex-col bg-muted/50">
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
                  <span className="text-sm">Custom credit allocation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm">Unlimited article generations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubscribe}>Contact Sales</Button>
            </CardFooter>
          </Card> */}
        </div>
        <div className="flex justify-center gap-4 mt-4 rounded-xl font-bold ">
          <Button variant="ghost" size="sm" onClick={handleSubscribe}>
            Chat to us
          </Button>
          <Button variant="ghost" size="sm">
            {/* <Link href="/pricing">
              Learn more
            </Link> */}
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


