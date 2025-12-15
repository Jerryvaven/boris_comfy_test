

'use client'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/features/hero-section'
import { CommunityShowcase } from '@/components/features/community-showcase'
import { HowItWorks } from '@/components/features/how-it-works'
import { WhyChoose } from '@/components/features/why-choose'
import SignInModal from '@/components/ui/signin-modal'
import SignUpModal from '@/components/ui/signup-modal'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (showSignIn || showSignUp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSignIn, showSignUp]);

  useEffect(() => {
    if (searchParams.get('signin') === 'true') {
      setShowSignIn(true)
    }
  }, [searchParams])

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const handleCloseSignIn = () => {
    setShowSignIn(false);
    if (searchParams.get('signin') === 'true') {
      router.replace('/', { scroll: false });
    }
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false);
    if (searchParams.get('signup') === 'true') {
      router.replace('/', { scroll: false });
    }
  };
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main>
        <HeroSection onSignIn={() => setShowSignIn(true)} />
        <CommunityShowcase />
        <HowItWorks />
        <WhyChoose />
      </main>
      <Footer />
      <SignInModal open={showSignIn} onClose={handleCloseSignIn} onSwitchToSignUp={handleSwitchToSignUp} />
      <SignUpModal open={showSignUp} onClose={handleCloseSignUp} onSwitchToSignIn={handleSwitchToSignIn} />
    </div>
  )
}