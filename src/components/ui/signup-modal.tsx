"use client";
import React, { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "./modal";

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignIn?: () => void;
}

export default function SignUpModal({
  open,
  onClose,
  onSwitchToSignIn,
}: SignUpModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      name,
      email,
      password,
      confirmPassword,
    });
    setError("");

    if (password !== confirmPassword) {
      console.log("Passwords don't match");
      setError("Passwords do not match");
      return;
    }

    console.log("Attempting to sign up...");
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Signup error:", data.error);
      setError(data.error);
    } else {
      console.log("Signup successful!");
      setShowConfirmation(true);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/writer`,
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  const handleSwitchToSignIn = () => {
    if (onSwitchToSignIn) {
      onSwitchToSignIn();
    } else {
      router.push("/");
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <ModalContent className="bg-card-bg border-primary-yellow text-text-white max-w-sm max-h-[90vh] overflow-y-auto scrollbar-hide">
        {showConfirmation ? (
          <ModalHeader>
            <ModalTitle className="text-3xl font-bold text-primary-yellow text-center">
              Check Your Email
            </ModalTitle>
            <ModalDescription className="text-text-muted text-center">
              We've sent a confirmation link to your email. Please check your
              inbox and click the link to activate your account.
            </ModalDescription>
            <button
              onClick={onClose}
              className="w-full bg-primary-yellow hover:bg-secondary-orange text-black font-bold py-2 rounded transition-colors mt-4"
            >
              Close
            </button>
          </ModalHeader>
        ) : (
          <>
            <ModalHeader>
              <ModalTitle className="text-3xl font-bold text-primary-yellow text-center">
                Create Account
              </ModalTitle>
              <ModalDescription className="text-text-muted text-center">
                Join Inktron and start creating comics!
              </ModalDescription>
            </ModalHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block mb-2 text-text-muted font-semibold"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-2 rounded border border-primary-yellow bg-transparent text-text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-text-muted font-semibold"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 rounded border border-border-color bg-transparent text-text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-text-muted font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-2 rounded border border-border-color bg-transparent text-text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-text-muted font-semibold"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full px-4 py-2 rounded border border-border-color bg-transparent text-text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-yellow hover:bg-secondary-orange text-black font-bold py-2 rounded transition-colors"
              >
                Create Account
              </button>
            </form>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-border-color" />
              <span className="mx-2 text-text-muted text-sm">or</span>
              <hr className="flex-grow border-border-color" />
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 text-black font-semibold py-2 rounded border border-gray-300 hover:bg-gray-200 transition-colors"
            >
              <span className="text-lg">G</span>
              Sign up with Google
            </button>
            <p className="text-center text-text-muted text-sm mt-4">
              Already have an account?{" "}
              <span
                onClick={handleSwitchToSignIn}
                className="text-primary-yellow hover:underline font-semibold cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
