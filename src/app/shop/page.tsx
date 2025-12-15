'use client'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Image from 'next/image'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ShopPage() {
  // Example data for each category
  const categories = [
    {
      title: 'Popular Books and Bestsellers',
      images: [
        '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_1.png',
        '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_2.png',
        '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_3.png',
        '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_4.png',
        '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_5.png',
        '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_6.png',
        '/assets/Images/Shop Examples/Shop Examples/Popular Books and Bestsellers/Popular_Books_7.png',
        '/assets/Images/Shop Examples/Popular Books and Bestsellers/Popular_Books_8.png',
      ],
      author: 'Alex Chen',
    },
    {
      title: 'Superhero Comics',
      images: [
        '/assets/Images/Shop Examples/Superhero/Superhero_1.png',
        '/assets/Images/Shop Examples/Superhero/Superhero_2.png',
        '/assets/Images/Shop Examples/Superhero/Superhero_3.png',
        '/assets/Images/Shop Examples/Superhero/Superhero_4.png',
        '/assets/Images/Shop Examples/Superhero/Superhero_5.png',
        '/assets/Images/Shop Examples/Superhero/Superhero_6.png',
        '/assets/Images/Shop Examples/Superhero/Superhero_7.png',
        '/assets/Images/Shop Examples/Superhero/Superhero_8.png',
      ],
      author: 'Stan Jackson',
    },
    {
      title: 'Fantasy Adventures',
      images: [
        '/assets/Images/Shop Examples/Fantasy/Fantasy_1.png',
        '/assets/Images/Shop Examples/Fantasy/Fantasy_2.png',
        '/assets/Images/Shop Examples/Fantasy/Fantasy_3.png',
        '/assets/Images/Shop Examples/Fantasy/Fantasy_4.png',
        '/assets/Images/Shop Examples/Fantasy/Fantasy_5.png',
        '/assets/Images/Shop Examples/Fantasy/Fantasy_6.png',
        '/assets/Images/Shop Examples/Fantasy/Fantasy_7.png',
        '/assets/Images/Shop Examples/Fantasy/Fantasy_8.png',
      ],
      author: 'Eleanor Blackwood',
    },
    {
      title: 'Science Fiction',
      images: [
        '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_1.png',
        '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_2.png',
        '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_3.png',
        '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_4.png',
        '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_5.png',
        '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_6.png',
        '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_7.png',
        '/assets/Images/Shop Examples/Science Fiction/Science_Fiction_8.png',
      ],
      author: 'Isaac Sterling',
    },
  ]

  // Helper for horizontal scroll
  const scrollRow = (ref: React.RefObject<HTMLDivElement | null>, dir: number) => {
    if (ref.current) {
      ref.current.scrollBy({ left: dir * 400, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="py-8">
        <div className="max-w-full mx-auto px-4">
          {categories.map((cat, idx) => {
            const rowRef = useRef<HTMLDivElement>(null)
            return (
              <div key={cat.title} className="mb-12">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">{cat.title}</h2>
                <div className="relative">
                  <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-yellow-500 text-yellow-400 hover:text-black rounded-full p-2 transition-colors"
                    onClick={() => scrollRow(rowRef, -1)}
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <div
                    ref={rowRef}
                    className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-800 px-10"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {cat.images.map((img, i) => (
                      <div key={img} className="bg-gray-800 min-w-[220px] max-w-[220px] rounded-lg p-2 border-2 border-yellow-400 flex flex-col flex-shrink-0">
                        <div className="aspect-[3/4] bg-gray-700 rounded mb-2 overflow-hidden">
                          <Image src={img} alt={cat.title + ' ' + (i+1)} width={220} height={293} className="object-cover w-full h-full" />
                        </div>
                        <h3 className="text-white font-semibold text-sm mb-1 truncate">{cat.title} #{i+1}</h3>
                        <p className="text-gray-400 text-xs mb-1 truncate">by {cat.author}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-yellow-500 font-bold">4.{8-i}</span>
                          <button className="bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs font-semibold hover:bg-yellow-600 transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-yellow-500 text-yellow-400 hover:text-black rounded-full p-2 transition-colors"
                    onClick={() => scrollRow(rowRef, 1)}
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={28} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}