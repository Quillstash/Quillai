import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"; // shadcn/ui components
import Container from "@/components/container";

const steps = [
  {
    title: "Sign Up",
    description: "Create your account in just a few clicks. It’s quick, easy, and free to get started.",
    image: "https://r5xo8sk0k5.ufs.sh/f/wtzFtcdI0Tupdyx8RHrVZ6GPvJp3ehFR4TdrIflCDKn0oXSU", // Replace with your image path
  },
  {
    title: "Optimize Your Profile",
    description: "We’ll guide you through setting up your profile to attract the right audience and maximize visibility.",
    image: "https://r5xo8sk0k5.ufs.sh/f/wtzFtcdI0Tupypfh3aJnKJcxnCWlO34b2Ps7T5yfNv6VaMwX", // Replace with your image path
  },
  {
    title: "Start Ranking & Get Customers",
    description: "Watch your traffic grow as you rank higher and attract new customers effortlessly.",
    image: "https://r5xo8sk0k5.ufs.sh/f/wtzFtcdI0TupcVgAg62NJ8Tc1dEuWq4wGlMojr3XImgQPACF", // Replace with your image path
  },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  export default function HowItWorks() {
    return (
      <section className="py-8 md:py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-muted-foreground max-w-2xl mx-auto p-4"
            >
              Follow these simple steps to achieve your dream outcome of getting loads of traffic and new customers.
            </motion.p>
          </div>
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-2">
                    <div className="flex flex-col md:flex-row">
                      {/* Image on the left */}
                      <div className="md:w-1/2 relative h-52 md:h-auto">
                        <img
                          src={step.image || "/placeholder.svg"}
                          alt={step.title}
                          className="object-cover"
                        />
                      </div>
  
                      {/* Text on the right */}
                      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    );
  }