import Image from "next/image";

export interface Film {
  title: string;
  episode_id: number;
  director: string;
  characters: { name: string; url: string }[];
}

export interface Character {
    name: string,
    url: string,
}

interface CardDetailFilmProps {
  film: Film;
  character: Character;
}

export default function CardDetailFilm({
  film,
  character,
}: CardDetailFilmProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-blue-gradient text-black flex flex-row w-[47rem] md:flex-col">
      <div className="flex justify-center">
        <Image src="/img/GenericFilm.jpg" alt="Generic Film" width={600} height={800}/>
      </div>
      <div className="flex flex-col w-full items-center p-4">
        <h2 className="text-lg font-semibold">{film.title}</h2>
        <p className="text-sm">Episode: {film.episode_id}</p>
        <p className="text-sm">Director: {film.director}</p>
        <h3 className="text-lg font-semibold mt-4">Characters:</h3>
        <ul>
          <li>
            <a href={character.url}>{character.name}</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
