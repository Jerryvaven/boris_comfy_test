"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Target, Zap, FileText, DollarSign } from 'lucide-react'

const features = [
  {
    title: '18 Art Styles',
    description: 'From cartoon to photorealistic',
    icon: Target,
  },
  {
    title: 'Instant Generation',
    description: 'Create comics in minutes, not months',
    icon: Zap,
  },
  {
    title: 'Screenplay Format',
    description: 'Professional writing interface',
    icon: FileText,
  },
  {
    title: 'Monetize Your Work',
    description: 'Sell your comics in our shop',
    icon: DollarSign,
  },
]

export function WhyChoose() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose Inktron?
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-colors">
                  <Icon className="w-8 h-8 text-yellow-500" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}