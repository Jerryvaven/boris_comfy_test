import React from "react";
import Image from "next/image";
interface CharacterData {
  name: string;
  gender: string;
  age: number | string;
  description: string;
  avatar?: string;
}

interface CharacterInfoModalProps {
  character: CharacterData | null;
  visible: boolean;
}

const CharacterInfoModal: React.FC<CharacterInfoModalProps> = ({
  character,
  visible,
}) => {
  if (!character) return null;

  console.log(character, "character//////");

  return (
    <div
      className={` w-[400px] bg-[var(--card-bg)] border border-[var(--border-color)]
        rounded-2xl p-5 shadow-xl z-[99999] transition-opacity duration-200
        flex flex-col pointer-events-none ${
          visible
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible"
        }`}
    >
      {/* Arrow Pointer */}
      <div className="absolute top-[38%] -left-2 -translate-y-1/2">
        <div
          className="w-0 h-0 border-t-8 border-b-8 border-r-8 
            border-t-transparent border-b-transparent 
            border-r-[var(--border-color)] absolute"
        ></div>
        <div
          className="w-0 h-0 border-t-8 border-b-8 border-r-8 
            border-t-transparent border-b-transparent 
            border-r-[var(--card-bg)] ml-[1px] absolute"
        ></div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--border-color)]">
          {character.avatar ? (
            <Image
              src={character.avatar}
              alt={character.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="bg-gray-500 w-full h-full flex items-center justify-center">
              <span className="text-black font-bold uppercase">N/A</span>
            </div>
          )}
        </div>

        <div className="text-[var(--primary-yellow)] text-xl font-bold tracking-wide">
          {character.name}
        </div>
      </div>

      {/* Details */}
      <div className="flex gap-10 mb-4 pb-4 border-b border-[var(--border-color)]">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">
            Gender
          </span>
          <span className="text-lg text-[var(--text-white)] font-medium">
            {character.gender}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">
            Age
          </span>
          <span className="text-lg text-[var(--text-white)] font-medium">
            {character.age}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className=" py-4 mb-4 border-b border-[var(--border-color)]">
        <div className="uppercase text-xs tracking-wider text-[var(--text-muted)] mb-2 font-semibold">
          Description
        </div>

        <div className="text-sm leading-relaxed text-[var(--text-white)] opacity-90">
          {character.description}
        </div>
      </div>

      <div className="mt-3 px-4 w-full  flex justify-center">
        <button className="uppercase bg-transparent rounded-md border px-5 mx-auto py-2 text-xs tracking-wider text-[var(--text-muted)] mb-2 font-semibold">
          Clone
        </button>
      </div>
    </div>
  );
};

export default CharacterInfoModal;
