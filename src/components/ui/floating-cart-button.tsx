"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useRouter } from "next/navigation";

export function FloatingCartButton({ hidden = false }: { hidden?: boolean }) {
  const { cart } = useCart();
  const router = useRouter();
  const totalItems = cart.reduce((sum, c) => sum + Number(c.quantity), 0);
  console.log('Cart:', cart, 'Total items:', totalItems);
  if (totalItems === 0 || hidden) return null;

  const handleClick = () => {
    router.push('/cart');
  };

  return (
    <div className="fixed top-20 right-4 z-50 ">
      <Button
        onClick={handleClick}
        variant="default"
        className="rounded-full bg-yellow-500 text-black cursor-pointer flex items-center gap-2 px-4 py-6 transition-all duration-200 hover:scale-105 hover:-translate-y-1 hover:bg-yellow-500 hover:drop-shadow-lg hover:drop-shadow-yellow-400"
      >
        <ShoppingCart size={20} />
        <span className="text-sm font-semibold">
          {totalItems} item{totalItems > 1 ? 's' : ''} in cart
        </span>
      </Button>
    </div>
  );
}