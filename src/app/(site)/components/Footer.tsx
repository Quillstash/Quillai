"use client";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Github, href: "#" },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">QuillAI</h3>
            <p className="text-gray-600">
              Your all-in-one AI article generator for SEO success.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
              <li><a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
              <li><a href="/https://quillstash.com" className="text-gray-600 hover:text-gray-900">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-gray-900">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Product Hunt Embed */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://www.producthunt.com/posts/quillai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-quillai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=769435&theme=light&t=1736488067369"
              alt="QuillAi - AI-powered SEO tools for effortless organic growth | Product Hunt"
              style={{ width: "250px", height: "54px" }}
              width="250"
              height="54"
            />
          </a>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} QuillAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
