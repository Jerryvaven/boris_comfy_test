import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { FloatingCartButton } from "@/components/ui/floating-cart-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inktron Comics - AI-Powered Comic Book Creation",
  description: "Transform your stories into stunning illustrated comics with the power of artificial intelligence. Write like a screenwriter, illustrate like a pro.",
  keywords: "AI comics, comic creation, digital comics, storytelling, illustration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        <CartProvider>
          {children}
          <FloatingCartButton />
        </CartProvider>
      </body>
    </html>
  );
}
