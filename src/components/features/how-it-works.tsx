"use client";

import React from "react";
import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "../../constants/how-it-works";

export function HowItWorks() {
  const titleText = "HOW IT WORKS";
  const titleLetters = titleText.split("");

  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-5xl font-bold italic text-center mb-14 text-yellow-400 tracking-wide flex justify-center items-center flex-wrap"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {titleLetters.map((letter, index) => (
            <motion.span
              key={index}
              className={letter === " " ? "mx-2" : ""}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 50,
                  rotateX: -90,
                  scale: 0.5,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  },
                },
              }}
              whileHover={{
                scale: 1.2,
                color: "#f97316", // orange-500
                transition: { duration: 0.2 },
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              className="border border-gray-700 rounded-xl p-8 bg-gradient-to-br from-[#111] to-[#1a1a1a] flex flex-col min-h-[220px] relative hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:border-orange-500/50 group cursor-pointer"
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.8,
                rotateX: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              transition={{
                duration: 0.7,
                delay: idx * 0.15,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute -top-6 left-6 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 border-4 border-[#222] text-yellow-300 font-bold text-2xl shadow-lg group-hover:shadow-orange-500/50 transition-shadow"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15 + 0.3,
                  rotate: { duration: 0.8, ease: "easeInOut" },
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>
              <div className="mt-12">
                <motion.h3
                  className="text-lg font-extrabold text-yellow-400 mb-3 tracking-wide group-hover:text-orange-400 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 + 0.5 }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className="text-gray-200 text-base leading-relaxed group-hover:text-gray-100 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 + 0.7 }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
