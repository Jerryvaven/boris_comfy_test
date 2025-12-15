"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface HeroSectionProps {
  onSignIn?: () => void;
}

export function HeroSection({ onSignIn }: HeroSectionProps) {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])
  return (
    <section className="relative min-h-[80vh] px-[3rem] py-[2rem] flex justify-start items-center bg-[url('/assets/Images/For_Implementation/MikaelArtBrushHero_For_Index.png')] from-gray-950 via-gray-900 to-gray-950">
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[rgba(10,10,10,0.65)] backdrop-blur-md border border-yellow-400/30 rounded-2xl p-8 max-w-[420px]"
      >
        {/* Title */}
        <h1 className="mb-2 hero-title">
          <span className="block text-[2.8rem] font-extrabold italic text-[#F5E6C8] drop-shadow-lg leading-[1.1]">
            Create
          </span>
          <span className="block text-[4.2rem] font-extrabold italic text-yellow-400 tracking-[-2px] leading-none drop-shadow-[2px_2px_4px_rgba(0,0,0,0.4)]">
            COMICS
          </span>
        </h1>

        {/* WITH AI */}
        <div className="mt-[-0.8rem] mb-5 pl-[57%]">
          <span className="text-[1.6rem] italic text-[#F5E6C8] mr-1">
            with
          </span>

          {/* Glow Pulse for AI */}
          <span className="text-[3rem] font-extrabold italic text-yellow-400">
            AI
          </span>
        </div>

        {/* Description */}
        <p className="text-[0.95rem] text-white/95 leading-[1.65] mb-7">
          Transform your stories into stunning illustrated comics with the power
          of artificial intelligence.
          <br />
          Write like a screenwriter, illustrate like a pro.
        </p>

        {/* Start Button */}
        <Button
          id="heroSignInBtn"
          className="w-full px-16 py-6 rounded-full font-bold uppercase tracking-[3px] text-black text-[1rem] bg-gradient-to-tr from-secondary-orange via-primary-yellow to-primary-yellow shadow-[0_4px_15px_rgba(245,124,0,0.4)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(245,124,0,0.6)] transition-all duration-300"
          onClick={user ? () => router.push('/writer') : onSignIn}
        >
          {user ? 'Comic Writer' : 'Get Started'}
        </Button>
      </motion.div>
    </section>
  )
}