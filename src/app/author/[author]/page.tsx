"use client";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import { categories } from "@/constants/shop-categories";
import {
  AiOutlineStar,
  AiOutlineHeart,
  AiOutlineSmile,
  AiOutlineBook,
  AiOutlineDown,
} from "react-icons/ai";
import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";
import { ComicCard } from "@/components/ui/comic-card";
import { useCart } from "@/contexts/cart-context";
import { useState, useMemo } from "react";

export default function AuthorPage() {
  const params = useParams();
  const authorSlug = params.author as string;
  const authorName = authorSlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("most-popular");
  const { cart, addToCart: contextAddToCart, updateQuantity } = useCart();

  const addToCart = (cat: any, i: number) => {
    const key = `${cat.title}-${i}`;
    const item = {
      title: cat.title,
      number: i + 1,
      author: cat.author,
      price: `4.${8 - i}`,
      summary: cat.summaries[i],
    };
    contextAddToCart(item, key);
  };

  // Find the category for this author
  const authorCategory = categories.find(
    (cat) => cat.author.toLowerCase().replace(/\s+/g, "-") === authorSlug
  );

  if (!authorCategory) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-yellow-400 mb-8">
              Author not found
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Mock stats - in a real app, these would come from a database
  const stats = {
    rating: 4.8,
    hearts: 12400,
    laughs: 8200,
    comics: authorCategory.images.length,
  };

  const bio = `${authorName} is a talented storyteller bringing ${authorCategory.title.toLowerCase()} to life through captivating narratives and stunning artwork.`;

  // Use the existing profile avatar image
  const profileImageUrl = "/assets/Images/profileAvatar.png";

  // Sort comics based on selected option
  const sortedComics = useMemo(() => {
    if (!authorCategory) return [];
    
    const comicsWithData = authorCategory.images.map((img, i) => ({
      image: img,
      index: i,
      title: authorCategory.title,
      number: i + 1,
      author: authorName,
      summary: authorCategory.summaries[i],
      price: parseFloat(`4.${8 - i}`),
      priceString: `4.${8 - i}`,
    }));

    switch (sortOption) {
      case "latest":
        // Latest = highest number (reverse order)
        return comicsWithData.sort((a, b) => b.number - a.number);
      case "a-z":
        // Sort by title + number
        return comicsWithData.sort((a, b) => {
          const titleA = `${a.title} #${a.number}`;
          const titleB = `${b.title} #${b.number}`;
          return titleA.localeCompare(titleB);
        });
      case "most-popular":
      default:
        // Most popular = higher price (lower index)
        return comicsWithData.sort((a, b) => b.price - a.price);
    }
  }, [authorCategory, authorName, sortOption]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="p-4 sm:p-8 md:p-12 bg-black   ">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header Section */}
          <header className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Profile Image & Public/Private Toggle */}
            <div className="flex flex-col items-center">
              {/* Profile Picture Container with Glow Effect */}
              <div className="relative p-1 rounded-full bg-gradient-to-br from-yellow-500 to-green-500 mb-4">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-black">
                  <img
                    src={profileImageUrl}
                    alt={`${authorName} Profile`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a default avatar if image fails to load
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjNDI0MjQyIi8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNDgiIHI9IjIwIiBmaWxsPSIjQTNBM0EzIi8+CjxwYXRoIGQ9Ik0xNiA5NmgyNGwxNi0xNnoiIGZpbGw9IiNBM0EzQTMiLz4KPHBhdGggZD0iTTMyIDEwNGgxNnYxNnoiIGZpbGw9IiNBM0EzQTMiLz4KPC9zdmc+";
                    }}
                  />
                </div>
              </div>

              {/* Public/Private Toggle - Commented out for admin use */}
              {/*
              <div className="flex items-center space-x-2 text-sm mt-2">
                <span className="font-semibold">Public</span>
                <label htmlFor="toggle" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" id="toggle" className="sr-only" defaultChecked />
                    <div className="block bg-gray-700 w-10 h-6 rounded-full"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4"></div>
                  </div>
                </label>
                <span className="text-gray-400">Private</span>
              </div>
              */}

              {/* Edit Profile Button - Commented out for admin use */}
              {/*
              <button className="mt-4 px-6 py-2 bg-yellow-500 text-gray-900 font-bold rounded shadow hover:bg-yellow-400 transition">
                Edit Profile
              </button>
              */}
            </div>

            {/* Profile Details (Name, Stats, Bio, Social) */}
            <div className="flex-1 w-full md:w-auto">
              <h1 className="text-4xl font-extrabold mb-4">
                {authorName}'s Shop
              </h1>

              {/* Stats Block */}
              <div className="flex flex-wrap gap-4 mb-6">
                {/* Rating */}
                <div className="flex items-center justify-center space-x-2 bg-black/70 border border-yellow-500/20 px-5 py-3 rounded-lg min-w-[120px]">
                  <AiOutlineStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-lg font-bold">{stats.rating}</span>
                  <span className="text-sm text-gray-300">RATING</span>
                </div>

                {/* Hearts */}
                <div className="flex items-center justify-center space-x-2 bg-black/70 border border-yellow-500/20 px-5 py-3 rounded-lg min-w-[120px]">
                  <AiOutlineHeart className="w-5 h-5 text-red-500 fill-red-500" />
                  <span className="text-lg font-bold">
                    {(stats.hearts / 1000).toFixed(1)}K
                  </span>
                  <span className="text-sm text-gray-300">HEARTS</span>
                </div>

                {/* Laughs */}
                <div className="flex items-center justify-center space-x-2 bg-black/70 border border-yellow-500/20 px-5 py-3 rounded-lg min-w-[120px]">
                  <AiOutlineSmile className="w-5 h-5 text-pink-400 fill-pink-400" />
                  <span className="text-lg font-bold">
                    {(stats.laughs / 1000).toFixed(1)}K
                  </span>
                  <span className="text-sm text-gray-300">LAUGHS</span>
                </div>

                {/* Comics */}
                <div className="flex items-center justify-center space-x-2 bg-black/70 border border-yellow-500/20 px-5 py-3 rounded-lg min-w-[120px]">
                  <AiOutlineBook className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-bold">{stats.comics}</span>
                  <span className="text-sm text-gray-300">COMICS</span>
                </div>
              </div>

              {/* Bio/Description */}
              <p className="text-gray-200 max-w-xl mb-6">{bio}</p>

              {/* Social Icons */}
              <div className="flex space-x-4 justify-end">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  <FaFacebookF className="w-5 h-5" />
                </a>
              </div>
            </div>
          </header>

          {/* Separator Line */}
          <hr className="border-t border-yellow-500/30 my-8" />

          {/* Published Comics Section Header */}
          <div className="flex justify-between items-center mt-8">
            <h2 className="text-2xl font-bold">Published Comics</h2>

            {/* Dropdown Menu (Most Popular) */}
            <div className="relative">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-black/70 border border-yellow-500/30 text-white py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
              >
                <option value="most-popular">Most Popular</option>
                <option value="latest">Latest</option>
                <option value="a-z">A-Z</option>
              </select>
              {/* Custom Arrow Icon for Select */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                <AiOutlineDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Comics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
            {sortedComics.map((comic) => {
              const cardKey = `${comic.title}-${comic.index}`;
              const cartItem = cart.find((c) => c.key === cardKey);
              return (
                <ComicCard
                  key={`${comic.index}-${sortOption}`}
                  title={comic.title}
                  number={comic.number}
                  author={comic.author}
                  image={comic.image}
                  summary={comic.summary}
                  price={comic.priceString}
                  cartKey={cardKey}
                  cartItem={cartItem}
                  onAddToCart={() => addToCart(authorCategory, comic.index)}
                  onUpdateQuantity={(delta) => updateQuantity(cardKey, delta)}
                  showOverlay={expandedCard === cardKey}
                  onToggleOverlay={() =>
                    setExpandedCard(expandedCard === cardKey ? null : cardKey)
                  }
                  showCartControls={true}
                  showAuthorName={false}
                />
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
