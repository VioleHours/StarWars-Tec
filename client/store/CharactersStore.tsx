import create from "zustand";
import axios from "axios";

function getCharacterId(url: string): string {
  const segments = url.split("/");
  const index = segments.findIndex((segment) => segment === "people");
  if (index !== -1 && segments[index + 1]) {
    return segments[index + 1];
  }
  return "";
}

interface Character {
  name: string;
  eye_color: string;
  gender: string;
  url?: string;
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
  characterCounter: number;
  incrementCharacterCounter: () => void;
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
  characterCounter: 0,
  incrementCharacterCounter: () =>
    set((state) => ({ characterCounter: state.characterCounter + 1 })),
}));

export const fetchCharacters = async () => {
  try {
    let response = await axios.get("https://swapi.dev/api/people/");
    let characters: Character[] = response.data.results;

    while (response.data.next) {
      response = await axios.get(response.data.next);
      characters = characters.concat(response.data.results);
    }

    const filteredCharacters: Character[] = characters.map((character) => ({
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
      url: getCharacterId(character.url ? character.url : ""),
    }));

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
