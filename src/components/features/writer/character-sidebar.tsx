"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Palette, HelpCircle, Zap, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Character } from "@/types";
import CharacterInfoModal from "./charactor-infoModal";
import { cn } from "@/lib/utils";
import CreateCharacterModal from "./CreateCharacter";
import CharacterProfileModal from "./CharacterProfile";
interface CharacterSidebarProps {
  characters: Character[];
  selectedStyle?: string;
  onCharacterSelect: (character: Character) => void;
  onAddCharacter: () => void;
  onStyleSelect: () => void;
  onIllustrate: () => void;
  onPublish: () => void;
}

export function CharacterSidebar({
  characters,
  selectedStyle,
  onCharacterSelect,
  onAddCharacter,
  onStyleSelect,
  onIllustrate,
  onPublish,
}: CharacterSidebarProps) {
  const [open, setOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
const [createshow , setCreateshow] = useState(false)
  return (
    <div className="w-[76px]  bg-gray-800 border-r border-gray-700 flex flex-col items-center py-2 gap-2 overflow-visible">
      {/* Character Avatars */}
      <div className="flex flex-col items-center gap-2 flex-1 overflow-visible max-h-[calc(100vh-300px)] px-2">
        {characters.map((character) => (
          <div
            key={character.id}
            className="relative z-10"
            onMouseEnter={() => setHoveredCharacter(character.id)}
            onMouseLeave={() => setHoveredCharacter(null)}
          >
            <button
              onClick={() => {
                setSelectedCharacter(character);
                setOpen(true);
                setHoveredCharacter(null);
                onCharacterSelect(character);
              }}
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
               <div className="absolute left-20 -top-33 bg-gray-900  rounded-lg  z-[9999] pointer-events-none">
               <CharacterInfoModal
  visible={true}
  character={character}
/>
              </div>
            )}




          </div>



        ))}

        {/* Add Character Button */}
        <button
          onClick={() => setCreateshow(true)}
          className="w-14 h-14 rounded-full border-2 border-dashed border-gray-600 hover:border-yellow-500 flex items-center justify-center text-gray-400 hover:text-yellow-500 transition-colors"
        >
          <Plus className="h-6 w-6" />
        </button>

  <CreateCharacterModal
        isOpen={createshow}
        onClose={() => setCreateshow(false)}
        onSave={(d) => console.log("Saved", d)}
        onIllustrate={(d) => console.log("Illustrate", d)}
        onImport={(d) => console.log("Import", d)}
      />

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

        <Button variant="outline" size="sm" className="w-full text-xs" asChild>
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

      {/* Character Profile Modal - Outside the loop */}
      {selectedCharacter && (
        <CharacterProfileModal
          isOpen={open}
          data={{
            avatar: selectedCharacter.avatar || '',
            name: selectedCharacter.name,
            gender: selectedCharacter.gender,
            age: selectedCharacter.age,
            description: selectedCharacter.description
          }}
          onClose={() => {
            setOpen(false);
            setSelectedCharacter(null);
          }}
          onSave={(updated) => console.log("Updated:", updated)}
          onDelete={() => console.log("Deleted")}
          onClone={() => console.log("Cloned")}
        />
      )}
    </div>
  );
}
