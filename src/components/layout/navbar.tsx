"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import SignInModal from "@/components/ui/signin-modal";
import SignUpModal from "@/components/ui/signup-modal";

interface NavbarProps {
  className?: string;
  showSearch?: boolean;
}

export function Navbar({ className, showSearch = true }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (showSignInModal || showSignUpModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showSignInModal, showSignUpModal]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const genres = [
    { value: "", label: "All Genres" },
    { value: "popular", label: "Popular" },
    { value: "superhero", label: "Superhero" },
    { value: "fantasy", label: "Fantasy" },
    { value: "scifi", label: "Science Fiction" },
    { value: "romance", label: "Romance" },
    { value: "mystery", label: "Mystery" },
    { value: "horror", label: "Horror" },
    { value: "comedy", label: "Comedy" },
  ];

  return (
    <nav
      className={cn(
        "bg-gray-950 border-b-2 border-yellow-500/60 sticky top-0 z-50 h-[90px] px-2 py-4",
        className
      )}
    >
      <div className="flex items-center justify-between h-full">
        {/* Left Section */}
        <div className="flex items-center gap-3 ml-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/Images/For_Implementation/InktronComicsText.png"
              alt="Inktron Comics"
              width={200}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-4 ml-8">
            <Link
              href="/shop"
              className="text-white hover:text-yellow-500 font-medium px-4 py-2 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/mission"
              className="text-white hover:text-yellow-500 font-medium px-4 py-2 transition-colors"
            >
              Mission
            </Link>
            <Link
              href="/faq"
              className="text-white hover:text-yellow-500 font-medium px-4 py-2 transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/pricing"
              className="text-white hover:text-yellow-500 font-medium px-4 py-2 transition-colors"
            >
              Pricing
            </Link>
          </div>
        </div>

        {/* Center Search */}
        {showSearch && (
          <div className="flex items-center gap-3 flex-1 max-w-md mx-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search comics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:border-yellow-500 focus:outline-none"
            >
              {genres.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.label}
                </option>
              ))}
            </select>

            {(searchQuery || selectedGenre) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("");
                }}
              >
                Clear
              </Button>
            )}
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-3 mr-2">
          {user ? (
            <>
              <Link href="/writer">
                <Button variant="primary">Writer</Button>
              </Link>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                onClick={() => setShowSignInModal(true)}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Sign In Modal */}
      <SignInModal
        open={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSwitchToSignUp={() => {
          setShowSignInModal(false);
          setShowSignUpModal(true);
        }}
      />

      {/* Sign Up Modal */}
      <SignUpModal
        open={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onSwitchToSignIn={() => {
          setShowSignUpModal(false);
          setShowSignInModal(true);
        }}
      />
    </nav>
  );
}
