import { Clock, TrendingDown, XCircle } from 'lucide-react';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Container from '@/components/container';

const painPoints = [
  {
    icon: Clock,
    title: "Time Wasted on Ineffective Content",
    description:
      "Hours spent writing content that never reaches your target audience. Every piece that doesn't rank is money down the drain.",
    image: "/images/img1.webp"
  },
  {
    icon: TrendingDown,
    title: "Falling Behind Competitors",
    description:
      "While you struggle with content strategy, your competitors are capturing your potential customers with high-ranking content.",
    image: "/images/img2.webp"
  },
  {
    icon: XCircle,
    title: "Lost Revenue Opportunities",
    description:
      "Poor content ranking means missed opportunities to convert visitors into customers, directly impacting your bottom line.",
    image: "/images/img3.webp"
  },
];


export const PainPoints = () => {
    return (
      <section className="py-8 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              The Real Cost of Poor Content
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto p-4">
              Don&apos;t let these common content marketing pitfalls hold your business
              back. Our platform helps you overcome these challenges and achieve
              lasting results.
            </p>
          </div>
          <div className="space-y-12">
            {painPoints.map((point) => (
              <Card key={point.title} className="overflow-hidden">
                <CardContent className="p-2">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <point.icon className="h-12 w-12 text-primary" />
                        <h3 className="text-2xl font-semibold">{point.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{point.description}</p>
                    </div>
                    <div className="md:w-1/2 relative h-64 md:h-auto">
                      <Image
                        src={point.image || "/placeholder.svg"}
                        alt={point.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    );
  };

