"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface HeroSectionProps {
  onSignIn?: () => void;
}

export function HeroSection({ onSignIn }: HeroSectionProps) {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);
  return (
    <motion.section
      className="relative min-h-[80vh] px-[3rem] py-[2rem] flex justify-start items-center bg-[url('/assets/Images/For_Implementation/MikaelArtBrushHero_For_Index.png')] bg-cover bg-center from-gray-950 via-gray-900 to-gray-950 overflow-hidden"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        backgroundPosition: {
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        },
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 4,
          }}
        />
      </div>

      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[rgba(10,10,10,0.65)] backdrop-blur-md border border-yellow-400/30 rounded-2xl p-12 max-w-[420px] min-h-[500px] relative z-10 flex flex-col justify-center ml-[8vw]"
        whileHover={{
          borderColor: "rgba(255, 193, 7, 0.5)",
          boxShadow:
            "0 8px 30px rgba(255, 193, 7, 0.4), 0 0 40px rgba(245, 124, 0, 0.3)",
          transition: { duration: 0.3 },
        }}
      >
        {/* Title with staggered animation */}
        <motion.h1
          className="mb-6 hero-title"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.span
            className="block text-[2.8rem] font-extrabold italic text-[#F5E6C8] drop-shadow-lg leading-[1.1]"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
          >
            Create
          </motion.span>
          <motion.span
            className="block text-[4.2rem] font-extrabold italic text-yellow-400 tracking-[-2px] leading-none drop-shadow-[2px_2px_4px_rgba(0,0,0,0.4)]"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, type: "spring", bounce: 0.4 },
              },
            }}
            animate={{
              textShadow: [
                "0 0 10px rgba(255, 193, 7, 0.5), 0 0 20px rgba(255, 193, 7, 0.3), 0 0 30px rgba(255, 193, 7, 0.2)",
                "0 0 20px rgba(255, 193, 7, 0.8), 0 0 40px rgba(255, 193, 7, 0.5), 0 0 60px rgba(255, 193, 7, 0.3)",
                "0 0 10px rgba(255, 193, 7, 0.5), 0 0 20px rgba(255, 193, 7, 0.3), 0 0 30px rgba(255, 193, 7, 0.2)",
              ],
            }}
            transition={{
              textShadow: {
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              },
            }}
          >
            COMICS
          </motion.span>
        </motion.h1>

        {/* WITH AI with enhanced animation */}
        <motion.div
          className="mt-[-0.8rem] mb-8 pl-[57%]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="text-[1.6rem] italic text-[#F5E6C8] mr-1">with</span>
          <motion.span
            className="text-[3rem] font-extrabold italic text-yellow-400"
            animate={{
              textShadow: [
                "0 0 20px rgba(255, 193, 7, 0.5), 0 0 40px rgba(255, 193, 7, 0.3)",
                "0 0 35px rgba(255, 193, 7, 0.7), 0 0 70px rgba(255, 193, 7, 0.4)",
                "0 0 20px rgba(255, 193, 7, 0.5), 0 0 40px rgba(255, 193, 7, 0.3)",
              ],
            }}
            transition={{
              textShadow: {
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
              },
            }}
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 30px rgba(255, 193, 7, 0.8)",
            }}
          >
            AI
          </motion.span>
        </motion.div>

        {/* Description with fade in */}
        <motion.p
          className="text-[0.95rem] text-white/95 leading-[1.65] mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          Transform your stories into stunning illustrated comics with the power
          of artificial intelligence.
          <br />
          Write like a screenwriter, illustrate like a pro.
        </motion.p>

        {/* Start Button with enhanced interactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}  
        >
          <Button
            id="heroSignInBtn"
            className="w-full px-20 py-8 rounded-full font-bold uppercase tracking-[3px] text-white text-[1.1rem] bg-gradient-to-r from-secondary-orange to-primary-yellow shadow-[0_0_40px_20px_rgba(245,124,0,0.4)] hover:scale-105 hover:text-black hover:from-primary-yellow hover:to-yellow-300 hover:shadow-[0_0_40px_20px_rgba(255,193,7,0.4)] transition-all duration-300"
            onClick={user ? () => router.push("/writer") : onSignIn}
          >
            {user ? "Writer" : "Get Started"}
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
