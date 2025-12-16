"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, Plus, Minus, ShoppingCart, X, Eye } from "lucide-react";

interface ComicCardProps {
  title: string;
  number: number;
  author: string;
  image: string;
  summary: string;
  price: string;
  cartKey?: string;
  cartItem?: {
    quantity: number;
  };
  onAddToCart?: () => void;
  onUpdateQuantity?: (delta: number) => void;
  showOverlay?: boolean;
  onToggleOverlay?: () => void;
  showCartControls?: boolean;
  showAuthorName?: boolean;
}

export function ComicCard({
  title,
  number,
  author,
  image,
  summary,
  price,
  cartKey,
  cartItem,
  onAddToCart,
  onUpdateQuantity,
  showOverlay = false,
  onToggleOverlay,
  showCartControls = true,
  showAuthorName = true,
}: ComicCardProps) {
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-gray-800 min-w-[220px] max-w-[220px] rounded-lg pl-2 pr-2 pb-2 pt-0 border-2 border-yellow-400 flex flex-col flex-shrink-0 relative hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-300 ease-out cursor-pointer mt-8">
      {/* Yellow Banner */}
      <div className="bg-yellow-400 text-black -ml-2 -mr-2 mt-0 px-2 py-3 rounded-t-lg flex justify-between items-center">
        <span className="text-sm font-semibold truncate flex-1 mr-2">
          {title} #{number}
        </span>
        {onToggleOverlay && (
          <button
            onClick={onToggleOverlay}
            className="text-black hover:text-gray-700"
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      <div className="aspect-[4/3] rounded-b-lg mb-2 -ml-2 -mr-2 flex items-center justify-center relative group">
        {image ? (
          <Image
            src={image}
            alt={`${title} ${number}`}
            width={220}
            height={165}
            className="object-contain w-full h-full"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
            <span className="text-4xl">🖼️</span>
            <span className="text-xs mt-2">Image not available</span>
          </div>
        )}
        
        {/* Read Overlay - appears on hover */}
        <Link 
          href={`/reader/${title.toLowerCase().replace(/\s+/g, "-")}-${number}`}
          className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg"
        >
          <Eye size={32} className="text-yellow-400 mb-2" />
          <span className="text-yellow-400 font-semibold text-sm">Read</span>
        </Link>
      </div>

      {showCartControls && (
        <div className="flex items-center justify-between text-xs mt-auto">
          <span className="text-yellow-500 font-bold flex items-center gap-1">
            <Star size={12} /> {price}
          </span>
          {quantity > 0 ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onUpdateQuantity?.(-1)}
                className="text-yellow-400 hover:bg-yellow-500 hover:text-black rounded px-1 py-0.5 transition-colors"
              >
                <Minus size={12} />
              </button>
              <span className="text-white font-semibold">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity?.(1)}
                className="text-yellow-400 hover:bg-yellow-500 hover:text-black rounded px-1 py-0.5 transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={onAddToCart}
              className="text-yellow-400 px-2 py-1 rounded text-xs font-semibold hover:bg-yellow-500 hover:text-black transition-colors flex items-center gap-1"
            >
              <ShoppingCart size={14} />
            </button>
          )}
        </div>
      )}

      {!showCartControls && (
        <div className="flex justify-center text-xs mt-auto">
          <span className="text-yellow-500 font-bold flex items-center gap-1">
            <Star size={12} /> {price}
          </span>
        </div>
      )}

      {showAuthorName && (
        <div className="text-center text-sm mt-1">
          <span className="text-white hover:text-yellow-400 hover:underline font-semibold">
            <Link
              href={`/author/${author.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white hover:text-yellow-400 hover:underline font-semibold"
            >
              {author}
            </Link>
          </span>
        </div>
      )}

      {/* Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-yellow-400 rounded-lg p-4 flex flex-col text-black overflow-y-auto scrollbar-hide">
          <button onClick={onToggleOverlay} className="self-end mb-2">
            <X size={20} />
          </button>
          <h3 className="font-semibold text-lg mb-2">
            {title} #{number}
          </h3>
          <p className="text-sm mb-2">[Sep 2025]</p>
          <p className="text-sm mb-2">Episode {number}: Supercal Freaky</p>
          <p className="text-sm mb-2">
            by{" "}
            <Link
              href={`/author/${author.toLowerCase().replace(/\s+/g, "-")}`}
              className="underline text-blue-800"
            >
              {author}
            </Link>
          </p>
          <p className="text-sm mb-4">{summary}</p>
          <p className="text-sm mb-2">Price: {price}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold">Rating:</span>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-bold">{price}</span>
            </div>
          </div>
          {quantity > 0 ? (
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-black font-semibold">Added</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onUpdateQuantity?.(-1)}
                  className="text-yellow-600 hover:bg-yellow-500 hover:text-black rounded px-1 py-0.5 transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-black font-semibold">{quantity}</span>
                <button
                  onClick={() => onUpdateQuantity?.(1)}
                  className="text-yellow-600 hover:bg-yellow-500 hover:text-black rounded px-1 py-0.5 transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onAddToCart}
              className="mt-auto bg-black text-yellow-400 px-4 py-2 rounded font-semibold hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
}
