"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import {
  PRICING_PLANS,
  ALL_PLANS_FEATURES,
  CREDIT_PACKAGES,
} from "@/constants/pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Empower Your Creative Journey
            </motion.h1>
            <motion.p
              className="text-xl text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Transform your scripts into stunning visual narratives. Choose the
              plan that fits your creative ambitions and join our community of
              storytellers.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative bg-black/70 rounded-xl p-6 border flex flex-col h-full ${
                  plan.popular
                    ? "border-yellow-500 ring-2 ring-yellow-500/20"
                    : "border-yellow-500/20"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  borderColor: plan.popular
                    ? "rgba(234, 179, 8, 0.6)"
                    : "rgba(234, 179, 8, 0.4)",
                  boxShadow: plan.popular
                    ? "0 20px 40px rgba(234, 179, 8, 0.2)"
                    : "0 20px 40px rgba(234, 179, 8, 0.1)",
                }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </motion.div>
                )}

                <div className="text-center mb-6">
                  <motion.h3
                    className="text-xl font-bold text-white mb-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {plan.name}
                  </motion.h3>
                  <div className="mb-2">
                    <motion.span
                      className="text-3xl font-bold text-white"
                      whileHover={{ scale: 1.1, color: "#eab308" }}
                      transition={{ duration: 0.2 }}
                    >
                      {plan.price}
                    </motion.span>
                    <span className="text-gray-300 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{plan.description}</p>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + featureIndex * 0.05,
                        }}
                        whileHover={{ x: 5 }}
                      >
                        <Check className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                        <span className="text-gray-200 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    className={`w-full ${
                      plan.popular
                        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                        : "border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* All Plans Include Section */}
          <motion.div
            className="bg-black/50 rounded-xl p-8 mb-16 border border-yellow-500/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.h2
              className="text-2xl font-bold text-white mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              All Plans Include
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ALL_PLANS_FEATURES.map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <motion.div
                    className="bg-yellow-500/10 p-3 rounded-xl w-fit mx-auto mb-3"
                    whileHover={{
                      backgroundColor: "rgba(234, 179, 8, 0.2)",
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="h-6 w-6 text-yellow-500" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Need More Credits Section */}
          <motion.div
            className="bg-black/50 rounded-xl p-8 mb-16 border border-yellow-500/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.h2
              className="text-2xl font-bold text-white mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Need More Credits?
            </motion.h2>
            <motion.p
              className="text-gray-300 text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              Purchase additional illustration credits anytime
            </motion.p>

            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {CREDIT_PACKAGES.map((credit, index) => (
                <motion.div
                  key={index}
                  className={`bg-black/70 rounded-xl p-6 border text-center cursor-pointer ${
                    credit.bestValue
                      ? "border-yellow-500/30 ring-1 ring-yellow-500/20"
                      : "border-yellow-500/20"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                    borderColor: "rgba(234, 179, 8, 0.5)",
                    boxShadow: "0 10px 30px rgba(234, 179, 8, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="text-2xl font-bold text-white mb-2"
                    whileHover={{ scale: 1.1, color: "#eab308" }}
                    transition={{ duration: 0.2 }}
                  >
                    {credit.credits}
                  </motion.div>
                  <div className="text-gray-300 text-sm mb-3">Credits</div>
                  <div className="text-lg font-semibold text-white">
                    {credit.price}
                  </div>
                  {credit.bestValue && (
                    <motion.div
                      className="text-xs text-yellow-500 mt-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.5 }}
                    >
                      BEST VALUE
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="bg-black/70 rounded-xl p-8 border border-yellow-500/30 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{
              borderColor: "rgba(234, 179, 8, 0.5)",
              boxShadow: "0 10px 30px rgba(234, 179, 8, 0.1)",
            }}
          >
            <motion.h2
              className="text-2xl font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              Have questions about our pricing?
            </motion.h2>
            <motion.p
              className="text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Our team is here to help you choose the right plan for your
              creative journey.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                className="bg-yellow-500 text-black hover:bg-yellow-600 border-yellow-500"
              >
                View FAQ
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
