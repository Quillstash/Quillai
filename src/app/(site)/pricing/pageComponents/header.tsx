import { Container } from "./pricingContainer";

export function Header() {
  return (
    <Container className="py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Simple, transparent pricing
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        Choose the perfect plan for your needs. Upgrade, downgrade, or cancel anytime.
      </p>
    </Container>
  )
}

