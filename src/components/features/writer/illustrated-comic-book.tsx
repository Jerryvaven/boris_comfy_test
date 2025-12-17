"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Panel } from "@/types";
import { cn } from "@/lib/utils";
import { COMIC_BOOK_CONSTRAINTS } from "@/constants/writer";

interface IllustratedComicBookProps {
  panels: Panel[];
  currentPage: number;
  width?: number;
  onResize?: (width: number) => void;
  onReillustrate?: (panelId: string) => void;
}

export function IllustratedComicBook({
  panels,
  currentPage,
  width = COMIC_BOOK_CONSTRAINTS.DEFAULT_WIDTH,
  onResize,
  onReillustrate,
}: IllustratedComicBookProps) {
  const [selectedPanel, setSelectedPanel] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !onResize) return;
      
      const newWidth = window.innerWidth - e.clientX;
      
      if (newWidth >= COMIC_BOOK_CONSTRAINTS.MIN_WIDTH && newWidth <= COMIC_BOOK_CONSTRAINTS.MAX_WIDTH) {
        onResize(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, onResize]);

  return (
    <div 
      className="bg-vscode-sidebar border-l border-vscode flex flex-col h-full relative"
      style={{ width: `${width}px` }}
    >
      {/* Resize Handle */}
      <div
        ref={resizeRef}
        className="absolute left-0 top-0 w-1 h-full cursor-col-resize bg-vscode-border hover:bg-yellow-500 transition-colors z-10"
        onMouseDown={() => setIsResizing(true)}
      />

      {/* Header */}
      <div className="sticky top-0 bg-vscode-sidebar border-b border-vscode p-4">
        <h3 className="text-white font-semibold text-lg">
          Illustrated Comic Book
        </h3>
        <p className="text-gray-400 text-sm">
          Page {currentPage} • {panels.length} Panels
        </p>
      </div>

      {/* Comic Page Layout */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="relative w-full">
          {/* Comic Page Mockup Background */}
          <div className="relative w-full aspect-[8.5/11] bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/assets/Images/Comic Page Mockup.png"
              alt="Comic Page Template"
              fill
              className="object-contain"
              priority
            />
            
            {/* Overlay for panel interactions */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-8">
              {panels.slice(0, 6).map((panel, index) => (
                <div
                  key={panel.id}
                  className={cn(
                    "relative cursor-pointer transition-all duration-200 rounded border-2 border-transparent",
                    selectedPanel === panel.id
                      ? "border-yellow-500 bg-yellow-500/20"
                      : "hover:border-yellow-300/50 hover:bg-yellow-300/10",
                    // Panel layout variations
                    index === 0 ? "col-span-2" : "",
                    index === 5 ? "col-span-2" : ""
                  )}
                  onClick={() =>
                    setSelectedPanel(
                      selectedPanel === panel.id ? null : panel.id
                    )
                  }
                >
                  {/* Panel Number Indicator */}
                  <div className="absolute top-1 left-1 bg-black text-white text-xs px-1 rounded z-10">
                    {panel.number}
                  </div>

                  {/* Panel Content Indicator */}
                  {panel.description && (
                    <div className="absolute bottom-1 right-1 bg-white/80 text-black text-xs px-1 rounded max-w-16 truncate">
                      Panel {panel.number}
                    </div>
                  )}

                  {/* Speech Bubble Indicator */}
                  {panel.characters.length > 0 && panel.characters[0]?.dialogue && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-white border border-black rounded-full px-2 py-1 text-xs max-w-20 text-center">
                        💬
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add Panel Indicators for empty slots */}
              {Array.from({ length: Math.max(0, 6 - panels.length) }, (_, i) => (
                <div
                  key={`empty-${i}`}
                  className="border-2 border-dashed border-gray-400/50 rounded flex items-center justify-center text-gray-400/70"
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">+</div>
                    <div className="text-xs">Panel {panels.length + i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Page Info */}
          <div className="text-center mt-4 text-white text-sm">
            Brooklyn Fun Comics • Page {currentPage}
          </div>
        </div>

        {/* Re-illustrate Panel Button */}
        {selectedPanel && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                if (selectedPanel && onReillustrate) {
                  onReillustrate(selectedPanel);
                }
                setSelectedPanel(null);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              Re-illustrate Panel {(() => {
                const panel = panels.find((p) => p.id === selectedPanel);
                return panel ? panel.number : '';
              })()}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}