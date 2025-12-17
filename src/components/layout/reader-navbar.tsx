"use client";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart, Maximize2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

type ViewMode = "dual" | "single" | "panel";

interface ReaderNavbarProps {
  title: string;
  number: string;
  author: string;
  rating?: number;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  onToggleFullscreen?: () => void;
  onAddToCart?: () => void;
  onDownload?: () => void;
  isFullscreen?: boolean;
}

export function ReaderNavbar({
  title,
  number,
  author,
  rating = 4.8,
  viewMode = "single",
  onViewModeChange,
  onToggleFullscreen,
  onAddToCart,
  onDownload,
  isFullscreen = false,
}: ReaderNavbarProps) {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-black border-b border-gray-700 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section - Back Button and Title */}
        <div className="flex items-center gap-4">
          <Link
            href="/shop"
            className="flex items-center gap-2 px-3 py-1.5 border border-yellow-400 rounded text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="flex flex-col">
            <h1 className="text-white text-lg font-bold">
              {title}: Dark Mirror
            </h1>
            <p className="text-gray-400 text-sm">by {author}</p>
          </div>
        </div>

        {/* Center Section - Reading Mode Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewModeChange?.("dual")}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              viewMode === "dual"
                ? "bg-yellow-400 text-black font-medium"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Dual
          </button>
          <button
            onClick={() => onViewModeChange?.("single")}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              viewMode === "single"
                ? "bg-yellow-400 text-black font-medium"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Single
          </button>
          <button
            onClick={() => onViewModeChange?.("panel")}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              viewMode === "panel"
                ? "bg-yellow-400 text-black font-medium"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Panel
          </button>
        </div>

        {/* Right Section - Rating, Cart, and Fullscreen */}
        <div className="flex items-center gap-4">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={`${
                    star <= Math.floor(rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-white text-sm font-medium ml-1">
              {rating}
            </span>
          </div>

          {/* Download Button */}
          <button
            onClick={onDownload}
            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
            title="Download CBR"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>

          {/* Add to Cart */}
          <button
            onClick={onAddToCart}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-full font-medium hover:bg-yellow-300 transition-colors"
            title="Add to Cart"
          >
            <ShoppingCart size={16} />
            <span className="text-sm">Add to Cart</span>
          </button>

          {/* Cart Link */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-full font-medium hover:bg-gray-600 transition-colors"
            title="View Cart"
          >
            <ShoppingCart size={16} />
            <span className="text-sm">{cartItemCount}</span>
          </Link>

          {/* Fullscreen */}
          <button
            onClick={onToggleFullscreen}
            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}
