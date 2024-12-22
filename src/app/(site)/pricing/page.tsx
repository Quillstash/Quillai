import { CTASection } from "./pageComponents/CTASection";
import { FAQSection } from "./pageComponents/FAQSection";
import { Header } from "./pageComponents/header";
import { PlanAccordions } from "./pageComponents/plan-accordions";
import { PricingCards } from "./pageComponents/pricing-card";


export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PricingCards />
      <PlanAccordions />
      <FAQSection />
      <CTASection />
    </div>
  )
}

