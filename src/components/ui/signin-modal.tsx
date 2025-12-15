"use client";
import React, { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignUp?: () => void;
}

export default function SignInModal({ open, onClose, onSwitchToSignUp }: SignInModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();
  const router = useRouter();

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
      onClose();
      // Redirect to writer page
      router.push('/writer');
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/writer`,
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  const handleSwitchToSignUp = () => {
    if (onSwitchToSignUp) {
      onSwitchToSignUp();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4">
      <div className="bg-card-bg rounded-xl shadow-lg p-8 w-full max-w-sm border border-primary-yellow relative max-h-[90vh] overflow-y-auto scrollbar-hide">
        <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-text-white text-xl z-10" aria-label="Close">&times;</button>
        <h2 className="text-3xl font-bold text-primary-yellow text-center mb-2">Sign In</h2>
        <p className="text-text-muted text-center mb-6">Welcome back! Sign in to continue creating.</p>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-text-muted font-semibold" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 mb-4 rounded border border-primary-yellow bg-transparent text-text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label className="block mb-2 text-text-muted font-semibold" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 mb-2 rounded border border-border-color bg-transparent text-text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-text-muted text-sm">
              <input
                type="checkbox"
                className="mr-2 accent-primary-yellow"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="text-primary-yellow text-sm hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-yellow hover:bg-secondary-orange text-black font-bold py-2 rounded mb-4 transition-colors"
          >
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-border-color" />
          <span className="mx-2 text-text-muted text-sm">or</span>
          <hr className="flex-grow border-border-color" />
        </div>
        <button 
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-gray-100 text-black font-semibold py-2 rounded mb-4 border border-gray-300 hover:bg-gray-200 transition-colors"
        >
          <span className="text-lg">G</span>
          Continue with Google
        </button>
        <p className="text-center text-text-muted text-sm">
          Don't have an account?{' '}
          <span onClick={handleSwitchToSignUp} className="text-primary-yellow hover:underline font-semibold cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
}
