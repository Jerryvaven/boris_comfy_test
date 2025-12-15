"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Plus, Palette, HelpCircle, Zap, Share } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Character } from '@/types'
import { cn } from '@/lib/utils'

interface CharacterSidebarProps {
  characters: Character[]
  selectedStyle?: string
  onCharacterSelect: (character: Character) => void
  onAddCharacter: () => void
  onStyleSelect: () => void
  onIllustrate: () => void
  onPublish: () => void
}

export function CharacterSidebar({
  characters,
  selectedStyle,
  onCharacterSelect,
  onAddCharacter,
  onStyleSelect,
  onIllustrate,
  onPublish
}: CharacterSidebarProps) {
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null)

  return (
    <div className="w-[76px] bg-gray-800 border-r border-gray-700 flex flex-col items-center py-2 gap-2">
      {/* Character Avatars */}
      <div className="flex flex-col items-center gap-2 flex-1 overflow-y-auto max-h-[calc(100vh-300px)] px-2">
        {characters.map((character) => (
          <div
            key={character.id}
            className="relative"
            onMouseEnter={() => setHoveredCharacter(character.id)}
            onMouseLeave={() => setHoveredCharacter(null)}
          >
            <button
              onClick={() => onCharacterSelect(character)}
              className="w-14 h-14 rounded-full bg-gray-700 border-2 border-transparent hover:border-yellow-500 transition-colors overflow-hidden"
            >
              {character.avatar ? (
                <Image
                  src={character.avatar}
                  alt={character.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  {character.name.charAt(0).toUpperCase()}
                </div>
              )}
            </button>
            
            {/* Character Info Tooltip */}
            {hoveredCharacter === character.id && (
              <div className="absolute left-full ml-2 top-0 bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-lg z-50 w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">
                    {character.avatar ? (
                      <Image
                        src={character.avatar}
                        alt={character.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        {character.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm uppercase">
                      {character.name}
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gender:</span>
                    <span className="text-white">{character.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Age:</span>
                    <span className="text-white">{character.age}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-gray-400 text-xs mb-1">Description:</div>
                  <div className="text-white text-xs leading-relaxed">
                    {character.description}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Add Character Button */}
        <button
          onClick={onAddCharacter}
          className="w-14 h-14 rounded-full border-2 border-dashed border-gray-600 hover:border-yellow-500 flex items-center justify-center text-gray-400 hover:text-yellow-500 transition-colors"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-2 w-full px-2 mt-auto">
        <Button
          onClick={onStyleSelect}
          variant="primary"
          size="sm"
          className={cn(
            "w-full text-xs font-semibold",
            !selectedStyle && "animate-pulse-custom"
          )}
        >
          <Palette className="h-3 w-3 mr-1" />
          Style
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          asChild
        >
          <a href="/faq">
            <HelpCircle className="h-3 w-3 mr-1" />
            FAQ
          </a>
        </Button>
        
        <Button
          onClick={onIllustrate}
          variant="outline"
          size="sm"
          className="w-full text-xs"
        >
          <Zap className="h-3 w-3 mr-1" />
          Illustrate
        </Button>
        
        <Button
          onClick={onPublish}
          variant="outline"
          size="sm"
          className="w-full text-xs"
        >
          <Share className="h-3 w-3 mr-1" />
          Publish
        </Button>
      </div>
    </div>
  )
}