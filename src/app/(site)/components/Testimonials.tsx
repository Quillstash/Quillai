import { motion } from "framer-motion";
import { Star } from "lucide-react";
import DiscordCard from "./DiscordCard"; // Ensure this component is imported

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Manager",
    company: "TechCorp",
    content: "QuillAI has transformed our content creation process. We're now producing twice the content in half the time.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "SEO Specialist",
    company: "GrowthLabs",
    content: "The SEO optimization features are incredible. Our articles are consistently ranking higher on Google.",
    rating: 5,
  },
  {
    name: "Emma Davis",
    role: "Marketing Director",
    company: "StartupX",
    content: "A game-changer for our content strategy. The AI-generated articles are engaging and conversion-focused.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-10 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">Join thousands of satisfied customers</p>
        </motion.div>

        {/* Testimonials and Discord Card Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Testimonials (Left) */}
          <div className="flex-1 space-y-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${testimonial.company}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-6 rounded-xl"
              >
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={`${testimonial.name}-star-${i}`} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <p className="text-gray-600 mb-4">{testimonial.content}</p>

                {/* Testimonial Author */}
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Discord Card (Right) */}
          <div className="lg:w-1/3 flex justify-center items-center">
            <DiscordCard />
          </div>
        </div>
      </div>
    </section>
  );
};