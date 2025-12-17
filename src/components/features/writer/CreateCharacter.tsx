import React, { useState, useEffect } from "react";

interface CreateCharacterData {
  name: string;
  gender: string;
  age: string | number;
  description: string;
  referenceImage?: File | null;
}

interface CreateCharacterModalProps {
  isOpen: boolean;
  initialData?: CreateCharacterData;
  onClose: () => void;
  onSave: (data: CreateCharacterData) => void;
  onIllustrate: (data: CreateCharacterData) => void;
  onImport: (data: CreateCharacterData) => void;
}

const CreateCharacterModal: React.FC<CreateCharacterModalProps> = ({
  isOpen,
  initialData,
  onClose,
  onSave,
  onIllustrate,
  onImport,
}) => {
  const [formData, setFormData] = useState<CreateCharacterData>({
    name: "",
    gender: "",
    age: "",
    description: "",
    referenceImage: null,
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  if (!isOpen) return null;

  const handleInput = (field: keyof CreateCharacterData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  // Image upload
  const handleImageUpload = (file: File | null) => {
    setFormData({ ...formData, referenceImage: file });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] text-white rounded-xl w-full max-w-[600px] p-6 shadow-xl relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute right-4 top-4 text-xl">
          ✕
        </button>

        <h2 className="text-2xl font-bold text-yellow-400 mb-6">
          Create Character
        </h2>

        {/* Character Name */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Character's Name</label>
          <input
            type="text"
            placeholder="What is your character's name?"
            value={formData.name}
            onChange={(e) => handleInput("name", e.target.value)}
            className="w-full p-2 bg-[#2A2A2A] border border-gray-600 rounded"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Gender</label>
          <input
            type="text"
            placeholder="What is your character's gender?"
            value={formData.gender}
            onChange={(e) => handleInput("gender", e.target.value)}
            className="w-full p-2 bg-[#2A2A2A] border border-gray-600 rounded"
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Age</label>
          <input
            type="number"
            placeholder="How old is your character?"
            value={formData.age}
            onChange={(e) => handleInput("age", e.target.value)}
            className="w-full p-2 bg-[#2A2A2A] border border-gray-600 rounded"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Description</label>
          <textarea
            rows={4}
            placeholder="Who or what does your character look like? skin color? hair color? eye color? unique features?"
            value={formData.description}
            onChange={(e) => handleInput("description", e.target.value)}
            className="w-full p-2 bg-[#2A2A2A] border border-gray-600 rounded"
          />
        </div>

        {/* Reference Image */}
        <div className="mb-4">
          <label className="block text-sm mb-1">
            Reference Image (optional)
          </label>

          <div className="border border-gray-600 rounded p-6 text-center bg-[#2A2A2A] cursor-pointer">
            <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
              />
              {formData.referenceImage ? (
                <p>{formData.referenceImage.name}</p>
              ) : (
                <>
                  <span className="text-3xl mb-2">🖼️</span>
                  <p>Click to upload reference image</p>
                </>
              )}
            </label>
          </div>

          <p className="text-xs mt-2 opacity-60">
            Upload a reference image for AI to use when generating this
            character (coming soon)
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => onSave(formData)}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            SAVE
          </button>

          <button
            onClick={() => onIllustrate(formData)}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 rounded font-semibold text-black"
          >
            ILLUSTRATE
          </button>

          <button
            onClick={() => onImport(formData)}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            IMPORT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacterModal;
