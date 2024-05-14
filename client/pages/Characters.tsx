import axios from "axios";
import { GetStaticProps } from "next";
import CardCharacters, { Character } from "@/components/CardCharacters";

interface CharactersProps {
  characters: Character[];
}

export default function Characters({ characters }: CharactersProps) {
  return (
    <div className="w-full h-full min-h-[100vh] bg-char-wars bg-cover bg-no-repeat bg-center backdrop-blur-sm">
      <div className="w-full h-full min-h-[100vh] backdrop-blur-xs p-4">
        <h1 className="flex justify-center items-center p-4 text-2xl">
          Characters
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map((char, index) => (
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
