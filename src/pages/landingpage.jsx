import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

// --- FAQ Data ---
const faqs = [
  {
    question: "Is my data secure?",
    answer: "Absolutely. The entire conversion process happens in your browser. Your JSON data is never sent to our servers, so your information remains completely private and secure."
  },
  {
    question: "Is this tool completely free to use?",
    answer: "Yes. This tool is 100% free with no usage limits. It's a resource built for the developer community."
  },
  {
    question: "How does it handle complex, nested JSON?",
    answer: "The tool is designed to be recursive. It intelligently 'walks' through your entire JSON structure, no matter how deeply nested, and generates separate, clean interfaces for each nested object to keep your code organized."
  }
];

// --- The Main Home Page Component ---
export default function LandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
        
        <header className="text-center mb-12 md:mb-20">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
            Generate Code from JSON.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Stop manually writing types. Paste your JSON data and get clean,
            accurate, and ready-to-use code instantly.
          </p>
        </header>

        <main className="text-center mb-20 md:mb-24">
          <Link 
            to="/converter"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform transform hover:scale-105 inline-block"
          >
            Get Started
          </Link>
        </main>
        
        <section className="max-w-4xl mx-auto mb-20 md:mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg">
                  <button
                    className="w-full flex justify-between items-center text-left p-4"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-200">{faq.question}</h3>
                    <ChevronDown 
                      className={`transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  {openFaqIndex === index && (
                    <div className="p-4 pt-0">
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
        </section>

        <footer className="text-center text-gray-500 border-t border-gray-800 pt-8 mt-20">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p>
              Made with ❤️ in Delhi.
            </p>
            <div className="flex items-center gap-6 text-gray-400">
              <a 
                href="mailto:vaibhavpandey0509@gmail.com" 
                className="hover:text-blue-400 transition-colors"
              >
                vaibhavpandey0509@gmail.com
              </a>
              <span className="text-gray-600">|</span>
              <a 
                href="tel:+919236454423" 
                className="hover:text-blue-400 transition-colors"
              >
                +91 9236454423
              </a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}