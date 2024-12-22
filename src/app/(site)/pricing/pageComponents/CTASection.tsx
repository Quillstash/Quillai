import { Container } from "./pricingContainer"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <Container className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
      <p className="text-xl text-muted-foreground mb-8">
        Join thousands of satisfied customers and take your business to the next level.
      </p>
      <Button size="lg">Start Your Free Trial</Button>
    </Container>
  )
}

