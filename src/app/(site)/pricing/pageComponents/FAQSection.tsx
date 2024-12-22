import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "./pricingContainer"

const faqs = [
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for all our plans. You can explore all features during this period without any commitment.",
  },
  {
    question: "Can I change my plan later?",
    answer: "You can upgrade, downgrade, or cancel your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "How long do I wait before I start seeing results?",
    answer: "Results vary depending on your usage and specific needs. However, most of our customers start seeing improvements in their workflow within the first month of use.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "You can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your service will continue until the end of your current billing period.",
  },
  {
    question: "Do you offer discounts?",
    answer: "We offer discounts for annual subscriptions, as well as special rates for non-profit organizations and educational institutions. Contact our sales team for more information.",
  },
]

export function FAQSection() {
  return (
    <Container className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  )
}

