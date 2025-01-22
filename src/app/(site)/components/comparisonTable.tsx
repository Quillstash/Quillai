import React from "react";
import { Check, X } from "lucide-react";

function ComparisonSection({
  title,
  features,
  isPositive,
}: {
  title: string;
  features: string[];
  isPositive: boolean;
}) {
  const Icon = isPositive ? Check : X;
  const iconColor = isPositive ? "text-blue-500" : "text-red-500";

  return (
    <div className="p-8 border-2 border-navy-900 rounded-3xl relative shadow-lg">
      <h2 className="text-3xl font-bold text-navy-900 mb-6">{title}</h2>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <span className={`p-1 rounded-full ${iconColor}`}>
              <Icon size={20} />
            </span>
            <span className="text-lg text-navy-900">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const quillai = {
    title: "QuillAI",
    features: [
      "Generate articles tailored to your brand",
      "Keyword research done automatically",
      "Stock / AI-powered image generation",
      "Long-form, detailed articles",
      "Export articles directly to your website",
      "24/7 support access",
    ],
  };

  const chatgpt = {
    title: "ChatGPT",
    features: [
      "Generic articles not tailored to your brand",
      "No automated keyword research",
      "Limited image customization and alignment",
      "Short and average articles",
      "Manual copy-pasting to your website",
      "Limited or no support options",
    ],
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-navy-900 mb-16">
          How We Are Different!
        </h1>

        <div className="grid md:grid-cols-2 gap-8 relative">
          <ComparisonSection
            title={quillai.title}
            features={quillai.features}
            isPositive={true}
          />

          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                        bg-blue-500 text-white text-2xl font-bold rounded-full p-4 
                        hidden md:flex items-center justify-center z-10"
          >
            VS
          </div>

          <ComparisonSection
            title={chatgpt.title}
            features={chatgpt.features}
            isPositive={false}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
