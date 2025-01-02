import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
    <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">What Our Users Say</h2>
          <p className="text-xl text-gray-600">Join thousands of satisfied customers</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-6 rounded-xl"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};