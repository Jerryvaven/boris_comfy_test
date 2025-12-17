"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaChevronLeft, FaChevronRight, FaVideo } from "react-icons/fa";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  youtubeId: string;
}

const INSTRUCTIONAL_VIDEOS: Video[] = [
  {
    id: "1",
    title: "Getting Started with AI Comic Creation",
    description:
      "Learn the fundamentals of creating comics with artificial intelligence",
    thumbnail: "https://img.youtube.com/vi/vMthc9yHgX8/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/vMthc9yHgX8",
    youtubeId: "vMthc9yHgX8",
  },
  {
    id: "2",
    title: "Advanced Comic Techniques",
    description:
      "Master advanced storytelling and visual composition techniques",
    thumbnail: "https://img.youtube.com/vi/1VfQ1q6_H9k/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/1VfQ1q6_H9k",
    youtubeId: "1VfQ1q6_H9k",
  },
  {
    id: "3",
    title: "Professional Comic Publishing",
    description:
      "Learn how to publish and distribute your finished comics professionally",
    thumbnail: "https://img.youtube.com/vi/bdHnxPxHol0/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/bdHnxPxHol0",
    youtubeId: "bdHnxPxHol0",
  },
];

export function InstructionalVideos() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % Math.ceil(INSTRUCTIONAL_VIDEOS.length / 3)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(INSTRUCTIONAL_VIDEOS.length / 3)) %
        Math.ceil(INSTRUCTIONAL_VIDEOS.length / 3)
    );
  };

  const getCurrentVideos = () => {
    const startIndex = currentIndex * 3;
    return INSTRUCTIONAL_VIDEOS.slice(startIndex, startIndex + 3);
  };

  const handleVideoClick = (video: Video) => {
    // Open YouTube video in new tab
    window.open(video.youtubeUrl, "_blank");
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Instructional Videos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch step-by-step tutorials to master comic creation with AI
          </p>
        </motion.div>

        {/* Video Slider */}
        <div className="relative">
          {/* Navigation Buttons - Only show if more than 3 videos */}
          {INSTRUCTIONAL_VIDEOS.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300"
                disabled={currentIndex === 0}
              >
                <FaChevronLeft className="text-lg" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300"
                disabled={
                  currentIndex >= Math.ceil(INSTRUCTIONAL_VIDEOS.length / 3) - 1
                }
              >
                <FaChevronRight className="text-lg" />
              </button>
            </>
          )}

          {/* Video Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
                INSTRUCTIONAL_VIDEOS.length > 3 ? "px-12" : "px-4"
              }`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {getCurrentVideos().map((video, index) => (
                <motion.div
                  key={video.id}
                  className="group cursor-pointer h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 overflow-hidden hover:bg-yellow-500/5 transition-all duration-300 h-full flex flex-col">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video bg-gray-800 flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-yellow-500/10 p-2.5 rounded-lg border border-yellow-500/20 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                          <FaPlay className="text-xl text-yellow-500 group-hover:text-black ml-1" />
                        </div>
                      </div>

                      {/* YouTube Badge */}
                      <div className="absolute bottom-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        YouTube
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-6 flex-grow flex flex-col min-h-[120px]">
                      <h3
                        className="text-lg font-semibold text-white mb-2 overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {video.title}
                      </h3>
                      <p
                        className="text-gray-200 leading-relaxed flex-grow overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {video.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators - Only show if more than 3 videos */}
          {INSTRUCTIONAL_VIDEOS.length > 3 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({
                length: Math.ceil(INSTRUCTIONAL_VIDEOS.length / 3),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-yellow-500"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
