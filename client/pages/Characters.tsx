import axios from "axios";
import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import CardCharacters, { Character } from "@/components/CardCharacters";

interface CharactersProps {
  characters: Character[];
}

export default function Characters({ characters }: CharactersProps) {
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(characters);
  const [eyeColors, setEyeColors] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [selectedEyeColor, setSelectedEyeColor] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");

  // Filtrar personajes cuando cambian las opciones de filtro
  useEffect(() => {
    let filteredChars = characters;

    if (selectedEyeColor !== "") {
      filteredChars = filteredChars.filter(char => char.eye_color === selectedEyeColor);
    }

    if (selectedGender !== "") {
      filteredChars = filteredChars.filter(char => char.gender === selectedGender);
    }

    setFilteredCharacters(filteredChars);
  }, [selectedEyeColor, selectedGender]);

  // Obtener opciones de filtro
  useEffect(() => {
    const eyeColorSet = new Set(characters.map(char => char.eye_color));
    const genderSet = new Set(characters.map(char => char.gender));

    // Eliminar opciones vacías
    setEyeColors(Array.from(eyeColorSet).filter(color => color.trim() !== ""));
    setGenders(Array.from(genderSet).filter(gender => gender.trim() !== ""));
  }, [characters]);

  // Reiniciar filtros
  const resetFilters = () => {
    setSelectedEyeColor("");
    setSelectedGender("");
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
            onChange={e => setSelectedEyeColor(e.target.value)}
            value={selectedEyeColor}
          >
            <option value="">Select Eye Color</option>
            {eyeColors.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md text-black"
            onChange={e => setSelectedGender(e.target.value)}
            value={selectedGender}
          >
            <option value="">Select Gender</option>
            {genders.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={resetFilters}
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const characters = await getCharacters("https://swapi.dev/api/people/");
    const filteredCharacters = characters.map((character) => {
      const filteredProperties: Character = {
        name: "",
        eye_color: "",
        gender: "",
      };
      Object.entries(character).forEach(([key, value]) => {
        if (value !== "n/a" && value !== "unknown") {
          filteredProperties[key] = String(value);
        }
      });
      return filteredProperties;
    });

    return {
      props: {
        characters: filteredCharacters,
      },
    };
  } catch (error) {
    console.error("Error fetching characters:", error);
    return {
      props: {
        characters: [],
      },
    };
  }
};

const getCharacters = async (
  url: string,
  allCharacters: any[] = []
): Promise<any[]> => {
  const response = await axios.get(url);
  const characters = response.data.results;
  allCharacters = [...allCharacters, ...characters];

  if (response.data.next) {
    return getCharacters(response.data.next, allCharacters);
  } else {
    return allCharacters;
  }
};
