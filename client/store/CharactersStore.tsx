import create from "zustand";
import axios from "axios";

interface Character {
  name: string;
  eye_color: string;
  gender: string;
}

interface CharacterStore {
  characters: Character[];
  filteredCharacters: Character[];
  eyeColors: string[];
  genders: string[];
  selectedEyeColor: string;
  selectedGender: string;
  setCharacters: (characters: Character[]) => void;
  setFilteredCharacters: (characters: Character[]) => void;
  setEyeColors: (colors: string[]) => void;
  setGenders: (genders: string[]) => void;
  setSelectedEyeColor: (color: string) => void;
  setSelectedGender: (gender: string) => void;
  resetFilters: () => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  characters: [],
  filteredCharacters: [],
  eyeColors: [],
  genders: [],
  selectedEyeColor: "",
  selectedGender: "",
  setCharacters: (characters) => set({ characters }),
  setFilteredCharacters: (filteredCharacters) => set({ filteredCharacters }),
  setEyeColors: (eyeColors) => set({ eyeColors }),
  setGenders: (genders) => set({ genders }),
  setSelectedEyeColor: (selectedEyeColor) => set({ selectedEyeColor }),
  setSelectedGender: (selectedGender) => set({ selectedGender }),
  resetFilters: () => {
    set({ selectedEyeColor: "", selectedGender: "" });
  },
}));

export const fetchCharacters = async () => {
  try {
    const response = await axios.get("https://swapi.dev/api/people/");
    const characters: Character[] = response.data.results;

    const filteredCharacters: Character[] = characters.map(
      (character: any) => ({
        name:
          character.name !== "n/a" && character.name !== "unknown"
            ? character.name
            : "",
        eye_color:
          character.eye_color !== "n/a" && character.eye_color !== "unknown"
            ? character.eye_color
            : "",
        gender:
          character.gender !== "n/a" && character.gender !== "unknown"
            ? character.gender
            : "",
      })
    );

    const eyeColors: string[] = Array.from(
      new Set(filteredCharacters.map((char: Character) => char.eye_color))
    ).filter((color) => color.trim() !== "");

    const genders: string[] = Array.from(
      new Set(filteredCharacters.map((char: Character) => char.gender))
    ).filter((gender) => gender.trim() !== "");

    useCharacterStore.setState((state: CharacterStore) => ({
      ...state,
      characters: filteredCharacters,
      filteredCharacters: filteredCharacters,
      eyeColors: eyeColors,
      genders: genders,
    }));
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};
