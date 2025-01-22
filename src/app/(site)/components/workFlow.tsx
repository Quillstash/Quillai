import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const WorkflowComparison = () => {
  const competitors = [
    {
      name: "Content generation",
      tools: ["AI Writer", "SURFER", "Canva", "WEGLOT"]
    }
  ];

  const quillai = [
    {
      name: "Content generation",
      tools: ["QuillAI", "QuillAI", "QuillAI", "QuillAI"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-16">
        Your complete <span className="text-blue-600">SEO solution</span>
      </h1>

      <div className="space-y-16">
        {/* Competitors Workflow */}
        <div className="flex justify-between items-center">
          {competitors[0].tools.map((tool, index) => (
            <React.Fragment key={`competitor-${index}`}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg">
                  {index === 0 && <span className=" rounded-full">OpenAI</span>}
                  {index === 1 && <span className="font-bold text-gray-800">SURFER</span>}
                  {index === 2 && <span className="font-bold text-blue-400">Canva</span>}
                  {index === 3 && <span className="font-bold text-navy-900">WEGLOT</span>}
                </div>
                <span className="text-sm text-gray-600 text-center p-2">
                  {index === 0 && "Content generation"}
                  {index === 1 && "Content optimization"}
                  {index === 2 && "Images"}
                  {index === 3 && "Localization"}
                </span>
              </div>
              {index < competitors[0].tools.length - 1 && (
                <ArrowRight className="text-gray-400" size={24} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* QuillAI Workflow */}
        <div className="flex justify-between items-center">
          {quillai[0].tools.map((tool, index) => (
            <React.Fragment key={`quillai-${index}`}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center  rounded-lg">
                  <span className="font-bold text-purple-600 text-2xl">QuillAI</span>
                </div>
                <span className="text-sm text-gray-600 text-center">
                  {index === 0 && "Content generation"}
                  {index === 1 && "Content optimization"}
                  {index === 2 && "Images"}
                  {index === 3 && "Localization"}
                </span>
              </div>
              {index < quillai[0].tools.length - 1 && (
                <ArrowRight className="text-purple-400" size={24} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <Link href="/login">
        <button type="button" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors">
          Try for FREE
          <ArrowRight size={20} />
        </button>
        </Link>
        
      </div>
    </div>
  );
};

export default WorkflowComparison;