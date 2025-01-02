import { motion } from "framer-motion";
import { Sparkles, Target, Clock, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Writing",
    description: "Generate high-quality articles in minutes with advanced AI technology",
  },
  {
    icon: Target,
    title: "SEO Optimization",
    description: "Built-in SEO tools to help your content rank higher on search engines",
  },
  {
    icon: Clock,
    title: "Time Saving",
    description: "Reduce content creation time by up to 80% with automated writing",
  },
  {
    icon: TrendingUp,
    title: "Performance Tracking",
    description: "Monitor your content's performance with detailed analytics",
  },
];

export const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Why Choose QuillAI?</h2>
          <p className="text-xl text-gray-600">Powerful features to supercharge your content strategy</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};