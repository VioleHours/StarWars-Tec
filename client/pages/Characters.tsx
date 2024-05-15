import CardCharacters from "@/components/CardCharacters";
import { fetchCharacters, useCharacterStore } from "@/store/CharactersStore";
import { useEffect } from "react";

export default function Characters() {
  const {
    filteredCharacters,
    eyeColors,
    genders,
    selectedEyeColor,
    selectedGender,
    setSelectedEyeColor,
    setSelectedGender,
    resetFilters,
  } = useCharacterStore();

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    const filteredChars = useCharacterStore
      .getState()
      .characters.filter((char) => {
        if (selectedEyeColor !== "" && char.eye_color !== selectedEyeColor) {
          return false;
        }

        if (selectedGender !== "" && char.gender !== selectedGender) {
          return false;
        }

        return true;
      });

    useCharacterStore.setState({ filteredCharacters: filteredChars });
  }, [selectedEyeColor, selectedGender]);

  const handleResetFilters = () => {
    resetFilters();
  };

  return (
    <div className="relative w-full min-h-screen overflow-auto bg-char-wars bg-cover bg-no-repeat bg-center backdrop-blur-sm">
      <div className="absolute inset-0 backdrop-blur-xs p-4">
        <h1 className="flex justify-center items-center p-4 text-2xl">
          Characters
        </h1>
        <div className="flex justify-center space-x-4 p-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md text-black"
            onChange={(e) => setSelectedEyeColor(e.target.value)}
            value={selectedEyeColor}
          >
            <option value="">Select Eye Color</option>
            {eyeColors.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md text-black"
            onChange={(e) => setSelectedGender(e.target.value)}
            value={selectedGender}
          >
            <option value="">Select Gender</option>
            {genders.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={handleResetFilters}
          >
            Reset Filters
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCharacters.map((char, index) => (
            <CardCharacters key={index} char={char} />
          ))}
        </div>
      </div>
    </div>
  );
}
