"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaQuestionCircle,
  FaEnvelope,
  FaComments,
  FaChevronDown,
} from "react-icons/fa";
import { FAQ_DATA, FAQ_CATEGORIES } from "@/constants/faq";
import { InstructionalVideos } from "@/components/features/instructional-videos";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const faqVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFAQs = FAQ_DATA.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar showSearch={false} />

      <main className="relative pb-20">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5  to-orange-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}

          {/* Instructional Videos Section - Moved to top */}
          <InstructionalVideos />

          {/* FAQ Section Title */}
          <motion.div
            className="text-center mb-8 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about creating comics with AI
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {FAQ_CATEGORIES.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-yellow-500 text-black"
                    : "bg-black/50 text-gray-300 border border-yellow-500/20 hover:border-yellow-500/30 hover:text-gray-200"
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <AnimatePresence mode="wait">
            <motion.div
              className="space-y-4 mb-12"
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={`${selectedCategory}-${index}`}
                  className="bg-black/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 overflow-hidden"
                  variants={faqVariants}
                  layout
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-start gap-4 hover:bg-yellow-500/5 transition-colors"
                  >
                    <div className="bg-yellow-500/10 p-2.5 rounded-lg flex-shrink-0 mt-1">
                      <faq.Icon className="text-xl text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <span className="inline-block bg-yellow-500/10 text-yellow-500 text-xs px-2.5 py-1 rounded-md mb-2 border border-yellow-500/20">
                            {faq.category}
                          </span>
                          <h3 className="text-lg font-semibold text-white">
                            {faq.question}
                          </h3>
                        </div>
                        <motion.div
                          className="text-gray-400 flex-shrink-0"
                          animate={{
                            rotate: openFAQ === index ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaChevronDown className="text-lg" />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pl-[88px]">
                          <p className="text-gray-200 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          <AnimatePresence>
            {filteredFAQs.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-black/50 p-6 rounded-xl inline-block mb-4 border border-yellow-500/20">
                  <FaQuestionCircle className="text-5xl text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No FAQs found
                </h3>
                <p className="text-gray-300">
                  Try adjusting your category filter
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Support Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-black/70 rounded-2xl p-8 md:p-12 border border-yellow-500/30">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is
                here to help you get started with your comic creation journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope />
                  <span>Contact Support</span>
                </motion.button>
                <motion.button
                  className="bg-black/70 hover:bg-black/90 text-white px-8 py-3 rounded-lg font-semibold border border-yellow-500/30 hover:border-yellow-500/50 inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaComments />
                  <span>Join Community</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
