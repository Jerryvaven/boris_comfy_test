"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import SignInModal from "@/components/ui/signin-modal";
import SignUpModal from "@/components/ui/signup-modal";
import Link from "next/link";

import { FaStar, FaRocket, FaLightbulb, FaUsers } from "react-icons/fa";
import {
  MISSION_VALUES,
  EMPOWERING_FEATURES,
  COMMUNITY_FEATURES,
} from "@/constants/mission";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function MissionPage() {
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
    } = supabase.auth.onAuthStateChange((_event, session) => {
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

  return (
    <div className="min-h-screen bg-black">
      <Navbar showSearch={false} />

      <main className="relative pt-24 pb-20">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Content */}
          <motion.div
            className="mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex items-center justify-center mb-6"
              variants={itemVariants}
            >
              <motion.div
                className="bg-yellow-500/10 p-4 rounded-2xl border border-yellow-500/20"
                whileHover={{ scale: 1.05 }}
              >
                <FaRocket className="text-5xl text-yellow-500" />
              </motion.div>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6 text-center"
              variants={itemVariants}
            >
              Our Mission
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-center"
              variants={itemVariants}
            >
              Democratizing comic creation through the power of artificial
              intelligence
            </motion.p>
          </motion.div>

          {/* Empowering Creators Section */}
          <motion.div
            className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-16 border border-yellow-500/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-yellow-500/10 p-3 rounded-xl">
                <FaLightbulb className="text-3xl text-yellow-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Empowering Creators
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-200 leading-relaxed text-lg">
                We empower writers, dreamers, and storytellers by providing them
                with AI-powered tools that transform their scripts into stunning
                visual narratives. Our platform bridges the gap between writing
                and illustration, making professional-quality comic creation
                accessible to everyone.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {EMPOWERING_FEATURES.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-black/30 rounded-xl p-6 border border-yellow-500/10"
                  >
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <feature.Icon className="text-yellow-500" />
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Building a Community Section */}
          <motion.div
            className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-16 border border-purple-500/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-purple-500/10 p-3 rounded-xl">
                <FaUsers className="text-3xl text-purple-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Building a Community
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-200 leading-relaxed text-lg">
                Inktron Comics isn't just a tool—it's a community of creators,
                readers, and comic enthusiasts. We're building a marketplace
                where creators can share their work, readers can discover new
                stories, and everyone can participate in the comic book
                renaissance.
              </p>
              <p className="text-gray-200 leading-relaxed text-lg">
                Our shop features the best creator-made comics, providing a
                platform for emerging talent to reach audiences worldwide.
              </p>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <FaStar className="text-2xl text-purple-500" />
                  <h3 className="text-xl font-semibold text-white">
                    Community Features
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  {COMMUNITY_FEATURES.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Mission Values Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {MISSION_VALUES.map((value, index) => (
              <motion.div
                key={index}
                className="group relative bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  borderColor: "rgba(234, 179, 8, 0.3)",
                }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`bg-gradient-to-br ${value.color} p-3 rounded-lg flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <value.Icon className="text-2xl text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Future Vision Section */}
          <motion.div
            className="bg-black/70 rounded-2xl p-8 md:p-12 border border-yellow-500/30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The Future of Comics
              </h2>
              <p className="text-gray-200 leading-relaxed mb-6 text-lg">
                We envision a world where the only limit to comic creation is
                imagination. By combining cutting-edge AI technology with
                intuitive design, we're not just creating a tool – we're
                fostering a new era of digital storytelling.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Join us in revolutionizing how stories are told, shared, and
                experienced in the digital age.
              </p>
              {user ? (
                <Link href="/writer">
                  <motion.button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Go to Writer</span>
                    <FaRocket />
                  </motion.button>
                </Link>
              ) : (
                <motion.button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSignInModal(true)}
                >
                  <span>Get Started</span>
                  <FaRocket />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />

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
    </div>
  );
}
