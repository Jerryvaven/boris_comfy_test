"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Users, PenTool, Palette, Zap, Share, ShoppingBag } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Create Characters',
    description: 'Design your characters with detailed descriptions and let AI bring them to life with stunning illustrations.',
    icon: Users,
  },
  {
    number: 2,
    title: 'Write Your Story',
    description: 'Use our screenplay-style writing interface to craft compelling narratives with dialogue and action.',
    icon: PenTool,
  },
  {
    number: 3,
    title: 'Choose Your Style',
    description: 'Select from 18 unique art styles, from Sunday Morning cartoons to Manga and Photo-realistic.',
    icon: Palette,
  },
  {
    number: 4,
    title: 'Generate Illustrations',
    description: 'Watch as AI transforms your script into beautiful comic panels with your chosen art style.',
    icon: Zap,
  },
  {
    number: 5,
    title: 'Publish & Share',
    description: 'Export your comic as a PDF or send it to print services. Share your creation with the world!',
    icon: Share,
  },
  {
    number: 6,
    title: 'Sell in Our Shop',
    description: 'List your comics in our marketplace and earn from your creative work.',
    icon: ShoppingBag,
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-500 text-gray-900 rounded-lg flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <Icon className="w-6 h-6 text-yellow-500" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}