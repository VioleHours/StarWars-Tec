import Image from "next/image";
import Link from "next/link";

export interface Character {
  name: string;
  eye_color: string;
  gender: string;
  url?: string;
}

interface CardCharacterProps {
  char: Character;
}

export default function CardCharacters({ char }: CardCharacterProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-red-gradient text-white">
      <Image
        src="/img/GenericCharacter.jpg"
        alt="Generic Character"
        width={500}
        height={300}
      />
      <h2 className="text-lg font-semibold">{char.name}</h2>
      <p className="text-sm">Eyes: {char.eye_color}</p>
      <p className="text-sm">Gender: {char.gender}</p>

      <Link href={`/Characters/${char.url}`}>
        <p className="text-red-500 hover:underline">View Details</p>
      </Link>
    </div>
  );
}
