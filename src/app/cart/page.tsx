"use client";
import { Navbar } from "@/components/layout/navbar";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";

import { X, Check, Plus, Minus } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import { PurchaseType } from "@/types";
import {
  CART_PRICES,
  PURCHASE_OPTIONS,
  CART_MESSAGES,
  PURCHASE_TYPE_LABELS,
} from "@/constants/cart";

import Image from "next/image";

type ItemImageProps = {
  title: string;
  number?: number;
  author?: string;
};

const ItemImage = ({ title, number, author }: ItemImageProps) => {
  // Function to get comic cover image path
  const getCoverImagePath = (title: string, number?: number) => {
    // For now, always return Captain America cover since we're using it for testing
    // In a real app, this would map different comics to their respective cover images
    if (
      title.toLowerCase().includes("captain america") ||
      title.toLowerCase().includes("captain-america")
    ) {
      return "/assets/Images/Captain America/Captain_1.jpg";
    }

    // Default fallback for other comics
    return "/assets/Images/Captain America/Captain_1.jpg";
  };

  return (
    <div className="w-24 h-32 bg-black/70 border border-yellow-500/20 rounded-lg overflow-hidden shrink-0 relative">
      <Image
        src={getCoverImagePath(title, number)}
        alt={`${title} Cover`}
        fill
        className="object-cover"
        onError={(e) => {
          // Fallback to placeholder if image fails to load
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling?.classList.remove("hidden");
        }}
      />
      {/* Fallback placeholder */}
      <div className="hidden absolute inset-0 flex items-center justify-center">
        <span className="text-xs text-gray-400 text-center p-2 leading-tight">
          {title
            .split(" ")
            .map((w: string) => w[0])
            .join("")}
        </span>
      </div>
    </div>
  );
};
type PurchaseOptionsProps = {
  selectedOption: PurchaseType;
  onChange: (option: PurchaseType) => void;
  prices: Record<PurchaseType, string>;
};
const PurchaseOptions = ({
  selectedOption,
  onChange,
  prices,
}: PurchaseOptionsProps) => (
  <div className="flex flex-col space-y-2 w-56 shrink-0">
    <button
      type="button"
      className={`bg-black/70 p-2 rounded-lg flex justify-between items-center border ${
        selectedOption === "pdf" ? "border-yellow-500" : "border-yellow-500/20"
      } focus:outline-none ${
        selectedOption === "pdf" ? "ring-2 ring-yellow-500" : ""
      }`}
      onClick={() => onChange("pdf")}
    >
      <span
        className={`text-sm flex items-center gap-2 ${
          selectedOption === "pdf" ? "text-white" : "text-gray-400"
        }`}
      >
        <Check size={16} className="text-yellow-500" /> PDF Download
      </span>
      <span
        className={`font-bold ${
          selectedOption === "pdf" ? "text-yellow-500" : "text-gray-400"
        }`}
      >
        ${prices.pdf}
      </span>
    </button>
    <button
      type="button"
      className={`bg-black/70 p-2 rounded-lg flex justify-between items-center border ${
        selectedOption === "print"
          ? "border-yellow-500"
          : "border-yellow-500/20"
      } focus:outline-none ${
        selectedOption === "print" ? "ring-2 ring-yellow-500" : ""
      }`}
      onClick={() => onChange("print")}
    >
      <span
        className={`text-sm ${
          selectedOption === "print" ? "text-white" : "text-gray-400"
        }`}
      >
        Print Edition
      </span>
      <span
        className={`font-bold ${
          selectedOption === "print" ? "text-yellow-500" : "text-gray-400"
        }`}
      >
        ${prices.print}
      </span>
    </button>
    <button
      type="button"
      className={`bg-black/70 p-2 rounded-lg flex justify-between items-center border relative ${
        selectedOption === "bundle"
          ? "border-yellow-500"
          : "border-yellow-500/20"
      } focus:outline-none ${
        selectedOption === "bundle" ? "ring-2 ring-yellow-500" : ""
      }`}
      onClick={() => onChange("bundle")}
    >
      {selectedOption === "bundle" && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-xs font-bold text-black px-2 py-0.5 rounded-full">
          BEST VALUE
        </div>
      )}
      <span
        className={`text-sm ${
          selectedOption === "bundle" ? "text-white" : "text-gray-400"
        }`}
      >
        🎁 Print + PDF Bundle
      </span>
      <span
        className={`font-bold ${
          selectedOption === "bundle" ? "text-yellow-500" : "text-gray-400"
        }`}
      >
        ${prices.bundle}
      </span>
    </button>
  </div>
);

export default function CartPage() {
  const { cart, updateQuantity } = useCart();
  // Track selected purchase option per cart item (by key)
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: PurchaseType;
  }>(() => {
    const initial: { [key: string]: PurchaseType } = {};
    cart.forEach((item) => {
      initial[item.key] = "pdf";
    });
    return initial;
  });

  const getPrices = (cartItem: any): Record<PurchaseType, string> =>
    CART_PRICES;

  // Calculate total price based on selected options
  const totalPrice = cart.reduce((sum, item) => {
    const option = (selectedOptions[item.key] || "pdf") as PurchaseType;
    const prices = getPrices(item);
    const price = parseFloat(prices[option]) || 2.0;
    return sum + price * item.quantity;
  }, 0);

  // Count and total for each selected type (for summary)
  const summary = cart.reduce(
    (acc, item) => {
      const option = (selectedOptions[item.key] || "pdf") as PurchaseType;
      const prices = getPrices(item);
      const price = parseFloat(prices[option]) || 2.0;
      acc[option].count += item.quantity;
      acc[option].total += price * item.quantity;
      return acc;
    },
    {
      pdf: { count: 0, total: 0 },
      print: { count: 0, total: 0 },
      bundle: { count: 0, total: 0 },
    } as Record<PurchaseType, { count: number; total: number }>
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-8">
              {CART_MESSAGES.SHOPPING_CART}
            </h1>
            <div className="text-center py-16">
              <p className="text-gray-300 text-lg mb-4">
                {CART_MESSAGES.EMPTY_CART}
              </p>
              <Link href="/shop">
                <Button variant="primary">
                  {CART_MESSAGES.CONTINUE_SHOPPING}
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">
            {CART_MESSAGES.SHOPPING_CART}
          </h1>
          <p className="text-gray-300 mb-6">{cart.length} items in your cart</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 🛒 Left Column: Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((cartItem) => (
                <div
                  key={cartItem.key}
                  className="bg-gray-900/50 rounded-lg p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-colors relative"
                >
                  <div className="flex gap-4">
                    {/* Item Image */}
                    <ItemImage
                      title={cartItem.item.title || "Item"}
                      number={cartItem.item.number}
                      author={cartItem.item.author}
                    />
                    {/* Item Details */}
                    <div className="flex flex-col justify-center space-y-2 flex-1">
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {cartItem.item.title || "Unknown Title"} #
                        {cartItem.item.number || "1"}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        by{" "}
                        <span className="text-yellow-400 font-medium">
                          {cartItem.item.author || "Unknown Author"}
                        </span>
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                        {cartItem.item.summary ||
                          "Complete comic issue with full story and artwork. Experience the adventure in high-quality digital format."}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="bg-yellow-400/20 text-yellow-400 text-xs px-2 py-1 rounded font-medium">
                          CBR Format
                        </span>
                        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded font-medium">
                          Digital Comic
                        </span>
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-medium">
                          Instant Download
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Quantity Controls and Purchase Options */}
                  <div className="flex items-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-gray-300 hover:text-white hover:bg-black/50"
                        onClick={() => updateQuantity(cartItem.key, -1)}
                        disabled={cartItem.quantity <= 1}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="text-white w-8 text-center font-medium">
                        {cartItem.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-gray-300 hover:text-white hover:bg-black/50"
                        onClick={() => updateQuantity(cartItem.key, 1)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    <PurchaseOptions
                      selectedOption={selectedOptions[cartItem.key] || "pdf"}
                      onChange={(option) =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [cartItem.key]: option,
                        }))
                      }
                      prices={getPrices(cartItem)}
                    />
                  </div>
                  {/* Remove Button (X) - Top Right Corner */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 text-gray-400 hover:bg-black/50"
                    onClick={() =>
                      updateQuantity(cartItem.key, -cartItem.quantity)
                    }
                  >
                    <X size={18} />
                  </Button>
                  {/* Price Column on the Far Right (as seen in the image) */}
                  <span className="text-white font-semibold flex items-center justify-center w-12 shrink-0">
                    {`$${(
                      parseFloat(
                        getPrices(cartItem)[
                          (selectedOptions[cartItem.key] ||
                            "pdf") as PurchaseType
                        ]
                      ) * cartItem.quantity
                    ).toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>
            {/* 💰 Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-black/70 rounded-lg p-6 sticky top-8 border border-yellow-500/30">
                <h2 className="text-xl font-bold text-white mb-6">
                  {CART_MESSAGES.ORDER_SUMMARY}
                </h2>
                {/* Breakdown lines for each type */}
                {(["pdf", "print", "bundle"] as PurchaseType[]).map((type) =>
                  summary[type].count > 0 ? (
                    <div
                      key={type}
                      className="flex justify-between text-gray-300 mb-2"
                    >
                      <span>
                        {PURCHASE_TYPE_LABELS[type]} ({summary[type].count})
                      </span>
                      <span>${summary[type].total.toFixed(2)}</span>
                    </div>
                  ) : null
                )}
                {/* Total line */}
                <div className="flex justify-between items-center text-3xl font-bold text-white py-4 border-t border-b border-yellow-500/30">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                {/* Action Buttons */}
                <div className="mt-6 space-y-4">
                  <Link href="/shop">
                    <Button
                      variant="outline"
                      className="w-full bg-black/70 border-yellow-500/30 text-white hover:bg-black/90 mb-6 "
                    >
                      {CART_MESSAGES.CONTINUE_SHOPPING}
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
                  >
                    {CART_MESSAGES.PROCEED_CHECKOUT}
                  </Button>
                </div>
                {/* Tip Box */}
                <div className="mt-6 p-3 bg-black/70 border border-yellow-500/20 rounded-lg text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-yellow-500">💡</span>
                  <span>{CART_MESSAGES.TIP_MESSAGE}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
