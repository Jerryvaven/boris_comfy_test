"use client";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComicCard } from "@/components/ui/comic-card";
import { useCart } from "@/contexts/cart-context";
import { categories } from "@/constants/shop-categories";

export default function ShopPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { cart, addToCart: contextAddToCart, updateQuantity } = useCart();

  const addToCart = (cat: any, i: number) => {
    const key = `${cat.title}-${i}`;
    const item = {
      title: cat.title,
      number: i + 1,
      author: cat.author,
      price: `4.${8 - i}`,
      summary: cat.summaries[i]
    };
    contextAddToCart(item, key);
  };

  // Helper for horizontal scroll
  const scrollRow = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: number
  ) => {
    if (ref.current) {
      ref.current.scrollBy({ left: dir * 400, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="py-8">
        <div className="max-w-full mx-auto px-4">
          {categories.map((cat) => {
            const rowRef = useRef<HTMLDivElement>(null);
            return (
              <div key={cat.title} className="mb-12">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  {cat.title}
                </h2>
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
                    className="flex gap-4 overflow-x-auto scrollbar-hide px-10"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    {cat.images.map((img, i) => {
                      const cardKey = `${cat.title}-${i}`;
                      const cartItem = cart.find(c => c.key === cardKey);
                      return (
                        <ComicCard
                          key={img}
                          title={cat.title}
                          number={i + 1}
                          author={cat.author}
                          image={img}
                          summary={cat.summaries[i]}
                          price={`4.${8 - i}`}
                          cartKey={cardKey}
                          cartItem={cartItem}
                          onAddToCart={() => addToCart(cat, i)}
                          onUpdateQuantity={(delta) => updateQuantity(cardKey, delta)}
                          showOverlay={expandedCard === cardKey}
                          onToggleOverlay={() =>
                            setExpandedCard(
                              expandedCard === cardKey ? null : cardKey
                            )
                          }
                        />
                      );
                    })}
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
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
