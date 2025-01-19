export default function About() {
    return (
      <div className="bg-gray-50 text-gray-800 min-h-auto">
       
        <main className="container mx-auto px-4 py-12">
          <section className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">About QuillAI</h2>
            <p className="text-lg text-gray-700 mt-4">
              Empowering small businesses and content creators to grow their online presence effortlessly.
            </p>
          </section>
  
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
              <p className="text-gray-700 mt-4">
                At QuillAI, our mission is to make it simple and affordable for small businesses and creators to increase their visibility and engagement online. By leveraging AI, we provide tools that streamline SEO and content creation, making it accessible for everyone.
              </p>
            </div>
  
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800">Key Features</h3>
              <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
                <li><strong>SEO Article Generation:</strong> Produce high-quality, search engine-optimized articles to drive organic traffic.</li>
                <li><strong>Keyword Generator:</strong> Get trending SEO keywords to craft content aligned with user searches.</li>
              </ul>
            </div>
          </section>
  
          <section className="mt-12 text-center">
            <h3 className="text-3xl font-semibold text-gray-800">Why Choose QuillAI?</h3>
            <p className="text-gray-700 mt-4">
              QuillAI eliminates the complexity of SEO and content creation, providing cost-effective solutions to grow your audience and connect with them more effectively. Whether you’re a small business owner or a content creator, our platform helps you harness the power of AI to elevate your content game.
            </p>
          </section>
        </main>
  
      </div>
    );
  }
  