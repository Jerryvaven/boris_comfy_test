import React from "react";

interface CharacterData {
  avatar: string;
  name: string;
  gender: string;
  age: number | string;
  description: string;
}

interface CharacterProfileModalProps {
  isOpen: boolean;
  data: CharacterData;
  onClose: () => void;
  onSave: (updatedData: CharacterData) => void;
  onDelete: () => void;
  onClone?: () => void;
}

const CharacterProfileModal: React.FC<CharacterProfileModalProps> = ({
  isOpen,
  data,
  onClose,
  onSave,
  onDelete,
  onClone,
}) => {
  const [formData, setFormData] = React.useState<CharacterData>(data);

  React.useEffect(() => {
    setFormData(data); // modal reopen → data refresh
  }, [data]);

  if (!isOpen) return null;

  const handleChange = (field: keyof CharacterData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] text-white rounded-xl w-full max-w-[1000px] p-6 shadow-xl relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute right-4 top-4 text-xl">
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold mb-6 text-yellow-400">
          Character Profile
        </h2>

        {/* Avatar */}
        <div className="flex justify-start mb-6">
          <img
            src={formData.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-yellow-400"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Character's Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full p-2 rounded bg-[#2A2A2A] border border-gray-600"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Gender</label>
          <input
            type="text"
            disabled
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Age</label>
          <input
            type="number"
            disabled
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            rows={4}
            disabled
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full p-2 rounded bg-gray-700  border border-gray-600"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between gap-4 flex-wrap lg:flex-nowrap">
          <button
            onClick={onClone}
            className="px-6 py-2  w-full bg-gray-600 hover:bg-gray-500"
          >
            CLONE
          </button>

          <button
            onClick={() => onSave(formData)}
            className="px-6 py-2  w-full bg-gray-500 hover:bg-gray-500"
          >
            SAVE
          </button>
          <button
            onClick={onDelete}
            className="px-6 py-2 w-full  bg-red-600 hover:bg-red-500"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterProfileModal;
