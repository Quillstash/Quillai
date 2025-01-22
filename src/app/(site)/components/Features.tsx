import { motion } from "framer-motion"
import { Sparkles, Rocket, Clock, BarChart, Feather, Globe, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Writing",
    description: "Generate high-quality articles in minutes with advanced AI technology",
  },
  {
    icon: Rocket,
    title: "SEO Optimization",
    description: "Built-in SEO tools to help your content rank higher on search engines",
  },
  {
    icon: Clock,
    title: "Time Saving",
    description: "Reduce content creation time by up to 80% with automated writing",
  },
  {
    icon: BarChart,
    title: "Performance Tracking",
    description: "Monitor your content's performance with detailed analytics",
  },
  {
    icon: Feather,
    title: "Natural Language Processing",
    description: "Create human-like content that engages and resonates with your audience",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Generate content in multiple languages to reach a global audience",
  },
  {
    icon: Shield,
    title: "Plagiarism Checker",
    description: "Ensure your content is original with built-in plagiarism detection",
  },
  {
    icon: Zap,
    title: "Instant Formatting",
    description: "Automatically format your content for various platforms and mediums",
  },
]

export const Features = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Why Choose QuillAI?
          </h2>
          <p className="text-xl text-gray-600">Powerful features to supercharge your content strategy</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
                <feature.icon className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

