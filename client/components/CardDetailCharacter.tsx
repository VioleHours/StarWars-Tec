import Image from "next/image";

export interface Character {
  name: string;
  eye_color: string;
  birth_year: string;
  hair_color: string;
  height: string;
  skin_color: string;
  mass: string;
}

interface CardDetailCharacterProps {
  character: Character;
}

export default function CardDetailCharacter({
  character,
}: CardDetailCharacterProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-red-gradient text-white flex lg:flex-row w-[47rem] md:flex-col">
      <div className="flex justify-center">
        <Image
          src="/img/GenericCharacter.jpg"
          alt="Generic Character"
          width={500}
          height={700}
        />
      </div>
      <div className="flex flex-col w-full justify-center items-center p-4 gap-4">
        <h2 className="text-2xl font-semibold">{character.name}</h2>
        <p className="text-lg">Eye Color: {character.eye_color}</p>
        <p className="text-lg">Birth Year: {character.birth_year}</p>
        <p className="text-lg">Hair Color: {character.hair_color}</p>
        <p className="text-lg">Height: {character.height}</p>
        <p className="text-lg">Skin Color: {character.skin_color}</p>
        <p className="text-lg">Mass: {character.mass}</p>
      </div>
    </div>
  );
}
