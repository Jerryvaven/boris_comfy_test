"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const showcaseComics = [
  // Popular Books
  {
    id: 'pop1',
    title: 'The Great Adventure - Volume 1',
    image: '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_1.png',
  },
  {
    id: 'pop2',
    title: 'City Heroes - The Beginning',
    image: '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_2.png',
  },
  {
    id: 'pop3',
    title: 'Mystery of the Lost Kingdom',
    image: '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_3.png',
  },
  {
    id: 'pop4',
    title: 'Tales from Tomorrow',
    image: '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_4.png',
  },
  // Fantasy Comics
  {
    id: 'fan1',
    title: 'Crown of Thorns - The Cursed Heir',
    image: '/assets/Images/Shop Examples/Fantasy/Fantasy_1.png',
  },
  {
    id: 'fan2',
    title: 'Dragon\'s Realm - Forbidden Magic',
    image: '/assets/Images/Shop Examples/Fantasy/Fantasy_2.png',
  },
  {
    id: 'fan3',
    title: 'The Enchanted Forest Chronicles',
    image: '/assets/Images/Shop Examples/Fantasy/Fantasy_3.png',
  },
  {
    id: 'fan4',
    title: 'Wizard\'s Quest - Dragon\'s Bargain',
    image: '/assets/Images/Shop Examples/Fantasy/Fantasy_4.png',
  },
  // Science Fiction
  {
    id: 'sci1',
    title: 'Colony Ship Omega - The Awakening',
    image: '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_1.png',
  },
  {
    id: 'sci2',
    title: 'Galactic Wars - New Horizons',
    image: '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_2.png',
  },
  {
    id: 'sci3',
    title: 'Space Rangers - The Hidden Deck',
    image: '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_3.png',
  },
  {
    id: 'sci4',
    title: 'Cyber Punk 2099 - Digital Dreams',
    image: '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_4.png',
  },
  // Superhero Comics
  {
    id: 'hero1',
    title: 'Thunder Strike - Origin Story',
    image: '/assets/Images/Shop Examples/Superhero/Superhero_1.png',
  },
  {
    id: 'hero2',
    title: 'Night Guardian - City of Shadows',
    image: '/assets/Images/Shop Examples/Superhero/Superhero_2.png',
  },
  {
    id: 'hero3',
    title: 'Cosmic Defender - Universal Threat',
    image: '/assets/Images/Shop Examples/Superhero/Superhero_3.png',
  },
  {
    id: 'hero4',
    title: 'Steel Warrior - Mechanical Mayhem',
    image: '/assets/Images/Shop Examples/Superhero/Superhero_4.png',
  },
]

const showcaseComics2 = [
  // More Popular Books
  {
    id: 'pop5',
    title: 'Ancient Legends - Lost Civilization',
    image: '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_5.png',
  },
  {
    id: 'pop6',
    title: 'Urban Chronicles - Street Stories',
    image: '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_6.png',
  },
  {
    id: 'pop7',
    title: 'The Last Hope - Rising Dawn',
    image: '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_7.png',
  },
  {
    id: 'pop8',
    title: 'Midnight Tales - Dark Secrets',
    image: '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_8.png',
  },
  // More Fantasy
  {
    id: 'fan5',
    title: 'Mystic Realms - Shadow Prophecy',
    image: '/assets/Images/Shop Examples/Fantasy/Fantasy_5.png',
  },
  {
    id: 'fan6',
    title: 'Elven Chronicles - Ancient Magic',
    image: '/assets/Images/Shop Examples/Fantasy/Fantasy_6.png',
  },
  {
    id: 'fan7',
    title: 'Kingdom of Storms - Shattered Throne',
    image: '/assets/Images/Shop Examples/Fantasy/Fantasy_7.png',
  },
  {
    id: 'fan8',
    title: 'The Dark Sorcerer - Final Battle',
    image: '/assets/Images/Shop Examples/Fantasy/Fantasy_8.png',
  },
  // More Science Fiction
  {
    id: 'sci5',
    title: 'Starship Voyager - Deep Space Mutiny',
    image: '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_5.png',
  },
  {
    id: 'sci6',
    title: 'Robot Revolution - AI Uprising',
    image: '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_6.png',
  },
  {
    id: 'sci7',
    title: 'Mars Colony - Arrival Protocol',
    image: '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_7.png',
  },
  {
    id: 'sci8',
    title: 'Time Travelers - Paradox Effect',
    image: '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_8.png',
  },
  // More Superhero
  {
    id: 'hero5',
    title: 'Phoenix Force - Rebirth Saga',
    image: '/assets/Images/Shop Examples/Superhero/Superhero_5.png',
  },
  {
    id: 'hero6',
    title: 'Quantum Hero - Dimensional Crisis',
    image: '/assets/Images/Shop Examples/Superhero/Superhero_6.png',
  },
  {
    id: 'hero7',
    title: 'Storm Bringer - Weather Wars',
    image: '/assets/Images/Shop Examples/Superhero/Superhero_7.png',
  },
  {
    id: 'hero8',
    title: 'Mind Master - Psychic Powers',
    image: '/assets/Images/Shop Examples/Superhero/Superhero_8.png',
  },
]

function MarqueeRow({ comics, direction = 'left' }: { comics: typeof showcaseComics, direction?: 'left' | 'right' }) {
  return (
    <div className={`flex transition  gap-6 ${direction === 'left' ? 'marquee-left' : 'marquee-right'} overflow-hidden`}>
      <div className="flex gap-6 marquee-content ">
        {[...comics, ...comics].map((comic, index) => (
          <Link
            key={`${comic.id}-${index}`}
            href={`/reader?comic=${comic.id}`}
            className="flex-shrink-0 group"
          >
            <div className="relative w-48 h-72 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src={comic.image}
                alt={comic.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* <h3 className="text-white text-sm font-medium line-clamp-2">
                  {comic.title}
                </h3> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function CommunityShowcase() {
  return (
    <section className="py-16 bg-gray-950">
      <div className=" mx-auto px-2">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Created by Our Community
        </motion.h2>
        
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <MarqueeRow comics={showcaseComics} direction="left" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <MarqueeRow comics={showcaseComics2} direction="right" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}