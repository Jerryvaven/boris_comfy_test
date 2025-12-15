import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const faqs = [
  {
    question: "How does AI comic creation work?",
    answer: "Our AI analyzes your script and character descriptions to generate professional-quality comic panels. You write the story in a screenplay format, and our AI handles the visual storytelling, creating consistent characters and dynamic scenes."
  },
  {
    question: "Do I need drawing skills to create comics?",
    answer: "Not at all! That's the beauty of Inktron Comics. You just need to be able to tell a story. Our AI handles all the visual aspects, from character design to panel composition."
  },
  {
    question: "How many art styles are available?",
    answer: "We offer 18 unique art styles ranging from Sunday Morning cartoons to photorealistic renders. Free users have access to 8 styles, while Pro subscribers get access to all 18 styles."
  },
  {
    question: "Can I sell my comics?",
    answer: "Yes! You retain full ownership of your creations and can sell them through our marketplace or export them for external distribution."
  },
  {
    question: "What's the difference between free and Pro accounts?",
    answer: "Free accounts include 100 monthly credits, access to 8 art styles, and basic features. Pro accounts offer unlimited credits, all 18 art styles, priority processing, and advanced editing tools."
  },
  {
    question: "How does the credit system work?",
    answer: "Credits are used for AI generation tasks like creating character images and illustrating panels. Free users get 100 credits monthly, which is enough for about 2-3 complete comics."
  },
  {
    question: "Can I collaborate with other creators?",
    answer: "Yes! Pro accounts include collaboration features that let you share projects and work together with other creators in real-time."
  },
  {
    question: "What formats can I export my comics in?",
    answer: "You can export your comics as high-resolution PDFs, individual PNG images, or print-ready files. Pro users also get access to web-optimized formats for online publishing."
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300">
              Everything you need to know about creating comics with AI
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-8 border border-yellow-500/20">
              <h2 className="text-2xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-300 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <button className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}