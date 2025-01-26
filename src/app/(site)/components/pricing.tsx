"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function Pricing() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-navy-900 mb-4">
            One package,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
              everything included.
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the full potential of AI-powered content creation with our comprehensive package.
          </p>
        </motion.div>

        <div className="flex justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl"
          >
            <Card className="relative overflow-hidden border-2">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />

              <CardHeader className="relative pt-8 px-6 text-center">
                <div className="mb-4">
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium rounded-full">
                    For ambitious professionals
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Complete Package</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-gray-400 line-through text-2xl">$30</span>
                  <span className="text-4xl font-bold">$15</span>
                  <span className="text-gray-600">/one-time</span>
                </div>
                <div className="bg-purple-100 text-purple-700 px-3 py-1 text-sm font-medium rounded-full">
                  Best Value Offer
                </div>
              </CardHeader>

              <CardContent className="relative px-6 pt-8 pb-4">
                <div className="space-y-4 p-6 rounded-xl">
                  {[
                      "60 Credits",
                      "30 Article Generations",
                      "5 Free Regenerations per Article",
                      "Keyword Research Generation",
                      "SEO Optimization Tools",
                      "AI-Powered Content Insights",
                      "Team Collaboration Features",
                      "24/7 Support Access",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="relative px-6 pb-8">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg">
                  Get Started Now
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
