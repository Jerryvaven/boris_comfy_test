"use client";
import { ReaderNavbar } from "@/components/layout/reader-navbar";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import { DownloadSuccessModal } from "@/components/ui/download-success-modal";

type ViewMode = "dual" | "single" | "panel";

export default function ReaderPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const { addToCart } = useCart();

  const parts = slug.split("-");
  const number = parts[parts.length - 1];
  const originalTitle = parts
    .slice(0, -1)
    .join(" ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const title = "Captain America";
  const author = "Stan Jackson";
  const totalPages = 23;

  const getImagePath = (pageNumber: number) => {
    return `/assets/Images/Captain America/Captain_${pageNumber}.jpg`;
  };

  const getPageLabel = (pageNumber: number) => {
    if (pageNumber === 1) {
      return "Cover";
    }
    return `Page ${pageNumber - 1}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (viewMode === "panel") {
      const currentPageElement = document.querySelector(
        `[data-page="${currentPage}"]`
      );
      if (currentPageElement) {
        currentPageElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  }, [currentPage, viewMode]);

  const handleAddToCart = () => {
    const item = {
      title: originalTitle,
      number: parseInt(number),
      author: author,
      price: "4.99",
      summary: `${originalTitle} #${number} - Complete comic issue`,
    };
    const key = `${originalTitle}-${number}`;
    addToCart(item, key);
  };

  const handleDownload = async () => {
    try {
      // Simulate download process
      const link = document.createElement("a");
      link.href = "#"; // In a real implementation, this would be the actual CBR file URL
      link.download = `${originalTitle}_${number}.cbr`;
      link.click();

      // Show success modal instead of alert
      setShowDownloadModal(true);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  const handleNextPage = () => {
    if (viewMode === "dual") {
      if (currentPage === 1) {
        setCurrentPage(2);
      } else if (currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 2);
      }
    } else if (viewMode === "panel") {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handlePrevPage = () => {
    if (viewMode === "dual") {
      if (currentPage === 2) {
        setCurrentPage(1);
      } else if (currentPage > 2) {
        setCurrentPage(currentPage - 2);
      }
    } else if (viewMode === "panel") {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const renderComicContent = () => {
    switch (viewMode) {
      case "dual":
        if (currentPage === 1) {
          return (
            <div className="flex items-center justify-center w-full h-full p-8">
              <div className="relative w-full h-full max-w-lg flex items-center justify-center">
                <Image
                  src={getImagePath(1)}
                  alt="Captain America Cover"
                  fill
                  className="object-contain rounded-lg shadow-lg"
                  priority
                  onError={(e) => {
                    console.log(`Failed to load image: ${getImagePath(1)}`);
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          );
        }

        return (
          <div className="flex gap-8 items-center justify-center w-full h-full p-8">
            {/* Left page */}
            <div className="relative flex-1 h-full max-w-sm flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={getImagePath(currentPage)}
                  alt={`Captain America ${getPageLabel(currentPage)}`}
                  fill
                  className="object-contain rounded-lg shadow-lg"
                  priority
                  onError={(e) => {
                    console.log(
                      `Failed to load image: ${getImagePath(currentPage)}`
                    );
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
            {/* Right page */}
            {currentPage < totalPages && (
              <div className="relative flex-1 h-full max-w-sm flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={getImagePath(currentPage + 1)}
                    alt={`Captain America ${getPageLabel(currentPage + 1)}`}
                    fill
                    className="object-contain rounded-lg shadow-lg"
                    onError={(e) => {
                      console.log(
                        `Failed to load image: ${getImagePath(currentPage + 1)}`
                      );
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );

      case "panel":
        return (
          <div className="w-full h-full overflow-auto p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <div
                    key={pageNum}
                    data-page={pageNum}
                    className={`relative bg-gray-900 rounded-lg p-2 aspect-[3/4] cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                      pageNum === currentPage
                        ? "ring-2 ring-yellow-400 shadow-yellow-400/50"
                        : ""
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    <Image
                      src={getImagePath(pageNum)}
                      alt={`Captain America ${getPageLabel(pageNum)}`}
                      fill
                      className="object-contain rounded shadow-md"
                      onError={(e) => {
                        console.log(
                          `Failed to load image: ${getImagePath(pageNum)}`
                        );
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                      {getPageLabel(pageNum)}
                    </div>
                    {pageNum === currentPage && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-semibold">
                        Current
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center w-full h-full p-8">
            <div className="relative w-full h-full max-w-2xl flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={getImagePath(currentPage)}
                  alt={`Captain America ${getPageLabel(currentPage)}`}
                  fill
                  className="object-contain rounded-lg shadow-lg"
                  priority
                  onError={(e) => {
                    console.log(
                      `Failed to load image: ${getImagePath(currentPage)}`
                    );
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`min-h-screen bg-black ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      {!isFullscreen && (
        <ReaderNavbar
          title={originalTitle}
          number={number}
          author={author}
          rating={4.8}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onToggleFullscreen={toggleFullscreen}
          onAddToCart={handleAddToCart}
          onDownload={handleDownload}
          isFullscreen={isFullscreen}
        />
      )}

      <main className="flex-1 bg-black">
        <div
          className={`${
            isFullscreen ? "h-screen" : "h-[calc(100vh-120px)]"
          } flex items-center justify-center`}
        >
          <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            <div className="w-full h-full bg-black flex items-center justify-center relative">
              {renderComicContent()}

              {
                <>
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage <= 1}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-yellow-400/90 text-black rounded-full hover:bg-yellow-300 disabled:bg-gray-600/50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors z-20 backdrop-blur-sm"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={handleNextPage}
                    disabled={
                      viewMode === "dual"
                        ? currentPage === 1
                          ? false
                          : currentPage >= totalPages - 1
                        : currentPage >= totalPages
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-yellow-400/90 text-black rounded-full hover:bg-yellow-300 disabled:bg-gray-600/50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors z-20 backdrop-blur-sm"
                    aria-label="Next page"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              }

              {/* Fullscreen Exit Button */}
              {isFullscreen && (
                <button
                  onClick={toggleFullscreen}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-20 backdrop-blur-sm"
                  aria-label="Exit fullscreen"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 0 2-2h3M3 16h3a2 2 0 0 0 2 2v3" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {!isFullscreen && (
          <div className="bg-black border-t border-gray-700 px-4 py-3">
            <div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                className="p-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-white text-sm">
                  {currentPage === 1
                    ? "Cover"
                    : viewMode === "dual"
                    ? "Pages"
                    : viewMode === "panel"
                    ? "Selected Page"
                    : "Page"}
                </span>
                <select
                  value={currentPage}
                  onChange={(e) => {
                    const newPage = parseInt(e.target.value);
                    if (viewMode === "dual") {
                      if (newPage === 1) {
                        setCurrentPage(1); // Cover
                      } else {
                        setCurrentPage(
                          newPage % 2 === 0 ? newPage : newPage + 1
                        );
                      }
                    } else {
                      setCurrentPage(newPage);
                    }
                  }}
                  className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm"
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      let displayText;
                      if (page === 1) {
                        displayText = "Cover";
                      } else if (
                        viewMode === "dual" &&
                        page > 1 &&
                        page < totalPages
                      ) {
                        displayText = `${getPageLabel(page)}-${getPageLabel(
                          page + 1
                        )}`;
                      } else {
                        displayText = getPageLabel(page);
                      }

                      return (
                        <option key={page} value={page}>
                          {displayText}
                        </option>
                      );
                    }
                  )}
                </select>
                <span className="text-white text-sm">
                  ({totalPages - 1} pages + cover)
                </span>
              </div>

              <button
                onClick={handleNextPage}
                disabled={
                  viewMode === "dual"
                    ? currentPage === 1
                      ? false
                      : currentPage >= totalPages - 1
                    : currentPage >= totalPages
                }
                className="p-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Download Success Modal */}
      <DownloadSuccessModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        fileName={`${originalTitle}_${number}.cbr`}
        fileSize="2.4 MB"
      />
    </div>
  );
}
