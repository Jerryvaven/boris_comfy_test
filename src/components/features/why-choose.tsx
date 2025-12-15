"use client"
import { motion } from 'framer-motion'
import { WHY_CHOOSE_FEATURES } from '@/constants/why-choose'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export function WhyChoose() {
  const titleText = "WHY CHOOSE INKTRON?"
  const titleLetters = titleText.split("")

  return (
    <section className="py-20 bg-[#181818]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-yellow-400 tracking-wide uppercase flex justify-center items-center flex-wrap"
          style={{letterSpacing: '0.03em'}}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              }
            }
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
                  scale: 0.5
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
                    damping: 15
                  }
                }
              }}
              whileHover={{
                scale: 1.2,
                color: "#f97316", // orange-500
                transition: { duration: 0.2 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {WHY_CHOOSE_FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-[#1a1a1a] hover:bg-[#202020] transition-colors duration-300 cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <Icon className="w-14 h-14 text-yellow-400" strokeWidth={2.5} />
                </motion.div>
                <div className="font-extrabold text-lg uppercase text-yellow-400 mb-1 tracking-wide">{feature.title}</div>
                <div className="text-gray-300 text-base font-normal">{feature.description}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}